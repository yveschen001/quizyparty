import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { a as questionSetStore, q as questionStore } from '../../../chunks/index_v9SEP3HN.mjs';
import { s as syncRoomTemplateFromQuestionSet } from '../../../chunks/template-sync_BsRXWhuH.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const ALLOWED_COUNTS = [10, 20, 30, 40, 50, 60];
const GET = async ({ params }) => {
  const setId = String(params.id || "");
  if (!setId) {
    return new Response(JSON.stringify({ error: "question set id is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const set = questionSetStore().get(setId);
    if (!set) {
      return new Response(JSON.stringify({ error: "question set not found" }), {
        status: 404,
        headers: { "content-type": "application/json" }
      });
    }
    const questions = questionStore().getBySet(setId);
    const safeQuestions = questions.map((q) => ({
      id: q.id,
      question: q.question,
      choices: q.choices,
      correctAnswer: q.correctAnswer,
      lang: q.lang,
      category: q.category,
      keywords: q.keywords,
      createdAt: q.createdAt
    }));
    return new Response(
      JSON.stringify({
        id: set.id,
        userId: set.userId,
        title: set.title,
        lang: set.lang,
        questionIds: set.questionIds,
        questions: safeQuestions,
        createdAt: set.createdAt,
        updatedAt: set.updatedAt
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" }
      }
    );
  } catch (e) {
    console.error("[Get Question Set]", e);
    return new Response(JSON.stringify({ error: "failed to get question set" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
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
  const setId = String(params.id || "");
  if (!setId) {
    return new Response(JSON.stringify({ error: "question set id is required" }), {
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
  const store = questionSetStore();
  const existing = store.get(setId);
  if (!existing || existing.userId !== user.id) {
    return new Response(JSON.stringify({ error: "question set not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  const incomingQuestionIds = Array.isArray(body.questionIds) ? body.questionIds.map(String) : existing.questionIds;
  if (!incomingQuestionIds || incomingQuestionIds.length === 0) {
    return new Response(JSON.stringify({ error: "questionIds are required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const questionsStore = questionStore();
  const validQuestionIds = [];
  for (const qId of incomingQuestionIds) {
    const q = questionsStore.get(qId);
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
  const nextStatus = typeof body.status === "string" && (body.status === "draft" || body.status === "published" || body.status === "archived") ? body.status : existing.status;
  let targetCount = existing.expectedQuestionCount;
  if (typeof body.expectedCount === "number" && ALLOWED_COUNTS.indexOf(body.expectedCount) >= 0) {
    targetCount = body.expectedCount;
  }
  if (!targetCount) {
    targetCount = ALLOWED_COUNTS[0];
  }
  const progressCount = validQuestionIds.length;
  if (nextStatus === "published" && progressCount !== targetCount) {
    return new Response(JSON.stringify({ error: "question count does not match expected count" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const now = Date.now();
  const updates = {
    questionIds: validQuestionIds,
    status: nextStatus,
    expectedQuestionCount: targetCount,
    progressQuestionCount: progressCount,
    title: typeof body.title === "string" ? body.title.trim() : existing.title
  };
  if (nextStatus === "published") {
    updates.publishedAt = existing.publishedAt || now;
    updates.archivedAt = void 0;
  } else if (nextStatus === "archived") {
    updates.archivedAt = now;
  } else {
    updates.archivedAt = void 0;
  }
  store.update(setId, updates);
  const setStatusForQuestions = nextStatus === "published" ? "published" : "draft";
  validQuestionIds.forEach((id) => {
    questionsStore.update(id, {
      setId,
      status: setStatusForQuestions
    });
  });
  const removed = existing.questionIds.filter((id) => validQuestionIds.indexOf(id) === -1);
  removed.forEach((id) => {
    questionsStore.update(id, {
      setId: void 0,
      status: "draft"
    });
  });
  const updatedSet = store.get(setId);
  if (updatedSet) {
    syncRoomTemplateFromQuestionSet({
      userId: user.id,
      userName: user.name,
      questionSet: updatedSet
    });
  }
  return new Response(JSON.stringify({ id: setId }), {
    status: 200,
    headers: { "content-type": "application/json" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  PUT,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
