import { defineMiddleware } from 'astro/middleware'
import crypto from 'node:crypto'
import { normalizeLang } from './i18n/aliases'
import { getPreferredLocale, isSupportedLocale, setLocaleCookie } from './lib/locale'

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context
  const pathname = url.pathname
  // bypass non-page routes (API/assets)
  const bypassPrefixes = [
    '/api',
    '/_astro',
    '/favicon',
    '/robots.txt',
    '/sitemap-index.xml',
    '/data',
    '/js',
    '/og',
  ]
  if (bypassPrefixes.some((p) => pathname.startsWith(p))) {
    // ensure stable uid cookie for first-time API hits as well
    const hasUidApi = context.cookies.get('qp_uid')
    if (!hasUidApi) {
      const uid = crypto.randomUUID()
      context.cookies.set('qp_uid', uid, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      })
    }
    return next()
  }
  if (pathname === '/') {
    const lang = getPreferredLocale(request)
    const location = `/${lang}/`
    const res = new Response(null, { status: 301, headers: { Location: location } })
    setLocaleCookie(res, lang)
    // ensure stable uid cookie
    const hasUid = context.cookies.get('qp_uid')
    if (!hasUid) {
      const uid = crypto.randomUUID()
      context.cookies.set('qp_uid', uid, {
        path: '/',
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365,
      })
    }
    return res
  }
  const segments = pathname.split('/').filter(Boolean)
  const maybeLang = segments[0]
  if (maybeLang) {
    const normalized = normalizeLang(maybeLang)
    if (!normalized || !isSupportedLocale(normalized)) {
      return new Response(null, { status: 404 })
    }
    if (maybeLang !== normalized) {
      segments[0] = normalized
      const redirectUrl = new URL(url)
      const trailingSlash = pathname.endsWith('/') && segments.length > 0
      redirectUrl.pathname = '/' + segments.join('/')
      if (trailingSlash && !redirectUrl.pathname.endsWith('/')) {
        redirectUrl.pathname += '/'
      }
      return Response.redirect(redirectUrl.toString(), 301)
    }
  }
  // ensure stable uid cookie
  const hasUid = context.cookies.get('qp_uid')
  if (!hasUid) {
    const uid = crypto.randomUUID()
    context.cookies.set('qp_uid', uid, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24 * 365,
    })
  }
  return next()
})
