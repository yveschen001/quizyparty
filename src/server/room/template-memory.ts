import type { RoomTemplate, RoomTemplateStore, RoomTemplateStatus, RoomTemplateListOptions } from './template'

const templates = new Map<string, RoomTemplate>()

export function memoryRoomTemplateStore(): RoomTemplateStore {
  return {
    create(template: RoomTemplate) {
      templates.set(template.id, template)
    },
    get(id: string) {
      return templates.get(id) || null
    },
    getByUser(userId: string, status: RoomTemplateStatus | 'all' = 'all') {
      return this.listByUser(userId, status).items
    },
    listByUser(userId: string, status: RoomTemplateStatus | 'all' = 'all', options: RoomTemplateListOptions = {}) {
      const limit = typeof options.limit === 'number' && options.limit >= 0 ? options.limit : Infinity
      const offset = typeof options.offset === 'number' && options.offset >= 0 ? options.offset : 0
      const filtered = Array.from(templates.values())
        .filter((tpl) => tpl.userId === userId && (status === 'all' || tpl.status === status))
        .sort((a, b) => b.createdAt - a.createdAt)
      const items = filtered.slice(offset, Number.isFinite(limit) ? offset + limit : undefined)
      return { items, total: filtered.length }
    },
    findByQuestionSet(userId: string, questionSetId: string) {
      for (const tpl of templates.values()) {
        if (tpl.userId === userId && tpl.questionSetId === questionSetId) {
          return tpl
        }
      }
      return null
    },
    update(id: string, updates: Partial<RoomTemplate>) {
      const tpl = templates.get(id)
      if (!tpl) return
      templates.set(id, { ...tpl, ...updates, updatedAt: Date.now() })
    },
    delete(id: string) {
      templates.delete(id)
    },
  }
}

