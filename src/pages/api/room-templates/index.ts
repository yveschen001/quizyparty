import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { roomTemplateStore, type RoomTemplateStatus, type RoomTemplate } from '../../../server/room/template-store'
import { buildDefaultRoomTitle } from '../../../server/room/template-sync'
import { questionSetStore } from '../../../server/question'

function serializeTemplate(template: RoomTemplate | null, includeSummary = false) {
  if (!template) return null
  const questionSets = questionSetStore()
  const set = questionSets.get(template.questionSetId)
  return {
    id: template.id,
    title: template.title,
    coverImage: template.coverImage,
    questionSetId: template.questionSetId,
    status: template.status,
    createdAt: template.createdAt,
    updatedAt: template.updatedAt,
    questionSet: includeSummary && set ? {
      id: set.id,
      title: set.title,
      questionCount: set.questionIds.length,
      status: set.status,
      updatedAt: set.updatedAt,
    } : undefined,
  }
}

export const GET: APIRoute = async ({ request, url }) => {
  const cookie = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookie)
  if (!user) {
    return new Response(JSON.stringify({ error: 'not authenticated' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const statusParam = (url.searchParams.get('status') || 'all') as RoomTemplateStatus | 'all'
  const limit = Math.min(Math.max(Number(url.searchParams.get('limit') || '10'), 1), 50)
  const offset = Math.max(Number(url.searchParams.get('offset') || '0'), 0)
  const store = roomTemplateStore()
  const { items, total } = store.listByUser(user.id, statusParam, { limit, offset })
  const payload = items
    .map((tpl) => serializeTemplate(tpl, true))
    .filter((tpl): tpl is NonNullable<ReturnType<typeof serializeTemplate>> => tpl !== null)

  return new Response(JSON.stringify({ templates: payload, total, limit, offset, status: statusParam }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

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

  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const questionSetId = typeof body.questionSetId === 'string' ? body.questionSetId.trim() : ''
  const desiredStatus: RoomTemplateStatus = body.status === 'published' ? 'published' : 'draft'

  if (!questionSetId) {
    return new Response(JSON.stringify({ error: 'questionSetId is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const qSetStore = questionSetStore()
  const questionSet = qSetStore.get(questionSetId)
  if (!questionSet || questionSet.userId !== user.id) {
    return new Response(JSON.stringify({ error: 'question set not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (desiredStatus === 'published' && questionSet.status !== 'published') {
    return new Response(JSON.stringify({ error: 'question set must be published before the room can be published' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const now = Date.now()
  const store = roomTemplateStore()
  const existing = store.findByQuestionSet(user.id, questionSetId)
  const status: RoomTemplateStatus = desiredStatus

  if (existing) {
    store.update(existing.id, {
      title: title || existing.title,
      status,
      questionSetId: questionSetId,
    })
    const updated = store.get(existing.id)
    return new Response(JSON.stringify({ template: serializeTemplate(updated, true) }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  }

  const fallbackTitle = buildDefaultRoomTitle(user.name)
  const normalizedTitle = title || questionSet.title || fallbackTitle

  const template: RoomTemplate = {
    id: questionSetId,
    userId: user.id,
    title: normalizedTitle,
    questionSetId,
    status,
    createdAt: now,
    updatedAt: now,
  }

  store.create(template)

  return new Response(JSON.stringify({ template: serializeTemplate(template, true) }), {
    status: 201,
    headers: { 'content-type': 'application/json' },
  })
}

