import { getRoomState, submitAnswer } from '../../../../chunks/store_B5ewbhuV.mjs';
import { b as getCurrentUser } from '../../../../chunks/auth_CP3BPK2t.mjs';
import { s as scoreStore } from '../../../../chunks/index_Dum4L62E.mjs';
import crypto from 'node:crypto';
import { M as MAX_ANSWER_TIME_MS } from '../../../../chunks/utils_DJdXob5E.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const POST = async ({ params, request }) => {
  const id = String(params.id);
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
  const qIndex = Number(body?.index ?? 0);
  const choice = String(body?.choice ?? "");
  const timeSpentMsRaw = Number(body?.timeSpentMs ?? 0);
  const timeSpentMs = Math.max(0, Math.min(Number.isFinite(timeSpentMsRaw) ? timeSpentMsRaw : 0, MAX_ANSWER_TIME_MS));
  if (!choice) {
    return new Response(JSON.stringify({ error: "choice is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const roomState = getRoomState(id, uid);
  if (!roomState) {
    return new Response(JSON.stringify({ error: "room not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  const ok = submitAnswer(id, qIndex, uid, choice, timeSpentMs);
  if (!ok) {
    return new Response(JSON.stringify({ error: "room not found" }), {
      status: 404,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const user = await getCurrentUser(cookie);
    if (user) {
      const store = scoreStore();
      const roomStoreModule = await import('../../../../chunks/store_B5ewbhuV.mjs');
      const fullRoom = roomStoreModule.getRoomStore().get(id);
      if (fullRoom && fullRoom.questions && fullRoom.questions[qIndex]) {
        const question = fullRoom.questions[qIndex];
        const correctAnswer = question.correctAnswer;
        const isCorrect = choice === correctAnswer;
        store.record({
          id: crypto.randomUUID(),
          userId: user.id,
          roomId: id,
          questionId: question.id || String(qIndex),
          questionIndex: qIndex,
          userChoice: choice,
          correctAnswer,
          isCorrect,
          answeredAt: Date.now(),
          timeSpentMs,
          lang: roomState.lang
        });
      }
    }
  } catch (e) {
    console.error("[Score recording]", e);
  }
  return new Response(JSON.stringify({ ok: true }), {
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
