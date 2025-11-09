import Database from 'better-sqlite3';
import fs__default from 'node:fs';
import path__default from 'node:path';
import { M as MAX_ANSWER_TIME_MS, c as computeScoreFromStats } from './utils_DJdXob5E.mjs';
import { a as questionSetStore, q as questionStore } from './index_v9SEP3HN.mjs';

function createInitialAnalytics(questionIds) {
  return {
    totalAnswers: 0,
    uniqueResponders: /* @__PURE__ */ new Set(),
    leaderboard: /* @__PURE__ */ new Map(),
    perQuestion: questionIds.map((questionId, index) => ({
      questionId,
      index,
      correct: 0,
      incorrect: 0,
      total: 0
    }))
  };
}
function serializeAnalytics(analytics) {
  return {
    totalAnswers: analytics.totalAnswers,
    uniqueResponders: Array.from(analytics.uniqueResponders),
    leaderboard: Array.from(analytics.leaderboard.values()),
    perQuestion: analytics.perQuestion
  };
}
function deserializeAnalytics(serialized, questionIds) {
  if (!serialized) {
    return createInitialAnalytics(questionIds);
  }
  const leaderboardMap = /* @__PURE__ */ new Map();
  for (const entry of serialized.leaderboard || []) {
    if (!entry || !entry.userId) continue;
    leaderboardMap.set(entry.userId, {
      userId: entry.userId,
      correct: entry.correct || 0,
      incorrect: entry.incorrect || 0,
      total: entry.total || entry.correct + entry.incorrect || 0,
      lastAnswerAt: entry.lastAnswerAt || 0,
      totalTimeMs: entry.totalTimeMs || 0,
      fastestTimeMs: typeof entry.fastestTimeMs === "number" ? entry.fastestTimeMs : null
    });
  }
  const perQuestionMap = /* @__PURE__ */ new Map();
  for (const q of serialized.perQuestion || []) {
    const index = typeof q.index === "number" ? q.index : -1;
    if (index >= 0) {
      perQuestionMap.set(index, {
        questionId: q.questionId,
        index,
        correct: q.correct || 0,
        incorrect: q.incorrect || 0,
        total: q.total || (q.correct || 0) + (q.incorrect || 0)
      });
    }
  }
  const perQuestion = questionIds.map((id, index) => {
    const existing = perQuestionMap.get(index);
    if (existing) {
      return { ...existing, questionId: existing.questionId || id };
    }
    return {
      questionId: id,
      index,
      correct: 0,
      incorrect: 0,
      total: 0
    };
  });
  return {
    totalAnswers: serialized.totalAnswers || 0,
    uniqueResponders: new Set(serialized.uniqueResponders || []),
    leaderboard: leaderboardMap,
    perQuestion
  };
}
function summarizeAnalytics(analytics) {
  if (!analytics) return void 0;
  const totalAnswers = analytics.totalAnswers;
  const totalCorrect = analytics.perQuestion.reduce((sum, q) => sum + q.correct, 0);
  const unique = analytics.uniqueResponders.size;
  const averageAccuracy = totalAnswers > 0 ? totalCorrect / totalAnswers : 0;
  const leaderboard = Array.from(analytics.leaderboard.values()).map((entry) => {
    const accuracy = entry.total > 0 ? entry.correct / entry.total : 0;
    const averageTimeMs = entry.total > 0 ? entry.totalTimeMs / entry.total : MAX_ANSWER_TIME_MS;
    const score = computeScoreFromStats(entry.correct, entry.total, entry.totalTimeMs);
    return {
      ...entry,
      accuracy,
      averageTimeMs,
      score
    };
  }).sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.correct !== a.correct) return b.correct - a.correct;
    if (a.total !== b.total) return a.total - b.total;
    return (b.lastAnswerAt || 0) - (a.lastAnswerAt || 0);
  });
  return {
    totalAnswers,
    uniqueResponders: unique,
    averageAccuracy,
    leaderboard,
    perQuestion: analytics.perQuestion
  };
}
function updateAnalyticsForAnswer(analytics, questionId, qIndex, memberId, prevIsCorrect, isCorrect, timestamp, answerTimeMs) {
  if (!analytics.perQuestion[qIndex]) {
    analytics.perQuestion[qIndex] = {
      questionId,
      index: qIndex,
      correct: 0,
      incorrect: 0,
      total: 0
    };
  }
  const qStats = analytics.perQuestion[qIndex];
  qStats.questionId = qStats.questionId || questionId;
  if (prevIsCorrect === null) {
    qStats.total += 1;
    if (isCorrect) {
      qStats.correct += 1;
    } else {
      qStats.incorrect += 1;
    }
    analytics.totalAnswers += 1;
    analytics.uniqueResponders.add(memberId);
  } else if (prevIsCorrect !== isCorrect) {
    if (prevIsCorrect) {
      qStats.correct = Math.max(0, qStats.correct - 1);
      qStats.incorrect += 1;
    } else {
      qStats.incorrect = Math.max(0, qStats.incorrect - 1);
      qStats.correct += 1;
    }
  }
  const leaderboard = analytics.leaderboard;
  const entry = leaderboard.get(memberId) || {
    userId: memberId,
    correct: 0,
    incorrect: 0,
    total: 0,
    lastAnswerAt: 0,
    totalTimeMs: 0,
    fastestTimeMs: null
  };
  if (prevIsCorrect === null) {
    entry.total += 1;
    if (isCorrect) {
      entry.correct += 1;
    } else {
      entry.incorrect += 1;
    }
    const clampedTime = Math.max(0, Math.min(answerTimeMs, MAX_ANSWER_TIME_MS));
    entry.totalTimeMs += clampedTime;
    if (entry.fastestTimeMs === null || clampedTime < entry.fastestTimeMs) {
      entry.fastestTimeMs = clampedTime;
    }
  } else if (prevIsCorrect !== isCorrect) {
    if (prevIsCorrect) {
      entry.correct = Math.max(0, entry.correct - 1);
      entry.incorrect += 1;
    } else {
      entry.incorrect = Math.max(0, entry.incorrect - 1);
      entry.correct += 1;
    }
  }
  entry.lastAnswerAt = timestamp;
  leaderboard.set(memberId, entry);
}

function shuffleArray(source) {
  const arr = source.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
  return arr;
}
function initChoiceOrders() {
  return /* @__PURE__ */ new Map();
}
function getOrCreateChoiceOrder(orders, qIndex, memberId, baseChoices) {
  let questionOrders = orders.get(qIndex);
  if (!questionOrders) {
    questionOrders = /* @__PURE__ */ new Map();
    orders.set(qIndex, questionOrders);
  }
  const existing = questionOrders.get(memberId);
  if (existing && existing.length === baseChoices.length) {
    return existing.slice();
  }
  const newOrder = shuffleArray(baseChoices);
  questionOrders.set(memberId, newOrder);
  return newOrder.slice();
}
function serializeChoiceOrders(orders) {
  const result = {};
  orders.forEach((userMap, qIndex) => {
    const users = {};
    userMap.forEach((choices, userId) => {
      users[userId] = choices.slice();
    });
    result[String(qIndex)] = users;
  });
  return result;
}
function deserializeChoiceOrders(raw) {
  const orders = initChoiceOrders();
  if (!raw || typeof raw !== "object") return orders;
  Object.keys(raw).forEach((qIndexKey) => {
    const userObj = raw[qIndexKey];
    if (!userObj || typeof userObj !== "object") return;
    const userMap = /* @__PURE__ */ new Map();
    Object.keys(userObj).forEach((userId) => {
      const arr = Array.isArray(userObj[userId]) ? userObj[userId].map((c) => String(c)) : [];
      userMap.set(userId, arr);
    });
    orders.set(Number(qIndexKey), userMap);
  });
  return orders;
}

function computeAnalyticsSummary(raw) {
  if (!raw) return { averageAccuracy: 0, totalAnswers: 0 };
  let json;
  try {
    json = typeof raw === "string" ? JSON.parse(raw) : JSON.parse(String(raw));
  } catch {
    return { averageAccuracy: 0, totalAnswers: 0 };
  }
  if (!json || typeof json !== "object") return { averageAccuracy: 0, totalAnswers: 0 };
  const totalAnswers = Number(json.totalAnswers) || 0;
  if (totalAnswers <= 0) return { averageAccuracy: 0, totalAnswers: 0 };
  let totalCorrect = 0;
  if (Array.isArray(json.perQuestion)) {
    for (const item of json.perQuestion) {
      if (!item) continue;
      totalCorrect += Number(item.correct) || 0;
    }
  }
  return {
    averageAccuracy: totalCorrect / totalAnswers,
    totalAnswers
  };
}
function sqliteRoomStore(dbPath) {
  fs__default.mkdirSync(path__default.dirname(dbPath), { recursive: true });
  const db = new Database(dbPath);
  const safeAddColumn = (column, ddl) => {
    try {
      db.exec(`ALTER TABLE rooms ADD COLUMN ${column} ${ddl}`);
    } catch (e) {
      if (String(e).toLowerCase().indexOf("duplicate column name") === -1) {
        console.error("[sqliteRoomStore] add column failed", column, e);
      }
    }
  };
  db.exec(`
    CREATE TABLE IF NOT EXISTS rooms (
      id            TEXT PRIMARY KEY,
      host_id       TEXT NOT NULL,
      lang          TEXT NOT NULL,
      created_at    INTEGER NOT NULL,
      current_index  INTEGER NOT NULL DEFAULT 0,
      questions_json TEXT NOT NULL,
      members_json  TEXT NOT NULL,
      answers_json  TEXT NOT NULL,
      analytics_json TEXT,
      choice_orders_json TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_rooms_created_at ON rooms(created_at DESC);
    CREATE INDEX IF NOT EXISTS idx_rooms_lang ON rooms(lang);
  `);
  safeAddColumn("analytics_json", "TEXT");
  safeAddColumn("choice_orders_json", "TEXT");
  const createStmt = db.prepare(`
    INSERT INTO rooms (id, host_id, lang, created_at, current_index, questions_json, members_json, answers_json, analytics_json, choice_orders_json)
    VALUES (@id, @host_id, @lang, @created_at, @current_index, @questions_json, @members_json, @answers_json, @analytics_json, @choice_orders_json)
  `);
  const getStmt = db.prepare(`SELECT * FROM rooms WHERE id = ?`);
  const updateStmt = db.prepare(`
    UPDATE rooms
    SET current_index = @current_index,
        members_json = @members_json,
        answers_json = @answers_json,
        analytics_json = @analytics_json,
        choice_orders_json = @choice_orders_json
    WHERE id = @id
  `);
  const deleteStmt = db.prepare(`DELETE FROM rooms WHERE id = ?`);
  return {
    create: (room) => {
      const members = Array.from(room.members);
      const answersObj = {};
      room.answers.forEach((answerMap, qIndex) => {
        const obj = {};
        answerMap.forEach((choice, uid) => {
          obj[uid] = choice;
        });
        answersObj[String(qIndex)] = obj;
      });
      const analyticsJson = JSON.stringify(serializeAnalytics(room.analytics));
      const choiceOrdersJson = JSON.stringify(serializeChoiceOrders(room.choiceOrders));
      createStmt.run({
        id: room.id,
        host_id: room.hostId,
        lang: room.lang,
        created_at: room.createdAt,
        current_index: room.currentIndex,
        questions_json: JSON.stringify(room.questions),
        members_json: JSON.stringify(members),
        answers_json: JSON.stringify(answersObj),
        analytics_json: analyticsJson,
        choice_orders_json: choiceOrdersJson
      });
    },
    get: (id) => {
      const row = getStmt.get(id);
      if (!row) return null;
      const questions = JSON.parse(row.questions_json || "[]");
      const members = new Set(JSON.parse(row.members_json || "[]"));
      const answersObj = JSON.parse(row.answers_json || "{}");
      const answers = /* @__PURE__ */ new Map();
      Object.entries(answersObj).forEach(([qIndex, answerMap]) => {
        const map = /* @__PURE__ */ new Map();
        Object.entries(answerMap).forEach(([uid, choice]) => {
          map.set(uid, choice);
        });
        answers.set(Number(qIndex), map);
      });
      const analytics = deserializeAnalytics(
        row.analytics_json ? JSON.parse(row.analytics_json) : void 0,
        questions.map((q) => q.id || "")
      );
      const choiceOrders = deserializeChoiceOrders(row.choice_orders_json ? JSON.parse(row.choice_orders_json) : void 0);
      return {
        id: row.id,
        hostId: row.host_id,
        lang: row.lang,
        createdAt: row.created_at,
        currentIndex: row.current_index,
        questions,
        members,
        answers,
        analytics,
        choiceOrders
      };
    },
    update: (id, updates) => {
      const room = getStmt.get(id);
      if (!room) return;
      const currentIndex = updates.currentIndex !== void 0 ? updates.currentIndex : room.current_index;
      const members = updates.members ? Array.from(updates.members) : JSON.parse(room.members_json || "[]");
      const answersObj = {};
      if (updates.answers) {
        updates.answers.forEach((answerMap, qIndex) => {
          const obj = {};
          answerMap.forEach((choice, uid) => {
            obj[uid] = choice;
          });
          answersObj[String(qIndex)] = obj;
        });
      } else {
        const parsed = JSON.parse(room.answers_json || "{}");
        Object.assign(answersObj, parsed);
      }
      let analyticsJson = room.analytics_json;
      if (updates.analytics) {
        analyticsJson = JSON.stringify(serializeAnalytics(updates.analytics));
      }
      let choiceOrdersJson = room.choice_orders_json;
      if (updates.choiceOrders) {
        choiceOrdersJson = JSON.stringify(serializeChoiceOrders(updates.choiceOrders));
      }
      updateStmt.run({
        id,
        current_index: currentIndex,
        members_json: JSON.stringify(members),
        answers_json: JSON.stringify(answersObj),
        analytics_json: analyticsJson,
        choice_orders_json: choiceOrdersJson
      });
    },
    list: (params) => {
      const { limit = 20, offset = 0, sortBy = "created", order = "desc", lang, createdAfter } = params;
      const orderDir = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
      const sortExpr = sortBy === "members" ? "json_array_length(members_json)" : "created_at";
      const filters = [];
      if (lang) filters.push("lang = @lang");
      if (typeof createdAfter === "number" && !Number.isNaN(createdAfter) && createdAfter > 0) {
        filters.push("created_at >= @createdAfter");
      }
      const whereClause = filters.length ? `WHERE ${filters.join(" AND ")}` : "";
      const sql = `SELECT id, host_id as hostId, lang, created_at as createdAt, json_array_length(members_json) as memberCount, analytics_json FROM rooms ${whereClause} ORDER BY ${sortExpr} ${orderDir} LIMIT @limit OFFSET @offset`;
      const stmt = db.prepare(sql);
      const rows = stmt.all({ lang, limit, offset, createdAfter });
      return rows.map((r) => {
        const analyticsSummary = computeAnalyticsSummary(r.analytics_json);
        return {
          id: r.id,
          hostId: r.hostId,
          lang: r.lang,
          createdAt: r.createdAt,
          memberCount: r.memberCount || 0,
          averageAccuracy: analyticsSummary.averageAccuracy,
          totalAnswers: analyticsSummary.totalAnswers
        };
      });
    },
    delete: (id) => {
      deleteStmt.run(id);
    }
  };
}

const rooms = /* @__PURE__ */ new Map();
function memoryRoomStore() {
  return {
    create: (room) => {
      rooms.set(room.id, room);
    },
    get: (id) => {
      return rooms.get(id) || null;
    },
    update: (id, updates) => {
      const room = rooms.get(id);
      if (!room) return;
      if (updates.currentIndex !== void 0) room.currentIndex = updates.currentIndex;
      if (updates.members) room.members = updates.members;
      if (updates.answers) room.answers = updates.answers;
      if (updates.analytics) room.analytics = updates.analytics;
      if (updates.choiceOrders) room.choiceOrders = updates.choiceOrders;
    },
    list: (params) => {
      const { limit = 20, offset = 0, sortBy = "created", order = "desc", lang, createdAfter } = params;
      let arr = Array.from(rooms.values());
      if (lang) {
        arr = arr.filter((r) => r.lang === lang);
      }
      if (typeof createdAfter === "number" && !Number.isNaN(createdAfter) && createdAfter > 0) {
        arr = arr.filter((r) => r.createdAt >= createdAfter);
      }
      if (sortBy === "members") {
        arr.sort((a, b) => {
          const diff = a.members.size - b.members.size;
          return order === "desc" ? -diff : diff;
        });
      } else {
        arr.sort((a, b) => {
          const diff = a.createdAt - b.createdAt;
          return order === "desc" ? -diff : diff;
        });
      }
      return arr.slice(offset, offset + limit).map((r) => {
        const totalAnswers = r.analytics?.totalAnswers || 0;
        const totalCorrect = r.analytics?.perQuestion.reduce((sum, q) => sum + q.correct, 0) || 0;
        const averageAccuracy = totalAnswers > 0 ? totalCorrect / totalAnswers : 0;
        return {
          id: r.id,
          hostId: r.hostId,
          lang: r.lang,
          createdAt: r.createdAt,
          memberCount: r.members.size,
          averageAccuracy,
          totalAnswers
        };
      });
    },
    delete: (id) => {
      rooms.delete(id);
    }
  };
}

let _roomStore = null;
function getRoomStore() {
  if (_roomStore) return _roomStore;
  const dbPath = process.env.QP_SQLITE_PATH;
  _roomStore = dbPath ? sqliteRoomStore(dbPath) : memoryRoomStore();
  return _roomStore;
}
async function loadQuestionsFromSet(setId) {
  const set = questionSetStore().get(setId);
  if (!set) return [];
  const store = questionStore();
  const questions = [];
  for (const questionId of set.questionIds) {
    const q = store.get(questionId);
    if (!q) continue;
    questions.push({
      id: q.id,
      question: q.question,
      choices: q.choices.slice(),
      correctAnswer: q.correctAnswer
    });
  }
  return questions;
}
function uid() {
  return Math.random().toString(36).slice(2, 10);
}
async function createRoom(lang, hostId, questionSetId, options) {
  const store = getRoomStore();
  const id = options && options.roomId && options.roomId.trim().length ? options.roomId.trim() : uid();
  const questions = await loadQuestionsFromSet(questionSetId);
  if (questions.length === 0) {
    throw new Error("Question set is empty or not found");
  }
  const analytics = createInitialAnalytics(questions.map((q) => q.id));
  const choiceOrders = initChoiceOrders();
  const room = {
    id,
    hostId,
    lang,
    createdAt: Date.now(),
    currentIndex: 0,
    questions,
    members: /* @__PURE__ */ new Set([hostId]),
    answers: /* @__PURE__ */ new Map(),
    analytics,
    choiceOrders
  };
  if (options && options.replaceExisting) {
    store.delete(id);
  }
  store.create(room);
  return room;
}
function joinRoom(id, memberId) {
  const store = getRoomStore();
  const r = store.get(id);
  if (!r) return null;
  r.members.add(memberId);
  store.update(id, { members: r.members });
  return r;
}
function getRoomState(id, memberId) {
  const r = getRoomStore().get(id);
  if (!r) return null;
  const totalQuestions = r.questions.length;
  const rawIndex = r.currentIndex;
  const completed = totalQuestions > 0 && rawIndex >= totalQuestions;
  const effectiveIndex = completed ? Math.max(totalQuestions - 1, 0) : Math.max(Math.min(rawIndex, Math.max(totalQuestions - 1, 0)), 0);
  const q = totalQuestions > 0 ? r.questions[effectiveIndex] : void 0;
  let needPersistOrders = false;
  let userQuestion;
  if (q && !completed) {
    let choices = q.choices.slice();
    if (memberId) {
      const existingOrder = r.choiceOrders.get(effectiveIndex)?.has(memberId);
      choices = getOrCreateChoiceOrder(r.choiceOrders, effectiveIndex, memberId, q.choices);
      if (!existingOrder) {
        needPersistOrders = true;
      }
    }
    userQuestion = { id: q.id, question: q.question, choices };
  }
  if (needPersistOrders) {
    getRoomStore().update(id, { choiceOrders: r.choiceOrders });
  }
  const analyticsSummary = summarizeAnalytics(r.analytics);
  return {
    id: r.id,
    hostId: r.hostId,
    lang: r.lang,
    currentIndex: completed ? Math.max(totalQuestions - 1, 0) : r.currentIndex,
    total: r.questions.length,
    completed,
    members: Array.from(r.members),
    question: completed ? void 0 : userQuestion,
    analytics: analyticsSummary
  };
}
function advanceRoom(id, who) {
  const store = getRoomStore();
  const r = store.get(id);
  if (!r || r.hostId !== who) return null;
  if (r.questions.length === 0) {
    return getRoomState(id, who);
  }
  if (r.currentIndex >= r.questions.length) {
    return getRoomState(id, who);
  }
  if (r.currentIndex < r.questions.length - 1) {
    r.currentIndex = r.currentIndex + 1;
  } else {
    r.currentIndex = r.questions.length;
  }
  store.update(id, { currentIndex: r.currentIndex });
  return getRoomState(id, who);
}
function submitAnswer(id, qIndex, memberId, choice, timeSpentMs) {
  const store = getRoomStore();
  const r = store.get(id);
  if (!r) return false;
  if (!r.answers.has(qIndex)) r.answers.set(qIndex, /* @__PURE__ */ new Map());
  const answersForQuestion = r.answers.get(qIndex);
  const question = r.questions[qIndex];
  if (!question) return false;
  const previousChoice = answersForQuestion.get(memberId);
  const correctAnswer = question.correctAnswer;
  const prevIsCorrect = previousChoice ? previousChoice === correctAnswer : null;
  const isCorrect = choice === correctAnswer;
  answersForQuestion.set(memberId, choice);
  r.answers.set(qIndex, answersForQuestion);
  updateAnalyticsForAnswer(
    r.analytics,
    question.id,
    qIndex,
    memberId,
    prevIsCorrect,
    isCorrect,
    Date.now(),
    typeof timeSpentMs === "number" ? timeSpentMs : MAX_ANSWER_TIME_MS
  );
  store.update(id, { answers: r.answers, analytics: r.analytics });
  return true;
}
function listRooms(params) {
  return getRoomStore().list(params);
}

export { advanceRoom, createRoom, getRoomState, getRoomStore, joinRoom, listRooms, submitAnswer };
