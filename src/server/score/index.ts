import { sqliteScoreStore } from './sqlite'
import { memoryScoreStore } from './memory'
import type { ScoreStore } from './types'

let _store: ScoreStore | null = null

export function scoreStore(): ScoreStore {
  if (_store) return _store
  const dbPath = process.env.QP_SQLITE_PATH
  _store = dbPath ? sqliteScoreStore(dbPath) : memoryScoreStore()
  return _store
}

export * from './types'
export * from './utils'

