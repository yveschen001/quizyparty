import type { APIRoute } from 'astro'
import { entStore } from '../../../server/store'

export const POST: APIRoute = async ({ request }) => {
  const auth = request.headers.get('authorization') || ''
  const expected = process.env.RC_WEBHOOK_AUTH || ''
  if (!expected || auth !== expected) return new Response('unauthorized', { status: 401 })

  let body: any = {}
  try { body = await request.json() } catch {}
  const appUserId = body?.event?.app_user_id || body?.subscriber?.app_user_id || body?.app_user_id

  // 收到事件後：拉 RC → 寫入快取
  const RC_KEY =
    process.env.RC_WEB_PUBLIC_API_KEY ||
    process.env.RC_IOS_PUBLIC_API_KEY ||
    process.env.RC_ANDROID_PUBLIC_API_KEY || ''

  if (appUserId && RC_KEY) {
    try {
      const rc = await fetch(`https://api.revenuecat.com/v1/subscribers/${encodeURIComponent(appUserId)}`, {
        headers: { 'Authorization': `Bearer ${RC_KEY}` }
      })
      if (rc.ok) {
        const data = await rc.json()
        const ents = data?.subscriber?.entitlements || {}
        const active = Object.entries(ents).filter(([, v]: any) => (v as any)?.active === true).map(([k]) => String(k))
        const managementUrl = data?.subscriber?.management_url || undefined
        entStore().upsert({ appUserId, active, managementUrl, updatedAt: Date.now() })
      }
    } catch (e) { console.error('[RC webhook] sync failed', e) }
  }

  return new Response('ok', { status: 200 })
}


