;(function (w) {
  if (w.QPCache) return
  const NS = 'qp:cache:v1'
  const matchList = [/\/api\/room-templates/, /\/api\/scores\/rooms/, /\/api\/profile\/stats/]
  function now() {
    return Date.now()
  }
  function key(u) {
    try {
      const url = new URL(u, location.origin)
      url.hash = ''
      return url.toString()
    } catch {
      return String(u)
    }
  }
  function get(k) {
    try {
      const raw = localStorage.getItem(NS + ':' + k)
      if (!raw) return null
      const obj = JSON.parse(raw)
      if (!obj || obj.expire < now()) return null
      return obj.value
    } catch {
      return null
    }
  }
  function set(k, v, ttl) {
    try {
      localStorage.setItem(NS + ':' + k, JSON.stringify({ value: v, expire: now() + ttl }))
    } catch {}
  }
  async function fetchWithCache(input, init) {
    const isGet = !init || !init.method || String(init.method).toUpperCase() === 'GET'
    const url = typeof input === 'string' ? input : input && input.url ? input.url : String(input)
    if (!isGet || !matchList.some(function (re) { return re.test(url) })) return w.__origFetch(input, init)
    const k = key(url)
    const cached = get(k)
    if (cached) {
      queueMicrotask(async function () {
        try {
          const r = await w.__origFetch(input, init)
          const j = await r.clone().json()
          set(k, j, 5 * 60 * 1000)
        } catch {}
      })
      return new Response(new Blob([JSON.stringify(cached)], { type: 'application/json' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    } else {
      const r = await w.__origFetch(input, init)
      try {
        const j = await r.clone().json()
        set(k, j, 5 * 60 * 1000)
      } catch {}
      return r
    }
  }
  w.__origFetch = w.__origFetch || w.fetch
  w.fetch = fetchWithCache
  w.QPCache = { get: get, set: set, enable: true }
})(window)


