import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, m as maybeRenderHead, p as renderComponent, ah as renderHead } from '../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../chunks/server-i18n_B2pBwWF0.mjs';
import { $ as $$SeoMeta } from '../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                    */
import { $ as $$AppHeader } from '../../chunks/AppHeader_Ceo4wj6R.mjs';
import 'clsx';
/* empty css                                          */
export { renderers } from '../../renderers.mjs';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$1 = createAstro("https://quizyparty.com");
const $$RoomFooterCTA = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$RoomFooterCTA;
  const { lang, serverT } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(["", '<section aria-labelledby="create-room-cta" style="margin-top:24px;display:grid;gap:16px"> <h2 id="create-room-cta" class="h2" style="margin:0">', '</h2> <div class="grid" style="display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(240px,1fr))"> <article class="card" style="display:grid;gap:8px"> <h3 class="h3" style="margin:0">', '</h3> <p class="p" style="margin:0;opacity:0.85">', "</p> <div><a", ' class="btn btn-primary">', '</a></div> </article> <article class="card" style="display:grid;gap:8px"> <h3 class="h3" style="margin:0">', '</h3> <p class="p" style="margin:0;opacity:0.85">', '</p> <div><button id="cta-browse-library" type="button" class="btn btn-primary">', '</button></div> </article> <article class="card" style="display:grid;gap:8px"> <h3 class="h3" style="margin:0">', '</h3> <ul class="p" style="margin:0 0 0 18px;opacity:0.9;display:grid;gap:6px;list-style:disc"> <li>', "</li> <li>", "</li> <li>", `</li> </ul> </article> </div> <script type="module">
    const trigger = document.getElementById('cta-browse-library')
    if (trigger) {
      trigger.addEventListener('click', function(){
        const btn = document.querySelector('[data-browse-library]')
        if (btn && typeof (btn as HTMLButtonElement).click === 'function') {
          ;(btn as HTMLButtonElement).click()
        }
      })
    }
  <\/script> </section>`])), maybeRenderHead(), serverT("createRoom.cta.title"), serverT("createRoom.cta.manage.title"), serverT("createRoom.cta.manage.desc"), addAttribute(`/${lang}/rooms/created`, "href"), serverT("createRoom.cta.manage.action"), serverT("createRoom.cta.import.title"), serverT("createRoom.cta.import.desc"), serverT("createRoom.cta.import.action"), serverT("createRoom.cta.afterPublish.title"), serverT("createRoom.cta.afterPublish.point1"), serverT("createRoom.cta.afterPublish.point2"), serverT("createRoom.cta.afterPublish.point3"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/components/create/RoomFooterCTA.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$CreateRoom = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CreateRoom;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("home.actions.createRoom");
  const desc = serverT("home.actions.createRoom");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", ' data-astro-cid-mcc5vagp> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body data-astro-cid-mcc5vagp> ", ' <main class="container hero" data-astro-cid-mcc5vagp> <h1 class="h1" data-astro-cid-mcc5vagp>', '</h1> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <input id="room-title" type="text"', ' style="padding:12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <p style="margin:0;font-size:0.8rem;opacity:0.6" id="room-name-hint" data-astro-cid-mcc5vagp></p> </div> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <div id="count-options" style="display:flex;gap:8px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <button type="button" class="count-btn active" data-role="count-btn" data-count="10" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#6366f1;color:#fff;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>10</button> <button type="button" class="count-btn" data-role="count-btn" data-count="20" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>20</button> <button type="button" class="count-btn" data-role="count-btn" data-count="30" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>30</button> <button type="button" class="count-btn" data-role="count-btn" data-count="40" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>40</button> <button type="button" class="count-btn" data-role="count-btn" data-count="50" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>50</button> <button type="button" class="count-btn" data-role="count-btn" data-count="60" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>60</button> </div> <p id="count-hint" style="margin:0;font-size:0.8rem;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> <div id="vip-benefits" style="display:none;margin-top:4px;padding:12px;border-radius:12px;background:rgba(124,58,237,0.08);color:#4c1d95;font-size:0.85rem;line-height:1.5" data-astro-cid-mcc5vagp> ', ' </div> </div> <div id="global-msg" style="min-height:1.1em;font-size:0.9rem" data-astro-cid-mcc5vagp></div> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <span style="font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</span> </div> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label for="ai-prompt" style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <textarea id="ai-prompt"', ' style="width:100%;min-height:120px;padding:12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp></textarea> <p style="margin:0;font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</p> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <label for="ai-lang" style="font-size:0.85rem;font-weight:600" data-astro-cid-mcc5vagp>', '</label> <select id="ai-lang" style="padding:10px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <option value="en" data-astro-cid-mcc5vagp>', '</option> <option value="zh-hant" data-astro-cid-mcc5vagp>', '</option> <option value="zh-hans" data-astro-cid-mcc5vagp>', '</option> <option value="ja" data-astro-cid-mcc5vagp>', '</option> <option value="ko" data-astro-cid-mcc5vagp>', '</option> <option value="de" data-astro-cid-mcc5vagp>', '</option> <option value="fr" data-astro-cid-mcc5vagp>', '</option> </select> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <label for="ai-count" style="font-size:0.85rem;font-weight:600" data-astro-cid-mcc5vagp>', '</label> <select id="ai-count" style="padding:10px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <option value="10" data-astro-cid-mcc5vagp>10</option> <option value="20" data-astro-cid-mcc5vagp>20</option> <option value="30" data-astro-cid-mcc5vagp>30</option> <option value="40" data-astro-cid-mcc5vagp>40</option> <option value="50" data-astro-cid-mcc5vagp>50</option> <option value="60" data-astro-cid-mcc5vagp>60</option> </select> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <span id="ai-limit-generate" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> <span id="ai-limit-improve" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <button id="ai-generate-btn" class="btn btn-primary" type="button" data-astro-cid-mcc5vagp>', '</button> <button id="ai-improve-btn" class="btn" type="button" data-astro-cid-mcc5vagp>', '</button> </div> <p id="ai-status" style="min-height:1.1em;font-size:0.9rem;margin:0" data-astro-cid-mcc5vagp></p> <p id="ai-improve-status" style="min-height:1.1em;font-size:0.9rem;margin:0" data-astro-cid-mcc5vagp></p> <p style="margin:0;font-size:0.8rem;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <span style="font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</span> </div> <div id="question-grid" style="display:grid;gap:16px" data-astro-cid-mcc5vagp></div> <div style="display:flex;justify-content:flex-end" data-astro-cid-mcc5vagp> <button id="open-library" type="button" class="btn" data-browse-library data-astro-cid-mcc5vagp>', '</button> </div> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:32px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <button id="save-draft-btn" class="btn" data-astro-cid-mcc5vagp>', '</button> <button id="publish-btn" class="btn btn-primary" data-astro-cid-mcc5vagp>', '</button> </div> <div id="save-status" style="min-height:1.1em;font-size:0.9rem" data-astro-cid-mcc5vagp></div> </section> ', ' </main> <div id="toast-root" style="position:fixed;top:24px;right:24px;display:grid;gap:12px;z-index:70" data-astro-cid-mcc5vagp></div> <div id="auth-blocker" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:24px" data-astro-cid-mcc5vagp> <div style="max-width:360px;width:100%;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;text-align:center;box-shadow:0 24px 60px rgba(15,23,42,0.28)" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.25rem" data-astro-cid-mcc5vagp>', '</h2> <p style="margin:0;font-size:0.95rem;color:#4b5563" data-astro-cid-mcc5vagp>', '</p> <button id="auth-blocker-btn" class="btn btn-primary" style="justify-content:center" data-astro-cid-mcc5vagp>', '</button> </div> </div> <div id="library-panel" style="display:none;position:fixed;inset:0;z-index:30;background:rgba(15,23,42,0.35);padding:24px;overflow:auto" data-astro-cid-mcc5vagp> <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;box-shadow:0 24px 60px rgba(15,23,42,0.18)" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <div data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <p style="margin:4px 0 0;font-size:0.8rem;opacity:0.7" data-astro-cid-mcc5vagp>', '</p> </div> <button id="close-library" type="button" class="btn" data-astro-cid-mcc5vagp>', '</button> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <input id="library-search" type="search"', ' style="flex:1;min-width:180px;padding:9px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <button id="library-refresh" type="button" class="btn" data-astro-cid-mcc5vagp>', '</button> </div> <div id="library-list" style="display:grid;gap:12px;max-height:420px;overflow:auto" data-astro-cid-mcc5vagp> <p style="padding:16px;text-align:center;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> </div> <div style="display:flex;justify-content:space-between;align-items:center;gap:16px" data-astro-cid-mcc5vagp> <span id="library-status" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> <button id="library-load-more" type="button" class="btn" data-astro-cid-mcc5vagp>', `</button> </div> </div> </div> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'

        const langSwitch = document.getElementById('lang-switch')
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

        const roomTitleInput = document.getElementById('room-title')
        const countButtons = Array.prototype.slice.call(document.querySelectorAll('[data-role="count-btn"]'))
        const questionGrid = document.getElementById('question-grid')
        const countHintEl = document.getElementById('count-hint')
        const saveDraftBtn = document.getElementById('save-draft-btn')
        const publishBtn = document.getElementById('publish-btn')
        const saveStatus = document.getElementById('save-status')
        const globalMsg = document.getElementById('global-msg')
        const openLibraryBtn = document.getElementById('open-library')
        const libraryPanel = document.getElementById('library-panel')
        const libraryList = document.getElementById('library-list')
        const librarySearch = document.getElementById('library-search')
        const libraryLoadMore = document.getElementById('library-load-more')
        const libraryStatus = document.getElementById('library-status')
        const libraryRefresh = document.getElementById('library-refresh')
        const closeLibraryBtn = document.getElementById('close-library')
        const templatesList = document.getElementById('templates-list')
        const templatesPagination = document.getElementById('templates-pagination')
        const tabButtonsNodeList = document.querySelectorAll('.tab-btn')
        const tabButtons = Array.prototype.slice.call(tabButtonsNodeList)
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
        // AppHeader 已處理 UserMenu 初始化
        const authBlocker = document.getElementById('auth-blocker')
        const authBlockerBtn = document.getElementById('auth-blocker-btn')
        const vipBenefitBox = document.getElementById('vip-benefits')
        const aiPromptInput = document.getElementById('ai-prompt')
        const aiLangSelect = document.getElementById('ai-lang')
        const aiCountSelect = document.getElementById('ai-count')
        const aiGenerateBtn = document.getElementById('ai-generate-btn')
        const aiStatus = document.getElementById('ai-status')
        const aiLimitGenerateEl = document.getElementById('ai-limit-generate')
        const aiLimitImproveEl = document.getElementById('ai-limit-improve')
        const aiImproveBtn = document.getElementById('ai-improve-btn')
        const aiImproveStatus = document.getElementById('ai-improve-status')
        const toastRoot = document.getElementById('toast-root')

        const urlParams = new URLSearchParams(window.location.search)
        const presetSetId = urlParams.get('setId')
        const presetTemplateId = urlParams.get('templateId')

        const allowedCounts = [10, 20, 30, 40, 50, 60]
        const vipRequiredCounts = [30, 40, 50, 60]
        const defaultCount = 10
        const defaultCountHint = window.t('createRoom.builder.countHint')
        const vipEntitlementKey = 'vip'
        const NON_VIP_MAX_GENERATE_COUNT = 20
        const VIP_MAX_GENERATE_COUNT = 60
        const PROMPT_BLOCKLIST = ['bomb', 'missile', 'weapon', 'nuke', '炸彈', '炸弹', '爆炸', '導彈', '导弹', '武器', 'terror', 'attack']

        let expectedCount = defaultCount
        let slots = []
        let currentUser = null
        let autoSaveTimer = null
        let autoSaveInFlight = false
        let activeSlotIndex = null
        let currentStatus = 'published'
        let vipNoticeActive = false
        let hasVipAccess = false
        let entitlementsLoaded = false
        let aiGenerating = false
        let aiImproving = false
        let templatesLimit = 10
        let templatesOffset = 0
        let templatesPaginationBound = false
        const aiLimits = {
          generate: { remaining: 0, max: 0 },
          improve: { remaining: 0, max: 0 },
        }
        const aiLoadingMessages = new Set([window.t('createRoom.ai.generating'), window.t('createRoom.ai.optimizing')])

        if (aiLangSelect) {
          const supportedLangs = ['en', 'zh-hant', 'zh-hans', 'ja', 'ko', 'de', 'fr']
          if (supportedLangs.indexOf(lang) >= 0) {
            aiLangSelect.value = lang
          } else {
            aiLangSelect.value = 'en'
          }
        }

        const state = {
          questionSetId: presetSetId || null,
          templateId: presetTemplateId || null,
        }

        const libraryState = {
          items: [],
          offset: 0,
          hasMore: false,
          loading: false,
          search: '',
        }

        function updateTemplateTabs() {
          tabButtons.forEach(function(btn) {
            if (btn.getAttribute('data-status') === currentStatus) {
              btn.classList.add('active')
              btn.style.background = '#6366f1'
              btn.style.color = '#fff'
            } else {
              btn.classList.remove('active')
              btn.style.background = 'transparent'
              btn.style.color = '#111827'
            }
          })
        }

        function setupTemplatesPagination() {
          if (templatesPaginationBound) return
          if (!templatesPagination) return
          templatesPaginationBound = true
          templatesPagination.addEventListener('click', function(event) {
            const button = event.target && event.target.closest('[data-action]')
            if (!button) return
            const action = button.getAttribute('data-action')
            const totalAttr = templatesPagination.getAttribute('data-total') || '0'
            const limitAttr = templatesPagination.getAttribute('data-limit') || String(templatesLimit)
            const offsetAttr = templatesPagination.getAttribute('data-offset') || '0'
            const total = Number(totalAttr)
            const limit = Number(limitAttr)
            const offset = Number(offsetAttr)
            if (!window.RoomTemplates || !window.RoomTemplates.getPagination) return
            const info = window.RoomTemplates.getPagination(total, limit, offset)
            if (action === 'prev' && info.hasPrev) {
              loadTemplates(currentStatus, info.prevOffset)
            }
            if (action === 'next' && info.hasNext) {
              loadTemplates(currentStatus, info.nextOffset)
            }
          })
        }

        function updateTemplatesPagination(total, limit, offset) {
          if (!templatesPagination) return
          if (!window.RoomTemplates || !window.RoomTemplates.getPagination) {
            templatesPagination.style.display = 'none'
            templatesPagination.innerHTML = ''
            return
          }
          const info = window.RoomTemplates.getPagination(total, limit, offset)
          if (!info || info.totalPages <= 1) {
            templatesPagination.style.display = 'none'
            templatesPagination.innerHTML = ''
            templatesPagination.removeAttribute('data-total')
            templatesPagination.removeAttribute('data-limit')
            templatesPagination.removeAttribute('data-offset')
            return
          }
          templatesPagination.style.display = 'flex'
          templatesPagination.setAttribute('data-total', String(info.total))
          templatesPagination.setAttribute('data-limit', String(info.limit))
          templatesPagination.setAttribute('data-offset', String(info.offset))
          templatesPagination.innerHTML = window.RoomTemplates.buildPagination(info, window.t)
        }

        function createEmptySlot() {
          return {
            question: '',
            choices: ['', '', '', ''],
            correctIndex: 0,
            keywords: '',
            savedId: null,
            message: '',
            messageError: false,
          }
        }

        function ensureChoiceSize(slot) {
          while (slot.choices.length < 4) slot.choices.push('')
          if (slot.choices.length > 4) slot.choices = slot.choices.slice(0, 4)
        }

        function escapeHtml(value) {
          return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function showGlobalMessage(text, isError) {
          if (!globalMsg) return
          globalMsg.textContent = text || ''
          globalMsg.style.color = isError ? '#d00' : '#059669'
          if (text) {
            showToast(text, isError ? 'error' : 'success')
          }
        }

        function showSaveStatus(text, isError) {
          if (!saveStatus) return
          saveStatus.textContent = text || ''
          saveStatus.style.color = isError ? '#d00' : '#059669'
        }

        function showToast(text, type) {
          if (!toastRoot) return
          if (!text) return
          const toast = document.createElement('div')
          toast.textContent = text
          toast.style.padding = '12px 16px'
          toast.style.borderRadius = '12px'
          toast.style.boxShadow = '0 12px 32px rgba(15,23,42,0.18)'
          toast.style.fontSize = '0.9rem'
          toast.style.color = type === 'error' ? '#7f1d1d' : '#065f46'
          toast.style.background = type === 'error' ? '#fee2e2' : '#ecfdf5'
          toast.style.border = type === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0'
          toastRoot.appendChild(toast)
          window.setTimeout(function() {
            toast.style.opacity = '0'
            toast.style.transition = 'opacity 200ms ease'
            window.setTimeout(function() {
              if (toast.parentNode === toastRoot) {
                toastRoot.removeChild(toast)
              }
            }, 240)
          }, 4200)
        }

        function markHomeNeedsRefresh() {
          try {
            window.localStorage.setItem('qp_home_refresh', String(Date.now()))
          } catch (e) {
            console.warn('Failed to set home refresh flag', e)
          }
        }

        async function ensureLiveRoom(questionSetId, templateId) {
          const targetSetId = questionSetId || state.questionSetId
          if (!targetSetId) return false
          const roomId = templateId || targetSetId
          try {
            const res = await fetch('/api/rooms', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                lang,
                questionSetId: targetSetId,
                roomId,
                replaceExisting: true,
              }),
            })
            if (!res.ok) {
              const errorText = await res.text().catch(function() { return '' })
              console.warn('ensureLiveRoom failed', res.status, errorText)
              return false
            }
            return true
          } catch (e) {
            console.error('ensureLiveRoom exception', e)
            return false
          }
        }

        async function removeLiveRoom(roomId) {
          if (!roomId) return false
          try {
            const res = await fetch('/api/rooms/' + roomId, {
              method: 'DELETE',
              credentials: 'include',
            })
            if (!res.ok && res.status !== 404) {
              const errorText = await res.text().catch(function() { return '' })
              console.warn('removeLiveRoom failed', res.status, errorText)
              return false
            }
            return true
          } catch (e) {
            console.error('removeLiveRoom exception', e)
            return false
          }
        }

        function renderStatus(node, text, isError) {
          if (!node) return
          node.style.color = isError ? '#b91c1c' : '#059669'
          if (!text) {
            node.textContent = ''
            node.innerHTML = ''
            return
          }
          if (!isError && aiLoadingMessages.has(text)) {
            node.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;"><span class="qp-spinner" aria-hidden="true"></span><span>' + text + '</span></span>'
          } else {
            node.innerHTML = ''
            node.textContent = text
          }
        }

        function setAiStatus(text, isError) {
          renderStatus(aiStatus, text, isError)
        }

        function setAiImproveStatus(text, isError) {
          renderStatus(aiImproveStatus, text, isError)
        }

        function renderAiLimits() {
          if (aiLimitGenerateEl) {
            const remaining = typeof aiLimits.generate.remaining === 'number' ? aiLimits.generate.remaining : 0
            const max = typeof aiLimits.generate.max === 'number' ? aiLimits.generate.max : 0
            aiLimitGenerateEl.textContent = window.t('createRoom.ai.generateQuota').replace('{remaining}', String(remaining)).replace('{max}', String(max))
          }
          if (aiLimitImproveEl) {
            const remaining = typeof aiLimits.improve.remaining === 'number' ? aiLimits.improve.remaining : 0
            const max = typeof aiLimits.improve.max === 'number' ? aiLimits.improve.max : 0
            aiLimitImproveEl.textContent = window.t('createRoom.ai.optimizeQuota').replace('{remaining}', String(remaining)).replace('{max}', String(max))
          }
        }

        function applyAiLimitsSnapshot(snapshot) {
          if (!snapshot) return
          if (snapshot.generate) {
            aiLimits.generate.remaining = snapshot.generate.remaining
            aiLimits.generate.max = snapshot.generate.max
          }
          if (snapshot.improve) {
            aiLimits.improve.remaining = snapshot.improve.remaining
            aiLimits.improve.max = snapshot.improve.max
          }
          renderAiLimits()
        }

        function getBlankSlotIndexes() {
          const indexes = []
          for (let i = 0; i < slots.length; i += 1) {
            const slot = slots[i]
            if (!slot) continue
            const hasText = (slot.question || '').trim().length > 0
            const hasSaved = typeof slot.savedId === 'string' && slot.savedId.length > 0
            if (!hasText && !hasSaved) {
              indexes.push(i)
            }
          }
          return indexes
        }

        function updateAiCountOptions() {
          if (!aiCountSelect) return
          const options = aiCountSelect.querySelectorAll('option')
          options.forEach(function(option) {
            const value = Number(option.value || '0')
            if (!hasVipAccess && value > NON_VIP_MAX_GENERATE_COUNT) {
              option.disabled = true
            } else {
              option.disabled = false
            }
          })
          if (!hasVipAccess) {
            const currentValue = Number(aiCountSelect.value || '0')
            if (currentValue > NON_VIP_MAX_GENERATE_COUNT) {
              aiCountSelect.value = String(NON_VIP_MAX_GENERATE_COUNT)
            }
          }
        }

        function setCountHint(count) {
          if (!countHintEl) return
          if (vipRequiredCounts.indexOf(count) >= 0) {
            countHintEl.textContent = window.t('createRoom.builder.vipHint')
            countHintEl.style.color = '#7c3aed'
          } else {
            countHintEl.textContent = defaultCountHint
            countHintEl.style.color = ''
          }
        }

        function updateVipUI() {
          countButtons.forEach(function(btn) {
            const value = Number(btn.getAttribute('data-count') || '0')
            const locked = vipRequiredCounts.indexOf(value) >= 0 && !hasVipAccess
            if (locked) {
              btn.setAttribute('data-locked', 'true')
              btn.style.opacity = '0.6'
              btn.style.cursor = 'not-allowed'
              btn.setAttribute('title', window.t('createRoom.builder.vipLocked'))
            } else {
              btn.removeAttribute('data-locked')
              btn.style.opacity = ''
              btn.style.cursor = 'pointer'
              btn.removeAttribute('title')
            }
          })
          if (vipBenefitBox) {
            const shouldShow = entitlementsLoaded && !hasVipAccess && vipRequiredCounts.indexOf(expectedCount) >= 0
            vipBenefitBox.style.display = shouldShow ? 'block' : 'none'
          }
          updateAiCountOptions()
        }

        function handleVipBlocked() {
          if (!vipNoticeActive) {
            vipNoticeActive = true
            showGlobalMessage(window.t('createRoom.builder.vipLocked'), true)
          }
          if (vipBenefitBox) {
            vipBenefitBox.style.display = 'block'
          }
        }

        function ensureVipAccess(count) {
          if (vipRequiredCounts.indexOf(count) >= 0 && !hasVipAccess) {
            handleVipBlocked()
            return false
          }
          return true
        }

        async function loadEntitlements() {
          if (!currentUser) {
            hasVipAccess = false
            entitlementsLoaded = true
            updateVipUI()
            updateAiCountOptions()
            return
          }
          try {
            const res = await fetch('/api/rc/customer', { credentials: 'include' })
            if (res.ok) {
              const json = await res.json()
              const active = Array.isArray(json && json.active) ? json.active.map(function(item) { return String(item) }) : []
              hasVipAccess = active.indexOf(vipEntitlementKey) >= 0
            } else {
              hasVipAccess = false
            }
          } catch (e) {
            console.error('Failed to load entitlements', e)
            hasVipAccess = false
          } finally {
            entitlementsLoaded = true
            updateVipUI()
            updateAiCountOptions()
          }
        }

        async function fetchAiLimits() {
          try {
            const res = await fetch('/api/questions/limits', { credentials: 'include' })
            if (!res.ok) return
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
          } catch (e) {
            console.error('Failed to fetch AI limits', e)
          }
        }

        function renderCountButtons() {
          countButtons.forEach(function(btn) {
            const value = Number(btn.getAttribute('data-count') || '0')
            if (value === expectedCount) {
              btn.classList.add('active')
              btn.style.background = '#6366f1'
              btn.style.color = '#fff'
            } else {
              btn.classList.remove('active')
              btn.style.background = '#f3f4f6'
              btn.style.color = '#111827'
            }
          })
          setCountHint(expectedCount)
          updateVipUI()
          if (aiCountSelect) {
            aiCountSelect.value = String(expectedCount)
          }
        }

        function slotStatusLabel(slot) {
          if (slot.savedId) return window.t('createRoom.builder.status.saved')
          return window.t('createRoom.builder.status.draft')
        }

        function renderSlots() {
          if (!questionGrid) return
          questionGrid.innerHTML = ''
          slots.forEach(function(slot, index) {
            ensureChoiceSize(slot)
            const card = document.createElement('div')
            card.className = 'question-card'
            card.setAttribute('data-index', String(index))
            card.style.border = '1px solid #e5e7eb'
            card.style.borderRadius = '12px'
            card.style.padding = '16px'
            card.style.display = 'grid'
            card.style.gap = '12px'

            let choicesHtml = ''
            for (let i = 0; i < 4; i += 1) {
              const choiceValue = slot.choices[i] || ''
              const checked = slot.correctIndex === i ? 'checked' : ''
              choicesHtml += (
                '<div style="display:flex;gap:8px;align-items:center">' +
                  '<input type="radio" name="correct-' + index + '" value="' + i + '" data-role="correct" ' + checked + ' />' +
                  '<input type="text" data-role="choice" data-choice-index="' + i + '" value="' + escapeHtml(choiceValue) + '" placeholder="' + window.t('questions.form.choicePlaceholder').replace('{count}', String(i + 1)) + '" style="flex:1;padding:9px;border:1px solid #d1d5db;border-radius:8px" />' +
                '</div>'
              )
            }

            const messageColor = slot.messageError ? '#d00' : '#059669'

            card.innerHTML = (
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
                '<h3 style="margin:0;font-size:1rem">' + window.t('createRoom.builder.questionLabel').replace('{index}', String(index + 1)) + '</h3>' +
                '<span class="status-tag" style="font-size:0.75rem;padding:4px 10px;border-radius:999px;background:' + (slot.savedId ? '#ecfdf5' : '#f3f4f6') + ';color:' + (slot.savedId ? '#047857' : '#4b5563') + '">' + slotStatusLabel(slot) + '</span>' +
              '</div>' +
              '<textarea data-role="question" placeholder="' + window.t('questions.form.questionPlaceholder') + '" style="width:100%;min-height:96px;padding:12px;border:1px solid #d1d5db;border-radius:8px">' + escapeHtml(slot.question) + '</textarea>' +
              '<div class="choices" style="display:grid;gap:8px">' + choicesHtml + '</div>' +
              '<div style="display:grid;gap:8px">' +
                '<label style="font-size:0.85rem;opacity:0.75">' + window.t('questions.form.keywords') + '</label>' +
                '<input data-role="keywords" type="text" value="' + escapeHtml(slot.keywords) + '" placeholder="' + window.t('questions.form.keywordsPlaceholder') + '" style="padding:9px;border:1px solid #d1d5db;border-radius:8px" />' +
              '</div>' +
              '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
                '<button class="btn btn-primary" type="button" data-action="save">' + window.t('createRoom.builder.saveQuestion') + '</button>' +
                '<button class="btn" type="button" data-action="import">' + window.t('createRoom.builder.import') + '</button>' +
                '<button class="btn" type="button" data-action="clear">' + window.t('createRoom.builder.clear') + '</button>' +
              '</div>' +
              '<p data-role="hint" style="min-height:1em;font-size:0.85rem;margin:0;color:' + messageColor + '">' + escapeHtml(slot.message) + '</p>'
            )

            questionGrid.appendChild(card)
          })
        }

        function setSlotMessage(index, text, isError) {
          const card = questionGrid ? questionGrid.querySelector('[data-index="' + index + '"]') : null
          if (!card) return
          const hint = card.querySelector('[data-role="hint"]')
          if (!hint) return
          hint.textContent = text || ''
          hint.style.color = isError ? '#d00' : '#059669'
        }

        function parseKeywords(value) {
          if (!value) return []
          return String(value)
            .split(/[\\s,]+/)
            .map(function(item) { return item.trim() })
            .filter(function(item) { return item.length > 0 })
        }

        function updateSlotFromCard(index, card) {
          const slot = slots[index]
          if (!slot) return
          const questionInput = card.querySelector('[data-role="question"]')
          if (questionInput) {
            slot.question = questionInput.value
          }
          const choiceInputs = card.querySelectorAll('[data-role="choice"]')
          choiceInputs.forEach(function(input) {
            const choiceIndex = Number(input.getAttribute('data-choice-index') || '0')
            slot.choices[choiceIndex] = input.value
          })
          const keywordsInput = card.querySelector('[data-role="keywords"]')
          if (keywordsInput) {
            slot.keywords = keywordsInput.value
          }
        }

        if (questionGrid) {
          questionGrid.addEventListener('input', function(event) {
            const card = event.target && event.target.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return
            updateSlotFromCard(index, card)
            slots[index].message = ''
            slots[index].messageError = false
          })

          questionGrid.addEventListener('change', function(event) {
            const target = event.target
            const card = target && target.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return
            if (target && target.getAttribute('data-role') === 'correct') {
              slots[index].correctIndex = Number(target.value || '0')
            }
          })

          questionGrid.addEventListener('click', function(event) {
            const button = event.target && event.target.closest('[data-action]')
            if (!button) return
            const card = button.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return

            if (button.getAttribute('data-action') === 'save') {
              ensureSlotSaved(index)
            } else if (button.getAttribute('data-action') === 'clear') {
              const slot = slots[index]
              if (slot && slot.savedId) {
                const confirmed = window.confirm(window.t('createRoom.builder.clearConfirm'))
                if (!confirmed) return
              }
            slots[index] = createEmptySlot()
            renderSlots()
            scheduleSetSave()
            } else if (button.getAttribute('data-action') === 'import') {
              activeSlotIndex = index
              toggleLibrary(true)
            }
          })
        }

        function scheduleSetSave() {
          if (autoSaveInFlight) return
          if (autoSaveTimer) window.clearTimeout(autoSaveTimer)
          autoSaveTimer = window.setTimeout(function() {
            saveCurrentQuestionSet('draft', true)
          }, 1200)
        }

        async function ensureSlotSaved(index) {
          const slot = slots[index]
          if (!slot) return false
          const question = (slot.question || '').trim()
          if (!question) {
            slot.message = window.t('createRoom.builder.validationQuestion')
            slot.messageError = true
            setSlotMessage(index, slot.message, true)
            return false
          }
          const rawChoices = slot.choices.map(function(choice) { return String(choice || '').trim() })
          const filteredChoices = rawChoices.filter(function(choice) { return choice.length > 0 })
          if (filteredChoices.length < 2) {
            slot.message = window.t('createRoom.builder.validationChoices')
            slot.messageError = true
            setSlotMessage(index, slot.message, true)
            return false
          }
          const correctChoiceRaw = rawChoices[slot.correctIndex] || filteredChoices[0] || ''
          const correctChoice = filteredChoices.indexOf(correctChoiceRaw) >= 0 ? correctChoiceRaw : filteredChoices[0]
          const payload = {
            question: question,
            choices: filteredChoices,
            correctAnswer: correctChoice,
            lang: lang,
            keywords: parseKeywords(slot.keywords),
            status: 'draft',
          }

          try {
            setSlotMessage(index, window.t('createRoom.builder.savingQuestion'), false)
            let res
            if (slot.savedId) {
              res = await fetch('/api/questions/' + slot.savedId, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (!res.ok) {
                const json = await res.json().catch(function() { return {} })
                throw new Error(json.error || window.t('questions.error'))
              }
            } else {
              res = await fetch('/api/questions/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (!res.ok) {
                const json = await res.json().catch(function() { return {} })
                throw new Error(json.error || window.t('questions.error'))
              }
              const json = await res.json().catch(function() { return {} })
              slot.savedId = json.id
            }
            slot.message = window.t('createRoom.builder.saveSuccessQuestion')
            slot.messageError = false
            setSlotMessage(index, slot.message, false)
            renderSlots()
          scheduleSetSave()
            return true
          } catch (e) {
            const message = e && e.message ? String(e.message) : window.t('questions.error')
            slot.message = message
            slot.messageError = true
            setSlotMessage(index, message, true)
            return false
          }
        }

        async function saveCurrentQuestionSet(status, auto) {
          const savedIds = slots
            .map(function(slot) { return slot.savedId })
            .filter(function(id) { return typeof id === 'string' && id.length > 0 })

          if (status === 'published' && savedIds.length !== expectedCount) {
            showGlobalMessage(window.t('createRoom.builder.publishMismatch').replace('{remaining}', String(expectedCount - savedIds.length)), true)
            return false
          }

          if (!savedIds.length) {
            if (!auto) {
              showGlobalMessage(window.t('createRoom.builder.needQuestions'), true)
            }
            return false
          }

          const title = roomTitleInput ? roomTitleInput.value.trim() : ''
          const payload = {
            title: title || undefined,
            lang: lang,
            questionIds: savedIds,
            expectedCount: expectedCount,
            status: status,
          }

          let endpoint = '/api/question-sets/create'
          let method = 'POST'
          if (state.questionSetId) {
            endpoint = '/api/question-sets/' + state.questionSetId
            method = 'PUT'
          }

          if (auto) {
            autoSaveInFlight = true
            showSaveStatus(window.t('createRoom.builder.autoSaving'), false)
          } else {
            showSaveStatus(window.t('createRoom.builder.saving'), false)
          }

          try {
            const res = await fetch(endpoint, {
              method: method,
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            if (!res.ok) {
              const json = await res.json().catch(function() { return {} })
              throw new Error(json.error || window.t('questionSets.createError'))
            }
            const json = await res.json().catch(function() { return {} })
            if (!state.questionSetId && json && json.id) {
              state.questionSetId = json.id
            }
            if (!auto) {
              const successText = status === 'published' ? window.t('createRoom.builder.publishSuccess') : window.t('createRoom.builder.saveSuccess')
              showGlobalMessage(successText, false)
            }
            showSaveStatus(window.t('createRoom.builder.saveSuccess'), false)
            await upsertTemplate(status)
            if (status === 'published') {
              const templateIdForRoom = state.templateId || state.questionSetId
              await ensureLiveRoom(state.questionSetId, templateIdForRoom)
              markHomeNeedsRefresh()
              currentStatus = 'published'
              updateTemplateTabs()
            }
            loadTemplates(currentStatus, templatesOffset)
            return true
          } catch (e) {
            const message = e && e.message ? String(e.message) : window.t('questionSets.createError')
            showSaveStatus(message, true)
            if (!auto) {
              showGlobalMessage(message, true)
            }
            return false
          } finally {
            if (auto) {
              autoSaveInFlight = false
            }
          }
        }

        async function upsertTemplate(status) {
          if (!state.questionSetId) return
          try {
            const payload = {
              questionSetId: state.questionSetId,
              status: status,
            }
            if (roomTitleInput && roomTitleInput.value) {
              payload.title = roomTitleInput.value.trim()
            }
            const res = await fetch('/api/room-templates', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            if (res.ok) {
              const tplJson = await res.json().catch(function() { return {} })
              if (tplJson && tplJson.template && tplJson.template.id) {
                state.templateId = tplJson.template.id
              }
            }
          } catch (e) {
            console.error('Failed to upsert room template', e)
          }
        }

        function updateQuestionCount(newCount) {
          if (newCount === expectedCount) {
            setCountHint(newCount)
            return
          }
          if (newCount < expectedCount) {
            const removed = slots.slice(newCount)
            const hasSaved = removed.some(function(slot) { return !!slot.savedId })
            if (hasSaved) {
              const confirmMessage = window.t('createRoom.builder.confirmReduce').replace('{count}', String(expectedCount - newCount))
              if (!window.confirm(confirmMessage)) {
                renderCountButtons()
                return
              }
            }
            slots = slots.slice(0, newCount)
          } else {
            for (let i = expectedCount; i < newCount; i += 1) {
              slots.push(createEmptySlot())
            }
          }
          expectedCount = newCount
          renderCountButtons()
          renderSlots()
          scheduleSetSave()
          setCountHint(newCount)
        }

        countButtons.forEach(function(btn) {
          btn.addEventListener('click', function() {
            const value = Number(btn.getAttribute('data-count') || '0')
            if (!allowedCounts.includes(value)) return
            if (!ensureVipAccess(value)) {
              renderCountButtons()
              return
            }
            updateQuestionCount(value)
          })
        })

        if (roomTitleInput) {
          roomTitleInput.addEventListener('input', function() {
            scheduleSetSave()
          })
        }

        if (saveDraftBtn) {
          saveDraftBtn.addEventListener('click', function() {
            saveCurrentQuestionSet('draft', false)
          })
        }

        if (publishBtn) {
          publishBtn.addEventListener('click', async function() {
          for (let i = 0; i < slots.length; i += 1) {
            if (!slots[i].savedId) {
              const ok = await ensureSlotSaved(i)
              if (!ok) {
                showGlobalMessage(window.t('createRoom.builder.publishValidate'), true)
                return
              }
            }
          }
          saveCurrentQuestionSet('published', false)
          })
        }

        function toggleLibrary(show) {
          if (!libraryPanel) return
          libraryPanel.style.display = show ? 'block' : 'none'
          if (show) {
            if (!libraryState.items.length) {
              loadLibrary(true)
            }
          }
        }

        if (openLibraryBtn) {
          openLibraryBtn.addEventListener('click', function() {
            const nextUnsaved = slots.findIndex(function(slot) { return !slot.savedId })
            activeSlotIndex = nextUnsaved >= 0 ? nextUnsaved : 0
            toggleLibrary(true)
          })
        }

        if (closeLibraryBtn) {
          closeLibraryBtn.addEventListener('click', function() {
            toggleLibrary(false)
          })
        }

        if (libraryRefresh) {
          libraryRefresh.addEventListener('click', function() {
            loadLibrary(true)
          })
        }

        if (librarySearch) {
          librarySearch.addEventListener('input', function() {
            const value = librarySearch.value || ''
            libraryState.search = value.trim()
            if (libraryState.loading) return
            window.clearTimeout(libraryState.searchTimer)
            libraryState.searchTimer = window.setTimeout(function() {
              loadLibrary(true)
            }, 400)
          })
        }

        if (libraryList) {
          libraryList.addEventListener('click', function(event) {
            const item = event.target && event.target.closest('[data-question-id]')
            if (!item) return
            const questionId = item.getAttribute('data-question-id')
            const question = libraryState.items.find(function(entry) { return entry.id === questionId })
            if (!question) return
            if (activeSlotIndex === null) activeSlotIndex = 0
            if (!slots[activeSlotIndex]) {
              slots[activeSlotIndex] = createEmptySlot()
            }
            const slot = slots[activeSlotIndex]
            slot.question = question.question || ''
            const importedChoices = Array.isArray(question.choices) ? question.choices.map(function(choice) { return String(choice || '') }) : []
            slot.choices = importedChoices.slice(0, 4)
            ensureChoiceSize(slot)
            const correctIndex = slot.choices.findIndex(function(choice) { return choice === question.correctAnswer })
            slot.correctIndex = correctIndex >= 0 ? correctIndex : 0
            slot.keywords = Array.isArray(question.keywords) ? question.keywords.join(' ') : ''
            slot.savedId = null
            slot.message = window.t('createRoom.builder.imported')
            slot.messageError = false
            renderSlots()
            toggleLibrary(false)
          })
        }

        if (libraryLoadMore) {
          libraryLoadMore.addEventListener('click', function() {
            loadLibrary(false)
          })
        }

        async function loadLibrary(reset) {
          if (libraryState.loading) return
          libraryState.loading = true
          if (reset) {
            libraryState.offset = 0
            libraryState.items = []
            libraryState.hasMore = false
          }
          renderLibrary()
          const params = new URLSearchParams({ limit: '20', offset: String(libraryState.offset) })
          if (libraryState.search) params.set('q', libraryState.search)
          try {
            const res = await fetch('/api/questions/list?' + params.toString(), { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const items = data.questions || []
            libraryState.hasMore = !!data.hasMore
            if (reset) {
              libraryState.items = items
            } else {
              libraryState.items = libraryState.items.concat(items)
            }
            libraryState.offset += items.length
          } catch (e) {
            console.error('Failed to load library', e)
          } finally {
            libraryState.loading = false
            renderLibrary()
          }
        }

        function renderLibrary() {
          if (!libraryList) return
          libraryList.innerHTML = ''
          if (!libraryState.items.length) {
            const empty = document.createElement('p')
            empty.style.textAlign = 'center'
            empty.style.opacity = '0.6'
            empty.style.padding = '16px'
            empty.textContent = libraryState.loading ? window.t('room.loading') : window.t('questionSets.library.empty')
            libraryList.appendChild(empty)
          } else {
            libraryState.items.forEach(function(question) {
              const item = document.createElement('div')
              item.setAttribute('data-question-id', question.id)
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '10px'
              item.style.padding = '14px'
              item.style.display = 'grid'
              item.style.gap = '6px'
              const choices = Array.isArray(question.choices) ? question.choices.slice(0, 4).map(function(choice) { return String(choice || '') }).filter(function(choice) { return choice.length > 0 }) : []
              item.innerHTML = (
                '<div style="font-weight:600">' + question.question + '</div>' +
                '<div style="font-size:0.8rem;opacity:0.65">' + window.t('questionSets.choiceCount').replace('{count}', String(choices.length)) + '</div>' +
                (choices.length ? '<div style="font-size:0.8rem;opacity:0.6">' + choices.join(' · ') + '</div>' : '')
              )
              libraryList.appendChild(item)
            })
          }

          if (libraryStatus) {
            libraryStatus.textContent = libraryState.loading
              ? window.t('questionSets.library.loading')
              : window.t('questionSets.library.selected').replace('{count}', String(libraryState.items.length))
          }
          if (libraryLoadMore) {
            libraryLoadMore.style.display = libraryState.hasMore ? 'inline-flex' : 'none'
          }
        }

        async function initUser() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (!res.ok) {
              currentUser = null
              updateAuthUI(null)
              showAuthBlocker()
              return
            }
            const json = await res.json()
            if (json && json.authenticated && json.user) {
              currentUser = json.user
              updateAuthUI(currentUser)
              hideAuthBlocker()
              return
            }
          } catch (e) {
            console.error('Failed to init user', e)
          }
          currentUser = null
          updateAuthUI(null)
          showAuthBlocker()
        }

        function updateAuthUI(user) {
          // AppHeader 會自行處理使用者顯示，此處僅維持本頁遮罩/提示
          if (user) {
            // no-op for header; keep local blockers in sync elsewhere
          } else {
            // no-op
          }
        }

        function showAuthBlocker() {
          if (authBlocker) {
            authBlocker.style.display = 'flex'
          }
        }

        function hideAuthBlocker() {
          if (authBlocker) {
            authBlocker.style.display = 'none'
          }
        }

        function goToLogin() {
          window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
        }

        function formatDateForName(date) {
          const yyyy = date.getFullYear()
          const mm = ('0' + (date.getMonth() + 1)).slice(-2)
          const dd = ('0' + date.getDate()).slice(-2)
          return yyyy + mm + dd
        }

        function defaultRoomTitle() {
          const base = currentUser && currentUser.name ? currentUser.name : window.t('createRoom.form.defaultOwner')
          const today = formatDateForName(new Date())
          return base + ' Quiz ' + today
        }

        function applyDefaultTitle() {
          if (!roomTitleInput) return
          if (!roomTitleInput.value) {
            roomTitleInput.value = defaultRoomTitle()
          }
          const hint = document.getElementById('room-name-hint')
          if (hint) {
            hint.textContent = window.t('createRoom.form.defaultNameHint')
          }
        }

        async function loadExistingSet(setId) {
          try {
            const res = await fetch('/api/question-sets/' + setId, { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const questions = Array.isArray(data.questions) ? data.questions : []
            expectedCount = data.questionIds && data.questionIds.length ? data.questionIds.length : defaultCount
            if (!allowedCounts.includes(expectedCount)) {
              expectedCount = allowedCounts[0]
            }
            if (!hasVipAccess && vipRequiredCounts.indexOf(expectedCount) >= 0) {
              handleVipBlocked()
            }
            slots = []
            questions.forEach(function(question) {
              const slot = createEmptySlot()
              slot.question = question.question || ''
              const choices = Array.isArray(question.choices) ? question.choices.map(function(choice) { return String(choice || '') }) : []
              slot.choices = choices.slice(0, 4)
              ensureChoiceSize(slot)
              const correctIndex = slot.choices.findIndex(function(choice) { return choice === question.correctAnswer })
              slot.correctIndex = correctIndex >= 0 ? correctIndex : 0
              slot.keywords = Array.isArray(question.keywords) ? question.keywords.join(' ') : ''
              slot.savedId = question.id
              slots.push(slot)
            })
            while (slots.length < expectedCount) {
              slots.push(createEmptySlot())
            }
            state.questionSetId = data.id
            if (roomTitleInput) {
              roomTitleInput.value = data.title || ''
            }
            renderCountButtons()
            renderSlots()
          } catch (e) {
            console.error('Failed to load existing set', e)
          }
        }

        async function loadTemplates(status, requestedOffset) {
          if (!templatesList) {
            return
          }
          setupTemplatesPagination()
          const nextOffset = typeof requestedOffset === 'number' && requestedOffset >= 0 ? requestedOffset : 0
          templatesOffset = nextOffset
          templatesList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('room.loading') + '</p>'
          updateTemplatesPagination(0, templatesLimit, templatesOffset)
          try {
            const params = '?status=' + status + '&limit=' + templatesLimit + '&offset=' + templatesOffset
            const res = await fetch('/api/room-templates' + params, { credentials: 'include' })
            if (!res.ok) {
              if (res.status === 401) {
                templatesList.innerHTML = '<p style="padding:16px;text-align:center">' + window.t('createRoom.loginRequired') + '</p>'
                updateTemplatesPagination(0, templatesLimit, 0)
                return
              }
              throw new Error('network')
            }
            const data = await res.json()
            const templates = Array.isArray(data.templates) ? data.templates : []
            const total = typeof data.total === 'number' && data.total >= 0 ? data.total : templates.length
            const limitFromApi = typeof data.limit === 'number' && data.limit > 0 ? data.limit : templatesLimit
            const offsetFromApi = typeof data.offset === 'number' && data.offset >= 0 ? data.offset : templatesOffset
            templatesLimit = limitFromApi
            templatesOffset = offsetFromApi
            if (total > 0 && offsetFromApi >= total && offsetFromApi > 0) {
              const lastOffset = Math.max(Math.floor((total - 1) / limitFromApi) * limitFromApi, 0)
              if (lastOffset !== offsetFromApi) {
                await loadTemplates(status, lastOffset)
                return
              }
            }
            if (!templates.length) {
              templatesList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('createRoom.list.empty') + '</p>'
              updateTemplatesPagination(total, limitFromApi, offsetFromApi)
              return
            }
            templatesList.innerHTML = ''
            templates.forEach(function(tpl) {
              let card = null
              if (window.RoomTemplates && window.RoomTemplates.buildBuilderCard) {
                card = window.RoomTemplates.buildBuilderCard(tpl, { lang: lang, t: window.t })
              }
              if (!card) {
                card = document.createElement('div')
                card.style.border = '1px solid #e5e7eb'
                card.style.borderRadius = '12px'
                card.style.padding = '16px'
                card.style.display = 'grid'
                card.style.gap = '12px'
                card.style.background = '#fff'
                card.setAttribute('data-template-card', 'true')
                if (tpl && tpl.id) card.setAttribute('data-template-id', tpl.id)
                if (tpl && tpl.questionSetId) {
                  card.setAttribute('data-set-id', tpl.questionSetId)
                  card.setAttribute('data-question-set-id', tpl.questionSetId)
                }
                if (tpl && tpl.status) card.setAttribute('data-template-status', tpl.status)
                const questionCount = tpl && tpl.questionSet && tpl.questionSet.questionCount ? tpl.questionSet.questionCount : 0
                const safeTitle = escapeHtml(tpl && tpl.title ? tpl.title : window.t('questionSets.untitled'))
                const updatedAtText = tpl && tpl.updatedAt ? new Date(tpl.updatedAt).toLocaleString() : ''
                card.innerHTML =
                  '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
                    '<div>' +
                      '<div style="font-weight:600;font-size:1.05rem">' + safeTitle + '</div>' +
                      '<div style="font-size:0.85rem;opacity:0.7">' + window.t('questionSets.questionCount').replace('{count}', String(questionCount)) + '</div>' +
                    '</div>' +
                    '<span style="font-size:0.8rem;opacity:0.6;align-self:flex-start">' + updatedAtText + '</span>' +
                  '</div>' +
                  '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
                    '<a class="btn" data-action="edit" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.editQuestions') + '</a>' +
                    (tpl && tpl.status === 'published'
                      ? '<button class="btn" data-action="unpublish" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.unpublish') + '</button>'
                      : '<button class="btn" data-action="publish" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.publish') + '</button>') +
                    '<button class="btn" data-action="delete" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.delete') + '</button>' +
                  '</div>'
              }
              templatesList.appendChild(card)
            })
            updateTemplatesPagination(total, limitFromApi, offsetFromApi)
          } catch (e) {
            console.error('Failed to load templates', e)
            templatesList.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('errors.networkError') + '</p>'
            updateTemplatesPagination(0, templatesLimit, 0)
          }
        }

        if (templatesList) {
          templatesList.addEventListener('click', function(event) {
            const target = event.target && event.target.closest('[data-action]')
            if (!target) return
            const action = target.getAttribute('data-action')
            const card = target.closest('[data-template-card]')
            const templateId = target.getAttribute('data-template-id') || (card ? card.getAttribute('data-template-id') : '')
            const setAttr = target.getAttribute('data-set-id')
            const cardSetAttr = card ? card.getAttribute('data-set-id') || card.getAttribute('data-question-set-id') : ''
            const setId = setAttr || cardSetAttr
            if (!action || !templateId) return
            const previousStatus = card ? card.getAttribute('data-template-status') || '' : ''
            handleTemplateAction(action, templateId, setId || '', previousStatus)
          })
        }

        async function handleTemplateAction(action, id, setId, previousStatus) {
          const wasPublished = previousStatus === 'published'
          try {
            if (action === 'edit') {
              window.location.href = '/' + lang + '/create-room?setId=' + setId + '&templateId=' + id
              return
            }
            if (action === 'delete') {
              if (!window.confirm(window.t('createRoom.card.deleteConfirm'))) return
              const res = await fetch('/api/room-templates/' + id, { method: 'DELETE', credentials: 'include' })
              if (res.ok) {
                const removed = await removeLiveRoom(id)
                if (removed || wasPublished) {
                  markHomeNeedsRefresh()
                }
                if (state.templateId === id) {
                  state.templateId = null
                }
                if (state.questionSetId === id || state.questionSetId === setId) {
                  state.questionSetId = null
                }
              }
            } else if (action === 'publish' || action === 'unpublish') {
              const res = await fetch('/api/room-templates/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status: action === 'publish' ? 'published' : 'draft' }),
              })
              if (res.ok) {
                const questionSetId = setId || (state.templateId === id ? state.questionSetId : '') || id
                if (action === 'publish') {
                  await ensureLiveRoom(questionSetId, id)
                  markHomeNeedsRefresh()
                  currentStatus = 'published'
                  updateTemplateTabs()
                  templatesOffset = 0
                } else {
                  await removeLiveRoom(id)
                  markHomeNeedsRefresh()
                }
              }
            }
            loadTemplates(currentStatus, templatesOffset)
          } catch (e) {
            console.error('Template action failed', e)
          }
        }

        async function handleAiGenerate() {
          if (aiGenerating) return
          if (!aiPromptInput) return
          const prompt = aiPromptInput.value ? aiPromptInput.value.trim() : ''
          if (!prompt || prompt.length < 12) {
            setAiStatus(window.t('createRoom.ai.promptTooShort'), true)
            showToast(window.t('createRoom.ai.promptTooShort'), 'error')
            return
          }
          const lowerPrompt = prompt.toLowerCase()
          for (let i = 0; i < PROMPT_BLOCKLIST.length; i += 1) {
            const keyword = PROMPT_BLOCKLIST[i]
            if (lowerPrompt.indexOf(keyword) >= 0) {
              setAiStatus(window.t('createRoom.ai.promptBlocked'), true)
              showToast(window.t('createRoom.ai.promptBlocked'), 'error')
              return
            }
          }

          const generateCountRaw = aiCountSelect ? Number(aiCountSelect.value || expectedCount) : expectedCount
          const generateCount = allowedCounts.indexOf(generateCountRaw) >= 0 ? generateCountRaw : expectedCount

          if (!ensureVipAccess(generateCount)) {
            setAiStatus(window.t('createRoom.builder.vipLocked'), true)
            return
          }

          const remainingQuota = typeof aiLimits.generate.remaining === 'number' ? aiLimits.generate.remaining : null
          if (remainingQuota !== null && remainingQuota <= 0) {
            setAiStatus(window.t('createRoom.ai.limitExceeded'), true)
            showToast(window.t('createRoom.ai.limitExceeded'), 'error')
            return
          }

          const blankIndexes = getBlankSlotIndexes()
          if (!blankIndexes.length) {
            setAiStatus(window.t('createRoom.ai.noBlankSlots'), true)
            showToast(window.t('createRoom.ai.noBlankSlots'), 'error')
            return
          }
          if (blankIndexes.length < generateCount) {
            setAiStatus(
              window.t('createRoom.ai.notEnoughBlankSlots')
                .replace('{empty}', String(blankIndexes.length))
                .replace('{requested}', String(generateCount)),
              true
            )
            showToast(
              window.t('createRoom.ai.notEnoughBlankSlots')
                .replace('{empty}', String(blankIndexes.length))
                .replace('{requested}', String(generateCount)),
              'error'
            )
            return
          }

          aiGenerating = true
          if (aiGenerateBtn) aiGenerateBtn.disabled = true
          if (aiImproveBtn) aiImproveBtn.disabled = true
          setAiImproveStatus('', false)
          setAiStatus(window.t('createRoom.ai.generating'), false)

          const targetLang = aiLangSelect ? String(aiLangSelect.value || lang) : lang

          try {
            const payload = {
              prompt: prompt,
              lang: targetLang,
              count: generateCount,
            }
            if (state.questionSetId) {
              payload.setId = state.questionSetId
            }

            const res = await fetch('/api/questions/generate', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
            if (!res.ok) {
              const errorCode = json && json.error ? String(json.error) : 'unknown'
              let message = window.t('createRoom.ai.error')
              if (errorCode === 'quota_exceeded') {
                message = window.t('createRoom.ai.limitExceeded')
              } else if (errorCode === 'count_exceeds_limit') {
                const maxValue = json && typeof json.max === 'number' ? json.max : VIP_MAX_GENERATE_COUNT
                message = window.t('createRoom.ai.countExceeded').replace('{max}', String(maxValue))
              } else if (errorCode === 'prompt_too_short') {
                message = window.t('createRoom.ai.promptTooShort')
              }
              setAiStatus(message, true)
              showToast(message, 'error')
              return
            }

            const generated = Array.isArray(json && json.questions) ? json.questions : []
            if (!generated.length) {
              setAiStatus(window.t('createRoom.ai.error'), true)
              showToast(window.t('createRoom.ai.error'), 'error')
              return
            }

            for (let i = 0; i < generated.length; i += 1) {
              const data = generated[i]
              if (!data) continue
              const slotIndex = blankIndexes[i]
              if (typeof slotIndex !== 'number') continue
              const slot = slots[slotIndex] || createEmptySlot()
              slot.question = data.question || ''
              const choiceList = Array.isArray(data.choices) ? data.choices.map(function(choice) { return String(choice || '') }) : []
              slot.choices = choiceList.slice(0, 4)
              ensureChoiceSize(slot)
              const correctAnswer = data.correctAnswer || data.answer || ''
              let correctIndex = slot.choices.findIndex(function(choice) { return choice === correctAnswer })
              if (correctIndex < 0) {
                correctIndex = 0
              }
              slot.correctIndex = correctIndex
              slot.keywords = Array.isArray(data.keywords) ? data.keywords.join(' ') : ''
              slot.savedId = data.id || null
              slot.message = window.t('createRoom.ai.cardGenerated')
              slot.messageError = false
              slots[slotIndex] = slot
            }

            renderSlots()
            setAiStatus(window.t('createRoom.ai.successHint'), false)
            showToast(window.t('createRoom.ai.generateSuccess').replace('{count}', String(generated.length)), 'success')
            await saveCurrentQuestionSet('draft', true)
          } catch (e) {
            console.error('AI generation failed', e)
            setAiStatus(window.t('createRoom.ai.error'), true)
            showToast(window.t('createRoom.ai.error'), 'error')
          } finally {
            aiGenerating = false
            if (aiGenerateBtn) aiGenerateBtn.disabled = false
            if (!aiImproving && aiImproveBtn) aiImproveBtn.disabled = false
          }
        }

        async function handleAiImprove() {
          if (aiImproving) return
          const remainingQuota = typeof aiLimits.improve.remaining === 'number' ? aiLimits.improve.remaining : null
          if (remainingQuota !== null && remainingQuota <= 0) {
            setAiImproveStatus(window.t('createRoom.ai.limitExceededImprove'), true)
            showToast(window.t('createRoom.ai.limitExceededImprove'), 'error')
            return
          }

          const savedIds = slots
            .map(function(slot) { return slot && typeof slot.savedId === 'string' ? slot.savedId : null })
            .filter(function(id) { return typeof id === 'string' && id })

          if (!savedIds.length) {
            setAiImproveStatus(window.t('createRoom.ai.optimizeEmpty'), true)
            showToast(window.t('createRoom.ai.optimizeEmpty'), 'error')
            return
          }

          aiImproving = true
          if (aiImproveBtn) aiImproveBtn.disabled = true
          if (aiGenerateBtn) aiGenerateBtn.disabled = true
          setAiImproveStatus(window.t('createRoom.ai.optimizing'), false)
          setAiStatus('', false)

          const targetLang = aiLangSelect ? String(aiLangSelect.value || lang) : lang

          try {
            const res = await fetch('/api/questions/improve', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ questionIds: savedIds, lang: targetLang }),
            })
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
            if (!res.ok) {
              const errorCode = json && json.error ? String(json.error) : 'unknown'
              let message = window.t('createRoom.ai.error')
              if (errorCode === 'quota_exceeded') {
                message = window.t('createRoom.ai.limitExceededImprove')
              } else if (errorCode === 'no_questions_found') {
                message = window.t('createRoom.ai.optimizeEmpty')
              }
              setAiImproveStatus(message, true)
              showToast(message, 'error')
              return
            }

            const updated = Array.isArray(json && json.questions) ? json.questions : []
            if (!updated.length) {
              setAiImproveStatus(window.t('createRoom.ai.error'), true)
              showToast(window.t('createRoom.ai.error'), 'error')
              return
            }

            updated.forEach(function(data) {
              if (!data || !data.id) return
              const slotIndex = slots.findIndex(function(slot) { return slot && slot.savedId === data.id })
              if (slotIndex < 0) return
              const slot = slots[slotIndex]
              slot.question = data.question || slot.question
              const choiceList = Array.isArray(data.choices) ? data.choices.map(function(choice) { return String(choice || '') }) : []
              if (choiceList.length) {
                slot.choices = choiceList.slice(0, 4)
                ensureChoiceSize(slot)
              }
              const correctAnswer = data.correctAnswer || data.answer || slot.choices[slot.correctIndex] || ''
              const newIndex = slot.choices.findIndex(function(choice) { return choice === correctAnswer })
              slot.correctIndex = newIndex >= 0 ? newIndex : 0
              slot.keywords = Array.isArray(data.keywords) ? data.keywords.join(' ') : slot.keywords
              slot.message = window.t('createRoom.ai.optimizeCard')
              slot.messageError = false
            })

            renderSlots()
            setAiImproveStatus(window.t('createRoom.ai.optimizeSuccess').replace('{count}', String(updated.length)), false)
            showToast(window.t('createRoom.ai.optimizeSuccess').replace('{count}', String(updated.length)), 'success')
            await saveCurrentQuestionSet('draft', true)
          } catch (e) {
            console.error('AI improve failed', e)
            setAiImproveStatus(window.t('createRoom.ai.error'), true)
            showToast(window.t('createRoom.ai.error'), 'error')
          } finally {
            aiImproving = false
            if (aiImproveBtn) aiImproveBtn.disabled = false
            if (!aiGenerating && aiGenerateBtn) aiGenerateBtn.disabled = false
          }
        }

        if (aiGenerateBtn) {
          aiGenerateBtn.addEventListener('click', function() {
            handleAiGenerate()
          })
        }

        if (aiImproveBtn) {
          aiImproveBtn.addEventListener('click', function() {
            handleAiImprove()
          })
        }

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        if (authBlockerBtn) {
          authBlockerBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        tabButtons.forEach(function(btn) {
          btn.addEventListener('click', function() {
            currentStatus = btn.getAttribute('data-status') || 'published'
            updateTemplateTabs()
            templatesOffset = 0
            loadTemplates(currentStatus, 0)
          })
        })

        await initUser()
        await loadEntitlements()
        await fetchAiLimits()
        renderAiLimits()
        applyDefaultTitle()

        slots = []
        for (let i = 0; i < expectedCount; i += 1) {
          slots.push(createEmptySlot())
        }

        renderCountButtons()
        renderSlots()

        if (state.questionSetId) {
          await loadExistingSet(state.questionSetId)
        }

        updateTemplateTabs()
        templatesOffset = 0
        loadTemplates(currentStatus, 0)
      })()
    </script> </body> </html>`], ["<html", ' data-astro-cid-mcc5vagp> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body data-astro-cid-mcc5vagp> ", ' <main class="container hero" data-astro-cid-mcc5vagp> <h1 class="h1" data-astro-cid-mcc5vagp>', '</h1> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <input id="room-title" type="text"', ' style="padding:12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <p style="margin:0;font-size:0.8rem;opacity:0.6" id="room-name-hint" data-astro-cid-mcc5vagp></p> </div> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <div id="count-options" style="display:flex;gap:8px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <button type="button" class="count-btn active" data-role="count-btn" data-count="10" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#6366f1;color:#fff;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>10</button> <button type="button" class="count-btn" data-role="count-btn" data-count="20" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>20</button> <button type="button" class="count-btn" data-role="count-btn" data-count="30" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>30</button> <button type="button" class="count-btn" data-role="count-btn" data-count="40" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>40</button> <button type="button" class="count-btn" data-role="count-btn" data-count="50" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>50</button> <button type="button" class="count-btn" data-role="count-btn" data-count="60" style="padding:8px 14px;border:1px solid #d1d5db;border-radius:999px;background:#f3f4f6;color:#111827;font-size:0.85rem;cursor:pointer" data-astro-cid-mcc5vagp>60</button> </div> <p id="count-hint" style="margin:0;font-size:0.8rem;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> <div id="vip-benefits" style="display:none;margin-top:4px;padding:12px;border-radius:12px;background:rgba(124,58,237,0.08);color:#4c1d95;font-size:0.85rem;line-height:1.5" data-astro-cid-mcc5vagp> ', ' </div> </div> <div id="global-msg" style="min-height:1.1em;font-size:0.9rem" data-astro-cid-mcc5vagp></div> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <span style="font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</span> </div> <div style="display:grid;gap:12px" data-astro-cid-mcc5vagp> <label for="ai-prompt" style="font-weight:600" data-astro-cid-mcc5vagp>', '</label> <textarea id="ai-prompt"', ' style="width:100%;min-height:120px;padding:12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp></textarea> <p style="margin:0;font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</p> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <label for="ai-lang" style="font-size:0.85rem;font-weight:600" data-astro-cid-mcc5vagp>', '</label> <select id="ai-lang" style="padding:10px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <option value="en" data-astro-cid-mcc5vagp>', '</option> <option value="zh-hant" data-astro-cid-mcc5vagp>', '</option> <option value="zh-hans" data-astro-cid-mcc5vagp>', '</option> <option value="ja" data-astro-cid-mcc5vagp>', '</option> <option value="ko" data-astro-cid-mcc5vagp>', '</option> <option value="de" data-astro-cid-mcc5vagp>', '</option> <option value="fr" data-astro-cid-mcc5vagp>', '</option> </select> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <label for="ai-count" style="font-size:0.85rem;font-weight:600" data-astro-cid-mcc5vagp>', '</label> <select id="ai-count" style="padding:10px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <option value="10" data-astro-cid-mcc5vagp>10</option> <option value="20" data-astro-cid-mcc5vagp>20</option> <option value="30" data-astro-cid-mcc5vagp>30</option> <option value="40" data-astro-cid-mcc5vagp>40</option> <option value="50" data-astro-cid-mcc5vagp>50</option> <option value="60" data-astro-cid-mcc5vagp>60</option> </select> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <span id="ai-limit-generate" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> <span id="ai-limit-improve" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <button id="ai-generate-btn" class="btn btn-primary" type="button" data-astro-cid-mcc5vagp>', '</button> <button id="ai-improve-btn" class="btn" type="button" data-astro-cid-mcc5vagp>', '</button> </div> <p id="ai-status" style="min-height:1.1em;font-size:0.9rem;margin:0" data-astro-cid-mcc5vagp></p> <p id="ai-improve-status" style="min-height:1.1em;font-size:0.9rem;margin:0" data-astro-cid-mcc5vagp></p> <p style="margin:0;font-size:0.8rem;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:24px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <span style="font-size:0.8rem;opacity:0.65" data-astro-cid-mcc5vagp>', '</span> </div> <div id="question-grid" style="display:grid;gap:16px" data-astro-cid-mcc5vagp></div> <div style="display:flex;justify-content:flex-end" data-astro-cid-mcc5vagp> <button id="open-library" type="button" class="btn" data-browse-library data-astro-cid-mcc5vagp>', '</button> </div> </section> <section style="display:grid;gap:16px;max-width:820px;margin-bottom:32px;background:#fff;border:1px solid #e5e7eb;border-radius:16px;padding:24px" data-astro-cid-mcc5vagp> <div style="display:flex;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <button id="save-draft-btn" class="btn" data-astro-cid-mcc5vagp>', '</button> <button id="publish-btn" class="btn btn-primary" data-astro-cid-mcc5vagp>', '</button> </div> <div id="save-status" style="min-height:1.1em;font-size:0.9rem" data-astro-cid-mcc5vagp></div> </section> ', ' </main> <div id="toast-root" style="position:fixed;top:24px;right:24px;display:grid;gap:12px;z-index:70" data-astro-cid-mcc5vagp></div> <div id="auth-blocker" style="display:none;position:fixed;inset:0;z-index:60;background:rgba(15,23,42,0.65);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:24px" data-astro-cid-mcc5vagp> <div style="max-width:360px;width:100%;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;text-align:center;box-shadow:0 24px 60px rgba(15,23,42,0.28)" data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.25rem" data-astro-cid-mcc5vagp>', '</h2> <p style="margin:0;font-size:0.95rem;color:#4b5563" data-astro-cid-mcc5vagp>', '</p> <button id="auth-blocker-btn" class="btn btn-primary" style="justify-content:center" data-astro-cid-mcc5vagp>', '</button> </div> </div> <div id="library-panel" style="display:none;position:fixed;inset:0;z-index:30;background:rgba(15,23,42,0.35);padding:24px;overflow:auto" data-astro-cid-mcc5vagp> <div style="max-width:720px;margin:0 auto;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;box-shadow:0 24px 60px rgba(15,23,42,0.18)" data-astro-cid-mcc5vagp> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap" data-astro-cid-mcc5vagp> <div data-astro-cid-mcc5vagp> <h2 style="margin:0;font-size:1.1rem" data-astro-cid-mcc5vagp>', '</h2> <p style="margin:4px 0 0;font-size:0.8rem;opacity:0.7" data-astro-cid-mcc5vagp>', '</p> </div> <button id="close-library" type="button" class="btn" data-astro-cid-mcc5vagp>', '</button> </div> <div style="display:flex;gap:12px;flex-wrap:wrap;align-items:center" data-astro-cid-mcc5vagp> <input id="library-search" type="search"', ' style="flex:1;min-width:180px;padding:9px 12px;border:1px solid #d1d5db;border-radius:10px" data-astro-cid-mcc5vagp> <button id="library-refresh" type="button" class="btn" data-astro-cid-mcc5vagp>', '</button> </div> <div id="library-list" style="display:grid;gap:12px;max-height:420px;overflow:auto" data-astro-cid-mcc5vagp> <p style="padding:16px;text-align:center;opacity:0.6" data-astro-cid-mcc5vagp>', '</p> </div> <div style="display:flex;justify-content:space-between;align-items:center;gap:16px" data-astro-cid-mcc5vagp> <span id="library-status" style="font-size:0.85rem;opacity:0.7" data-astro-cid-mcc5vagp></span> <button id="library-load-more" type="button" class="btn" data-astro-cid-mcc5vagp>', `</button> </div> </div> </div> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'

        const langSwitch = document.getElementById('lang-switch')
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

        const roomTitleInput = document.getElementById('room-title')
        const countButtons = Array.prototype.slice.call(document.querySelectorAll('[data-role="count-btn"]'))
        const questionGrid = document.getElementById('question-grid')
        const countHintEl = document.getElementById('count-hint')
        const saveDraftBtn = document.getElementById('save-draft-btn')
        const publishBtn = document.getElementById('publish-btn')
        const saveStatus = document.getElementById('save-status')
        const globalMsg = document.getElementById('global-msg')
        const openLibraryBtn = document.getElementById('open-library')
        const libraryPanel = document.getElementById('library-panel')
        const libraryList = document.getElementById('library-list')
        const librarySearch = document.getElementById('library-search')
        const libraryLoadMore = document.getElementById('library-load-more')
        const libraryStatus = document.getElementById('library-status')
        const libraryRefresh = document.getElementById('library-refresh')
        const closeLibraryBtn = document.getElementById('close-library')
        const templatesList = document.getElementById('templates-list')
        const templatesPagination = document.getElementById('templates-pagination')
        const tabButtonsNodeList = document.querySelectorAll('.tab-btn')
        const tabButtons = Array.prototype.slice.call(tabButtonsNodeList)
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
        // AppHeader 已處理 UserMenu 初始化
        const authBlocker = document.getElementById('auth-blocker')
        const authBlockerBtn = document.getElementById('auth-blocker-btn')
        const vipBenefitBox = document.getElementById('vip-benefits')
        const aiPromptInput = document.getElementById('ai-prompt')
        const aiLangSelect = document.getElementById('ai-lang')
        const aiCountSelect = document.getElementById('ai-count')
        const aiGenerateBtn = document.getElementById('ai-generate-btn')
        const aiStatus = document.getElementById('ai-status')
        const aiLimitGenerateEl = document.getElementById('ai-limit-generate')
        const aiLimitImproveEl = document.getElementById('ai-limit-improve')
        const aiImproveBtn = document.getElementById('ai-improve-btn')
        const aiImproveStatus = document.getElementById('ai-improve-status')
        const toastRoot = document.getElementById('toast-root')

        const urlParams = new URLSearchParams(window.location.search)
        const presetSetId = urlParams.get('setId')
        const presetTemplateId = urlParams.get('templateId')

        const allowedCounts = [10, 20, 30, 40, 50, 60]
        const vipRequiredCounts = [30, 40, 50, 60]
        const defaultCount = 10
        const defaultCountHint = window.t('createRoom.builder.countHint')
        const vipEntitlementKey = 'vip'
        const NON_VIP_MAX_GENERATE_COUNT = 20
        const VIP_MAX_GENERATE_COUNT = 60
        const PROMPT_BLOCKLIST = ['bomb', 'missile', 'weapon', 'nuke', '炸彈', '炸弹', '爆炸', '導彈', '导弹', '武器', 'terror', 'attack']

        let expectedCount = defaultCount
        let slots = []
        let currentUser = null
        let autoSaveTimer = null
        let autoSaveInFlight = false
        let activeSlotIndex = null
        let currentStatus = 'published'
        let vipNoticeActive = false
        let hasVipAccess = false
        let entitlementsLoaded = false
        let aiGenerating = false
        let aiImproving = false
        let templatesLimit = 10
        let templatesOffset = 0
        let templatesPaginationBound = false
        const aiLimits = {
          generate: { remaining: 0, max: 0 },
          improve: { remaining: 0, max: 0 },
        }
        const aiLoadingMessages = new Set([window.t('createRoom.ai.generating'), window.t('createRoom.ai.optimizing')])

        if (aiLangSelect) {
          const supportedLangs = ['en', 'zh-hant', 'zh-hans', 'ja', 'ko', 'de', 'fr']
          if (supportedLangs.indexOf(lang) >= 0) {
            aiLangSelect.value = lang
          } else {
            aiLangSelect.value = 'en'
          }
        }

        const state = {
          questionSetId: presetSetId || null,
          templateId: presetTemplateId || null,
        }

        const libraryState = {
          items: [],
          offset: 0,
          hasMore: false,
          loading: false,
          search: '',
        }

        function updateTemplateTabs() {
          tabButtons.forEach(function(btn) {
            if (btn.getAttribute('data-status') === currentStatus) {
              btn.classList.add('active')
              btn.style.background = '#6366f1'
              btn.style.color = '#fff'
            } else {
              btn.classList.remove('active')
              btn.style.background = 'transparent'
              btn.style.color = '#111827'
            }
          })
        }

        function setupTemplatesPagination() {
          if (templatesPaginationBound) return
          if (!templatesPagination) return
          templatesPaginationBound = true
          templatesPagination.addEventListener('click', function(event) {
            const button = event.target && event.target.closest('[data-action]')
            if (!button) return
            const action = button.getAttribute('data-action')
            const totalAttr = templatesPagination.getAttribute('data-total') || '0'
            const limitAttr = templatesPagination.getAttribute('data-limit') || String(templatesLimit)
            const offsetAttr = templatesPagination.getAttribute('data-offset') || '0'
            const total = Number(totalAttr)
            const limit = Number(limitAttr)
            const offset = Number(offsetAttr)
            if (!window.RoomTemplates || !window.RoomTemplates.getPagination) return
            const info = window.RoomTemplates.getPagination(total, limit, offset)
            if (action === 'prev' && info.hasPrev) {
              loadTemplates(currentStatus, info.prevOffset)
            }
            if (action === 'next' && info.hasNext) {
              loadTemplates(currentStatus, info.nextOffset)
            }
          })
        }

        function updateTemplatesPagination(total, limit, offset) {
          if (!templatesPagination) return
          if (!window.RoomTemplates || !window.RoomTemplates.getPagination) {
            templatesPagination.style.display = 'none'
            templatesPagination.innerHTML = ''
            return
          }
          const info = window.RoomTemplates.getPagination(total, limit, offset)
          if (!info || info.totalPages <= 1) {
            templatesPagination.style.display = 'none'
            templatesPagination.innerHTML = ''
            templatesPagination.removeAttribute('data-total')
            templatesPagination.removeAttribute('data-limit')
            templatesPagination.removeAttribute('data-offset')
            return
          }
          templatesPagination.style.display = 'flex'
          templatesPagination.setAttribute('data-total', String(info.total))
          templatesPagination.setAttribute('data-limit', String(info.limit))
          templatesPagination.setAttribute('data-offset', String(info.offset))
          templatesPagination.innerHTML = window.RoomTemplates.buildPagination(info, window.t)
        }

        function createEmptySlot() {
          return {
            question: '',
            choices: ['', '', '', ''],
            correctIndex: 0,
            keywords: '',
            savedId: null,
            message: '',
            messageError: false,
          }
        }

        function ensureChoiceSize(slot) {
          while (slot.choices.length < 4) slot.choices.push('')
          if (slot.choices.length > 4) slot.choices = slot.choices.slice(0, 4)
        }

        function escapeHtml(value) {
          return String(value || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function showGlobalMessage(text, isError) {
          if (!globalMsg) return
          globalMsg.textContent = text || ''
          globalMsg.style.color = isError ? '#d00' : '#059669'
          if (text) {
            showToast(text, isError ? 'error' : 'success')
          }
        }

        function showSaveStatus(text, isError) {
          if (!saveStatus) return
          saveStatus.textContent = text || ''
          saveStatus.style.color = isError ? '#d00' : '#059669'
        }

        function showToast(text, type) {
          if (!toastRoot) return
          if (!text) return
          const toast = document.createElement('div')
          toast.textContent = text
          toast.style.padding = '12px 16px'
          toast.style.borderRadius = '12px'
          toast.style.boxShadow = '0 12px 32px rgba(15,23,42,0.18)'
          toast.style.fontSize = '0.9rem'
          toast.style.color = type === 'error' ? '#7f1d1d' : '#065f46'
          toast.style.background = type === 'error' ? '#fee2e2' : '#ecfdf5'
          toast.style.border = type === 'error' ? '1px solid #fecaca' : '1px solid #bbf7d0'
          toastRoot.appendChild(toast)
          window.setTimeout(function() {
            toast.style.opacity = '0'
            toast.style.transition = 'opacity 200ms ease'
            window.setTimeout(function() {
              if (toast.parentNode === toastRoot) {
                toastRoot.removeChild(toast)
              }
            }, 240)
          }, 4200)
        }

        function markHomeNeedsRefresh() {
          try {
            window.localStorage.setItem('qp_home_refresh', String(Date.now()))
          } catch (e) {
            console.warn('Failed to set home refresh flag', e)
          }
        }

        async function ensureLiveRoom(questionSetId, templateId) {
          const targetSetId = questionSetId || state.questionSetId
          if (!targetSetId) return false
          const roomId = templateId || targetSetId
          try {
            const res = await fetch('/api/rooms', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                lang,
                questionSetId: targetSetId,
                roomId,
                replaceExisting: true,
              }),
            })
            if (!res.ok) {
              const errorText = await res.text().catch(function() { return '' })
              console.warn('ensureLiveRoom failed', res.status, errorText)
              return false
            }
            return true
          } catch (e) {
            console.error('ensureLiveRoom exception', e)
            return false
          }
        }

        async function removeLiveRoom(roomId) {
          if (!roomId) return false
          try {
            const res = await fetch('/api/rooms/' + roomId, {
              method: 'DELETE',
              credentials: 'include',
            })
            if (!res.ok && res.status !== 404) {
              const errorText = await res.text().catch(function() { return '' })
              console.warn('removeLiveRoom failed', res.status, errorText)
              return false
            }
            return true
          } catch (e) {
            console.error('removeLiveRoom exception', e)
            return false
          }
        }

        function renderStatus(node, text, isError) {
          if (!node) return
          node.style.color = isError ? '#b91c1c' : '#059669'
          if (!text) {
            node.textContent = ''
            node.innerHTML = ''
            return
          }
          if (!isError && aiLoadingMessages.has(text)) {
            node.innerHTML = '<span style="display:inline-flex;align-items:center;gap:6px;"><span class="qp-spinner" aria-hidden="true"></span><span>' + text + '</span></span>'
          } else {
            node.innerHTML = ''
            node.textContent = text
          }
        }

        function setAiStatus(text, isError) {
          renderStatus(aiStatus, text, isError)
        }

        function setAiImproveStatus(text, isError) {
          renderStatus(aiImproveStatus, text, isError)
        }

        function renderAiLimits() {
          if (aiLimitGenerateEl) {
            const remaining = typeof aiLimits.generate.remaining === 'number' ? aiLimits.generate.remaining : 0
            const max = typeof aiLimits.generate.max === 'number' ? aiLimits.generate.max : 0
            aiLimitGenerateEl.textContent = window.t('createRoom.ai.generateQuota').replace('{remaining}', String(remaining)).replace('{max}', String(max))
          }
          if (aiLimitImproveEl) {
            const remaining = typeof aiLimits.improve.remaining === 'number' ? aiLimits.improve.remaining : 0
            const max = typeof aiLimits.improve.max === 'number' ? aiLimits.improve.max : 0
            aiLimitImproveEl.textContent = window.t('createRoom.ai.optimizeQuota').replace('{remaining}', String(remaining)).replace('{max}', String(max))
          }
        }

        function applyAiLimitsSnapshot(snapshot) {
          if (!snapshot) return
          if (snapshot.generate) {
            aiLimits.generate.remaining = snapshot.generate.remaining
            aiLimits.generate.max = snapshot.generate.max
          }
          if (snapshot.improve) {
            aiLimits.improve.remaining = snapshot.improve.remaining
            aiLimits.improve.max = snapshot.improve.max
          }
          renderAiLimits()
        }

        function getBlankSlotIndexes() {
          const indexes = []
          for (let i = 0; i < slots.length; i += 1) {
            const slot = slots[i]
            if (!slot) continue
            const hasText = (slot.question || '').trim().length > 0
            const hasSaved = typeof slot.savedId === 'string' && slot.savedId.length > 0
            if (!hasText && !hasSaved) {
              indexes.push(i)
            }
          }
          return indexes
        }

        function updateAiCountOptions() {
          if (!aiCountSelect) return
          const options = aiCountSelect.querySelectorAll('option')
          options.forEach(function(option) {
            const value = Number(option.value || '0')
            if (!hasVipAccess && value > NON_VIP_MAX_GENERATE_COUNT) {
              option.disabled = true
            } else {
              option.disabled = false
            }
          })
          if (!hasVipAccess) {
            const currentValue = Number(aiCountSelect.value || '0')
            if (currentValue > NON_VIP_MAX_GENERATE_COUNT) {
              aiCountSelect.value = String(NON_VIP_MAX_GENERATE_COUNT)
            }
          }
        }

        function setCountHint(count) {
          if (!countHintEl) return
          if (vipRequiredCounts.indexOf(count) >= 0) {
            countHintEl.textContent = window.t('createRoom.builder.vipHint')
            countHintEl.style.color = '#7c3aed'
          } else {
            countHintEl.textContent = defaultCountHint
            countHintEl.style.color = ''
          }
        }

        function updateVipUI() {
          countButtons.forEach(function(btn) {
            const value = Number(btn.getAttribute('data-count') || '0')
            const locked = vipRequiredCounts.indexOf(value) >= 0 && !hasVipAccess
            if (locked) {
              btn.setAttribute('data-locked', 'true')
              btn.style.opacity = '0.6'
              btn.style.cursor = 'not-allowed'
              btn.setAttribute('title', window.t('createRoom.builder.vipLocked'))
            } else {
              btn.removeAttribute('data-locked')
              btn.style.opacity = ''
              btn.style.cursor = 'pointer'
              btn.removeAttribute('title')
            }
          })
          if (vipBenefitBox) {
            const shouldShow = entitlementsLoaded && !hasVipAccess && vipRequiredCounts.indexOf(expectedCount) >= 0
            vipBenefitBox.style.display = shouldShow ? 'block' : 'none'
          }
          updateAiCountOptions()
        }

        function handleVipBlocked() {
          if (!vipNoticeActive) {
            vipNoticeActive = true
            showGlobalMessage(window.t('createRoom.builder.vipLocked'), true)
          }
          if (vipBenefitBox) {
            vipBenefitBox.style.display = 'block'
          }
        }

        function ensureVipAccess(count) {
          if (vipRequiredCounts.indexOf(count) >= 0 && !hasVipAccess) {
            handleVipBlocked()
            return false
          }
          return true
        }

        async function loadEntitlements() {
          if (!currentUser) {
            hasVipAccess = false
            entitlementsLoaded = true
            updateVipUI()
            updateAiCountOptions()
            return
          }
          try {
            const res = await fetch('/api/rc/customer', { credentials: 'include' })
            if (res.ok) {
              const json = await res.json()
              const active = Array.isArray(json && json.active) ? json.active.map(function(item) { return String(item) }) : []
              hasVipAccess = active.indexOf(vipEntitlementKey) >= 0
            } else {
              hasVipAccess = false
            }
          } catch (e) {
            console.error('Failed to load entitlements', e)
            hasVipAccess = false
          } finally {
            entitlementsLoaded = true
            updateVipUI()
            updateAiCountOptions()
          }
        }

        async function fetchAiLimits() {
          try {
            const res = await fetch('/api/questions/limits', { credentials: 'include' })
            if (!res.ok) return
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
          } catch (e) {
            console.error('Failed to fetch AI limits', e)
          }
        }

        function renderCountButtons() {
          countButtons.forEach(function(btn) {
            const value = Number(btn.getAttribute('data-count') || '0')
            if (value === expectedCount) {
              btn.classList.add('active')
              btn.style.background = '#6366f1'
              btn.style.color = '#fff'
            } else {
              btn.classList.remove('active')
              btn.style.background = '#f3f4f6'
              btn.style.color = '#111827'
            }
          })
          setCountHint(expectedCount)
          updateVipUI()
          if (aiCountSelect) {
            aiCountSelect.value = String(expectedCount)
          }
        }

        function slotStatusLabel(slot) {
          if (slot.savedId) return window.t('createRoom.builder.status.saved')
          return window.t('createRoom.builder.status.draft')
        }

        function renderSlots() {
          if (!questionGrid) return
          questionGrid.innerHTML = ''
          slots.forEach(function(slot, index) {
            ensureChoiceSize(slot)
            const card = document.createElement('div')
            card.className = 'question-card'
            card.setAttribute('data-index', String(index))
            card.style.border = '1px solid #e5e7eb'
            card.style.borderRadius = '12px'
            card.style.padding = '16px'
            card.style.display = 'grid'
            card.style.gap = '12px'

            let choicesHtml = ''
            for (let i = 0; i < 4; i += 1) {
              const choiceValue = slot.choices[i] || ''
              const checked = slot.correctIndex === i ? 'checked' : ''
              choicesHtml += (
                '<div style="display:flex;gap:8px;align-items:center">' +
                  '<input type="radio" name="correct-' + index + '" value="' + i + '" data-role="correct" ' + checked + ' />' +
                  '<input type="text" data-role="choice" data-choice-index="' + i + '" value="' + escapeHtml(choiceValue) + '" placeholder="' + window.t('questions.form.choicePlaceholder').replace('{count}', String(i + 1)) + '" style="flex:1;padding:9px;border:1px solid #d1d5db;border-radius:8px" />' +
                '</div>'
              )
            }

            const messageColor = slot.messageError ? '#d00' : '#059669'

            card.innerHTML = (
              '<div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap">' +
                '<h3 style="margin:0;font-size:1rem">' + window.t('createRoom.builder.questionLabel').replace('{index}', String(index + 1)) + '</h3>' +
                '<span class="status-tag" style="font-size:0.75rem;padding:4px 10px;border-radius:999px;background:' + (slot.savedId ? '#ecfdf5' : '#f3f4f6') + ';color:' + (slot.savedId ? '#047857' : '#4b5563') + '">' + slotStatusLabel(slot) + '</span>' +
              '</div>' +
              '<textarea data-role="question" placeholder="' + window.t('questions.form.questionPlaceholder') + '" style="width:100%;min-height:96px;padding:12px;border:1px solid #d1d5db;border-radius:8px">' + escapeHtml(slot.question) + '</textarea>' +
              '<div class="choices" style="display:grid;gap:8px">' + choicesHtml + '</div>' +
              '<div style="display:grid;gap:8px">' +
                '<label style="font-size:0.85rem;opacity:0.75">' + window.t('questions.form.keywords') + '</label>' +
                '<input data-role="keywords" type="text" value="' + escapeHtml(slot.keywords) + '" placeholder="' + window.t('questions.form.keywordsPlaceholder') + '" style="padding:9px;border:1px solid #d1d5db;border-radius:8px" />' +
              '</div>' +
              '<div style="display:flex;gap:8px;flex-wrap:wrap">' +
                '<button class="btn btn-primary" type="button" data-action="save">' + window.t('createRoom.builder.saveQuestion') + '</button>' +
                '<button class="btn" type="button" data-action="import">' + window.t('createRoom.builder.import') + '</button>' +
                '<button class="btn" type="button" data-action="clear">' + window.t('createRoom.builder.clear') + '</button>' +
              '</div>' +
              '<p data-role="hint" style="min-height:1em;font-size:0.85rem;margin:0;color:' + messageColor + '">' + escapeHtml(slot.message) + '</p>'
            )

            questionGrid.appendChild(card)
          })
        }

        function setSlotMessage(index, text, isError) {
          const card = questionGrid ? questionGrid.querySelector('[data-index="' + index + '"]') : null
          if (!card) return
          const hint = card.querySelector('[data-role="hint"]')
          if (!hint) return
          hint.textContent = text || ''
          hint.style.color = isError ? '#d00' : '#059669'
        }

        function parseKeywords(value) {
          if (!value) return []
          return String(value)
            .split(/[\\\\s,]+/)
            .map(function(item) { return item.trim() })
            .filter(function(item) { return item.length > 0 })
        }

        function updateSlotFromCard(index, card) {
          const slot = slots[index]
          if (!slot) return
          const questionInput = card.querySelector('[data-role="question"]')
          if (questionInput) {
            slot.question = questionInput.value
          }
          const choiceInputs = card.querySelectorAll('[data-role="choice"]')
          choiceInputs.forEach(function(input) {
            const choiceIndex = Number(input.getAttribute('data-choice-index') || '0')
            slot.choices[choiceIndex] = input.value
          })
          const keywordsInput = card.querySelector('[data-role="keywords"]')
          if (keywordsInput) {
            slot.keywords = keywordsInput.value
          }
        }

        if (questionGrid) {
          questionGrid.addEventListener('input', function(event) {
            const card = event.target && event.target.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return
            updateSlotFromCard(index, card)
            slots[index].message = ''
            slots[index].messageError = false
          })

          questionGrid.addEventListener('change', function(event) {
            const target = event.target
            const card = target && target.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return
            if (target && target.getAttribute('data-role') === 'correct') {
              slots[index].correctIndex = Number(target.value || '0')
            }
          })

          questionGrid.addEventListener('click', function(event) {
            const button = event.target && event.target.closest('[data-action]')
            if (!button) return
            const card = button.closest('[data-index]')
            if (!card) return
            const index = Number(card.getAttribute('data-index') || '0')
            if (Number.isNaN(index) || !slots[index]) return

            if (button.getAttribute('data-action') === 'save') {
              ensureSlotSaved(index)
            } else if (button.getAttribute('data-action') === 'clear') {
              const slot = slots[index]
              if (slot && slot.savedId) {
                const confirmed = window.confirm(window.t('createRoom.builder.clearConfirm'))
                if (!confirmed) return
              }
            slots[index] = createEmptySlot()
            renderSlots()
            scheduleSetSave()
            } else if (button.getAttribute('data-action') === 'import') {
              activeSlotIndex = index
              toggleLibrary(true)
            }
          })
        }

        function scheduleSetSave() {
          if (autoSaveInFlight) return
          if (autoSaveTimer) window.clearTimeout(autoSaveTimer)
          autoSaveTimer = window.setTimeout(function() {
            saveCurrentQuestionSet('draft', true)
          }, 1200)
        }

        async function ensureSlotSaved(index) {
          const slot = slots[index]
          if (!slot) return false
          const question = (slot.question || '').trim()
          if (!question) {
            slot.message = window.t('createRoom.builder.validationQuestion')
            slot.messageError = true
            setSlotMessage(index, slot.message, true)
            return false
          }
          const rawChoices = slot.choices.map(function(choice) { return String(choice || '').trim() })
          const filteredChoices = rawChoices.filter(function(choice) { return choice.length > 0 })
          if (filteredChoices.length < 2) {
            slot.message = window.t('createRoom.builder.validationChoices')
            slot.messageError = true
            setSlotMessage(index, slot.message, true)
            return false
          }
          const correctChoiceRaw = rawChoices[slot.correctIndex] || filteredChoices[0] || ''
          const correctChoice = filteredChoices.indexOf(correctChoiceRaw) >= 0 ? correctChoiceRaw : filteredChoices[0]
          const payload = {
            question: question,
            choices: filteredChoices,
            correctAnswer: correctChoice,
            lang: lang,
            keywords: parseKeywords(slot.keywords),
            status: 'draft',
          }

          try {
            setSlotMessage(index, window.t('createRoom.builder.savingQuestion'), false)
            let res
            if (slot.savedId) {
              res = await fetch('/api/questions/' + slot.savedId, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (!res.ok) {
                const json = await res.json().catch(function() { return {} })
                throw new Error(json.error || window.t('questions.error'))
              }
            } else {
              res = await fetch('/api/questions/create', {
                method: 'POST',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(payload),
              })
              if (!res.ok) {
                const json = await res.json().catch(function() { return {} })
                throw new Error(json.error || window.t('questions.error'))
              }
              const json = await res.json().catch(function() { return {} })
              slot.savedId = json.id
            }
            slot.message = window.t('createRoom.builder.saveSuccessQuestion')
            slot.messageError = false
            setSlotMessage(index, slot.message, false)
            renderSlots()
          scheduleSetSave()
            return true
          } catch (e) {
            const message = e && e.message ? String(e.message) : window.t('questions.error')
            slot.message = message
            slot.messageError = true
            setSlotMessage(index, message, true)
            return false
          }
        }

        async function saveCurrentQuestionSet(status, auto) {
          const savedIds = slots
            .map(function(slot) { return slot.savedId })
            .filter(function(id) { return typeof id === 'string' && id.length > 0 })

          if (status === 'published' && savedIds.length !== expectedCount) {
            showGlobalMessage(window.t('createRoom.builder.publishMismatch').replace('{remaining}', String(expectedCount - savedIds.length)), true)
            return false
          }

          if (!savedIds.length) {
            if (!auto) {
              showGlobalMessage(window.t('createRoom.builder.needQuestions'), true)
            }
            return false
          }

          const title = roomTitleInput ? roomTitleInput.value.trim() : ''
          const payload = {
            title: title || undefined,
            lang: lang,
            questionIds: savedIds,
            expectedCount: expectedCount,
            status: status,
          }

          let endpoint = '/api/question-sets/create'
          let method = 'POST'
          if (state.questionSetId) {
            endpoint = '/api/question-sets/' + state.questionSetId
            method = 'PUT'
          }

          if (auto) {
            autoSaveInFlight = true
            showSaveStatus(window.t('createRoom.builder.autoSaving'), false)
          } else {
            showSaveStatus(window.t('createRoom.builder.saving'), false)
          }

          try {
            const res = await fetch(endpoint, {
              method: method,
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            if (!res.ok) {
              const json = await res.json().catch(function() { return {} })
              throw new Error(json.error || window.t('questionSets.createError'))
            }
            const json = await res.json().catch(function() { return {} })
            if (!state.questionSetId && json && json.id) {
              state.questionSetId = json.id
            }
            if (!auto) {
              const successText = status === 'published' ? window.t('createRoom.builder.publishSuccess') : window.t('createRoom.builder.saveSuccess')
              showGlobalMessage(successText, false)
            }
            showSaveStatus(window.t('createRoom.builder.saveSuccess'), false)
            await upsertTemplate(status)
            if (status === 'published') {
              const templateIdForRoom = state.templateId || state.questionSetId
              await ensureLiveRoom(state.questionSetId, templateIdForRoom)
              markHomeNeedsRefresh()
              currentStatus = 'published'
              updateTemplateTabs()
            }
            loadTemplates(currentStatus, templatesOffset)
            return true
          } catch (e) {
            const message = e && e.message ? String(e.message) : window.t('questionSets.createError')
            showSaveStatus(message, true)
            if (!auto) {
              showGlobalMessage(message, true)
            }
            return false
          } finally {
            if (auto) {
              autoSaveInFlight = false
            }
          }
        }

        async function upsertTemplate(status) {
          if (!state.questionSetId) return
          try {
            const payload = {
              questionSetId: state.questionSetId,
              status: status,
            }
            if (roomTitleInput && roomTitleInput.value) {
              payload.title = roomTitleInput.value.trim()
            }
            const res = await fetch('/api/room-templates', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            if (res.ok) {
              const tplJson = await res.json().catch(function() { return {} })
              if (tplJson && tplJson.template && tplJson.template.id) {
                state.templateId = tplJson.template.id
              }
            }
          } catch (e) {
            console.error('Failed to upsert room template', e)
          }
        }

        function updateQuestionCount(newCount) {
          if (newCount === expectedCount) {
            setCountHint(newCount)
            return
          }
          if (newCount < expectedCount) {
            const removed = slots.slice(newCount)
            const hasSaved = removed.some(function(slot) { return !!slot.savedId })
            if (hasSaved) {
              const confirmMessage = window.t('createRoom.builder.confirmReduce').replace('{count}', String(expectedCount - newCount))
              if (!window.confirm(confirmMessage)) {
                renderCountButtons()
                return
              }
            }
            slots = slots.slice(0, newCount)
          } else {
            for (let i = expectedCount; i < newCount; i += 1) {
              slots.push(createEmptySlot())
            }
          }
          expectedCount = newCount
          renderCountButtons()
          renderSlots()
          scheduleSetSave()
          setCountHint(newCount)
        }

        countButtons.forEach(function(btn) {
          btn.addEventListener('click', function() {
            const value = Number(btn.getAttribute('data-count') || '0')
            if (!allowedCounts.includes(value)) return
            if (!ensureVipAccess(value)) {
              renderCountButtons()
              return
            }
            updateQuestionCount(value)
          })
        })

        if (roomTitleInput) {
          roomTitleInput.addEventListener('input', function() {
            scheduleSetSave()
          })
        }

        if (saveDraftBtn) {
          saveDraftBtn.addEventListener('click', function() {
            saveCurrentQuestionSet('draft', false)
          })
        }

        if (publishBtn) {
          publishBtn.addEventListener('click', async function() {
          for (let i = 0; i < slots.length; i += 1) {
            if (!slots[i].savedId) {
              const ok = await ensureSlotSaved(i)
              if (!ok) {
                showGlobalMessage(window.t('createRoom.builder.publishValidate'), true)
                return
              }
            }
          }
          saveCurrentQuestionSet('published', false)
          })
        }

        function toggleLibrary(show) {
          if (!libraryPanel) return
          libraryPanel.style.display = show ? 'block' : 'none'
          if (show) {
            if (!libraryState.items.length) {
              loadLibrary(true)
            }
          }
        }

        if (openLibraryBtn) {
          openLibraryBtn.addEventListener('click', function() {
            const nextUnsaved = slots.findIndex(function(slot) { return !slot.savedId })
            activeSlotIndex = nextUnsaved >= 0 ? nextUnsaved : 0
            toggleLibrary(true)
          })
        }

        if (closeLibraryBtn) {
          closeLibraryBtn.addEventListener('click', function() {
            toggleLibrary(false)
          })
        }

        if (libraryRefresh) {
          libraryRefresh.addEventListener('click', function() {
            loadLibrary(true)
          })
        }

        if (librarySearch) {
          librarySearch.addEventListener('input', function() {
            const value = librarySearch.value || ''
            libraryState.search = value.trim()
            if (libraryState.loading) return
            window.clearTimeout(libraryState.searchTimer)
            libraryState.searchTimer = window.setTimeout(function() {
              loadLibrary(true)
            }, 400)
          })
        }

        if (libraryList) {
          libraryList.addEventListener('click', function(event) {
            const item = event.target && event.target.closest('[data-question-id]')
            if (!item) return
            const questionId = item.getAttribute('data-question-id')
            const question = libraryState.items.find(function(entry) { return entry.id === questionId })
            if (!question) return
            if (activeSlotIndex === null) activeSlotIndex = 0
            if (!slots[activeSlotIndex]) {
              slots[activeSlotIndex] = createEmptySlot()
            }
            const slot = slots[activeSlotIndex]
            slot.question = question.question || ''
            const importedChoices = Array.isArray(question.choices) ? question.choices.map(function(choice) { return String(choice || '') }) : []
            slot.choices = importedChoices.slice(0, 4)
            ensureChoiceSize(slot)
            const correctIndex = slot.choices.findIndex(function(choice) { return choice === question.correctAnswer })
            slot.correctIndex = correctIndex >= 0 ? correctIndex : 0
            slot.keywords = Array.isArray(question.keywords) ? question.keywords.join(' ') : ''
            slot.savedId = null
            slot.message = window.t('createRoom.builder.imported')
            slot.messageError = false
            renderSlots()
            toggleLibrary(false)
          })
        }

        if (libraryLoadMore) {
          libraryLoadMore.addEventListener('click', function() {
            loadLibrary(false)
          })
        }

        async function loadLibrary(reset) {
          if (libraryState.loading) return
          libraryState.loading = true
          if (reset) {
            libraryState.offset = 0
            libraryState.items = []
            libraryState.hasMore = false
          }
          renderLibrary()
          const params = new URLSearchParams({ limit: '20', offset: String(libraryState.offset) })
          if (libraryState.search) params.set('q', libraryState.search)
          try {
            const res = await fetch('/api/questions/list?' + params.toString(), { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const items = data.questions || []
            libraryState.hasMore = !!data.hasMore
            if (reset) {
              libraryState.items = items
            } else {
              libraryState.items = libraryState.items.concat(items)
            }
            libraryState.offset += items.length
          } catch (e) {
            console.error('Failed to load library', e)
          } finally {
            libraryState.loading = false
            renderLibrary()
          }
        }

        function renderLibrary() {
          if (!libraryList) return
          libraryList.innerHTML = ''
          if (!libraryState.items.length) {
            const empty = document.createElement('p')
            empty.style.textAlign = 'center'
            empty.style.opacity = '0.6'
            empty.style.padding = '16px'
            empty.textContent = libraryState.loading ? window.t('room.loading') : window.t('questionSets.library.empty')
            libraryList.appendChild(empty)
          } else {
            libraryState.items.forEach(function(question) {
              const item = document.createElement('div')
              item.setAttribute('data-question-id', question.id)
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '10px'
              item.style.padding = '14px'
              item.style.display = 'grid'
              item.style.gap = '6px'
              const choices = Array.isArray(question.choices) ? question.choices.slice(0, 4).map(function(choice) { return String(choice || '') }).filter(function(choice) { return choice.length > 0 }) : []
              item.innerHTML = (
                '<div style="font-weight:600">' + question.question + '</div>' +
                '<div style="font-size:0.8rem;opacity:0.65">' + window.t('questionSets.choiceCount').replace('{count}', String(choices.length)) + '</div>' +
                (choices.length ? '<div style="font-size:0.8rem;opacity:0.6">' + choices.join(' · ') + '</div>' : '')
              )
              libraryList.appendChild(item)
            })
          }

          if (libraryStatus) {
            libraryStatus.textContent = libraryState.loading
              ? window.t('questionSets.library.loading')
              : window.t('questionSets.library.selected').replace('{count}', String(libraryState.items.length))
          }
          if (libraryLoadMore) {
            libraryLoadMore.style.display = libraryState.hasMore ? 'inline-flex' : 'none'
          }
        }

        async function initUser() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (!res.ok) {
              currentUser = null
              updateAuthUI(null)
              showAuthBlocker()
              return
            }
            const json = await res.json()
            if (json && json.authenticated && json.user) {
              currentUser = json.user
              updateAuthUI(currentUser)
              hideAuthBlocker()
              return
            }
          } catch (e) {
            console.error('Failed to init user', e)
          }
          currentUser = null
          updateAuthUI(null)
          showAuthBlocker()
        }

        function updateAuthUI(user) {
          // AppHeader 會自行處理使用者顯示，此處僅維持本頁遮罩/提示
          if (user) {
            // no-op for header; keep local blockers in sync elsewhere
          } else {
            // no-op
          }
        }

        function showAuthBlocker() {
          if (authBlocker) {
            authBlocker.style.display = 'flex'
          }
        }

        function hideAuthBlocker() {
          if (authBlocker) {
            authBlocker.style.display = 'none'
          }
        }

        function goToLogin() {
          window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname + window.location.search)
        }

        function formatDateForName(date) {
          const yyyy = date.getFullYear()
          const mm = ('0' + (date.getMonth() + 1)).slice(-2)
          const dd = ('0' + date.getDate()).slice(-2)
          return yyyy + mm + dd
        }

        function defaultRoomTitle() {
          const base = currentUser && currentUser.name ? currentUser.name : window.t('createRoom.form.defaultOwner')
          const today = formatDateForName(new Date())
          return base + ' Quiz ' + today
        }

        function applyDefaultTitle() {
          if (!roomTitleInput) return
          if (!roomTitleInput.value) {
            roomTitleInput.value = defaultRoomTitle()
          }
          const hint = document.getElementById('room-name-hint')
          if (hint) {
            hint.textContent = window.t('createRoom.form.defaultNameHint')
          }
        }

        async function loadExistingSet(setId) {
          try {
            const res = await fetch('/api/question-sets/' + setId, { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const questions = Array.isArray(data.questions) ? data.questions : []
            expectedCount = data.questionIds && data.questionIds.length ? data.questionIds.length : defaultCount
            if (!allowedCounts.includes(expectedCount)) {
              expectedCount = allowedCounts[0]
            }
            if (!hasVipAccess && vipRequiredCounts.indexOf(expectedCount) >= 0) {
              handleVipBlocked()
            }
            slots = []
            questions.forEach(function(question) {
              const slot = createEmptySlot()
              slot.question = question.question || ''
              const choices = Array.isArray(question.choices) ? question.choices.map(function(choice) { return String(choice || '') }) : []
              slot.choices = choices.slice(0, 4)
              ensureChoiceSize(slot)
              const correctIndex = slot.choices.findIndex(function(choice) { return choice === question.correctAnswer })
              slot.correctIndex = correctIndex >= 0 ? correctIndex : 0
              slot.keywords = Array.isArray(question.keywords) ? question.keywords.join(' ') : ''
              slot.savedId = question.id
              slots.push(slot)
            })
            while (slots.length < expectedCount) {
              slots.push(createEmptySlot())
            }
            state.questionSetId = data.id
            if (roomTitleInput) {
              roomTitleInput.value = data.title || ''
            }
            renderCountButtons()
            renderSlots()
          } catch (e) {
            console.error('Failed to load existing set', e)
          }
        }

        async function loadTemplates(status, requestedOffset) {
          if (!templatesList) {
            return
          }
          setupTemplatesPagination()
          const nextOffset = typeof requestedOffset === 'number' && requestedOffset >= 0 ? requestedOffset : 0
          templatesOffset = nextOffset
          templatesList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('room.loading') + '</p>'
          updateTemplatesPagination(0, templatesLimit, templatesOffset)
          try {
            const params = '?status=' + status + '&limit=' + templatesLimit + '&offset=' + templatesOffset
            const res = await fetch('/api/room-templates' + params, { credentials: 'include' })
            if (!res.ok) {
              if (res.status === 401) {
                templatesList.innerHTML = '<p style="padding:16px;text-align:center">' + window.t('createRoom.loginRequired') + '</p>'
                updateTemplatesPagination(0, templatesLimit, 0)
                return
              }
              throw new Error('network')
            }
            const data = await res.json()
            const templates = Array.isArray(data.templates) ? data.templates : []
            const total = typeof data.total === 'number' && data.total >= 0 ? data.total : templates.length
            const limitFromApi = typeof data.limit === 'number' && data.limit > 0 ? data.limit : templatesLimit
            const offsetFromApi = typeof data.offset === 'number' && data.offset >= 0 ? data.offset : templatesOffset
            templatesLimit = limitFromApi
            templatesOffset = offsetFromApi
            if (total > 0 && offsetFromApi >= total && offsetFromApi > 0) {
              const lastOffset = Math.max(Math.floor((total - 1) / limitFromApi) * limitFromApi, 0)
              if (lastOffset !== offsetFromApi) {
                await loadTemplates(status, lastOffset)
                return
              }
            }
            if (!templates.length) {
              templatesList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('createRoom.list.empty') + '</p>'
              updateTemplatesPagination(total, limitFromApi, offsetFromApi)
              return
            }
            templatesList.innerHTML = ''
            templates.forEach(function(tpl) {
              let card = null
              if (window.RoomTemplates && window.RoomTemplates.buildBuilderCard) {
                card = window.RoomTemplates.buildBuilderCard(tpl, { lang: lang, t: window.t })
              }
              if (!card) {
                card = document.createElement('div')
                card.style.border = '1px solid #e5e7eb'
                card.style.borderRadius = '12px'
                card.style.padding = '16px'
                card.style.display = 'grid'
                card.style.gap = '12px'
                card.style.background = '#fff'
                card.setAttribute('data-template-card', 'true')
                if (tpl && tpl.id) card.setAttribute('data-template-id', tpl.id)
                if (tpl && tpl.questionSetId) {
                  card.setAttribute('data-set-id', tpl.questionSetId)
                  card.setAttribute('data-question-set-id', tpl.questionSetId)
                }
                if (tpl && tpl.status) card.setAttribute('data-template-status', tpl.status)
                const questionCount = tpl && tpl.questionSet && tpl.questionSet.questionCount ? tpl.questionSet.questionCount : 0
                const safeTitle = escapeHtml(tpl && tpl.title ? tpl.title : window.t('questionSets.untitled'))
                const updatedAtText = tpl && tpl.updatedAt ? new Date(tpl.updatedAt).toLocaleString() : ''
                card.innerHTML =
                  '<div style="display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap">' +
                    '<div>' +
                      '<div style="font-weight:600;font-size:1.05rem">' + safeTitle + '</div>' +
                      '<div style="font-size:0.85rem;opacity:0.7">' + window.t('questionSets.questionCount').replace('{count}', String(questionCount)) + '</div>' +
                    '</div>' +
                    '<span style="font-size:0.8rem;opacity:0.6;align-self:flex-start">' + updatedAtText + '</span>' +
                  '</div>' +
                  '<div style="display:flex;gap:12px;flex-wrap:wrap">' +
                    '<a class="btn" data-action="edit" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.editQuestions') + '</a>' +
                    (tpl && tpl.status === 'published'
                      ? '<button class="btn" data-action="unpublish" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.unpublish') + '</button>'
                      : '<button class="btn" data-action="publish" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.publish') + '</button>') +
                    '<button class="btn" data-action="delete" data-template-id="' + (tpl && tpl.id ? tpl.id : '') + '" data-set-id="' + (tpl && tpl.questionSetId ? tpl.questionSetId : '') + '">' + window.t('createRoom.card.delete') + '</button>' +
                  '</div>'
              }
              templatesList.appendChild(card)
            })
            updateTemplatesPagination(total, limitFromApi, offsetFromApi)
          } catch (e) {
            console.error('Failed to load templates', e)
            templatesList.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('errors.networkError') + '</p>'
            updateTemplatesPagination(0, templatesLimit, 0)
          }
        }

        if (templatesList) {
          templatesList.addEventListener('click', function(event) {
            const target = event.target && event.target.closest('[data-action]')
            if (!target) return
            const action = target.getAttribute('data-action')
            const card = target.closest('[data-template-card]')
            const templateId = target.getAttribute('data-template-id') || (card ? card.getAttribute('data-template-id') : '')
            const setAttr = target.getAttribute('data-set-id')
            const cardSetAttr = card ? card.getAttribute('data-set-id') || card.getAttribute('data-question-set-id') : ''
            const setId = setAttr || cardSetAttr
            if (!action || !templateId) return
            const previousStatus = card ? card.getAttribute('data-template-status') || '' : ''
            handleTemplateAction(action, templateId, setId || '', previousStatus)
          })
        }

        async function handleTemplateAction(action, id, setId, previousStatus) {
          const wasPublished = previousStatus === 'published'
          try {
            if (action === 'edit') {
              window.location.href = '/' + lang + '/create-room?setId=' + setId + '&templateId=' + id
              return
            }
            if (action === 'delete') {
              if (!window.confirm(window.t('createRoom.card.deleteConfirm'))) return
              const res = await fetch('/api/room-templates/' + id, { method: 'DELETE', credentials: 'include' })
              if (res.ok) {
                const removed = await removeLiveRoom(id)
                if (removed || wasPublished) {
                  markHomeNeedsRefresh()
                }
                if (state.templateId === id) {
                  state.templateId = null
                }
                if (state.questionSetId === id || state.questionSetId === setId) {
                  state.questionSetId = null
                }
              }
            } else if (action === 'publish' || action === 'unpublish') {
              const res = await fetch('/api/room-templates/' + id, {
                method: 'PUT',
                credentials: 'include',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify({ status: action === 'publish' ? 'published' : 'draft' }),
              })
              if (res.ok) {
                const questionSetId = setId || (state.templateId === id ? state.questionSetId : '') || id
                if (action === 'publish') {
                  await ensureLiveRoom(questionSetId, id)
                  markHomeNeedsRefresh()
                  currentStatus = 'published'
                  updateTemplateTabs()
                  templatesOffset = 0
                } else {
                  await removeLiveRoom(id)
                  markHomeNeedsRefresh()
                }
              }
            }
            loadTemplates(currentStatus, templatesOffset)
          } catch (e) {
            console.error('Template action failed', e)
          }
        }

        async function handleAiGenerate() {
          if (aiGenerating) return
          if (!aiPromptInput) return
          const prompt = aiPromptInput.value ? aiPromptInput.value.trim() : ''
          if (!prompt || prompt.length < 12) {
            setAiStatus(window.t('createRoom.ai.promptTooShort'), true)
            showToast(window.t('createRoom.ai.promptTooShort'), 'error')
            return
          }
          const lowerPrompt = prompt.toLowerCase()
          for (let i = 0; i < PROMPT_BLOCKLIST.length; i += 1) {
            const keyword = PROMPT_BLOCKLIST[i]
            if (lowerPrompt.indexOf(keyword) >= 0) {
              setAiStatus(window.t('createRoom.ai.promptBlocked'), true)
              showToast(window.t('createRoom.ai.promptBlocked'), 'error')
              return
            }
          }

          const generateCountRaw = aiCountSelect ? Number(aiCountSelect.value || expectedCount) : expectedCount
          const generateCount = allowedCounts.indexOf(generateCountRaw) >= 0 ? generateCountRaw : expectedCount

          if (!ensureVipAccess(generateCount)) {
            setAiStatus(window.t('createRoom.builder.vipLocked'), true)
            return
          }

          const remainingQuota = typeof aiLimits.generate.remaining === 'number' ? aiLimits.generate.remaining : null
          if (remainingQuota !== null && remainingQuota <= 0) {
            setAiStatus(window.t('createRoom.ai.limitExceeded'), true)
            showToast(window.t('createRoom.ai.limitExceeded'), 'error')
            return
          }

          const blankIndexes = getBlankSlotIndexes()
          if (!blankIndexes.length) {
            setAiStatus(window.t('createRoom.ai.noBlankSlots'), true)
            showToast(window.t('createRoom.ai.noBlankSlots'), 'error')
            return
          }
          if (blankIndexes.length < generateCount) {
            setAiStatus(
              window.t('createRoom.ai.notEnoughBlankSlots')
                .replace('{empty}', String(blankIndexes.length))
                .replace('{requested}', String(generateCount)),
              true
            )
            showToast(
              window.t('createRoom.ai.notEnoughBlankSlots')
                .replace('{empty}', String(blankIndexes.length))
                .replace('{requested}', String(generateCount)),
              'error'
            )
            return
          }

          aiGenerating = true
          if (aiGenerateBtn) aiGenerateBtn.disabled = true
          if (aiImproveBtn) aiImproveBtn.disabled = true
          setAiImproveStatus('', false)
          setAiStatus(window.t('createRoom.ai.generating'), false)

          const targetLang = aiLangSelect ? String(aiLangSelect.value || lang) : lang

          try {
            const payload = {
              prompt: prompt,
              lang: targetLang,
              count: generateCount,
            }
            if (state.questionSetId) {
              payload.setId = state.questionSetId
            }

            const res = await fetch('/api/questions/generate', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
            if (!res.ok) {
              const errorCode = json && json.error ? String(json.error) : 'unknown'
              let message = window.t('createRoom.ai.error')
              if (errorCode === 'quota_exceeded') {
                message = window.t('createRoom.ai.limitExceeded')
              } else if (errorCode === 'count_exceeds_limit') {
                const maxValue = json && typeof json.max === 'number' ? json.max : VIP_MAX_GENERATE_COUNT
                message = window.t('createRoom.ai.countExceeded').replace('{max}', String(maxValue))
              } else if (errorCode === 'prompt_too_short') {
                message = window.t('createRoom.ai.promptTooShort')
              }
              setAiStatus(message, true)
              showToast(message, 'error')
              return
            }

            const generated = Array.isArray(json && json.questions) ? json.questions : []
            if (!generated.length) {
              setAiStatus(window.t('createRoom.ai.error'), true)
              showToast(window.t('createRoom.ai.error'), 'error')
              return
            }

            for (let i = 0; i < generated.length; i += 1) {
              const data = generated[i]
              if (!data) continue
              const slotIndex = blankIndexes[i]
              if (typeof slotIndex !== 'number') continue
              const slot = slots[slotIndex] || createEmptySlot()
              slot.question = data.question || ''
              const choiceList = Array.isArray(data.choices) ? data.choices.map(function(choice) { return String(choice || '') }) : []
              slot.choices = choiceList.slice(0, 4)
              ensureChoiceSize(slot)
              const correctAnswer = data.correctAnswer || data.answer || ''
              let correctIndex = slot.choices.findIndex(function(choice) { return choice === correctAnswer })
              if (correctIndex < 0) {
                correctIndex = 0
              }
              slot.correctIndex = correctIndex
              slot.keywords = Array.isArray(data.keywords) ? data.keywords.join(' ') : ''
              slot.savedId = data.id || null
              slot.message = window.t('createRoom.ai.cardGenerated')
              slot.messageError = false
              slots[slotIndex] = slot
            }

            renderSlots()
            setAiStatus(window.t('createRoom.ai.successHint'), false)
            showToast(window.t('createRoom.ai.generateSuccess').replace('{count}', String(generated.length)), 'success')
            await saveCurrentQuestionSet('draft', true)
          } catch (e) {
            console.error('AI generation failed', e)
            setAiStatus(window.t('createRoom.ai.error'), true)
            showToast(window.t('createRoom.ai.error'), 'error')
          } finally {
            aiGenerating = false
            if (aiGenerateBtn) aiGenerateBtn.disabled = false
            if (!aiImproving && aiImproveBtn) aiImproveBtn.disabled = false
          }
        }

        async function handleAiImprove() {
          if (aiImproving) return
          const remainingQuota = typeof aiLimits.improve.remaining === 'number' ? aiLimits.improve.remaining : null
          if (remainingQuota !== null && remainingQuota <= 0) {
            setAiImproveStatus(window.t('createRoom.ai.limitExceededImprove'), true)
            showToast(window.t('createRoom.ai.limitExceededImprove'), 'error')
            return
          }

          const savedIds = slots
            .map(function(slot) { return slot && typeof slot.savedId === 'string' ? slot.savedId : null })
            .filter(function(id) { return typeof id === 'string' && id })

          if (!savedIds.length) {
            setAiImproveStatus(window.t('createRoom.ai.optimizeEmpty'), true)
            showToast(window.t('createRoom.ai.optimizeEmpty'), 'error')
            return
          }

          aiImproving = true
          if (aiImproveBtn) aiImproveBtn.disabled = true
          if (aiGenerateBtn) aiGenerateBtn.disabled = true
          setAiImproveStatus(window.t('createRoom.ai.optimizing'), false)
          setAiStatus('', false)

          const targetLang = aiLangSelect ? String(aiLangSelect.value || lang) : lang

          try {
            const res = await fetch('/api/questions/improve', {
              method: 'POST',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({ questionIds: savedIds, lang: targetLang }),
            })
            const json = await res.json().catch(function() { return {} })
            if (json && json.limits) {
              applyAiLimitsSnapshot(json.limits)
            }
            if (!res.ok) {
              const errorCode = json && json.error ? String(json.error) : 'unknown'
              let message = window.t('createRoom.ai.error')
              if (errorCode === 'quota_exceeded') {
                message = window.t('createRoom.ai.limitExceededImprove')
              } else if (errorCode === 'no_questions_found') {
                message = window.t('createRoom.ai.optimizeEmpty')
              }
              setAiImproveStatus(message, true)
              showToast(message, 'error')
              return
            }

            const updated = Array.isArray(json && json.questions) ? json.questions : []
            if (!updated.length) {
              setAiImproveStatus(window.t('createRoom.ai.error'), true)
              showToast(window.t('createRoom.ai.error'), 'error')
              return
            }

            updated.forEach(function(data) {
              if (!data || !data.id) return
              const slotIndex = slots.findIndex(function(slot) { return slot && slot.savedId === data.id })
              if (slotIndex < 0) return
              const slot = slots[slotIndex]
              slot.question = data.question || slot.question
              const choiceList = Array.isArray(data.choices) ? data.choices.map(function(choice) { return String(choice || '') }) : []
              if (choiceList.length) {
                slot.choices = choiceList.slice(0, 4)
                ensureChoiceSize(slot)
              }
              const correctAnswer = data.correctAnswer || data.answer || slot.choices[slot.correctIndex] || ''
              const newIndex = slot.choices.findIndex(function(choice) { return choice === correctAnswer })
              slot.correctIndex = newIndex >= 0 ? newIndex : 0
              slot.keywords = Array.isArray(data.keywords) ? data.keywords.join(' ') : slot.keywords
              slot.message = window.t('createRoom.ai.optimizeCard')
              slot.messageError = false
            })

            renderSlots()
            setAiImproveStatus(window.t('createRoom.ai.optimizeSuccess').replace('{count}', String(updated.length)), false)
            showToast(window.t('createRoom.ai.optimizeSuccess').replace('{count}', String(updated.length)), 'success')
            await saveCurrentQuestionSet('draft', true)
          } catch (e) {
            console.error('AI improve failed', e)
            setAiImproveStatus(window.t('createRoom.ai.error'), true)
            showToast(window.t('createRoom.ai.error'), 'error')
          } finally {
            aiImproving = false
            if (aiImproveBtn) aiImproveBtn.disabled = false
            if (!aiGenerating && aiGenerateBtn) aiGenerateBtn.disabled = false
          }
        }

        if (aiGenerateBtn) {
          aiGenerateBtn.addEventListener('click', function() {
            handleAiGenerate()
          })
        }

        if (aiImproveBtn) {
          aiImproveBtn.addEventListener('click', function() {
            handleAiImprove()
          })
        }

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        if (authBlockerBtn) {
          authBlockerBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        tabButtons.forEach(function(btn) {
          btn.addEventListener('click', function() {
            currentStatus = btn.getAttribute('data-status') || 'published'
            updateTemplateTabs()
            templatesOffset = 0
            loadTemplates(currentStatus, 0)
          })
        })

        await initUser()
        await loadEntitlements()
        await fetchAiLimits()
        renderAiLimits()
        applyDefaultTitle()

        slots = []
        for (let i = 0; i < expectedCount; i += 1) {
          slots.push(createEmptySlot())
        }

        renderCountButtons()
        renderSlots()

        if (state.questionSetId) {
          await loadExistingSet(state.questionSetId)
        }

        updateTemplateTabs()
        templatesOffset = 0
        loadTemplates(currentStatus, 0)
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin, "data-astro-cid-mcc5vagp": true }), renderHead(), renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT, "data-astro-cid-mcc5vagp": true }), serverT("home.actions.createRoom"), serverT("createRoom.form.roomName"), addAttribute(serverT("createRoom.form.roomNamePlaceholder"), "placeholder"), serverT("createRoom.builder.countLabel"), serverT("createRoom.builder.countHint"), serverT("createRoom.builder.vipBenefits"), serverT("createRoom.ai.sectionTitle"), serverT("createRoom.ai.description"), serverT("createRoom.ai.promptLabel"), addAttribute(serverT("createRoom.ai.promptPlaceholder"), "placeholder"), serverT("createRoom.ai.promptHint"), serverT("createRoom.ai.langLabel"), serverT("createRoom.ai.lang.en"), serverT("createRoom.ai.lang.zhHant"), serverT("createRoom.ai.lang.zhHans"), serverT("createRoom.ai.lang.ja"), serverT("createRoom.ai.lang.ko"), serverT("createRoom.ai.lang.de"), serverT("createRoom.ai.lang.fr"), serverT("createRoom.ai.countLabel"), serverT("createRoom.ai.generate"), serverT("createRoom.ai.optimize"), serverT("createRoom.ai.blankReminder"), serverT("createRoom.builder.sectionTitle"), serverT("createRoom.builder.autoHint"), serverT("questionSets.library.open"), serverT("createRoom.builder.saveDraft"), serverT("createRoom.builder.publishRoom"), renderComponent($$result, "RoomFooterCTA", $$RoomFooterCTA, { "lang": lang, "serverT": serverT, "data-astro-cid-mcc5vagp": true }), serverT("createRoom.loginRequired"), serverT("auth.login"), serverT("auth.loginWithGoogle"), serverT("questionSets.library.title"), serverT("createRoom.builder.assignHint"), serverT("questionSets.library.close"), addAttribute(serverT("questionSets.library.searchPlaceholder"), "placeholder"), serverT("createRoom.picker.refresh"), serverT("room.loading"), serverT("questionSets.library.loadMore"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/create-room.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/create-room.astro";
const $$url = "/[lang]/create-room";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CreateRoom,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
