import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { q as questionStore } from '../../../chunks/index_v9SEP3HN.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const PUT = async ({ params, request }) => {
  const cookie = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookie);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const id = String(params.id || "");
  if (!id) {
    return new Response(JSON.stringify({ error: "question id is required" }), {
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
  const store = questionStore();
  const question = store.get(id);
  if (!question || question.userId !== user.id) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  const updates = {};
  if (typeof body.question === "string") updates.question = body.question.trim();
  if (Array.isArray(body.choices)) updates.choices = body.choices.map(String);
  if (typeof body.correctAnswer === "string") updates.correctAnswer = body.correctAnswer.trim();
  if (typeof body.lang === "string") updates.lang = body.lang.trim();
  if (Array.isArray(body.keywords)) updates.keywords = body.keywords.map(String);
  if (typeof body.category === "string") updates.category = body.category.trim();
  store.update(id, updates);
  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
