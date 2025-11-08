import type { EntStore, EntRecord } from './types'

export function memoryStore(): EntStore {
  const m = new Map<string, EntRecord>()
  return {
    upsert: (rec) => m.set(rec.appUserId, rec),
    get: (id) => m.get(id) ?? null,
  }
}


