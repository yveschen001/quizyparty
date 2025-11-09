import { s as scoreStore } from '../../../../chunks/index_Dum4L62E.mjs';
import { u as userStore } from '../../../../chunks/index_8x7WAnxK.mjs';
import { b as getCurrentUser } from '../../../../chunks/auth_CP3BPK2t.mjs';
import { M as MAX_ANSWER_TIME_MS } from '../../../../chunks/utils_DJdXob5E.mjs';
export { renderers } from '../../../../renderers.mjs';

const prerender = false;
const GET = async ({ params, request, url }) => {
  const roomId = String(params.id || "");
  if (!roomId) {
    return new Response(JSON.stringify({ error: "room id is required" }), {
      status: 400,
      headers: { "content-type": "application/json" }
    });
  }
  const limitParam = Number(url.searchParams.get("limit") || 100);
  const limit = Math.min(Math.max(Number.isFinite(limitParam) ? limitParam : 100, 1), 100);
  const includeCurrent = url.searchParams.get("includeCurrent") !== "false";
  const cookie = request.headers.get("cookie") || "";
  let currentUserId = null;
  if (includeCurrent) {
    try {
      const currentUser = await getCurrentUser(cookie);
      if (currentUser) {
        currentUserId = currentUser.id;
      }
    } catch {
      currentUserId = null;
    }
  }
  const scores = scoreStore().getRoomScores(roomId);
  if (!scores || scores.length === 0) {
    return new Response(
      JSON.stringify({
        roomId,
        entries: [],
        total: 0,
        limit,
        currentUser: currentUserId ? { userId: currentUserId, rank: null } : null
      }),
      {
        status: 200,
        headers: { "content-type": "application/json" }
      }
    );
  }
  const sorted = scores.slice().sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    if (b.totalCorrect !== a.totalCorrect) return b.totalCorrect - a.totalCorrect;
    if (b.accuracy !== a.accuracy) return b.accuracy - a.accuracy;
    if (a.averageTimeMs !== b.averageTimeMs) return a.averageTimeMs - b.averageTimeMs;
    return b.lastAnsweredAt - a.lastAnsweredAt;
  }).map((entry, index) => ({
    rank: index + 1,
    ...entry
  }));
  const topEntries = sorted.slice(0, limit);
  const idsToLoad = /* @__PURE__ */ new Set();
  topEntries.forEach((entry) => idsToLoad.add(entry.userId));
  const users = userStore();
  let currentUserSummary = null;
  if (currentUserId) {
    const found = sorted.find((entry) => entry.userId === currentUserId);
    if (found) {
      if (found.rank > limit) {
        idsToLoad.add(found.userId);
      }
      currentUserSummary = mapRankingEntry(found, users.get(found.userId) || null);
    } else {
      currentUserSummary = {
        rank: null,
        userId: currentUserId,
        name: "",
        avatar: void 0,
        totalAnswered: 0,
        totalCorrect: 0,
        accuracy: 0,
        averageTimeMs: MAX_ANSWER_TIME_MS,
        totalTimeMs: 0,
        fastestTimeMs: null,
        score: 0
      };
    }
  }
  const userCache = /* @__PURE__ */ new Map();
  idsToLoad.forEach((id) => {
    const profile = users.get(id);
    if (profile) {
      userCache.set(id, profile);
    }
  });
  const entries = topEntries.map(
    (entry) => mapRankingEntry(entry, userCache.get(entry.userId) || null)
  );
  const currentUserResponse = currentUserSummary ? enrichCurrentUser(currentUserSummary, userCache.get(currentUserSummary.userId) || null) : null;
  return new Response(
    JSON.stringify({
      roomId,
      entries,
      total: sorted.length,
      limit,
      currentUser: currentUserResponse
    }),
    {
      status: 200,
      headers: { "content-type": "application/json" }
    }
  );
};
function mapRankingEntry(entry, profile) {
  const name = profile?.name || defaultName(entry.userId, entry.rank);
  return {
    rank: entry.rank,
    userId: entry.userId,
    name,
    avatar: profile?.avatar,
    totalAnswered: entry.totalAnswered,
    totalCorrect: entry.totalCorrect,
    accuracy: entry.accuracy,
    averageTimeMs: entry.averageTimeMs,
    totalTimeMs: entry.totalTimeMs,
    fastestTimeMs: entry.fastestTimeMs,
    score: entry.score
  };
}
function enrichCurrentUser(entry, profile) {
  return {
    ...entry,
    name: profile?.name || entry.name || defaultName(entry.userId, entry.rank || 0),
    avatar: profile?.avatar || entry.avatar
  };
}
function defaultName(userId, rank) {
  const suffix = userId ? userId.slice(-4) : "0000";
  return rank ? `Player ${rank}` : `Player #${suffix}`;
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
