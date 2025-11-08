export type User = {
  id: string
  email: string
  name: string
  avatar?: string
  provider: 'google' | 'anonymous'
  providerId: string
  createdAt: number
  updatedAt: number
}

export interface UserStore {
  create(user: User): void
  get(id: string): User | null
  getByEmail(email: string): User | null
  getByProvider(provider: string, providerId: string): User | null
  update(id: string, updates: Partial<User>): void
}

