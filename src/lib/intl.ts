import type { Locale } from '../i18n/config'

export const nf = (lang: Locale, opts?: Intl.NumberFormatOptions) =>
  new Intl.NumberFormat(lang, { maximumFractionDigits: 2, ...opts })

export const df = (lang: Locale, opts?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat(lang, { year: 'numeric', month: 'short', day: '2-digit', ...opts })


