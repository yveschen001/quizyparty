import { defineMiddleware } from 'astro/middleware';
import crypto from 'node:crypto';
import { getPreferredLocale, isSupportedLocale, setLocaleCookie } from './lib/locale';

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = url.pathname;
  // bypass non-page routes (API/assets)
  const bypassPrefixes = ['/api', '/_astro', '/favicon', '/robots.txt', '/sitemap-index.xml', '/data', '/js', '/og'];
  if (bypassPrefixes.some((p) => pathname.startsWith(p))) {
    // ensure stable uid cookie for first-time API hits as well
    const hasUidApi = context.cookies.get('qp_uid');
    if (!hasUidApi) {
      const uid = crypto.randomUUID();
      context.cookies.set('qp_uid', uid, {
        path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365,
      });
    }
    return next();
  }
  if (pathname === '/') {
    const lang = getPreferredLocale(request);
    const location = `/${lang}/`;
    const res = new Response(null, { status: 301, headers: { Location: location } });
    setLocaleCookie(res, lang);
    // ensure stable uid cookie
    const hasUid = context.cookies.get('qp_uid');
    if (!hasUid) {
      const uid = crypto.randomUUID();
      context.cookies.set('qp_uid', uid, {
        path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }
  const maybeLang = pathname.split('/')[1];
  if (maybeLang && !isSupportedLocale(maybeLang)) {
    return new Response(null, { status: 404 });
  }
  // ensure stable uid cookie
  const hasUid = context.cookies.get('qp_uid');
  if (!hasUid) {
    const uid = crypto.randomUUID();
    context.cookies.set('qp_uid', uid, {
      path: '/', httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 24 * 365,
    });
  }
  return next();
});
