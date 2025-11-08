import type { APIRoute } from 'astro'
export const prerender = false
import { listRooms } from '../../../server/room/store'

export const GET: APIRoute = async ({ url }) => {
  const limit = Math.min(Number(url.searchParams.get('limit') || 20), 100)
  const offset = Math.max(Number(url.searchParams.get('offset') || 0), 0)
  const sortBy = (url.searchParams.get('sortBy') || 'created') as 'created' | 'members'
  const order = (url.searchParams.get('order') || 'desc') as 'asc' | 'desc'
  const lang = url.searchParams.get('lang') || undefined
  const hoursParam = Number(url.searchParams.get('hours') || '')
  const recentHours = Number.isFinite(hoursParam) && hoursParam > 0 ? hoursParam : undefined
  const createdAfter = recentHours ? Date.now() - recentHours * 60 * 60 * 1000 : undefined

  try {
    const rooms = listRooms({ limit, offset, sortBy, order, lang, createdAfter })
    return new Response(JSON.stringify({ rooms, limit, offset, total: rooms.length, hours: recentHours }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to list rooms' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

