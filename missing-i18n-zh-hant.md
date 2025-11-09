# zh-hant 缺詞掃描報告

- 命名空間：`common`
- 當前掃描結果：缺詞 = 0（已清零）
- 報告時間：2025-11-09 03:08:57 UTC

## i18n 審計摘要（logs/i18n-lint.txt）

- 語言代碼使用：程式中主要以 `zh-hant / zh-hans / ja / en` 為主，並保留 `zh_TW` 別名映射。
- 其餘 `useTranslation` / `t('…')` 使用正常，未發現新的混用型態。

> 若後續掃描出新的缺詞，請先補 `src/locales/zh-hant/common.json`，再更新本文件。
