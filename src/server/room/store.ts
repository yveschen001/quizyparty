import { sqliteRoomStore, type RoomStore } from './sqlite'
import { memoryRoomStore } from './memory'
import { questionStore, questionSetStore } from '../question'
import { MAX_ANSWER_TIME_MS } from '../score/utils'
import type { Question as QuestionData } from '../question/types'
import {
  createInitialAnalytics,
  summarizeAnalytics,
  updateAnalyticsForAnswer,
  type RoomAnalytics,
  type RoomAnalyticsSummary,
  type RoomMemberLeaderboardEntry,
  type RoomMemberStats,
  type RoomQuestionStats,
} from './analytics'
import {
  initChoiceOrders,
  getOrCreateChoiceOrder,
  type ChoiceOrders,
} from './choice-orders'

export type {
  RoomAnalytics,
  RoomAnalyticsSummary,
  RoomMemberLeaderboardEntry,
  RoomMemberStats,
  RoomQuestionStats,
} from './analytics'

// 房間內使用的題目格式（已打亂選項）
export type Question = { 
  id: string
  question: string
  choices: string[] // 已打亂的選項
  correctAnswer: string // 正確答案的文本（用於驗證）
}

export type RoomState = {
  id: string
  hostId: string
  lang: string
  currentIndex: number
  total: number
  completed: boolean
  members: string[]
  question?: Omit<Question, 'correctAnswer'> // 不暴露正確答案給客戶端
  analytics?: RoomAnalyticsSummary
}

export type Room = {
  id: string
  hostId: string
  lang: string
  createdAt: number
  currentIndex: number
  questions: Question[]
  members: Set<string>
  answers: Map<number, Map<string, string>> // qIndex -> (uid -> choice)
  analytics: RoomAnalytics
  choiceOrders: ChoiceOrders
}

let _roomStore: RoomStore | null = null

export function getRoomStore(): RoomStore {
  if (_roomStore) return _roomStore
  const dbPath = process.env.QP_SQLITE_PATH
  _roomStore = dbPath ? sqliteRoomStore(dbPath) : memoryRoomStore()
  return _roomStore
}

/**
 * 從題目集加載題目，並隨機打亂選項順序
 */
async function loadQuestionsFromSet(setId: string): Promise<Question[]> {
  const set = questionSetStore().get(setId)
  if (!set) return []

  const store = questionStore()
  const questions: Question[] = []

  for (const questionId of set.questionIds) {
    const q = store.get(questionId)
    if (!q) continue

    questions.push({
      id: q.id,
      question: q.question,
      choices: q.choices.slice(),
      correctAnswer: q.correctAnswer,
    })
  }

  return questions
}

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

/**
 * 創建房間（從題目集）
 */
type CreateRoomOptions = {
  roomId?: string
  replaceExisting?: boolean
}

export async function createRoom(lang: string, hostId: string, questionSetId: string, options?: CreateRoomOptions): Promise<Room> {
  const store = getRoomStore()
  const id = options && options.roomId && options.roomId.trim().length ? options.roomId.trim() : uid()
  const questions = await loadQuestionsFromSet(questionSetId)
  
  if (questions.length === 0) {
    throw new Error('Question set is empty or not found')
  }

  const analytics = createInitialAnalytics(questions.map((q) => q.id))
  const choiceOrders = initChoiceOrders()

  const room: Room = {
    id, hostId, lang, createdAt: Date.now(), currentIndex: 0,
    questions, members: new Set([hostId]), answers: new Map(), analytics, choiceOrders,
  }
  if (options && options.replaceExisting) {
    store.delete(id)
  }
  store.create(room)
  return room
}

export function joinRoom(id: string, memberId: string): Room | null {
  const store = getRoomStore()
  const r = store.get(id)
  if (!r) return null
  r.members.add(memberId)
  store.update(id, { members: r.members })
  return r
}

export function getRoomState(id: string, memberId?: string): RoomState | null {
  const r = getRoomStore().get(id)
  if (!r) return null
  const totalQuestions = r.questions.length
  const rawIndex = r.currentIndex
  const completed = totalQuestions > 0 && rawIndex >= totalQuestions
  const effectiveIndex = completed
    ? Math.max(totalQuestions - 1, 0)
    : Math.max(Math.min(rawIndex, Math.max(totalQuestions - 1, 0)), 0)
  const q = totalQuestions > 0 ? r.questions[effectiveIndex] : undefined
  
  let needPersistOrders = false
  let userQuestion: Omit<Question, 'correctAnswer'> | undefined
  if (q && !completed) {
    let choices = q.choices.slice()
    if (memberId) {
      const existingOrder = r.choiceOrders.get(effectiveIndex)?.has(memberId)
      choices = getOrCreateChoiceOrder(r.choiceOrders, effectiveIndex, memberId, q.choices)
      if (!existingOrder) {
        needPersistOrders = true
      }
    }
    userQuestion = { id: q.id, question: q.question, choices }
  }

  if (needPersistOrders) {
    getRoomStore().update(id, { choiceOrders: r.choiceOrders })
  }

  const analyticsSummary = summarizeAnalytics(r.analytics)

  return {
    id: r.id,
    hostId: r.hostId,
    lang: r.lang,
    currentIndex: completed ? Math.max(totalQuestions - 1, 0) : r.currentIndex,
    total: r.questions.length,
    completed,
    members: Array.from(r.members),
    question: completed ? undefined : userQuestion,
    analytics: analyticsSummary,
  }
}

export function advanceRoom(id: string, who: string): RoomState | null {
  const store = getRoomStore()
  const r = store.get(id)
  if (!r || r.hostId !== who) return null
  if (r.questions.length === 0) {
    return getRoomState(id, who)
  }
  if (r.currentIndex >= r.questions.length) {
    return getRoomState(id, who)
  }
  if (r.currentIndex < r.questions.length - 1) {
    r.currentIndex = r.currentIndex + 1
  } else {
    r.currentIndex = r.questions.length
  }
  store.update(id, { currentIndex: r.currentIndex })
  return getRoomState(id, who)
}

export function submitAnswer(id: string, qIndex: number, memberId: string, choice: string, timeSpentMs?: number) {
  const store = getRoomStore()
  const r = store.get(id)
  if (!r) return false
  if (!r.answers.has(qIndex)) r.answers.set(qIndex, new Map())
  const answersForQuestion = r.answers.get(qIndex)!
  const question = r.questions[qIndex]
  if (!question) return false

  const previousChoice = answersForQuestion.get(memberId)
  const correctAnswer = question.correctAnswer
  const prevIsCorrect = previousChoice ? previousChoice === correctAnswer : null
  const isCorrect = choice === correctAnswer

  answersForQuestion.set(memberId, choice)
  r.answers.set(qIndex, answersForQuestion)

  updateAnalyticsForAnswer(
    r.analytics,
    question.id,
    qIndex,
    memberId,
    prevIsCorrect,
    isCorrect,
    Date.now(),
    typeof timeSpentMs === 'number' ? timeSpentMs : MAX_ANSWER_TIME_MS
  )

  store.update(id, { answers: r.answers, analytics: r.analytics })
  return true
}

// List rooms with pagination and sorting
export function listRooms(params: {
  limit?: number
  offset?: number
  sortBy?: 'created' | 'members'
  order?: 'asc' | 'desc'
  lang?: string
  createdAfter?: number
}) {
  return getRoomStore().list(params)
}
