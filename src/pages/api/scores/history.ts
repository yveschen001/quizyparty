import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { scoreStore } from '../../../server/score'

export const GET: APIRoute = async ({ request, url }) => {
  const cookie = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookie)

  if (!user) {
    return new Response(JSON.stringify({ error: 'not authenticated' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const userId = url.searchParams.get('userId') || user.id
  if (userId !== user.id) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
  }

  const limit = Math.min(Number(url.searchParams.get('limit') || 50), 100)
  const offset = Math.max(Number(url.searchParams.get('offset') || 0), 0)

  try {
    const history = scoreStore().getUserHistory(userId, limit, offset)
    return new Response(JSON.stringify({ history, limit, offset }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to get history' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

