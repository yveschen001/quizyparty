import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, ah as renderHead } from '../../chunks/astro/server_BigfXiJV.mjs';
import 'clsx';
import { s as setupServerI18n } from '../../chunks/server-i18n_BKH6atwt.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$MyRooms = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MyRooms;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("myRooms.title");
  const desc = serverT("profile.desc");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>', '</title><meta name="description"', '><link rel="canonical"', ">", '</head> <body> <a href="#main" class="sr-only">', '</a> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">▼</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> </header> <main id="main" class="container" style="padding-top:32px;padding-bottom:64px"> <section style="display:grid;gap:16px"> <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"> <div> <h1 style="margin:0">', '</h1> <p style="margin:4px 0 0;font-size:0.95rem;opacity:0.7">', '</p> </div> <a id="myrooms-create-btn" class="btn btn-primary"', ' style="font-size:0.9rem">', '</a> </div> <div role="tablist"', ' style="display:flex;gap:8px;flex-wrap:wrap"> <button class="btn btn-primary" data-status="published" type="button" aria-pressed="true">', '</button> <button class="btn" data-status="draft" type="button" aria-pressed="false">', `</button> </div> <div id="myrooms-message" style="min-height:1.2em;font-size:0.9rem"></div> <div id="myrooms-list" style="display:grid;gap:12px"></div> <div id="myrooms-pagination" style="display:none;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:12px"></div> </section> </main> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      ;(async function () {
        await import('/js/i18n.js')
        const { setupUserMenu } = await import('/js/user-menu.js')
        const { setupRoomsManager } = await import('/js/rooms-manager.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
        const listEl = document.getElementById('myrooms-list')
        const paginationEl = document.getElementById('myrooms-pagination')
        const messageEl = document.getElementById('myrooms-message')
        const tabButtons = Array.prototype.slice.call(document.querySelectorAll('[data-status]'))

        function showMessage(text, isError) {
          if (!messageEl) return
          if (!text) {
            messageEl.textContent = ''
            return
          }
          messageEl.textContent = text
          messageEl.style.color = isError ? '#d00' : '#059669'
        }

        const userMenu = setupUserMenu({
          lang: lang,
          t: function (key) {
            return window.t(key)
          },
          profileUrl: function (targetLang) {
            return '/' + targetLang + '/profile'
          },
          joinedUrl: function (targetLang) {
            return '/' + targetLang + '/rooms/joined'
          },
          aboutUrl: function (targetLang) {
            return '/' + targetLang + '/about'
          },
          privacyUrl: function (targetLang) {
            return '/' + targetLang + '/legal/privacy'
          },
          termsUrl: function (targetLang) {
            return '/' + targetLang + '/legal/terms'
          },
          onLogout: async function () {
            try {
              await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
            } catch (e) {
              console.error('Logout failed', e)
            }
            window.location.reload()
          },
        })

        async function checkAuth() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (!res.ok) {
              if (authBtn) authBtn.style.display = 'block'
              if (userInfo) userInfo.style.display = 'none'
              if (userMenu && typeof userMenu.clearUser === 'function') {
                userMenu.clearUser()
              }
              listEl.innerHTML =
                '<p style="padding:16px;text-align:center;opacity:0.6">' +
                window.t('profile.notLoggedIn') +
                '</p>'
              return null
            }
            const json = await res.json()
            if (json && json.authenticated && json.user) {
              if (authBtn) authBtn.style.display = 'none'
              if (userInfo) userInfo.style.display = 'flex'
              if (userMenu && typeof userMenu.applyUser === 'function') {
                userMenu.applyUser(json.user)
              }
              return json.user
            }
            listEl.innerHTML =
              '<p style="padding:16px;text-align:center;opacity:0.6">' +
              window.t('profile.notLoggedIn') +
              '</p>'
            return null
          } catch (e) {
            console.error('[my-rooms] auth check failed', e)
            listEl.innerHTML =
              '<p style="padding:16px;text-align:center;color:#d00">' +
              window.t('errors.networkError') +
              '</p>'
            return null
          }
        }

        if (authBtn) {
          authBtn.addEventListener('click', function () {
            window.location.href =
              '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
          })
        }

        const user = await checkAuth()
        if (!user) {
          return
        }

        const tabs = tabButtons.map(function (button) {
          return { status: button.getAttribute('data-status') || 'published', button: button }
        })

        const manager = setupRoomsManager({
          listEl: listEl,
          paginationEl: paginationEl,
          tabs: tabs,
          lang: lang,
          t: function (key) {
            return window.t(key)
          },
          pageSize: 10,
          onNotify: function (text, isError) {
            showMessage(text, isError)
          },
          emptyText: window.t('myRooms.empty'),
        })

        window.addEventListener('storage', function (event) {
          if (
            event.key === 'qp_home_refresh' &&
            event.newValue &&
            manager &&
            typeof manager.refresh === 'function'
          ) {
            manager.refresh()
          }
        })
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), title, addAttribute(desc, "content"), addAttribute(`${siteOrigin}${path}`, "href"), renderHead(), serverT("a11y.skipToContent"), addAttribute(`/${lang}/`, "href"), serverT("nav.home"), serverT("auth.login"), title, serverT("profile.desc"), addAttribute(`/${lang}/create-room`, "href"), serverT("myRooms.create"), addAttribute(serverT("myRooms.title"), "aria-label"), serverT("myRooms.published"), serverT("myRooms.drafts"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/my-rooms.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/my-rooms.astro";
const $$url = "/[lang]/my-rooms";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$MyRooms,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
