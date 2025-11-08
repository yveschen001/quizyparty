#!/usr/bin/env node
/* Core i18n check: ensure EN and zh-hant are in sync for common.json */
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const baseDir = path.join(ROOT, 'src', 'i18n', 'locales')
const enPath = path.join(baseDir, 'en', 'common.json')
const zhPath = path.join(baseDir, 'zh-hant', 'common.json')

function readJson(p) {
  return JSON.parse(fs.readFileSync(p, 'utf8'))
}

function diffKeys(a, b) {
  const aKeys = new Set(Object.keys(a))
  const bKeys = new Set(Object.keys(b))
  const missingInB = [...aKeys].filter((k) => !bKeys.has(k))
  const extraInB = [...bKeys].filter((k) => !aKeys.has(k))
  return { missingInB, extraInB }
}

try {
  const en = readJson(enPath)
  const zh = readJson(zhPath)
  const { missingInB: missingInZh, extraInB: extraInZh } = diffKeys(en, zh)
  if (missingInZh.length) {
    console.error('[i18n:core] zh-hant missing keys:', missingInZh)
  }
  if (extraInZh.length) {
    console.warn('[i18n:core] zh-hant extra keys (ok):', extraInZh)
  }
  if (missingInZh.length) process.exit(1)
  console.log('[i18n:core] OK. en ⇄ zh-hant are in sync for common.json')
} catch (e) {
  console.error('[i18n:core] check failed:', e)
  process.exit(1)
}


