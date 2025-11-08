import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from '../i18n/config';

const COOKIE_NAME = 'qp_lang';

export function isSupportedLocale(str: string | null | undefined): str is Locale {
  return !!str && (SUPPORTED_LOCALES as readonly string[]).includes(str);
}

const MAP: Record<string, Locale> = {
  'zh-tw':'zh-hant','zh-hant':'zh-hant','zh':'zh-hans','zh-cn':'zh-hans','zh-hans':'zh-hans',
  'ja':'ja','ja-jp':'ja','en':'en','en-us':'en','en-gb':'en',
  'ko':'ko','ko-kr':'ko','de':'de','de-de':'de','fr':'fr','fr-fr':'fr'
}

export function normalizeLocale(input: string): Locale {
  const s = (input || '').toLowerCase();
  if (MAP[s]) return MAP[s];
  if (s.startsWith('zh')) {
    if (s.includes('hant') || s.includes('tw') || s.includes('hk')) return 'zh-hant';
    if (s.includes('hans') || s.includes('cn') || s.includes('sg')) return 'zh-hans';
  }
  if (s.startsWith('en')) return 'en';
  if (s.startsWith('ja')) return 'ja';
  if (s.startsWith('ko')) return 'ko';
  if (s.startsWith('de')) return 'de';
  if (s.startsWith('fr')) return 'fr';
  return DEFAULT_LOCALE;
}

export function getPreferredLocale(req: Request): Locale {
  const cookie = req.headers.get('cookie') || '';
  const m = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (m) {
    const v = decodeURIComponent(m[1]);
    if (isSupportedLocale(v)) return v;
  }
  const al = req.headers.get('accept-language');
  if (!al) return DEFAULT_LOCALE;
  const ordered = al
    .split(',')
    .map((v) => v.trim().split(';q='))
    .sort((a, b) => parseFloat(b[1] || '1') - parseFloat(a[1] || '1'))
    .map((v) => v[0]);
  for (const tag of ordered) {
    const norm = normalizeLocale(tag);
    if (isSupportedLocale(norm)) return norm;
  }
  return DEFAULT_LOCALE;
}

export function setLocaleCookie(res: Response, lang: Locale): void {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toUTCString();
  res.headers.set('Set-Cookie', `${COOKIE_NAME}=${encodeURIComponent(lang)}; Path=/; Expires=${expires}; SameSite=lax`);
}
