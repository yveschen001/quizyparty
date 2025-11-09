import { config } from 'dotenv';
import { resolve } from 'path';
import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { a as questionSetStore } from '../../../chunks/index_v9SEP3HN.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
if (typeof process !== "undefined" && process.env) {
  try {
    config({ path: resolve(process.cwd(), ".env") });
  } catch {
  }
}
const GET = async ({ request, url }) => {
  try {
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
    const store = questionSetStore();
    const sets = store.getByUser(userId, limit, offset);
    return new Response(JSON.stringify({ sets, limit, offset }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    console.error("[API] /api/question-sets/list error:", e);
    return new Response(JSON.stringify({ error: "failed to list question sets", details: e instanceof Error ? e.message : String(e) }), {
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
