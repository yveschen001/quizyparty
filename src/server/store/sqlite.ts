import Database from 'better-sqlite3'
import type { EntStore, EntRecord } from './types'
import fs from 'node:fs'
import path from 'node:path'

export function sqliteStore(dbPath: string): EntStore {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)
  db.exec(`
    CREATE TABLE IF NOT EXISTS entitlements (
      app_user_id    TEXT PRIMARY KEY,
      active_json    TEXT NOT NULL,
      management_url TEXT,
      updated_at     INTEGER NOT NULL,
      raw_json       TEXT
    );
  `)
  const upsertStmt = db.prepare(`
    INSERT INTO entitlements (app_user_id, active_json, management_url, updated_at, raw_json)
    VALUES (@app_user_id, @active_json, @management_url, @updated_at, @raw_json)
    ON CONFLICT(app_user_id) DO UPDATE SET
      active_json=excluded.active_json,
      management_url=excluded.management_url,
      updated_at=excluded.updated_at,
      raw_json=excluded.raw_json;
  `)
  const getStmt = db.prepare(`SELECT * FROM entitlements WHERE app_user_id=?`)

  return {
    upsert: (rec: EntRecord) => {
      upsertStmt.run({
        app_user_id: rec.appUserId,
        active_json: JSON.stringify(rec.active),
        management_url: rec.managementUrl ?? null,
        updated_at: rec.updatedAt,
        raw_json: null,
      })
    },
    get: (id: string) => {
      const row = getStmt.get(id) as any
      if (!row) return null
      return {
        appUserId: row.app_user_id,
        active: JSON.parse(row.active_json || '[]'),
        managementUrl: row.management_url ?? undefined,
        updatedAt: Number(row.updated_at) || 0,
      }
    },
  }
}


