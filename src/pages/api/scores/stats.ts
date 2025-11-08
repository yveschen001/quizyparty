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
  // Only allow users to view their own stats, or implement admin check later
  if (userId !== user.id) {
    return new Response(JSON.stringify({ error: 'forbidden' }), {
      status: 403,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const stats = scoreStore().getUserStats(userId)
    return new Response(JSON.stringify(stats), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to get stats' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

