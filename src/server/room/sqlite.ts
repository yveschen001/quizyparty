import Database from 'better-sqlite3'
import fs from 'node:fs'
import path from 'node:path'
import type { Question, Room, RoomState } from './store'
import { serializeAnalytics, deserializeAnalytics, type SerializedRoomAnalytics } from './analytics'
import { serializeChoiceOrders, deserializeChoiceOrders } from './choice-orders'

export interface RoomStore {
  create(room: Room): void
  get(id: string): Room | null
  update(id: string, updates: Partial<Room>): void
  list(params: {
    limit?: number
    offset?: number
    sortBy?: 'created' | 'members'
    order?: 'asc' | 'desc'
    lang?: string
    createdAfter?: number
  }): Array<{ id: string; hostId: string; lang: string; createdAt: number; memberCount: number }>
  delete(id: string): void
}

function computeAnalyticsSummary(raw: any): { averageAccuracy: number; totalAnswers: number } {
  if (!raw) return { averageAccuracy: 0, totalAnswers: 0 }
  let json: any
  try {
    json = typeof raw === 'string' ? JSON.parse(raw) : JSON.parse(String(raw))
  } catch {
    return { averageAccuracy: 0, totalAnswers: 0 }
  }
  if (!json || typeof json !== 'object') return { averageAccuracy: 0, totalAnswers: 0 }
  const totalAnswers = Number(json.totalAnswers) || 0
  if (totalAnswers <= 0) return { averageAccuracy: 0, totalAnswers: 0 }
  let totalCorrect = 0
  if (Array.isArray(json.perQuestion)) {
    for (const item of json.perQuestion) {
      if (!item) continue
      totalCorrect += Number(item.correct) || 0
    }
  }
  return {
    averageAccuracy: totalCorrect / totalAnswers,
    totalAnswers,
  }
}

export function sqliteRoomStore(dbPath: string): RoomStore {
  fs.mkdirSync(path.dirname(dbPath), { recursive: true })
  const db = new Database(dbPath)

  const safeAddColumn = (column: string, ddl: string) => {
    try {
      db.exec(`ALTER TABLE rooms ADD COLUMN ${column} ${ddl}`)
    } catch (e) {
      if (String(e).toLowerCase().indexOf('duplicate column name') === -1) {
        console.error('[sqliteRoomStore] add column failed', column, e)
      }
    }
  }

  // Main rooms table
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
  `)

  safeAddColumn('analytics_json', 'TEXT')
  safeAddColumn('choice_orders_json', 'TEXT')

  const createStmt = db.prepare(`
    INSERT INTO rooms (id, host_id, lang, created_at, current_index, questions_json, members_json, answers_json, analytics_json, choice_orders_json)
    VALUES (@id, @host_id, @lang, @created_at, @current_index, @questions_json, @members_json, @answers_json, @analytics_json, @choice_orders_json)
  `)

  const getStmt = db.prepare(`SELECT * FROM rooms WHERE id = ?`)

  const updateStmt = db.prepare(`
    UPDATE rooms
    SET current_index = @current_index,
        members_json = @members_json,
        answers_json = @answers_json,
        analytics_json = @analytics_json,
        choice_orders_json = @choice_orders_json
    WHERE id = @id
  `)

  const deleteStmt = db.prepare(`DELETE FROM rooms WHERE id = ?`)

  return {
    create: (room: Room) => {
      const members = Array.from(room.members)
      const answersObj: Record<string, Record<string, string>> = {}
      room.answers.forEach((answerMap, qIndex) => {
        const obj: Record<string, string> = {}
        answerMap.forEach((choice, uid) => {
          obj[uid] = choice
        })
        answersObj[String(qIndex)] = obj
      })
      const analyticsJson = JSON.stringify(serializeAnalytics(room.analytics))
      const choiceOrdersJson = JSON.stringify(serializeChoiceOrders(room.choiceOrders))

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
        choice_orders_json: choiceOrdersJson,
      })
    },

    get: (id: string) => {
      const row = getStmt.get(id) as any
      if (!row) return null

      const questions = JSON.parse(row.questions_json || '[]') as Question[]
      const members = new Set<string>(JSON.parse(row.members_json || '[]') as string[])
      const answersObj = JSON.parse(row.answers_json || '{}') as Record<string, Record<string, string>>
      const answers = new Map<number, Map<string, string>>()
      Object.entries(answersObj).forEach(([qIndex, answerMap]) => {
        const map = new Map<string, string>()
        Object.entries(answerMap).forEach(([uid, choice]) => {
          map.set(uid, choice)
        })
        answers.set(Number(qIndex), map)
      })

      const analytics = deserializeAnalytics(
        row.analytics_json ? (JSON.parse(row.analytics_json) as SerializedRoomAnalytics) : undefined,
        questions.map((q) => q.id || '')
      )
      const choiceOrders = deserializeChoiceOrders(row.choice_orders_json ? JSON.parse(row.choice_orders_json) : undefined)

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
        choiceOrders,
      } as Room
    },

    update: (id: string, updates: Partial<Room>) => {
      const room = getStmt.get(id) as any
      if (!room) return

      const currentIndex = updates.currentIndex !== undefined ? updates.currentIndex : room.current_index
      const members = updates.members ? Array.from(updates.members) : JSON.parse(room.members_json || '[]')
      const answersObj: Record<string, Record<string, string>> = {}
      if (updates.answers) {
        updates.answers.forEach((answerMap, qIndex) => {
          const obj: Record<string, string> = {}
          answerMap.forEach((choice, uid) => {
            obj[uid] = choice
          })
          answersObj[String(qIndex)] = obj
        })
      } else {
        const parsed = JSON.parse(room.answers_json || '{}')
        Object.assign(answersObj, parsed)
      }

      let analyticsJson = room.analytics_json
      if (updates.analytics) {
        analyticsJson = JSON.stringify(serializeAnalytics(updates.analytics))
      }

      let choiceOrdersJson = room.choice_orders_json
      if (updates.choiceOrders) {
        choiceOrdersJson = JSON.stringify(serializeChoiceOrders(updates.choiceOrders))
      }

      updateStmt.run({
        id,
        current_index: currentIndex,
        members_json: JSON.stringify(members),
        answers_json: JSON.stringify(answersObj),
        analytics_json: analyticsJson,
        choice_orders_json: choiceOrdersJson,
      })
    },

    list: (params) => {
      const { limit = 20, offset = 0, sortBy = 'created', order = 'desc', lang, createdAfter } = params
      const orderDir = order.toUpperCase() === 'ASC' ? 'ASC' : 'DESC'
      const sortExpr = sortBy === 'members' ? 'json_array_length(members_json)' : 'created_at'
      const filters: string[] = []
      if (lang) filters.push('lang = @lang')
      if (typeof createdAfter === 'number' && !Number.isNaN(createdAfter) && createdAfter > 0) {
        filters.push('created_at >= @createdAfter')
      }
      const whereClause = filters.length ? `WHERE ${filters.join(' AND ')}` : ''
      const sql = `SELECT id, host_id as hostId, lang, created_at as createdAt, json_array_length(members_json) as memberCount, analytics_json FROM rooms ${whereClause} ORDER BY ${sortExpr} ${orderDir} LIMIT @limit OFFSET @offset`
      const stmt = db.prepare(sql)
      const rows = stmt.all({ lang, limit, offset, createdAfter }) as any[]
      return rows.map((r) => {
        const analyticsSummary = computeAnalyticsSummary(r.analytics_json)
        return {
        id: r.id,
        hostId: r.hostId,
        lang: r.lang,
        createdAt: r.createdAt,
        memberCount: r.memberCount || 0,
        averageAccuracy: analyticsSummary.averageAccuracy,
        totalAnswers: analyticsSummary.totalAnswers,
      }
      })
    },

    delete: (id: string) => {
      deleteStmt.run(id)
    },
  }
}

