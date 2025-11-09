import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { s as scoreStore } from '../../../chunks/index_Dum4L62E.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ request, url }) => {
  const cookie = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookie);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const userId = url.searchParams.get("userId") || user.id;
  if (userId !== user.id) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" }
    });
  }
  const limit = Math.min(Number(url.searchParams.get("limit") || 50), 100);
  const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
  try {
    const history = scoreStore().getUserHistory(userId, limit, offset);
    return new Response(JSON.stringify({ history, limit, offset }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to get history" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
