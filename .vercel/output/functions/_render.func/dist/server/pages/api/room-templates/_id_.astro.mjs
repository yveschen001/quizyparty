import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { r as roomTemplateStore } from '../../../chunks/template-store_BhMRWN5b.mjs';
import { a as questionSetStore } from '../../../chunks/index_v9SEP3HN.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const serialize = (template) => {
  if (!template) return null;
  const set = questionSetStore().get(template.questionSetId);
  return {
    id: template.id,
    userId: template.userId,
    title: template.title,
    questionSetId: template.questionSetId,
    status: template.status,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
    questionSet: set ? {
      id: set.id,
      title: set.title,
      questionIds: set.questionIds,
      status: set.status,
      updatedAt: set.updatedAt
    } : void 0
  };
};
const GET = async ({ params, request }) => {
  const cookie = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookie);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const id = String(params.id || "");
  const store = roomTemplateStore();
  const template = store.get(id);
  if (!template || template.userId !== user.id) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  return new Response(JSON.stringify({ template: serialize(template) }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};
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
  const store = roomTemplateStore();
  const template = store.get(id);
  if (!template || template.userId !== user.id) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
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
  const updates = {};
  if (typeof body.title === "string") {
    const trimmed = body.title.trim();
    if (trimmed.length) {
      updates.title = trimmed;
    }
  }
  if (typeof body.status === "string" && (body.status === "draft" || body.status === "published")) {
    if (body.status === "published") {
      const set = questionSetStore().get(template.questionSetId);
      if (!set || set.status !== "published") {
        return new Response(JSON.stringify({ error: "question set must be published before the room can be published" }), {
          status: 400,
          headers: { "content-type": "application/json" }
        });
      }
    }
    updates.status = body.status;
  }
  if (typeof body.questionSetId === "string") {
    const set = questionSetStore().get(body.questionSetId);
    if (!set || set.userId !== user.id) {
      return new Response(JSON.stringify({ error: "question set not found" }), {
        status: 404,
        headers: { "content-type": "application/json" }
      });
    }
    updates.questionSetId = set.id;
  }
  if (Object.keys(updates).length === 0) {
    return new Response(JSON.stringify({ error: "no updates provided" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  store.update(id, updates);
  const updated = store.get(id);
  return new Response(JSON.stringify({ template: serialize(updated) }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};
const DELETE = async ({ params, request }) => {
  const cookie = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookie);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
      headers: { "content-type": "application/json" }
    });
  }
  const id = String(params.id || "");
  const store = roomTemplateStore();
  const template = store.get(id);
  if (!template || template.userId !== user.id) {
    return new Response(JSON.stringify({ error: "not found" }), {
      status: 404,
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
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
