import { getRoomState } from '../../../../chunks/store_B5ewbhuV.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const GET = async ({ params, request }) => {
  const id = String(params.id);
  const cookieHeader = request.headers.get("cookie") || "";
  const match = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookieHeader);
  const memberId = match ? match[1] : void 0;
  const st = getRoomState(id, memberId);
  if (!st) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  return new Response(JSON.stringify(st), {
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
