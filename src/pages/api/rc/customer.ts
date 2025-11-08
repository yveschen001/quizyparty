import type { APIRoute } from 'astro'
import { entStore } from '../../../server/store'

const STALE_MS = 15 * 60 * 1000 // 15 分鐘

export const GET: APIRoute = async ({ request }) => {
  const url = new URL(request.url)
  const cookie = request.headers.get('cookie') ?? ''
  const cookieUid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  const appUserId = url.searchParams.get('appUserId') || cookieUid || ''
  if (!appUserId) {
    return new Response(JSON.stringify({ active: [], managementUrl: undefined }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }

  const store = entStore()
  const cached = store.get(appUserId)
  const now = Date.now()
  if (cached && (now - cached.updatedAt) < STALE_MS) {
    return new Response(JSON.stringify({ active: cached.active, managementUrl: cached.managementUrl }), { status: 200 })
  }

  const RC_KEY = process.env.RC_WEB_PUBLIC_API_KEY || process.env.RC_IOS_PUBLIC_API_KEY || process.env.RC_ANDROID_PUBLIC_API_KEY || ''
  if (!RC_KEY) {
    return new Response(JSON.stringify({ active: cached?.active ?? [], managementUrl: cached?.managementUrl }), { status: 200 })
  }

  const rc = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`, {
    headers: { 'Authorization': `Bearer ${RC_KEY}` }
  })
  if (!rc.ok) {
    return new Response(JSON.stringify({ active: cached?.active ?? [], managementUrl: cached?.managementUrl }), { status: 200 })
  }
  const data = await rc.json()
  const ents = data?.subscriber?.entitlements || {}
  const active = Object.entries(ents).filter(([, v]: any) => (v as any)?.active === true).map(([k]) => String(k))
  const managementUrl = data?.subscriber?.management_url || undefined

  store.upsert({ appUserId, active, managementUrl, updatedAt: now })
  return new Response(JSON.stringify({ active, managementUrl }), { status: 200 })
}


