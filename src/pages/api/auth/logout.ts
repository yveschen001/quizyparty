import type { APIRoute } from 'astro'
export const prerender = false
import { getSessionId, deleteSession, clearSessionCookie } from '../../../lib/auth'

export const POST: APIRoute = async ({ request, redirect }) => {
  const cookie = request.headers.get('cookie') || ''
  const sessionId = getSessionId(cookie)

  if (sessionId) {
    deleteSession(sessionId)
  }

  const res = redirect('/?success=logged_out', 302)
  clearSessionCookie(res)
  return res
}

