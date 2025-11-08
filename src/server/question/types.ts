export type QuestionStatus = 'draft' | 'published' | 'archived'

export type Question = {
  id: string
  userId: string // 創建題目的用戶
  setId?: string // 所屬題目集（草稿題目時可能存在）
  question: string
  choices: string[] // 所有選項（包含正確答案）
  correctAnswer: string // 正確答案的文本
  lang: string
  category?: string // 分類（可選）
  keywords?: string[] // 關鍵詞（用於搜索和分類）
  status: QuestionStatus
  order?: number // 在題目集中的排序（0-based）
  version: number // 題目的版本號
  publishedAt?: number // 正式發布時間（status = published 時）
  archivedAt?: number // 封存時間
  createdAt: number
  updatedAt: number
}

export type QuestionSetStatus = 'draft' | 'published' | 'archived'

export type QuestionSet = {
  id: string
  userId: string // 創建題目集的用戶
  title?: string // 題目集名稱（可選）
  lang: string
  questionIds: string[] // 題目ID列表
  status: QuestionSetStatus
  expectedQuestionCount?: number // 房主預計要完成的題目數
  description?: string // 題目集描述或備註
  tags?: string[]
  version: number // 題目集版本號
  draftParentId?: string // 若為草稿，指向原始題目集
  publishedAt?: number
  archivedAt?: number
  progressQuestionCount?: number // 已完成題目數
  createdAt: number
  updatedAt: number
}

export interface QuestionStore {
  create(question: Question): void
  get(id: string): Question | null
  getByUser(userId: string, limit?: number, offset?: number): Question[]
  getBySet(setId: string): Question[]
  update(id: string, updates: Partial<Question>): void
  delete(id: string): void
}

export interface QuestionSetStore {
  create(set: QuestionSet): void
  get(id: string): QuestionSet | null
  getByUser(userId: string, limit?: number, offset?: number): QuestionSet[]
  update(id: string, updates: Partial<QuestionSet>): void
  delete(id: string): void
}

