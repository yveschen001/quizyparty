import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { q as questionStore, a as questionSetStore } from '../../../chunks/index_v9SEP3HN.mjs';
import { s as syncRoomTemplateFromQuestionSet } from '../../../chunks/template-sync_BsRXWhuH.mjs';
import crypto from 'node:crypto';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const ALLOWED_COUNTS = [10, 20, 30, 40, 50, 60];
const POST = async ({ request }) => {
  const cookie = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookie);
  if (!user) {
    return new Response(JSON.stringify({ error: "not authenticated" }), {
      status: 401,
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
  const { title, lang, questionIds, status, expectedCount, description, tags, draftParentId } = body;
  if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
    return new Response(JSON.stringify({ error: "questionIds (array) with at least one question is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const store = questionStore();
  const validQuestionIds = [];
  for (const qId of questionIds) {
    const q = store.get(String(qId));
    if (!q) {
      continue;
    }
    if (q.userId !== user.id) {
      return new Response(JSON.stringify({ error: "question not owned by user" }), {
        status: 403,
        headers: { "content-type": "application/json" }
      });
    }
    validQuestionIds.push(q.id);
  }
  if (validQuestionIds.length === 0) {
    return new Response(JSON.stringify({ error: "no valid questions found" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const now = Date.now();
  const setId = crypto.randomUUID();
  const normalizedStatus = status === "draft" || status === "published" || status === "archived" ? status : "draft";
  const normalizedTags = Array.isArray(tags) ? tags.map(String) : void 0;
  let targetCount = void 0;
  if (typeof expectedCount === "number" && ALLOWED_COUNTS.indexOf(expectedCount) >= 0) {
    targetCount = expectedCount;
  }
  if (!targetCount) {
    targetCount = ALLOWED_COUNTS[0];
  }
  const progressCount = validQuestionIds.length;
  if (normalizedStatus === "published" && progressCount !== targetCount) {
    return new Response(JSON.stringify({ error: "question count does not match expected count" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    questionSetStore().create({
      id: setId,
      userId: user.id,
      title: title ? String(title) : void 0,
      lang: String(lang || "en"),
      questionIds: validQuestionIds,
      status: normalizedStatus,
      expectedQuestionCount: targetCount,
      description: description ? String(description) : void 0,
      tags: normalizedTags,
      version: 1,
      draftParentId: draftParentId ? String(draftParentId) : void 0,
      publishedAt: normalizedStatus === "published" ? now : void 0,
      archivedAt: normalizedStatus === "archived" ? now : void 0,
      progressQuestionCount: progressCount,
      createdAt: now,
      updatedAt: now
    });
    const setStatusForQuestions = normalizedStatus === "published" ? "published" : "draft";
    validQuestionIds.forEach((id) => {
      store.update(id, {
        setId,
        status: setStatusForQuestions
      });
    });
    const createdSet = questionSetStore().get(setId);
    if (createdSet) {
      syncRoomTemplateFromQuestionSet({
        userId: user.id,
        userName: user.name,
        questionSet: createdSet
      });
    }
    return new Response(JSON.stringify({ id: setId }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    console.error("[Create Question Set]", e);
    return new Response(JSON.stringify({ error: "failed to create question set" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
