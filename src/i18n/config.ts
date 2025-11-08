export const SUPPORTED_LOCALES = ['zh-hant','zh-hans','ja','en','ko','de','fr'] as const;
export type Locale = typeof SUPPORTED_LOCALES[number];

export const DEFAULT_LOCALE: Locale = 'zh-hant';

export const LOCALE_TAG_MAP: Record<Locale, string> = {
  'zh-hant': 'zh_TW',
  'zh-hans': 'zh_CN',
  'ja': 'ja_JP',
  'en': 'en_US',
  'ko': 'ko_KR',
  'de': 'de_DE',
  'fr': 'fr_FR',
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
