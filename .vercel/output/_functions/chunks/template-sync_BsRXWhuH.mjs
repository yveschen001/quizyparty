import { r as roomTemplateStore } from './template-store_BhMRWN5b.mjs';

function padNumber(value) {
  return value < 10 ? "0" + value : String(value);
}
function buildDefaultRoomTitle(userName, referenceDate) {
  const baseName = userName && userName.trim().length ? userName.trim() : "My";
  const date = /* @__PURE__ */ new Date();
  const year = date.getFullYear();
  const month = padNumber(date.getMonth() + 1);
  const day = padNumber(date.getDate());
  return baseName + " Quiz " + year + month + day;
}
function syncRoomTemplateFromQuestionSet(options) {
  const { userId, userName, questionSet, fallbackTitle } = options;
  const store = roomTemplateStore();
  const existing = store.findByQuestionSet(userId, questionSet.id);
  const normalizedStatus = questionSet.status === "published" ? "published" : "draft";
  if (existing) {
    store.update(existing.id, {
      status: normalizedStatus,
      questionSetId: questionSet.id
    });
    return existing.id;
  }
  const titleSource = questionSet.title && questionSet.title.trim().length ? questionSet.title.trim() : fallbackTitle && fallbackTitle.trim().length ? fallbackTitle.trim() : buildDefaultRoomTitle(userName);
  const now = Date.now();
  store.create({
    id: questionSet.id,
    userId,
    title: titleSource,
    questionSetId: questionSet.id,
    status: normalizedStatus,
    createdAt: now,
    updatedAt: now
  });
  return questionSet.id;
}

export { buildDefaultRoomTitle as b, syncRoomTemplateFromQuestionSet as s };
