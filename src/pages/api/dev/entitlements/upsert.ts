import type { APIRoute } from 'astro'
import { entStore } from '../../../../server/store'

function devOnly() {
  return process.env.NODE_ENV !== 'production'
}

export const POST: APIRoute = async ({ request }) => {
  if (!devOnly()) return new Response('not found', { status: 404 })

  const auth = request.headers.get('authorization') || ''
  const expected = process.env.DEV_TOKEN || ''
  if (!expected || auth !== expected) return new Response('unauthorized', { status: 401 })

  let body: any = {}
  try { body = await request.json() } catch {}
  const appUserId = String(body?.appUserId || '').trim()
  if (!appUserId) return new Response('missing appUserId', { status: 400 })

  const active = Array.isArray(body?.active) ? body.active.map(String) : []
  const managementUrl = body?.managementUrl ? String(body.managementUrl) : undefined

  entStore().upsert({ appUserId, active, managementUrl, updatedAt: Date.now() })
  return new Response(JSON.stringify({ ok: true, appUserId, active, managementUrl }), {
    status: 200,
    headers: { 'content-type': 'application/json' }
  })
}


