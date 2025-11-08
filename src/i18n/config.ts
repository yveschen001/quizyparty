export const SUPPORTED_LOCALES = ['en','zh-hant','zh-hans','ja'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'en';

export const LOCALE_TAG_MAP: Record<Locale, string> = {
  'en': 'en_US',
  'zh-hant': 'zh_TW',
  'zh-hans': 'zh_CN',
  'ja': 'ja_JP',
};

export const NAMESPACES = [
  'common',
  'home',
  'about',
  'room',
  'play',
  'leaderboard',
  'auth',
  'errors',
  'a11y',
  'seo',
] as const;
export type Namespace = typeof NAMESPACES[number];

export const LOCALE_FILES_DIR = '/src/i18n/locales';
