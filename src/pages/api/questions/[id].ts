import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { questionStore } from '../../../server/question'

export const PUT: APIRoute = async ({ params, request }) => {
  const cookie = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookie)

  if (!user) {
    return new Response(JSON.stringify({ error: 'not authenticated' }), {
      status: 401,
      headers: { 'content-type': 'application/json' },
    })
  }

  const id = String(params.id || '')
  if (!id) {
    return new Response(JSON.stringify({ error: 'question id is required' }), {
      status: 400,
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

  const store = questionStore()
  const question = store.get(id)
  if (!question || question.userId !== user.id) {
    return new Response(JSON.stringify({ error: 'not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

  const updates: any = {}
  if (typeof body.question === 'string') updates.question = body.question.trim()
  if (Array.isArray(body.choices)) updates.choices = body.choices.map(String)
  if (typeof body.correctAnswer === 'string') updates.correctAnswer = body.correctAnswer.trim()
  if (typeof body.lang === 'string') updates.lang = body.lang.trim()
  if (Array.isArray(body.keywords)) updates.keywords = body.keywords.map(String)
  if (typeof body.category === 'string') updates.category = body.category.trim()

  store.update(id, updates)

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}

