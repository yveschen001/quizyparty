import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const LOCALES_DIR = path.join(ROOT, 'src/i18n/locales');
const DEFAULT_LOCALE = 'zh-hant';

const argv = process.argv.slice(2);
const strict = !argv.includes('--no-strict') && !argv.includes('--allowExtra'); // strict by default
const allowEmpty = argv.includes('--allowEmpty') ? true : false; // off by default

function flatten(obj, prefix = '') {
  const keys = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) keys.push(...flatten(v, p));
    else keys.push(p);
  }
  return keys;
}

async function readJson(file) {
  try {
    return JSON.parse(await fs.readFile(file, 'utf8'));
  } catch (e) {
    throw new Error(`Invalid JSON: ${file} -> ${(e && e.message) || e}`);
  }
}

async function listLocales() {
  const entries = await fs.readdir(LOCALES_DIR);
  const out = [];
  for (const e of entries) {
    const p = path.join(LOCALES_DIR, e);
    const s = await fs.stat(p).catch(() => null);
    if (s && s.isDirectory()) out.push(e);
  }
  return out.sort();
}

async function collectLocaleKeys(locale) {
  const dir = path.join(LOCALES_DIR, locale);
  const files = (await fs.readdir(dir)).filter((f) => f.endsWith('.json'));
  const keyToValue = new Map();
  for (const f of files) {
    const data = await readJson(path.join(dir, f));
    const keys = flatten(data);
    for (const k of keys) {
      const parts = k.split('.');
      let val = data;
      for (const p of parts) val = val?.[p];
      keyToValue.set(k, val);
    }
  }
  return keyToValue;
}

async function main() {
  const locales = await listLocales();
  if (!locales.includes(DEFAULT_LOCALE)) throw new Error(`Default locale '${DEFAULT_LOCALE}' not found.`);

  const baseMap = await collectLocaleKeys(DEFAULT_LOCALE);
  const baseKeys = new Set(baseMap.keys());

  let ok = true;
  for (const loc of locales) {
    if (loc === DEFAULT_LOCALE) continue;
    const map = await collectLocaleKeys(loc);
    const keys = new Set(map.keys());

    const missing = [...baseKeys].filter((k) => !keys.has(k));
    const extra = [...keys].filter((k) => !baseKeys.has(k));
    const empties = [...keys].filter((k) => map.get(k) === '');

    if (missing.length) {
      ok = false;
      console.error(`[${loc}] missing keys:`, missing);
    }
    if (strict && extra.length) {
      ok = false;
      console.error(`[${loc}] extra keys:`, extra);
    }
    if (!allowEmpty && empties.length) {
      ok = false;
      console.error(`[${loc}] empty values:`, empties);
    }
  }

  if (!ok) process.exit(1);
  console.log('i18n check passed.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
