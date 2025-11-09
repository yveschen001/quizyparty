import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { s as scoreStore } from '../../../chunks/index_Dum4L62E.mjs';
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
  const { questionId, questionIndex, userChoice, correctAnswer, lang, roomId, timeSpentMs } = body;
  if (!questionId || userChoice === void 0 || correctAnswer === void 0) {
    return new Response(JSON.stringify({ error: "missing required fields" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const isCorrect = userChoice === correctAnswer;
    scoreStore().record({
      id: crypto.randomUUID(),
      userId: user.id,
      roomId: roomId || "unknown",
      questionId: String(questionId),
      questionIndex: Number(questionIndex) || 0,
      userChoice: String(userChoice),
      correctAnswer: String(correctAnswer),
      isCorrect,
      answeredAt: Date.now(),
      timeSpentMs: Math.max(0, Number(timeSpentMs) || 0),
      lang: String(lang || "en")
    });
    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: "failed to record score" }), {
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
