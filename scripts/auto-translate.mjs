import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

const OPENAI_KEY = process.env.OPENAI_API_KEY
if (!OPENAI_KEY) { console.error('Missing OPENAI_API_KEY'); process.exit(1) }

const TARGETS = (process.argv[2] || '').split(',').map(s=>s.trim()).filter(Boolean)
// ex: pnpm i18n:auto ko,de,fr

const ROOT = 'src/i18n/locales'
const BASE = 'en' // 或 'zh-hant'
const nsFiles = await fs.readdir(path.join(ROOT, BASE))

const flat = (obj, p='') => Object.entries(obj).reduce((acc,[k,v])=>{
  const key = p ? `${p}.${k}` : k
  if (v && typeof v === 'object') Object.assign(acc, flat(v, key))
  else acc[key] = String(v ?? '')
  return acc
}, {})

const unflat = (map) => {
  const root = {}
  for (const [k,v] of Object.entries(map)) {
    const segs = k.split('.'); let cur = root
    segs.forEach((s,i)=>{
      if (i===segs.length-1) cur[s] = v
      else cur = (cur[s] ||= {})
    })
  }
  return root
}

async function translate(text, to) {
  const body = {
    model: 'gpt-4o-mini',
    input: `Translate into ${to}. Keep placeholders like {name} intact.\n${text}`
  }
  const res = await fetch('https://api.openai.com/v1/responses', {
    method:'POST',
    headers:{ 'Authorization':`Bearer ${OPENAI_KEY}`, 'Content-Type':'application/json' },
    body: JSON.stringify(body)
  })
  const json = await res.json()
  return json.output_text?.trim() || text
}

for (const ns of nsFiles) {
  if (!ns.endsWith('.json')) continue
  const baseObj = JSON.parse(await fs.readFile(path.join(ROOT, BASE, ns), 'utf8'))
  const baseFlat = flat(baseObj)

  for (const lang of TARGETS) {
    const langFile = path.join(ROOT, lang, ns)
    const langObj = JSON.parse(await fs.readFile(langFile, 'utf8').catch(()=>('{}')))
    const langFlat = flat(langObj)

    const need = Object.keys(baseFlat).filter(k => !langFlat[k] || langFlat[k]==='__MISSING__')
    if (!need.length) continue

    for (const k of need) {
      langFlat[k] = await translate(baseFlat[k], lang)
    }
    await fs.writeFile(langFile, JSON.stringify(unflat(langFlat), null, 2))
    console.log(`[auto-translate] ${lang}/${ns}: filled ${need.length} keys`)
  }
}

console.log('Done.')


