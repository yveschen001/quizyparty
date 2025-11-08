import type { I18nKey } from './keys';
import type { Locale } from './config';
import { loadServerI18n, getServerT } from './instance.server';
import { initClientI18nOnce, getClientT } from './instance.client';

function isBrowser(): boolean {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}

export async function t(lang: Locale, key: I18nKey, vars?: Record<string, unknown>): Promise<string> {
  if (isBrowser()) {
    await initClientI18nOnce();
    return getClientT()(key, vars);
  }
  await loadServerI18n(lang);
  return getServerT(lang)(key, vars);
}

export function createT(lang: Locale) {
  return async (key: I18nKey, vars?: Record<string, unknown>) => t(lang, key, vars);
}
