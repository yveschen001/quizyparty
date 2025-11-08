import { promises as fs } from 'fs';
import path from 'path';

const ROOT = process.cwd();
const LOCALES_DIR = path.join(ROOT, 'src/i18n/locales');
const OUTPUT = path.join(ROOT, 'src/i18n/keys.d.ts');

type Json = Record<string, unknown>;

function flatten(obj: Json, prefix = ''): string[] {
  const out: string[] = [];
  for (const [k, v] of Object.entries(obj)) {
    const p = prefix ? `${prefix}.${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) out.push(...flatten(v as Json, p));
    else out.push(p);
  }
  return out;
}

async function readJsonSafe(file: string): Promise<Json> {
  try {
    const raw = await fs.readFile(file, 'utf8');
    return JSON.parse(raw) as Json;
  } catch (e) {
    throw new Error(`Invalid JSON: ${file} -> ${(e as Error).message}`);
  }
}

async function globLocaleFiles(): Promise<string[]> {
  const locales = await fs.readdir(LOCALES_DIR);
  const files: string[] = [];
  for (const loc of locales) {
    const dir = path.join(LOCALES_DIR, loc);
    const stats = await fs.stat(dir).catch(() => null);
    if (!stats || !stats.isDirectory()) continue;
    const entries = await fs.readdir(dir);
    for (const f of entries) {
      if (f.endsWith('.json')) files.push(path.join(dir, f));
    }
  }
  return files.sort();
}

async function main() {
  const files = await globLocaleFiles();
  if (files.length === 0) throw new Error(`No locale files found in ${LOCALES_DIR}`);
  const keySet = new Set<string>();
  const problems: string[] = [];

  for (const file of files) {
    const json = await readJsonSafe(file);
    const keys = flatten(json);
    for (const k of keys) {
      if (keySet.has(k)) {
        // duplicate across namespaces/locales isn't fatal, but we track to inform
      }
      keySet.add(k);
    }
  }

  if (problems.length) {
    for (const p of problems) console.error(p);
    process.exit(1);
  }

  const all = [...keySet].sort();
  const lines = all.map((k) => `  | '${k.replace(/'/g, "\\'")}'`).join('\n');
  const content = `// 自動生成，請勿手改\nexport type I18nKey =\n${lines};\n`;
  await fs.writeFile(OUTPUT, content, 'utf8');
  console.log(`Generated ${OUTPUT} with ${all.length} keys.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
