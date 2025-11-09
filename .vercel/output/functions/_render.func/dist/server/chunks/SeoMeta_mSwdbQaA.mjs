import { e as createAstro, f as createComponent, h as addAttribute, r as renderTemplate, p as renderComponent } from './astro/server_BigfXiJV.mjs';
import { S as SUPPORTED_LOCALES, L as LOCALE_TAG_MAP } from './config_BSB-V3dL.mjs';
import 'clsx';

function ensureLeadingSlash(p) {
  return p.startsWith("/") ? p : `/${p}`;
}
function withLangPrefix(pathname, lang) {
  const p = ensureLeadingSlash(pathname);
  const segs = p.split("/").filter(Boolean);
  if (segs[0] === lang) return p;
  return `/${lang}${p === "/" ? "" : p}`;
}
function buildCanonical(siteOrigin, lang, pathname) {
  const href = withLangPrefix(pathname, lang);
  return new URL(href, siteOrigin).toString();
}
function buildHreflangAlternates(siteOrigin, langs, pathname) {
  const items = langs.map((l) => ({
    hreflang: l,
    href: new URL(withLangPrefix(pathname, l), siteOrigin).toString()
  }));
  items.push({ hreflang: "x-default", href: items[0].href });
  return items;
}

const $$Astro$2 = createAstro("https://quizyparty.com");
const $$CanonicalLink = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CanonicalLink;
  const { lang, path, siteOrigin } = Astro2.props;
  const href = buildCanonical(siteOrigin, lang, path);
  return renderTemplate`<link rel="canonical"${addAttribute(href, "href")}>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/CanonicalLink.astro", void 0);

const $$Astro$1 = createAstro("https://quizyparty.com");
const $$HreflangLinks = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$HreflangLinks;
  const { path, siteOrigin } = Astro2.props;
  const links = buildHreflangAlternates(siteOrigin, SUPPORTED_LOCALES, path);
  return renderTemplate`${links.map((l) => renderTemplate`<link rel="alternate"${addAttribute(l.hreflang, "hreflang")}${addAttribute(l.href, "href")}>`)}`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/HreflangLinks.astro", void 0);

const $$Astro = createAstro("https://quizyparty.com");
const $$SeoMeta = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$SeoMeta;
  const {
    lang,
    title,
    description,
    path,
    siteOrigin,
    og
  } = Astro2.props;
  const ogTitle = og?.title ?? title;
  const ogDesc = og?.description ?? description;
  const ogImage = og?.image ?? `${siteOrigin}/og/default.png`;
  const url = `${siteOrigin}${path}`;
  return renderTemplate`<title>${title} · QuizyParty</title><meta name="description"${addAttribute(description, "content")}>${renderComponent($$result, "CanonicalLink", $$CanonicalLink, { "lang": lang, "path": path, "siteOrigin": siteOrigin })}${renderComponent($$result, "HreflangLinks", $$HreflangLinks, { "path": path, "siteOrigin": siteOrigin })}<!-- Open Graph --><meta property="og:type" content="website"><meta property="og:title"${addAttribute(ogTitle, "content")}><meta property="og:description"${addAttribute(ogDesc, "content")}><meta property="og:image"${addAttribute(ogImage, "content")}><meta property="og:url"${addAttribute(url, "content")}><meta property="og:site_name" content="QuizyParty"><meta property="og:locale"${addAttribute(LOCALE_TAG_MAP[lang] || "en_US", "content")}><!-- Twitter --><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${addAttribute(ogTitle, "content")}><meta name="twitter:description"${addAttribute(ogDesc, "content")}><meta name="twitter:image"${addAttribute(ogImage, "content")}>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/SeoMeta.astro", void 0);

export { $$SeoMeta as $ };
