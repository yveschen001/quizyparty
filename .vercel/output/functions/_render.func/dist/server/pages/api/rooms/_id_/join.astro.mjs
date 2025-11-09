import { getRoomState, joinRoom } from '../../../../chunks/store_B5ewbhuV.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ params, request }) => {
  const id = String(params.id);
  const cookie = request.headers.get("cookie") ?? "";
  const uid = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1] || "";
  if (!uid) {
    return new Response(JSON.stringify({ error: "missing uid" }), { status: 400, headers: { "content-type": "application/json" } });
  }
  const currentState = getRoomState(id, uid);
  if (!currentState) {
    return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers: { "content-type": "application/json" } });
  }
  if (currentState.members.includes(uid)) {
    return new Response(JSON.stringify({ ok: true, id, memberId: uid }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  }
  const room = joinRoom(id, uid);
  if (!room) {
    return new Response(JSON.stringify({ error: "not found" }), { status: 404, headers: { "content-type": "application/json" } });
  }
  return new Response(JSON.stringify({ ok: true, id, memberId: uid }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
