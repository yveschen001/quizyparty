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
  function getPaging() {
    const q = qs()
    const page = Math.max(1, parseInt(q.get('page') || '1', 10) || 1)
    const pageSize = Math.min(100, Math.max(5, parseInt(q.get('pageSize') || '20', 10) || 20))
    return { page: page, pageSize: pageSize }
  }
  function slice(arr, page, pageSize) {
    const start = (page - 1) * pageSize
    return (arr || []).slice(start, start + pageSize)
  }
  function renderControls(mount, total) {
    if (!mount) return
    const cfg = getPaging()
    const pages = Math.max(1, Math.ceil((total || 0) / cfg.pageSize))
    const wrap = document.createElement('div')
    wrap.className = 'flex items-center justify-between mt-3 gap-2'
    wrap.setAttribute('data-testid', 'pagination')
    // left: pageSize
    const left = document.createElement('div')
    left.className = 'flex items-center gap-2'
    const sel = document.createElement('select')
    sel.setAttribute('aria-label', t('common.pager.pageSize'))
    ;[10, 20, 30, 50].forEach(function (v) {
      const o = document.createElement('option')
      o.value = String(v)
      o.textContent = String(v)
      if (v === cfg.pageSize) o.selected = true
      sel.appendChild(o)
    })
    sel.addEventListener('change', function () {
      setQuery({ page: 1, pageSize: sel.value })
    })
    left.appendChild(document.createTextNode(t('common.pager.perPage')))
    left.appendChild(sel)
    // right: prev / indicator / next
    const right = document.createElement('div')
    right.className = 'flex items-center gap-2'
    const prev = document.createElement('button')
    prev.className = 'btn'
    prev.textContent = t('common.pager.prev')
    prev.disabled = cfg.page <= 1
    prev.setAttribute('aria-label', t('common.pager.prev'))
    prev.addEventListener('click', function () {
      setQuery({ page: cfg.page - 1 })
    })
    const indi = document.createElement('span')
    indi.className = 'text-sm text-muted'
    indi.textContent = t('common.pager.indicator')
      .replace('{{page}}', String(cfg.page))
      .replace('{{pages}}', String(pages))
    const next = document.createElement('button')
    next.className = 'btn'
    next.textContent = t('common.pager.next')
    next.disabled = cfg.page >= pages
    next.setAttribute('aria-label', t('common.pager.next'))
    next.addEventListener('click', function () {
      setQuery({ page: cfg.page + 1 })
    })
    right.appendChild(prev)
    right.appendChild(indi)
    right.appendChild(next)
    wrap.appendChild(left)
    wrap.appendChild(right)
    mount.innerHTML = ''
    mount.appendChild(wrap)
    return { page: cfg.page, pageSize: cfg.pageSize, pages: pages }
  }
  global.RoomsPager = { getPaging: getPaging, slice: slice, renderControls: renderControls }
})(window);

