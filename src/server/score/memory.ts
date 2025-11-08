import type { ScoreRecord, UserStats, ScoreStore, UserRoomSummary, RoomScoreEntry } from './types'
import { computeScoreFromStats, MAX_ANSWER_TIME_MS } from './utils'

const records = new Map<string, ScoreRecord>()

export function memoryScoreStore(): ScoreStore {
  return {
    record: (record: ScoreRecord) => {
      records.set(record.id, record)
    },

    getUserStats: (userId: string): UserStats => {
      const userRecords = Array.from(records.values()).filter((r) => r.userId === userId)
      if (userRecords.length === 0) {
        return {
          userId,
          totalAnswered: 0,
          totalCorrect: 0,
          accuracy: 0,
          totalRooms: 0,
        }
      }

      const totalAnswered = userRecords.length
      const totalCorrect = userRecords.filter((r) => r.isCorrect).length
      const accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0
      const rooms = new Set(userRecords.map((r) => r.roomId))
      const lastPlayedAt = Math.max(...userRecords.map((r) => r.answeredAt))

      return {
        userId,
        totalAnswered,
        totalCorrect,
        accuracy,
        totalRooms: rooms.size,
        lastPlayedAt,
      }
    },

    getUserHistory: (userId: string, limit = 50, offset = 0): ScoreRecord[] => {
      return Array.from(records.values())
        .filter((r) => r.userId === userId)
        .sort((a, b) => b.answeredAt - a.answeredAt)
        .slice(offset, offset + limit)
    },

    getUserRoomSummary: (userId: string, limit = 50, offset = 0): UserRoomSummary[] => {
      const roomMap = new Map<string, { totalAnswered: number; totalCorrect: number; lastAnsweredAt: number; lang?: string }>()
      for (const record of records.values()) {
        if (record.userId !== userId) continue
        const summary = roomMap.get(record.roomId) || { totalAnswered: 0, totalCorrect: 0, lastAnsweredAt: 0, lang: record.lang }
        summary.totalAnswered += 1
        if (record.isCorrect) summary.totalCorrect += 1
        if (!summary.lang) summary.lang = record.lang
        if (record.answeredAt > summary.lastAnsweredAt) summary.lastAnsweredAt = record.answeredAt
        roomMap.set(record.roomId, summary)
      }

      const summaries = Array.from(roomMap.entries()).map(([roomId, summary]) => ({
        roomId,
        totalAnswered: summary.totalAnswered,
        totalCorrect: summary.totalCorrect,
        accuracy: summary.totalAnswered > 0 ? summary.totalCorrect / summary.totalAnswered : 0,
        lastAnsweredAt: summary.lastAnsweredAt,
        lang: summary.lang,
      }))

      return summaries
        .sort((a, b) => b.lastAnsweredAt - a.lastAnsweredAt)
        .slice(offset, offset + limit)
    },

    getRoomScores: (roomId: string): RoomScoreEntry[] => {
      const roomRecords = Array.from(records.values()).filter((r) => r.roomId === roomId)
      const userScores = new Map<
        string,
        {
          correct: number
          total: number
          totalTimeMs: number
          fastestTimeMs: number | null
          lastAnsweredAt: number
        }
      >()

      for (const record of roomRecords) {
        const existing =
          userScores.get(record.userId) || {
            correct: 0,
            total: 0,
            totalTimeMs: 0,
            fastestTimeMs: null,
            lastAnsweredAt: 0,
          }
        existing.total++
        if (record.isCorrect) existing.correct++
        const timeSpent = Number.isFinite(record.timeSpentMs) ? Math.max(0, record.timeSpentMs) : 0
        existing.totalTimeMs += timeSpent
        if (existing.fastestTimeMs === null || timeSpent < existing.fastestTimeMs) {
          existing.fastestTimeMs = timeSpent
        }
        if (record.answeredAt > existing.lastAnsweredAt) {
          existing.lastAnsweredAt = record.answeredAt
        }
        userScores.set(record.userId, existing)
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
        lastAnsweredAt: score.lastAnsweredAt,
      }))
    },

    getLeaderboard: (limit = 100) => {
      const userStats = new Map<string, { correct: number; answered: number; totalTimeMs: number }>()
      for (const record of records.values()) {
        const existing = userStats.get(record.userId) || { correct: 0, answered: 0, totalTimeMs: 0 }
        existing.answered++
        if (record.isCorrect) existing.correct++
        existing.totalTimeMs += Number.isFinite(record.timeSpentMs) ? Math.max(0, record.timeSpentMs) : 0
        userStats.set(record.userId, existing)
      }

      return Array.from(userStats.entries())
        .filter(([, stats]) => stats.answered >= 5)
        .map(([userId, stats]) => ({
          userId,
          totalCorrect: stats.correct,
          totalAnswered: stats.answered,
          accuracy: stats.answered > 0 ? stats.correct / stats.answered : 0,
          score: computeScoreFromStats(stats.correct, stats.answered, stats.totalTimeMs),
        }))
        .sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score
          if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect
          return b.accuracy - a.accuracy
        })
        .slice(0, limit)
    },
  }
}

