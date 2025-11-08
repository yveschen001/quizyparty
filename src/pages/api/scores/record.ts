import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { scoreStore } from '../../../server/score'
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

  const { questionId, questionIndex, userChoice, correctAnswer, lang, roomId, timeSpentMs } = body

  if (!questionId || userChoice === undefined || correctAnswer === undefined) {
    return new Response(JSON.stringify({ error: 'missing required fields' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    const isCorrect = userChoice === correctAnswer
    scoreStore().record({
      id: crypto.randomUUID(),
      userId: user.id,
      roomId: roomId || 'unknown',
      questionId: String(questionId),
      questionIndex: Number(questionIndex) || 0,
      userChoice: String(userChoice),
      correctAnswer: String(correctAnswer),
      isCorrect: isCorrect,
      answeredAt: Date.now(),
      timeSpentMs: Math.max(0, Number(timeSpentMs) || 0),
      lang: String(lang || 'en'),
    })

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: 'failed to record score' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

