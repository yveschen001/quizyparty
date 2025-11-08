// 粗略檢查：確認語系頁是否使用 <SeoMeta> 與 <html lang=...>
import { globby } from 'globby'
import fs from 'node:fs/promises'

const files = await globby('src/pages/*/index.astro')
let ok = true
for (const f of files) {
  const s = await fs.readFile(f, 'utf8')
  if (!/<SeoMeta\s/i.test(s)) { console.error(`[SEO] ${f} 缺少 <SeoMeta>`); ok = false }
  if (!/<html\s+lang=/.test(s)) { console.error(`[SEO] ${f} <html lang> 未設置`); ok = false }
}
process.exit(ok ? 0 : 1)


