import type { Room, RoomState } from './store'
import type { RoomStore } from './sqlite'

const rooms = new Map<string, Room>()

export function memoryRoomStore(): RoomStore {
  return {
    create: (room: Room) => {
      rooms.set(room.id, room)
    },

    get: (id: string) => {
      return rooms.get(id) || null
    },

    update: (id: string, updates: Partial<Room>) => {
      const room = rooms.get(id)
      if (!room) return
      if (updates.currentIndex !== undefined) room.currentIndex = updates.currentIndex
      if (updates.members) room.members = updates.members
      if (updates.answers) room.answers = updates.answers
      if (updates.analytics) room.analytics = updates.analytics
      if (updates.choiceOrders) room.choiceOrders = updates.choiceOrders
    },

    list: (params) => {
      const { limit = 20, offset = 0, sortBy = 'created', order = 'desc', lang, createdAfter } = params
      let arr = Array.from(rooms.values())

      if (lang) {
        arr = arr.filter((r) => r.lang === lang)
      }

      if (typeof createdAfter === 'number' && !Number.isNaN(createdAfter) && createdAfter > 0) {
        arr = arr.filter((r) => r.createdAt >= createdAfter)
      }

      if (sortBy === 'members') {
        arr.sort((a, b) => {
          const diff = a.members.size - b.members.size
          return order === 'desc' ? -diff : diff
        })
      } else {
        arr.sort((a, b) => {
          const diff = a.createdAt - b.createdAt
          return order === 'desc' ? -diff : diff
        })
      }

      return arr.slice(offset, offset + limit).map((r) => {
        const totalAnswers = r.analytics?.totalAnswers || 0
        const totalCorrect = r.analytics?.perQuestion.reduce((sum, q) => sum + q.correct, 0) || 0
        const averageAccuracy = totalAnswers > 0 ? totalCorrect / totalAnswers : 0
        return {
          id: r.id,
          hostId: r.hostId,
          lang: r.lang,
          createdAt: r.createdAt,
          memberCount: r.members.size,
          averageAccuracy,
          totalAnswers,
        }
      })
    },

    delete: (id: string) => {
      rooms.delete(id)
    },
  }
}

