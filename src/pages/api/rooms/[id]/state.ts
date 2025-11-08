import type { APIRoute } from 'astro'
export const prerender = false
import { getRoomState } from '../../../../server/room/store'

export const GET: APIRoute = async ({ params, request }) => {
  const id = String(params.id)
  const cookieHeader = request.headers.get('cookie') || ''
  const match = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookieHeader)
  const memberId = match ? match[1] : undefined
  const st = getRoomState(id, memberId)
  if (!st) {
    return new Response(JSON.stringify({ error: 'not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }
  return new Response(JSON.stringify(st), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}


