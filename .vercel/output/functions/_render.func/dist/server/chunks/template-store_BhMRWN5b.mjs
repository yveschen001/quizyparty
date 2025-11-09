import Database from 'better-sqlite3';
import fs__default from 'node:fs';
import path__default from 'node:path';

function sqliteRoomTemplateStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const safeAddColumn = (table, column, ddl) => {
    try {
      const info = db.prepare(`PRAGMA table_info(${table})`).all();
      if (info.some((row) => row && row.name === column)) return;
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
      console.info("[sqliteRoomTemplateStore] column added", column);
    } catch (e) {
      if (String(e).toLowerCase().indexOf("duplicate column name") === -1) {
        console.error("[sqliteRoomTemplateStore] add column failed", column, e);
      }
    }
  };
  db.exec(`
    CREATE TABLE IF NOT EXISTS room_templates (
      id             TEXT PRIMARY KEY,
      user_id        TEXT NOT NULL,
      title          TEXT NOT NULL,
      cover_image    TEXT,
      question_set_id TEXT NOT NULL,
      status         TEXT NOT NULL DEFAULT 'draft',
      created_at     INTEGER NOT NULL,
      updated_at     INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_room_templates_user_id ON room_templates(user_id);
    CREATE INDEX IF NOT EXISTS idx_room_templates_status ON room_templates(status);
    CREATE INDEX IF NOT EXISTS idx_room_templates_created_at ON room_templates(created_at DESC);
    CREATE UNIQUE INDEX IF NOT EXISTS idx_room_templates_question_set ON room_templates(question_set_id);
  `);
  safeAddColumn("room_templates", "cover_image", "TEXT");
  safeAddColumn("room_templates", "status", "TEXT NOT NULL DEFAULT 'draft'");
  const createStmt = db.prepare(`
    INSERT INTO room_templates (id, user_id, title, cover_image, question_set_id, status, created_at, updated_at)
    VALUES (@id, @user_id, @title, @cover_image, @question_set_id, @status, @created_at, @updated_at)
  `);
  const getStmt = db.prepare(`SELECT * FROM room_templates WHERE id = ?`);
  const getByQuestionSetStmt = db.prepare(`SELECT * FROM room_templates WHERE user_id = ? AND question_set_id = ? LIMIT 1`);
  const getByUserAllStmt = db.prepare(`
    SELECT * FROM room_templates
    WHERE user_id = ?
    ORDER BY created_at DESC
  `);
  const getByUserStatusStmt = db.prepare(`
    SELECT * FROM room_templates
    WHERE user_id = ? AND status = ?
    ORDER BY created_at DESC
  `);
  const updateStmt = db.prepare(`
    UPDATE room_templates SET
      title = @title,
      cover_image = @cover_image,
      question_set_id = @question_set_id,
      status = @status,
      updated_at = @updated_at
    WHERE id = @id
  `);
  const deleteStmt = db.prepare(`DELETE FROM room_templates WHERE id = ?`);
  const rowToTemplate = (row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title,
    coverImage: row.cover_image || void 0,
    questionSetId: row.question_set_id,
    status: row.status,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
  return {
    create(template) {
      createStmt.run({
        id: template.id,
        user_id: template.userId,
        title: template.title,
        cover_image: template.coverImage || null,
        question_set_id: template.questionSetId,
        status: template.status,
        created_at: template.createdAt,
        updated_at: template.updatedAt
      });
    },
    get(id) {
      const row = getStmt.get(id);
      return row ? rowToTemplate(row) : null;
    },
    getByUser(userId, status = "all") {
      return this.listByUser(userId, status).items;
    },
    listByUser(userId, status = "all", options = {}) {
      const limit = typeof options.limit === "number" && options.limit >= 0 ? options.limit : Infinity;
      const offset = typeof options.offset === "number" && options.offset >= 0 ? options.offset : 0;
      const whereClause = status === "all" ? "user_id = @userId" : "user_id = @userId AND status = @status";
      const params = {
        userId,
        limit: Number.isFinite(limit) ? limit : -1,
        offset
      };
      if (status !== "all") params.status = status;
      const countStmt = db.prepare(`SELECT COUNT(*) as count FROM room_templates WHERE ${whereClause}`);
      const countRow = countStmt.get(params);
      const total = countRow && typeof countRow.count === "number" ? countRow.count : 0;
      let items = [];
      if (Number.isFinite(limit)) {
        const listStmt = db.prepare(
          `SELECT * FROM room_templates WHERE ${whereClause} ORDER BY created_at DESC LIMIT @limit OFFSET @offset`
        );
        const rows = listStmt.all(params);
        items = rows.map(rowToTemplate);
      } else {
        const rows = status === "all" ? getByUserAllStmt.all(userId) : getByUserStatusStmt.all(userId, status);
        items = rows.slice(offset).map(rowToTemplate);
      }
      return { items, total };
    },
    findByQuestionSet(userId, questionSetId) {
      const row = getByQuestionSetStmt.get(userId, questionSetId);
      return row ? rowToTemplate(row) : null;
    },
    update(id, updates) {
      const existing = getStmt.get(id);
      if (!existing) return;
      const template = { ...rowToTemplate(existing), ...updates, updatedAt: Date.now() };
      updateStmt.run({
        id: template.id,
        title: template.title,
        cover_image: template.coverImage || null,
        question_set_id: template.questionSetId,
        status: template.status,
        updated_at: template.updatedAt
      });
    },
    delete(id) {
      deleteStmt.run(id);
    }
  };
}

const templates = /* @__PURE__ */ new Map();
function memoryRoomTemplateStore() {
  return {
    create(template) {
      templates.set(template.id, template);
    },
    get(id) {
      return templates.get(id) || null;
    },
    getByUser(userId, status = "all") {
      return this.listByUser(userId, status).items;
    },
    listByUser(userId, status = "all", options = {}) {
      const limit = typeof options.limit === "number" && options.limit >= 0 ? options.limit : Infinity;
      const offset = typeof options.offset === "number" && options.offset >= 0 ? options.offset : 0;
      const filtered = Array.from(templates.values()).filter((tpl) => tpl.userId === userId && (status === "all" || tpl.status === status)).sort((a, b) => b.createdAt - a.createdAt);
      const items = filtered.slice(offset, Number.isFinite(limit) ? offset + limit : void 0);
      return { items, total: filtered.length };
    },
    findByQuestionSet(userId, questionSetId) {
      for (const tpl of templates.values()) {
        if (tpl.userId === userId && tpl.questionSetId === questionSetId) {
          return tpl;
        }
      }
      return null;
    },
    update(id, updates) {
      const tpl = templates.get(id);
      if (!tpl) return;
      templates.set(id, { ...tpl, ...updates, updatedAt: Date.now() });
    },
    delete(id) {
      templates.delete(id);
    }
  };
}

let _store = null;
function roomTemplateStore() {
  if (_store) return _store;
  const dbPath = process.env.QP_SQLITE_PATH;
  _store = dbPath ? sqliteRoomTemplateStore(dbPath) : memoryRoomTemplateStore();
  return _store;
}

export { roomTemplateStore as r };
