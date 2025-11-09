import Database from 'better-sqlite3';
import { c as computeScoreFromStats } from './utils_DJdXob5E.mjs';
import fs__default from 'node:fs';
import path__default from 'node:path';

function sqliteScoreStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const safeAddColumn = (column, ddl) => {
    try {
      db.exec(`ALTER TABLE score_records ADD COLUMN ${column} ${ddl}`);
    } catch (e) {
      if (String(e).toLowerCase().indexOf("duplicate column name") === -1) {
        console.error("[sqliteScoreStore] add column failed", column, e);
      }
    }
  };
  db.exec(`
    CREATE TABLE IF NOT EXISTS score_records (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL,
      room_id       TEXT NOT NULL,
      question_id   TEXT NOT NULL,
      question_index INTEGER NOT NULL,
      user_choice   TEXT NOT NULL,
      correct_answer TEXT NOT NULL,
      is_correct    INTEGER NOT NULL,
      answered_at   INTEGER NOT NULL,
      time_spent_ms INTEGER NOT NULL DEFAULT 0,
      lang          TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_scores_user_id ON score_records(user_id);
    CREATE INDEX IF NOT EXISTS idx_scores_room_id ON score_records(room_id);
    CREATE INDEX IF NOT EXISTS idx_scores_answered_at ON score_records(answered_at DESC);
    CREATE INDEX IF NOT EXISTS idx_scores_user_room ON score_records(user_id, room_id);
  `);
  safeAddColumn("time_spent_ms", "INTEGER NOT NULL DEFAULT 0");
  const recordStmt = db.prepare(`
    INSERT INTO score_records (id, user_id, room_id, question_id, question_index, user_choice, correct_answer, is_correct, answered_at, time_spent_ms, lang)
    VALUES (@id, @user_id, @room_id, @question_id, @question_index, @user_choice, @correct_answer, @is_correct, @answered_at, @time_spent_ms, @lang)
  `);
  const getUserStatsStmt = db.prepare(`
    SELECT 
      user_id,
      COUNT(*) as total_answered,
      SUM(is_correct) as total_correct,
      COUNT(DISTINCT room_id) as total_rooms,
      MAX(answered_at) as last_played_at
    FROM score_records
    WHERE user_id = ?
    GROUP BY user_id
  `);
  const getUserHistoryStmt = db.prepare(`
    SELECT * FROM score_records
    WHERE user_id = ?
    ORDER BY answered_at DESC
    LIMIT ? OFFSET ?
  `);
  const getUserRoomSummaryStmt = db.prepare(`
    SELECT 
      room_id,
      COUNT(*) as total_answered,
      SUM(is_correct) as total_correct,
      MAX(answered_at) as last_answered_at,
      MAX(lang) as lang
    FROM score_records
    WHERE user_id = ?
    GROUP BY room_id
    ORDER BY last_answered_at DESC
    LIMIT ? OFFSET ?
  `);
  const getRoomScoresStmt = db.prepare(`
    SELECT 
      user_id,
      SUM(is_correct) as total_correct,
      COUNT(*) as total_answered,
      SUM(time_spent_ms) as total_time_ms,
      MIN(CASE WHEN time_spent_ms > 0 THEN time_spent_ms ELSE NULL END) as fastest_time_ms,
      MAX(answered_at) as last_answered_at
    FROM score_records
    WHERE room_id = ?
    GROUP BY user_id
  `);
  const getLeaderboardStmt = db.prepare(`
    SELECT 
      user_id,
      SUM(is_correct) as total_correct,
      COUNT(*) as total_answered,
      CAST(SUM(is_correct) AS REAL) / COUNT(*) as accuracy,
      SUM(time_spent_ms) as total_time_ms
    FROM score_records
    GROUP BY user_id
    HAVING total_answered >= 5
    ORDER BY total_correct DESC, accuracy DESC
    LIMIT ?
  `);
  return {
    record: (record) => {
      recordStmt.run({
        id: record.id,
        user_id: record.userId,
        room_id: record.roomId,
        question_id: record.questionId,
        question_index: record.questionIndex,
        user_choice: record.userChoice,
        correct_answer: record.correctAnswer,
        is_correct: record.isCorrect ? 1 : 0,
        answered_at: record.answeredAt,
        time_spent_ms: Math.max(0, Math.floor(record.timeSpentMs)),
        lang: record.lang
      });
    },
    getUserStats: (userId) => {
      const row = getUserStatsStmt.get(userId);
      if (!row) {
        return {
          userId,
          totalAnswered: 0,
          totalCorrect: 0,
          accuracy: 0,
          totalRooms: 0
        };
      }
      const totalAnswered = Number(row.total_answered) || 0;
      const totalCorrect = Number(row.total_correct) || 0;
      const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;
      return {
        userId,
        totalAnswered,
        totalCorrect,
        accuracy,
        totalRooms: Number(row.total_rooms) || 0,
        lastPlayedAt: row.last_played_at ? Number(row.last_played_at) : void 0
      };
    },
    getUserHistory: (userId, limit = 50, offset = 0) => {
      const rows = getUserHistoryStmt.all(userId, limit, offset);
      return rows.map((r) => ({
        id: r.id,
        userId: r.user_id,
        roomId: r.room_id,
        questionId: r.question_id,
        questionIndex: r.question_index,
        userChoice: r.user_choice,
        correctAnswer: r.correct_answer,
        isCorrect: r.is_correct === 1,
        answeredAt: r.answered_at,
        timeSpentMs: r.time_spent_ms ? Number(r.time_spent_ms) : 0,
        lang: r.lang
      }));
    },
    getUserRoomSummary: (userId, limit = 50, offset = 0) => {
      const rows = getUserRoomSummaryStmt.all(userId, limit, offset);
      return rows.map((r) => {
        const totalAnswered = Number(r.total_answered) || 0;
        const totalCorrect = Number(r.total_correct) || 0;
        const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;
        return {
          roomId: r.room_id,
          totalAnswered,
          totalCorrect,
          accuracy,
          lastAnsweredAt: Number(r.last_answered_at) || 0,
          lang: r.lang || void 0
        };
      });
    },
    getRoomScores: (roomId) => {
      const rows = getRoomScoresStmt.all(roomId);
      return rows.map((r) => ({
        userId: r.user_id,
        totalCorrect: Number(r.total_correct) || 0,
        totalAnswered: Number(r.total_answered) || 0,
        accuracy: Number(r.total_answered) > 0 ? (Number(r.total_correct) || 0) / Number(r.total_answered) : 0,
        totalTimeMs: Number(r.total_time_ms) || 0,
        averageTimeMs: Number(r.total_answered) > 0 ? (Number(r.total_time_ms) || 0) / Number(r.total_answered) : 0,
        fastestTimeMs: r.fastest_time_ms !== null ? Number(r.fastest_time_ms) : null,
        score: computeScoreFromStats(
          Number(r.total_correct) || 0,
          Number(r.total_answered) || 0,
          Number(r.total_time_ms) || 0
        ),
        lastAnsweredAt: Number(r.last_answered_at) || 0
      }));
    },
    getLeaderboard: (limit = 100) => {
      const rows = getLeaderboardStmt.all(limit);
      return rows.map((r) => ({
        userId: r.user_id,
        totalCorrect: Number(r.total_correct) || 0,
        totalAnswered: Number(r.total_answered) || 0,
        accuracy: Number(r.accuracy) || 0,
        score: computeScoreFromStats(
          Number(r.total_correct) || 0,
          Number(r.total_answered) || 0,
          Number(r.total_time_ms) || 0
        )
      }));
    }
  };
}

const records = /* @__PURE__ */ new Map();
function memoryScoreStore() {
  return {
    record: (record) => {
      records.set(record.id, record);
    },
    getUserStats: (userId) => {
      const userRecords = Array.from(records.values()).filter((r) => r.userId === userId);
      if (userRecords.length === 0) {
        return {
          userId,
          totalAnswered: 0,
          totalCorrect: 0,
          accuracy: 0,
          totalRooms: 0
        };
      }
      const totalAnswered = userRecords.length;
      const totalCorrect = userRecords.filter((r) => r.isCorrect).length;
      const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0;
      const rooms = new Set(userRecords.map((r) => r.roomId));
      const lastPlayedAt = Math.max(...userRecords.map((r) => r.answeredAt));
      return {
        userId,
        totalAnswered,
        totalCorrect,
        accuracy,
        totalRooms: rooms.size,
        lastPlayedAt
      };
    },
    getUserHistory: (userId, limit = 50, offset = 0) => {
      return Array.from(records.values()).filter((r) => r.userId === userId).sort((a, b) => b.answeredAt - a.answeredAt).slice(offset, offset + limit);
    },
    getUserRoomSummary: (userId, limit = 50, offset = 0) => {
      const roomMap = /* @__PURE__ */ new Map();
      for (const record of records.values()) {
        if (record.userId !== userId) continue;
        const summary = roomMap.get(record.roomId) || { totalAnswered: 0, totalCorrect: 0, lastAnsweredAt: 0, lang: record.lang };
        summary.totalAnswered += 1;
        if (record.isCorrect) summary.totalCorrect += 1;
        if (!summary.lang) summary.lang = record.lang;
        if (record.answeredAt > summary.lastAnsweredAt) summary.lastAnsweredAt = record.answeredAt;
        roomMap.set(record.roomId, summary);
      }
      const summaries = Array.from(roomMap.entries()).map(([roomId, summary]) => ({
        roomId,
        totalAnswered: summary.totalAnswered,
        totalCorrect: summary.totalCorrect,
        accuracy: summary.totalAnswered > 0 ? summary.totalCorrect / summary.totalAnswered : 0,
        lastAnsweredAt: summary.lastAnsweredAt,
        lang: summary.lang
      }));
      return summaries.sort((a, b) => b.lastAnsweredAt - a.lastAnsweredAt).slice(offset, offset + limit);
    },
    getRoomScores: (roomId) => {
      const roomRecords = Array.from(records.values()).filter((r) => r.roomId === roomId);
      const userScores = /* @__PURE__ */ new Map();
      for (const record of roomRecords) {
        const existing = userScores.get(record.userId) || {
          correct: 0,
          total: 0,
          totalTimeMs: 0,
          fastestTimeMs: null,
          lastAnsweredAt: 0
        };
        existing.total++;
        if (record.isCorrect) existing.correct++;
        const timeSpent = Number.isFinite(record.timeSpentMs) ? Math.max(0, record.timeSpentMs) : 0;
        existing.totalTimeMs += timeSpent;
        if (existing.fastestTimeMs === null || timeSpent < existing.fastestTimeMs) {
          existing.fastestTimeMs = timeSpent;
        }
        if (record.answeredAt > existing.lastAnsweredAt) {
          existing.lastAnsweredAt = record.answeredAt;
        }
        userScores.set(record.userId, existing);
      }
      return Array.from(userScores.entries()).map(([userId, score]) => ({
        userId,
        totalCorrect: score.correct,
        totalAnswered: score.total,
        accuracy: score.total > 0 ? score.correct / score.total : 0,
        totalTimeMs: score.totalTimeMs,
        averageTimeMs: score.total > 0 ? score.totalTimeMs / score.total : 0,
        fastestTimeMs: score.fastestTimeMs,
        score: computeScoreFromStats(score.correct, score.total, score.totalTimeMs),
        lastAnsweredAt: score.lastAnsweredAt
      }));
    },
    getLeaderboard: (limit = 100) => {
      const userStats = /* @__PURE__ */ new Map();
      for (const record of records.values()) {
        const existing = userStats.get(record.userId) || { correct: 0, answered: 0, totalTimeMs: 0 };
        existing.answered++;
        if (record.isCorrect) existing.correct++;
        existing.totalTimeMs += Number.isFinite(record.timeSpentMs) ? Math.max(0, record.timeSpentMs) : 0;
        userStats.set(record.userId, existing);
      }
      return Array.from(userStats.entries()).filter(([, stats]) => stats.answered >= 5).map(([userId, stats]) => ({
        userId,
        totalCorrect: stats.correct,
        totalAnswered: stats.answered,
        accuracy: stats.answered > 0 ? stats.correct / stats.answered : 0,
        score: computeScoreFromStats(stats.correct, stats.answered, stats.totalTimeMs)
      })).sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
        return b.accuracy - a.accuracy;
      }).slice(0, limit);
    }
  };
}

let _store = null;
function scoreStore() {
  if (_store) return _store;
  const dbPath = process.env.QP_SQLITE_PATH;
  _store = dbPath ? sqliteScoreStore(dbPath) : memoryScoreStore();
  return _store;
}

export { scoreStore as s };
