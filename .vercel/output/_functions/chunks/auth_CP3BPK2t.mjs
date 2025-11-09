import crypto from 'node:crypto';
import { u as userStore } from './index_8x7WAnxK.mjs';

const SESSION_COOKIE = "qp_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 30;
function getSessionId(cookie) {
  const match = cookie.match(new RegExp(`(?:^|;\\s*)${SESSION_COOKIE}=([^;]+)`));
  return match ? match[1] : null;
}
function setSessionCookie(res, sessionId) {
  const expires = new Date(Date.now() + SESSION_MAX_AGE * 1e3).toUTCString();
  res.headers.append("Set-Cookie", `${SESSION_COOKIE}=${sessionId}; Path=/; Expires=${expires}; SameSite=lax; HttpOnly`);
}
function clearSessionCookie(res) {
  res.headers.append("Set-Cookie", `${SESSION_COOKIE}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=lax; HttpOnly`);
}
const sessions = /* @__PURE__ */ new Map();
function createSession(userId) {
  const sessionId = crypto.randomUUID();
  sessions.set(sessionId, {
    userId,
    expiresAt: Date.now() + SESSION_MAX_AGE * 1e3
  });
  cleanupSessions();
  return sessionId;
}
function getSession(sessionId) {
  const session = sessions.get(sessionId);
  if (!session) return null;
  if (session.expiresAt < Date.now()) {
    sessions.delete(sessionId);
    return null;
  }
  return { userId: session.userId };
}
function deleteSession(sessionId) {
  sessions.delete(sessionId);
}
function cleanupSessions() {
  const now = Date.now();
  for (const [id, session] of sessions.entries()) {
    if (session.expiresAt < now) {
      sessions.delete(id);
    }
  }
}
async function getCurrentUser(cookie) {
  const sessionId = getSessionId(cookie);
  if (!sessionId) return null;
  const session = getSession(sessionId);
  if (!session) return null;
  return userStore().get(session.userId);
}

export { clearSessionCookie as a, getCurrentUser as b, createSession as c, deleteSession as d, getSessionId as g, setSessionCookie as s };
