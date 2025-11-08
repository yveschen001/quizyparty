import i18next, { type InitOptions } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import type { I18nKey } from './keys';
import { SUPPORTED_LOCALES, type Locale, type Namespace } from './config';

// 为每个语言创建独立的实例，避免语言切换时的状态问题
const serverInstances: Map<Locale, ReturnType<typeof i18next.createInstance>> = new Map();

function createOptions(namespaces: Namespace[]): InitOptions {
  return {
    fallbackLng: ['en'],
    supportedLngs: [...SUPPORTED_LOCALES],
    defaultNS: namespaces[0] ?? 'common',
    ns: namespaces,
    interpolation: { escapeValue: false },
    // 移除 load: 'languageOnly'，确保完整匹配 zh-hant
    // load: 'languageOnly', // This might cause issues with zh-hant matching
    returnEmptyString: false,
    returnNull: false,
    returnObjects: false,
    // 缺字處理：DEV 打警告；PROD 直接回退至英文
    saveMissing: false,
    missingKeyHandler: false,
    parseMissingKeyHandler: (key: string) => {
      if (process?.env?.NODE_ENV !== 'production') {
        console.warn(`[i18n] Missing translation key: ${key}`);
        return `🚧 ${key}`;
      }
      return key;
    },
  } satisfies InitOptions;
}

export async function loadServerI18n(lang: Locale, ns: Namespace[] = ['common']): Promise<void> {
  console.log(`[i18n Server] loadServerI18n called with lang: ${lang}, ns:`, ns);
  
  // 为每个语言使用独立的实例，避免语言切换时的状态问题
  let serverInstance = serverInstances.get(lang);
  
  if (!serverInstance) {
    console.log(`[i18n Server] Creating new i18next instance for lang: ${lang}...`);
    serverInstance = i18next.createInstance();
    serverInstance.use(
      resourcesToBackend(async (lng: string, nspace: string) => {
        console.log(`[i18n Server] resourcesToBackend called: lng=${lng}, nspace=${nspace}`);
        try {
          const mod = await import(`./locales/${lng}/${nspace}.json`);
          const data = mod.default || mod;
          // 確保返回的是對象
          if (typeof data === 'object' && data !== null) {
            console.log(`[i18n Server] Loaded ${lng}/${nspace}.json, keys:`, Object.keys(data).length);
            // 检查关键键是否存在
            if (lng === 'zh-hant' && nspace === 'common') {
              console.log(`[i18n Server] home.hero.title:`, data['home.hero.title']);
              console.log(`[i18n Server] home.hero.subtitle:`, data['home.hero.subtitle']);
            }
            return data;
          }
          console.warn(`[i18n] Invalid data format for ${lng}/${nspace}.json`);
          return {};
        } catch (e) {
          console.error(`[i18n] Failed to load ${lng}/${nspace}.json:`, e);
          return {};
        }
      })
    );
    
    // 初始化时直接使用目标语言
    console.log(`[i18n Server] Initializing i18next instance for lang: ${lang}...`);
    await serverInstance.init({
      ...createOptions(ns),
      lng: lang, // 直接设置目标语言
    });
    console.log(`[i18n Server] Instance initialized for ${lang}, current language:`, serverInstance.language);
    
    // 存储实例
    serverInstances.set(lang, serverInstance);
  }
  
  // 确保资源已加载
  console.log(`[i18n Server] Loading namespaces for ${lang}, namespace:`, ns);
  await serverInstance.loadNamespaces(ns);
  
  // 验证关键翻译是否加载成功
  const testTitle = serverInstance.t('home.hero.title' as any);
  const testSubtitle = serverInstance.t('home.hero.subtitle' as any);
  console.log(`[i18n Server] Test translation - title: "${testTitle}", subtitle: "${testSubtitle}"`);
  
  // 额外验证：检查当前语言资源是否已加载
  const currentResources = serverInstance.getResourceBundle(lang, 'common');
  if (currentResources) {
    console.log(`[i18n Server] Resource bundle for ${lang}/common exists, keys:`, Object.keys(currentResources).length);
    console.log(`[i18n Server] Resource bundle - home.hero.title:`, currentResources['home.hero.title']);
  } else {
    console.warn(`[i18n Server] Resource bundle for ${lang}/common is missing!`);
    // 尝试直接加载资源
    console.log(`[i18n Server] Attempting to manually load resource bundle...`);
    try {
      const mod = await import(`./locales/${lang}/common.json`);
      const data = mod.default || mod;
      if (typeof data === 'object' && data !== null) {
        serverInstance.addResourceBundle(lang, 'common', data, true, true);
        console.log(`[i18n Server] Manually added resource bundle for ${lang}/common`);
      }
    } catch (e) {
      console.error(`[i18n Server] Failed to manually load resource bundle:`, e);
    }
  }
}

export function getServerT(lang: Locale) {
  const serverInstance = serverInstances.get(lang);
  if (!serverInstance || !serverInstance.isInitialized) {
    throw new Error(`i18n server instance for language "${lang}" is not initialized. Call loadServerI18n("${lang}") first.`);
  }
  return (key: I18nKey, vars?: Record<string, unknown>): string => {
    console.log(`[i18n Server] getServerT called - lang: ${lang}, key: ${key}, instance language: ${serverInstance.language}`);
    
    const result = serverInstance.t(key as any, vars as any) as unknown as string;
    console.log(`[i18n Server] Translation result for "${key}": "${result}"`);
    
    // 如果返回的是 key 本身（表示找不到翻譯），嘗試從 fallback 語言獲取
    if (result === key) {
      console.warn(`[i18n Server] Translation missing for key "${key}" in language "${lang}"`);
      // 尝试从 fallback 语言获取
      const fallbackLang = 'zh-hant';
      if (lang !== fallbackLang) {
        const fallbackInstance = serverInstances.get(fallbackLang);
        if (fallbackInstance && fallbackInstance.isInitialized) {
          const fallbackResult = fallbackInstance.t(key as any, vars as any) as unknown as string;
          if (fallbackResult !== key) {
            console.log(`[i18n Server] Using fallback (${fallbackLang}) for key "${key}":`, fallbackResult);
            return fallbackResult;
          }
        }
      }
    }
    return result;
  };
}
