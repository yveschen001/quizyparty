import type { APIRoute } from 'astro'
export const prerender = false
import { createRoom } from '../../../server/room/store'

export const POST: APIRoute = async ({ request }) => {
  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  let body: any = {}
  try {
    body = await request.json()
  } catch (e) {
    return new Response(JSON.stringify({ error: 'invalid request body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const lang = String(body?.lang || 'en')
  const questionSetId = String(body?.questionSetId || '')
  const requestedRoomIdRaw = typeof body?.roomId === 'string' ? body.roomId.trim() : ''
  const replaceExisting = Boolean(body?.replaceExisting)
  
  if (!questionSetId) {
    return new Response(JSON.stringify({ error: 'questionSetId is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const room = await createRoom(lang, uid, questionSetId, {
      roomId: requestedRoomIdRaw || undefined,
      replaceExisting,
    })
    return new Response(JSON.stringify({ id: room.id, hostId: room.hostId }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to create room', details: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

// 開發便捷：若前端誤發 GET（或直接在瀏覽器輸入），也允許以 GET 建房
export const GET: APIRoute = async ({ request, url }) => {
  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const lang = String(url.searchParams.get('lang') || 'en')
  const questionSetId = String(url.searchParams.get('questionSetId') || '')
  const requestedRoomIdRaw = String(url.searchParams.get('roomId') || '').trim()
  const replaceExisting = url.searchParams.get('replaceExisting') === 'true'
  
  if (!questionSetId) {
    return new Response(JSON.stringify({ error: 'questionSetId is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const room = await createRoom(lang, uid, questionSetId, {
      roomId: requestedRoomIdRaw || undefined,
      replaceExisting,
    })
    return new Response(JSON.stringify({ id: room.id, hostId: room.hostId }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to create room', details: String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}


