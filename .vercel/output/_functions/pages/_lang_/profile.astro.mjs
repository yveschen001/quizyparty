import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, p as renderComponent, ah as renderHead } from '../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../chunks/server-i18n_B6Cgzsxy.mjs';
import { $ as $$SeoMeta } from '../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                    */
import { $ as $$AppHeader } from '../../chunks/AppHeader_Ceo4wj6R.mjs';
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("profile.title");
  const desc = serverT("profile.desc");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", "</head> <body", '> <a href="#main" class="sr-only">', "</a> ", ' <main id="main"', "> <section", '> <div class="flex-between"> <div', "> <h1", ">", "</h1> <p", "> ", ' </p> </div> <div class="tab-row" role="tablist"', '> <button id="scope-all"', ' type="button" role="tab" data-scope="all" aria-selected="true" aria-controls="stats-panel"', ' tabindex="0">', '</button> <button id="scope-30d"', ' type="button" role="tab" data-scope="30d" aria-selected="false" aria-controls="stats-panel"', ' tabindex="-1">', '</button> <button id="open-settings" class="icon-btn" type="button"', "", ' aria-controls="settings-modal"> <span aria-hidden="true">⚙️</span><span class="sr-only">', '</span> </button> </div> </div> <div id="stats-message"', '></div> <div id="stats-panel"', "> <article", " data-stat-card> <h2", "> ", ' </h2> <p id="stats-total" class="stat-value" data-stat-value>\n0\n</p> </article> <article', " data-stat-card> <h2", "> ", ' </h2> <p id="stats-accuracy" class="stat-value" data-stat-value>\n0%\n</p> </article> <article', " data-stat-card> <h2", "> ", ' </h2> <p id="stats-points" class="stat-value" data-stat-value>\n0\n</p> </article> <article', " data-stat-card> <h2", "> ", ' </h2> <p id="stats-rank" class="stat-value" data-stat-value>\n—\n</p> <span id="stats-percentile" class="caption text-muted"></span> </article> </div> </section> <section id="v2-cards" class="stack-lg is-hidden"> <div class="card-grid"> <a class="card card-link stack"', ' role="link"', "> <div", '> <h3 class="h3 no-margin"> ', " </h3> ", " </div> <p", "> ", ' </p> <div> <span class="btn btn-primary" aria-hidden="true">', '</span> </div> </a> <a class="card card-link stack"', ' role="link"', "> <div", '> <h3 class="h3 no-margin"> ', " </h3> ", " </div> <p", "> ", ' </p> <div> <span class="btn btn-primary" aria-hidden="true">', '</span> </div> </a> </div> </section> <section id="v1-created"', '> <div class="flex-between"> <h2 class="h2 no-margin"> ', " </h2> <a", "", ">", '</a> </div> <div id="created-tabs" role="tablist"', "", "", "> <button", ' data-status="published" type="button" aria-pressed="true">', "</button> <button", ' data-status="draft" type="button" aria-pressed="false">', '</button> </div> <div id="created-message" class="status-text"></div> <div id="created-list"', '></div> <div id="created-pagination" class="flex-between is-hidden"></div> </section> <section id="v1-joined"', '> <div class="flex-between"> <h2 class="h2 no-margin"> ', ' </h2> </div> <div id="participations-message"', ' role="status" aria-live="polite"></div> <div id="participations-list"', ' role="list"></div> </section> </main> <div id="settings-modal" class="modal-backdrop"> <div role="dialog" aria-modal="true" aria-labelledby="settings-title" class="modal-panel"> <div class="flex-between"> <h3 id="settings-title" class="h3 no-margin"> ', ' </h3> <button id="close-settings" class="icon-btn" type="button"', '>✕</button> </div> <div class="stack"> <label for="settings-lang" class="label-strong">', '</label> <select id="settings-lang" class="tab select-md"> <option value="en">', '</option> <option value="zh-hant">', '</option> <option value="zh-hans">', '</option> <option value="ja">', '</option> </select> </div> <div class="flex-end"> <button id="settings-cancel" class="btn" type="button">', '</button> <button id="settings-save" class="btn btn-primary" type="button">', `</button> </div> </div> </div> <script type="module" src="/js/i18n.js"></script> <script src="/js/room-templates.js"></script> <script type="module">
      ;(async function () {
        await import('/js/i18n.js')
        const { setupRoomsManager } = await import('/js/rooms-manager.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        const featureV3 = !!(
          document.body &&
          document.body.dataset &&
          document.body.dataset.featureV3 === 'true'
        )
        let fmt = null
        try {
          fmt = await import('/src/utils/format.ts')
        } catch (e) {}
        let setLangFn = null
        try {
          const mod = await import('/src/i18n/routerLang.ts')
          if (mod && typeof mod.setLang === 'function') setLangFn = mod.setLang
        } catch (e) {}
        const profileStatsV1 = true
        const statCards = Array.prototype.slice.call(
          document.querySelectorAll('[data-stat-card]'),
        )

        const openSettingsBtn = document.getElementById('open-settings')
        const settingsModal = document.getElementById('settings-modal')
        const settingsLang = document.getElementById('settings-lang')
        const settingsCancel = document.getElementById('settings-cancel')
        const settingsClose = document.getElementById('close-settings')
        const settingsSave = document.getElementById('settings-save')
        const statsTotalEl = document.getElementById('stats-total')
        const statsAccuracyEl = document.getElementById('stats-accuracy')
        const statsPointsEl = document.getElementById('stats-points')
        const statsRankEl = document.getElementById('stats-rank')
        const statsPercentileEl = document.getElementById('stats-percentile')
        const statsMessageEl = document.getElementById('stats-message')
        const scopeAllBtn = document.getElementById('scope-all')
        const scope30dBtn = document.getElementById('scope-30d')
        const createdList = document.getElementById('created-list')
        const createdPagination = document.getElementById('created-pagination')
        const createdMessage = document.getElementById('created-message')
        const participationsList = document.getElementById('participations-list')
        const participationsMessage = document.getElementById('participations-message')
        const v2Cards = document.getElementById('v2-cards')
        const v1Created = document.getElementById('v1-created')
        const v1Joined = document.getElementById('v1-joined')

        // V2 卡片入口顯示控制
        if (featureV3) {
          if (v2Cards) v2Cards.classList.remove('is-hidden')
          if (v1Created) v1Created.classList.add('is-hidden')
          if (v1Joined) v1Joined.classList.add('is-hidden')
        } else {
          if (v2Cards) v2Cards.classList.add('is-hidden')
        }

        function setStatSkeleton(active) {
          if (!featureV3) return
          for (let i = 0; i < statCards.length; i += 1) {
            const card = statCards[i]
            if (!card) continue
            if (active) {
              card.classList.add('card-skeleton')
            } else {
              card.classList.remove('card-skeleton')
            }
          }
        }

        function showStatsMessage(text, isError) {
          if (!statsMessageEl) return
          if (!text) {
            statsMessageEl.innerHTML = ''
            statsMessageEl.style.color = ''
            return
          }
          if (featureV3) {
            statsMessageEl.innerHTML =
              '<div class="card ' +
              (isError ? 'text-danger' : '') +
              ' text-center">' +
              text +
              '</div>'
            statsMessageEl.style.color = ''
            return
          }
          statsMessageEl.textContent = text
          statsMessageEl.style.color = isError ? '#d00' : '#059669'
        }

        function showCreatedMessage(text, isError) {
          if (!createdMessage) return
          if (!text) {
            createdMessage.innerHTML = ''
            createdMessage.style.color = ''
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
            return
          }
          createdMessage.textContent = text
          createdMessage.style.color = isError ? '#d00' : '#059669'
        }

        function showParticipationsMessage(text, isError) {
          if (!participationsMessage) return
          if (!text) {
            participationsMessage.innerHTML = ''
            participationsMessage.style.color = ''
            return
          }
          if (featureV3) {
            participationsMessage.innerHTML =
              '<div class="card ' +
              (isError ? 'text-danger' : '') +
              ' text-center">' +
              text +
              '</div>'
            participationsMessage.style.color = ''
            return
          }
          participationsMessage.textContent = text
          participationsMessage.style.color = isError ? '#d00' : '#059669'
        }

        // Settings modal 行為
        function toggleSettings(open) {
          if (!settingsModal) return
          if (open) {
            settingsModal.classList.add('is-open')
            setTimeout(function () {
              if (settingsLang) settingsLang.focus()
            }, 0)
            return
          }
          settingsModal.classList.remove('is-open')
        }
        function computeRedirectPath(targetLang) {
          const url = new URL(window.location.href)
          const segments = url.pathname.split('/').filter(Boolean)
          if (segments.length === 0) segments.push(targetLang)
          else segments[0] = targetLang
          return '/' + segments.join('/') + url.search + url.hash
        }
        if (openSettingsBtn) {
          openSettingsBtn.addEventListener('click', function () {
            if (settingsLang) settingsLang.value = lang
            toggleSettings(true)
          })
        }
        if (settingsCancel)
          settingsCancel.addEventListener('click', function () {
            toggleSettings(false)
          })
        if (settingsClose)
          settingsClose.addEventListener('click', function () {
            toggleSettings(false)
          })
        if (settingsSave) {
          settingsSave.addEventListener('click', function () {
            if (!settingsLang) return
            const target = settingsLang.value || lang
            if (setLangFn) {
              setLangFn(target)
            } else {
              window.location.href = computeRedirectPath(target)
            }
          })
        }
        // Allow closing modal via Escape and backdrop click
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') toggleSettings(false)
        })
        if (settingsModal) {
          settingsModal.addEventListener('click', function (e) {
            if (e.target === settingsModal) toggleSettings(false)
          })
        }

        function formatAccuracy(value) {
          if (fmt && fmt.formatPercent) return fmt.formatPercent(value || 0, lang, 1)
          const percent = Math.round((value || 0) * 1000) / 10
          return percent.toFixed(1) + '%'
        }

        function formatNumber(value) {
          if (fmt && fmt.formatNumber) return fmt.formatNumber(value || 0, lang)
          try {
            return new Intl.NumberFormat(lang).format(value || 0)
          } catch (e) {
            return String(value || 0)
          }
        }

        function formatDate(timestamp) {
          if (fmt && fmt.formatDate)
            return fmt.formatDate(timestamp, lang, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })
          if (!timestamp) return ''
          const date = new Date(timestamp)
          if (!date.getTime()) return ''
          try {
            return new Intl.DateTimeFormat(lang, {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            }).format(date)
          } catch (e) {
            return date.toISOString()
          }
        }

        const computeScoreFallback =
          metricsLib && typeof metricsLib.computeScore === 'function'
            ? metricsLib.computeScore
            : function (correct, total, totalTimeMs) {
                if (total <= 0) return 0
                const accuracy = correct / total
                const maxTime = 15000
                const averageTime = totalTimeMs > 0 ? totalTimeMs / total : maxTime
                const clamped = Math.min(Math.max(averageTime, 0), maxTime)
                const quantityScore = correct * 100
                const accuracyScore = accuracy * 600
                const speedScore = ((maxTime - clamped) / maxTime) * 300
                const totalScore = quantityScore + accuracyScore + Math.max(0, speedScore)
                return Math.round(totalScore)
              }

        function legacyComputeStats(scope) {
          const now = Date.now()
          const threshold = now - 30 * 24 * 60 * 60 * 1000
          let totalAnswered = 0
          let totalCorrect = 0
          let totalTime = 0
          let accuracy = 0
          let points = 0
          let rankLabel = '—'
          let percentilePercent

          let records = historyRecords
          if (scope === '30d') {
            records = historyRecords.filter(function (record) {
              return record && record.answeredAt >= threshold
            })
          }
          for (let i = 0; i < records.length; i += 1) {
            const record = records[i]
            if (!record) continue
            totalAnswered += 1
            if (record.isCorrect) totalCorrect += 1
            if (typeof record.timeSpentMs === 'number') {
              totalTime += record.timeSpentMs
            }
          }
          if (totalAnswered > 0) {
            accuracy = totalCorrect / totalAnswered
          }
          points = computeScoreFallback(totalCorrect, totalAnswered, totalTime)

          if (scope === 'all' && statsAll) {
            totalAnswered =
              typeof statsAll.totalAnswered === 'number' ? statsAll.totalAnswered : totalAnswered
            const totalCorrectAll =
              typeof statsAll.totalCorrect === 'number' ? statsAll.totalCorrect : totalCorrect
            accuracy = totalAnswered > 0 ? totalCorrectAll / totalAnswered : 0
            const entryInfo = findLeaderboardEntry(currentUser.id)
            if (entryInfo) {
              const entry = entryInfo.entry
              if (entry && typeof entry.score === 'number') {
                points = entry.score
              }
              const position = entryInfo.index + 1
              const totalPlayers = leaderboardEntries.length
              rankLabel = '#' + position
              if (totalPlayers > 0) {
                percentilePercent = Math.round((position / totalPlayers) * 100)
              }
            }
          } else if (
            scope === 'all' &&
            statsAll &&
            typeof statsAll.totalCorrect === 'number' &&
            typeof statsAll.totalAnswered === 'number'
          ) {
            const entry = findLeaderboardEntry(currentUser.id)
            if (entry) {
              rankLabel = '#' + (entry.index + 1)
              const totalPlayers = leaderboardEntries.length
              if (totalPlayers > 0) {
                percentilePercent = Math.round(((entry.index + 1) / totalPlayers) * 100)
              }
            }
          }

          return {
            totalAnswered,
            totalCorrect,
            accuracy,
            points,
            rankLabel,
            percentilePercent,
          }
        }

        async function checkAuth() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (!res.ok) {
              showStatsMessage(window.t('profile.notLoggedIn'), true)
              return null
            }
            const json = await res.json()
            if (json && json.authenticated && json.user) {
              return json.user
            }
            showStatsMessage(window.t('profile.notLoggedIn'), true)
            return null
          } catch (e) {
            console.error('[profile] auth check failed', e)
            showStatsMessage(window.t('errors.networkError'), true)
            return null
          }
        }

        const currentUser = await checkAuth()
        if (!currentUser) {
          return
        }

        setStatSkeleton(true)

        let statsAll = null
        let historyRecords = []
        let participationsAll = []
        let leaderboardEntries = []
        let createdManager = null
        let currentScope = 'all'

        async function fetchStats() {
          try {
            const res = await fetch(
              '/api/scores/stats?userId=' + encodeURIComponent(currentUser.id),
              { credentials: 'include' },
            )
            if (res.ok) {
              statsAll = await res.json()
            }
          } catch (e) {
            console.error('[profile] fetch stats failed', e)
          }
        }

        async function fetchHistory() {
          try {
            const res = await fetch(
              '/api/scores/history?userId=' + encodeURIComponent(currentUser.id) + '&limit=100',
              { credentials: 'include' },
            )
            if (res.ok) {
              const json = await res.json()
              historyRecords = Array.isArray(json.history) ? json.history : []
            }
          } catch (e) {
            console.error('[profile] fetch history failed', e)
          }
        }

        async function fetchParticipations() {
          try {
            const res = await fetch(
              '/api/scores/rooms?userId=' + encodeURIComponent(currentUser.id) + '&limit=100',
              { credentials: 'include' },
            )
            if (res.ok) {
              const json = await res.json()
              participationsAll = Array.isArray(json.rooms) ? json.rooms : []
            }
          } catch (e) {
            console.error('[profile] fetch participations failed', e)
          }
        }

        async function fetchLeaderboard() {
          try {
            const res = await fetch('/api/scores/leaderboard?limit=200')
            if (res.ok) {
              const json = await res.json()
              leaderboardEntries = Array.isArray(json.leaderboard) ? json.leaderboard : []
            }
          } catch (e) {
            console.error('[profile] fetch leaderboard failed', e)
          }
        }

        await Promise.all([fetchStats(), fetchHistory(), fetchParticipations(), fetchLeaderboard()])

        function findLeaderboardEntry(userId) {
          for (let i = 0; i < leaderboardEntries.length; i += 1) {
            const entry = leaderboardEntries[i]
            if (entry && entry.userId === userId) {
              return { entry: entry, index: i }
            }
          }
          return null
        }

        function computeStatsForScope(scope) {
          if (metricsLib && typeof metricsLib.computeStats === 'function') {
            try {
              return metricsLib.computeStats({
                scope,
                now: Date.now(),
                history: historyRecords,
                aggregates: statsAll,
                leaderboard: leaderboardEntries,
                userId: currentUser.id,
              })
            } catch (e) {
              console.error('[profile] computeStats failed', e)
            }
          }
          return legacyComputeStats(scope)
        }

        function renderStats(scope) {
          const stats = computeStatsForScope(scope)
          setStatSkeleton(false)
          if (statsTotalEl) statsTotalEl.textContent = formatNumber(stats.totalAnswered || 0)
          if (statsAccuracyEl) statsAccuracyEl.textContent = formatAccuracy(stats.accuracy || 0)
          if (statsPointsEl) statsPointsEl.textContent = formatNumber(stats.points || 0)
          if (statsRankEl) statsRankEl.textContent = stats.rankLabel || '—'
          if (statsPercentileEl) {
            statsPercentileEl.textContent =
              stats && typeof stats.percentilePercent === 'number'
                ? window
                    .t('profile.stats.percentile')
                    .replace('{value}', String(stats.percentilePercent))
                : ''
          }
          if (featureV3) {
            const hasStats =
              (stats.totalAnswered || 0) > 0 || (stats.points || 0) > 0 || stats.rankLabel !== '—'
            showStatsMessage(hasStats ? '' : window.t('empty.noData'), false)
          }
        }

        function buildSkeletonCard() {
          const wrapper = document.createElement('div')
          wrapper.className = 'card card-skeleton'
          wrapper.style.minHeight = '104px'
          wrapper.setAttribute('role', 'listitem')
          return wrapper
        }

        function renderParticipations(scope) {
          if (!participationsList) return
          if (featureV3) {
            participationsList.innerHTML = ''
            participationsList.appendChild(buildSkeletonCard())
            participationsList.appendChild(buildSkeletonCard())
          } else {
            participationsList.innerHTML =
              '<p style="padding:16px;text-align:center;opacity:0.6">' +
              window.t('room.loading') +
              '</p>'
          }
          const now = Date.now()
          const threshold = now - 30 * 24 * 60 * 60 * 1000
          let items = participationsAll
          if (scope === '30d') {
            items = participationsAll.filter(function (item) {
              return item && item.lastAnsweredAt >= threshold
            })
          }
          if (!items.length) {
            if (featureV3) {
              participationsList.innerHTML =
                '<div class="card stack text-center">' +
                '<p class="p text-muted">' +
                window.t('profile.participations.empty') +
                '</p>' +
                '<a class="btn btn-primary" href="/' +
                lang +
                '/">' +
                window.t('profile.participations.cta') +
                '</a>' +
                '</div>'
            } else {
              participationsList.innerHTML =
                '<p style="padding:16px;text-align:center;opacity:0.6">' +
                window.t('profile.participations.empty') +
                '</p>'
            }
            return
          }
          showParticipationsMessage('', false)
          participationsList.innerHTML = ''
          for (let i = 0; i < items.length; i += 1) {
            const item = items[i]
            if (!item) continue
            const card = document.createElement('div')
            if (featureV3) {
              card.className = 'card stack'
            } else {
              card.style.display = 'grid'
              card.style.gap = '8px'
              card.style.padding = '16px'
              card.style.border = '1px solid #e5e7eb'
              card.style.borderRadius = '12px'
              card.style.background = '#fff'
            }

            const title = document.createElement('div')
            if (featureV3) {
              title.className = 'flex-between'
            } else {
              title.style.display = 'flex'
              title.style.justifyContent = 'space-between'
              title.style.alignItems = 'center'
              title.style.flexWrap = 'wrap'
              title.style.gap = '8px'
            }

            const heading = document.createElement('h3')
            if (featureV3) {
              heading.className = 'h3'
            } else {
              heading.style.margin = '0'
              heading.style.fontSize = '1rem'
            }
            heading.textContent =
              item.roomTitle || window.t('profile.roomIdLabel') + ' ' + item.roomId
            title.appendChild(heading)

            const time = document.createElement('span')
            if (featureV3) {
              time.className = 'caption text-muted'
            } else {
              time.style.fontSize = '0.85rem'
              time.style.opacity = '0.65'
            }
            time.textContent = formatDate(item.lastAnsweredAt)
            title.appendChild(time)

            card.appendChild(title)

            const meta = document.createElement('div')
            if (featureV3) {
              meta.className = 'meta-row'
            } else {
              meta.style.display = 'flex'
              meta.style.gap = '16px'
              meta.style.flexWrap = 'wrap'
              meta.style.fontSize = '0.9rem'
              meta.style.opacity = '0.75'
            }

            const countSpan = document.createElement('span')
            countSpan.textContent = window
              .t('profile.participations.total')
              .replace('{value}', formatNumber(item.totalAnswered || 0))
            meta.appendChild(countSpan)

            const accuracySpan = document.createElement('span')
            accuracySpan.textContent = window
              .t('profile.participations.accuracy')
              .replace('{value}', formatAccuracy(item.accuracy || 0))
            meta.appendChild(accuracySpan)

            card.appendChild(meta)

            const actions = document.createElement('div')
            if (featureV3) {
              actions.className = 'actions-row'
            } else {
              actions.style.display = 'flex'
              actions.style.gap = '8px'
              actions.style.flexWrap = 'wrap'
            }

            const replay = document.createElement('a')
            replay.className = featureV3 ? 'btn-primary' : 'btn'
            if (!featureV3) {
              replay.style.fontSize = '0.85rem'
            }
            replay.href = '/' + lang + '/room/' + encodeURIComponent(item.roomId)
            replay.textContent = window.t('profile.history.playAgain')
            actions.appendChild(replay)

            card.appendChild(actions)
            participationsList.appendChild(card)
            card.setAttribute('role', 'listitem')
          }
        }

        function updateScopeButtons(scope) {
          const buttons = [scopeAllBtn, scope30dBtn]
          for (let i = 0; i < buttons.length; i += 1) {
            const button = buttons[i]
            if (!button) continue
            const targetScope = button.getAttribute('data-scope') || 'all'
            const isActive = targetScope === scope
            const isTab = button.classList.contains('tab')
            if (isActive) {
              if (isTab) {
                button.classList.add('active')
              } else {
                button.classList.add('btn-primary')
                button.classList.remove('btn')
              }
            } else {
              if (isTab) {
                button.classList.remove('active')
              } else {
                button.classList.remove('btn-primary')
                button.classList.add('btn')
              }
            }
            button.setAttribute('aria-pressed', isActive ? 'true' : 'false')
            button.setAttribute('aria-selected', isActive ? 'true' : 'false')
            button.setAttribute('tabindex', isActive ? '0' : '-1')
          }
        }

        const createdTabsContainer = document.getElementById('created-tabs')
        const createdTabs = createdTabsContainer
          ? Array.prototype.slice
              .call(createdTabsContainer.querySelectorAll('[data-status]'))
              .map(function (button) {
                return { status: button.getAttribute('data-status') || 'published', button: button }
              })
          : []

        if (!featureV3) {
          createdManager = setupRoomsManager({
            listEl: createdList,
            paginationEl: createdPagination,
            tabs: createdTabs,
            lang: lang,
            t: function (key) {
              return window.t(key)
            },
            pageSize: 5,
            onNotify: function (text, isError) {
              showCreatedMessage(text, isError)
            },
            filter: function (template) {
              if (!template || !template.updatedAt) return true
              if (currentScope !== '30d') return true
              const updatedAt = template.updatedAt
              const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
              return updatedAt >= cutoff
            },
            emptyText: window.t('profile.created.emptyScope'),
          })
        }

        function applyScope(scope) {
          currentScope = scope
          updateScopeButtons(scope)
          renderStats(scope)
          if (!featureV3) {
            renderParticipations(scope)
            if (createdManager && typeof createdManager.setFilter === 'function') {
              createdManager.setFilter(function (template) {
                if (!template || !template.updatedAt) return scope !== '30d'
                if (scope !== '30d') return true
                const cutoff = Date.now() - 30 * 24 * 60 * 60 * 1000
                return template.updatedAt >= cutoff
              })
            }
          }
        }

        if (scopeAllBtn) {
          scopeAllBtn.addEventListener('click', function () {
            applyScope('all')
          })
          scopeAllBtn.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') {
              event.preventDefault()
              if (scope30dBtn) scope30dBtn.focus()
              applyScope('30d')
            }
          })
        }
        if (scope30dBtn) {
          scope30dBtn.addEventListener('click', function () {
            applyScope('30d')
          })
          scope30dBtn.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowLeft') {
              event.preventDefault()
              if (scopeAllBtn) scopeAllBtn.focus()
              applyScope('all')
            }
          })
        }

        renderStats('all')
        if (!featureV3) {
          renderParticipations('all')
        }
        applyScope('all')
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), addAttribute("true" , "data-feature-v3"), serverT("a11y.skipToContent"), renderComponent($$result, "AppHeader", $$AppHeader, { "lang": lang, "serverT": serverT }), addAttribute(["container", "stack-lg" ], "class:list"), addAttribute(["stack-lg" ], "class:list"), addAttribute("stack" , "class"), addAttribute(["h1", "no-margin"], "class:list"), title, addAttribute(["p", "text-muted"] , "class:list"), serverT("profile.desc"), addAttribute(serverT("profile.stats.scopeLabel"), "aria-label"), addAttribute("tab active" , "class"), addAttribute(serverT("profile.scope.all"), "aria-label"), serverT("profile.scope.all"), addAttribute("tab" , "class"), addAttribute(serverT("profile.scope.30d"), "aria-label"), serverT("profile.scope.30d"), addAttribute(serverT("profile.settings.open"), "aria-label"), addAttribute(serverT("profile.settings.open"), "title"), serverT("profile.settings.open"), addAttribute("status-text" , "class"), addAttribute("stats-grid stack" , "class"), addAttribute("card stack" , "class"), addAttribute("caption text-muted" , "class"), serverT("profile.stats.totalAnswers"), addAttribute("card stack" , "class"), addAttribute("caption text-muted" , "class"), serverT("profile.stats.accuracy"), addAttribute("card stack" , "class"), addAttribute("caption text-muted" , "class"), serverT("profile.stats.points"), addAttribute("card stack" , "class"), addAttribute("caption text-muted" , "class"), serverT("profile.stats.rank"), addAttribute(`/${lang}/rooms/created`, "href"), addAttribute(serverT("profile.cards.created.title"), "aria-label"), addAttribute("flex-between" , "class"), serverT("profile.cards.created.title"), renderTemplate`<span class="caption text-muted" aria-hidden="true">›</span>`, addAttribute(["p", "text-muted", "text-opacity-80"], "class:list"), serverT("profile.cards.created.desc"), serverT("common.viewAll"), addAttribute(`/${lang}/rooms/joined`, "href"), addAttribute(serverT("profile.cards.joined.title"), "aria-label"), addAttribute("flex-between" , "class"), serverT("profile.cards.joined.title"), renderTemplate`<span class="caption text-muted" aria-hidden="true">›</span>`, addAttribute(["p", "text-muted", "text-opacity-80"], "class:list"), serverT("profile.cards.joined.desc"), serverT("common.viewAll"), addAttribute("stack-lg is-hidden" , "class"), serverT("profile.sections.myRooms"), addAttribute("btn-primary" , "class"), addAttribute(`/${lang}/create-room`, "href"), serverT("profile.sections.createRoom"), addAttribute(serverT("profile.sections.myRooms"), "aria-label"), addAttribute("tab-row" , "class"), addAttribute(void 0 , "style"), addAttribute("tab active" , "class"), serverT("myRooms.published"), addAttribute("tab" , "class"), serverT("myRooms.drafts"), addAttribute("stack" , "class"), addAttribute("stack-lg is-hidden" , "class"), serverT("profile.sections.participations"), addAttribute("status-text" , "class"), addAttribute("stack" , "class"), serverT("profile.settings.title"), addAttribute(serverT("profile.settings.close"), "aria-label"), serverT("languages.label"), serverT("languages.en"), serverT("languages.zhHant"), serverT("languages.zhHans"), serverT("languages.ja"), serverT("common.cancel"), serverT("common.save"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/profile.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/profile.astro";
const $$url = "/[lang]/profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
