import i18next from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { S as SUPPORTED_LOCALES } from './config_BSB-V3dL.mjs';

const __variableDynamicImportRuntimeHelper = (glob, path, segs) => {
  const v = glob[path];
  if (v) {
    return typeof v === "function" ? v() : Promise.resolve(v);
  }
  return new Promise((_, reject) => {
    (typeof queueMicrotask === "function" ? queueMicrotask : setTimeout)(
      reject.bind(
        null,
        new Error(
          "Unknown variable dynamic import: " + path + (path.split("/").length !== segs ? ". Note that variables only represent file names one level deep." : "")
        )
      )
    );
  });
};

const serverInstances = /* @__PURE__ */ new Map();
function createOptions(namespaces) {
  return {
    fallbackLng: ["en"],
    supportedLngs: [...SUPPORTED_LOCALES],
    defaultNS: namespaces[0] ?? "common",
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
    parseMissingKeyHandler: (key) => {
      if (process?.env?.NODE_ENV !== "production") {
        console.warn(`[i18n] Missing translation key: ${key}`);
        return `🚧 ${key}`;
      }
      return key;
    }
  };
}
async function loadServerI18n(lang, ns = ["common"]) {
  console.log(`[i18n Server] loadServerI18n called with lang: ${lang}, ns:`, ns);
  let serverInstance = serverInstances.get(lang);
  if (!serverInstance) {
    console.log(`[i18n Server] Creating new i18next instance for lang: ${lang}...`);
    serverInstance = i18next.createInstance();
    serverInstance.use(
      resourcesToBackend(async (lng, nspace) => {
        console.log(`[i18n Server] resourcesToBackend called: lng=${lng}, nspace=${nspace}`);
        try {
          const mod = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"./locales/de/common.json": () => import('./common_CmJepd6_.mjs'),"./locales/en/common.json": () => import('./common_Yhc9qnWu.mjs'),"./locales/fr/common.json": () => import('./common_9eoi48sM.mjs'),"./locales/ja/common.json": () => import('./common_QZQa4Y8O.mjs'),"./locales/ko/common.json": () => import('./common_Xy_V-6uo.mjs'),"./locales/zh-hans/common.json": () => import('./common_CkRHgbQN.mjs'),"./locales/zh-hant/common.json": () => import('./common_DZb6_e4s.mjs')})), `./locales/${lng}/${nspace}.json`, 4);
          const data = mod.default || mod;
          if (typeof data === "object" && data !== null) {
            console.log(`[i18n Server] Loaded ${lng}/${nspace}.json, keys:`, Object.keys(data).length);
            if (lng === "zh-hant" && nspace === "common") {
              console.log(`[i18n Server] home.hero.title:`, data["home.hero.title"]);
              console.log(`[i18n Server] home.hero.subtitle:`, data["home.hero.subtitle"]);
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
    console.log(`[i18n Server] Initializing i18next instance for lang: ${lang}...`);
    await serverInstance.init({
      ...createOptions(ns),
      lng: lang
      // 直接设置目标语言
    });
    console.log(`[i18n Server] Instance initialized for ${lang}, current language:`, serverInstance.language);
    serverInstances.set(lang, serverInstance);
  }
  console.log(`[i18n Server] Loading namespaces for ${lang}, namespace:`, ns);
  await serverInstance.loadNamespaces(ns);
  const testTitle = serverInstance.t("home.hero.title");
  const testSubtitle = serverInstance.t("home.hero.subtitle");
  console.log(`[i18n Server] Test translation - title: "${testTitle}", subtitle: "${testSubtitle}"`);
  const currentResources = serverInstance.getResourceBundle(lang, "common");
  if (currentResources) {
    console.log(`[i18n Server] Resource bundle for ${lang}/common exists, keys:`, Object.keys(currentResources).length);
    console.log(`[i18n Server] Resource bundle - home.hero.title:`, currentResources["home.hero.title"]);
  } else {
    console.warn(`[i18n Server] Resource bundle for ${lang}/common is missing!`);
    console.log(`[i18n Server] Attempting to manually load resource bundle...`);
    try {
      const mod = await __variableDynamicImportRuntimeHelper((/* #__PURE__ */ Object.assign({"./locales/de/common.json": () => import('./common_CmJepd6_.mjs'),"./locales/en/common.json": () => import('./common_Yhc9qnWu.mjs'),"./locales/fr/common.json": () => import('./common_9eoi48sM.mjs'),"./locales/ja/common.json": () => import('./common_QZQa4Y8O.mjs'),"./locales/ko/common.json": () => import('./common_Xy_V-6uo.mjs'),"./locales/zh-hans/common.json": () => import('./common_CkRHgbQN.mjs'),"./locales/zh-hant/common.json": () => import('./common_DZb6_e4s.mjs')})), `./locales/${lang}/common.json`, 4);
      const data = mod.default || mod;
      if (typeof data === "object" && data !== null) {
        serverInstance.addResourceBundle(lang, "common", data, true, true);
        console.log(`[i18n Server] Manually added resource bundle for ${lang}/common`);
      }
    } catch (e) {
      console.error(`[i18n Server] Failed to manually load resource bundle:`, e);
    }
  }
}
function getServerT(lang) {
  const serverInstance = serverInstances.get(lang);
  if (!serverInstance || !serverInstance.isInitialized) {
    throw new Error(`i18n server instance for language "${lang}" is not initialized. Call loadServerI18n("${lang}") first.`);
  }
  return (key, vars) => {
    console.log(`[i18n Server] getServerT called - lang: ${lang}, key: ${key}, instance language: ${serverInstance.language}`);
    const result = serverInstance.t(key, vars);
    console.log(`[i18n Server] Translation result for "${key}": "${result}"`);
    if (result === key) {
      console.warn(`[i18n Server] Translation missing for key "${key}" in language "${lang}"`);
      const fallbackLang = "zh-hant";
      if (lang !== fallbackLang) {
        const fallbackInstance = serverInstances.get(fallbackLang);
        if (fallbackInstance && fallbackInstance.isInitialized) {
          const fallbackResult = fallbackInstance.t(key, vars);
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

async function setupServerI18n(paramLang) {
  const lang = SUPPORTED_LOCALES.includes(paramLang || "") ? paramLang : "zh-hant";
  await loadServerI18n(lang);
  const serverT = getServerT(lang);
  return { lang, serverT };
}

export { setupServerI18n as s };
