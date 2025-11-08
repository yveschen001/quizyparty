# Guardrails

- 禁止硬編碼字串：所有 UI 文案必須使用 `t()` 取得。
- 新增頁面必須具備多語路由（`/[lang]/...`）與完整 SEO 標籤（`canonical`、`hreflang`、OG）。
- 提交前必須執行：`npm run i18n:scan`、`npm run i18n:keygen`、`npm run i18n:check`、`npm run lint`。
