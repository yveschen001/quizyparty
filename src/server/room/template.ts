export type RoomTemplateStatus = 'draft' | 'published'

export type RoomTemplateListOptions = {
  limit?: number
  offset?: number
}

export type RoomTemplate = {
  id: string
  userId: string
  title: string
  coverImage?: string
  questionSetId: string
  status: RoomTemplateStatus
  createdAt: number
  updatedAt: number
}

export interface RoomTemplateStore {
  create(template: RoomTemplate): void
  get(id: string): RoomTemplate | null
  getByUser(userId: string, status?: RoomTemplateStatus | 'all'): RoomTemplate[]
  listByUser(
    userId: string,
    status?: RoomTemplateStatus | 'all',
    options?: RoomTemplateListOptions
  ): { items: RoomTemplate[]; total: number }
  findByQuestionSet(userId: string, questionSetId: string): RoomTemplate | null
  update(id: string, updates: Partial<RoomTemplate>): void
  delete(id: string): void
}

