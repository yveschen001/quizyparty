import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, p as renderComponent, ah as renderHead } from '../../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../../chunks/server-i18n_B6Cgzsxy.mjs';
import { $ as $$SeoMeta } from '../../../chunks/SeoMeta_mSwdbQaA.mjs';
import { $ as $$AppHeader } from '../../../chunks/AppHeader_Ceo4wj6R.mjs';
/* empty css                                       */
import { $ as $$EmptyState, a as $$LoadingState } from '../../../chunks/LoadingState_D2mANwfw.mjs';
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$Joined = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Joined;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("profile.sections.participations");
  const desc = serverT("profile.sections.participations");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body", '> <a href="#main" class="sr-only">', "</a> ", ' <main id="main"', "> <nav", ' class="caption breadcrumb"> <a', ' class="caption"', ">", '</a> <span aria-hidden="true">/</span> <span class="caption">', '</span> </nav> <h1 class="h1 no-margin">', '</h1> <div id="message" class="status-text" role="status" aria-live="polite"></div> ', " ", ' <div id="list"', ` role="list"></div> </main> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-card-template.js"></script> <script type="module">
      ;(async function () {
        await import('/js/i18n.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const featureV3 =
          document.body && document.body.dataset
            ? document.body.dataset.featureV3 === 'true'
            : false
        let fmt = null
        try {
          fmt = await import('/src/utils/format.ts')
        } catch (e) {}
        const message = document.getElementById('message')
        const list = document.getElementById('list')
        function showMessage(text, isError) {
          if (!message) return
          if (!text) {
            message.innerHTML = ''
            message.style.color = ''
            return
          }
          if (featureV3) {
            message.innerHTML =
              '<div class="card text-center ' +
              (isError ? 'text-danger' : '') +
              '">' +
              text +
              '</div>'
            message.style.color = ''
            return
          }
          message.textContent = text || ''
          message.style.color = isError ? '#d00' : '#059669'
        }
        function formatNumber(value) {
          if (fmt && fmt.formatNumber) return fmt.formatNumber(value || 0, lang)
          try {
            return new Intl.NumberFormat(lang).format(value || 0)
          } catch (e) {
            return String(value || 0)
          }
        }

        function formatAccuracy(value) {
          if (fmt && fmt.formatPercent) return fmt.formatPercent(Number(value || 0), lang, 1)
          const percent = Math.round(Number(value || 0) * 1000) / 10
          return percent.toFixed(1) + '%'
        }
        function formatDate(timestamp) {
          if (fmt && fmt.formatDate)
            return fmt.formatDate(timestamp, lang, { year: 'numeric', month: 'short', day: 'numeric' })
          if (!timestamp) return ''
          const d = new Date(timestamp)
          if (!d.getTime()) return ''
          try {
            return new Intl.DateTimeFormat(lang, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(d)
          } catch (e) {
            return d.toISOString()
          }
        }
        const joinedLoading = document.getElementById('joined-loading')
        const joinedEmpty = document.getElementById('joined-empty')
        function toggle(el, show) {
          if (!el) return
          el.style.display = show ? '' : 'none'
        }
        function renderSkeleton() {
          if (!list) return
          list.innerHTML = ''
          toggle(joinedEmpty, false)
          toggle(joinedLoading, true)
          if (featureV3) {
            for (let i = 0; i < 3; i += 1) {
              const skeleton = document.createElement('div')
              skeleton.className = 'card card-skeleton'
              skeleton.style.minHeight = '104px'
              skeleton.setAttribute('role', 'listitem')
              list.appendChild(skeleton)
            }
            return
          }
          list.innerHTML =
            '<p style="padding:16px;text-align:center;opacity:0.6">' +
            window.t('room.loading') +
            '</p>'
        }
        function renderEmpty() {
          if (!list) return
          const ctaLabel = window.t('profile.participations.cta')
          const ctaHref = '/' + lang + '/'
          list.innerHTML = ''
          toggle(joinedLoading, false)
          toggle(joinedEmpty, true)
          if (featureV3) {
            const wrapper = document.createElement('div')
            wrapper.className = 'card stack text-center'
            wrapper.setAttribute('role', 'listitem')
            const text = document.createElement('p')
            text.className = 'p text-muted'
            text.textContent = window.t('profile.participations.empty')
            const link = document.createElement('a')
            link.className = 'btn btn-primary'
            link.href = ctaHref
            link.textContent = ctaLabel
            wrapper.appendChild(text)
            wrapper.appendChild(link)
            list.appendChild(wrapper)
            return
          }
          const legacyWrapper = document.createElement('div')
          legacyWrapper.style.padding = '16px'
          legacyWrapper.style.textAlign = 'center'
          legacyWrapper.style.opacity = '0.6'
          const legacyText = document.createElement('p')
          legacyText.style.marginBottom = '12px'
          legacyText.textContent = window.t('profile.participations.empty')
          const legacyLink = document.createElement('a')
          legacyLink.className = 'btn'
          legacyLink.href = ctaHref
          legacyLink.textContent = ctaLabel
          legacyWrapper.appendChild(legacyText)
          legacyWrapper.appendChild(legacyLink)
          list.appendChild(legacyWrapper)
        }
        async function loadParticipations() {
          if (!list) return
          renderSkeleton()
          try {
            const res = await fetch('/api/scores/rooms?limit=100', { credentials: 'include' })
            if (res.status === 401) {
              showMessage(window.t('profile.notLoggedIn'), true)
              list.innerHTML = ''
              return
            }
            const json = await res.json()
            const items = Array.isArray(json.rooms) ? json.rooms : []
            items.sort(function (a, b) {
              const aTime = new Date(a && a.lastAnsweredAt ? a.lastAnsweredAt : 0).getTime()
              const bTime = new Date(b && b.lastAnsweredAt ? b.lastAnsweredAt : 0).getTime()
              return bTime - aTime
            })
            if (!items.length) {
              renderEmpty()
              return
            }
            showMessage('', false)
            list.innerHTML = ''
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i]
              if (!item) continue
              const card = document.createElement('div')
              card.setAttribute('role', 'listitem')
              card.setAttribute('data-testid', 'room-card')
              if (item && item.roomTitle) {
                card.setAttribute('aria-label', String(item.roomTitle))
              }
              // 使用共用模板生成卡片 HTML（保留原資料來源與事件流程）
              const acc =
                typeof item.accuracy === 'number'
                  ? item.accuracy
                  : typeof item.correctRate === 'number'
                  ? item.correctRate
                  : undefined
              const href = '/' + lang + '/room/' + encodeURIComponent(item.roomId || '')
              card.innerHTML = RoomCardTemplate.roomCardHTML({
                kind: 'joined',
                status: 'public',
                id: item.roomId || '',
                title: item.roomTitle || window.t('questionSets.untitled'),
                updatedAt: item.lastAnsweredAt,
                lastPlayedAt: item.lastAnsweredAt,
                answered: item.totalAnswered,
                accuracy: acc,
                href: href,
                lang: lang
              })
              list.appendChild(card)
            }
          } catch (e) {
            console.error('[rooms/joined] load failed', e)
            showMessage(window.t('errors.networkError'), true)
          }
        }
        await loadParticipations()
        if (list) {
          list.addEventListener('click', function (event) {
            const link = event.target && event.target.closest('[data-action="replay"]')
            if (!link) return
            const href = link.getAttribute('href')
            if (!href) return
            event.preventDefault()
            link.setAttribute('aria-busy', 'true')
            fetch(href, { method: 'HEAD', credentials: 'include', redirect: 'manual' })
              .then(function (res) {
                if (res.ok || (res.status >= 300 && res.status < 400)) {
                  window.location.href = href
                  return
                }
                showMessage(window.t('errors.networkError'), true)
                link.removeAttribute('aria-busy')
              })
              .catch(function (error) {
                console.error('[rooms/joined] replay failed', error)
                showMessage(window.t('errors.networkError'), true)
                link.removeAttribute('aria-busy')
              })
          })
        }
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), addAttribute("true" , "data-feature-v3"), serverT("a11y.skipToContent"), renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT }), addAttribute(["container", "stack-lg" ], "class:list"), addAttribute(serverT("common.breadcrumbs"), "aria-label"), addAttribute(`/${lang}/profile`, "href"), addAttribute(serverT("profile.title"), "aria-label"), serverT("profile.title"), title, title, renderComponent($$result, "LoadingState", $$LoadingState, { "id": "joined-loading", "lang": lang, "serverT": serverT, "titleKey": "common.loading" }), renderComponent($$result, "EmptyState", $$EmptyState, { "id": "joined-empty", "lang": lang, "serverT": serverT, "titleKey": "common.empty.joined.title", "descKey": "common.empty.joined.desc", "actionHref": `/${lang}/`, "actionKey": "common.empty.joined.action" }), addAttribute("stack" , "class"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/rooms/joined.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/rooms/joined.astro";
const $$url = "/[lang]/rooms/joined";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Joined,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
