import { getRoomStore } from '../../../chunks/store_B5ewbhuV.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const DELETE = async ({ params, request }) => {
  const id = String(params.id || "").trim();
  if (!id) {
    return new Response(JSON.stringify({ error: "room id is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const cookie = request.headers.get("cookie") ?? "";
  const uid = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1] || "";
  if (!uid) {
    return new Response(JSON.stringify({ error: "missing uid" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const store = getRoomStore();
  const room = store.get(id);
  if (!room) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  if (room.hostId !== uid) {
    return new Response(JSON.stringify({ error: "forbidden" }), {
      status: 403,
      headers: { "content-type": "application/json" }
    });
  }
  store.delete(id);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  DELETE,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
