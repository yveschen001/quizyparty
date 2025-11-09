# missing-i18n-zh-hant

- 更新時間：2025-11-09 03:43:11.040 UTC
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
src/server/room/template-memory.ts:13:      templates.set(template.id, template)
src/server/room/template-memory.ts:15:    get(id: string) {
src/server/room/template-memory.ts:16:      return templates.get(id) || null
src/server/room/template-memory.ts:31:        .sort((a, b) => b.createdAt - a.createdAt)
src/server/room/template-memory.ts:35:    findByQuestionSet(userId: string, questionSetId: string) {
src/server/room/template-memory.ts:44:      const tpl = templates.get(id)
src/server/room/template-memory.ts:46:      templates.set(id, { ...tpl, ...updates, updatedAt: Date.now() })
src/server/room/analytics.ts:84:    leaderboardMap.set(entry.userId, {
src/server/room/analytics.ts:99:      perQuestionMap.set(index, {
src/server/room/analytics.ts:110:    const existing = perQuestionMap.get(index)
src/server/room/analytics.ts:125:    uniqueResponders: new Set(serialized.uniqueResponders || []),
src/server/room/analytics.ts:152:    .sort((a, b) => {
src/server/room/analytics.ts:211:  const entry = leaderboard.get(memberId) || {
src/server/room/analytics.ts:244:  leaderboard.set(memberId, entry)
src/server/room/template.ts:21:  get(id: string): RoomTemplate | null
src/server/room/template.ts:28:  findByQuestionSet(userId: string, questionSetId: string): RoomTemplate | null
src/server/room/template-sqlite.ts:102:    get(id: string) {
src/server/room/template-sqlite.ts:103:      const row = getStmt.get(id)
src/server/room/template-sqlite.ts:130:      const countRow = countStmt.get(params) as { count: number }
src/server/room/template-sqlite.ts:149:    findByQuestionSet(userId: string, questionSetId: string) {
src/server/room/template-sqlite.ts:150:      const row = getByQuestionSetStmt.get(userId, questionSetId)
src/server/room/template-sqlite.ts:154:      const existing = getStmt.get(id)
src/server/room/sqlite.ts:10:  get(id: string): Room | null
src/server/room/sqlite.ts:12:  list(params: {
src/server/room/sqlite.ts:130:      const row = getStmt.get(id) as any
src/server/room/sqlite.ts:143:          map.set(uid, choice)
src/server/room/sqlite.ts:145:        answers.set(Number(qIndex), map)
src/server/room/sqlite.ts:173:      const room = getStmt.get(id) as any
src/server/room/choice-orders.ts:24:  let questionOrders = orders.get(qIndex)
src/server/room/choice-orders.ts:27:    orders.set(qIndex, questionOrders)
src/server/room/choice-orders.ts:30:  const existing = questionOrders.get(memberId)
src/server/room/choice-orders.ts:36:  questionOrders.set(memberId, newOrder)
src/server/room/choice-orders.ts:63:      userMap.set(userId, arr)
src/server/room/choice-orders.ts:65:    orders.set(Number(qIndexKey), userMap)
src/server/room/template-sync.ts:25:export function syncRoomTemplateFromQuestionSet(options: SyncOptions): string {
src/server/room/template-sync.ts:28:  const existing = store.findByQuestionSet(userId, questionSet.id)
src/server/room/memory.ts:9:      rooms.set(room.id, room)
src/server/room/memory.ts:13:      return rooms.get(id) || null
src/server/room/memory.ts:17:      const room = rooms.get(id)
src/server/room/memory.ts:46:        arr.sort((a, b) => {
src/server/room/memory.ts:51:        arr.sort((a, b) => {
src/server/room/store.ts:71:async function loadQuestionsFromSet(setId: string): Promise<Question[]> {
src/server/room/store.ts:72:  const set = questionSetStore().get(setId)
src/server/room/store.ts:79:    const q = store.get(questionId)
src/server/room/store.ts:114:  const questions = await loadQuestionsFromSet(questionSetId)
src/server/room/store.ts:130:    members: new Set([hostId]),
src/server/room/store.ts:144:  const r = store.get(id)
src/server/room/store.ts:152:  const r = getRoomStore().get(id)
src/server/room/store.ts:167:      const existingOrder = r.choiceOrders.get(effectiveIndex)?.has(memberId)
src/server/room/store.ts:197:  const r = store.get(id)
src/server/room/store.ts:222:  const r = store.get(id)
src/server/room/store.ts:224:  if (!r.answers.has(qIndex)) r.answers.set(qIndex, new Map())
src/server/room/store.ts:225:  const answersForQuestion = r.answers.get(qIndex)!
src/server/room/store.ts:229:  const previousChoice = answersForQuestion.get(memberId)
src/server/room/store.ts:234:  answersForQuestion.set(memberId, choice)
src/server/room/store.ts:235:  r.answers.set(qIndex, answersForQuestion)
src/server/room/store.ts:261:  return getRoomStore().list(params)
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
