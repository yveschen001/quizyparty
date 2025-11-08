type UsageRecord = {
  day: string
  generate: number
  improve: number
}

type LimitConfig = {
  generate: number
  improve: number
}

const NON_VIP_LIMITS: LimitConfig = {
  generate: 1,
  improve: 1,
}

const VIP_LIMITS: LimitConfig = {
  generate: 5,
  improve: 5,
}

const usageStore = new Map<string, UsageRecord>()

function todayKey(): string {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
  const d = String(now.getUTCDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function getRecord(key: string): UsageRecord {
  const currentDay = todayKey()
  const existing = usageStore.get(key)
  if (existing && existing.day === currentDay) {
    return existing
  }
  const fresh: UsageRecord = { day: currentDay, generate: 0, improve: 0 }
  usageStore.set(key, fresh)
  return fresh
}

function getLimits(isVip: boolean): LimitConfig {
  return isVip ? VIP_LIMITS : NON_VIP_LIMITS
}

function clampNonNegative(value: number): number {
  return value < 0 ? 0 : value
}

export type UsageSnapshot = {
  generate: { used: number; remaining: number; max: number }
  improve: { used: number; remaining: number; max: number }
}

export function getUsageSnapshot(key: string, isVip: boolean): UsageSnapshot {
  const record = getRecord(key)
  const limits = getLimits(isVip)
  return {
    generate: {
      used: record.generate,
      max: limits.generate,
      remaining: clampNonNegative(limits.generate - record.generate),
    },
    improve: {
      used: record.improve,
      max: limits.improve,
      remaining: clampNonNegative(limits.improve - record.improve),
    },
  }
}

export function canUseGenerate(key: string, isVip: boolean): boolean {
  const record = getRecord(key)
  const limits = getLimits(isVip)
  return record.generate < limits.generate
}

export function canUseImprove(key: string, isVip: boolean): boolean {
  const record = getRecord(key)
  const limits = getLimits(isVip)
  return record.improve < limits.improve
}

export function recordGenerateUsage(key: string, isVip: boolean): UsageSnapshot {
  const record = getRecord(key)
  const limits = getLimits(isVip)
  if (record.generate < limits.generate) {
    record.generate += 1
  }
  return getUsageSnapshot(key, isVip)
}

export function recordImproveUsage(key: string, isVip: boolean): UsageSnapshot {
  const record = getRecord(key)
  const limits = getLimits(isVip)
  if (record.improve < limits.improve) {
    record.improve += 1
  }
  return getUsageSnapshot(key, isVip)
}

export function resetUsageForTesting() {
  usageStore.clear()
}

export const NON_VIP_MAX_GENERATE_COUNT = 20
export const VIP_MAX_GENERATE_COUNT = 60


