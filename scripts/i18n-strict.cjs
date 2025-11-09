const fs = require('fs');
const path = require('path');
const dir = path.join(process.cwd(), 'logs');
let bad = false;
if (fs.existsSync(dir)) {
  for (const f of fs.readdirSync(dir)) {
    if (!/missing-i18n/i.test(f)) continue;
    const s = fs.readFileSync(path.join(dir, f), 'utf8');
    if (/(Missing|未翻譯|缺詞)/i.test(s)) bad = true;
  }
}
if (bad) {
  console.error('i18n:check:strict detected missing translations. Failing CI.');
  process.exit(1);
}
console.log('i18n:check:strict OK');


