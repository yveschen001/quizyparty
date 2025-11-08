import Database from 'better-sqlite3'
import type { User, UserStore } from './types'
import fs from 'node:fs'
import path from 'node:path'

export function sqliteUserStore(dbPath: string): UserStore {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)

  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT NOT NULL UNIQUE,
      name          TEXT NOT NULL,
      avatar        TEXT,
      provider      TEXT NOT NULL,
      provider_id   TEXT NOT NULL,
      created_at    INTEGER NOT NULL,
      updated_at    INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
    CREATE INDEX IF NOT EXISTS idx_users_provider ON users(provider, provider_id);
  `)

  const createStmt = db.prepare(`
    INSERT INTO users (id, email, name, avatar, provider, provider_id, created_at, updated_at)
    VALUES (@id, @email, @name, @avatar, @provider, @provider_id, @created_at, @updated_at)
  `)

  const getStmt = db.prepare(`SELECT * FROM users WHERE id = ?`)
  const getByEmailStmt = db.prepare(`SELECT * FROM users WHERE email = ?`)
  const getByProviderStmt = db.prepare(`SELECT * FROM users WHERE provider = ? AND provider_id = ?`)

  const updateStmt = db.prepare(`
    UPDATE users
    SET email = @email, name = @name, avatar = @avatar, updated_at = @updated_at
    WHERE id = @id
  `)

  return {
    create: (user: User) => {
      createStmt.run({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || null,
        provider: user.provider,
        provider_id: user.providerId,
        created_at: user.createdAt,
        updated_at: user.updatedAt,
      })
    },

    get: (id: string) => {
      const row = getStmt.get(id) as any
      if (!row) return null
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || undefined,
        provider: row.provider as 'google' | 'anonymous',
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    getByEmail: (email: string) => {
      const row = getByEmailStmt.get(email) as any
      if (!row) return null
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || undefined,
        provider: row.provider as 'google' | 'anonymous',
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    getByProvider: (provider: string, providerId: string) => {
      const row = getByProviderStmt.get(provider, providerId) as any
      if (!row) return null
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || undefined,
        provider: row.provider as 'google' | 'anonymous',
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
      }
    },

    update: (id: string, updates: Partial<User>) => {
      const user = getStmt.get(id) as any
      if (!user) return
      updateStmt.run({
        id,
        email: updates.email ?? user.email,
        name: updates.name ?? user.name,
        avatar: updates.avatar ?? user.avatar ?? null,
        updated_at: Date.now(),
      })
    },
  }
}

