import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const OUT = path.join(ROOT, 'public/data/generated.json')

const readSupportedLocales = async () => {
  const cfg = await fs.readFile(path.join(ROOT, 'src/i18n/config.ts'), 'utf8')
  const m = cfg.match(/SUPPORTED_LOCALES\s*=\s*\[(.*?)\]/s)
  if (!m) throw new Error('SUPPORTED_LOCALES not found in src/i18n/config.ts')
  const arr = m[1].split(',').map(s=>s.replace(/['"\s]/g,'')).filter(Boolean)
  return arr
}

const ask = async (prompt) => {
  const key = process.env.OPENAI_API_KEY
  if (!key) throw new Error('Missing OPENAI_API_KEY')
  const res = await fetch('https://api.openai.com/v1/responses', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${key}`, 'Content-Type':'application/json' },
    body: JSON.stringify({ model:'gpt-4o-mini', input: prompt })
  })
  const json = await res.json()
  if (!res.ok) throw new Error(JSON.stringify(json))
  return json.output_text?.trim() || ''
}

const schema = `Return a strict JSON array of objects with shape: {"id": string, "question": string, "choices": string[], "answer": string}. choices must contain the answer.`

async function main() {
  const mode = process.argv[2] || 'pivot' // pivot | native
  const pivotLang = process.argv[3] || 'en'
  const topic = process.argv[4] || 'general knowledge'
  const count = Number(process.argv[5] || '10')

  const LOCALES = await readSupportedLocales()

  if (mode === 'pivot') {
    const baseText = await ask(`Generate ${count} multiple-choice quiz questions in ${pivotLang} on topic "${topic}". ${schema}`)
    const baseArr = JSON.parse(baseText)
    const out = { [pivotLang]: baseArr }
    for (const lang of LOCALES.filter(l=> l!==pivotLang)) {
      const text = await ask(`Translate the following quiz questions from ${pivotLang} to ${lang}. Keep answers mapping intact.\n${JSON.stringify(baseArr)}`)
      out[lang] = JSON.parse(text)
    }
    await fs.mkdir(path.dirname(OUT), { recursive: true })
    await fs.writeFile(OUT, JSON.stringify(out,null,2))
  } else {
    const out = {}
    for (const lang of LOCALES) {
      const text = await ask(`Generate ${count} multiple-choice quiz questions in ${lang} on topic "${topic}". ${schema}`)
      out[lang] = JSON.parse(text)
    }
    await fs.mkdir(path.dirname(OUT), { recursive: true })
    await fs.writeFile(OUT, JSON.stringify(out,null,2))
  }
  console.log('[questions:generate] wrote public/data/generated.json')
}

main().catch(e=>{console.error(e);process.exit(1)})


