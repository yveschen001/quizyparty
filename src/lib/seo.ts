import type { Locale } from '../i18n/config'

export function ensureLeadingSlash(p: string) {
  return p.startsWith('/') ? p : `/${p}`
}

/** 確保路徑為 /{lang}/... 形式 */
export function withLangPrefix(pathname: string, lang: Locale) {
  const p = ensureLeadingSlash(pathname)
  const segs = p.split('/').filter(Boolean)
  if (segs[0] === lang) return p
  return `/${lang}${p === '/' ? '' : p}`
}

/** 建立 canonical */
export function buildCanonical(siteOrigin: string, lang: Locale, pathname: string) {
  const href = withLangPrefix(pathname, lang)
  return new URL(href, siteOrigin).toString()
}

/** 產生 hreflang 清單（含 x-default） */
export function buildHreflangAlternates(
  siteOrigin: string,
  langs: readonly Locale[],
  pathname: string,
) {
  const items = langs.map((l) => ({
    hreflang: l,
    href: new URL(withLangPrefix(pathname, l), siteOrigin).toString(),
  }))
  items.push({ hreflang: 'x-default', href: items[0].href } as any)
  return items
}

// 兼容舊 API（保留一段時間）
export function canonicalUrl(site: URL | string, path: string): string {
  const base = typeof site === 'string' ? new URL(site) : site
  const clean = path.startsWith('/') ? path.slice(1) : path
  return new URL(clean, base).toString()
}

export function hreflangs(site: URL | string, path: string, langs: string[]) {
  const base = typeof site === 'string' ? new URL(site) : site
  return langs.map((lng) => ({
    rel: 'alternate',
    hreflang: lng,
    href: new URL(`${lng}/${path.replace(/^\/?[^/]+\//, '')}`, base).toString(),
  }))
}
