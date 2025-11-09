import Database from 'better-sqlite3';
import fs__default from 'node:fs';
import path__default from 'node:path';

function sqliteUserStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
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
  `);
  const createStmt = db.prepare(`
    INSERT INTO users (id, email, name, avatar, provider, provider_id, created_at, updated_at)
    VALUES (@id, @email, @name, @avatar, @provider, @provider_id, @created_at, @updated_at)
  `);
  const getStmt = db.prepare(`SELECT * FROM users WHERE id = ?`);
  const getByEmailStmt = db.prepare(`SELECT * FROM users WHERE email = ?`);
  const getByProviderStmt = db.prepare(`SELECT * FROM users WHERE provider = ? AND provider_id = ?`);
  const updateStmt = db.prepare(`
    UPDATE users
    SET email = @email, name = @name, avatar = @avatar, updated_at = @updated_at
    WHERE id = @id
  `);
  return {
    create: (user) => {
      createStmt.run({
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar || null,
        provider: user.provider,
        provider_id: user.providerId,
        created_at: user.createdAt,
        updated_at: user.updatedAt
      });
    },
    get: (id) => {
      const row = getStmt.get(id);
      if (!row) return null;
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || void 0,
        provider: row.provider,
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    },
    getByEmail: (email) => {
      const row = getByEmailStmt.get(email);
      if (!row) return null;
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || void 0,
        provider: row.provider,
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    },
    getByProvider: (provider, providerId) => {
      const row = getByProviderStmt.get(provider, providerId);
      if (!row) return null;
      return {
        id: row.id,
        email: row.email,
        name: row.name,
        avatar: row.avatar || void 0,
        provider: row.provider,
        providerId: row.provider_id,
        createdAt: row.created_at,
        updatedAt: row.updated_at
      };
    },
    update: (id, updates) => {
      const user = getStmt.get(id);
      if (!user) return;
      updateStmt.run({
        id,
        email: updates.email ?? user.email,
        name: updates.name ?? user.name,
        avatar: updates.avatar ?? user.avatar ?? null,
        updated_at: Date.now()
      });
    }
  };
}

const users = /* @__PURE__ */ new Map();
function memoryUserStore() {
  return {
    create: (user) => {
      users.set(user.id, user);
    },
    get: (id) => {
      return users.get(id) || null;
    },
    getByEmail: (email) => {
      for (const user of users.values()) {
        if (user.email === email) return user;
      }
      return null;
    },
    getByProvider: (provider, providerId) => {
      for (const user of users.values()) {
        if (user.provider === provider && user.providerId === providerId) return user;
      }
      return null;
    },
    update: (id, updates) => {
      const user = users.get(id);
      if (!user) return;
      Object.assign(user, updates, { updatedAt: Date.now() });
    }
  };
}

let _store = null;
function userStore() {
  if (_store) return _store;
  const dbPath = process.env.QP_SQLITE_PATH;
  _store = dbPath ? sqliteUserStore(dbPath) : memoryUserStore();
  return _store;
}

export { userStore as u };
