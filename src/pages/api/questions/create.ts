import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { questionStore } from '../../../server/question'
import crypto from 'node:crypto'

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

  const { question, choices, correctAnswer, lang, category, keywords, setId, status, order, version } = body

  // 驗證必填字段
  if (!question || !choices || !Array.isArray(choices) || choices.length < 2) {
    return new Response(JSON.stringify({ error: 'question, choices (at least 2) are required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (!correctAnswer || !choices.includes(correctAnswer)) {
    return new Response(JSON.stringify({ error: 'correctAnswer must be one of the choices' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const now = Date.now()
  const questionId = crypto.randomUUID()

  try {
    questionStore().create({
      id: questionId,
      userId: user.id,
      setId: setId ? String(setId) : undefined,
      question: String(question),
      choices: choices.map(String),
      correctAnswer: String(correctAnswer),
      lang: String(lang || 'en'),
      category: category ? String(category) : undefined,
      keywords: keywords && Array.isArray(keywords) ? keywords.map(String) : undefined,
      status: status === 'published' || status === 'archived' ? status : 'draft',
      order: typeof order === 'number' ? order : undefined,
      version: typeof version === 'number' && version > 0 ? version : 1,
      publishedAt: status === 'published' ? now : undefined,
      archivedAt: status === 'archived' ? now : undefined,
      createdAt: now,
      updatedAt: now,
    })

    return new Response(JSON.stringify({ id: questionId }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    console.error('[Create Question]', e)
    return new Response(JSON.stringify({ error: 'failed to create question' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

