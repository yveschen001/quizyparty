import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { g as getUsageKey, i as isVipFromCookie, a as getUsageSnapshot } from '../../../chunks/ai-shared_BGcIyD7b.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookieHeader);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const usageKey = getUsageKey(user.id, cookieHeader);
  const isVip = isVipFromCookie(cookieHeader);
  const limits = getUsageSnapshot(usageKey, isVip);
  return new Response(JSON.stringify({ limits, vip: isVip }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
