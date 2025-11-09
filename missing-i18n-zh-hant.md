# missing-i18n-zh-hant

- 更新時間：2025-11-09 06:06:46.315 UTC
- 注意：未能從 `pnpm i18n:check` 取得缺詞統計，請手動檢查輸出。

---

## i18n 審計摘錄（logs/i18n-lint.txt）

```
src/middleware.ts:22:    const hasUidApi = context.cookies.get('qp_uid')
src/middleware.ts:25:      context.cookies.set('qp_uid', uid, {
src/middleware.ts:32:    return next()
src/middleware.ts:40:    const hasUid = context.cookies.get('qp_uid')
src/middleware.ts:43:      context.cookies.set('qp_uid', uid, {
src/middleware.ts:52:  const segments = pathname.split('/').filter(Boolean)
src/middleware.ts:67:      return Response.redirect(redirectUrl.toString(), 301)
src/middleware.ts:71:  const hasUid = context.cookies.get('qp_uid')
src/middleware.ts:74:    context.cookies.set('qp_uid', uid, {
src/middleware.ts:81:  return next()
src/server/room/template-memory.ts:8:      templates.set(template.id, template)
src/server/room/template-memory.ts:10:    get(id: string) {
src/server/room/template-memory.ts:11:      return templates.get(id) || null
src/server/room/template-memory.ts:21:        .sort((a, b) => b.createdAt - a.createdAt)
src/server/room/template-memory.ts:25:    findByQuestionSet(userId: string, questionSetId: string) {
src/server/room/template-memory.ts:34:      const tpl = templates.get(id)
src/server/room/template-memory.ts:36:      templates.set(id, { ...tpl, ...updates, updatedAt: Date.now() })
src/server/room/analytics.ts:84:    leaderboardMap.set(entry.userId, {
src/server/room/analytics.ts:99:      perQuestionMap.set(index, {
src/server/room/analytics.ts:110:    const existing = perQuestionMap.get(index)
src/server/room/analytics.ts:125:    uniqueResponders: new Set(serialized.uniqueResponders || []),
src/server/room/analytics.ts:150:    .sort((a, b) => {
src/server/room/analytics.ts:209:  const entry = leaderboard.get(memberId) || {
src/server/room/analytics.ts:242:  leaderboard.set(memberId, entry)
src/server/room/template.ts:21:  get(id: string): RoomTemplate | null
src/server/room/template.ts:28:  findByQuestionSet(userId: string, questionSetId: string): RoomTemplate | null
src/server/room/template-sqlite.ts:95:    get(id: string) {
src/server/room/template-sqlite.ts:96:      const row = getStmt.get(id)
src/server/room/template-sqlite.ts:115:      const countRow = countStmt.get(params) as { count: number }
src/server/room/template-sqlite.ts:132:    findByQuestionSet(userId: string, questionSetId: string) {
src/server/room/template-sqlite.ts:133:      const row = getByQuestionSetStmt.get(userId, questionSetId)
src/server/room/template-sqlite.ts:137:      const existing = getStmt.get(id)
src/server/room/sqlite.ts:10:  get(id: string): Room | null
src/server/room/sqlite.ts:12:  list(params: {
src/server/room/sqlite.ts:130:      const row = getStmt.get(id) as any
src/server/room/sqlite.ts:140:          map.set(uid, choice)
src/server/room/sqlite.ts:142:        answers.set(Number(qIndex), map)
src/server/room/sqlite.ts:166:      const room = getStmt.get(id) as any
src/server/room/choice-orders.ts:24:  let questionOrders = orders.get(qIndex)
src/server/room/choice-orders.ts:27:    orders.set(qIndex, questionOrders)
src/server/room/choice-orders.ts:30:  const existing = questionOrders.get(memberId)
src/server/room/choice-orders.ts:36:  questionOrders.set(memberId, newOrder)
src/server/room/choice-orders.ts:61:      userMap.set(userId, arr)
src/server/room/choice-orders.ts:63:    orders.set(Number(qIndexKey), userMap)
src/server/room/template-sync.ts:25:export function syncRoomTemplateFromQuestionSet(options: SyncOptions): string {
src/server/room/template-sync.ts:28:  const existing = store.findByQuestionSet(userId, questionSet.id)
src/server/room/memory.ts:9:      rooms.set(room.id, room)
src/server/room/memory.ts:13:      return rooms.get(id) || null
src/server/room/memory.ts:17:      const room = rooms.get(id)
src/server/room/memory.ts:39:        arr.sort((a, b) => {
src/server/room/memory.ts:44:        arr.sort((a, b) => {
src/server/room/store.ts:75:async function loadQuestionsFromSet(setId: string): Promise<Question[]> {
src/server/room/store.ts:76:  const set = questionSetStore().get(setId)
src/server/room/store.ts:83:    const q = store.get(questionId)
src/server/room/store.ts:112:  const questions = await loadQuestionsFromSet(questionSetId)
src/server/room/store.ts:123:    questions, members: new Set([hostId]), answers: new Map(), analytics, choiceOrders,
src/server/room/store.ts:134:  const r = store.get(id)
src/server/room/store.ts:142:  const r = getRoomStore().get(id)
src/server/room/store.ts:157:      const existingOrder = r.choiceOrders.get(effectiveIndex)?.has(memberId)
src/server/room/store.ts:187:  const r = store.get(id)
src/server/room/store.ts:206:  const r = store.get(id)
src/server/room/store.ts:208:  if (!r.answers.has(qIndex)) r.answers.set(qIndex, new Map())
src/server/room/store.ts:209:  const answersForQuestion = r.answers.get(qIndex)!
src/server/room/store.ts:213:  const previousChoice = answersForQuestion.get(memberId)
src/server/room/store.ts:218:  answersForQuestion.set(memberId, choice)
src/server/room/store.ts:219:  r.answers.set(qIndex, answersForQuestion)
src/server/room/store.ts:245:  return getRoomStore().list(params)
src/server/user/sqlite.ts:55:      const row = getStmt.get(id) as any
src/server/user/sqlite.ts:70:      const row = getByEmailStmt.get(email) as any
src/server/user/sqlite.ts:85:      const row = getByProviderStmt.get(provider, providerId) as any
src/server/user/sqlite.ts:100:      const user = getStmt.get(id) as any
src/server/user/types.ts:14:  get(id: string): User | null
src/server/user/memory.ts:8:      users.set(user.id, user)
src/server/user/memory.ts:12:      return users.get(id) || null
src/server/user/memory.ts:30:      const user = users.get(id)
src/server/question/ai-usage.ts:27:  const m = String(now.getUTCMonth() + 1).padStart(2, '0')
src/server/question/ai-usage.ts:28:  const d = String(now.getUTCDate()).padStart(2, '0')
src/server/question/ai-usage.ts:34:  const existing = usageStore.get(key)
src/server/question/ai-usage.ts:39:  usageStore.set(key, fresh)
src/server/question/ai-usage.ts:56:export function getUsageSnapshot(key: string, isVip: boolean): UsageSnapshot {
```
