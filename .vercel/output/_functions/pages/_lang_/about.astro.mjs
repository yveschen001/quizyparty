import { e as createAstro, f as createComponent, h as addAttribute, p as renderComponent, ah as renderHead, r as renderTemplate } from '../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../chunks/server-i18n_B2pBwWF0.mjs';
import { $ as $$SeoMeta } from '../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                    */
import { $ as $$AppHeader } from '../../chunks/AppHeader_Ceo4wj6R.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$About = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$About;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("nav.about");
  const subtitle = serverT("home.hero.subtitle");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": subtitle, "path": path, "siteOrigin": siteOrigin })}${renderHead()}</head> <body> <a href="#main" class="sr-only">${serverT("a11y.skipToContent")}</a> ${renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT })} <main id="main" class="container hero"> <h1 class="h1">${title}</h1> <p>${subtitle}</p> <a class="btn"${addAttribute(`/${lang}/`, "href")}>${serverT("nav.home")}</a> </main> </body></html>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/about.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/about.astro";
const $$url = "/[lang]/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
