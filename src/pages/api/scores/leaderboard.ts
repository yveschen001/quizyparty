import type { APIRoute } from 'astro'
export const prerender = false
import { scoreStore } from '../../../server/score'
import { userStore } from '../../../server/user'

export const GET: APIRoute = async ({ url }) => {
  const limit = Math.min(Number(url.searchParams.get('limit') || 100), 200)

  try {
    const leaderboard = scoreStore().getLeaderboard(limit)
    // Enrich with user info
    const enriched = leaderboard.map((entry) => {
      const user = userStore().get(entry.userId)
      return {
        ...entry,
        userName: user?.name || 'Anonymous',
        userAvatar: user?.avatar,
      }
    })

    return new Response(JSON.stringify({ leaderboard: enriched, limit }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to get leaderboard' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

