export type ScoreRecord = {
  id: string
  userId: string
  roomId: string
  questionId: string
  questionIndex: number
  userChoice: string
  correctAnswer: string
  isCorrect: boolean
  answeredAt: number
  timeSpentMs: number
  lang: string
}

export type UserStats = {
  userId: string
  totalAnswered: number
  totalCorrect: number
  accuracy: number // 0-1
  totalRooms: number
  bestScore?: number
  bestRoomId?: string
  lastPlayedAt?: number
}

export type UserRoomSummary = {
  roomId: string
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  lastAnsweredAt: number
  lang?: string
}

export type RoomScoreEntry = {
  userId: string
  totalAnswered: number
  totalCorrect: number
  accuracy: number
  totalTimeMs: number
  averageTimeMs: number
  fastestTimeMs: number | null
  score: number
  lastAnsweredAt: number
}

export interface ScoreStore {
  record(record: ScoreRecord): void
  getUserStats(userId: string): UserStats
  getUserHistory(userId: string, limit?: number, offset?: number): ScoreRecord[]
  getUserRoomSummary(userId: string, limit?: number, offset?: number): UserRoomSummary[]
  getRoomScores(roomId: string): RoomScoreEntry[]
  getLeaderboard(limit?: number): Array<{ userId: string; totalCorrect: number; totalAnswered: number; accuracy: number; score: number }>
}

