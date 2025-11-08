import { entStore } from '../store'

const VIP_ENTITLEMENT_KEY = process.env.RC_ENTITLEMENT_KEY || 'vip'

const LANGUAGE_DISPLAY: Record<string, string> = {
  en: 'English',
  'zh-hant': 'Traditional Chinese',
  'zh-hans': 'Simplified Chinese',
  ja: 'Japanese',
  ko: 'Korean',
  de: 'German',
  fr: 'French',
}

export function extractAppUserId(cookieHeader: string | null | undefined): string | null {
  if (!cookieHeader) return null
  const match = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookieHeader)
  return match ? match[1] : null
}

export function isVipFromCookie(cookieHeader: string | null | undefined): boolean {
  const appUserId = extractAppUserId(cookieHeader)
  if (!appUserId) return false
  const record = entStore().get(appUserId)
  if (!record) return false
  return record.active.includes(VIP_ENTITLEMENT_KEY)
}

export function getUsageKey(userId: string, cookieHeader: string | null | undefined): string {
  const appUserId = extractAppUserId(cookieHeader)
  return appUserId ? `${userId}:${appUserId}` : userId
}

export function resolveLanguageDisplay(code: string | null | undefined): string {
  if (!code) return LANGUAGE_DISPLAY.en
  const lower = code.toLowerCase()
  return LANGUAGE_DISPLAY[lower] || LANGUAGE_DISPLAY.en
}

export function supportedLanguageCodes(): string[] {
  return Object.keys(LANGUAGE_DISPLAY)
}


