import crypto from 'node:crypto'
import { userStore } from '../server/user'
import type { User } from '../server/user/types'

const SESSION_COOKIE = 'qp_session'
const SESSION_MAX_AGE = 60 * 60 * 24 * 30 // 30 days

export function getSessionId(cookie: string): string | null {
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`))
  return match ? match[1] : null
}

export function setSessionCookie(res: Response, sessionId: string): void {
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1000).toUTCString()
  res.headers.append('Set-Cookie', `${SESSION_COOKIE}=${sessionId}; Path=/; Expires=${expires}; SameSite=lax; HttpOnly`)
}

export function clearSessionCookie(res: Response): void {
  res.headers.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=lax; HttpOnly`)
}

// Simple in-memory session store (in production, use Redis or database)
const sessions = new Map<string, { userId: string; expiresAt: number }>()

export function createSession(userId: string): string {
  const sessionId = crypto.randomUUID()
  sessions.set(sessionId, {
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1000,
  })
  // Clean up expired sessions
  cleanupSessions()
  return sessionId
}

export function getSession(sessionId: string): { userId: string } | null {
  const session = sessions.get(sessionId)
  if (!session) return null
  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId)
    return null
  }
  return { userId: session.userId }
}

export function deleteSession(sessionId: string): void {
  sessions.delete(sessionId)
}

function cleanupSessions() {
  const now = Date.now()
  for (const [id, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(id)
    }
  }
}

export async function getCurrentUser(cookie: string): Promise<User | null> {
  const sessionId = getSessionId(cookie)
  if (!sessionId) return null
  const session = getSession(sessionId)
  if (!session) return null
  return userStore().get(session.userId)
}

