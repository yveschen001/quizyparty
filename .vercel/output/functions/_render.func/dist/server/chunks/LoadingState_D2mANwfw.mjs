import { e as createAstro, f as createComponent, m as maybeRenderHead, h as addAttribute, r as renderTemplate } from './astro/server_BigfXiJV.mjs';
import 'clsx';

const $$Astro$1 = createAstro("https://quizyparty.com");
const $$EmptyState = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$EmptyState;
  const {
    lang,
    serverT,
    titleKey,
    descKey,
    actionHref,
    actionKey,
    id
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} role="region" aria-live="polite" data-testid="empty-state" class="card stack text-center"> <h3 class="h3 no-margin">${serverT(titleKey)}</h3> ${descKey && renderTemplate`<p class="p no-margin text-muted">${serverT(descKey)}</p>`} ${actionHref && actionKey && renderTemplate`<a${addAttribute(actionHref, "href")} class="btn btn-primary">${serverT(actionKey)}</a>`} </section>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/ui/EmptyState.astro", void 0);

const $$Astro = createAstro("https://quizyparty.com");
const $$LoadingState = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$LoadingState;
  const {
    lang,
    serverT,
    titleKey,
    descKey,
    actionHref,
    actionKey,
    id
  } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section${addAttribute(id, "id")} role="status" aria-live="polite" data-testid="loading-state" class="card stack"> <h3 class="h3 no-margin">${serverT(titleKey)}</h3> ${descKey && renderTemplate`<p class="p no-margin">${serverT(descKey)}</p>`} ${actionHref && actionKey && renderTemplate`<a${addAttribute(actionHref, "href")} class="btn btn-primary">${serverT(actionKey)}</a>`} </section>`;
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/ui/LoadingState.astro", void 0);

export { $$EmptyState as $, $$LoadingState as a };
