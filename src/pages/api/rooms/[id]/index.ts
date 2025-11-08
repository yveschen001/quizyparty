import type { APIRoute } from 'astro'
export const prerender = false
import { getRoomStore } from '../../../../server/room/store'

export const DELETE: APIRoute = async ({ params, request }) => {
  const id = String(params.id || '').trim()
  if (!id) {
    return new Response(JSON.stringify({ error: 'room id is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const store = getRoomStore()
  const room = store.get(id)
  if (!room) {
    return new Response(JSON.stringify({ error: 'not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (room.hostId !== uid) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
  }

  store.delete(id)

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}


