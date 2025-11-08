import { memoryStore } from './memory'
import { sqliteStore } from './sqlite'
import type { EntStore } from './types'

let _store: EntStore | null = null
export function entStore(): EntStore {
  if (_store) return _store
  const dbPath = process.env.QP_SQLITE_PATH
  _store = dbPath ? sqliteStore(dbPath) : memoryStore()
  return _store
}

export * from './types'


