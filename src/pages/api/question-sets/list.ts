import type { APIRoute } from 'astro'
export const prerender = false
import { config } from 'dotenv'
import { resolve } from 'path'
import { getCurrentUser } from '../../../lib/auth'
import { questionSetStore } from '../../../server/question'

// 确保环境变量已加载
if (typeof process !== 'undefined' && process.env) {
  try {
    config({ path: resolve(process.cwd(), '.env') })
  } catch {}
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    const cookie = request.headers.get('cookie') || ''
    const user = await getCurrentUser(cookie)

    if (!user) {
      return new Response(JSON.stringify({ error: 'not authenticated' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }

    const userId = url.searchParams.get('userId') || user.id
    // 目前只允許查看自己的題目集，未來可以擴展為公開題目集
    if (userId !== user.id) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      })
    }

    const limit = Math.min(Number(url.searchParams.get('limit') || 50), 100)
    const offset = Math.max(Number(url.searchParams.get('offset') || 0), 0)

    const store = questionSetStore()
    const sets = store.getByUser(userId, limit, offset)
    return new Response(JSON.stringify({ sets, limit, offset }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    console.error('[API] /api/question-sets/list error:', e)
    return new Response(JSON.stringify({ error: 'failed to list question sets', details: e instanceof Error ? e.message : String(e) }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

