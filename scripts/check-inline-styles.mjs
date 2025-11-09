#!/usr/bin/env node
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const ROOT = path.resolve(__dirname, '..')

const TARGET_EXTENSIONS = new Set(['.astro', '.tsx', '.jsx', '.ts', '.js'])
const IGNORE_DIRS = new Set(['node_modules', 'dist', 'build', '.astro', '.next'])
const ALLOW_PATTERNS = [
  'featureV3 ? undefined',
  'featureV3 ? \'display:none\'',
  'style={{',
]

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true })
  const results = []
  for (const entry of entries) {
    if (IGNORE_DIRS.has(entry.name)) continue
    const fullPath = path.join(directory, entry.name)
    if (entry.isDirectory()) {
      results.push(...(await walk(fullPath)))
      continue
    }
    const ext = path.extname(entry.name)
    if (!TARGET_EXTENSIONS.has(ext)) continue
    results.push(fullPath)
  }
  return results
}

function shouldIgnore(line) {
  return ALLOW_PATTERNS.some((pattern) => line.includes(pattern))
}

async function scanFile(filePath) {
  const content = await fs.readFile(filePath, 'utf8')
  const lines = content.split(/\r?\n/)
  const matches = []
  for (let i = 0; i < lines.length; i += 1) {
    const line = lines[i]
    if (!line.includes('style=')) continue
    if (shouldIgnore(line)) continue
    matches.push({ line: i + 1, content: line.trim() })
  }
  return matches
}

async function main() {
  const targetDirs = [
    path.join(ROOT, 'src', 'pages'),
    path.join(ROOT, 'src', 'components'),
  ]

  const files = []
  for (const dir of targetDirs) {
    try {
      const collected = await walk(dir)
      files.push(...collected)
    } catch (err) {
      console.warn(`Skipping ${dir}: ${(err && err.message) || err}`)
    }
  }

  const report = []
  for (const file of files) {
    const matches = await scanFile(file)
    if (matches.length) {
      report.push({ file: path.relative(ROOT, file), matches })
    }
  }

  if (!report.length) {
    console.log('✅  No inline style attributes detected in target directories.')
    return
  }

  console.log('⚠️  Inline style attributes detected:')
  for (const entry of report) {
    console.log(`\n- ${entry.file}`)
    entry.matches.forEach((match) => {
      console.log(`  L${String(match.line).padStart(4, ' ')}  ${match.content}`)
    })
  }
  console.log(
    '\nℹ️  Please migrate these instances to shared design token classes when convenient.',
  )
}

main().catch((err) => {
  console.error(err)
  process.exitCode = 1
})


