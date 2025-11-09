import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { q as questionStore } from '../../../chunks/index_v9SEP3HN.mjs';
import crypto from 'node:crypto';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
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
  const { question, choices, correctAnswer, lang, category, keywords, setId, status, order, version } = body;
  if (!question || !choices || !Array.isArray(choices) || choices.length < 2) {
    return new Response(JSON.stringify({ error: "question, choices (at least 2) are required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  if (!correctAnswer || !choices.includes(correctAnswer)) {
    return new Response(JSON.stringify({ error: "correctAnswer must be one of the choices" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const now = Date.now();
  const questionId = crypto.randomUUID();
  try {
    questionStore().create({
      id: questionId,
      userId: user.id,
      setId: setId ? String(setId) : void 0,
      question: String(question),
      choices: choices.map(String),
      correctAnswer: String(correctAnswer),
      lang: String(lang || "en"),
      category: category ? String(category) : void 0,
      keywords: keywords && Array.isArray(keywords) ? keywords.map(String) : void 0,
      status: status === "published" || status === "archived" ? status : "draft",
      order: typeof order === "number" ? order : void 0,
      version: typeof version === "number" && version > 0 ? version : 1,
      publishedAt: status === "published" ? now : void 0,
      archivedAt: status === "archived" ? now : void 0,
      createdAt: now,
      updatedAt: now
    });
    return new Response(JSON.stringify({ id: questionId }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    console.error("[Create Question]", e);
    return new Response(JSON.stringify({ error: "failed to create question" }), {
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
