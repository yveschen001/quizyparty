import fs from 'node:fs'
import { execSync } from 'node:child_process'

const run = (cmd) =>
  execSync(cmd, {
    stdio: 'pipe',
    encoding: 'utf8',
  })

fs.mkdirSync('logs', { recursive: true })

const writeAuditReport = () => {
  let wrote = false
  try {
    const out = run(
      "rg -n --hidden --glob '!.git' -e 'zh[_-]Hant|zh[_-]TW|zh[_-]tw|zh[_-]HANT|supportedLngs|useTranslation|t\\\\(' src || true",
    )
    if (out && out.trim().length > 0) {
      fs.writeFileSync('logs/i18n-lint.txt', out)
      wrote = true
    }
  } catch {
    wrote = false
  }
  if (wrote) return
  try {
    const out = run(
      "grep -RIn --exclude-dir=.git -E \"zh[_-]Hant|zh[_-]TW|zh[_-]tw|zh[_-]HANT|supportedLngs|useTranslation|t\\(\" src || true",
    )
    fs.writeFileSync('logs/i18n-lint.txt', out || '')
  } catch {
    fs.writeFileSync('logs/i18n-lint.txt', '')
  }
}

const runI18nChecks = () => {
  try {
    run('pnpm i18n:scan')
  } catch {
    // 忽略掃描失敗（可能受 Node 版本影響）
  }
  try {
    return run('pnpm i18n:check')
  } catch (error) {
    if (error?.stdout) return error.stdout
    return String(error)
  }
}

writeAuditReport()
const checkOutput = runI18nChecks()

let missingCount
const matched = checkOutput.match(/Missing\s+keys:\s+(\d+)/i)
if (matched) {
  missingCount = Number(matched[1])
}

const now = new Date().toISOString().replace('T', ' ').replace('Z', ' UTC')

let report = '# missing-i18n-zh-hant\n\n'
report += `- 更新時間：${now}\n`
if (Number.isFinite(missingCount)) {
  report += `- 當前掃描結果：缺詞 = ${missingCount}\n`
  report +=
    missingCount === 0
      ? '- 狀態：**已清零**（zh-hant 無缺詞）\n'
      : '- 狀態：**仍有缺詞**，請先補齊 `src/locales/zh-hant/common.json` 後再次執行本腳本。\n'
} else {
  report += '- 注意：未能從 `pnpm i18n:check` 取得缺詞統計，請手動檢查輸出。\n'
}
report += '\n---\n\n'
report += '## i18n 審計摘錄（logs/i18n-lint.txt）\n\n'

try {
  const lines = fs.readFileSync('logs/i18n-lint.txt', 'utf8').split('\n').slice(0, 80).join('\n')
  report += '```\n' + lines + '\n```\n'
} catch {
  report += '_無法載入 logs/i18n-lint.txt_\n'
}

fs.writeFileSync('missing-i18n-zh-hant.md', report)

console.log('✅ 更新完成：missing-i18n-zh-hant.md / logs/i18n-lint.txt')

