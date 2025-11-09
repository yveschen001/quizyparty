import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead } from './astro/server_BigfXiJV.mjs';
import 'clsx';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const $$AppHeader = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$AppHeader;
  const { lang, serverT } = Astro2.props;
  return renderTemplate(_a || (_a = __template(["", '<header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button"', ` aria-haspopup="menu" aria-expanded="false" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">\u25BC</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> <script type="module">
    ;(async function () {
      await import('/js/i18n.js')
      const { setupUserMenu } = await import('/js/user-menu.js')
      const lang = document.documentElement.getAttribute('lang') || 'en'
      const authBtn = document.getElementById('auth-btn')
      const userInfo = document.getElementById('user-info')
      const userMenu = setupUserMenu({
        lang,
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
      async function initUser() {
        try {
          const res = await fetch('/api/auth/me', { credentials: 'include' })
          if (!res.ok) throw new Error('unauth')
          const json = await res.json()
          if (json && json.authenticated && json.user) {
            if (authBtn) authBtn.style.display = 'none'
            if (userInfo) userInfo.style.display = 'flex'
            if (userMenu && typeof userMenu.applyUser === 'function') userMenu.applyUser(json.user)
            return
          }
        } catch (e) {}
        if (authBtn) authBtn.style.display = 'block'
        if (userInfo) userInfo.style.display = 'none'
        if (userMenu && typeof userMenu.clearUser === 'function') userMenu.clearUser()
      }
      if (authBtn) {
        authBtn.addEventListener('click', function () {
          window.location.href =
            '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
        })
      }
      await initUser()
    })()
  <\/script> </header>`])), maybeRenderHead(), addAttribute(`/${lang}/`, "href"), serverT("nav.home"), serverT("auth.login"), addAttribute(serverT("nav.menu.profile"), "aria-label"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/layout/AppHeader.astro", void 0);

export { $$AppHeader as $ };
