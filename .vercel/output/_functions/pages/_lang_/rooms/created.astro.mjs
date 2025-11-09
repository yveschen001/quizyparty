import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, p as renderComponent, ah as renderHead } from '../../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../../chunks/server-i18n_BKH6atwt.mjs';
import { $ as $$SeoMeta } from '../../../chunks/SeoMeta_mSwdbQaA.mjs';
import { $ as $$AppHeader } from '../../../chunks/AppHeader_Ceo4wj6R.mjs';
/* empty css                                       */
import { $ as $$EmptyState, a as $$LoadingState } from '../../../chunks/LoadingState_D2mANwfw.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$Created = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Created;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("profile.sections.myRooms");
  const desc = serverT("profile.sections.myRooms");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body", '> <a href="#main" class="sr-only">', "</a> ", ' <main id="main"', '> <div id="created-controls" class="mb-3"></div> <nav', ' class="caption breadcrumb"> <a', ' class="caption"', ">", '</a> <span aria-hidden="true">/</span> <span class="caption">', '</span> </nav> <div class="flex-between"> <h1 class="h1 no-margin">', "</h1> <a", "", ">", '</a> </div> <div id="created-tabs" role="tablist"', ' class="tab-row"> <button id="created-tab-published"', ' role="tab" data-status="published" type="button" aria-selected="true" aria-controls="created-list" tabindex="0"> <span>', '</span> <span class="badge" data-count-badge="published">0</span> </button> <button id="created-tab-draft"', ' role="tab" data-status="draft" type="button" aria-selected="false" aria-controls="created-list" tabindex="-1"> <span>', '</span> <span class="badge" data-count-badge="draft">0</span> </button> </div> <div id="created-message" class="status-text" role="status" aria-live="polite"></div> ', " ", ' <div id="created-list" role="tabpanel" aria-labelledby="created-tab-published"', `></div> <div id="created-pagination" class="flex-between is-hidden"></div> </main> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-card-template.js"></script> <script src="/js/rooms-filters.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      ;(async function () {
        await import('/js/i18n.js')
        const { setupRoomsManager } = await import('/js/rooms-manager.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const createdList = document.getElementById('created-list')
        const createdPagination = document.getElementById('created-pagination')
        const createdMessage = document.getElementById('created-message')
        const createdTabsContainer = document.getElementById('created-tabs')
        const featureV3 =
          document.body && document.body.dataset
            ? document.body.dataset.featureV3 === 'true'
            : false
        const countBadges = {
          published: document.querySelector('[data-count-badge="published"]'),
          draft: document.querySelector('[data-count-badge="draft"]'),
        }
        const createdTabs = createdTabsContainer
          ? Array.prototype.slice
              .call(createdTabsContainer.querySelectorAll('[data-status]'))
              .map(function (button) {
                return { status: button.getAttribute('data-status') || 'published', button: button }
              })
          : []
        const createdLoading = document.getElementById('created-loading')
        const createdEmpty = document.getElementById('created-empty')
        function toggle(el, show) {
          if (!el) return
          el.style.display = show ? '' : 'none'
        }
        function showMessage(text, isError) {
          if (!createdMessage) return
          // 最小整合：若為空範圍提示，顯示統一 EmptyState；其他訊息維持舊行為
          const emptyScope = window.t('profile.created.emptyScope')
          if (text && text === emptyScope) {
            toggle(createdLoading, false)
            toggle(createdEmpty, true)
            createdMessage.innerHTML = ''
            createdMessage.style.color = ''
            return
          } else {
            toggle(createdEmpty, false)
          }
          if (!text) {
            createdMessage.innerHTML = ''
            createdMessage.style.color = ''
            toggle(createdLoading, false)
            return
          }
          if (featureV3) {
            createdMessage.innerHTML =
              '<div class="card ' +
              (isError ? 'text-danger' : '') +
              ' text-center">' +
              text +
              '</div>'
            createdMessage.style.color = ''
            toggle(createdLoading, false)
            return
          }
          createdMessage.textContent = text
          createdMessage.style.color = isError ? '#d00' : '#059669'
        }
        function setCountBadge(status, value) {
          const badge = status === 'draft' ? countBadges.draft : countBadges.published
          if (!badge) return
          const safe = typeof value === 'number' && value >= 0 ? value : 0
          badge.textContent = String(safe)
          const tab = createdTabs.find(function (entry) {
            return entry.status === status
          })
          if (tab && tab.button) {
            const labelKey = status === 'draft' ? 'myRooms.drafts' : 'myRooms.published'
            tab.button.setAttribute('aria-label', window.t(labelKey) + ' ' + safe)
          }
        }
        async function fetchStatusTotal(status) {
          try {
            const params = new URLSearchParams()
            params.set('status', status)
            params.set('limit', '1')
            params.set('offset', '0')
            const res = await fetch('/api/room-templates?' + params.toString(), {
              credentials: 'include',
            })
            if (!res.ok) return null
            const json = await res.json()
            if (typeof json.total === 'number') return json.total
            const templates = Array.isArray(json.templates) ? json.templates : []
            return templates.length
          } catch (e) {
            console.warn('[rooms/created] fetchStatusTotal failed', status, e)
            return null
          }
        }
        async function updateCounts() {
          const [published, draft] = await Promise.all([
            fetchStatusTotal('published'),
            fetchStatusTotal('draft'),
          ])
          setCountBadge('published', published)
          setCountBadge('draft', draft)
        }
        const mgr = setupRoomsManager({
          listEl: createdList,
          paginationEl: createdPagination,
          tabs: createdTabs,
          lang: lang,
          t: function (key) {
            return window.t(key)
          },
          pageSize: 10,
          onNotify: function (text, isError) {
            showMessage(text, isError)
            updateCounts()
          },
          emptyText: window.t('profile.created.emptyScope'),
          emptyAction: {
            href: '/' + lang + '/create-room',
            label: window.t('profile.sections.createRoom'),
          },
        })
        updateCounts()
        if (mgr && mgr.refresh) {
          const originalRefresh = mgr.refresh
          mgr.refresh = function () {
            originalRefresh()
            updateCounts()
          }
          mgr.refresh()
        }
        ;(function initControls(){
          try {
            if (window.RoomsFilters) {
              window.RoomsFilters.renderCreatedControls(document.getElementById('created-controls'))
            }
          } catch (e) {}
        })()
      })()
    </script> </body> </html>
*** End Patch*** }\`\`\`} error code: 400, error: Bad RequestThe arguments to the tool are not valid JSON:
invalid character '*' looking for beginning of object key string. Please ensure your function arguments
is valid JSON. Also ensure that the argument "code_edit" is a valid patch. Please ensure that you escape
any control characters in the patch such as newlines. Please ensure that both the keys and values in
PATCH_ARGS are valid JSON. Also ensure that you pass a single JSON object in the call. (If you are requesting
multiple actions, please send them in separate calls.)`], ["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body", '> <a href="#main" class="sr-only">', "</a> ", ' <main id="main"', '> <div id="created-controls" class="mb-3"></div> <nav', ' class="caption breadcrumb"> <a', ' class="caption"', ">", '</a> <span aria-hidden="true">/</span> <span class="caption">', '</span> </nav> <div class="flex-between"> <h1 class="h1 no-margin">', "</h1> <a", "", ">", '</a> </div> <div id="created-tabs" role="tablist"', ' class="tab-row"> <button id="created-tab-published"', ' role="tab" data-status="published" type="button" aria-selected="true" aria-controls="created-list" tabindex="0"> <span>', '</span> <span class="badge" data-count-badge="published">0</span> </button> <button id="created-tab-draft"', ' role="tab" data-status="draft" type="button" aria-selected="false" aria-controls="created-list" tabindex="-1"> <span>', '</span> <span class="badge" data-count-badge="draft">0</span> </button> </div> <div id="created-message" class="status-text" role="status" aria-live="polite"></div> ', " ", ' <div id="created-list" role="tabpanel" aria-labelledby="created-tab-published"', `></div> <div id="created-pagination" class="flex-between is-hidden"></div> </main> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-card-template.js"></script> <script src="/js/rooms-filters.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      ;(async function () {
        await import('/js/i18n.js')
        const { setupRoomsManager } = await import('/js/rooms-manager.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const createdList = document.getElementById('created-list')
        const createdPagination = document.getElementById('created-pagination')
        const createdMessage = document.getElementById('created-message')
        const createdTabsContainer = document.getElementById('created-tabs')
        const featureV3 =
          document.body && document.body.dataset
            ? document.body.dataset.featureV3 === 'true'
            : false
        const countBadges = {
          published: document.querySelector('[data-count-badge="published"]'),
          draft: document.querySelector('[data-count-badge="draft"]'),
        }
        const createdTabs = createdTabsContainer
          ? Array.prototype.slice
              .call(createdTabsContainer.querySelectorAll('[data-status]'))
              .map(function (button) {
                return { status: button.getAttribute('data-status') || 'published', button: button }
              })
          : []
        const createdLoading = document.getElementById('created-loading')
        const createdEmpty = document.getElementById('created-empty')
        function toggle(el, show) {
          if (!el) return
          el.style.display = show ? '' : 'none'
        }
        function showMessage(text, isError) {
          if (!createdMessage) return
          // 最小整合：若為空範圍提示，顯示統一 EmptyState；其他訊息維持舊行為
          const emptyScope = window.t('profile.created.emptyScope')
          if (text && text === emptyScope) {
            toggle(createdLoading, false)
            toggle(createdEmpty, true)
            createdMessage.innerHTML = ''
            createdMessage.style.color = ''
            return
          } else {
            toggle(createdEmpty, false)
          }
          if (!text) {
            createdMessage.innerHTML = ''
            createdMessage.style.color = ''
            toggle(createdLoading, false)
            return
          }
          if (featureV3) {
            createdMessage.innerHTML =
              '<div class="card ' +
              (isError ? 'text-danger' : '') +
              ' text-center">' +
              text +
              '</div>'
            createdMessage.style.color = ''
            toggle(createdLoading, false)
            return
          }
          createdMessage.textContent = text
          createdMessage.style.color = isError ? '#d00' : '#059669'
        }
        function setCountBadge(status, value) {
          const badge = status === 'draft' ? countBadges.draft : countBadges.published
          if (!badge) return
          const safe = typeof value === 'number' && value >= 0 ? value : 0
          badge.textContent = String(safe)
          const tab = createdTabs.find(function (entry) {
            return entry.status === status
          })
          if (tab && tab.button) {
            const labelKey = status === 'draft' ? 'myRooms.drafts' : 'myRooms.published'
            tab.button.setAttribute('aria-label', window.t(labelKey) + ' ' + safe)
          }
        }
        async function fetchStatusTotal(status) {
          try {
            const params = new URLSearchParams()
            params.set('status', status)
            params.set('limit', '1')
            params.set('offset', '0')
            const res = await fetch('/api/room-templates?' + params.toString(), {
              credentials: 'include',
            })
            if (!res.ok) return null
            const json = await res.json()
            if (typeof json.total === 'number') return json.total
            const templates = Array.isArray(json.templates) ? json.templates : []
            return templates.length
          } catch (e) {
            console.warn('[rooms/created] fetchStatusTotal failed', status, e)
            return null
          }
        }
        async function updateCounts() {
          const [published, draft] = await Promise.all([
            fetchStatusTotal('published'),
            fetchStatusTotal('draft'),
          ])
          setCountBadge('published', published)
          setCountBadge('draft', draft)
        }
        const mgr = setupRoomsManager({
          listEl: createdList,
          paginationEl: createdPagination,
          tabs: createdTabs,
          lang: lang,
          t: function (key) {
            return window.t(key)
          },
          pageSize: 10,
          onNotify: function (text, isError) {
            showMessage(text, isError)
            updateCounts()
          },
          emptyText: window.t('profile.created.emptyScope'),
          emptyAction: {
            href: '/' + lang + '/create-room',
            label: window.t('profile.sections.createRoom'),
          },
        })
        updateCounts()
        if (mgr && mgr.refresh) {
          const originalRefresh = mgr.refresh
          mgr.refresh = function () {
            originalRefresh()
            updateCounts()
          }
          mgr.refresh()
        }
        ;(function initControls(){
          try {
            if (window.RoomsFilters) {
              window.RoomsFilters.renderCreatedControls(document.getElementById('created-controls'))
            }
          } catch (e) {}
        })()
      })()
    </script> </body> </html>
*** End Patch*** }\\\`\\\`\\\`} error code: 400, error: Bad RequestThe arguments to the tool are not valid JSON:
invalid character '*' looking for beginning of object key string. Please ensure your function arguments
is valid JSON. Also ensure that the argument "code_edit" is a valid patch. Please ensure that you escape
any control characters in the patch such as newlines. Please ensure that both the keys and values in
PATCH_ARGS are valid JSON. Also ensure that you pass a single JSON object in the call. (If you are requesting
multiple actions, please send them in separate calls.)`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), addAttribute("true" , "data-feature-v3"), serverT("a11y.skipToContent"), renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT }), addAttribute(["container", "stack-lg" ], "class:list"), addAttribute(serverT("common.breadcrumbs"), "aria-label"), addAttribute(`/${lang}/profile`, "href"), addAttribute(serverT("profile.title"), "aria-label"), serverT("profile.title"), title, title, addAttribute("btn-primary" , "class"), addAttribute(`/${lang}/create-room`, "href"), serverT("profile.sections.createRoom"), addAttribute(serverT("profile.sections.myRooms"), "aria-label"), addAttribute("tab active" , "class"), serverT("myRooms.published"), addAttribute("tab" , "class"), serverT("myRooms.drafts"), renderComponent($$result, "LoadingState", $$LoadingState, { "id": "created-loading", "lang": lang, "serverT": serverT, "titleKey": "common.loading" }), renderComponent($$result, "EmptyState", $$EmptyState, { "id": "created-empty", "lang": lang, "serverT": serverT, "titleKey": "common.empty.created.title", "descKey": "common.empty.created.desc", "actionHref": `/${lang}/create-room`, "actionKey": "common.empty.created.action" }), addAttribute("stack" , "class"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/rooms/created.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/rooms/created.astro";
const $$url = "/[lang]/rooms/created";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Created,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
