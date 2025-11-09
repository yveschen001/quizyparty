/* global window, document */

function ensureTranslate(fn) {
  if (typeof fn === 'function') return fn
  return function (key) {
    return key
  }
}

function markHomeNeedsRefresh() {
  try {
    window.localStorage.setItem('qp_home_refresh', String(Date.now()))
  } catch (e) {
    console.warn('[rooms-manager] failed to set home refresh flag', e)
  }
}

async function ensureLiveRoom(lang, questionSetId, templateId) {
  const targetSetId = questionSetId || templateId
  if (!targetSetId) return false
  const roomId = templateId || targetSetId
  try {
    const res = await fetch('/api/rooms', {
      method: 'POST',
      credentials: 'include',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        lang: lang,
        questionSetId: targetSetId,
        roomId: roomId,
        replaceExisting: true,
      }),
    })
    if (!res.ok) {
      const errorText = await res.text().catch(function () {
        return ''
      })
      console.warn('[rooms-manager] ensureLiveRoom failed', res.status, errorText)
      return false
    }
    return true
  } catch (e) {
    console.error('[rooms-manager] ensureLiveRoom exception', e)
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
      const errorText = await res.text().catch(function () {
        return ''
      })
      console.warn('[rooms-manager] removeLiveRoom failed', res.status, errorText)
      return false
    }
    return true
  } catch (e) {
    console.error('[rooms-manager] removeLiveRoom exception', e)
    return false
  }
}

export function setupRoomsManager(config) {
  const listEl = config && config.listEl ? config.listEl : null
  if (!listEl) return null
  if (!listEl.getAttribute('role')) {
    listEl.setAttribute('role', 'tabpanel')
  }

  const paginationEl = config && config.paginationEl ? config.paginationEl : null
  const tabs = Array.isArray(config && config.tabs) ? config.tabs : []
  const t = ensureTranslate(config && config.t)
  const lang = config && config.lang ? config.lang : 'en'
  const pageSize =
    config && typeof config.pageSize === 'number' && config.pageSize > 0 ? config.pageSize : 10
  const notify = typeof config.onNotify === 'function' ? config.onNotify : null
  const editBaseUrl = '/' + lang + '/create-room'
  const featureV3 =
    document.body && document.body.dataset
      ? document.body.dataset.featureV3 === 'true'
      : false
  const emptyAction =
    config && config.emptyAction && typeof config.emptyAction === 'object'
      ? config.emptyAction
      : null
  const translateStatus = function (status) {
    if (status === 'published') return t('roomTemplates.status.published')
    return t('roomTemplates.status.draft')
  }

  let currentStatus = config && config.initialStatus ? config.initialStatus : 'published'
  let currentOffset = 0
  let currentTotal = 0
  let loading = false
  let filterFn = typeof config.filter === 'function' ? config.filter : null
  let emptyText = config && config.emptyText ? config.emptyText : ''

  function setActiveTab(status) {
    for (let i = 0; i < tabs.length; i += 1) {
      const tab = tabs[i]
      if (!tab || !tab.button) continue
      if (!tab.button.hasAttribute('role')) {
        tab.button.setAttribute('role', 'tab')
      }
      const isActive = tab.status === status
      const isDesignTab = tab.button.classList.contains('tab')
      if (isActive) {
        if (isDesignTab) {
          tab.button.classList.add('active')
        } else {
          tab.button.classList.add('btn-primary')
          tab.button.classList.remove('btn')
        }
      } else {
        if (isDesignTab) {
          tab.button.classList.remove('active')
        } else {
          tab.button.classList.remove('btn-primary')
          tab.button.classList.add('btn')
        }
      }
      tab.button.setAttribute('aria-pressed', isActive ? 'true' : 'false')
      tab.button.setAttribute('aria-selected', isActive ? 'true' : 'false')
      tab.button.setAttribute('tabindex', isActive ? '0' : '-1')
      if (isActive && listEl && tab.button.id) {
        listEl.setAttribute('aria-labelledby', tab.button.id)
        if (!listEl.hasAttribute('tabindex')) {
          listEl.setAttribute('tabindex', '-1')
        }
      }
    }
  }

  function showLoading() {
    if (featureV3) {
      listEl.innerHTML =
        '<div class="card card-skeleton" style="min-height:112px"></div>' +
        '<div class="card card-skeleton" style="min-height:112px"></div>'
      return
    }
    listEl.innerHTML =
      '<p style="padding:16px;text-align:center;opacity:0.6">' + t('room.loading') + '</p>'
  }

  function showEmpty(status) {
    const text = emptyText || t('roomTemplates.empty')
    const rendered = text.replace('{status}', translateStatus(status))
    if (featureV3) {
      var html =
        '<div class="card stack text-center"><p class="p text-muted">' + rendered + '</p>'
      if (emptyAction && emptyAction.href && emptyAction.label) {
        html +=
          '<a class="btn btn-primary" href="' +
          emptyAction.href +
          '">' +
          emptyAction.label +
          '</a>'
      }
      html += '</div>'
      listEl.innerHTML = html
      return
    }
    listEl.innerHTML =
      '<p style="padding:16px;text-align:center;opacity:0.6">' + rendered + '</p>'
  }

  function buildCard(template) {
    if (window.RoomTemplates && typeof window.RoomTemplates.buildBuilderCard === 'function') {
      return window.RoomTemplates.buildBuilderCard(template, {
        lang: lang,
        t: t,
        featureV3: featureV3,
      })
    }
    const card = document.createElement('div')
    if (featureV3) {
      card.className = 'card'
    } else {
      card.style.border = '1px solid #e5e7eb'
      card.style.borderRadius = '12px'
      card.style.padding = '16px'
    }
    card.textContent = template && template.title ? template.title : t('questionSets.untitled')
    return card
  }

  function updatePagination(total, limit, offset) {
    if (!paginationEl) return
    if (!window.RoomTemplates || typeof window.RoomTemplates.getPagination !== 'function') {
      paginationEl.classList.add('is-hidden')
      paginationEl.innerHTML = ''
      return
    }
    const info = window.RoomTemplates.getPagination(total, limit, offset)
    if (!info || info.totalPages <= 1) {
      paginationEl.classList.add('is-hidden')
      paginationEl.innerHTML = ''
      paginationEl.removeAttribute('data-total')
      paginationEl.removeAttribute('data-limit')
      paginationEl.removeAttribute('data-offset')
      return
    }
    paginationEl.classList.remove('is-hidden')
    paginationEl.setAttribute('data-total', String(info.total))
    paginationEl.setAttribute('data-limit', String(info.limit))
    paginationEl.setAttribute('data-offset', String(info.offset))
    paginationEl.innerHTML = window.RoomTemplates.buildPagination(info, t)
  }

  function handleError() {
    listEl.innerHTML = featureV3
      ? '<div class="card"><p class="caption text-center text-danger">' +
        t('errors.networkError') +
        '</p></div>'
      : '<p style="padding:16px;text-align:center;color:#d00">' + t('errors.networkError') + '</p>'
    updatePagination(0, pageSize, 0)
  }

  async function load(status, requestedOffset) {
    if (loading) return
    loading = true
    currentStatus = status
    currentOffset =
      typeof requestedOffset === 'number' && requestedOffset >= 0 ? requestedOffset : 0
    setActiveTab(status)
    showLoading()
    try {
      const params = new URLSearchParams()
      params.set('status', status)
      params.set('limit', String(pageSize))
      params.set('offset', String(currentOffset))
      const response = await fetch('/api/room-templates?' + params.toString(), {
        credentials: 'include',
      })
      if (response.status === 401) {
        listEl.innerHTML =
          '<p style="padding:16px;text-align:center;opacity:0.6">' +
          t('profile.notLoggedIn') +
          '</p>'
        updatePagination(0, pageSize, 0)
        loading = false
        return
      }
      if (!response.ok) {
        handleError()
        loading = false
        return
      }
      const json = await response.json()
      const templates = Array.isArray(json.templates) ? json.templates : []
      currentTotal = typeof json.total === 'number' ? json.total : templates.length
      const limitFromApi = typeof json.limit === 'number' && json.limit > 0 ? json.limit : pageSize
      const offsetFromApi =
        typeof json.offset === 'number' && json.offset >= 0 ? json.offset : currentOffset
      let filtered = templates
      // 客端排序/過濾（由 URL ?sort=?status= 控制），最小入侵：存在 RoomsFilters 時才套用
      try {
        if (window.RoomsFilters) {
          const q = new URLSearchParams(location.search)
          const statusFromUrl = q.get('status') || 'all'
          const sortFromUrl = q.get('sort') || 'updated'
          // 轉為通用結構以便排序（僅取必要欄位）
          const mapped = templates.map(function (tpl) {
            return {
              _orig: tpl,
              id: tpl && tpl.id,
              title: tpl && tpl.title,
              updatedAt: tpl && tpl.updatedAt,
              participants: tpl && tpl.participants,
              status: tpl && tpl.status === 'draft' ? 'draft' : 'public',
            }
          })
          let arr = window.RoomsFilters.filterCreated(mapped, statusFromUrl)
          arr = window.RoomsFilters.sortCreated(arr, sortFromUrl)
          filtered = arr.map(function (x) {
            return x._orig
          })
        }
      } catch (e) {}
      if (filterFn) {
        filtered = templates.filter(function (item) {
          return filterFn(item)
        })
      }
      filtered.sort(function (a, b) {
        const aTime = new Date(a && a.updatedAt ? a.updatedAt : 0).getTime()
        const bTime = new Date(b && b.updatedAt ? b.updatedAt : 0).getTime()
        return bTime - aTime
      })
      listEl.innerHTML = ''
      if (!filtered.length) {
        showEmpty(status)
        updatePagination(currentTotal, limitFromApi, offsetFromApi)
        loading = false
        return
      }
      for (let i = 0; i < filtered.length; i += 1) {
        const tpl = filtered[i]
        const card = buildCard(tpl)
        if (!card) continue
        listEl.appendChild(card)
      }
      updatePagination(currentTotal, limitFromApi, offsetFromApi)
    } catch (e) {
      console.error('[rooms-manager] load failed', e)
      handleError()
    }
    loading = false
  }

  async function handleAction(action, templateId, setId, previousStatus) {
    if (!templateId) return
    const wasPublished = previousStatus === 'published'
    try {
      if (action === 'edit') {
        const targetSetId = setId || templateId
        window.location.href =
          editBaseUrl +
          '?setId=' +
          encodeURIComponent(targetSetId) +
          '&templateId=' +
          encodeURIComponent(templateId)
        return
      }
      if (action === 'delete') {
        if (!window.confirm(t('profile.rooms.deleteConfirmLabel'))) return
        const res = await fetch('/api/room-templates/' + templateId, {
          method: 'DELETE',
          credentials: 'include',
        })
        if (!res.ok) {
          const text = await res.text().catch(function () {
            return ''
          })
          console.warn('[rooms-manager] delete failed', res.status, text)
          if (notify) notify(t('errors.networkError'), true)
          return
        }
        await removeLiveRoom(templateId)
        if (wasPublished) {
          markHomeNeedsRefresh()
        }
        if (notify) notify(t('profile.rooms.deleteSuccess'), false)
      } else if (action === 'publish' || action === 'unpublish') {
        const nextStatus = action === 'publish' ? 'published' : 'draft'
        const res = await fetch('/api/room-templates/' + templateId, {
          method: 'PUT',
          credentials: 'include',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ status: nextStatus }),
        })
        if (!res.ok) {
          const text = await res.text().catch(function () {
            return ''
          })
          console.warn('[rooms-manager] status update failed', res.status, text)
          if (notify) notify(t('errors.networkError'), true)
          return
        }
        const questionSetId = setId || templateId
        if (nextStatus === 'published') {
          await ensureLiveRoom(lang, questionSetId, templateId)
          markHomeNeedsRefresh()
          currentStatus = 'published'
          currentOffset = 0
          setActiveTab('published')
          if (notify) notify(t('createRoom.builder.publishSuccess'), false)
        } else {
          await removeLiveRoom(templateId)
          markHomeNeedsRefresh()
          currentStatus = 'draft'
          currentOffset = 0
          setActiveTab('draft')
          if (notify) notify(t('profile.rooms.status.draft'), false)
        }
      }
      await load(currentStatus, currentOffset)
    } catch (e) {
      console.error('[rooms-manager] action failed', e)
      if (notify) notify(t('errors.networkError'), true)
    }
  }

  listEl.addEventListener('click', function (event) {
    const target = event.target && event.target.closest('[data-action]')
    if (!target) return
    const action = target.getAttribute('data-action')
    if (!action) return
    const card = target.closest('[data-template-card]')
    const templateId =
      target.getAttribute('data-template-id') || (card ? card.getAttribute('data-template-id') : '')
    const setAttr = target.getAttribute('data-set-id')
    const cardSetAttr = card
      ? card.getAttribute('data-set-id') || card.getAttribute('data-question-set-id')
      : ''
    const setId = setAttr || cardSetAttr
    const previousStatus = card ? card.getAttribute('data-template-status') || '' : ''
    handleAction(action, templateId, setId, previousStatus)
  })

  if (paginationEl) {
    paginationEl.addEventListener('click', function (event) {
      const button = event.target && event.target.closest('[data-action]')
      if (!button) return
      const action = button.getAttribute('data-action')
      const totalAttr = paginationEl.getAttribute('data-total') || '0'
      const limitAttr = paginationEl.getAttribute('data-limit') || String(pageSize)
      const offsetAttr = paginationEl.getAttribute('data-offset') || '0'
      const total = Number(totalAttr)
      const limit = Number(limitAttr)
      const offset = Number(offsetAttr)
      if (!window.RoomTemplates || typeof window.RoomTemplates.getPagination !== 'function') return
      const info = window.RoomTemplates.getPagination(total, limit, offset)
      if (action === 'prev' && info.hasPrev) {
        load(currentStatus, info.prevOffset)
      }
      if (action === 'next' && info.hasNext) {
        load(currentStatus, info.nextOffset)
      }
    })
  }

  for (let i = 0; i < tabs.length; i += 1) {
    const tab = tabs[i]
    if (!tab || !tab.button) continue
    tab.button.addEventListener('click', function () {
      const status = tab.status || 'published'
      if (status === currentStatus && !filterFn) {
        return
      }
      currentOffset = 0
      load(status, 0)
    })
    tab.button.addEventListener('keydown', function (event) {
      const key = event.key
      if (!key) return
      if (key === 'ArrowRight' || key === 'ArrowLeft') {
        event.preventDefault()
        const dir = key === 'ArrowRight' ? 1 : -1
        const currentIndex = tabs.indexOf(tab)
        const nextIndex = (currentIndex + dir + tabs.length) % tabs.length
        const nextTab = tabs[nextIndex]
        if (nextTab && nextTab.button) {
          nextTab.button.focus()
          const status = nextTab.status || 'published'
          if (status !== currentStatus || filterFn) {
            currentOffset = 0
            load(status, 0)
          }
        }
        return
      }
      if (key === 'Home') {
        event.preventDefault()
        const firstTab = tabs[0]
        if (firstTab && firstTab.button) {
          firstTab.button.focus()
          const status = firstTab.status || 'published'
          if (status !== currentStatus || filterFn) {
            currentOffset = 0
            load(status, 0)
          }
        }
        return
      }
      if (key === 'End') {
        event.preventDefault()
        const lastTab = tabs[tabs.length - 1]
        if (lastTab && lastTab.button) {
          lastTab.button.focus()
          const status = lastTab.status || 'draft'
          if (status !== currentStatus || filterFn) {
            currentOffset = 0
            load(status, 0)
          }
        }
      }
    })
  }

  load(currentStatus, 0)

  return {
    refresh: function () {
      load(currentStatus, currentOffset)
    },
    switchStatus: function (status) {
      currentOffset = 0
      load(status, 0)
    },
    setFilter: function (fn) {
      filterFn = typeof fn === 'function' ? fn : null
      currentOffset = 0
      load(currentStatus, 0)
    },
    setEmptyText: function (text) {
      emptyText = text || ''
    },
    getStatus: function () {
      return currentStatus
    },
  }
}
