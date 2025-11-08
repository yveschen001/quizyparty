import { roomTemplateStore } from './template-store'
import type { RoomTemplateStatus } from './template'
import type { QuestionSet } from '../question'

function padNumber(value: number): string {
  return value < 10 ? '0' + value : String(value)
}

export function buildDefaultRoomTitle(userName?: string, referenceDate?: Date): string {
  const baseName = userName && userName.trim().length ? userName.trim() : 'My'
  const date = referenceDate || new Date()
  const year = date.getFullYear()
  const month = padNumber(date.getMonth() + 1)
  const day = padNumber(date.getDate())
  return baseName + ' Quiz ' + year + month + day
}

type SyncOptions = {
  userId: string
  userName?: string
  questionSet: QuestionSet
  fallbackTitle?: string
}

export function syncRoomTemplateFromQuestionSet(options: SyncOptions): string {
  const { userId, userName, questionSet, fallbackTitle } = options
  const store = roomTemplateStore()
  const existing = store.findByQuestionSet(userId, questionSet.id)

  const normalizedStatus: RoomTemplateStatus = questionSet.status === 'published' ? 'published' : 'draft'

  if (existing) {
    store.update(existing.id, {
      status: normalizedStatus,
      questionSetId: questionSet.id,
    })
    return existing.id
  }

  const titleSource = questionSet.title && questionSet.title.trim().length
    ? questionSet.title.trim()
    : (fallbackTitle && fallbackTitle.trim().length ? fallbackTitle.trim() : buildDefaultRoomTitle(userName))

  const now = Date.now()
  store.create({
    id: questionSet.id,
    userId,
    title: titleSource,
    questionSetId: questionSet.id,
    status: normalizedStatus,
    createdAt: now,
    updatedAt: now,
  })

  return questionSet.id
}

