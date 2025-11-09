/* global window */
;(function (global) {
  function tt(key, fallbackKey) {
    try {
      var primary = (global.t && typeof global.t === 'function') ? global.t(key) : ''
      if (primary && primary !== key) return primary
      if (fallbackKey) {
        var secondary = (global.t && typeof global.t === 'function') ? global.t(fallbackKey) : ''
        if (secondary && secondary !== fallbackKey) return secondary
      }
    } catch (e) {}
    return ''
  }
  function formatDate(ts) {
    try {
      var d = ts instanceof Date ? ts : new Date(ts)
      return isNaN(+d) ? '' : d.toLocaleString()
    } catch (e) {
      return ''
    }
  }
  function esc(s) {
    if (s === null || s === undefined) return ''
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
  }
  /**
   * @param {Object} p
   * @param {'created'|'joined'} p.kind
   * @param {'draft'|'public'} [p.status='public']
   * @param {string} p.id
   * @param {string} p.title
   * @param {number|string|Date} [p.updatedAt]
   * @param {number} [p.participants]
   * @param {number} [p.capacity]
   * @param {string} [p.href]
   * @param {string} [p.lang]
   */
  function roomCardHTML(p) {
    var t = typeof global.t === 'function' ? global.t : function (k) { return k }
    var status = p.status || 'public'
    var statusLabel = status === 'draft' ? tt('common.card.status.draft','card.status.draft') : tt('common.card.status.public','card.status.public')
    var updated = p.updatedAt ? tt('common.card.updatedAt','card.updatedAt') + ': ' + formatDate(p.updatedAt) : ''
    var members =
      typeof p.participants === 'number'
        ? t('common.card.participants') + ': ' + (p.capacity ? esc(p.participants + '/' + p.capacity) : esc(p.participants))
        : ''
    // 進一步的 meta：題數/正確率/最近作答（皆為可選）
    var answered =
      typeof p.answered === 'number' ? tt('common.card.answered','card.answered') + ': ' + esc(p.answered) : ''
    var accuracy =
      typeof p.accuracy === 'number'
        ? tt('common.card.accuracy','card.accuracy') + ': ' + Math.round(p.accuracy * 100) + '%'
        : ''
    var lastPlayed =
      p.lastPlayedAt ? tt('common.card.lastPlayedAt','card.lastPlayedAt') + ': ' + formatDate(p.lastPlayedAt) : ''
    var metaLine = [updated, members, answered, accuracy, lastPlayed].filter(Boolean).join(' · ')

    var ctas = ''
    if (p.kind === 'created') {
      // 保持與 rooms-manager.js 的事件一致：edit / publish|unpublish / delete
      var publishLabel =
        status === 'draft' ? t('common.card.cta.publish') : t('common.card.cta.unpublish')
      var publishAction = status === 'draft' ? 'publish' : 'unpublish'
      ctas =
        '<a class="btn btn-secondary" data-action="edit" data-template-id="' +
        esc(p.id) +
        '" data-room-id="' +
        esc(p.id) +
        '" aria-label="' +
        esc(tt('common.card.cta.edit','card.cta.edit') + ' · ' + p.title) +
        '">' +
        esc(tt('common.card.cta.edit','card.cta.edit')) +
        '</a>' +
        '<button class="btn btn-secondary" data-action="' +
        publishAction +
        '" data-template-id="' +
        esc(p.id) +
        '" data-room-id="' +
        esc(p.id) +
        '" aria-label="' +
        esc(publishLabel + ' · ' + p.title) +
        '">' +
        esc(publishLabel) +
        '</button>' +
        '<button class="btn btn-danger" data-action="delete" data-template-id="' +
        esc(p.id) +
        '" data-room-id="' +
        esc(p.id) +
        '" aria-label="' +
        esc(tt('common.card.cta.delete','card.cta.delete') + ' · ' + p.title) +
        '">' +
        esc(tt('common.card.cta.delete','card.cta.delete')) +
        '</button>'
    } else {
      // joined：沿用 data-action="replay"
      var href = p.href || ('/' + (p.lang || 'en') + '/room/' + esc(p.id))
      ctas =
        '<a class="btn btn-primary" data-action="replay" href="' + href + '" data-room-id="' + esc(p.id) + '" aria-label="' + esc(tt('common.card.cta.playAgain','card.cta.playAgain') + ' · ' + p.title) + '">' + esc(tt('common.card.cta.playAgain','card.cta.playAgain')) + '</a>' +
        '<a class="btn" data-action="result" href="#" aria-label="' + esc(tt('common.card.cta.viewResult','card.cta.viewResult') + ' · ' + p.title) + '">' + esc(tt('common.card.cta.viewResult','card.cta.viewResult')) + '</a>'
    }
    var linkHref = p.href || '#'
    return (
      '<div class="stack gap-lg" data-testid="room-card" aria-label="' + esc(p.title) + '">' +
      '<a class="card-link" href="' + linkHref + '" aria-label="' + esc(p.title) + '">' +
      '<div class="flex-between"><h3 class="h3 no-margin">' + esc(p.title) + '</h3>' +
      '<span class="badge">' + esc(statusLabel) + '</span></div>' +
      '</a>' +
      '<div class="meta-row">' + (metaLine ? '<span>' + esc(metaLine) + '</span>' : '') + '</div>' +
      '<div class="actions-row">' + ctas + '</div>' +
      '</div>'
    )
  }
  global.RoomCardTemplate = { roomCardHTML: roomCardHTML }
})(window)


