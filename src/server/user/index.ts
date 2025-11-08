import { sqliteUserStore } from './sqlite'
import { memoryUserStore } from './memory'
import type { UserStore } from './types'

let _store: UserStore | null = null

export function userStore(): UserStore {
  if (_store) return _store
  const dbPath = process.env.QP_SQLITE_PATH
  _store = dbPath ? sqliteUserStore(dbPath) : memoryUserStore()
  return _store
}

export * from './types'

