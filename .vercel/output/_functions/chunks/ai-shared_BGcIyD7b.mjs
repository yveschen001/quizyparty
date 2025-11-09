import { e as entStore } from './index_CB94O9Pg.mjs';

const NON_VIP_LIMITS = {
  generate: 1,
  improve: 1
};
const VIP_LIMITS = {
  generate: 5,
  improve: 5
};
const usageStore = /* @__PURE__ */ new Map();
function todayKey() {
  const now = /* @__PURE__ */ new Date();
  const y = now.getUTCFullYear();
  const m = String(now.getUTCMonth() + 1).padStart(2, "0");
  const d = String(now.getUTCDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
function getRecord(key) {
  const currentDay = todayKey();
  const existing = usageStore.get(key);
  if (existing && existing.day === currentDay) {
    return existing;
  }
  const fresh = { day: currentDay, generate: 0, improve: 0 };
  usageStore.set(key, fresh);
  return fresh;
}
function getLimits(isVip) {
  return isVip ? VIP_LIMITS : NON_VIP_LIMITS;
}
function clampNonNegative(value) {
  return value < 0 ? 0 : value;
}
function getUsageSnapshot(key, isVip) {
  const record = getRecord(key);
  const limits = getLimits(isVip);
  return {
    generate: {
      used: record.generate,
      max: limits.generate,
      remaining: clampNonNegative(limits.generate - record.generate)
    },
    improve: {
      used: record.improve,
      max: limits.improve,
      remaining: clampNonNegative(limits.improve - record.improve)
    }
  };
}
function canUseGenerate(key, isVip) {
  const record = getRecord(key);
  const limits = getLimits(isVip);
  return record.generate < limits.generate;
}
function canUseImprove(key, isVip) {
  const record = getRecord(key);
  const limits = getLimits(isVip);
  return record.improve < limits.improve;
}
function recordGenerateUsage(key, isVip) {
  const record = getRecord(key);
  const limits = getLimits(isVip);
  if (record.generate < limits.generate) {
    record.generate += 1;
  }
  return getUsageSnapshot(key, isVip);
}
function recordImproveUsage(key, isVip) {
  const record = getRecord(key);
  const limits = getLimits(isVip);
  if (record.improve < limits.improve) {
    record.improve += 1;
  }
  return getUsageSnapshot(key, isVip);
}
const NON_VIP_MAX_GENERATE_COUNT = 20;
const VIP_MAX_GENERATE_COUNT = 60;

const VIP_ENTITLEMENT_KEY = process.env.RC_ENTITLEMENT_KEY || "vip";
const LANGUAGE_DISPLAY = {
  en: "English",
  "zh-hant": "Traditional Chinese",
  "zh-hans": "Simplified Chinese",
  ja: "Japanese",
  ko: "Korean",
  de: "German",
  fr: "French"
};
function extractAppUserId(cookieHeader) {
  if (!cookieHeader) return null;
  const match = /(?:^|;\s*)qp_uid=([^;]+)/.exec(cookieHeader);
  return match ? match[1] : null;
}
function isVipFromCookie(cookieHeader) {
  const appUserId = extractAppUserId(cookieHeader);
  if (!appUserId) return false;
  const record = entStore().get(appUserId);
  if (!record) return false;
  return record.active.includes(VIP_ENTITLEMENT_KEY);
}
function getUsageKey(userId, cookieHeader) {
  const appUserId = extractAppUserId(cookieHeader);
  return appUserId ? `${userId}:${appUserId}` : userId;
}
function resolveLanguageDisplay(code) {
  if (!code) return LANGUAGE_DISPLAY.en;
  const lower = code.toLowerCase();
  return LANGUAGE_DISPLAY[lower] || LANGUAGE_DISPLAY.en;
}

export { NON_VIP_MAX_GENERATE_COUNT as N, VIP_MAX_GENERATE_COUNT as V, getUsageSnapshot as a, recordGenerateUsage as b, canUseGenerate as c, canUseImprove as d, recordImproveUsage as e, getUsageKey as g, isVipFromCookie as i, resolveLanguageDisplay as r };
