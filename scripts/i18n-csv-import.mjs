import fs from 'node:fs/promises'
import path from 'node:path'

const ROOT = process.cwd()
const LOCALES_DIR = path.join(ROOT, 'src/i18n/locales')
const INPUT = path.join(ROOT, 'localization/i18n.csv')

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
  const parseCell = (s) => {
    s = s.trim()
    if (s.startsWith('"')) {
      let out = ''
      let i = 1
      while (i < s.length) {
        if (s[i]==='"' && s[i+1]==='"') { out+='"'; i+=2; continue }
        if (s[i]==='"') { i++; break }
        out += s[i++]
      }
      return out
    }
    return s
  }
  const rows = lines.map(line => {
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
    return cells.map(parseCell)
  })
  return rows
}

const setPath = (obj, key, val) => {
  const segs = key.split('.')
  let cur = obj
  for (let i=0;i<segs.length;i++) {
    const s = segs[i]
    if (i===segs.length-1) cur[s] = val
    else cur = (cur[s] ||= {})
  }
}

async function main() {
  const LOCALES = await readSupportedLocales()
  const rows = await parseCsv(INPUT)
  const header = rows.shift()
  if (!header) throw new Error('Empty CSV')
  const keyIdx = header.indexOf('key')
  if (keyIdx === -1) throw new Error('CSV must contain key column')
  const localeIdx = Object.fromEntries(LOCALES.map(l => [l, header.indexOf(l)]))

  let updated = 0
  for (const loc of LOCALES) {
    const file = path.join(LOCALES_DIR, loc, 'common.json')
    const obj = JSON.parse(await fs.readFile(file,'utf8').catch(()=>('{}')))

    for (const r of rows) {
      const key = r[keyIdx]
      const val = r[localeIdx[loc]] ?? ''
      // 只在缺失或空值時補寫
      const existing = key.split('.').reduce((a,k)=>a?.[k], obj)
      if (existing === undefined || existing === '' || existing === '__MISSING__') {
        setPath(obj, key, val)
        updated++
      }
    }
    await fs.writeFile(file, JSON.stringify(obj,null,2))
  }
  console.log(`[i18n:csv:import] updated ${updated} entries from ${INPUT}`)
}

main().catch(e=>{console.error(e);process.exit(1)})


