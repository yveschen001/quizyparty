import Database from 'better-sqlite3';
import fs__default from 'node:fs';
import path__default from 'node:path';

function sqliteQuestionStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const hasColumn = (table, column) => {
    try {
      const rows = db.prepare(`PRAGMA table_info(${table})`).all();
      return rows.some((row) => row && row.name === column);
    } catch (e) {
      console.error("[sqliteQuestionStore] failed to inspect columns", table, e);
      return false;
    }
  };
  const safeAddColumn = (table, column, ddl) => {
    if (hasColumn(table, column)) return;
    try {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
      console.info("[sqliteQuestionStore] column added", table, column);
    } catch (e) {
      if (String(e).toLowerCase().indexOf("duplicate column name") === -1) {
        console.error("[sqliteQuestionStore] add column failed", table, column, e);
      }
    }
  };
  db.exec(`
    CREATE TABLE IF NOT EXISTS questions (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL,
      set_id        TEXT,
      question      TEXT NOT NULL,
      choices_json  TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      lang          TEXT NOT NULL,
      category      TEXT,
      keywords_json TEXT,
      status        TEXT NOT NULL DEFAULT 'draft',
      order_index   INTEGER,
      version       INTEGER NOT NULL DEFAULT 1,
      published_at  INTEGER,
      archived_at   INTEGER,
      created_at    INTEGER NOT NULL,
      updated_at    INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_questions_user_id ON questions(user_id);
    CREATE INDEX IF NOT EXISTS idx_questions_lang ON questions(lang);
    CREATE INDEX IF NOT EXISTS idx_questions_category ON questions(category);
    CREATE INDEX IF NOT EXISTS idx_questions_created_at ON questions(created_at DESC);
  `);
  safeAddColumn("questions", "set_id", "TEXT");
  safeAddColumn("questions", "status", "TEXT NOT NULL DEFAULT 'draft'");
  safeAddColumn("questions", "order_index", "INTEGER");
  safeAddColumn("questions", "version", "INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("questions", "published_at", "INTEGER");
  safeAddColumn("questions", "archived_at", "INTEGER");
  try {
    if (hasColumn("questions", "set_id")) {
      db.exec(`CREATE INDEX IF NOT EXISTS idx_questions_set_id ON questions(set_id)`);
    }
    if (hasColumn("questions", "status")) {
      db.exec(`CREATE INDEX IF NOT EXISTS idx_questions_status ON questions(status)`);
    }
  } catch (e) {
    console.error("[sqliteQuestionStore] failed to create indexes", e);
  }
  const createStmt = db.prepare(`
    INSERT INTO questions (id, user_id, set_id, question, choices_json, correct_answer, lang, category, keywords_json, status, order_index, version, published_at, archived_at, created_at, updated_at)
    VALUES (@id, @user_id, @set_id, @question, @choices_json, @correct_answer, @lang, @category, @keywords_json, @status, @order_index, @version, @published_at, @archived_at, @created_at, @updated_at)
  `);
  const getStmt = db.prepare(`SELECT * FROM questions WHERE id = ?`);
  const getByUserStmt = db.prepare(`
    SELECT * FROM questions 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `);
  const updateStmt = db.prepare(`
    UPDATE questions SET
      question = @question,
      choices_json = @choices_json,
      correct_answer = @correct_answer,
      category = @category,
      keywords_json = @keywords_json,
      status = @status,
      order_index = @order_index,
      version = @version,
      published_at = @published_at,
      archived_at = @archived_at,
      set_id = @set_id,
      updated_at = @updated_at
    WHERE id = @id
  `);
  const deleteStmt = db.prepare(`DELETE FROM questions WHERE id = ?`);
  const rowToQuestion = (row) => ({
    id: row.id,
    userId: row.user_id,
    setId: row.set_id || void 0,
    question: row.question,
    choices: JSON.parse(row.choices_json || "[]"),
    correctAnswer: row.correct_answer,
    lang: row.lang,
    category: row.category || void 0,
    keywords: row.keywords_json ? JSON.parse(row.keywords_json) : void 0,
    status: row.status || "draft",
    order: typeof row.order_index === "number" ? row.order_index : void 0,
    version: typeof row.version === "number" ? row.version : 1,
    publishedAt: row.published_at || void 0,
    archivedAt: row.archived_at || void 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
  return {
    create: (question) => {
      createStmt.run({
        id: question.id,
        user_id: question.userId,
        set_id: question.setId || null,
        question: question.question,
        choices_json: JSON.stringify(question.choices),
        correct_answer: question.correctAnswer,
        lang: question.lang,
        category: question.category || null,
        keywords_json: question.keywords ? JSON.stringify(question.keywords) : null,
        status: question.status,
        order_index: typeof question.order === "number" ? question.order : null,
        version: question.version,
        published_at: question.publishedAt || null,
        archived_at: question.archivedAt || null,
        created_at: question.createdAt,
        updated_at: question.updatedAt
      });
    },
    get: (id) => {
      const row = getStmt.get(id);
      return row ? rowToQuestion(row) : null;
    },
    getByUser: (userId, limit = 50, offset = 0) => {
      const rows = getByUserStmt.all(userId, limit, offset);
      return rows.map(rowToQuestion);
    },
    getBySet: (setId) => {
      let set = null;
      try {
        const setStmt = db.prepare(`SELECT question_ids_json FROM question_sets WHERE id = ?`);
        const setRow = setStmt.get(setId);
        if (setRow) {
          const parsedIds = JSON.parse(setRow.question_ids_json || "[]");
          set = {
            id: setId,
            userId: "",
            lang: "",
            questionIds: Array.isArray(parsedIds) ? parsedIds : [],
            status: "draft",
            version: 1,
            createdAt: 0,
            updatedAt: 0
          };
        }
      } catch (e) {
        console.error("[getBySet] Failed to get question set:", e);
        return [];
      }
      if (!set || set.questionIds.length === 0) return [];
      const questions = [];
      for (const questionId of set.questionIds) {
        const q = getStmt.get(questionId);
        if (q) questions.push(rowToQuestion(q));
      }
      return questions.sort((a, b) => {
        const aIndex = set.questionIds.indexOf(a.id);
        const bIndex = set.questionIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    },
    update: (id, updates) => {
      const existing = getStmt.get(id);
      if (!existing) return;
      const updated = {
        ...rowToQuestion(existing),
        ...updates,
        updatedAt: Date.now()
      };
      updateStmt.run({
        id: updated.id,
        question: updated.question,
        choices_json: JSON.stringify(updated.choices),
        correct_answer: updated.correctAnswer,
        category: updated.category || null,
        keywords_json: updated.keywords ? JSON.stringify(updated.keywords) : null,
        status: updated.status,
        order_index: typeof updated.order === "number" ? updated.order : null,
        version: updated.version,
        published_at: updated.publishedAt || null,
        archived_at: updated.archivedAt || null,
        set_id: updated.setId || null,
        updated_at: updated.updatedAt
      });
    },
    delete: (id) => {
      deleteStmt.run(id);
    }
  };
}
function sqliteQuestionSetStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const hasColumn = (table, column) => {
    try {
      const rows = db.prepare(`PRAGMA table_info(${table})`).all();
      return rows.some((row) => row && row.name === column);
    } catch (e) {
      console.error("[sqliteQuestionSetStore] failed to inspect columns", table, e);
      return false;
    }
  };
  const safeAddColumn = (table, column, ddl) => {
    if (hasColumn(table, column)) return;
    try {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${ddl}`);
      console.info("[sqliteQuestionSetStore] column added", table, column);
    } catch (e) {
      if (String(e).toLowerCase().indexOf("duplicate column name") === -1) {
        console.error("[sqliteQuestionSetStore] add column failed", table, column, e);
      }
    }
  };
  db.exec(`
    CREATE TABLE IF NOT EXISTS question_sets (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL,
      title         TEXT,
      lang          TEXT NOT NULL,
      question_ids_json TEXT NOT NULL,
      status        TEXT NOT NULL DEFAULT 'draft',
      expected_count INTEGER,
      description   TEXT,
      tags_json     TEXT,
      version       INTEGER NOT NULL DEFAULT 1,
      draft_parent_id TEXT,
      published_at  INTEGER,
      archived_at   INTEGER,
      progress_count INTEGER,
      created_at    INTEGER NOT NULL,
      updated_at    INTEGER NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_question_sets_user_id ON question_sets(user_id);
    CREATE INDEX IF NOT EXISTS idx_question_sets_lang ON question_sets(lang);
    CREATE INDEX IF NOT EXISTS idx_question_sets_created_at ON question_sets(created_at DESC);
  `);
  safeAddColumn("question_sets", "status", "TEXT NOT NULL DEFAULT 'draft'");
  safeAddColumn("question_sets", "expected_count", "INTEGER");
  safeAddColumn("question_sets", "description", "TEXT");
  safeAddColumn("question_sets", "tags_json", "TEXT");
  safeAddColumn("question_sets", "version", "INTEGER NOT NULL DEFAULT 1");
  safeAddColumn("question_sets", "draft_parent_id", "TEXT");
  safeAddColumn("question_sets", "published_at", "INTEGER");
  safeAddColumn("question_sets", "archived_at", "INTEGER");
  safeAddColumn("question_sets", "progress_count", "INTEGER");
  try {
    if (hasColumn("question_sets", "status")) {
      db.exec(`CREATE INDEX IF NOT EXISTS idx_question_sets_status ON question_sets(status)`);
    }
    if (hasColumn("question_sets", "draft_parent_id")) {
      db.exec(`CREATE INDEX IF NOT EXISTS idx_question_sets_draft_parent ON question_sets(draft_parent_id)`);
    }
  } catch (e) {
    console.error("[sqliteQuestionSetStore] failed to create indexes", e);
  }
  const createStmt = db.prepare(`
    INSERT INTO question_sets (id, user_id, title, lang, question_ids_json, status, expected_count, description, tags_json, version, draft_parent_id, published_at, archived_at, progress_count, created_at, updated_at)
    VALUES (@id, @user_id, @title, @lang, @question_ids_json, @status, @expected_count, @description, @tags_json, @version, @draft_parent_id, @published_at, @archived_at, @progress_count, @created_at, @updated_at)
  `);
  const getStmt = db.prepare(`SELECT * FROM question_sets WHERE id = ?`);
  const getByUserStmt = db.prepare(`
    SELECT * FROM question_sets 
    WHERE user_id = ? 
    ORDER BY created_at DESC 
    LIMIT ? OFFSET ?
  `);
  const updateStmt = db.prepare(`
    UPDATE question_sets SET
      title = @title,
      question_ids_json = @question_ids_json,
      status = @status,
      expected_count = @expected_count,
      description = @description,
      tags_json = @tags_json,
      version = @version,
      draft_parent_id = @draft_parent_id,
      published_at = @published_at,
      archived_at = @archived_at,
      progress_count = @progress_count,
      updated_at = @updated_at
    WHERE id = @id
  `);
  const deleteStmt = db.prepare(`DELETE FROM question_sets WHERE id = ?`);
  const rowToQuestionSet = (row) => ({
    id: row.id,
    userId: row.user_id,
    title: row.title || void 0,
    lang: row.lang,
    questionIds: JSON.parse(row.question_ids_json || "[]"),
    status: row.status || "draft",
    expectedQuestionCount: typeof row.expected_count === "number" ? row.expected_count : void 0,
    description: row.description || void 0,
    tags: row.tags_json ? JSON.parse(row.tags_json) : void 0,
    version: typeof row.version === "number" ? row.version : 1,
    draftParentId: row.draft_parent_id || void 0,
    publishedAt: row.published_at || void 0,
    archivedAt: row.archived_at || void 0,
    progressQuestionCount: typeof row.progress_count === "number" ? row.progress_count : void 0,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  });
  return {
    create: (set) => {
      createStmt.run({
        id: set.id,
        user_id: set.userId,
        title: set.title || null,
        lang: set.lang,
        question_ids_json: JSON.stringify(set.questionIds),
        status: set.status,
        expected_count: set.expectedQuestionCount || null,
        description: set.description || null,
        tags_json: set.tags ? JSON.stringify(set.tags) : null,
        version: set.version,
        draft_parent_id: set.draftParentId || null,
        published_at: set.publishedAt || null,
        archived_at: set.archivedAt || null,
        progress_count: typeof set.progressQuestionCount === "number" ? set.progressQuestionCount : null,
        created_at: set.createdAt,
        updated_at: set.updatedAt
      });
    },
    get: (id) => {
      const row = getStmt.get(id);
      return row ? rowToQuestionSet(row) : null;
    },
    getByUser: (userId, limit = 50, offset = 0) => {
      const rows = getByUserStmt.all(userId, limit, offset);
      return rows.map(rowToQuestionSet);
    },
    update: (id, updates) => {
      const existing = getStmt.get(id);
      if (!existing) return;
      const updated = {
        ...rowToQuestionSet(existing),
        ...updates,
        updatedAt: Date.now()
      };
      updateStmt.run({
        id: updated.id,
        title: updated.title || null,
        question_ids_json: JSON.stringify(updated.questionIds),
        status: updated.status,
        expected_count: updated.expectedQuestionCount || null,
        description: updated.description || null,
        tags_json: updated.tags ? JSON.stringify(updated.tags) : null,
        version: updated.version,
        draft_parent_id: updated.draftParentId || null,
        published_at: updated.publishedAt || null,
        archived_at: updated.archivedAt || null,
        progress_count: typeof updated.progressQuestionCount === "number" ? updated.progressQuestionCount : null,
        updated_at: updated.updatedAt
      });
    },
    delete: (id) => {
      deleteStmt.run(id);
    }
  };
}

const questions = /* @__PURE__ */ new Map();
const questionSets = /* @__PURE__ */ new Map();
function memoryQuestionStore() {
  return {
    create: (question) => {
      questions.set(question.id, question);
    },
    get: (id) => {
      return questions.get(id) || null;
    },
    getByUser: (userId, limit = 50, offset = 0) => {
      return Array.from(questions.values()).filter((q) => q.userId === userId).sort((a, b) => b.createdAt - a.createdAt).slice(offset, offset + limit);
    },
    getBySet: (setId) => {
      const set = questionSets.get(setId);
      if (!set) return [];
      return set.questionIds.map((id) => questions.get(id)).filter((q) => q !== void 0).sort((a, b) => {
        const aIndex = set.questionIds.indexOf(a.id);
        const bIndex = set.questionIds.indexOf(b.id);
        return aIndex - bIndex;
      });
    },
    update: (id, updates) => {
      const question = questions.get(id);
      if (question) {
        Object.assign(question, updates, { updatedAt: Date.now() });
      }
    },
    delete: (id) => {
      questions.delete(id);
    }
  };
}
function memoryQuestionSetStore() {
  return {
    create: (set) => {
      questionSets.set(set.id, set);
    },
    get: (id) => {
      return questionSets.get(id) || null;
    },
    getByUser: (userId, limit = 50, offset = 0) => {
      return Array.from(questionSets.values()).filter((s) => s.userId === userId).sort((a, b) => b.createdAt - a.createdAt).slice(offset, offset + limit);
    },
    update: (id, updates) => {
      const set = questionSets.get(id);
      if (set) {
        Object.assign(set, updates, { updatedAt: Date.now() });
      }
    },
    delete: (id) => {
      questionSets.delete(id);
    }
  };
}

let _questionStore = null;
let _questionSetStore = null;
function questionStore() {
  if (_questionStore) return _questionStore;
  const dbPath = process.env.QP_SQLITE_PATH;
  _questionStore = dbPath ? sqliteQuestionStore(dbPath) : memoryQuestionStore();
  return _questionStore;
}
function questionSetStore() {
  if (_questionSetStore) return _questionSetStore;
  const dbPath = process.env.QP_SQLITE_PATH;
  _questionSetStore = dbPath ? sqliteQuestionSetStore(dbPath) : memoryQuestionSetStore();
  return _questionSetStore;
}

export { questionSetStore as a, questionStore as q };
