import i18next, { type InitOptions } from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import resourcesToBackend from 'i18next-resources-to-backend';
import type { I18nKey } from './keys';
import { SUPPORTED_LOCALES, type Locale, type Namespace } from './config';

let clientInstance: ReturnType<typeof i18next.createInstance> | null = null;
let initialized = false;

function createOptions(namespaces: Namespace[]): InitOptions {
  return {
    fallbackLng: ['zh-hant', 'en'],
    supportedLngs: [...SUPPORTED_LOCALES],
    defaultNS: namespaces[0] ?? 'common',
    ns: namespaces,
    interpolation: { escapeValue: false },
    load: 'languageOnly',
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
    detection: {
      order: ['cookie', 'navigator'],
      caches: ['cookie'],
      lookupCookie: 'qp_lang',
      cookieMinutes: 60 * 24 * 180,
    },
    saveMissing: false,
    missingKeyHandler: false,
    parseMissingKeyHandler: (key: string) => {
      console.warn(`[i18n] Missing translation key: ${key}`);
      return key;
    },
  } satisfies InitOptions;
}

export async function initClientI18nOnce(namespaces: Namespace[] = ['common']): Promise<void> {
  if (initialized) return;
  clientInstance = i18next.createInstance();
  clientInstance
    .use(LanguageDetector)
    .use(resourcesToBackend(async (lng: string, nspace: string) => {
      try {
        const mod = await import(`./locales/${lng}/${nspace}.json`);
        return mod.default || mod;
      } catch (e) {
        console.error(`[i18n] Failed to load ${lng}/${nspace}.json:`, e);
        return {};
      }
    }));
  await clientInstance.init(createOptions(namespaces));
  clientInstance.on('languageChanged', (lng: string) => {
    try {
      const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toUTCString();
      document.cookie = `qp_lang=${encodeURIComponent(lng)}; Path=/; Expires=${expires}; SameSite=lax`;
    } catch {}
  });
  initialized = true;
}

export function getClientT() {
  if (!clientInstance) throw new Error('i18n client not initialized. Call initClientI18nOnce().');
  return (key: I18nKey, vars?: Record<string, unknown>) => clientInstance!.t(key as any, vars as any) as string;
}
