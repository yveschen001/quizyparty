import { b as getCurrentUser } from '../../../chunks/auth_CP3BPK2t.mjs';
import { q as questionStore } from '../../../chunks/index_v9SEP3HN.mjs';
import { g as getUsageKey, i as isVipFromCookie, a as getUsageSnapshot, d as canUseImprove, r as resolveLanguageDisplay, e as recordImproveUsage } from '../../../chunks/ai-shared_BGcIyD7b.mjs';
export { renderers } from '../../../renderers.mjs';

const prerender = false;
const OPENAI_MODEL = "gpt-4o-mini";
const IMPROVE_TEMPLATE = `You are a meticulous quiz editor.

Review the following multiple-choice questions written in {lang}.
For each question:
- Fix spelling, grammar, and punctuation while preserving meaning and difficulty.
- Ensure there are exactly four concise answer choices.
- Ensure the provided answer text matches one of the choices.
- Add a "keywords" array (3-5 short hashtags) describing the topic, without spaces.
- Do not introduce new facts that contradict the question.

Return ONLY a JSON array. Each item must be:
{
  "id": "<original id>",
  "question": "...",
  "choices": ["...", "...", "...", "..."],
  "answer": "...",
  "keywords": ["#tag1", "#tag2"]
}`;
function toHashtag(value) {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const noSpace = trimmed.replace(/\s+/g, "");
  if (!noSpace) return null;
  return noSpace.startsWith("#") ? noSpace : `#${noSpace}`;
}
function uniqueStrings(values) {
  const seen = /* @__PURE__ */ new Set();
  const result = [];
  for (const value of values) {
    if (!value) continue;
    if (seen.has(value)) continue;
    seen.add(value);
    result.push(value);
  }
  return result;
}
const POST = async ({ request }) => {
  const cookieHeader = request.headers.get("cookie") || "";
  const user = await getCurrentUser(cookieHeader);
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
  const usageKey = getUsageKey(user.id, cookieHeader);
  const isVip = isVipFromCookie(cookieHeader);
  const usageSnapshot = getUsageSnapshot(usageKey, isVip);
  if (!canUseImprove(usageKey, isVip)) {
    return new Response(JSON.stringify({ error: "quota_exceeded", limits: usageSnapshot }), {
      status: 429,
      headers: { "content-type": "application/json" }
    });
  }
  const questionIdsRaw = body.questionIds;
  if (!Array.isArray(questionIdsRaw) || questionIdsRaw.length === 0) {
    return new Response(JSON.stringify({ error: "question_ids_required", limits: usageSnapshot }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const questionIds = questionIdsRaw.map((id) => String(id)).filter((id) => id.length > 0);
  if (!questionIds.length) {
    return new Response(JSON.stringify({ error: "question_ids_required", limits: usageSnapshot }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const targetLangRaw = body.lang;
  const questionLang = typeof targetLangRaw === "string" ? targetLangRaw.toLowerCase() : "en";
  const langDisplay = resolveLanguageDisplay(questionLang);
  const store = questionStore();
  const questions = questionIds.map((id) => store.get(id)).filter((q) => Boolean(q && q.userId === user.id));
  if (!questions.length) {
    return new Response(JSON.stringify({ error: "no_questions_found", limits: usageSnapshot }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const payload = {
    language: langDisplay,
    questions: questions.map((q) => ({
      id: q.id,
      question: q.question,
      choices: q.choices,
      answer: q.correctAnswer,
      keywords: q.keywords ?? []
    }))
  };
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: "OpenAI API key not configured" }), {
      status: 500,
      headers: { "content-type": "application/json" }
    });
  }
  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: "system",
            content: IMPROVE_TEMPLATE.replace("{lang}", langDisplay)
          },
          {
            role: "user",
            content: JSON.stringify(payload)
          }
        ],
        temperature: 0.2,
        max_tokens: 4e3
      })
    });
    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: "OpenAI API error" }));
      return new Response(JSON.stringify({ error: "failed_to_improve", details: error, limits: usageSnapshot }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
    const data = await response.json();
    const content = data.choices?.[0]?.message?.content || "[]";
    let improved = [];
    try {
      const cleaned = content.replace(/```json\s*/g, "").replace(/```/g, "").trim();
      improved = JSON.parse(cleaned);
    } catch (error) {
      console.error("[AI Improve] parse error", error, content);
      return new Response(JSON.stringify({ error: "failed_to_parse", limits: usageSnapshot }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
    if (!Array.isArray(improved)) {
      return new Response(JSON.stringify({ error: "invalid_response", limits: usageSnapshot }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
    const now = Date.now();
    const updatedQuestions = [];
    for (const item of improved) {
      if (!item || typeof item !== "object") continue;
      const id = String(item.id || "");
      if (!id) continue;
      if (!questionIds.includes(id)) continue;
      const original = store.get(id);
      if (!original || original.userId !== user.id) continue;
      const rawChoices = Array.isArray(item.choices) ? item.choices.map((choice) => String(choice)) : [];
      const filteredChoices = rawChoices.filter((choice) => choice.trim().length > 0);
      const limitedChoices = filteredChoices.slice(0, 4);
      if (limitedChoices.length !== 4) continue;
      const answerRaw = String(item.answer || original.correctAnswer);
      const correctAnswer = limitedChoices.indexOf(answerRaw) >= 0 ? answerRaw : limitedChoices[0];
      const aiKeywordsRaw = Array.isArray(item.keywords) ? item.keywords.map((kw) => String(kw)) : [];
      const keywords = uniqueStrings(
        aiKeywordsRaw.map((kw) => toHashtag(kw) || "").filter((kw) => kw.length > 1)
      );
      store.update(id, {
        question: String(item.question || original.question),
        choices: limitedChoices,
        correctAnswer,
        keywords,
        lang: questionLang,
        updatedAt: now
      });
      updatedQuestions.push({
        id,
        question: String(item.question || original.question),
        choices: limitedChoices,
        correctAnswer,
        keywords
      });
    }
    if (!updatedQuestions.length) {
      return new Response(JSON.stringify({ error: "no_updates", limits: usageSnapshot }), {
        status: 500,
        headers: { "content-type": "application/json" }
      });
    }
    const updatedLimits = recordImproveUsage(usageKey, isVip);
    return new Response(JSON.stringify({ questions: updatedQuestions, limits: updatedLimits }), {
      status: 200,
      headers: { "content-type": "application/json" }
    });
  } catch (error) {
    console.error("[AI Improve]", error);
    return new Response(JSON.stringify({ error: "failed_to_improve", limits: usageSnapshot }), {
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
