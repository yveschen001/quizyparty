export type Scope = 'all' | '30d'

export interface HistoryRecord {
  answeredAt: number
  isCorrect?: boolean
  timeSpentMs?: number
}

export interface StatsAggregate {
  totalAnswered?: number
  totalCorrect?: number
}

export interface LeaderboardEntry {
  userId: string
  score?: number
}

export interface ComputeStatsParams {
  scope: Scope
  now?: number
  history: HistoryRecord[]
  aggregates?: StatsAggregate | null
  leaderboard?: LeaderboardEntry[]
  userId: string
}

export interface ComputedStats {
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  points: number
  rankLabel: string
  percentilePercent?: number
}

const THIRTY_DAY_MS = 30 * 24 * 60 * 60 * 1000
const MAX_ANSWER_TIME_MS = 15_000

export function filterHistoryByScope(history: HistoryRecord[], scope: Scope, now = Date.now()) {
  if (scope !== '30d') return history
  const threshold = now - THIRTY_DAY_MS
  return history.filter((record) => record && record.answeredAt >= threshold)
}

export function computeScore(totalCorrect: number, totalAnswered: number, totalTimeMs: number) {
  if (totalAnswered <= 0) return 0
  const accuracy = totalCorrect / totalAnswered
  const averageTime = totalTimeMs > 0 ? totalTimeMs / totalAnswered : MAX_ANSWER_TIME_MS
  const clamped = Math.min(Math.max(averageTime, 0), MAX_ANSWER_TIME_MS)
  const quantityScore = totalCorrect * 100
  const accuracyScore = accuracy * 600
  const speedScore = ((MAX_ANSWER_TIME_MS - clamped) / MAX_ANSWER_TIME_MS) * 300
  const totalScore = quantityScore + accuracyScore + Math.max(0, speedScore)
  return Math.round(totalScore)
}

export function computeStats({
  scope,
  now = Date.now(),
  history,
  aggregates,
  leaderboard,
  userId,
}: ComputeStatsParams): ComputedStats {
  const filteredHistory = filterHistoryByScope(history, scope, now)
  let totalAnswered = 0
  let totalCorrect = 0
  let totalTime = 0

  for (let i = 0; i < filteredHistory.length; i += 1) {
    const record = filteredHistory[i]
    if (!record) continue
    totalAnswered += 1
    if (record.isCorrect) totalCorrect += 1
    if (typeof record.timeSpentMs === 'number') {
      totalTime += record.timeSpentMs
    }
  }

  let points = computeScore(totalCorrect, totalAnswered, totalTime)
  let accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0
  let rankLabel = '—'
  let percentilePercent: number | undefined

  if (scope === 'all' && aggregates) {
    const totalAnsweredAll =
      typeof aggregates.totalAnswered === 'number' ? aggregates.totalAnswered : totalAnswered
    const totalCorrectAll =
      typeof aggregates.totalCorrect === 'number' ? aggregates.totalCorrect : totalCorrect
    totalAnswered = totalAnsweredAll
    totalCorrect = totalCorrectAll
    accuracy = totalAnswered > 0 ? totalCorrect / totalAnswered : 0
  }

  if (scope === 'all' && Array.isArray(leaderboard) && leaderboard.length) {
    const index = leaderboard.findIndex((entry) => entry && entry.userId === userId)
    if (index >= 0) {
      const entry = leaderboard[index]
      if (entry && typeof entry.score === 'number') {
        points = entry.score
      }
      rankLabel = '#' + (index + 1)
      const totalPlayers = leaderboard.length
      if (totalPlayers > 0) {
        percentilePercent = Math.round(((index + 1) / totalPlayers) * 100)
      }
    }
  }

  return {
    totalAnswered,
    totalCorrect,
    accuracy,
    points,
    rankLabel,
    percentilePercent,
  }
}

