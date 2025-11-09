import { e as createAstro, f as createComponent, h as addAttribute, p as renderComponent, ah as renderHead, r as renderTemplate } from '../../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../../chunks/server-i18n_B2pBwWF0.mjs';
import { $ as $$SeoMeta } from '../../../chunks/SeoMeta_mSwdbQaA.mjs';
import { $ as $$AppHeader } from '../../../chunks/AppHeader_Ceo4wj6R.mjs';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$Terms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Terms;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("terms.title");
  const desc = serverT("terms.metaDescription", { defaultValue: serverT("terms.title") });
  const placeholderNotice = serverT("terms.placeholderNotice", { defaultValue: "" });
  const lastUpdated = serverT("terms.lastUpdated");
  const intro = serverT("terms.intro");
  const sections = [
    {
      title: serverT("terms.sections.service.title"),
      paragraphs: [serverT("terms.sections.service.body1")]
    },
    {
      title: serverT("terms.sections.obligations.title"),
      paragraphs: [serverT("terms.sections.obligations.body1")]
    },
    {
      title: serverT("terms.sections.security.title"),
      paragraphs: [serverT("terms.sections.security.body1")]
    },
    {
      title: serverT("terms.sections.ip.title"),
      paragraphs: [serverT("terms.sections.ip.body1")]
    },
    {
      title: serverT("terms.sections.payment.title"),
      paragraphs: [serverT("terms.sections.payment.body1")]
    },
    {
      title: serverT("terms.sections.termination.title"),
      paragraphs: [serverT("terms.sections.termination.body1")]
    },
    {
      title: serverT("terms.sections.liability.title"),
      paragraphs: [serverT("terms.sections.liability.body1")]
    },
    {
      title: serverT("terms.sections.changes.title"),
      paragraphs: [serverT("terms.sections.changes.body1")]
    },
    {
      title: serverT("terms.sections.contact.title"),
      paragraphs: [serverT("terms.sections.contact.body1")]
    }
  ].filter((section) => section.title);
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate`<html${addAttribute(lang, "lang")}> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">${renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin })}${renderHead()}</head> <body> <a href="#main" class="sr-only">${serverT("a11y.skipToContent")}</a> ${renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT })} <main id="main" class="container stack-lg" style="padding-top:32px;padding-bottom:64px"> <header class="stack"> <h1 class="h1"> ${title} ${placeholderNotice && renderTemplate`<span>${placeholderNotice}</span>`} </h1> <p class="caption text-muted">${lastUpdated}</p> </header> <article class="card stack gap-lg"> <p class="p">${intro}</p> ${sections.map((section) => renderTemplate`<section class="stack"> <h2 class="h2">${section.title}</h2> ${section.paragraphs.map((paragraph) => renderTemplate`<p class="p">${paragraph}</p>`)} </section>`)} </article> </main> </body></html>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/legal/terms.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/legal/terms.astro";
const $$url = "/[lang]/legal/terms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Terms,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
