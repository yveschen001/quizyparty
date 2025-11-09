import { d as defineMiddleware, s as sequence } from './chunks/index_VPKa_wni.mjs';
import crypto from 'node:crypto';
import { D as DEFAULT_LOCALE, S as SUPPORTED_LOCALES } from './chunks/config_BSB-V3dL.mjs';
import 'es-module-lexer';
import './chunks/astro-designed-error-pages_COQqYy4S.mjs';
import './chunks/astro/server_BigfXiJV.mjs';
import 'clsx';
import 'cookie';

const SUPPORTED = ["en", "zh-hant", "zh-hans", "ja"];
const ALIASES = {
  zh_TW: "zh-hant",
  "zh-tw": "zh-hant",
  "zh-Hant": "zh-hant",
  zh_Hant: "zh-hant",
  zh_CN: "zh-hans",
  "zh-cn": "zh-hans",
  "zh-Hans": "zh-hans",
  zh_Hans: "zh-hans"
};
const normalizeLang = (raw) => {
  if (!raw) return null;
  const trimmed = raw.trim();
  if (SUPPORTED.includes(trimmed)) {
    return trimmed;
  }
  if (ALIASES[trimmed]) {
    return ALIASES[trimmed];
  }
  return null;
};

const COOKIE_NAME = "qp_lang";
function isSupportedLocale(str) {
  return !!str && SUPPORTED_LOCALES.includes(str);
}
const MAP = {
  "zh-tw": "zh-hant",
  "zh-hant": "zh-hant",
  "zh": "zh-hans",
  "zh-cn": "zh-hans",
  "zh-hans": "zh-hans",
  "ja": "ja",
  "ja-jp": "ja",
  "en": "en",
  "en-us": "en",
  "en-gb": "en",
  "ko": "ko",
  "ko-kr": "ko",
  "de": "de",
  "de-de": "de",
  "fr": "fr",
  "fr-fr": "fr"
};
function normalizeLocale(input) {
  const s = (input || "").toLowerCase();
  if (MAP[s]) return MAP[s];
  if (s.startsWith("zh")) {
    if (s.includes("hant") || s.includes("tw") || s.includes("hk")) return "zh-hant";
    if (s.includes("hans") || s.includes("cn") || s.includes("sg")) return "zh-hans";
  }
  if (s.startsWith("en")) return "en";
  if (s.startsWith("ja")) return "ja";
  if (s.startsWith("ko")) return "ko";
  if (s.startsWith("de")) return "de";
  if (s.startsWith("fr")) return "fr";
  return DEFAULT_LOCALE;
}
function getPreferredLocale(req) {
  const cookie = req.headers.get("cookie") || "";
  const m = cookie.match(new RegExp(`${COOKIE_NAME}=([^;]+)`));
  if (m) {
    const v = decodeURIComponent(m[1]);
    if (isSupportedLocale(v)) return v;
  }
  const al = req.headers.get("accept-language");
  if (!al) return DEFAULT_LOCALE;
  const ordered = al.split(",").map((v) => v.trim().split(";q=")).sort((a, b) => parseFloat(b[1] || "1") - parseFloat(a[1] || "1")).map((v) => v[0]);
  for (const tag of ordered) {
    const norm = normalizeLocale(tag);
    if (isSupportedLocale(norm)) return norm;
  }
  return DEFAULT_LOCALE;
}
function setLocaleCookie(res, lang) {
  const expires = new Date(Date.now() + 180 * 24 * 60 * 60 * 1e3).toUTCString();
  res.headers.set("Set-Cookie", `${COOKIE_NAME}=${encodeURIComponent(lang)}; Path=/; Expires=${expires}; SameSite=lax`);
}

const onRequest$1 = defineMiddleware(async (context, next) => {
  const { url, request } = context;
  const pathname = url.pathname;
  const bypassPrefixes = [
    "/api",
    "/_astro",
    "/favicon",
    "/robots.txt",
    "/sitemap-index.xml",
    "/data",
    "/js",
    "/og"
  ];
  if (bypassPrefixes.some((p) => pathname.startsWith(p))) {
    const hasUidApi = context.cookies.get("qp_uid");
    if (!hasUidApi) {
      const uid = crypto.randomUUID();
      context.cookies.set("qp_uid", uid, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365
      });
    }
    return next();
  }
  if (pathname === "/") {
    const lang = getPreferredLocale(request);
    const location = `/${lang}/`;
    const res = new Response(null, { status: 301, headers: { Location: location } });
    setLocaleCookie(res, lang);
    const hasUid2 = context.cookies.get("qp_uid");
    if (!hasUid2) {
      const uid = crypto.randomUUID();
      context.cookies.set("qp_uid", uid, {
        path: "/",
        httpOnly: true,
        sameSite: "lax",
        maxAge: 60 * 60 * 24 * 365
      });
    }
    return res;
  }
  const segments = pathname.split("/").filter(Boolean);
  const maybeLang = segments[0];
  if (maybeLang) {
    const normalized = normalizeLang(maybeLang);
    if (!normalized || !isSupportedLocale(normalized)) {
      return new Response(null, { status: 404 });
    }
    if (maybeLang !== normalized) {
      segments[0] = normalized;
      const redirectUrl = new URL(url);
      const trailingSlash = pathname.endsWith("/") && segments.length > 0;
      redirectUrl.pathname = "/" + segments.join("/");
      if (trailingSlash && !redirectUrl.pathname.endsWith("/")) {
        redirectUrl.pathname += "/";
      }
      return Response.redirect(redirectUrl.toString(), 301);
    }
  }
  const hasUid = context.cookies.get("qp_uid");
  if (!hasUid) {
    const uid = crypto.randomUUID();
    context.cookies.set("qp_uid", uid, {
      path: "/",
      httpOnly: true,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 365
    });
  }
  return next();
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
