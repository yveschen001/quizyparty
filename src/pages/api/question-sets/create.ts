import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { questionSetStore, questionStore } from '../../../server/question'
import { syncRoomTemplateFromQuestionSet } from '../../../server/room/template-sync'
import type { QuestionSetStatus } from '../../../server/question'
import crypto from 'node:crypto'

const ALLOWED_COUNTS = [10, 20, 30, 40, 50, 60]

export const POST: APIRoute = async ({ request }) => {
  const cookie = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookie)

  if (!user) {
    return new Response(JSON.stringify({ error: 'not authenticated' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  let body: any = {}
  try {
    body = await request.json()
  } catch (e) {
    return new Response(JSON.stringify({ error: 'invalid request body' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const { title, lang, questionIds, status, expectedCount, description, tags, draftParentId } = body

  if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
    return new Response(JSON.stringify({ error: 'questionIds (array) with at least one question is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  // 驗證所有題目是否存在
  const store = questionStore()
  const validQuestionIds: string[] = []
  for (const qId of questionIds) {
    const q = store.get(String(qId))
    if (!q) {
      continue
    }
    if (q.userId !== user.id) {
      return new Response(JSON.stringify({ error: 'question not owned by user' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      })
    }
    validQuestionIds.push(q.id)
  }

  if (validQuestionIds.length === 0) {
    return new Response(JSON.stringify({ error: 'no valid questions found' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const now = Date.now()
  const setId = crypto.randomUUID()
  const normalizedStatus: QuestionSetStatus = status === 'draft' || status === 'published' || status === 'archived' ? status : 'draft'
  const normalizedTags = Array.isArray(tags) ? tags.map(String) : undefined
  let targetCount: number | undefined = undefined
  if (typeof expectedCount === 'number' && ALLOWED_COUNTS.indexOf(expectedCount) >= 0) {
    targetCount = expectedCount
  }
  if (!targetCount) {
    targetCount = ALLOWED_COUNTS[0]
  }
  const progressCount = validQuestionIds.length

  if (normalizedStatus === 'published' && progressCount !== targetCount) {
    return new Response(JSON.stringify({ error: 'question count does not match expected count' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    questionSetStore().create({
      id: setId,
      userId: user.id,
      title: title ? String(title) : undefined,
      lang: String(lang || 'en'),
      questionIds: validQuestionIds,
      status: normalizedStatus,
      expectedQuestionCount: targetCount,
      description: description ? String(description) : undefined,
      tags: normalizedTags,
      version: 1,
      draftParentId: draftParentId ? String(draftParentId) : undefined,
      publishedAt: normalizedStatus === 'published' ? now : undefined,
      archivedAt: normalizedStatus === 'archived' ? now : undefined,
      progressQuestionCount: progressCount,
      createdAt: now,
      updatedAt: now,
    })

    // 將題目關聯至題目集
    const setStatusForQuestions = normalizedStatus === 'published' ? 'published' : 'draft'
    validQuestionIds.forEach((id) => {
      store.update(id, {
        setId,
        status: setStatusForQuestions,
      })
    })

    const createdSet = questionSetStore().get(setId)
    if (createdSet) {
      syncRoomTemplateFromQuestionSet({
        userId: user.id,
        userName: user.name,
        questionSet: createdSet,
      })
    }

    return new Response(JSON.stringify({ id: setId }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    console.error('[Create Question Set]', e)
    return new Response(JSON.stringify({ error: 'failed to create question set' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

