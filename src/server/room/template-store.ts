import { sqliteRoomTemplateStore } from './template-sqlite'
import { memoryRoomTemplateStore } from './template-memory'
import type { RoomTemplateStore } from './template'

let _store: RoomTemplateStore | null = null

export function roomTemplateStore(): RoomTemplateStore {
  if (_store) return _store
  const dbPath = process.env.QP_SQLITE_PATH
  _store = dbPath ? sqliteRoomTemplateStore(dbPath) : memoryRoomTemplateStore()
  return _store
}

export * from './template'

