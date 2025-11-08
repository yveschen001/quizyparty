import type { APIRoute } from 'astro'
export const prerender = false
import { joinRoom, getRoomState } from '../../../../server/room/store'

export const POST: APIRoute = async ({ params, request }) => {
  const id = String(params.id)
  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), { status: 400, headers: { 'content-type': 'application/json' } })
  }

  // Check room current state
  const currentState = getRoomState(id, uid)
  if (!currentState) {
    return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: { 'content-type': 'application/json' } })
  }

  // Check if user is already in room
  if (currentState.members.includes(uid)) {
    return new Response(JSON.stringify({ ok: true, id, memberId: uid }), {
      status: 200, headers: { 'content-type': 'application/json' },
    })
  }

  // Join room
  const room = joinRoom(id, uid)
  if (!room) {
    return new Response(JSON.stringify({ error: 'not found' }), { status: 404, headers: { 'content-type': 'application/json' } })
  }

  return new Response(JSON.stringify({ ok: true, id, memberId: uid }), {
    status: 200, headers: { 'content-type': 'application/json' },
  })
}


