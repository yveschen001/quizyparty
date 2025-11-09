;(function (global) {
  const t = (k) => (global.t ? global.t(k) : k)
  function qs() {
    return new URLSearchParams(location.search)
  }
  function setQuery(obj) {
    const u = new URL(location.href)
    Object.entries(obj).forEach(function ([k, v]) {
      if (v == null || v === '') u.searchParams.delete(k)
      else u.searchParams.set(k, String(v))
    })
    history.replaceState(null, '', u.toString())
  }
  function el(tag, attrs, html) {
    var a = attrs || {}
    var e = document.createElement(tag)
    Object.keys(a).forEach(function (k) {
      e.setAttribute(k, a[k])
    })
    if (html) e.innerHTML = html
    return e
  }
  function renderCreatedControls(mount) {
    if (!mount) return
    const q = qs()
    const sort = q.get('sort') || 'updated'
    const status = q.get('status') || 'all'
    const wrap = el('div', { class: 'stack gap-2', 'data-testid': 'created-controls' })
    const row = el('div', { class: 'flex gap-2 items-center' })
    const s1 = el('select', {
      'aria-label': t('common.controls.status'),
      'aria-controls': 'created-list',
    })
    ;[
      ['all', t('common.controls.status.all')],
      ['public', t('common.card.status.public')],
      ['draft', t('common.card.status.draft')],
    ].forEach(function (pair) {
      const v = pair[0]
      const lab = pair[1]
      const o = el('option', { value: v }, lab)
      if (v === status) o.selected = true
      s1.appendChild(o)
    })
    const s2 = el('select', {
      'aria-label': t('common.controls.sort.label'),
      'aria-controls': 'created-list',
    })
    ;[
      ['updated', t('common.controls.sort.updated')],
      ['title', t('common.controls.sort.title')],
      ['participants', t('common.controls.sort.members')],
    ].forEach(function (pair) {
      const v = pair[0]
      const lab = pair[1]
      const o = el('option', { value: v }, lab)
      if (v === sort) o.selected = true
      s2.appendChild(o)
    })
    s1.addEventListener('change', function () {
      setQuery({ status: s1.value })
      s1.focus()
    })
    s2.addEventListener('change', function () {
      setQuery({ sort: s2.value })
      s2.focus()
    })
    ;[s1, s2].forEach(function (sel) {
      sel.addEventListener('keydown', function (e) {
        const options = sel.options
        if (!options || !options.length) return
        let idx = sel.selectedIndex
        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
          e.preventDefault()
          idx = Math.min(idx + 1, options.length - 1)
          sel.selectedIndex = idx
          sel.dispatchEvent(new Event('change'))
        } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
          e.preventDefault()
          idx = Math.max(idx - 1, 0)
          sel.selectedIndex = idx
          sel.dispatchEvent(new Event('change'))
        } else if (e.key === 'Enter') {
          e.preventDefault()
          sel.dispatchEvent(new Event('change'))
        }
      })
    })
    row.appendChild(s1)
    row.appendChild(s2)
    wrap.innerHTML = ''
    wrap.appendChild(row)
    mount.innerHTML = ''
    mount.appendChild(wrap)
    return { sort: sort, status: status }
  }
  function renderJoinedControls(mount) {
    if (!mount) return
    const q = qs()
    const sort = q.get('sort') || 'lastPlayed'
    const wrap = el('div', { class: 'stack gap-2', 'data-testid': 'joined-controls' })
    const s2 = el('select', {
      'aria-label': t('common.controls.sort.label'),
      'aria-controls': 'list',
    })
    ;[
      ['lastPlayed', t('common.controls.sort.lastPlayed')],
      ['answered', t('common.controls.sort.answered')],
      ['accuracy', t('common.controls.sort.accuracy')],
      ['title', t('common.controls.sort.title')],
    ].forEach(function (pair) {
      const v = pair[0]
      const lab = pair[1]
      const o = el('option', { value: v }, lab)
      if (v === sort) o.selected = true
      s2.appendChild(o)
    })
    s2.addEventListener('change', function () {
      setQuery({ sort: s2.value })
      s2.focus()
    })
    s2.addEventListener('keydown', function (e) {
      const options = s2.options
      if (!options || !options.length) return
      let idx = s2.selectedIndex
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        idx = Math.min(idx + 1, options.length - 1)
        s2.selectedIndex = idx
        s2.dispatchEvent(new Event('change'))
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        idx = Math.max(idx - 1, 0)
        s2.selectedIndex = idx
        s2.dispatchEvent(new Event('change'))
      } else if (e.key === 'Enter') {
        e.preventDefault()
        s2.dispatchEvent(new Event('change'))
      }
    })
    wrap.appendChild(s2)
    mount.innerHTML = ''
    mount.appendChild(wrap)
    return { sort: sort }
  }
  function sortCreated(arr, sort) {
    function byTitle(a, b) {
      return String(a.title || '').localeCompare(String(b.title || ''))
    }
    function byUpdated(a, b) {
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0)
    }
    function byMembers(a, b) {
      return +(a.participants || 0) - +(b.participants || 0)
    }
    return [].concat(arr || []).sort(sort === 'title' ? byTitle : sort === 'participants' ? function (a, b) { return byMembers(b, a) } : byUpdated)
  }
  function filterCreated(arr, status) {
    if (status === 'all') return arr
    return (arr || []).filter(function (x) {
      return status === 'draft' ? x.status === 'draft' : x.status !== 'draft'
    })
  }
  function sortJoined(arr, sort) {
    function byTitle(a, b) {
      return String(a.title || '').localeCompare(String(b.title || ''))
    }
    function byLast(a, b) {
      return new Date(b.lastPlayedAt || 0) - new Date(a.lastPlayedAt || 0)
    }
    function byAnswered(a, b) {
      return (+b.answered || 0) - (+a.answered || 0)
    }
    function byAcc(a, b) {
      return (+b.accuracy || 0) - (+a.accuracy || 0)
    }
    return [].concat(arr || []).sort(sort === 'title' ? byTitle : sort === 'answered' ? byAnswered : sort === 'accuracy' ? byAcc : byLast)
  }
  global.RoomsFilters = {
    renderCreatedControls: renderCreatedControls,
    renderJoinedControls: renderJoinedControls,
    sortCreated: sortCreated,
    filterCreated: filterCreated,
    sortJoined: sortJoined,
  }
})(window);

