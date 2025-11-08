export const MAX_ANSWER_TIME_MS = 15_000

export function computeScoreFromStats(correct: number, total: number, totalTimeMs: number): number {
  if (total <= 0) return 0
  const accuracy = correct / total
  const averageTimeMs = totalTimeMs > 0 ? totalTimeMs / total : MAX_ANSWER_TIME_MS
  const clampedAvg = Math.min(Math.max(averageTimeMs, 0), MAX_ANSWER_TIME_MS)
  const quantityScore = correct * 100
  const accuracyScore = accuracy * 600
  const speedScore = ((MAX_ANSWER_TIME_MS - clampedAvg) / MAX_ANSWER_TIME_MS) * 300
  const totalScore = quantityScore + accuracyScore + Math.max(0, speedScore)
  return Math.round(totalScore)
}


