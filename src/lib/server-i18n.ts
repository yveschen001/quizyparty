import type { Locale } from '../i18n/config';
import type { I18nKey } from '../i18n/keys';
import { loadServerI18n, getServerT } from '../i18n/instance.server';
import { SUPPORTED_LOCALES } from '../i18n/config';

/**
 * 设置服务器端 i18n，返回语言和翻译函数
 * 在 Astro 页面中使用：
 * ```
 * const { lang, serverT } = await setupServerI18n(Astro.params.lang);
 * ```
 */
export async function setupServerI18n(
  paramLang: string | undefined
): Promise<{ lang: Locale; serverT: (key: I18nKey, vars?: Record<string, unknown>) => string }> {
  const lang = (SUPPORTED_LOCALES as readonly string[]).includes(paramLang || '')
    ? (paramLang as Locale)
    : 'zh-hant';
  
  await loadServerI18n(lang);
  const serverT = getServerT(lang);
  
  return { lang, serverT };
}

