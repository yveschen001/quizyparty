import type { APIRoute } from 'astro'
export const prerender = false
import { scoreStore } from '../../../../server/score'
import { userStore } from '../../../../server/user'
import { getCurrentUser } from '../../../../lib/auth'

const MAX_ENTRIES = 100
const HERO_LIMIT = 10

function normalizeAvatar(userId: string, avatar?: string | null): string {
  if (avatar && typeof avatar === 'string' && avatar.trim().length > 0) {
    return avatar
  }
  const seed = encodeURIComponent(userId || 'guest')
  return `https://www.gravatar.com/avatar/${seed}?d=identicon`
}

export const GET: APIRoute = async ({ params, request }) => {
  const id = String(params.id)
  const cookie = request.headers.get('cookie') ?? ''

  const score = scoreStore()
  const rawEntries = score.getRoomScores(id)
  const userRepo = userStore()

  const enriched = rawEntries
    .map((entry) => {
      const user = userRepo.get(entry.userId)
      const displayName =
        (user && (user.name || user.email)) || `玩家 #${String(entry.userId).slice(-4).padStart(4, '0')}`
      return {
        userId: entry.userId,
        name: displayName,
        avatar: normalizeAvatar(entry.userId, user?.avatar),
        totalAnswered: entry.totalAnswered,
        totalCorrect: entry.totalCorrect,
        accuracy: entry.accuracy,
        totalTimeMs: entry.totalTimeMs,
        averageTimeMs: entry.averageTimeMs,
        fastestTimeMs: entry.fastestTimeMs,
        score: entry.score,
        lastAnsweredAt: entry.lastAnsweredAt,
      }
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score
      if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect
      if (a.totalAnswered !== b.totalAnswered) return a.totalAnswered - b.totalAnswered
      if (a.averageTimeMs !== b.averageTimeMs) return a.averageTimeMs - b.averageTimeMs
      return (b.lastAnsweredAt || 0) - (a.lastAnsweredAt || 0)
    })
    .map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }))

  const heroes = enriched.slice(0, HERO_LIMIT).map((entry) => ({
    userId: entry.userId,
    name: entry.name,
    avatar: entry.avatar,
    rank: entry.rank,
    score: entry.score,
  }))

  const topEntries = enriched.slice(0, MAX_ENTRIES)

  let currentUserEntry: (typeof enriched)[number] | null = null
  try {
    const currentUser = await getCurrentUser(cookie)
    if (currentUser) {
      currentUserEntry = enriched.find((entry) => entry.userId === currentUser.id) || null
    }
  } catch {
    currentUserEntry = null
  }

  return new Response(
    JSON.stringify({
      roomId: id,
      updatedAt: Date.now(),
      totalPlayers: enriched.length,
      entries: topEntries,
      heroes,
      currentUser: currentUserEntry,
    }),
    {
      status: 200,
      headers: { 'content-type': 'application/json' },
    }
  )
}


