/* global window, document */

(function(global) {
  var RoomTemplates = {}

  function ensureTranslate(fn) {
    if (typeof fn === 'function') return fn
    return function(key) { return key }
  }

  function escapeHtml(value) {
    if (value === null || value === undefined) return ''
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }

  function formatDate(timestamp, lang) {
    if (!timestamp) return ''
    var date = new Date(timestamp)
    if (!date || !date.getTime || !date.getTime()) return ''
    var locale = lang === 'zh-hant' || lang === 'zh-hans' ? 'zh-TW' : lang
    try {
      return date.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' })
    } catch {
      try {
        return date.toLocaleDateString()
      } catch {
        return ''
      }
    }
  }

  function getQuestionCount(template) {
    if (!template || !template.questionSet || !template.questionSet.questionCount) return 0
    return template.questionSet.questionCount
  }

  function getStatusInfo(status, t) {
    var label = t('roomTemplates.status.draft')
    var color = '#6b7280'
    if (status === 'published') {
      label = t('roomTemplates.status.published')
      color = '#16a34a'
    }
    return { label: label, color: color }
  }

  function buildMetaHtml(template, lang, t) {
    var safeTitle = escapeHtml(template && template.title ? template.title : t('questionSets.untitled'))
    var statusInfo = getStatusInfo(template && template.status ? template.status : 'draft', t)
    var questionCount = getQuestionCount(template)
    var questionText = t('questionSets.questionCount').replace('{count}', String(questionCount))
    var updatedText = template && template.updatedAt ? formatDate(template.updatedAt, lang) : ''
    var metaHtml = ''
    metaHtml += '<div style="display:grid;gap:6px">'
    metaHtml +=   '<div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap">'
    metaHtml +=     '<span style="font-weight:600;font-size:1.05rem">' + safeTitle + '</span>'
    metaHtml +=     '<span style="font-size:0.75rem;padding:2px 10px;border-radius:999px;background:' + statusInfo.color + ';color:#fff;line-height:1.4">' + statusInfo.label + '</span>'
    metaHtml +=   '</div>'
    metaHtml +=   '<div style="font-size:0.85rem;opacity:0.7">' + questionText + '</div>'
    if (updatedText) {
      metaHtml += '<div style="font-size:0.8rem;opacity:0.65">' + t('profile.rooms.updated').replace('{date}', updatedText) + '</div>'
    }
    metaHtml += '</div>'
    return metaHtml
  }

  function buildBuilderActions(template, t) {
    var editLabel = t('createRoom.card.editQuestions')
    var publishLabel = t('createRoom.card.publish')
    var unpublishLabel = t('createRoom.card.unpublish')
    var deleteLabel = t('createRoom.card.delete')
    var actionsHtml = ''
    actionsHtml += '<div data-role="actions" style="display:flex;gap:8px;flex-wrap:wrap">'
    actionsHtml +=   '<a class="btn" data-action="edit" data-template-id="' + escapeHtml(template.id || '') + '" data-set-id="' + escapeHtml(template.questionSetId || '') + '" style="font-size:0.85rem">' + editLabel + '</a>'
    if (template.status === 'published') {
      actionsHtml += '<button class="btn" data-action="unpublish" data-template-id="' + escapeHtml(template.id || '') + '" data-set-id="' + escapeHtml(template.questionSetId || '') + '" style="font-size:0.85rem">' + unpublishLabel + '</button>'
    } else {
      actionsHtml += '<button class="btn" data-action="publish" data-template-id="' + escapeHtml(template.id || '') + '" data-set-id="' + escapeHtml(template.questionSetId || '') + '" style="font-size:0.85rem">' + publishLabel + '</button>'
    }
    actionsHtml +=   '<button class="btn" data-action="delete" data-template-id="' + escapeHtml(template.id || '') + '" data-set-id="' + escapeHtml(template.questionSetId || '') + '" style="font-size:0.85rem">' + deleteLabel + '</button>'
    actionsHtml += '</div>'
    return actionsHtml
  }

  function buildProfileActions(template, options, t) {
    var canShare = options && options.canShare
    var shareUrl = options && options.shareUrl ? options.shareUrl : ''
    var facebookUrl = options && options.facebookUrl ? options.facebookUrl : ''
    var lineUrl = options && options.lineUrl ? options.lineUrl : ''
    var editLabel = t('profile.rooms.edit')
    var shareLabel = t('profile.rooms.share')
    var deleteLabel = t('profile.rooms.delete')
    var shareTitle = t('profile.rooms.shareTitle')
    var copyLabel = t('profile.rooms.shareCopy')
    var facebookLabel = t('profile.rooms.shareFacebook')
    var lineLabel = t('profile.rooms.shareLine')
    var shareDisabledText = t('profile.rooms.shareDisabled')
    var deleteHint = t('profile.rooms.deleteHint')
    var deleteConfirmLabel = t('profile.rooms.deleteConfirmLabel')
    var deleteAction = t('profile.rooms.deleteAction')
    var html = ''
    html += '<div style="display:flex;gap:8px;flex-wrap:wrap">'
    html +=   '<a class="btn" href="' + escapeHtml(options && options.editUrl ? options.editUrl : '#') + '" style="font-size:0.85rem">' + editLabel + '</a>'
    if (canShare) {
      html += '<button class="btn" data-action="toggle-share" style="font-size:0.85rem">' + shareLabel + '</button>'
    }
    html +=   '<button class="btn" data-action="toggle-delete" style="font-size:0.85rem">' + deleteLabel + '</button>'
    html += '</div>'
    if (canShare) {
      html += '<div data-role="share-panel" style="display:none;margin-top:4px;padding:12px;border:1px solid #e5e7eb;border-radius:10px;background:#f9fafb">'
      html +=   '<label style="display:block;font-size:0.85rem;font-weight:600;margin-bottom:6px">' + shareTitle + '</label>'
      html +=   '<div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center">'
      html +=     '<input data-role="share-input" type="text" value="' + escapeHtml(shareUrl) + '" readonly style="flex:1;min-width:220px;padding:8px;border:1px solid #d1d5db;border-radius:8px;background:#f3f4f6" />'
      html +=     '<button class="btn" data-action="copy-link" style="font-size:0.8rem">' + copyLabel + '</button>'
      html +=   '</div>'
      html +=   '<div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px">'
      html +=     '<a class="btn" href="' + escapeHtml(facebookUrl) + '" target="_blank" rel="noopener" style="font-size:0.8rem">' + facebookLabel + '</a>'
      html +=     '<a class="btn" href="' + escapeHtml(lineUrl) + '" target="_blank" rel="noopener" style="font-size:0.8rem">' + lineLabel + '</a>'
      html +=   '</div>'
      html +=   '<p data-role="share-feedback" style="margin:8px 0 0;font-size:0.8rem;color:#059669;display:none"></p>'
      html += '</div>'
    } else {
      html += '<p style="margin:0;font-size:0.8rem;opacity:0.7">' + shareDisabledText + '</p>'
    }
    html += '<div data-role="delete-panel" style="display:none;margin-top:4px;padding:12px;border:1px solid #fee2e2;border-radius:10px;background:#fef2f2">'
    html +=   '<p style="margin:0 0 8px;font-size:0.8rem">' + deleteHint + '</p>'
    html +=   '<label style="display:flex;gap:8px;align-items:center;font-size:0.8rem">'
    html +=     '<input type="checkbox" data-role="delete-confirm" />'
    html +=     '<span>' + deleteConfirmLabel + '</span>'
    html +=   '</label>'
    html +=   '<button class="btn btn-primary" data-action="confirm-delete" disabled style="margin-top:10px;font-size:0.8rem">' + deleteAction + '</button>'
    html +=   '<p data-role="delete-feedback" style="margin:8px 0 0;font-size:0.8rem;color:#b91c1c;display:none"></p>'
    html += '</div>'
    return html
  }

  function buildBaseCard(template) {
    var card = document.createElement('div')
    card.className = 'room-card'
    card.style.display = 'grid'
    card.style.gap = '12px'
    card.style.padding = '16px'
    card.style.background = '#fff'
    card.style.border = '1px solid #e5e7eb'
    card.style.borderRadius = '12px'
    if (template && template.id) card.setAttribute('data-template-id', template.id)
    if (template && template.questionSetId) {
      card.setAttribute('data-set-id', template.questionSetId)
      card.setAttribute('data-question-set-id', template.questionSetId)
    }
    if (template && template.status) card.setAttribute('data-template-status', template.status)
    return card
  }

  RoomTemplates.buildBuilderCard = function(template, options) {
    var lang = options && options.lang ? options.lang : 'en'
    var t = ensureTranslate(options && options.t)
    var card = buildBaseCard(template)
    card.setAttribute('data-template-card', 'true')
    var innerHtml = ''
    innerHtml += buildMetaHtml(template, lang, t)
    innerHtml += buildBuilderActions(template, t)
    card.innerHTML = innerHtml
    return card
  }

  RoomTemplates.buildProfileCard = function(template, options) {
    var lang = options && options.lang ? options.lang : 'en'
    var t = ensureTranslate(options && options.t)
    var card = buildBaseCard(template)
    var shareUrl = options && options.shareUrl ? options.shareUrl : ''
    if (shareUrl) {
      card.setAttribute('data-share-url', shareUrl)
    }
    var innerHtml = ''
    innerHtml += buildMetaHtml(template, lang, t)
    innerHtml += buildProfileActions(template, options || {}, t)
    card.innerHTML = innerHtml
    return card
  }

  RoomTemplates.getPagination = function(totalValue, limitValue, offsetValue) {
    var total = typeof totalValue === 'number' && totalValue > 0 ? totalValue : 0
    var limit = typeof limitValue === 'number' && limitValue > 0 ? limitValue : 10
    var offset = typeof offsetValue === 'number' && offsetValue > 0 ? offsetValue : 0
    if (offset < 0) offset = 0
    var totalPages = total > 0 ? Math.ceil(total / limit) : 1
    var currentPage = total > 0 ? Math.floor(offset / limit) + 1 : 1
    if (currentPage > totalPages) currentPage = totalPages
    var hasPrev = offset > 0
    var hasNext = offset + limit < total
    var prevOffset = hasPrev ? Math.max(offset - limit, 0) : 0
    var nextOffset = hasNext ? offset + limit : offset
    return {
      total: total,
      limit: limit,
      offset: offset,
      totalPages: totalPages,
      currentPage: currentPage,
      hasPrev: hasPrev,
      hasNext: hasNext,
      prevOffset: prevOffset,
      nextOffset: nextOffset
    }
  }

  RoomTemplates.buildPagination = function(info, tFn) {
    var t = ensureTranslate(tFn)
    if (!info || info.totalPages <= 1) return ''
    var prevDisabled = info.hasPrev ? '' : ' disabled'
    var nextDisabled = info.hasNext ? '' : ' disabled'
    var label = t('roomTemplates.pagination.pageLabel')
    label = label.replace('{current}', String(info.currentPage))
    label = label.replace('{total}', String(info.totalPages))
    var html = ''
    html += '<div style="display:flex;gap:12px;align-items:center;flex-wrap:wrap">'
    html +=   '<button class="btn" data-action="prev"' + prevDisabled + ' style="font-size:0.85rem">' + t('roomTemplates.pagination.previous') + '</button>'
    html +=   '<span style="font-size:0.85rem;opacity:0.75">' + label + '</span>'
    html +=   '<button class="btn" data-action="next"' + nextDisabled + ' style="font-size:0.85rem">' + t('roomTemplates.pagination.next') + '</button>'
    html += '</div>'
    return html
  }

  RoomTemplates.escapeHtml = escapeHtml
  RoomTemplates.formatDate = formatDate

  global.RoomTemplates = RoomTemplates
})(typeof window !== 'undefined' ? window : this)

