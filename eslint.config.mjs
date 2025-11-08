// eslint.config.mjs
import js from '@eslint/js'
import tseslint from 'typescript-eslint'
import astro from 'eslint-plugin-astro'
import i18next from 'eslint-plugin-i18next'
import regexp from 'eslint-plugin-regexp'

export default [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs['flat/recommended'],
  i18next.configs['flat/recommended'],
  {
    files: ['**/*.{ts,tsx,astro}'],
    rules: {
      'i18next/no-literal-string': 'error', // 禁止硬編碼顯示文字
      'astro/no-set-html-directive': 'error'
    }
  },
  {
    files: ['**/*.{spec,test}.{ts,tsx}'],
    rules: { 'i18next/no-literal-string': 'off' }
  },
  regexp.configs['flat/recommended']
]


