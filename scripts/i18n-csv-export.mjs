import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const LOCALES_DIR = path.join(ROOT, 'src/i18n/locales')
const OUTPUT_DIR = path.join(ROOT, 'localization')
const OUTPUT = path.join(OUTPUT_DIR, 'i18n.csv')

const readSupportedLocales = async () => {
  const cfg = await fs.readFile(path.join(ROOT, 'src/i18n/config.ts'), 'utf8')
  const m = cfg.match(/SUPPORTED_LOCALES\s*=\s*\[(.*?)\]/s)
  if (!m) throw new Error('SUPPORTED_LOCALES not found in src/i18n/config.ts')
  const arr = m[1].split(',').map(s=>s.replace(/['"\s]/g,'')).filter(Boolean)
  return arr
}

const flatten = (obj, p='') => Object.entries(obj).reduce((acc,[k,v])=>{
  const key = p ? `${p}.${k}` : k
  if (v && typeof v === 'object' && !Array.isArray(v)) Object.assign(acc, flatten(v, key))
  else acc[key] = String(v ?? '')
  return acc
}, {})

const toCsv = (rows) => {
  const esc = (s) => {
    const t = String(s ?? '')
    if (/[",\n]/.test(t)) return '"' + t.replace(/"/g,'""') + '"'
    return t
  }
  return rows.map(r => r.map(esc).join(',')).join('\n') + '\n'
}

async function main() {
  const LOCALES = await readSupportedLocales()
  const files = await fs.readdir(LOCALES_DIR)
  const namespaces = new Set()
  for (const loc of files) {
    const dir = path.join(LOCALES_DIR, loc)
    const s = await fs.stat(dir).catch(()=>null)
    if (!s?.isDirectory()) continue
    for (const f of await fs.readdir(dir)) if (f.endsWith('.json')) namespaces.add(f)
  }

  const allKeys = new Set()
  const data = {}
  for (const ns of namespaces) {
    for (const loc of LOCALES) {
      const file = path.join(LOCALES_DIR, loc, ns)
      const obj = JSON.parse(await fs.readFile(file,'utf8').catch(()=>('{}')))
      const flat = flatten(obj)
      data[loc] = data[loc] || {}
      Object.assign(data[loc], flat)
      for (const k of Object.keys(flat)) allKeys.add(k)
    }
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true })
  const header = ['key', ...LOCALES]
  const rows = [header]
  const sortedKeys = [...allKeys].sort()
  for (const k of sortedKeys) {
    rows.push([k, ...LOCALES.map(l => data[l]?.[k] ?? '')])
  }
  await fs.writeFile(OUTPUT, toCsv(rows), 'utf8')
  console.log(`[i18n:csv:export] wrote ${OUTPUT} with ${sortedKeys.length} keys.`)
}

main().catch(e=>{console.error(e);process.exit(1)})


