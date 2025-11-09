import { e as createAstro, f as createComponent, r as renderTemplate, h as addAttribute, ah as renderHead, p as renderComponent } from '../../chunks/astro/server_BigfXiJV.mjs';
import { s as setupServerI18n } from '../../chunks/server-i18n_BKH6atwt.mjs';
import { $ as $$SeoMeta } from '../../chunks/SeoMeta_mSwdbQaA.mjs';
/* empty css                                    */
export { renderers } from '../../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://quizyparty.com");
const prerender = false;
const $$QuestionSets = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$QuestionSets;
  const { lang, serverT } = await setupServerI18n(Astro2.params.lang);
  const title = serverT("questionSets.title");
  const desc = serverT("questionSets.title");
  const siteOrigin = Astro2.site && Astro2.site.origin || "https://quizyparty.com";
  const path = Astro2.url.pathname;
  return renderTemplate(_a || (_a = __template(["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", '</head> <body> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">▼</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> </header> <main class="container hero"> <h1 style="margin:0 0 24px">', '</h1> <section id="builder" style="display:grid;gap:24px;max-width:900px;margin-bottom:40px"> <div id="new-question-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;display:grid;gap:16px"> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"> <h2 style="margin:0;font-size:1.15rem">', '</h2> <button id="builder-reset" class="btn" style="font-size:0.875rem">', '</button> </div> <div> <label for="builder-question" style="display:block;margin-bottom:8px;font-weight:600">', '</label> <textarea id="builder-question" rows="3"', ' style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:10px"></textarea> </div> <div style="display:grid;gap:12px"> <span style="font-weight:600">', '</span> <div class="choice-row" data-index="0" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="0" id="builder-correct-0" checked> <input id="builder-choice-0" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="1" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="1" id="builder-correct-1"> <input id="builder-choice-1" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="2" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="2" id="builder-correct-2"> <input id="builder-choice-2" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="3" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="3" id="builder-correct-3"> <input id="builder-choice-3" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> </div> <div> <label for="builder-keywords" style="display:block;margin-bottom:8px;font-weight:600">', '</label> <input id="builder-keywords" type="text" placeholder="AI, 科學, 趣味" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> <p style="margin:6px 0 0;font-size:0.75rem;opacity:0.6">', '</p> </div> <div style="display:flex;gap:12px"> <button id="builder-add" class="btn btn-primary">', '</button> <button id="builder-update" class="btn btn-primary" style="display:none">', '</button> </div> <div id="builder-msg" style="min-height:1em;font-size:0.9rem"></div> </div> <div id="drafts-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px"> <div style="display:flex;align-items:center;justify-content:space-between;gap:12px"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <span id="draft-count" style="font-size:0.85rem;opacity:0.7"></span> </div> <div id="drafts-list" style="margin-top:16px;display:grid;gap:12px"></div> </div> <div id="summary-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;display:grid;gap:16px"> <div> <label style="display:block;margin-bottom:8px;font-weight:600">', '</label> <input id="set-title" type="text"', ' style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div> <label style="display:block;margin-bottom:8px;font-weight:600">', '</label> <select id="expected-count" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> <option value="10">10</option> <option value="20">20</option> <option value="30">30</option> <option value="40">40</option> <option value="50">50</option> <option value="60">60</option> </select> <p id="expected-count-hint" style="margin:6px 0 0;font-size:0.8rem;opacity:0.6">', '</p> </div> <div id="summary-total" style="font-weight:600"></div> <div id="summary-warning" style="font-size:0.85rem;color:#d97706;display:none"></div> <div style="display:flex;gap:12px;flex-wrap:wrap"> <button id="open-library" class="btn" style="font-size:0.875rem">', '</button> </div> <div style="display:flex;gap:12px;flex-wrap:wrap"> <button id="summary-save-draft" class="btn">', '</button> <button id="summary-publish" class="btn btn-primary">', '</button> <button id="summary-cancel" class="btn" style="display:none">', '</button> </div> <div id="summary-msg" style="min-height:1em;font-size:0.9rem"></div> </div> <div id="library-panel" style="display:none;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;max-height:420px;overflow:hidden;display:grid;gap:16px"> <div style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <div style="display:flex;gap:8px;flex-wrap:wrap"> <input id="library-search" type="text"', ' style="padding:8px 12px;border:1px solid #d1d5db;border-radius:8px"> <button id="close-library" class="btn" style="font-size:0.85rem">', '</button> </div> </div> <div id="library-list" style="flex:1;min-height:180px;max-height:220px;overflow-y:auto;display:grid;gap:10px"></div> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"> <span id="library-status" style="font-size:0.85rem;opacity:0.7"></span> <button id="library-load-more" class="btn" style="font-size:0.85rem">', '</button> </div> </div> </section> <section id="sets-section" style="display:grid;gap:16px"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <div id="sets-list" style="display:grid;gap:12px"> <p style="padding:16px;text-align:center;opacity:0.6">', `</p> </div> </section> </main> <script type="module" src="/js/i18n.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const { setupUserMenu } = await import('/js/user-menu.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        
        const draftsList = document.getElementById('drafts-list')
        const draftCount = document.getElementById('draft-count')
        const builderMsg = document.getElementById('builder-msg')
        const builderAddBtn = document.getElementById('builder-add')
        const builderUpdateBtn = document.getElementById('builder-update')
        const builderResetBtn = document.getElementById('builder-reset')
        const summaryTotal = document.getElementById('summary-total')
        const summaryMsg = document.getElementById('summary-msg')
        const summarySaveDraftBtn = document.getElementById('summary-save-draft')
        const summaryPublishBtn = document.getElementById('summary-publish')
        const summaryCancelBtn = document.getElementById('summary-cancel')
        const openLibraryBtn = document.getElementById('open-library')
        const libraryPanel = document.getElementById('library-panel')
        const libraryList = document.getElementById('library-list')
        const librarySearch = document.getElementById('library-search')
        const libraryLoadMore = document.getElementById('library-load-more')
        const libraryStatus = document.getElementById('library-status')
        const closeLibraryBtn = document.getElementById('close-library')
        const setTitleInput = document.getElementById('set-title')
        const setsList = document.getElementById('sets-list')
        const expectedCountSelect = document.getElementById('expected-count')
        const summaryWarning = document.getElementById('summary-warning')
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
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

        const choiceInputs = [
          document.getElementById('builder-choice-0'),
          document.getElementById('builder-choice-1'),
          document.getElementById('builder-choice-2'),
          document.getElementById('builder-choice-3'),
        ]
        const questionInput = document.getElementById('builder-question')
        const keywordsInput = document.getElementById('builder-keywords')

        let drafts = []
        let editingIndex = -1
        let currentUser = null
        const libraryState = {
          items: [],
          offset: 0,
          hasMore: false,
          loading: false,
          search: '',
        }
        const selectedExisting = new Map()
        const urlParams = new URLSearchParams(window.location.search)
        const initialSetId = urlParams.get('setId')
        const initialTemplateId = urlParams.get('templateId')
        const allowedCounts = [10, 20, 30, 40, 50, 60]
        let autoSaveTimer = null
        let autoSaveInFlight = false

        function goToLogin() {
          const redirect = window.location.pathname + window.location.search
          window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(redirect)
        }

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        function resetForm() {
          if (questionInput) questionInput.value = ''
          choiceInputs.forEach((input, idx) => {
            if (input) input.value = ''
            const radio = document.getElementById('builder-correct-' + idx)
            if (radio instanceof HTMLInputElement) radio.checked = idx === 0
          })
          if (keywordsInput) keywordsInput.value = ''
          editingIndex = -1
          if (builderAddBtn) builderAddBtn.style.display = 'inline-flex'
          if (builderUpdateBtn) builderUpdateBtn.style.display = 'none'
          if (builderMsg) builderMsg.textContent = ''
        }

        function parseKeywords(val) {
          if (!val) return undefined
          return val.split(/[,\\s]+/).map((w) => w.trim()).filter(Boolean)
        }

        function getFormData() {
          const questionText = questionInput ? questionInput.value.trim() : ''
          const choices = choiceInputs.map((input) => (input ? input.value.trim() : '')).filter(Boolean)
          const invalidChoice = choices.length < 2 || choices.some((c) => c.length === 0)
          const selectedRadio = document.querySelector('input[name="builder-correct"]:checked')
          const correctIndex = selectedRadio ? Number(selectedRadio.value) : 0
          const correctChoice = choiceInputs[correctIndex] ? choiceInputs[correctIndex].value.trim() : ''
          if (!questionText || invalidChoice || !correctChoice) {
            return null
          }
          return {
            question: questionText,
            choices: choiceInputs.map((input) => input ? input.value.trim() : '').filter((c) => c.length > 0),
            correctAnswer: correctChoice,
            keywords: parseKeywords(keywordsInput ? keywordsInput.value : ''),
          }
        }

        function renderDrafts() {
          if (!draftsList) return
          draftsList.innerHTML = ''
          if (drafts.length === 0) {
            const empty = document.createElement('p')
            empty.textContent = window.t('questionSets.drafts.empty')
            empty.style.opacity = '0.6'
            empty.style.fontSize = '0.9rem'
            draftsList.appendChild(empty)
          } else {
            drafts.forEach((draft, index) => {
              const item = document.createElement('div')
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '10px'
              item.style.padding = '12px'
              item.style.display = 'grid'
              item.style.gap = '8px'
              item.innerHTML = (
                '<div style="font-weight:600">' + draft.question + '</div>' +
                '<div style="font-size:0.85rem;opacity:0.7">' + window.t('questionSets.choiceCount').replace('{count}', String(draft.choices.length)) + '</div>' +
                (draft.keywords && draft.keywords.length ? '<div style="font-size:0.8rem;opacity:0.6">#' + draft.keywords.join(' #') + '</div>' : '') +
                '<div style="display:flex;gap:8px">' +
                  '<button class="btn" data-action="edit" data-index="' + index + '" style="font-size:0.8rem">' + window.t('questionSets.drafts.edit') + '</button>' +
                  '<button class="btn" data-action="remove" data-index="' + index + '" style="font-size:0.8rem">' + window.t('questionSets.drafts.remove') + '</button>' +
                '</div>'
              )
              draftsList.appendChild(item)
            })
          }

          if (draftCount) {
            draftCount.textContent = window.t('questionSets.drafts.count').replace('{count}', String(drafts.length))
          }
          renderSummary()
        }

        function getTargetCount() {
          if (!expectedCountSelect) return allowedCounts[0]
          const value = parseInt(expectedCountSelect.value, 10)
          if (allowedCounts.indexOf(value) === -1) {
            expectedCountSelect.value = String(allowedCounts[0])
            return allowedCounts[0]
          }
          return value
        }

        function updateSummaryWarning() {
          if (!summaryWarning) return
          const total = drafts.length + selectedExisting.size
          const target = getTargetCount()
          if (total === target) {
            summaryWarning.style.display = 'none'
            summaryWarning.textContent = ''
            return
          }
          const remaining = target - total
          summaryWarning.style.display = 'block'
          if (remaining > 0) {
            summaryWarning.style.color = '#d97706'
            summaryWarning.textContent = window.t('questionSets.summary.mismatch').replace('{remaining}', String(remaining))
          } else {
            summaryWarning.style.color = '#b91c1c'
            summaryWarning.textContent = window.t('questionSets.summary.overLimit').replace('{extra}', String(Math.abs(remaining)))
          }
        }

        function renderSummary() {
          if (summaryTotal) {
            const total = drafts.length + selectedExisting.size
            const target = getTargetCount()
            summaryTotal.textContent = window.t('questionSets.summary.total')
              .replace('{count}', String(total))
              .replace('{target}', String(target))
          }
          updateSummaryWarning()
        }

        function scheduleAutoSave() {
          if (autoSaveInFlight) return
          if (autoSaveTimer) window.clearTimeout(autoSaveTimer)
          autoSaveTimer = window.setTimeout(function() {
            submitQuestionSet('draft', true)
          }, 1500)
        }

        function renderLibrary() {
          if (!libraryList) return
          libraryList.innerHTML = ''
          if (!libraryState.items.length) {
            const empty = document.createElement('p')
            empty.style.textAlign = 'center'
            empty.style.opacity = '0.6'
            empty.style.padding = '16px'
            empty.textContent = window.t('questionSets.library.empty')
            libraryList.appendChild(empty)
          } else {
            libraryState.items.forEach((q) => {
              const item = document.createElement('div')
              item.style.display = 'flex'
              item.style.gap = '12px'
              item.style.padding = '12px'
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '8px'
              const checked = selectedExisting.has(q.id)
              item.innerHTML = (
                '<input type="checkbox" data-question-id="' + q.id + '" ' + (checked ? 'checked' : '') + ' style="margin-top:4px" />' +
                '<div style="flex:1;cursor:pointer" data-question-id="' + q.id + '">' +
                  '<div style="font-weight:600;margin-bottom:4px">' + q.question + '</div>' +
                  '<div style="font-size:0.8rem;opacity:0.6">' + window.t('questionSets.choiceCount').replace('{count}', String(q.choices ? q.choices.length : 0)) + '</div>' +
                '</div>'
              )
              libraryList.appendChild(item)
            })
          }

          libraryList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', function() {
              const questionId = this.getAttribute('data-question-id')
              const question = libraryState.items.find((item) => item.id === questionId)
              if (!question) return
              if (this.checked) {
                selectedExisting.set(questionId, question)
              } else {
                selectedExisting.delete(questionId)
              }
              renderSummary()
              scheduleAutoSave()
            })
          })

          libraryList.querySelectorAll('div[data-question-id]').forEach((div) => {
            div.addEventListener('click', function(e) {
              if (e.target && e.target.tagName === 'INPUT') return
              const questionId = this.getAttribute('data-question-id')
              const checkbox = libraryList.querySelector('input[data-question-id="' + questionId + '"]')
              if (checkbox) {
                checkbox.checked = !checkbox.checked
                checkbox.dispatchEvent(new Event('change'))
              }
            })
          })

          if (libraryStatus) {
            libraryStatus.textContent = libraryState.loading
              ? window.t('questionSets.library.loading')
              : window.t('questionSets.library.selected').replace('{count}', String(selectedExisting.size))
          }

          if (libraryLoadMore) {
            libraryLoadMore.style.display = libraryState.hasMore ? 'inline-flex' : 'none'
          }
          renderSummary()
        }

        async function loadLibrary(reset = false) {
          if (libraryState.loading) return
          libraryState.loading = true
          if (reset) {
            libraryState.offset = 0
            libraryState.items = []
            libraryState.hasMore = false
          }
          renderLibrary()

          const params = new URLSearchParams({
            limit: '20',
            offset: String(libraryState.offset),
          })
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

        function toggleLibrary(show) {
          if (!libraryPanel) return
          libraryPanel.style.display = show ? 'grid' : 'none'
          if (show && libraryState.items.length === 0) {
            loadLibrary(true)
          }
        }

        function showBuilderMessage(text, isError) {
          if (!builderMsg) return
          builderMsg.textContent = text || ''
          builderMsg.style.color = isError ? '#d00' : '#059669'
        }

        function showSummaryMessage(text, isError) {
          if (!summaryMsg) return
          summaryMsg.textContent = text || ''
          summaryMsg.style.color = isError ? '#d00' : '#059669'
        }

        async function loadExistingSet(setId) {
          try {
            const res = await fetch('/api/question-sets/' + setId, { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const tpl = data || {}
            if (tpl && tpl.title && setTitleInput) {
              setTitleInput.value = tpl.title
            }
            if (tpl.questions && Array.isArray(tpl.questions)) {
              drafts = tpl.questions.map(function(q) {
                return {
                  tempId: 'loaded-' + q.id,
                  question: q.question,
                  choices: q.choices || [],
                  correctAnswer: q.correctAnswer || (q.choices && q.choices[0]) || '',
                  keywords: q.keywords,
                  savedId: q.id,
                }
              })
            }
            if (expectedCountSelect) {
              const incoming = tpl.expectedCount && allowedCounts.indexOf(tpl.expectedCount) >= 0
                ? tpl.expectedCount
                : allowedCounts[0]
              expectedCountSelect.value = String(incoming)
            }
            currentState.setId = setId
            if (initialTemplateId) currentState.templateId = initialTemplateId
            if (summaryCancelBtn) {
              summaryCancelBtn.style.display = 'inline-flex'
              summaryCancelBtn.addEventListener('click', function() {
                currentState.setId = null
                currentState.templateId = null
                if (setTitleInput) setTitleInput.value = ''
                drafts = []
                if (expectedCountSelect) expectedCountSelect.value = String(allowedCounts[0])
                renderDrafts()
                showSummaryMessage('', false)
                summaryCancelBtn.style.display = 'none'
              })
            }
            renderDrafts()
          } catch (e) {
            console.error('Failed to load set', e)
          }
        }

        if (builderAddBtn) {
          builderAddBtn.addEventListener('click', function() {
            const data = getFormData()
            if (!data) {
              showBuilderMessage(window.t('questionSets.builder.invalid'), true)
              return
            }
            drafts.push({
              tempId: 'draft-' + Date.now() + '-' + Math.random().toString(16).slice(2),
              question: data.question,
              choices: data.choices,
              correctAnswer: data.correctAnswer,
              keywords: data.keywords,
              savedId: undefined,
            })
            showBuilderMessage(window.t('questionSets.builder.saved'), false)
            resetForm()
            renderDrafts()
            scheduleAutoSave()
          })
        }

        if (builderUpdateBtn) {
          builderUpdateBtn.addEventListener('click', function() {
            if (editingIndex < 0 || editingIndex >= drafts.length) {
              resetForm()
              return
            }
            const data = getFormData()
            if (!data) {
              showBuilderMessage(window.t('questionSets.builder.invalid'), true)
              return
            }
            drafts[editingIndex] = {
              ...drafts[editingIndex],
              question: data.question,
              choices: data.choices,
              correctAnswer: data.correctAnswer,
              keywords: data.keywords,
              savedId: undefined,
            }
            showBuilderMessage(window.t('questionSets.builder.updated'), false)
            resetForm()
            renderDrafts()
            scheduleAutoSave()
          })
        }

        if (builderResetBtn) {
          builderResetBtn.addEventListener('click', function() {
            resetForm()
          })
        }

        if (setTitleInput) {
          setTitleInput.addEventListener('input', function() {
            scheduleAutoSave()
          })
        }

        if (expectedCountSelect) {
          expectedCountSelect.addEventListener('change', function() {
            renderSummary()
            scheduleAutoSave()
          })
        }

        if (draftsList) {
          draftsList.addEventListener('click', function(e) {
            const target = e.target
            if (!(target instanceof HTMLElement) || !target.getAttribute) return
            const action = target.getAttribute('data-action')
            const index = Number(target.getAttribute('data-index') || -1)
            if (Number.isNaN(index) || index < 0 || index >= drafts.length) return
            if (action === 'edit') {
              const draft = drafts[index]
              if (questionInput) questionInput.value = draft.question
              draft.choices.forEach((choice, idx) => {
                if (choiceInputs[idx]) choiceInputs[idx].value = choice
                const radio = document.getElementById('builder-correct-' + idx)
                if (radio instanceof HTMLInputElement) {
                  radio.checked = choice === draft.correctAnswer
                }
              })
              if (keywordsInput) keywordsInput.value = draft.keywords ? draft.keywords.join(' ') : ''
              editingIndex = index
              if (builderAddBtn) builderAddBtn.style.display = 'none'
              if (builderUpdateBtn) builderUpdateBtn.style.display = 'inline-flex'
              showBuilderMessage('', false)
            } else if (action === 'remove') {
              drafts.splice(index, 1)
              renderDrafts()
              scheduleAutoSave()
            }
          })
        }

        if (openLibraryBtn) {
          openLibraryBtn.addEventListener('click', function() {
            toggleLibrary(libraryPanel && libraryPanel.style.display !== 'grid')
          })
        }

        if (closeLibraryBtn) {
          closeLibraryBtn.addEventListener('click', function() {
            toggleLibrary(false)
          })
        }

        if (libraryLoadMore) {
          libraryLoadMore.addEventListener('click', function() {
            loadLibrary(false)
          })
        }

        let searchTimer
        if (librarySearch) {
          librarySearch.addEventListener('input', function() {
            window.clearTimeout(searchTimer)
            libraryState.search = librarySearch.value.trim()
            searchTimer = window.setTimeout(function() {
              loadLibrary(true)
            }, 400)
          })
        }

        async function ensureDraftSaved(draft, lang) {
          if (draft.savedId) {
            const res = await fetch('/api/questions/' + draft.savedId, {
              method: 'PUT',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                question: draft.question,
                choices: draft.choices,
                correctAnswer: draft.correctAnswer,
                lang,
                keywords: draft.keywords,
              })
            })
            if (!res.ok) {
              const json = await res.json().catch(() => ({}))
              throw new Error(json.error || window.t('questions.error'))
            }
            return draft.savedId
          }
          const res = await fetch('/api/questions/create', {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              question: draft.question,
              choices: draft.choices,
              correctAnswer: draft.correctAnswer,
              lang,
              keywords: draft.keywords,
              status: 'published',
            })
          })
          if (!res.ok) {
            const json = await res.json().catch(() => ({}))
            throw new Error(json.error || window.t('questions.error'))
          }
          const json = await res.json()
          draft.savedId = json.id
          return draft.savedId
        }

        const currentState = {
          setId: null,
          templateId: null,
        }

        async function submitQuestionSet(status, isAuto) {
          const auto = Boolean(isAuto)
          const total = drafts.length + selectedExisting.size
          const target = getTargetCount()

          if (!auto && total === 0) {
            showSummaryMessage(window.t('questionSets.summary.validate'), true)
            return
          }

          if (allowedCounts.indexOf(target) === -1) {
            if (!auto) showSummaryMessage(window.t('questionSets.summary.invalidTarget'), true)
            return
          }

          if (status === 'published' && total !== target) {
            showSummaryMessage(window.t('questionSets.summary.publishMismatch'), true)
            return
          }

          if (auto && total === 0 && !currentState.setId) {
            return
          }

          if (auto) {
            autoSaveInFlight = true
          } else {
            showSummaryMessage(window.t('questionSets.createInProgress'), false)
            summarySaveDraftBtn && summarySaveDraftBtn.setAttribute('disabled', 'true')
            summaryPublishBtn && summaryPublishBtn.setAttribute('disabled', 'true')
          }

          try {
            const ids = []
            for (const draft of drafts) {
              const id = await ensureDraftSaved(draft, lang)
              ids.push(id)
            }
            selectedExisting.forEach((value, key) => ids.push(key))

            const payload = {
              title: setTitleInput ? setTitleInput.value.trim() : undefined,
              lang,
              questionIds: ids,
              expectedCount: target,
              status,
            }

            let endpoint = '/api/question-sets/create'
            let method = 'POST'
            if (currentState.setId) {
              endpoint = '/api/question-sets/' + currentState.setId
              method = 'PUT'
            }

            const res = await fetch(endpoint, {
              method,
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })

            if (!res.ok) {
              const json = await res.json().catch(() => ({}))
              throw new Error(json.error || window.t('questionSets.createError'))
            }

            const json = await res.json().catch(() => ({}))
            if (!currentState.setId && json && json.id) {
              currentState.setId = json.id
            }

            if (!auto) {
              showSummaryMessage(window.t('questionSets.createSuccess'), false)
            }

            if (!currentState.setId) {
              drafts = []
              selectedExisting.clear()
              if (setTitleInput) setTitleInput.value = ''
              if (expectedCountSelect) expectedCountSelect.value = String(allowedCounts[0])
            }

            renderDrafts()
            renderLibrary()
            toggleLibrary(false)
            loadSets()
          } catch (e) {
            if (auto) {
              console.error('Auto-save failed', e)
            } else {
              showSummaryMessage(e.message || window.t('questionSets.createError'), true)
            }
          } finally {
            if (auto) {
              autoSaveInFlight = false
            } else {
              summarySaveDraftBtn && summarySaveDraftBtn.removeAttribute('disabled')
              summaryPublishBtn && summaryPublishBtn.removeAttribute('disabled')
            }
          }
        }

        if (summarySaveDraftBtn) {
          summarySaveDraftBtn.addEventListener('click', function() {
            submitQuestionSet('draft', false)
          })
        }

        if (summaryPublishBtn) {
          summaryPublishBtn.addEventListener('click', function() {
            submitQuestionSet('published', false)
          })
        }

        async function loadSets() {
          if (!setsList) return
          setsList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('room.loading') + '</p>'
          
          try {
            const res = await fetch('/api/question-sets/list', { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to load question sets')
            const data = await res.json()
            const sets = data.sets || []
            
            if (sets.length === 0) {
              setsList.innerHTML = (
                '<div style="text-align:center;padding:40px">' +
                  '<p style="opacity:0.7;margin-bottom:16px">' + window.t('questionSets.empty') + '</p>' +
                  '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
                    '<a href="/' + lang + '/create-question" class="btn">' + window.t('questions.create') + '</a>' +
                    '<button id="create-set-from-all" class="btn btn-primary">' + window.t('questionSets.create') + '</button>' +
                  '</div>' +
                  '<p style="margin-top:16px;font-size:0.875rem;opacity:0.6">' + window.t('questionSets.createHint') + '</p>' +
                '</div>'
              )
              // 如果有题目，自动显示创建表单
              const createSetBtn = document.getElementById('create-set-from-all')
              if (createSetBtn) {
                createSetBtn.addEventListener('click', function() {
                  showCreateForm()
                })
              }
              return
            }
            
            setsList.innerHTML = ''
            sets.forEach(function(set) {
              const div = document.createElement('div')
              div.style.display = 'flex'
              div.style.gap = '16px'
              div.style.padding = '16px'
              div.style.border = '1px solid #ddd'
              div.style.borderRadius = '12px'
              div.style.alignItems = 'center'
              div.style.background = '#fff'
              div.innerHTML = (
                '<div style="flex:1">' +
                  '<div style="font-weight:600;margin-bottom:4px">' + (set.title || window.t('questionSets.untitled')) + '</div>' +
                  '<div style="font-size:0.875rem;opacity:0.7">' + window.t('questionSets.questionCount').replace('{count}', String(set.questionIds.length)) + '</div>' +
                '</div>' +
                '<button class="btn btn-primary" data-set-id="' + set.id + '">' + window.t('questionSets.select') + '</button>'
              )
              setsList.appendChild(div)
              
              const selectBtn = div.querySelector('button[data-set-id]')
              if (selectBtn) {
                selectBtn.addEventListener('click', function() {
                  const setId = this.getAttribute('data-set-id')
                  window.location.href = '/' + lang + '/create-room?setId=' + setId
                })
              }
            })
          } catch (e) {
            console.error('Failed to load sets:', e)
            setsList.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('errors.networkError') + '</p>'
          }
        }
        
        async function initAuth() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (res.ok) {
              const json = await res.json()
              if (json && json.authenticated && json.user) {
                currentUser = json.user
                if (authBtn) authBtn.style.display = 'none'
                if (userMenu && typeof userMenu.applyUser === 'function') {
                  userMenu.applyUser(json.user)
                } else if (userInfo) {
                  userInfo.style.display = 'flex'
                }
                return
              }
            }
          } catch (e) {
            console.error('Auth init failed', e)
          }
          currentUser = null
          if (authBtn) authBtn.style.display = 'block'
          if (userMenu && typeof userMenu.clearUser === 'function') {
            userMenu.clearUser()
          } else if (userInfo) {
            userInfo.style.display = 'none'
          }
        }

        resetForm()
        if (initialSetId) {
          await loadExistingSet(initialSetId)
        } else {
          renderDrafts()
        }
        await initAuth()
        loadSets()
      })()
    </script> </body> </html>`], ["<html", '> <head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">', "", '</head> <body> <header class="navbar"> <div class="container inner"> <a', ">", '</a> <nav style="display:flex;gap:12px;align-items:center"> <button id="auth-btn" class="btn" style="font-size:0.875rem;display:none">', '</button> <div id="user-info" style="display:none;position:relative;align-items:center"> <button id="user-menu-trigger" data-role="menu-trigger" type="button" style="display:flex;align-items:center;gap:8px;padding:6px 10px;border:1px solid #e5e7eb;border-radius:999px;background:#fff;font-size:0.875rem;cursor:pointer"> <img id="user-avatar" data-role="avatar" src="" alt="" style="width:28px;height:28px;border-radius:50%;object-fit:cover"> <span id="user-name" data-role="name" style="max-width:140px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"></span> <span data-role="menu-caret" aria-hidden="true" style="font-size:0.7rem;color:#6b7280">▼</span> </button> <div id="user-menu" data-role="menu-panel" style="display:none;position:absolute;right:0;top:calc(100% + 8px);min-width:260px;padding:16px;border:1px solid #e5e7eb;border-radius:12px;background:#fff;box-shadow:0 18px 38px rgba(15,23,42,0.16);z-index:40"></div> </div> </nav> </div> </header> <main class="container hero"> <h1 style="margin:0 0 24px">', '</h1> <section id="builder" style="display:grid;gap:24px;max-width:900px;margin-bottom:40px"> <div id="new-question-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;display:grid;gap:16px"> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap"> <h2 style="margin:0;font-size:1.15rem">', '</h2> <button id="builder-reset" class="btn" style="font-size:0.875rem">', '</button> </div> <div> <label for="builder-question" style="display:block;margin-bottom:8px;font-weight:600">', '</label> <textarea id="builder-question" rows="3"', ' style="width:100%;padding:12px;border:1px solid #d1d5db;border-radius:10px"></textarea> </div> <div style="display:grid;gap:12px"> <span style="font-weight:600">', '</span> <div class="choice-row" data-index="0" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="0" id="builder-correct-0" checked> <input id="builder-choice-0" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="1" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="1" id="builder-correct-1"> <input id="builder-choice-1" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="2" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="2" id="builder-correct-2"> <input id="builder-choice-2" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div class="choice-row" data-index="3" style="display:flex;align-items:center;gap:8px"> <input type="radio" name="builder-correct" value="3" id="builder-correct-3"> <input id="builder-choice-3" type="text"', ' style="flex:1;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> </div> <div> <label for="builder-keywords" style="display:block;margin-bottom:8px;font-weight:600">', '</label> <input id="builder-keywords" type="text" placeholder="AI, 科學, 趣味" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> <p style="margin:6px 0 0;font-size:0.75rem;opacity:0.6">', '</p> </div> <div style="display:flex;gap:12px"> <button id="builder-add" class="btn btn-primary">', '</button> <button id="builder-update" class="btn btn-primary" style="display:none">', '</button> </div> <div id="builder-msg" style="min-height:1em;font-size:0.9rem"></div> </div> <div id="drafts-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px"> <div style="display:flex;align-items:center;justify-content:space-between;gap:12px"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <span id="draft-count" style="font-size:0.85rem;opacity:0.7"></span> </div> <div id="drafts-list" style="margin-top:16px;display:grid;gap:12px"></div> </div> <div id="summary-card" style="background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;display:grid;gap:16px"> <div> <label style="display:block;margin-bottom:8px;font-weight:600">', '</label> <input id="set-title" type="text"', ' style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> </div> <div> <label style="display:block;margin-bottom:8px;font-weight:600">', '</label> <select id="expected-count" style="width:100%;padding:10px;border:1px solid #d1d5db;border-radius:8px"> <option value="10">10</option> <option value="20">20</option> <option value="30">30</option> <option value="40">40</option> <option value="50">50</option> <option value="60">60</option> </select> <p id="expected-count-hint" style="margin:6px 0 0;font-size:0.8rem;opacity:0.6">', '</p> </div> <div id="summary-total" style="font-weight:600"></div> <div id="summary-warning" style="font-size:0.85rem;color:#d97706;display:none"></div> <div style="display:flex;gap:12px;flex-wrap:wrap"> <button id="open-library" class="btn" style="font-size:0.875rem">', '</button> </div> <div style="display:flex;gap:12px;flex-wrap:wrap"> <button id="summary-save-draft" class="btn">', '</button> <button id="summary-publish" class="btn btn-primary">', '</button> <button id="summary-cancel" class="btn" style="display:none">', '</button> </div> <div id="summary-msg" style="min-height:1em;font-size:0.9rem"></div> </div> <div id="library-panel" style="display:none;background:#fff;border:1px solid #e5e7eb;border-radius:12px;padding:20px;max-height:420px;overflow:hidden;display:grid;gap:16px"> <div style="display:flex;gap:12px;align-items:center;justify-content:space-between;flex-wrap:wrap"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <div style="display:flex;gap:8px;flex-wrap:wrap"> <input id="library-search" type="text"', ' style="padding:8px 12px;border:1px solid #d1d5db;border-radius:8px"> <button id="close-library" class="btn" style="font-size:0.85rem">', '</button> </div> </div> <div id="library-list" style="flex:1;min-height:180px;max-height:220px;overflow-y:auto;display:grid;gap:10px"></div> <div style="display:flex;justify-content:space-between;align-items:center;gap:12px"> <span id="library-status" style="font-size:0.85rem;opacity:0.7"></span> <button id="library-load-more" class="btn" style="font-size:0.85rem">', '</button> </div> </div> </section> <section id="sets-section" style="display:grid;gap:16px"> <h2 style="margin:0;font-size:1.1rem">', '</h2> <div id="sets-list" style="display:grid;gap:12px"> <p style="padding:16px;text-align:center;opacity:0.6">', `</p> </div> </section> </main> <script type="module" src="/js/i18n.js"></script> <script type="module">
      (async function() {
        await import('/js/i18n.js')
        const { setupUserMenu } = await import('/js/user-menu.js')
        const lang = document.documentElement.getAttribute('lang') || 'en'
        
        const draftsList = document.getElementById('drafts-list')
        const draftCount = document.getElementById('draft-count')
        const builderMsg = document.getElementById('builder-msg')
        const builderAddBtn = document.getElementById('builder-add')
        const builderUpdateBtn = document.getElementById('builder-update')
        const builderResetBtn = document.getElementById('builder-reset')
        const summaryTotal = document.getElementById('summary-total')
        const summaryMsg = document.getElementById('summary-msg')
        const summarySaveDraftBtn = document.getElementById('summary-save-draft')
        const summaryPublishBtn = document.getElementById('summary-publish')
        const summaryCancelBtn = document.getElementById('summary-cancel')
        const openLibraryBtn = document.getElementById('open-library')
        const libraryPanel = document.getElementById('library-panel')
        const libraryList = document.getElementById('library-list')
        const librarySearch = document.getElementById('library-search')
        const libraryLoadMore = document.getElementById('library-load-more')
        const libraryStatus = document.getElementById('library-status')
        const closeLibraryBtn = document.getElementById('close-library')
        const setTitleInput = document.getElementById('set-title')
        const setsList = document.getElementById('sets-list')
        const expectedCountSelect = document.getElementById('expected-count')
        const summaryWarning = document.getElementById('summary-warning')
        const authBtn = document.getElementById('auth-btn')
        const userInfo = document.getElementById('user-info')
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

        const choiceInputs = [
          document.getElementById('builder-choice-0'),
          document.getElementById('builder-choice-1'),
          document.getElementById('builder-choice-2'),
          document.getElementById('builder-choice-3'),
        ]
        const questionInput = document.getElementById('builder-question')
        const keywordsInput = document.getElementById('builder-keywords')

        let drafts = []
        let editingIndex = -1
        let currentUser = null
        const libraryState = {
          items: [],
          offset: 0,
          hasMore: false,
          loading: false,
          search: '',
        }
        const selectedExisting = new Map()
        const urlParams = new URLSearchParams(window.location.search)
        const initialSetId = urlParams.get('setId')
        const initialTemplateId = urlParams.get('templateId')
        const allowedCounts = [10, 20, 30, 40, 50, 60]
        let autoSaveTimer = null
        let autoSaveInFlight = false

        function goToLogin() {
          const redirect = window.location.pathname + window.location.search
          window.location.href = '/api/auth/google/login?redirect=' + encodeURIComponent(redirect)
        }

        if (authBtn) {
          authBtn.addEventListener('click', function() {
            goToLogin()
          })
        }

        function resetForm() {
          if (questionInput) questionInput.value = ''
          choiceInputs.forEach((input, idx) => {
            if (input) input.value = ''
            const radio = document.getElementById('builder-correct-' + idx)
            if (radio instanceof HTMLInputElement) radio.checked = idx === 0
          })
          if (keywordsInput) keywordsInput.value = ''
          editingIndex = -1
          if (builderAddBtn) builderAddBtn.style.display = 'inline-flex'
          if (builderUpdateBtn) builderUpdateBtn.style.display = 'none'
          if (builderMsg) builderMsg.textContent = ''
        }

        function parseKeywords(val) {
          if (!val) return undefined
          return val.split(/[,\\\\s]+/).map((w) => w.trim()).filter(Boolean)
        }

        function getFormData() {
          const questionText = questionInput ? questionInput.value.trim() : ''
          const choices = choiceInputs.map((input) => (input ? input.value.trim() : '')).filter(Boolean)
          const invalidChoice = choices.length < 2 || choices.some((c) => c.length === 0)
          const selectedRadio = document.querySelector('input[name="builder-correct"]:checked')
          const correctIndex = selectedRadio ? Number(selectedRadio.value) : 0
          const correctChoice = choiceInputs[correctIndex] ? choiceInputs[correctIndex].value.trim() : ''
          if (!questionText || invalidChoice || !correctChoice) {
            return null
          }
          return {
            question: questionText,
            choices: choiceInputs.map((input) => input ? input.value.trim() : '').filter((c) => c.length > 0),
            correctAnswer: correctChoice,
            keywords: parseKeywords(keywordsInput ? keywordsInput.value : ''),
          }
        }

        function renderDrafts() {
          if (!draftsList) return
          draftsList.innerHTML = ''
          if (drafts.length === 0) {
            const empty = document.createElement('p')
            empty.textContent = window.t('questionSets.drafts.empty')
            empty.style.opacity = '0.6'
            empty.style.fontSize = '0.9rem'
            draftsList.appendChild(empty)
          } else {
            drafts.forEach((draft, index) => {
              const item = document.createElement('div')
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '10px'
              item.style.padding = '12px'
              item.style.display = 'grid'
              item.style.gap = '8px'
              item.innerHTML = (
                '<div style="font-weight:600">' + draft.question + '</div>' +
                '<div style="font-size:0.85rem;opacity:0.7">' + window.t('questionSets.choiceCount').replace('{count}', String(draft.choices.length)) + '</div>' +
                (draft.keywords && draft.keywords.length ? '<div style="font-size:0.8rem;opacity:0.6">#' + draft.keywords.join(' #') + '</div>' : '') +
                '<div style="display:flex;gap:8px">' +
                  '<button class="btn" data-action="edit" data-index="' + index + '" style="font-size:0.8rem">' + window.t('questionSets.drafts.edit') + '</button>' +
                  '<button class="btn" data-action="remove" data-index="' + index + '" style="font-size:0.8rem">' + window.t('questionSets.drafts.remove') + '</button>' +
                '</div>'
              )
              draftsList.appendChild(item)
            })
          }

          if (draftCount) {
            draftCount.textContent = window.t('questionSets.drafts.count').replace('{count}', String(drafts.length))
          }
          renderSummary()
        }

        function getTargetCount() {
          if (!expectedCountSelect) return allowedCounts[0]
          const value = parseInt(expectedCountSelect.value, 10)
          if (allowedCounts.indexOf(value) === -1) {
            expectedCountSelect.value = String(allowedCounts[0])
            return allowedCounts[0]
          }
          return value
        }

        function updateSummaryWarning() {
          if (!summaryWarning) return
          const total = drafts.length + selectedExisting.size
          const target = getTargetCount()
          if (total === target) {
            summaryWarning.style.display = 'none'
            summaryWarning.textContent = ''
            return
          }
          const remaining = target - total
          summaryWarning.style.display = 'block'
          if (remaining > 0) {
            summaryWarning.style.color = '#d97706'
            summaryWarning.textContent = window.t('questionSets.summary.mismatch').replace('{remaining}', String(remaining))
          } else {
            summaryWarning.style.color = '#b91c1c'
            summaryWarning.textContent = window.t('questionSets.summary.overLimit').replace('{extra}', String(Math.abs(remaining)))
          }
        }

        function renderSummary() {
          if (summaryTotal) {
            const total = drafts.length + selectedExisting.size
            const target = getTargetCount()
            summaryTotal.textContent = window.t('questionSets.summary.total')
              .replace('{count}', String(total))
              .replace('{target}', String(target))
          }
          updateSummaryWarning()
        }

        function scheduleAutoSave() {
          if (autoSaveInFlight) return
          if (autoSaveTimer) window.clearTimeout(autoSaveTimer)
          autoSaveTimer = window.setTimeout(function() {
            submitQuestionSet('draft', true)
          }, 1500)
        }

        function renderLibrary() {
          if (!libraryList) return
          libraryList.innerHTML = ''
          if (!libraryState.items.length) {
            const empty = document.createElement('p')
            empty.style.textAlign = 'center'
            empty.style.opacity = '0.6'
            empty.style.padding = '16px'
            empty.textContent = window.t('questionSets.library.empty')
            libraryList.appendChild(empty)
          } else {
            libraryState.items.forEach((q) => {
              const item = document.createElement('div')
              item.style.display = 'flex'
              item.style.gap = '12px'
              item.style.padding = '12px'
              item.style.border = '1px solid #e5e7eb'
              item.style.borderRadius = '8px'
              const checked = selectedExisting.has(q.id)
              item.innerHTML = (
                '<input type="checkbox" data-question-id="' + q.id + '" ' + (checked ? 'checked' : '') + ' style="margin-top:4px" />' +
                '<div style="flex:1;cursor:pointer" data-question-id="' + q.id + '">' +
                  '<div style="font-weight:600;margin-bottom:4px">' + q.question + '</div>' +
                  '<div style="font-size:0.8rem;opacity:0.6">' + window.t('questionSets.choiceCount').replace('{count}', String(q.choices ? q.choices.length : 0)) + '</div>' +
                '</div>'
              )
              libraryList.appendChild(item)
            })
          }

          libraryList.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
            checkbox.addEventListener('change', function() {
              const questionId = this.getAttribute('data-question-id')
              const question = libraryState.items.find((item) => item.id === questionId)
              if (!question) return
              if (this.checked) {
                selectedExisting.set(questionId, question)
              } else {
                selectedExisting.delete(questionId)
              }
              renderSummary()
              scheduleAutoSave()
            })
          })

          libraryList.querySelectorAll('div[data-question-id]').forEach((div) => {
            div.addEventListener('click', function(e) {
              if (e.target && e.target.tagName === 'INPUT') return
              const questionId = this.getAttribute('data-question-id')
              const checkbox = libraryList.querySelector('input[data-question-id="' + questionId + '"]')
              if (checkbox) {
                checkbox.checked = !checkbox.checked
                checkbox.dispatchEvent(new Event('change'))
              }
            })
          })

          if (libraryStatus) {
            libraryStatus.textContent = libraryState.loading
              ? window.t('questionSets.library.loading')
              : window.t('questionSets.library.selected').replace('{count}', String(selectedExisting.size))
          }

          if (libraryLoadMore) {
            libraryLoadMore.style.display = libraryState.hasMore ? 'inline-flex' : 'none'
          }
          renderSummary()
        }

        async function loadLibrary(reset = false) {
          if (libraryState.loading) return
          libraryState.loading = true
          if (reset) {
            libraryState.offset = 0
            libraryState.items = []
            libraryState.hasMore = false
          }
          renderLibrary()

          const params = new URLSearchParams({
            limit: '20',
            offset: String(libraryState.offset),
          })
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

        function toggleLibrary(show) {
          if (!libraryPanel) return
          libraryPanel.style.display = show ? 'grid' : 'none'
          if (show && libraryState.items.length === 0) {
            loadLibrary(true)
          }
        }

        function showBuilderMessage(text, isError) {
          if (!builderMsg) return
          builderMsg.textContent = text || ''
          builderMsg.style.color = isError ? '#d00' : '#059669'
        }

        function showSummaryMessage(text, isError) {
          if (!summaryMsg) return
          summaryMsg.textContent = text || ''
          summaryMsg.style.color = isError ? '#d00' : '#059669'
        }

        async function loadExistingSet(setId) {
          try {
            const res = await fetch('/api/question-sets/' + setId, { credentials: 'include' })
            if (!res.ok) throw new Error('failed')
            const data = await res.json()
            const tpl = data || {}
            if (tpl && tpl.title && setTitleInput) {
              setTitleInput.value = tpl.title
            }
            if (tpl.questions && Array.isArray(tpl.questions)) {
              drafts = tpl.questions.map(function(q) {
                return {
                  tempId: 'loaded-' + q.id,
                  question: q.question,
                  choices: q.choices || [],
                  correctAnswer: q.correctAnswer || (q.choices && q.choices[0]) || '',
                  keywords: q.keywords,
                  savedId: q.id,
                }
              })
            }
            if (expectedCountSelect) {
              const incoming = tpl.expectedCount && allowedCounts.indexOf(tpl.expectedCount) >= 0
                ? tpl.expectedCount
                : allowedCounts[0]
              expectedCountSelect.value = String(incoming)
            }
            currentState.setId = setId
            if (initialTemplateId) currentState.templateId = initialTemplateId
            if (summaryCancelBtn) {
              summaryCancelBtn.style.display = 'inline-flex'
              summaryCancelBtn.addEventListener('click', function() {
                currentState.setId = null
                currentState.templateId = null
                if (setTitleInput) setTitleInput.value = ''
                drafts = []
                if (expectedCountSelect) expectedCountSelect.value = String(allowedCounts[0])
                renderDrafts()
                showSummaryMessage('', false)
                summaryCancelBtn.style.display = 'none'
              })
            }
            renderDrafts()
          } catch (e) {
            console.error('Failed to load set', e)
          }
        }

        if (builderAddBtn) {
          builderAddBtn.addEventListener('click', function() {
            const data = getFormData()
            if (!data) {
              showBuilderMessage(window.t('questionSets.builder.invalid'), true)
              return
            }
            drafts.push({
              tempId: 'draft-' + Date.now() + '-' + Math.random().toString(16).slice(2),
              question: data.question,
              choices: data.choices,
              correctAnswer: data.correctAnswer,
              keywords: data.keywords,
              savedId: undefined,
            })
            showBuilderMessage(window.t('questionSets.builder.saved'), false)
            resetForm()
            renderDrafts()
            scheduleAutoSave()
          })
        }

        if (builderUpdateBtn) {
          builderUpdateBtn.addEventListener('click', function() {
            if (editingIndex < 0 || editingIndex >= drafts.length) {
              resetForm()
              return
            }
            const data = getFormData()
            if (!data) {
              showBuilderMessage(window.t('questionSets.builder.invalid'), true)
              return
            }
            drafts[editingIndex] = {
              ...drafts[editingIndex],
              question: data.question,
              choices: data.choices,
              correctAnswer: data.correctAnswer,
              keywords: data.keywords,
              savedId: undefined,
            }
            showBuilderMessage(window.t('questionSets.builder.updated'), false)
            resetForm()
            renderDrafts()
            scheduleAutoSave()
          })
        }

        if (builderResetBtn) {
          builderResetBtn.addEventListener('click', function() {
            resetForm()
          })
        }

        if (setTitleInput) {
          setTitleInput.addEventListener('input', function() {
            scheduleAutoSave()
          })
        }

        if (expectedCountSelect) {
          expectedCountSelect.addEventListener('change', function() {
            renderSummary()
            scheduleAutoSave()
          })
        }

        if (draftsList) {
          draftsList.addEventListener('click', function(e) {
            const target = e.target
            if (!(target instanceof HTMLElement) || !target.getAttribute) return
            const action = target.getAttribute('data-action')
            const index = Number(target.getAttribute('data-index') || -1)
            if (Number.isNaN(index) || index < 0 || index >= drafts.length) return
            if (action === 'edit') {
              const draft = drafts[index]
              if (questionInput) questionInput.value = draft.question
              draft.choices.forEach((choice, idx) => {
                if (choiceInputs[idx]) choiceInputs[idx].value = choice
                const radio = document.getElementById('builder-correct-' + idx)
                if (radio instanceof HTMLInputElement) {
                  radio.checked = choice === draft.correctAnswer
                }
              })
              if (keywordsInput) keywordsInput.value = draft.keywords ? draft.keywords.join(' ') : ''
              editingIndex = index
              if (builderAddBtn) builderAddBtn.style.display = 'none'
              if (builderUpdateBtn) builderUpdateBtn.style.display = 'inline-flex'
              showBuilderMessage('', false)
            } else if (action === 'remove') {
              drafts.splice(index, 1)
              renderDrafts()
              scheduleAutoSave()
            }
          })
        }

        if (openLibraryBtn) {
          openLibraryBtn.addEventListener('click', function() {
            toggleLibrary(libraryPanel && libraryPanel.style.display !== 'grid')
          })
        }

        if (closeLibraryBtn) {
          closeLibraryBtn.addEventListener('click', function() {
            toggleLibrary(false)
          })
        }

        if (libraryLoadMore) {
          libraryLoadMore.addEventListener('click', function() {
            loadLibrary(false)
          })
        }

        let searchTimer
        if (librarySearch) {
          librarySearch.addEventListener('input', function() {
            window.clearTimeout(searchTimer)
            libraryState.search = librarySearch.value.trim()
            searchTimer = window.setTimeout(function() {
              loadLibrary(true)
            }, 400)
          })
        }

        async function ensureDraftSaved(draft, lang) {
          if (draft.savedId) {
            const res = await fetch('/api/questions/' + draft.savedId, {
              method: 'PUT',
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify({
                question: draft.question,
                choices: draft.choices,
                correctAnswer: draft.correctAnswer,
                lang,
                keywords: draft.keywords,
              })
            })
            if (!res.ok) {
              const json = await res.json().catch(() => ({}))
              throw new Error(json.error || window.t('questions.error'))
            }
            return draft.savedId
          }
          const res = await fetch('/api/questions/create', {
            method: 'POST',
            credentials: 'include',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify({
              question: draft.question,
              choices: draft.choices,
              correctAnswer: draft.correctAnswer,
              lang,
              keywords: draft.keywords,
              status: 'published',
            })
          })
          if (!res.ok) {
            const json = await res.json().catch(() => ({}))
            throw new Error(json.error || window.t('questions.error'))
          }
          const json = await res.json()
          draft.savedId = json.id
          return draft.savedId
        }

        const currentState = {
          setId: null,
          templateId: null,
        }

        async function submitQuestionSet(status, isAuto) {
          const auto = Boolean(isAuto)
          const total = drafts.length + selectedExisting.size
          const target = getTargetCount()

          if (!auto && total === 0) {
            showSummaryMessage(window.t('questionSets.summary.validate'), true)
            return
          }

          if (allowedCounts.indexOf(target) === -1) {
            if (!auto) showSummaryMessage(window.t('questionSets.summary.invalidTarget'), true)
            return
          }

          if (status === 'published' && total !== target) {
            showSummaryMessage(window.t('questionSets.summary.publishMismatch'), true)
            return
          }

          if (auto && total === 0 && !currentState.setId) {
            return
          }

          if (auto) {
            autoSaveInFlight = true
          } else {
            showSummaryMessage(window.t('questionSets.createInProgress'), false)
            summarySaveDraftBtn && summarySaveDraftBtn.setAttribute('disabled', 'true')
            summaryPublishBtn && summaryPublishBtn.setAttribute('disabled', 'true')
          }

          try {
            const ids = []
            for (const draft of drafts) {
              const id = await ensureDraftSaved(draft, lang)
              ids.push(id)
            }
            selectedExisting.forEach((value, key) => ids.push(key))

            const payload = {
              title: setTitleInput ? setTitleInput.value.trim() : undefined,
              lang,
              questionIds: ids,
              expectedCount: target,
              status,
            }

            let endpoint = '/api/question-sets/create'
            let method = 'POST'
            if (currentState.setId) {
              endpoint = '/api/question-sets/' + currentState.setId
              method = 'PUT'
            }

            const res = await fetch(endpoint, {
              method,
              credentials: 'include',
              headers: { 'content-type': 'application/json' },
              body: JSON.stringify(payload),
            })

            if (!res.ok) {
              const json = await res.json().catch(() => ({}))
              throw new Error(json.error || window.t('questionSets.createError'))
            }

            const json = await res.json().catch(() => ({}))
            if (!currentState.setId && json && json.id) {
              currentState.setId = json.id
            }

            if (!auto) {
              showSummaryMessage(window.t('questionSets.createSuccess'), false)
            }

            if (!currentState.setId) {
              drafts = []
              selectedExisting.clear()
              if (setTitleInput) setTitleInput.value = ''
              if (expectedCountSelect) expectedCountSelect.value = String(allowedCounts[0])
            }

            renderDrafts()
            renderLibrary()
            toggleLibrary(false)
            loadSets()
          } catch (e) {
            if (auto) {
              console.error('Auto-save failed', e)
            } else {
              showSummaryMessage(e.message || window.t('questionSets.createError'), true)
            }
          } finally {
            if (auto) {
              autoSaveInFlight = false
            } else {
              summarySaveDraftBtn && summarySaveDraftBtn.removeAttribute('disabled')
              summaryPublishBtn && summaryPublishBtn.removeAttribute('disabled')
            }
          }
        }

        if (summarySaveDraftBtn) {
          summarySaveDraftBtn.addEventListener('click', function() {
            submitQuestionSet('draft', false)
          })
        }

        if (summaryPublishBtn) {
          summaryPublishBtn.addEventListener('click', function() {
            submitQuestionSet('published', false)
          })
        }

        async function loadSets() {
          if (!setsList) return
          setsList.innerHTML = '<p style="padding:16px;text-align:center;opacity:0.6">' + window.t('room.loading') + '</p>'
          
          try {
            const res = await fetch('/api/question-sets/list', { credentials: 'include' })
            if (!res.ok) throw new Error('Failed to load question sets')
            const data = await res.json()
            const sets = data.sets || []
            
            if (sets.length === 0) {
              setsList.innerHTML = (
                '<div style="text-align:center;padding:40px">' +
                  '<p style="opacity:0.7;margin-bottom:16px">' + window.t('questionSets.empty') + '</p>' +
                  '<div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">' +
                    '<a href="/' + lang + '/create-question" class="btn">' + window.t('questions.create') + '</a>' +
                    '<button id="create-set-from-all" class="btn btn-primary">' + window.t('questionSets.create') + '</button>' +
                  '</div>' +
                  '<p style="margin-top:16px;font-size:0.875rem;opacity:0.6">' + window.t('questionSets.createHint') + '</p>' +
                '</div>'
              )
              // 如果有题目，自动显示创建表单
              const createSetBtn = document.getElementById('create-set-from-all')
              if (createSetBtn) {
                createSetBtn.addEventListener('click', function() {
                  showCreateForm()
                })
              }
              return
            }
            
            setsList.innerHTML = ''
            sets.forEach(function(set) {
              const div = document.createElement('div')
              div.style.display = 'flex'
              div.style.gap = '16px'
              div.style.padding = '16px'
              div.style.border = '1px solid #ddd'
              div.style.borderRadius = '12px'
              div.style.alignItems = 'center'
              div.style.background = '#fff'
              div.innerHTML = (
                '<div style="flex:1">' +
                  '<div style="font-weight:600;margin-bottom:4px">' + (set.title || window.t('questionSets.untitled')) + '</div>' +
                  '<div style="font-size:0.875rem;opacity:0.7">' + window.t('questionSets.questionCount').replace('{count}', String(set.questionIds.length)) + '</div>' +
                '</div>' +
                '<button class="btn btn-primary" data-set-id="' + set.id + '">' + window.t('questionSets.select') + '</button>'
              )
              setsList.appendChild(div)
              
              const selectBtn = div.querySelector('button[data-set-id]')
              if (selectBtn) {
                selectBtn.addEventListener('click', function() {
                  const setId = this.getAttribute('data-set-id')
                  window.location.href = '/' + lang + '/create-room?setId=' + setId
                })
              }
            })
          } catch (e) {
            console.error('Failed to load sets:', e)
            setsList.innerHTML = '<p style="color:#d00;padding:16px">' + window.t('errors.networkError') + '</p>'
          }
        }
        
        async function initAuth() {
          try {
            const res = await fetch('/api/auth/me', { credentials: 'include' })
            if (res.ok) {
              const json = await res.json()
              if (json && json.authenticated && json.user) {
                currentUser = json.user
                if (authBtn) authBtn.style.display = 'none'
                if (userMenu && typeof userMenu.applyUser === 'function') {
                  userMenu.applyUser(json.user)
                } else if (userInfo) {
                  userInfo.style.display = 'flex'
                }
                return
              }
            }
          } catch (e) {
            console.error('Auth init failed', e)
          }
          currentUser = null
          if (authBtn) authBtn.style.display = 'block'
          if (userMenu && typeof userMenu.clearUser === 'function') {
            userMenu.clearUser()
          } else if (userInfo) {
            userInfo.style.display = 'none'
          }
        }

        resetForm()
        if (initialSetId) {
          await loadExistingSet(initialSetId)
        } else {
          renderDrafts()
        }
        await initAuth()
        loadSets()
      })()
    </script> </body> </html>`])), addAttribute(lang, "lang"), renderComponent($$result, "SeoMeta", $$SeoMeta, { "lang": lang, "title": title, "description": desc, "path": path, "siteOrigin": siteOrigin }), renderHead(), addAttribute(`/${lang}/`, "href"), serverT("nav.home"), serverT("auth.login"), serverT("questionSets.title"), serverT("questionSets.builder.newQuestionTitle"), serverT("questionSets.builder.reset"), serverT("questions.form.question"), addAttribute(serverT("questions.form.questionPlaceholder"), "placeholder"), serverT("questions.form.choices"), addAttribute(serverT("questions.form.choicePlaceholder").replace("{count}", "1"), "placeholder"), addAttribute(serverT("questions.form.choicePlaceholder").replace("{count}", "2"), "placeholder"), addAttribute(serverT("questions.form.choicePlaceholder").replace("{count}", "3"), "placeholder"), addAttribute(serverT("questions.form.choicePlaceholder").replace("{count}", "4"), "placeholder"), serverT("questions.form.keywords"), serverT("questionSets.builder.keywordsHint"), serverT("questionSets.builder.add"), serverT("questionSets.builder.update"), serverT("questionSets.drafts.title"), serverT("questionSets.setTitle"), addAttribute(serverT("questionSets.setTitlePlaceholder"), "placeholder"), serverT("questionSets.summary.expectedLabel"), serverT("questionSets.summary.expectedHint"), serverT("questionSets.library.open"), serverT("questionSets.summary.saveDraft"), serverT("questionSets.summary.publish"), serverT("questions.form.cancel"), serverT("questionSets.library.title"), addAttribute(serverT("questionSets.library.searchPlaceholder"), "placeholder"), serverT("questionSets.library.close"), serverT("questionSets.library.loadMore"), serverT("questionSets.mySets"), serverT("room.loading"));
}, "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/question-sets.astro", void 0);
const $$file = "/Users/yichen/Downloads/cursor/QuizyParty/src/pages/[lang]/question-sets.astro";
const $$url = "/[lang]/question-sets";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$QuestionSets,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
