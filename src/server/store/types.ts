export type EntRecord = {
  appUserId: string
  active: string[]        // ['vip', ...]
  managementUrl?: string  // RC/Stripe Web Billing 可能提供
  updatedAt: number       // epoch ms
}

export interface EntStore {
  upsert(rec: EntRecord): void
  get(appUserId: string): EntRecord | null
}


