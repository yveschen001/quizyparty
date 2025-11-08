import type { APIRoute } from 'astro'
export const prerender = false
import { advanceRoom } from '../../../../server/room/store'

export const POST: APIRoute = async ({ params, request }) => {
  const id = String(params.id)
  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }
  const st = advanceRoom(id, uid)
  if (!st) {
    return new Response(JSON.stringify({ error: 'forbidden or not found' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
  }
  return new Response(JSON.stringify(st), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}


