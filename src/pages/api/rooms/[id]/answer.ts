import type { APIRoute } from 'astro'
export const prerender = false
import { submitAnswer, getRoomState } from '../../../../server/room/store'
import { getCurrentUser } from '../../../../lib/auth'
import { scoreStore, MAX_ANSWER_TIME_MS } from '../../../../server/score'
import crypto from 'node:crypto'

export const POST: APIRoute = async ({ params, request }) => {
  const id = String(params.id)
  const cookie = request.headers.get('cookie') ?? ''
  const uid = (/(?:^|;\s*)qp_uid=([^;]+)/.exec(cookie)?.[1]) || ''
  if (!uid) {
    return new Response(JSON.stringify({ error: 'missing uid' }), {
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
  const qIndex = Number(body?.index ?? 0)
  const choice = String(body?.choice ?? '')
  const timeSpentMsRaw = Number(body?.timeSpentMs ?? 0)
  const timeSpentMs = Math.max(0, Math.min(Number.isFinite(timeSpentMsRaw) ? timeSpentMsRaw : 0, MAX_ANSWER_TIME_MS))
  if (!choice) {
    return new Response(JSON.stringify({ error: 'choice is required' }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  // Get room state to check answer
  const roomState = getRoomState(id, uid)
  if (!roomState) {
    return new Response(JSON.stringify({ error: 'room not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

  // Submit answer
  const ok = submitAnswer(id, qIndex, uid, choice, timeSpentMs)
  if (!ok) {
    return new Response(JSON.stringify({ error: 'room not found' }), {
      status: 404,
      headers: { 'content-type': 'application/json' },
    })
  }

  // Record score if user is authenticated
  try {
    const user = await getCurrentUser(cookie)
    if (user) {
      const store = scoreStore()
      // Get full room to access questions with answers
      const roomStoreModule = await import('../../../../server/room/store')
      const fullRoom = roomStoreModule.getRoomStore().get(id)
      if (fullRoom && fullRoom.questions && fullRoom.questions[qIndex]) {
        const question = fullRoom.questions[qIndex]
        const correctAnswer = question.correctAnswer
        const isCorrect = choice === correctAnswer

        store.record({
          id: crypto.randomUUID(),
          userId: user.id,
          roomId: id,
          questionId: question.id || String(qIndex),
          questionIndex: qIndex,
          userChoice: choice,
          correctAnswer: correctAnswer,
          isCorrect: isCorrect,
          answeredAt: Date.now(),
          timeSpentMs,
          lang: roomState.lang,
        })
      }
    }
  } catch (e) {
    // Silently fail score recording - don't break the answer submission
    console.error('[Score recording]', e)
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: { 'content-type': 'application/json' },
  })
}


