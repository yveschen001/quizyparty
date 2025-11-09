import { listRooms } from '../../../chunks/store_B5ewbhuV.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const limit = Math.min(Number(url.searchParams.get("limit") || 20), 100);
  const offset = Math.max(Number(url.searchParams.get("offset") || 0), 0);
  const sortBy = url.searchParams.get("sortBy") || "created";
  const order = url.searchParams.get("order") || "desc";
  const lang = url.searchParams.get("lang") || void 0;
  const hoursParam = Number(url.searchParams.get("hours") || "");
  const recentHours = Number.isFinite(hoursParam) && hoursParam > 0 ? hoursParam : void 0;
  const createdAfter = recentHours ? Date.now() - recentHours * 60 * 60 * 1e3 : void 0;
  try {
    const rooms = listRooms({ limit, offset, sortBy, order, lang, createdAfter });
    return new Response(JSON.stringify({ rooms, limit, offset, total: rooms.length, hours: recentHours }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to list rooms" }), {
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
