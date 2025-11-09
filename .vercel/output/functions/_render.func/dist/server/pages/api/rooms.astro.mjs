import { createRoom } from '../../chunks/store_B5ewbhuV.mjs';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async ({ request }) => {
  const cookie = request.headers.get("cookie") ?? "";
  const uid = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1] || "";
  if (!uid) {
    return new Response(JSON.stringify({ error: "missing uid" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  let body = {};
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "invalid request body" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const lang = String(body?.lang || "en");
  const questionSetId = String(body?.questionSetId || "");
  const requestedRoomIdRaw = typeof body?.roomId === "string" ? body.roomId.trim() : "";
  const replaceExisting = Boolean(body?.replaceExisting);
  if (!questionSetId) {
    return new Response(JSON.stringify({ error: "questionSetId is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const room = await createRoom(lang, uid, questionSetId, {
      roomId: requestedRoomIdRaw || void 0,
      replaceExisting
    });
    return new Response(JSON.stringify({ id: room.id, hostId: room.hostId }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to create room", details: String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
};
const GET = async ({ request, url }) => {
  const cookie = request.headers.get("cookie") ?? "";
  const uid = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1] || "";
  if (!uid) {
    return new Response(JSON.stringify({ error: "missing uid" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const lang = String(url.searchParams.get("lang") || "en");
  const questionSetId = String(url.searchParams.get("questionSetId") || "");
  const requestedRoomIdRaw = String(url.searchParams.get("roomId") || "").trim();
  const replaceExisting = url.searchParams.get("replaceExisting") === "true";
  if (!questionSetId) {
    return new Response(JSON.stringify({ error: "questionSetId is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const room = await createRoom(lang, uid, questionSetId, {
      roomId: requestedRoomIdRaw || void 0,
      replaceExisting
    });
    return new Response(JSON.stringify({ id: room.id, hostId: room.hostId }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to create room", details: String(e) }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
