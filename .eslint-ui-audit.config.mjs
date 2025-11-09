/**
 * 狀態：僅供「本地審計」使用，不參與 CI，避免與 eslint.config.mjs 衝突
 * 目標：抓 UI 直出字串、基本可存活規則；全部以「warn」呈現，不阻斷流程
 */
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import i18next from 'eslint-plugin-i18next'

export default [
  {
    ignores: [
      '**/node_modules/**',
      'dist/**',
      'build/**',
      '.astro/**',
      '.next/**',
      'coverage/**',
      'logs/**',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    name: 'ui-audit-rules',
    files: ['src/**/*.{ts,tsx,js,jsx,astro}', 'public/js/**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    plugins: { i18next },
    rules: {
      'i18next/no-literal-string': 'warn',
      'no-alert': 'warn',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
    settings: {
      i18next: {},
    },
  },
]
