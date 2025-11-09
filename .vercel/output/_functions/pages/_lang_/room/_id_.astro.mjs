import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, ah as renderHead, p as renderComponent } from '../../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../../chunks/server-i18n_B6Cgzsxy.mjs';
import { $ as $$SeoMeta } from '../../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$id;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("home.hero.title");
  const desc = serverT("home.hero.subtitle");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", '</head> <body> <a href="#main" class="sr-only">', '</a> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">▼</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> </header> <main class="container hero" id="main"> <div id="app" class="room-shell"></div> </main> <div id="auth-blocker" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:24px"> <div style="max-width:360px;width:100%;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;text-align:center;box-shadow:0 24px 60px rgba(15,23,42,0.28)"> <h2 style="margin:0;font-size:1.25rem">', '</h2> <p style="margin:0;font-size:0.95rem;color:#4b5563">', '</p> <button id="auth-blocker-btn" class="btn btn-primary" style="justify-content:center">', `</button> </div> </div> <script type="module" src="/js/i18n.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const { setupUserMenu } = await import('/js/user-menu.js')
        const app = document.getElementById('app')
        if (!app) {
          console.error('app element not found')
          return
        }
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const roomId = location.pathname.split('/').pop()
        const cookieValue = document.cookie || ''
        const uidMatch = /(?:^|;\\s*)qp_uid=([^;]+)/.exec(cookieValue)
        let currentUid = uidMatch && uidMatch[1] ? uidMatch[1] : ''
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
        let currentUser = null
        let currentUserId = ''
        const userMenu = setupUserMenu({
          lang,
          t: function(key) { return window.t(key) },
          profileUrl: function(targetLang) { return '/' + targetLang + '/profile' },
          aboutUrl: function(targetLang) { return '/' + targetLang + '/about' },
          privacyUrl: function() { return 'https://quizyparty.com/privacy' },
          termsUrl: function() { return 'https://quizyparty.com/terms' },
          onLogout: async function() {
            try {
              await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
            } catch (e) {
              console.error('Logout failed', e)
            }
            window.location.reload()
          }
        })
        const authBlocker = document.getElementById('auth-blocker')
        const authBlockerBtn = document.getElementById('auth-blocker-btn')

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
          })
        }
        if (authBlockerBtn) {
          authBlockerBtn.addEventListener('click', function() {
            window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
          })
        }

        async function checkAuth() {
          try {
            const response = await fetch('/api/auth/me', { credentials: 'include' })
            if (!response.ok) {
              if (authBtn) authBtn.style.display = 'block'
              if (userInfo) userInfo.style.display = 'none'
              if (userMenu && typeof userMenu.clearUser === 'function') {
                userMenu.clearUser()
              }
              if (authBlocker) authBlocker.style.display = 'flex'
              return null
            }
            const data = await response.json()
            if (data && data.authenticated && data.user) {
              if (authBtn) authBtn.style.display = 'none'
              if (userInfo) userInfo.style.display = 'flex'
              if (userMenu && typeof userMenu.applyUser === 'function') {
                userMenu.applyUser(data.user)
              }
              currentUser = data.user
              currentUserId = data.user.id || ''
              if (authBlocker) authBlocker.style.display = 'none'
              return data.user
            }
            if (authBtn) authBtn.style.display = 'block'
            if (userInfo) userInfo.style.display = 'none'
            if (userMenu && typeof userMenu.clearUser === 'function') {
              userMenu.clearUser()
            }
            currentUser = null
            currentUserId = ''
            if (authBlocker) authBlocker.style.display = 'flex'
            return null
          } catch (e) {
            console.error('Auth check failed', e)
            if (authBtn) authBtn.style.display = 'block'
            if (userInfo) userInfo.style.display = 'none'
            if (userMenu && typeof userMenu.clearUser === 'function') {
              userMenu.clearUser()
            }
            currentUser = null
            currentUserId = ''
            if (authBlocker) authBlocker.style.display = 'flex'
            return null
          }
        }

        const authUser = await checkAuth()
        if (authUser && authUser.id) {
          currentUser = authUser
          currentUserId = authUser.id
        }
        if (!roomId) {
          app.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('room.invalidRoomId') + '</p><a class="btn" href="/' + lang + '/">' + window.t('room.backToHome') + '</a>'
          return
        }
        async function api(p, init) {
          try {
            const opts = { credentials: 'include' }
            if (init && init.method) opts.method = init.method
            if (init && init.headers) opts.headers = init.headers
            if (init && init.body) opts.body = init.body
            const r = await fetch(p, opts)
            return r.ok ? r.json() : null
          } catch (e) {
            console.error('API error:', p, e)
            return null
          }
        }
        let state = null
        let errorMsg = ''
        const selectedChoices = {}
        const MAX_COUNTDOWN_SECONDS = 15
        const MAX_ANSWER_TIME_MS = 15000
        let countdownSeconds = MAX_COUNTDOWN_SECONDS
        let countdownTimer = null
        let questionStartAt = Date.now()
        let lastQuestionSignature = ''
        let leaderboardData = null
        let leaderboardHash = ''
        let leaderboardLoading = false
        let leaderboardTimer = null
        let isLeaderboardOpen = false

        function formatCountdown(value) {
          const safeValue = value > 0 ? value : 0
          const minutes = Math.floor(safeValue / 60)
          const seconds = safeValue % 60
          const minuteText = String(minutes).length < 2 ? '0' + String(minutes) : String(minutes)
          const secondText = String(seconds).length < 2 ? '0' + String(seconds) : String(seconds)
          return minuteText + ':' + secondText
        }

        function stopCountdown() {
          if (countdownTimer) {
            clearInterval(countdownTimer)
            countdownTimer = null
          }
        }

        function updateCountdownDisplay() {
          const valueEl = document.querySelector('[data-role="timer-value"]')
          if (!valueEl) return
          valueEl.textContent = formatCountdown(countdownSeconds)
          if (countdownSeconds <= 5) {
            valueEl.classList.add('is-critical')
          } else {
            valueEl.classList.remove('is-critical')
          }
        }

        function startCountdown() {
          stopCountdown()
          countdownSeconds = MAX_COUNTDOWN_SECONDS
          updateCountdownDisplay()
          countdownTimer = window.setInterval(function() {
            countdownSeconds = countdownSeconds - 1
            if (countdownSeconds <= 0) {
              countdownSeconds = 0
              stopCountdown()
            }
            updateCountdownDisplay()
          }, 1000)
        }

        function escapeHtml(input) {
          if (input === null || input === undefined) return ''
          return String(input)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function formatSecondsFromMs(ms) {
          const seconds = Math.max(0, Number(ms) || 0) / 1000
          if (seconds >= 10) {
            return String(Math.round(seconds)) + 's'
          }
          return seconds.toFixed(1) + 's'
        }

        function formatPercent(value) {
          const percent = Math.round(Math.max(0, Math.min(1, Number(value) || 0)) * 100)
          return percent + '%'
        }

        function getLeaderboardEntries() {
          if (!leaderboardData || !Array.isArray(leaderboardData.entries)) return []
          return leaderboardData.entries
        }

        function buildHeroSection() {
          const title = window.t('room.heroes.title')
          const subtitle = window.t('room.heroes.subtitle')
          const emptyText = window.t('room.heroes.empty')
          const viewText = window.t('room.heroes.viewBoard')
          const joinPrompt = window.t('room.heroes.joinPrompt')
          const joinAction = window.t('room.heroes.joinAction')
          const entries = getLeaderboardEntries()
          const heroes = Array.isArray(leaderboardData?.heroes) && leaderboardData.heroes.length
            ? leaderboardData.heroes
            : entries.slice(0, 10)
          const hasEntries = heroes.length > 0
          const userJoined = !!(leaderboardData && leaderboardData.currentUser)

          const avatars = heroes.map(function(hero) {
            return (
              "<button type='button' class='room-hero-avatar' data-action='view-leaderboard' title='" + escapeHtml(hero.name || '') + "'>" +
                "<img src='" + escapeHtml(hero.avatar || '') + "' alt='" + escapeHtml(hero.name || '') + "' />" +
                "<span class='room-hero-rank'>#" + hero.rank + "</span>" +
              "</button>"
            )
          }).join('')

          const callToAction = !userJoined
            ? "<div class='room-heroes-cta'>" +
                "<span>" + joinPrompt + "</span>" +
                "<button class='btn btn-primary' data-action='view-leaderboard'>" + joinAction + "</button>" +
              "</div>"
            : ''

          return (
            "<section class='room-heroes'>" +
              "<div class='room-heroes-header'>" +
                "<div class='room-heroes-text'>" +
                  "<div class='room-heroes-title'>" + title + "</div>" +
                  "<div class='room-heroes-subtitle'>" + subtitle + "</div>" +
                "</div>" +
                "<button class='btn room-heroes-view' data-action='view-leaderboard'>" + viewText + "</button>" +
              "</div>" +
              (hasEntries
                ? "<div class='room-heroes-avatars'>" + avatars + "</div>"
                : "<div class='room-heroes-empty'>" + emptyText + "</div>") +
              callToAction +
            "</section>"
          )
        }

        function buildLeaderboardTable(limit, highlightId) {
          const entries = getLeaderboardEntries()
          if (!entries.length) {
            return { rows: '', hasEntries: false, containsHighlight: false, totalEntries: 0 }
          }
          const limited = typeof limit === 'number' && limit > 0 ? entries.slice(0, limit) : entries
          let containsHighlight = false
          const rows = limited.map(function(entry) {
            const accuracyText = formatPercent(entry.accuracy)
            const avgTimeText = formatSecondsFromMs(entry.averageTimeMs)
            const fastestText = entry.fastestTimeMs != null ? formatSecondsFromMs(entry.fastestTimeMs) : '—'
            const isHighlight = !!(highlightId && entry.userId === highlightId)
            if (isHighlight) containsHighlight = true
            return (
              "<tr" + (isHighlight ? " class='is-highlight'" : '') + ">" +
                "<td class='room-summary-rank'>#" + entry.rank + "</td>" +
                "<td class='room-summary-player'>" +
                  "<div class='room-summary-player-chip'>" +
                    "<img src='" + escapeHtml(entry.avatar || '') + "' alt='" + escapeHtml(entry.name || '') + "' />" +
                    "<span>" + escapeHtml(entry.name || '') + "</span>" +
                  "</div>" +
                "</td>" +
                "<td class='room-summary-score'>" + entry.score + "</td>" +
                "<td class='room-summary-total'>" + entry.totalCorrect + "/" + entry.totalAnswered + "</td>" +
                "<td class='room-summary-accuracy'>" + accuracyText + "</td>" +
                "<td class='room-summary-time'>" + avgTimeText + "</td>" +
                "<td class='room-summary-time'>" + fastestText + "</td>" +
              "</tr>"
            )
          }).join('')
          return { rows, hasEntries: true, containsHighlight, totalEntries: entries.length }
        }

        function buildCurrentUserRow() {
          if (!leaderboardData || !leaderboardData.currentUser) return ''
          const entry = leaderboardData.currentUser
          const accuracyText = formatPercent(entry.accuracy)
          const avgTimeText = formatSecondsFromMs(entry.averageTimeMs)
          const fastestText = entry.fastestTimeMs != null ? formatSecondsFromMs(entry.fastestTimeMs) : '—'
          return (
            "<tr class='is-highlight'>" +
              "<td class='room-summary-rank'>#" + entry.rank + "</td>" +
              "<td class='room-summary-player'>" +
                "<div class='room-summary-player-chip'>" +
                  "<img src='" + escapeHtml(entry.avatar || '') + "' alt='" + escapeHtml(entry.name || '') + "' />" +
                  "<span>" + escapeHtml(entry.name || '') + "</span>" +
                "</div>" +
              "</td>" +
              "<td class='room-summary-score'>" + entry.score + "</td>" +
              "<td class='room-summary-total'>" + entry.totalCorrect + "/" + entry.totalAnswered + "</td>" +
              "<td class='room-summary-accuracy'>" + accuracyText + "</td>" +
              "<td class='room-summary-time'>" + avgTimeText + "</td>" +
              "<td class='room-summary-time'>" + fastestText + "</td>" +
            "</tr>"
          )
        }

        function buildLeaderboardModal() {
          if (!isLeaderboardOpen) return ''
          const title = window.t('room.leaderboard.title')
          const closeText = window.t('room.leaderboard.close')
          const scoreLabel = window.t('room.leaderboard.score')
          const rankLabel = window.t('room.leaderboard.rank')
          const playerLabel = window.t('room.leaderboard.player')
          const answeredLabel = window.t('room.leaderboard.totalAnswered')
          const accuracyLabel = window.t('room.leaderboard.accuracy')
          const avgTimeLabel = window.t('room.leaderboard.averageTime')
          const fastestLabel = window.t('room.leaderboard.fastestTime')
          const loadingText = window.t('room.leaderboard.loading')
          const outOfRangeText = window.t('room.leaderboard.outOfRange')
          const currentRankTemplate = window.t('room.leaderboard.outOfTop')

          if (leaderboardLoading && (!leaderboardData || !leaderboardData.entries)) {
            return "<div class='room-modal is-active'><div class='room-modal-backdrop' data-action='close-leaderboard'></div><div class='room-modal-content'><div class='room-modal-header'><h3>" + title + "</h3><button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button></div><div class='room-modal-body'><p>" + loadingText + "</p></div></div></div>"
          }

          const table = buildLeaderboardTable(0, currentUserId)
          if (!table.hasEntries) {
            return "<div class='room-modal is-active'><div class='room-modal-backdrop' data-action='close-leaderboard'></div><div class='room-modal-content'><div class='room-modal-header'><h3>" + title + "</h3><button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button></div><div class='room-modal-body'><p>" + (leaderboardLoading ? loadingText : window.t('room.heroes.empty')) + "</p></div></div></div>"
          }
          const currentRow = buildCurrentUserRow()
          const currentRankText = leaderboardData && leaderboardData.currentUser
            ? currentRankTemplate.replace('{rank}', String(leaderboardData.currentUser.rank))
            : outOfRangeText

          return (
            "<div class='room-modal is-active'>" +
              "<div class='room-modal-backdrop' data-action='close-leaderboard'></div>" +
              "<div class='room-modal-content'>" +
                "<div class='room-modal-header'>" +
                  "<h3>" + title + "</h3>" +
                  "<button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button>" +
                "</div>" +
                "<div class='room-modal-body'>" +
                  "<div class='room-summary-table-wrapper'>" +
                    "<table class='room-summary-table'>" +
                      "<thead>" +
                        "<tr>" +
                          "<th class='room-summary-rank'>" + rankLabel + "</th>" +
                          "<th class='room-summary-player'>" + playerLabel + "</th>" +
                          "<th class='room-summary-score'>" + scoreLabel + "</th>" +
                          "<th class='room-summary-total'>" + answeredLabel + "</th>" +
                          "<th class='room-summary-accuracy'>" + accuracyLabel + "</th>" +
                          "<th class='room-summary-time'>" + avgTimeLabel + "</th>" +
                          "<th class='room-summary-time'>" + fastestLabel + "</th>" +
                        "</tr>" +
                      "</thead>" +
                      "<tbody>" + table.rows + "</tbody>" +
                    "</table>" +
                  "</div>" +
                  "<div class='room-modal-footer'>" + currentRankText + "</div>" +
                  (
                    currentRow && !table.containsHighlight
                      ? "<table class='room-summary-table room-summary-table-self'><tbody>" + currentRow + "</tbody></table>"
                      : ''
                  ) +
                "</div>" +
              "</div>" +
            "</div>"
          )
        }

        async function refreshLeaderboard(forceRender) {
          if (!roomId) return
          if (leaderboardLoading) return
          leaderboardLoading = true
          try {
            const response = await fetch('/api/rooms/' + roomId + '/leaderboard', { credentials: 'include' })
            if (!response.ok) return
            const data = await response.json()
            const hash = JSON.stringify(data || {})
            if (hash !== leaderboardHash) {
              leaderboardHash = hash
              leaderboardData = data
              if (forceRender) {
                render()
              }
            }
          } catch (e) {
            console.error('Failed to load leaderboard', e)
          } finally {
            leaderboardLoading = false
          }
        }
        async function init() {
          const joinResult = await api('/api/rooms/' + roomId + '/join', { method:'POST' })
          if (joinResult && joinResult.memberId) {
            currentUid = String(joinResult.memberId)
          }
          if (!joinResult) {
            errorMsg = window.t('errors.joinRoomFailed')
            try {
              const res = await fetch('/api/rooms/' + roomId + '/join', { method:'POST', credentials:'include' })
              if (!res.ok) {
                const json = await res.json()
                if (json && json.error === 'room_full_upgrade_required') {
                  errorMsg = window.t('errors.roomFullUpgrade')
                } else if (json && json.error === 'room_full') {
                  errorMsg = window.t('errors.roomFull')
                }
              }
            } catch {}
            render()
            return
          }
          state = await api('/api/rooms/' + roomId + '/state')
          if (!state) {
            errorMsg = window.t('errors.roomNotFound')
            render()
            return
          }
          render()
          refreshLeaderboard(true)
          if (!leaderboardTimer) {
            leaderboardTimer = window.setInterval(function() {
              refreshLeaderboard(false)
            }, 10000)
          }
        }
        function render() {
          if (errorMsg) {
            stopCountdown()
            app.innerHTML = (
              '<div style="display:grid;gap:12px;padding:16px">' +
                '<p style="color:#d00;margin:0">' + errorMsg + '</p>' +
                '<a class="btn" href="/' + lang + '/">' + window.t('room.backToHome') + '</a>' +
              '</div>'
            )
            return
          }
          if (!state) {
            stopCountdown()
            app.innerHTML = '<p style="padding:16px">' + window.t('room.loading') + '</p>'
            return
          }
          const isHost = state.hostId && currentUid && state.hostId === currentUid
          const completed = !!state.completed
          const total = Number(state.total || 0)
          const rawIndex = Number(state.currentIndex || 0)
          const currentNumber = completed ? total : (total > 0 ? Math.min(rawIndex + 1, total) : rawIndex + 1)
          const remaining = completed ? 0 : Math.max(total - currentNumber, 0)
          const progressBase = completed ? total : currentNumber
          const progressPercent = total > 0 ? Math.min(100, Math.round(progressBase / total * 100)) : 0
          const percentText = String(progressPercent) + '%'
          const q = state.question
          let content = '<p style="padding:16px;opacity:0.7">' + window.t('room.waitingHost') + '</p>'
          const heroSection = buildHeroSection()
          const modalHtml = buildLeaderboardModal()

          if (completed) {
            stopCountdown()
            const analytics = state.analytics || {}
            const summaryTitle = window.t('room.summary.title')
            const summarySubtitle = window.t('room.summary.subtitle')
            const totalAnswers = typeof analytics.totalAnswers === 'number' ? analytics.totalAnswers : 0
            const uniquePlayers = typeof analytics.uniqueResponders === 'number' ? analytics.uniqueResponders : 0
            const averageAccuracy = typeof analytics.averageAccuracy === 'number' ? analytics.averageAccuracy : 0
            const averagePercent = Math.round(averageAccuracy * 100)
            const totalAnswersLabel = window.t('room.summary.totalAnswersLabel')
            const uniquePlayersLabel = window.t('room.summary.uniquePlayersLabel')
            const averageAccuracyLabel = window.t('room.summary.averageAccuracyLabel')
            const leaderboardTitle = window.t('room.summary.tableTitle')
            const loadingLeaderboardText = window.t('room.summary.loadingLeaderboard')
            const yourRankingTitle = window.t('room.summary.yourRanking')
            const joinPrompt = window.t('room.heroes.joinPrompt')
            const joinAction = window.t('room.heroes.joinAction')
            const tableData = buildLeaderboardTable(10, currentUserId)
            let leaderboardHtml = ''
            if (leaderboardLoading && !tableData.hasEntries) {
              leaderboardHtml = "<p class='room-summary-empty'>" + loadingLeaderboardText + "</p>"
            } else if (tableData.hasEntries) {
              leaderboardHtml = (
                "<div class='room-summary-leaderboard'>" +
                  "<div class='room-summary-section-title'>" + leaderboardTitle + "</div>" +
                  "<div class='room-summary-table-wrapper'>" +
                    "<table class='room-summary-table'>" +
                      "<thead>" +
                        "<tr>" +
                          "<th class='room-summary-rank'>" + window.t('room.leaderboard.rank') + "</th>" +
                          "<th class='room-summary-player'>" + window.t('room.leaderboard.player') + "</th>" +
                          "<th class='room-summary-score'>" + window.t('room.leaderboard.score') + "</th>" +
                          "<th class='room-summary-total'>" + window.t('room.leaderboard.totalAnswered') + "</th>" +
                          "<th class='room-summary-accuracy'>" + window.t('room.leaderboard.accuracy') + "</th>" +
                          "<th class='room-summary-time'>" + window.t('room.leaderboard.averageTime') + "</th>" +
                          "<th class='room-summary-time'>" + window.t('room.leaderboard.fastestTime') + "</th>" +
                        "</tr>" +
                      "</thead>" +
                      "<tbody>" + tableData.rows + "</tbody>" +
                    "</table>" +
                  "</div>" +
                "</div>"
              )
            } else {
              leaderboardHtml = "<p class='room-summary-empty'>" + window.t('room.heroes.empty') + "</p>"
            }

            let currentUserSummary = ''
            if (leaderboardData && leaderboardData.currentUser) {
              const currentRow = buildCurrentUserRow()
              if (currentRow && !tableData.containsHighlight) {
                currentUserSummary =
                  "<div class='room-summary-leaderboard room-summary-leaderboard-self'>" +
                    "<div class='room-summary-section-title'>" + yourRankingTitle + "</div>" +
                    "<div class='room-summary-table-wrapper'>" +
                      "<table class='room-summary-table room-summary-table-self'><tbody>" + currentRow + "</tbody></table>" +
                    "</div>" +
                  "</div>"
              }
            } else {
              currentUserSummary =
                "<div class='room-summary-cta'>" +
                  "<span>" + joinPrompt + "</span>" +
                  "<button class='btn btn-primary' data-action='view-leaderboard'>" + joinAction + "</button>" +
                "</div>"
            }

            content = (
              "<div class='room-summary-card'>" +
                "<div class='room-summary-header'>" +
                  "<h2>" + summaryTitle + "</h2>" +
                  "<p>" + summarySubtitle + "</p>" +
                "</div>" +
                "<div class='room-summary-metrics'>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + totalAnswers + "</span><span class='room-summary-metric-label'>" + totalAnswersLabel + "</span></div>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + uniquePlayers + "</span><span class='room-summary-metric-label'>" + uniquePlayersLabel + "</span></div>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + averagePercent + "%</span><span class='room-summary-metric-label'>" + averageAccuracyLabel + "</span></div>" +
                "</div>" +
                leaderboardHtml +
                currentUserSummary +
              "</div>"
            )
          } else if (q && q.question && q.choices && q.choices.length > 0) {
            const questionId = q.id || String(state.currentIndex)
            const selectedChoice = selectedChoices[questionId] || ''
            const buttons = q.choices.map(function(c, i) {
              const value = String(c)
              const number = String(i + 1)
              const dataValue = value.replace(/'/g, "&#39;")
              const isSelected = selectedChoice && selectedChoice === value
              const classes = 'btn choice-btn' + (isSelected ? ' is-selected' : '')
              const badge = isSelected ? "<span class='choice-selected'>" + window.t('room.choiceSelected') + "</span>" : ''
              const titleText = window.t('room.choiceNumberLabel').replace('{index}', number)
              return "<button type='button' class='" + classes + "' data-choice='" + dataValue + "' data-choice-index='" + number + "' title='" + titleText.replace(/"/g, '&quot;') + "'><span class='choice-index' aria-hidden='true'>" + number + "</span><span class='choice-text'>" + value + "</span>" + badge + "</button>"
            }).join('')
            const progressText = window.t('room.progressLabel')
              .replace('{current}', String(currentNumber))
              .replace('{total}', String(total))
            const remainingText = window.t('room.remainingLabel').replace('{remaining}', String(remaining))
            const timerLabel = window.t('room.timerLabel')
            const timerValue = formatCountdown(countdownSeconds)
            content = (
              "<div class='room-question-card'>" +
                "<div class='room-progress-card'>" +
                  "<div class='room-progress-text'>" +
                    "<span>" + progressText + "</span>" +
                    "<span class='room-progress-percent'>" + percentText + "</span>" +
                  "</div>" +
                  "<div class='room-progress-meta'>" +
                    "<span class='room-progress-remaining'>" + remainingText + "</span>" +
                    "<span class='room-timer' data-role='timer'>" +
                      "<span class='room-timer-label'>" + timerLabel + "</span>" +
                      "<span class='room-timer-value' data-role='timer-value'>" + timerValue + "</span>" +
                    "</span>" +
                  "</div>" +
                  "<div class='room-progress-bar'><div class='room-progress-bar-fill' style='width:" + progressPercent + "%'></div></div>" +
                "</div>" +
                "<h2 class='room-question-text'>" + String(q.question) + "</h2>" +
                "<div class='choice-grid'>" + buttons + "</div>" +
              "</div>"
            )
          }

          const memberCount = state.members ? state.members.length : 0
          const roomIdLabel = window.t('room.roomIdLabel')
          const showNextButton = !completed && isHost
          const isLastQuestion = !completed && total > 0 && Math.max(state.currentIndex || 0, 0) >= total - 1
          const nextLabel = isLastQuestion ? window.t('room.viewResults') : window.t('room.nextQuestion')
          const summaryActions = completed
            ? "<div class='room-summary-actions'><a class='btn btn-primary' href='" + '/' + lang + '/' + "'>" + window.t('room.backToHome') + "</a></div>"
            : ''
          const shellContent = (
            "<div class='room-shell'>" +
              "<section class='room-meta'>" +
                "<div class='room-meta-card'>" +
                  "<div class='room-meta-item'><span class='room-meta-label'>" + roomIdLabel + ":</span> <code class='room-meta-code'>" + roomId + "</code></div>" +
                  "<div class='room-meta-item'><span class='room-meta-label'>" + window.t('room.members') + ":</span> <span>" + memberCount + "</span></div>" +
              "</div>" +
              "</section>" +
              heroSection +
              content +
              summaryActions +
              (showNextButton ? "<button id='next' class='btn btn-primary room-next-button'>" + nextLabel + "</button>" : '') +
            "</div>"
          )
          app.innerHTML = shellContent + modalHtml

          const signature = completed
            ? 'completed'
            : (state.question ? (state.id + ':' + state.currentIndex + ':' + (state.question.id || '')) : 'waiting')
          if (signature !== lastQuestionSignature) {
            lastQuestionSignature = signature
            if (!completed && state.question) {
              questionStartAt = Date.now()
              startCountdown()
              refreshLeaderboard(false)
            } else {
              stopCountdown()
              refreshLeaderboard(true)
            }
          }
          if (!completed && state.question) {
            updateCountdownDisplay()
          }
          const viewButtons = app.querySelectorAll('[data-action="view-leaderboard"]')
          viewButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
              isLeaderboardOpen = true
              refreshLeaderboard(true)
              render()
            })
          })
          const closeButtons = app.querySelectorAll('[data-action="close-leaderboard"]')
          closeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
              isLeaderboardOpen = false
              render()
            })
          })
        }
        async function submitChoice(btn) {
          if (!btn || btn.disabled || (btn.classList && btn.classList.contains('is-submitting'))) return
          if (!state || !state.question) return
          if (!currentUserId) {
            if (authBlocker) authBlocker.style.display = 'flex'
            return
          }
          const choiceValue = btn.getAttribute('data-choice')
          const questionId = state.question.id || String(state.currentIndex)
          if (!choiceValue) return
          if (choiceValue && questionId) {
            selectedChoices[questionId] = choiceValue
          }
          const siblingButtons = app.querySelectorAll('button[data-choice]')
          for (var i = 0; i < siblingButtons.length; i++) {
            const item = siblingButtons[i]
            if (item && item.classList) {
              item.classList.remove('is-selected')
              item.classList.remove('is-submitting')
              const tag = item.querySelector('.choice-selected')
              if (tag && tag.parentNode) {
                tag.parentNode.removeChild(tag)
              }
            }
          }
          if (btn.classList) {
            btn.classList.add('is-selected')
          }
          if (!btn.querySelector('.choice-selected')) {
            const badge = document.createElement('span')
            badge.className = 'choice-selected'
            badge.textContent = window.t('room.choiceSelected')
            btn.appendChild(badge)
          }
          btn.disabled = true
          if (btn.classList) {
            btn.classList.add('is-submitting')
          }
          const elapsedMs = Math.max(0, Math.min(MAX_ANSWER_TIME_MS, Date.now() - questionStartAt))
          await api('/api/rooms/' + roomId + '/answer', {
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({ index: state.currentIndex, choice: choiceValue, timeSpentMs: elapsedMs })
          })
          btn.disabled = false
          if (btn.classList) {
            btn.classList.remove('is-submitting')
          }
          const refreshedState = await api('/api/rooms/' + roomId + '/state')
          if (refreshedState) {
            state = refreshedState
          }
          render()
          refreshLeaderboard(true)
          const nextButtonAfter = document.getElementById('next')
          if (nextButtonAfter && state && state.hostId && currentUid && state.hostId === currentUid) {
            try {
              nextButtonAfter.focus()
            } catch (focusError) {
              console.warn('Unable to move focus to next button', focusError)
            }
          }
        }

        function handleKeydown(event) {
          if (event.key === 'Escape' && isLeaderboardOpen) {
            isLeaderboardOpen = false
            render()
            return
          }
          if (event.key !== 'Enter') return
          if (!state) return
          const activeElement = document.activeElement
          if (activeElement && activeElement.getAttribute && activeElement.getAttribute('data-choice')) {
            event.preventDefault()
            submitChoice(activeElement).catch(function(err){ console.error('submit choice failed', err) })
            return
          }
          const nextBtn = document.getElementById('next')
          if (nextBtn && !nextBtn.disabled) {
            event.preventDefault()
            nextBtn.click()
            return
          }
          const selectedBtn = app.querySelector('.choice-btn.is-selected')
          if (selectedBtn) {
            event.preventDefault()
            submitChoice(selectedBtn).catch(function(err){ console.error('submit choice failed', err) })
          }
        }

        document.addEventListener('keydown', handleKeydown)
        app.addEventListener('click', async function(e){
          const next = e.target.closest('#next')
          if (next && state) {
            next.disabled = true
            next.textContent = window.t('room.nextQuestionLoading')
            const newState = await api('/api/rooms/' + roomId + '/advance', { method:'POST' })
            if (newState) {
              state = newState
              render()
            } else {
              next.disabled = false
              next.textContent = window.t('room.nextQuestionRetry')
            }
            return
          }
          const btn = e.target.closest('button[data-choice]')
          if (btn && state && state.question) {
            submitChoice(btn).catch(function(err){ console.error('submit choice failed', err) })
          }
        })
        setInterval(async function(){
          if (!state) return
          const s = await api('/api/rooms/' + roomId + '/state')
          if (s) {
            state = s
            render()
          }
        }, 2000)
        await init()
        window.addEventListener('beforeunload', function(){
          stopCountdown()
          if (leaderboardTimer) {
            clearInterval(leaderboardTimer)
            leaderboardTimer = null
          }
          document.removeEventListener('keydown', handleKeydown)
        })
      })()
    </script> </body> </html>`], ["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", '</head> <body> <a href="#main" class="sr-only">', '</a> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">▼</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> </header> <main class="container hero" id="main"> <div id="app" class="room-shell"></div> </main> <div id="auth-blocker" style="display:none;position:fixed;inset:0;z-index:80;background:rgba(15,23,42,0.7);backdrop-filter:blur(4px);align-items:center;justify-content:center;padding:24px"> <div style="max-width:360px;width:100%;background:#fff;border-radius:16px;padding:24px;display:grid;gap:16px;text-align:center;box-shadow:0 24px 60px rgba(15,23,42,0.28)"> <h2 style="margin:0;font-size:1.25rem">', '</h2> <p style="margin:0;font-size:0.95rem;color:#4b5563">', '</p> <button id="auth-blocker-btn" class="btn btn-primary" style="justify-content:center">', `</button> </div> </div> <script type="module" src="/js/i18n.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const { setupUserMenu } = await import('/js/user-menu.js')
        const app = document.getElementById('app')
        if (!app) {
          console.error('app element not found')
          return
        }
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const roomId = location.pathname.split('/').pop()
        const cookieValue = document.cookie || ''
        const uidMatch = /(?:^|;\\\\s*)qp_uid=([^;]+)/.exec(cookieValue)
        let currentUid = uidMatch && uidMatch[1] ? uidMatch[1] : ''
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
        let currentUser = null
        let currentUserId = ''
        const userMenu = setupUserMenu({
          lang,
          t: function(key) { return window.t(key) },
          profileUrl: function(targetLang) { return '/' + targetLang + '/profile' },
          aboutUrl: function(targetLang) { return '/' + targetLang + '/about' },
          privacyUrl: function() { return 'https://quizyparty.com/privacy' },
          termsUrl: function() { return 'https://quizyparty.com/terms' },
          onLogout: async function() {
            try {
              await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' })
            } catch (e) {
              console.error('Logout failed', e)
            }
            window.location.reload()
          }
        })
        const authBlocker = document.getElementById('auth-blocker')
        const authBlockerBtn = document.getElementById('auth-blocker-btn')

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
          })
        }
        if (authBlockerBtn) {
          authBlockerBtn.addEventListener('click', function() {
            window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(window.location.pathname)
          })
        }

        async function checkAuth() {
          try {
            const response = await fetch('/api/auth/me', { credentials: 'include' })
            if (!response.ok) {
              if (authBtn) authBtn.style.display = 'block'
              if (userInfo) userInfo.style.display = 'none'
              if (userMenu && typeof userMenu.clearUser === 'function') {
                userMenu.clearUser()
              }
              if (authBlocker) authBlocker.style.display = 'flex'
              return null
            }
            const data = await response.json()
            if (data && data.authenticated && data.user) {
              if (authBtn) authBtn.style.display = 'none'
              if (userInfo) userInfo.style.display = 'flex'
              if (userMenu && typeof userMenu.applyUser === 'function') {
                userMenu.applyUser(data.user)
              }
              currentUser = data.user
              currentUserId = data.user.id || ''
              if (authBlocker) authBlocker.style.display = 'none'
              return data.user
            }
            if (authBtn) authBtn.style.display = 'block'
            if (userInfo) userInfo.style.display = 'none'
            if (userMenu && typeof userMenu.clearUser === 'function') {
              userMenu.clearUser()
            }
            currentUser = null
            currentUserId = ''
            if (authBlocker) authBlocker.style.display = 'flex'
            return null
          } catch (e) {
            console.error('Auth check failed', e)
            if (authBtn) authBtn.style.display = 'block'
            if (userInfo) userInfo.style.display = 'none'
            if (userMenu && typeof userMenu.clearUser === 'function') {
              userMenu.clearUser()
            }
            currentUser = null
            currentUserId = ''
            if (authBlocker) authBlocker.style.display = 'flex'
            return null
          }
        }

        const authUser = await checkAuth()
        if (authUser && authUser.id) {
          currentUser = authUser
          currentUserId = authUser.id
        }
        if (!roomId) {
          app.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('room.invalidRoomId') + '</p><a class="btn" href="/' + lang + '/">' + window.t('room.backToHome') + '</a>'
          return
        }
        async function api(p, init) {
          try {
            const opts = { credentials: 'include' }
            if (init && init.method) opts.method = init.method
            if (init && init.headers) opts.headers = init.headers
            if (init && init.body) opts.body = init.body
            const r = await fetch(p, opts)
            return r.ok ? r.json() : null
          } catch (e) {
            console.error('API error:', p, e)
            return null
          }
        }
        let state = null
        let errorMsg = ''
        const selectedChoices = {}
        const MAX_COUNTDOWN_SECONDS = 15
        const MAX_ANSWER_TIME_MS = 15000
        let countdownSeconds = MAX_COUNTDOWN_SECONDS
        let countdownTimer = null
        let questionStartAt = Date.now()
        let lastQuestionSignature = ''
        let leaderboardData = null
        let leaderboardHash = ''
        let leaderboardLoading = false
        let leaderboardTimer = null
        let isLeaderboardOpen = false

        function formatCountdown(value) {
          const safeValue = value > 0 ? value : 0
          const minutes = Math.floor(safeValue / 60)
          const seconds = safeValue % 60
          const minuteText = String(minutes).length < 2 ? '0' + String(minutes) : String(minutes)
          const secondText = String(seconds).length < 2 ? '0' + String(seconds) : String(seconds)
          return minuteText + ':' + secondText
        }

        function stopCountdown() {
          if (countdownTimer) {
            clearInterval(countdownTimer)
            countdownTimer = null
          }
        }

        function updateCountdownDisplay() {
          const valueEl = document.querySelector('[data-role="timer-value"]')
          if (!valueEl) return
          valueEl.textContent = formatCountdown(countdownSeconds)
          if (countdownSeconds <= 5) {
            valueEl.classList.add('is-critical')
          } else {
            valueEl.classList.remove('is-critical')
          }
        }

        function startCountdown() {
          stopCountdown()
          countdownSeconds = MAX_COUNTDOWN_SECONDS
          updateCountdownDisplay()
          countdownTimer = window.setInterval(function() {
            countdownSeconds = countdownSeconds - 1
            if (countdownSeconds <= 0) {
              countdownSeconds = 0
              stopCountdown()
            }
            updateCountdownDisplay()
          }, 1000)
        }

        function escapeHtml(input) {
          if (input === null || input === undefined) return ''
          return String(input)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }

        function formatSecondsFromMs(ms) {
          const seconds = Math.max(0, Number(ms) || 0) / 1000
          if (seconds >= 10) {
            return String(Math.round(seconds)) + 's'
          }
          return seconds.toFixed(1) + 's'
        }

        function formatPercent(value) {
          const percent = Math.round(Math.max(0, Math.min(1, Number(value) || 0)) * 100)
          return percent + '%'
        }

        function getLeaderboardEntries() {
          if (!leaderboardData || !Array.isArray(leaderboardData.entries)) return []
          return leaderboardData.entries
        }

        function buildHeroSection() {
          const title = window.t('room.heroes.title')
          const subtitle = window.t('room.heroes.subtitle')
          const emptyText = window.t('room.heroes.empty')
          const viewText = window.t('room.heroes.viewBoard')
          const joinPrompt = window.t('room.heroes.joinPrompt')
          const joinAction = window.t('room.heroes.joinAction')
          const entries = getLeaderboardEntries()
          const heroes = Array.isArray(leaderboardData?.heroes) && leaderboardData.heroes.length
            ? leaderboardData.heroes
            : entries.slice(0, 10)
          const hasEntries = heroes.length > 0
          const userJoined = !!(leaderboardData && leaderboardData.currentUser)

          const avatars = heroes.map(function(hero) {
            return (
              "<button type='button' class='room-hero-avatar' data-action='view-leaderboard' title='" + escapeHtml(hero.name || '') + "'>" +
                "<img src='" + escapeHtml(hero.avatar || '') + "' alt='" + escapeHtml(hero.name || '') + "' />" +
                "<span class='room-hero-rank'>#" + hero.rank + "</span>" +
              "</button>"
            )
          }).join('')

          const callToAction = !userJoined
            ? "<div class='room-heroes-cta'>" +
                "<span>" + joinPrompt + "</span>" +
                "<button class='btn btn-primary' data-action='view-leaderboard'>" + joinAction + "</button>" +
              "</div>"
            : ''

          return (
            "<section class='room-heroes'>" +
              "<div class='room-heroes-header'>" +
                "<div class='room-heroes-text'>" +
                  "<div class='room-heroes-title'>" + title + "</div>" +
                  "<div class='room-heroes-subtitle'>" + subtitle + "</div>" +
                "</div>" +
                "<button class='btn room-heroes-view' data-action='view-leaderboard'>" + viewText + "</button>" +
              "</div>" +
              (hasEntries
                ? "<div class='room-heroes-avatars'>" + avatars + "</div>"
                : "<div class='room-heroes-empty'>" + emptyText + "</div>") +
              callToAction +
            "</section>"
          )
        }

        function buildLeaderboardTable(limit, highlightId) {
          const entries = getLeaderboardEntries()
          if (!entries.length) {
            return { rows: '', hasEntries: false, containsHighlight: false, totalEntries: 0 }
          }
          const limited = typeof limit === 'number' && limit > 0 ? entries.slice(0, limit) : entries
          let containsHighlight = false
          const rows = limited.map(function(entry) {
            const accuracyText = formatPercent(entry.accuracy)
            const avgTimeText = formatSecondsFromMs(entry.averageTimeMs)
            const fastestText = entry.fastestTimeMs != null ? formatSecondsFromMs(entry.fastestTimeMs) : '—'
            const isHighlight = !!(highlightId && entry.userId === highlightId)
            if (isHighlight) containsHighlight = true
            return (
              "<tr" + (isHighlight ? " class='is-highlight'" : '') + ">" +
                "<td class='room-summary-rank'>#" + entry.rank + "</td>" +
                "<td class='room-summary-player'>" +
                  "<div class='room-summary-player-chip'>" +
                    "<img src='" + escapeHtml(entry.avatar || '') + "' alt='" + escapeHtml(entry.name || '') + "' />" +
                    "<span>" + escapeHtml(entry.name || '') + "</span>" +
                  "</div>" +
                "</td>" +
                "<td class='room-summary-score'>" + entry.score + "</td>" +
                "<td class='room-summary-total'>" + entry.totalCorrect + "/" + entry.totalAnswered + "</td>" +
                "<td class='room-summary-accuracy'>" + accuracyText + "</td>" +
                "<td class='room-summary-time'>" + avgTimeText + "</td>" +
                "<td class='room-summary-time'>" + fastestText + "</td>" +
              "</tr>"
            )
          }).join('')
          return { rows, hasEntries: true, containsHighlight, totalEntries: entries.length }
        }

        function buildCurrentUserRow() {
          if (!leaderboardData || !leaderboardData.currentUser) return ''
          const entry = leaderboardData.currentUser
          const accuracyText = formatPercent(entry.accuracy)
          const avgTimeText = formatSecondsFromMs(entry.averageTimeMs)
          const fastestText = entry.fastestTimeMs != null ? formatSecondsFromMs(entry.fastestTimeMs) : '—'
          return (
            "<tr class='is-highlight'>" +
              "<td class='room-summary-rank'>#" + entry.rank + "</td>" +
              "<td class='room-summary-player'>" +
                "<div class='room-summary-player-chip'>" +
                  "<img src='" + escapeHtml(entry.avatar || '') + "' alt='" + escapeHtml(entry.name || '') + "' />" +
                  "<span>" + escapeHtml(entry.name || '') + "</span>" +
                "</div>" +
              "</td>" +
              "<td class='room-summary-score'>" + entry.score + "</td>" +
              "<td class='room-summary-total'>" + entry.totalCorrect + "/" + entry.totalAnswered + "</td>" +
              "<td class='room-summary-accuracy'>" + accuracyText + "</td>" +
              "<td class='room-summary-time'>" + avgTimeText + "</td>" +
              "<td class='room-summary-time'>" + fastestText + "</td>" +
            "</tr>"
          )
        }

        function buildLeaderboardModal() {
          if (!isLeaderboardOpen) return ''
          const title = window.t('room.leaderboard.title')
          const closeText = window.t('room.leaderboard.close')
          const scoreLabel = window.t('room.leaderboard.score')
          const rankLabel = window.t('room.leaderboard.rank')
          const playerLabel = window.t('room.leaderboard.player')
          const answeredLabel = window.t('room.leaderboard.totalAnswered')
          const accuracyLabel = window.t('room.leaderboard.accuracy')
          const avgTimeLabel = window.t('room.leaderboard.averageTime')
          const fastestLabel = window.t('room.leaderboard.fastestTime')
          const loadingText = window.t('room.leaderboard.loading')
          const outOfRangeText = window.t('room.leaderboard.outOfRange')
          const currentRankTemplate = window.t('room.leaderboard.outOfTop')

          if (leaderboardLoading && (!leaderboardData || !leaderboardData.entries)) {
            return "<div class='room-modal is-active'><div class='room-modal-backdrop' data-action='close-leaderboard'></div><div class='room-modal-content'><div class='room-modal-header'><h3>" + title + "</h3><button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button></div><div class='room-modal-body'><p>" + loadingText + "</p></div></div></div>"
          }

          const table = buildLeaderboardTable(0, currentUserId)
          if (!table.hasEntries) {
            return "<div class='room-modal is-active'><div class='room-modal-backdrop' data-action='close-leaderboard'></div><div class='room-modal-content'><div class='room-modal-header'><h3>" + title + "</h3><button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button></div><div class='room-modal-body'><p>" + (leaderboardLoading ? loadingText : window.t('room.heroes.empty')) + "</p></div></div></div>"
          }
          const currentRow = buildCurrentUserRow()
          const currentRankText = leaderboardData && leaderboardData.currentUser
            ? currentRankTemplate.replace('{rank}', String(leaderboardData.currentUser.rank))
            : outOfRangeText

          return (
            "<div class='room-modal is-active'>" +
              "<div class='room-modal-backdrop' data-action='close-leaderboard'></div>" +
              "<div class='room-modal-content'>" +
                "<div class='room-modal-header'>" +
                  "<h3>" + title + "</h3>" +
                  "<button class='btn btn-link' data-action='close-leaderboard'>" + closeText + "</button>" +
                "</div>" +
                "<div class='room-modal-body'>" +
                  "<div class='room-summary-table-wrapper'>" +
                    "<table class='room-summary-table'>" +
                      "<thead>" +
                        "<tr>" +
                          "<th class='room-summary-rank'>" + rankLabel + "</th>" +
                          "<th class='room-summary-player'>" + playerLabel + "</th>" +
                          "<th class='room-summary-score'>" + scoreLabel + "</th>" +
                          "<th class='room-summary-total'>" + answeredLabel + "</th>" +
                          "<th class='room-summary-accuracy'>" + accuracyLabel + "</th>" +
                          "<th class='room-summary-time'>" + avgTimeLabel + "</th>" +
                          "<th class='room-summary-time'>" + fastestLabel + "</th>" +
                        "</tr>" +
                      "</thead>" +
                      "<tbody>" + table.rows + "</tbody>" +
                    "</table>" +
                  "</div>" +
                  "<div class='room-modal-footer'>" + currentRankText + "</div>" +
                  (
                    currentRow && !table.containsHighlight
                      ? "<table class='room-summary-table room-summary-table-self'><tbody>" + currentRow + "</tbody></table>"
                      : ''
                  ) +
                "</div>" +
              "</div>" +
            "</div>"
          )
        }

        async function refreshLeaderboard(forceRender) {
          if (!roomId) return
          if (leaderboardLoading) return
          leaderboardLoading = true
          try {
            const response = await fetch('/api/rooms/' + roomId + '/leaderboard', { credentials: 'include' })
            if (!response.ok) return
            const data = await response.json()
            const hash = JSON.stringify(data || {})
            if (hash !== leaderboardHash) {
              leaderboardHash = hash
              leaderboardData = data
              if (forceRender) {
                render()
              }
            }
          } catch (e) {
            console.error('Failed to load leaderboard', e)
          } finally {
            leaderboardLoading = false
          }
        }
        async function init() {
          const joinResult = await api('/api/rooms/' + roomId + '/join', { method:'POST' })
          if (joinResult && joinResult.memberId) {
            currentUid = String(joinResult.memberId)
          }
          if (!joinResult) {
            errorMsg = window.t('errors.joinRoomFailed')
            try {
              const res = await fetch('/api/rooms/' + roomId + '/join', { method:'POST', credentials:'include' })
              if (!res.ok) {
                const json = await res.json()
                if (json && json.error === 'room_full_upgrade_required') {
                  errorMsg = window.t('errors.roomFullUpgrade')
                } else if (json && json.error === 'room_full') {
                  errorMsg = window.t('errors.roomFull')
                }
              }
            } catch {}
            render()
            return
          }
          state = await api('/api/rooms/' + roomId + '/state')
          if (!state) {
            errorMsg = window.t('errors.roomNotFound')
            render()
            return
          }
          render()
          refreshLeaderboard(true)
          if (!leaderboardTimer) {
            leaderboardTimer = window.setInterval(function() {
              refreshLeaderboard(false)
            }, 10000)
          }
        }
        function render() {
          if (errorMsg) {
            stopCountdown()
            app.innerHTML = (
              '<div style="display:grid;gap:12px;padding:16px">' +
                '<p style="color:#d00;margin:0">' + errorMsg + '</p>' +
                '<a class="btn" href="/' + lang + '/">' + window.t('room.backToHome') + '</a>' +
              '</div>'
            )
            return
          }
          if (!state) {
            stopCountdown()
            app.innerHTML = '<p style="padding:16px">' + window.t('room.loading') + '</p>'
            return
          }
          const isHost = state.hostId && currentUid && state.hostId === currentUid
          const completed = !!state.completed
          const total = Number(state.total || 0)
          const rawIndex = Number(state.currentIndex || 0)
          const currentNumber = completed ? total : (total > 0 ? Math.min(rawIndex + 1, total) : rawIndex + 1)
          const remaining = completed ? 0 : Math.max(total - currentNumber, 0)
          const progressBase = completed ? total : currentNumber
          const progressPercent = total > 0 ? Math.min(100, Math.round(progressBase / total * 100)) : 0
          const percentText = String(progressPercent) + '%'
          const q = state.question
          let content = '<p style="padding:16px;opacity:0.7">' + window.t('room.waitingHost') + '</p>'
          const heroSection = buildHeroSection()
          const modalHtml = buildLeaderboardModal()

          if (completed) {
            stopCountdown()
            const analytics = state.analytics || {}
            const summaryTitle = window.t('room.summary.title')
            const summarySubtitle = window.t('room.summary.subtitle')
            const totalAnswers = typeof analytics.totalAnswers === 'number' ? analytics.totalAnswers : 0
            const uniquePlayers = typeof analytics.uniqueResponders === 'number' ? analytics.uniqueResponders : 0
            const averageAccuracy = typeof analytics.averageAccuracy === 'number' ? analytics.averageAccuracy : 0
            const averagePercent = Math.round(averageAccuracy * 100)
            const totalAnswersLabel = window.t('room.summary.totalAnswersLabel')
            const uniquePlayersLabel = window.t('room.summary.uniquePlayersLabel')
            const averageAccuracyLabel = window.t('room.summary.averageAccuracyLabel')
            const leaderboardTitle = window.t('room.summary.tableTitle')
            const loadingLeaderboardText = window.t('room.summary.loadingLeaderboard')
            const yourRankingTitle = window.t('room.summary.yourRanking')
            const joinPrompt = window.t('room.heroes.joinPrompt')
            const joinAction = window.t('room.heroes.joinAction')
            const tableData = buildLeaderboardTable(10, currentUserId)
            let leaderboardHtml = ''
            if (leaderboardLoading && !tableData.hasEntries) {
              leaderboardHtml = "<p class='room-summary-empty'>" + loadingLeaderboardText + "</p>"
            } else if (tableData.hasEntries) {
              leaderboardHtml = (
                "<div class='room-summary-leaderboard'>" +
                  "<div class='room-summary-section-title'>" + leaderboardTitle + "</div>" +
                  "<div class='room-summary-table-wrapper'>" +
                    "<table class='room-summary-table'>" +
                      "<thead>" +
                        "<tr>" +
                          "<th class='room-summary-rank'>" + window.t('room.leaderboard.rank') + "</th>" +
                          "<th class='room-summary-player'>" + window.t('room.leaderboard.player') + "</th>" +
                          "<th class='room-summary-score'>" + window.t('room.leaderboard.score') + "</th>" +
                          "<th class='room-summary-total'>" + window.t('room.leaderboard.totalAnswered') + "</th>" +
                          "<th class='room-summary-accuracy'>" + window.t('room.leaderboard.accuracy') + "</th>" +
                          "<th class='room-summary-time'>" + window.t('room.leaderboard.averageTime') + "</th>" +
                          "<th class='room-summary-time'>" + window.t('room.leaderboard.fastestTime') + "</th>" +
                        "</tr>" +
                      "</thead>" +
                      "<tbody>" + tableData.rows + "</tbody>" +
                    "</table>" +
                  "</div>" +
                "</div>"
              )
            } else {
              leaderboardHtml = "<p class='room-summary-empty'>" + window.t('room.heroes.empty') + "</p>"
            }

            let currentUserSummary = ''
            if (leaderboardData && leaderboardData.currentUser) {
              const currentRow = buildCurrentUserRow()
              if (currentRow && !tableData.containsHighlight) {
                currentUserSummary =
                  "<div class='room-summary-leaderboard room-summary-leaderboard-self'>" +
                    "<div class='room-summary-section-title'>" + yourRankingTitle + "</div>" +
                    "<div class='room-summary-table-wrapper'>" +
                      "<table class='room-summary-table room-summary-table-self'><tbody>" + currentRow + "</tbody></table>" +
                    "</div>" +
                  "</div>"
              }
            } else {
              currentUserSummary =
                "<div class='room-summary-cta'>" +
                  "<span>" + joinPrompt + "</span>" +
                  "<button class='btn btn-primary' data-action='view-leaderboard'>" + joinAction + "</button>" +
                "</div>"
            }

            content = (
              "<div class='room-summary-card'>" +
                "<div class='room-summary-header'>" +
                  "<h2>" + summaryTitle + "</h2>" +
                  "<p>" + summarySubtitle + "</p>" +
                "</div>" +
                "<div class='room-summary-metrics'>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + totalAnswers + "</span><span class='room-summary-metric-label'>" + totalAnswersLabel + "</span></div>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + uniquePlayers + "</span><span class='room-summary-metric-label'>" + uniquePlayersLabel + "</span></div>" +
                  "<div class='room-summary-metric'><span class='room-summary-metric-value'>" + averagePercent + "%</span><span class='room-summary-metric-label'>" + averageAccuracyLabel + "</span></div>" +
                "</div>" +
                leaderboardHtml +
                currentUserSummary +
              "</div>"
            )
          } else if (q && q.question && q.choices && q.choices.length > 0) {
            const questionId = q.id || String(state.currentIndex)
            const selectedChoice = selectedChoices[questionId] || ''
            const buttons = q.choices.map(function(c, i) {
              const value = String(c)
              const number = String(i + 1)
              const dataValue = value.replace(/'/g, "&#39;")
              const isSelected = selectedChoice && selectedChoice === value
              const classes = 'btn choice-btn' + (isSelected ? ' is-selected' : '')
              const badge = isSelected ? "<span class='choice-selected'>" + window.t('room.choiceSelected') + "</span>" : ''
              const titleText = window.t('room.choiceNumberLabel').replace('{index}', number)
              return "<button type='button' class='" + classes + "' data-choice='" + dataValue + "' data-choice-index='" + number + "' title='" + titleText.replace(/"/g, '&quot;') + "'><span class='choice-index' aria-hidden='true'>" + number + "</span><span class='choice-text'>" + value + "</span>" + badge + "</button>"
            }).join('')
            const progressText = window.t('room.progressLabel')
              .replace('{current}', String(currentNumber))
              .replace('{total}', String(total))
            const remainingText = window.t('room.remainingLabel').replace('{remaining}', String(remaining))
            const timerLabel = window.t('room.timerLabel')
            const timerValue = formatCountdown(countdownSeconds)
            content = (
              "<div class='room-question-card'>" +
                "<div class='room-progress-card'>" +
                  "<div class='room-progress-text'>" +
                    "<span>" + progressText + "</span>" +
                    "<span class='room-progress-percent'>" + percentText + "</span>" +
                  "</div>" +
                  "<div class='room-progress-meta'>" +
                    "<span class='room-progress-remaining'>" + remainingText + "</span>" +
                    "<span class='room-timer' data-role='timer'>" +
                      "<span class='room-timer-label'>" + timerLabel + "</span>" +
                      "<span class='room-timer-value' data-role='timer-value'>" + timerValue + "</span>" +
                    "</span>" +
                  "</div>" +
                  "<div class='room-progress-bar'><div class='room-progress-bar-fill' style='width:" + progressPercent + "%'></div></div>" +
                "</div>" +
                "<h2 class='room-question-text'>" + String(q.question) + "</h2>" +
                "<div class='choice-grid'>" + buttons + "</div>" +
              "</div>"
            )
          }

          const memberCount = state.members ? state.members.length : 0
          const roomIdLabel = window.t('room.roomIdLabel')
          const showNextButton = !completed && isHost
          const isLastQuestion = !completed && total > 0 && Math.max(state.currentIndex || 0, 0) >= total - 1
          const nextLabel = isLastQuestion ? window.t('room.viewResults') : window.t('room.nextQuestion')
          const summaryActions = completed
            ? "<div class='room-summary-actions'><a class='btn btn-primary' href='" + '/' + lang + '/' + "'>" + window.t('room.backToHome') + "</a></div>"
            : ''
          const shellContent = (
            "<div class='room-shell'>" +
              "<section class='room-meta'>" +
                "<div class='room-meta-card'>" +
                  "<div class='room-meta-item'><span class='room-meta-label'>" + roomIdLabel + ":</span> <code class='room-meta-code'>" + roomId + "</code></div>" +
                  "<div class='room-meta-item'><span class='room-meta-label'>" + window.t('room.members') + ":</span> <span>" + memberCount + "</span></div>" +
              "</div>" +
              "</section>" +
              heroSection +
              content +
              summaryActions +
              (showNextButton ? "<button id='next' class='btn btn-primary room-next-button'>" + nextLabel + "</button>" : '') +
            "</div>"
          )
          app.innerHTML = shellContent + modalHtml

          const signature = completed
            ? 'completed'
            : (state.question ? (state.id + ':' + state.currentIndex + ':' + (state.question.id || '')) : 'waiting')
          if (signature !== lastQuestionSignature) {
            lastQuestionSignature = signature
            if (!completed && state.question) {
              questionStartAt = Date.now()
              startCountdown()
              refreshLeaderboard(false)
            } else {
              stopCountdown()
              refreshLeaderboard(true)
            }
          }
          if (!completed && state.question) {
            updateCountdownDisplay()
          }
          const viewButtons = app.querySelectorAll('[data-action="view-leaderboard"]')
          viewButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
              isLeaderboardOpen = true
              refreshLeaderboard(true)
              render()
            })
          })
          const closeButtons = app.querySelectorAll('[data-action="close-leaderboard"]')
          closeButtons.forEach(function(btn) {
            btn.addEventListener('click', function() {
              isLeaderboardOpen = false
              render()
            })
          })
        }
        async function submitChoice(btn) {
          if (!btn || btn.disabled || (btn.classList && btn.classList.contains('is-submitting'))) return
          if (!state || !state.question) return
          if (!currentUserId) {
            if (authBlocker) authBlocker.style.display = 'flex'
            return
          }
          const choiceValue = btn.getAttribute('data-choice')
          const questionId = state.question.id || String(state.currentIndex)
          if (!choiceValue) return
          if (choiceValue && questionId) {
            selectedChoices[questionId] = choiceValue
          }
          const siblingButtons = app.querySelectorAll('button[data-choice]')
          for (var i = 0; i < siblingButtons.length; i++) {
            const item = siblingButtons[i]
            if (item && item.classList) {
              item.classList.remove('is-selected')
              item.classList.remove('is-submitting')
              const tag = item.querySelector('.choice-selected')
              if (tag && tag.parentNode) {
                tag.parentNode.removeChild(tag)
              }
            }
          }
          if (btn.classList) {
            btn.classList.add('is-selected')
          }
          if (!btn.querySelector('.choice-selected')) {
            const badge = document.createElement('span')
            badge.className = 'choice-selected'
            badge.textContent = window.t('room.choiceSelected')
            btn.appendChild(badge)
          }
          btn.disabled = true
          if (btn.classList) {
            btn.classList.add('is-submitting')
          }
          const elapsedMs = Math.max(0, Math.min(MAX_ANSWER_TIME_MS, Date.now() - questionStartAt))
          await api('/api/rooms/' + roomId + '/answer', {
            method:'POST',
            headers:{'content-type':'application/json'},
            body: JSON.stringify({ index: state.currentIndex, choice: choiceValue, timeSpentMs: elapsedMs })
          })
          btn.disabled = false
          if (btn.classList) {
            btn.classList.remove('is-submitting')
          }
          const refreshedState = await api('/api/rooms/' + roomId + '/state')
          if (refreshedState) {
            state = refreshedState
          }
          render()
          refreshLeaderboard(true)
          const nextButtonAfter = document.getElementById('next')
          if (nextButtonAfter && state && state.hostId && currentUid && state.hostId === currentUid) {
            try {
              nextButtonAfter.focus()
            } catch (focusError) {
              console.warn('Unable to move focus to next button', focusError)
            }
          }
        }

        function handleKeydown(event) {
          if (event.key === 'Escape' && isLeaderboardOpen) {
            isLeaderboardOpen = false
            render()
            return
          }
          if (event.key !== 'Enter') return
          if (!state) return
          const activeElement = document.activeElement
          if (activeElement && activeElement.getAttribute && activeElement.getAttribute('data-choice')) {
            event.preventDefault()
            submitChoice(activeElement).catch(function(err){ console.error('submit choice failed', err) })
            return
          }
          const nextBtn = document.getElementById('next')
          if (nextBtn && !nextBtn.disabled) {
            event.preventDefault()
            nextBtn.click()
            return
          }
          const selectedBtn = app.querySelector('.choice-btn.is-selected')
          if (selectedBtn) {
            event.preventDefault()
            submitChoice(selectedBtn).catch(function(err){ console.error('submit choice failed', err) })
          }
        }

        document.addEventListener('keydown', handleKeydown)
        app.addEventListener('click', async function(e){
          const next = e.target.closest('#next')
          if (next && state) {
            next.disabled = true
            next.textContent = window.t('room.nextQuestionLoading')
            const newState = await api('/api/rooms/' + roomId + '/advance', { method:'POST' })
            if (newState) {
              state = newState
              render()
            } else {
              next.disabled = false
              next.textContent = window.t('room.nextQuestionRetry')
            }
            return
          }
          const btn = e.target.closest('button[data-choice]')
          if (btn && state && state.question) {
            submitChoice(btn).catch(function(err){ console.error('submit choice failed', err) })
          }
        })
        setInterval(async function(){
          if (!state) return
          const s = await api('/api/rooms/' + roomId + '/state')
          if (s) {
            state = s
            render()
          }
        }, 2000)
        await init()
        window.addEventListener('beforeunload', function(){
          stopCountdown()
          if (leaderboardTimer) {
            clearInterval(leaderboardTimer)
            leaderboardTimer = null
          }
          document.removeEventListener('keydown', handleKeydown)
        })
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), serverT("a11y.skipToContent"), addAttribute(`/${lang}/`, "href"), serverT("nav.home"), serverT("auth.login"), serverT("room.loginRequired"), serverT("auth.login"), serverT("auth.loginWithGoogle"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/room/[id].astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/room/[id].astro";
const $$url = "/[lang]/room/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
