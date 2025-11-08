import type { User, UserStore } from './types'

const users = new Map<string, User>()

export function memoryUserStore(): UserStore {
  return {
    create: (user: User) => {
      users.set(user.id, user)
    },

    get: (id: string) => {
      return users.get(id) || null
    },

    getByEmail: (email: string) => {
      for (const user of users.values()) {
        if (user.email === email) return user
      }
      return null
    },

    getByProvider: (provider: string, providerId: string) => {
      for (const user of users.values()) {
        if (user.provider === provider && user.providerId === providerId) return user
      }
      return null
    },

    update: (id: string, updates: Partial<User>) => {
      const user = users.get(id)
      if (!user) return
      Object.assign(user, updates, { updatedAt: Date.now() })
    },
  }
}

