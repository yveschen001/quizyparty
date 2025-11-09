import { g as getSessionId, d as deleteSession, a as clearSessionCookie } from '../../../chunks/auth_CP3BPK2t.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const POST = async ({ request, redirect }) => {
  const cookie = request.headers.get("cookie") || "";
  const sessionId = getSessionId(cookie);
  if (sessionId) {
    deleteSession(sessionId);
  }
  const res = redirect("/?success=logged_out", 302);
  clearSessionCookie(res);
  return res;
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
