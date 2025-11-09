import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, ah as renderHead, p as renderComponent } from '../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../chunks/server-i18n_BKH6atwt.mjs';
import { $ as $$SeoMeta } from '../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$MyParticipations = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyParticipations;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("profile.sections.participations");
  const desc = serverT("profile.desc");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", '</head> <body> <a href="#main" class="sr-only">', '</a> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <label for="lang-switch" class="sr-only">', '</label> <select id="lang-switch" class="tab" style="font-size:0.85rem"> <option value="en"', ">", '</option> <option value="zh-hant"', ">", '</option> <option value="zh-hans"', ">", '</option> <option value="ja"', ">", '</option> <option value="ko"', ">", '</option> <option value="de"', ">", '</option> <option value="fr"', ">", '</option> </select> </nav> </div> </header> <main id="main" class="container" style="display:grid;gap:16px;padding-top:24px;padding-bottom:48px"> <h1 class="h1" style="margin:0">', `</h1> <div id="message" style="min-height:1.1em;font-size:0.9rem"></div> <div id="list" style="display:grid;gap:12px"></div> </main> <script type="module" src="/js/i18n.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'

        const message = document.getElementById('message')
        const list = document.getElementById('list')
        const langSwitch = document.getElementById('lang-switch')

        function showMessage(text, isError) {
          if (!message) return
          if (!text) {
            message.textContent = ''
            return
          }
          message.textContent = text
          message.style.color = isError ? '#d00' : '#059669'
        }

        function computeRedirectPath(targetLang) {
          const url = new URL(window.location.href)
          const segments = url.pathname.split('/').filter(Boolean)
          if (segments.length === 0) {
            segments.push(targetLang)
          } else {
            segments[0] = targetLang
          }
          return '/' + segments.join('/') + url.search + url.hash
        }

        if (langSwitch) {
          langSwitch.addEventListener('change', function() {
            const target = langSwitch.value || lang
            window.location.href = computeRedirectPath(target)
          })
        }

        async function loadParticipations() {
          if (!list) return
          list.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('room.loading') + '</p>'
          try {
            const res = await fetch('/api/scores/rooms?limit=100', { credentials: 'include' })
            if (res.status === 401) {
              showMessage(window.t('profile.notLoggedIn'), true)
              list.innerHTML = ''
              return
            }
            const json = await res.json()
            const items = Array.isArray(json.rooms) ? json.rooms : []
            if (!items.length) {
              list.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('profile.participations.empty') + '</p>'
              return
            }
            list.innerHTML = ''
            for (let i = 0; i < items.length; i += 1) {
              const item = items[i]
              const card = document.createElement('div')
              card.className = 'card'
              card.style.padding = '16px'
              card.style.display = 'grid'
              card.style.gap = '6px'
              const title = document.createElement('div')
              title.style.fontWeight = '700'
              title.textContent = (item && item.roomTitle) || window.t('questionSets.untitled')
              card.appendChild(title)
              const meta = document.createElement('div')
              meta.style.fontSize = '0.9rem'
              meta.style.opacity = '0.75'
              const total = document.createElement('span')
              total.textContent = window.t('profile.participations.total').replace('{value}', String(item.totalAnswered || 0))
              meta.appendChild(total)
              const sep = document.createElement('span')
              sep.textContent = ' · '
              meta.appendChild(sep)
              const accuracySpan = document.createElement('span')
              const accuracyValue = item.totalAnswered > 0 ? Math.round((item.accuracy || 0) * 1000) / 10 : 0
              accuracySpan.textContent = window.t('profile.participations.accuracy').replace('{value}', accuracyValue.toFixed(1) + '%')
              meta.appendChild(accuracySpan)
              card.appendChild(meta)
              const actions = document.createElement('div')
              actions.style.display = 'flex'
              actions.style.gap = '8px'
              actions.style.flexWrap = 'wrap'
              const replay = document.createElement('a')
              replay.className = 'btn'
              replay.style.fontSize = '0.85rem'
              replay.href = '/' + lang + '/room/' + encodeURIComponent(item.roomId)
              replay.textContent = window.t('profile.history.playAgain')
              actions.appendChild(replay)
              card.appendChild(actions)
              list.appendChild(card)
            }
          } catch (e) {
            console.error('[my-participations] load failed', e)
            showMessage(window.t('errors.networkError'), true)
          }
        }

        await loadParticipations()
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), serverT("a11y.skipToContent"), addAttribute(`/${lang}/`, "href"), serverT("nav.home"), serverT("languages.label"), addAttribute(lang === "en", "selected"), serverT("languages.en"), addAttribute(lang === "zh-hant", "selected"), serverT("languages.zhHant"), addAttribute(lang === "zh-hans", "selected"), serverT("languages.zhHans"), addAttribute(lang === "ja", "selected"), serverT("languages.ja"), addAttribute(lang === "ko", "selected"), serverT("languages.ko"), addAttribute(lang === "de", "selected"), serverT("languages.de"), addAttribute(lang === "fr", "selected"), serverT("languages.fr"), title);
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/my-participations.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/my-participations.astro";
const $$url = "/[lang]/my-participations";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MyParticipations,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
