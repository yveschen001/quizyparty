import i18n from 'i18next'
import { normalizeLang } from './aliases'
import { SUPPORTED_LANGS, type Lang } from './config'

function isSupported(value: string): value is Lang {
  return (SUPPORTED_LANGS as readonly string[]).includes(value)
}

export function setLang(lang: string): void {
  if (typeof window === 'undefined') return
  const normalized = normalizeLang(lang)
  if (!normalized) return
  try {
    window.localStorage.setItem('lang', normalized)
    window.localStorage.setItem('qp_interface_lang', normalized)
  } catch (e) {
    console.warn('[i18n] failed to persist lang', e)
  }
  if (typeof document !== 'undefined' && document.documentElement) {
    document.documentElement.setAttribute('lang', normalized)
  }
  try {
    if (typeof i18n.changeLanguage === 'function') {
      void i18n.changeLanguage(normalized)
    }
  } catch (e) {
    console.warn('[i18n] changeLanguage failed', e)
  }

  const segments = window.location.pathname.split('/').filter(Boolean)
  if (segments.length === 0) {
    segments.push(normalized)
  } else if (isSupported(segments[0])) {
    segments[0] = normalized
  } else {
    segments.unshift(normalized)
  }

  const newPath = '/' + segments.join('/')
  const nextUrl = newPath + window.location.search + window.location.hash
  if (window.location.pathname + window.location.search + window.location.hash === nextUrl) return
  window.history.replaceState(null, '', nextUrl)
}

