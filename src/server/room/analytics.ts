import { computeScoreFromStats, MAX_ANSWER_TIME_MS } from '../score/utils'

export type RoomMemberStats = {
  userId: string
  correct: number
  incorrect: number
  total: number
  lastAnswerAt: number
  totalTimeMs: number
  fastestTimeMs: number | null
}

export type RoomQuestionStats = {
  questionId: string
  index: number
  correct: number
  incorrect: number
  total: number
}

export type RoomMemberLeaderboardEntry = RoomMemberStats & {
  accuracy: number
  averageTimeMs: number
  score: number
}

export type RoomAnalytics = {
  totalAnswers: number
  uniqueResponders: Set<string>
  leaderboard: Map<string, RoomMemberStats>
  perQuestion: RoomQuestionStats[]
}

export type SerializedRoomAnalytics = {
  totalAnswers: number
  uniqueResponders: string[]
  leaderboard: RoomMemberStats[]
  perQuestion: RoomQuestionStats[]
}

export type RoomAnalyticsSummary = {
  totalAnswers: number
  uniqueResponders: number
  averageAccuracy: number
  leaderboard: RoomMemberLeaderboardEntry[]
  perQuestion: RoomQuestionStats[]
}

export function createInitialAnalytics(questionIds: string[]): RoomAnalytics {
  return {
    totalAnswers: 0,
    uniqueResponders: new Set<string>(),
    leaderboard: new Map<string, RoomMemberStats>(),
    perQuestion: questionIds.map((questionId, index) => ({
      questionId,
      index,
      correct: 0,
      incorrect: 0,
      total: 0,
    })),
  }
}

export function serializeAnalytics(analytics: RoomAnalytics): SerializedRoomAnalytics {
  return {
    totalAnswers: analytics.totalAnswers,
    uniqueResponders: Array.from(analytics.uniqueResponders),
    leaderboard: Array.from(analytics.leaderboard.values()),
    perQuestion: analytics.perQuestion,
  }
}

export function deserializeAnalytics(
  serialized: SerializedRoomAnalytics | undefined,
  questionIds: string[]
): RoomAnalytics {
  if (!serialized) {
    return createInitialAnalytics(questionIds)
  }

  const leaderboardMap = new Map<string, RoomMemberStats>()
  for (const entry of serialized.leaderboard || []) {
    if (!entry || !entry.userId) continue
    leaderboardMap.set(entry.userId, {
      userId: entry.userId,
      correct: entry.correct || 0,
      incorrect: entry.incorrect || 0,
      total: entry.total || entry.correct + entry.incorrect || 0,
      lastAnswerAt: entry.lastAnswerAt || 0,
      totalTimeMs: entry.totalTimeMs || 0,
      fastestTimeMs: typeof entry.fastestTimeMs === 'number' ? entry.fastestTimeMs : null,
    })
  }

  const perQuestionMap = new Map<number, RoomQuestionStats>()
  for (const q of serialized.perQuestion || []) {
    const index = typeof q.index === 'number' ? q.index : -1
    if (index >= 0) {
      perQuestionMap.set(index, {
        questionId: q.questionId,
        index,
        correct: q.correct || 0,
        incorrect: q.incorrect || 0,
        total: q.total || (q.correct || 0) + (q.incorrect || 0),
      })
    }
  }

  const perQuestion: RoomQuestionStats[] = questionIds.map((id, index) => {
    const existing = perQuestionMap.get(index)
    if (existing) {
      return { ...existing, questionId: existing.questionId || id }
    }
    return {
      questionId: id,
      index,
      correct: 0,
      incorrect: 0,
      total: 0,
    }
  })

  return {
    totalAnswers: serialized.totalAnswers || 0,
    uniqueResponders: new Set(serialized.uniqueResponders || []),
    leaderboard: leaderboardMap,
    perQuestion,
  }
}

export function summarizeAnalytics(analytics: RoomAnalytics | undefined): RoomAnalyticsSummary | undefined {
  if (!analytics) return undefined
  const totalAnswers = analytics.totalAnswers
  const totalCorrect = analytics.perQuestion.reduce((sum, q) => sum + q.correct, 0)
  const unique = analytics.uniqueResponders.size
  const averageAccuracy = totalAnswers > 0 ? totalCorrect / totalAnswers : 0

  const leaderboard: RoomMemberLeaderboardEntry[] = Array.from(analytics.leaderboard.values())
    .map((entry) => {
      const accuracy = entry.total > 0 ? entry.correct / entry.total : 0
      const averageTimeMs = entry.total > 0 ? entry.totalTimeMs / entry.total : MAX_ANSWER_TIME_MS
      const score = computeScoreFromStats(entry.correct, entry.total, entry.totalTimeMs)
      return {
        ...entry,
        accuracy,
        averageTimeMs,
        score,
      }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (b.correct !== a.correct) return b.correct - a.correct
      if (a.total !== b.total) return a.total - b.total
      return (b.lastAnswerAt || 0) - (a.lastAnswerAt || 0)
    })

  return {
    totalAnswers,
    uniqueResponders: unique,
    averageAccuracy,
    leaderboard,
    perQuestion: analytics.perQuestion,
  }
}

export function updateAnalyticsForAnswer(
  analytics: RoomAnalytics,
  questionId: string,
  qIndex: number,
  memberId: string,
  prevIsCorrect: boolean | null,
  isCorrect: boolean,
  timestamp: number,
  answerTimeMs: number
) {
  if (!analytics.perQuestion[qIndex]) {
    analytics.perQuestion[qIndex] = {
      questionId,
      index: qIndex,
      correct: 0,
      incorrect: 0,
      total: 0,
    }
  }

  const qStats = analytics.perQuestion[qIndex]
  qStats.questionId = qStats.questionId || questionId

  if (prevIsCorrect === null) {
    qStats.total += 1
    if (isCorrect) {
      qStats.correct += 1
    } else {
      qStats.incorrect += 1
    }
    analytics.totalAnswers += 1
    analytics.uniqueResponders.add(memberId)
  } else if (prevIsCorrect !== isCorrect) {
    if (prevIsCorrect) {
      qStats.correct = Math.max(0, qStats.correct - 1)
      qStats.incorrect += 1
    } else {
      qStats.incorrect = Math.max(0, qStats.incorrect - 1)
      qStats.correct += 1
    }
  }

  const leaderboard = analytics.leaderboard
  const entry = leaderboard.get(memberId) || {
    userId: memberId,
    correct: 0,
    incorrect: 0,
    total: 0,
    lastAnswerAt: 0,
    totalTimeMs: 0,
    fastestTimeMs: null,
  }

  if (prevIsCorrect === null) {
    entry.total += 1
    if (isCorrect) {
      entry.correct += 1
    } else {
      entry.incorrect += 1
    }
    const clampedTime = Math.max(0, Math.min(answerTimeMs, MAX_ANSWER_TIME_MS))
    entry.totalTimeMs += clampedTime
    if (entry.fastestTimeMs === null || clampedTime < entry.fastestTimeMs) {
      entry.fastestTimeMs = clampedTime
    }
  } else if (prevIsCorrect !== isCorrect) {
    if (prevIsCorrect) {
      entry.correct = Math.max(0, entry.correct - 1)
      entry.incorrect += 1
    } else {
      entry.incorrect = Math.max(0, entry.incorrect - 1)
      entry.correct += 1
    }
  }

  entry.lastAnswerAt = timestamp
  leaderboard.set(memberId, entry)
}

