import { s as scoreStore } from '../../../chunks/index_Dum4L62E.mjs';
import { u as userStore } from '../../../chunks/index_8x7WAnxK.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const limit = Math.min(Number(url.searchParams.get("limit") || 100), 200);
  try {
    const leaderboard = scoreStore().getLeaderboard(limit);
    const enriched = leaderboard.map((entry) => {
      const user = userStore().get(entry.userId);
      return {
        ...entry,
        userName: user?.name || "Anonymous",
        userAvatar: user?.avatar
      };
    });
    return new Response(JSON.stringify({ leaderboard: enriched, limit }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to get leaderboard" }), {
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
