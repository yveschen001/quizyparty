import type { APIRoute } from 'astro'
export const prerender = false

import { getCurrentUser } from '../../../lib/auth'
import { getUsageSnapshot } from '../../../server/question/ai-usage'
import { getUsageKey, isVipFromCookie } from '../../../server/question/ai-shared'

export const GET: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookieHeader)

  if (!user) {
    return new Response(JSON.stringify({ error: 'not authenticated' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const usageKey = getUsageKey(user.id, cookieHeader)
  const isVip = isVipFromCookie(cookieHeader)
  const limits = getUsageSnapshot(usageKey, isVip)

  return new Response(JSON.stringify({ limits, vip: isVip }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}


