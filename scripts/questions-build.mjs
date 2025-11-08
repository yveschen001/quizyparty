import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const ROOT = process.cwd()
const INPUT = path.join(ROOT, 'content/questions.csv')
const OUT_DIR = path.join(ROOT, 'public/data/questions')

const readSupportedLocales = async () => {
  const cfg = await fs.readFile(path.join(ROOT, 'src/i18n/config.ts'), 'utf8')
  const m = cfg.match(/SUPPORTED_LOCALES\s*=\s*\[(.*?)\]/s)
  if (!m) throw new Error('SUPPORTED_LOCALES not found in src/i18n/config.ts')
  const arr = m[1].split(',').map(s=>s.replace(/['"\s]/g,'')).filter(Boolean)
  return arr
}

const parseCsv = async (file) => {
  const text = await fs.readFile(file,'utf8')
  const lines = text.split(/\r?\n/).filter(l=>l.length>0)
  const rows = []
  for (const line of lines) {
    const cells = []
    let cur = ''
    let inQ = false
    for (let i=0;i<line.length;i++) {
      const c = line[i]
      if (!inQ && c===',') { cells.push(cur); cur=''; continue }
      if (c==='"') {
        if (inQ && line[i+1]==='"') { cur+='"'; i++; continue }
        inQ = !inQ; continue
      }
      cur += c
    }
    cells.push(cur)
    rows.push(cells)
  }
  return rows
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

function parseChoices(s) {
  s = (s??'').trim()
  try { const arr = JSON.parse(s); if (Array.isArray(arr)) return arr.map(String) } catch {}
  if (s.includes('|')) return s.split('|').map(v=>v.trim()).filter(Boolean)
  return s ? [s] : []
}

async function main() {
  const LOCALES = await readSupportedLocales()
  await fs.mkdir(OUT_DIR, { recursive: true })
  const rows = await parseCsv(INPUT)
  if (rows.length === 0) { console.log(`[questions:build] no rows in ${INPUT}`); return }
  const header = rows[0]
  const idx = {
    id: header.indexOf('id'),
    lang: header.indexOf('lang'),
    question: header.indexOf('question'),
    choices: header.indexOf('choices'),
    answer: header.indexOf('answer'),
  }
  if (Object.values(idx).some(v=>v===-1)) throw new Error('CSV must include id, lang, question, choices, answer columns')

  const byLang = Object.fromEntries(LOCALES.map(l=>[l, new Map()]))
  for (const r of rows.slice(1)) {
    const id = r[idx.id]
    const lang = r[idx.lang]
    if (!LOCALES.includes(lang)) continue
    const entry = {
      id,
      question: r[idx.question],
      choices: parseChoices(r[idx.choices]),
      answer: r[idx.answer],
    }
    byLang[lang].set(id, entry)
  }

  const pivot = byLang['en'].size ? 'en' : (byLang['zh-hant'].size ? 'zh-hant' : LOCALES[0])
  for (const lang of LOCALES) {
    for (const [id, src] of byLang[pivot]) {
      if (!byLang[lang].has(id) && lang !== pivot) {
        const prompt = `Translate the quiz into ${lang}. Keep the correct answer mapping intact. Return JSON: {question:string, choices:string[], answer:string} for this object: ${JSON.stringify({question:src.question, choices:src.choices, answer:src.answer})}`
        try {
          const text = await ask(prompt)
          const obj = JSON.parse(text)
          byLang[lang].set(id, { id, question: String(obj.question||''), choices: Array.isArray(obj.choices)?obj.choices.map(String):[], answer: String(obj.answer||'') })
        } catch (e) {
          // fallback to copy pivot
          byLang[lang].set(id, src)
        }
      }
    }
  }

  for (const lang of LOCALES) {
    const arr = [...byLang[lang].values()]
    await fs.mkdir(OUT_DIR, { recursive: true })
    await fs.writeFile(path.join(OUT_DIR, `${lang}.json`), JSON.stringify(arr,null,2))
  }
  console.log(`[questions:build] wrote ${LOCALES.length} language files to ${OUT_DIR}`)
}

main().catch(e=>{console.error(e);process.exit(1)})


