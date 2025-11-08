import type { APIRoute } from 'astro'
export const prerender = false
import { config } from 'dotenv'
import { resolve } from 'path'
import { getCurrentUser } from '../../../lib/auth'
import { questionStore } from '../../../server/question'
import type { Question } from '../../../server/question'

// 确保环境变量已加载
if (typeof process !== 'undefined' && process.env) {
  try {
    config({ path: resolve(process.cwd(), '.env') })
    // 也尝试加载 .env.local
    try {
      config({ path: resolve(process.cwd(), '.env.local') })
    } catch {}
  } catch {}
}

export const GET: APIRoute = async ({ request, url }) => {
  try {
    console.log('[API] /api/questions/list - Starting request')
    const cookie = request.headers.get('cookie') || ''
    console.log('[API] Cookie received:', cookie ? 'Yes' : 'No')
    
    let user
    try {
      user = await getCurrentUser(cookie)
      console.log('[API] User:', user ? `ID: ${user.id}` : 'null')
    } catch (authError) {
      console.error('[API] getCurrentUser failed:', authError)
      throw authError
    }

    if (!user) {
      console.log('[API] User not authenticated, returning 401')
      return new Response(JSON.stringify({ error: 'not authenticated' }), {
        status: 401,
        headers: { 'content-type': 'application/json' },
      })
    }

    const userId = url.searchParams.get('userId') || user.id
    // 目前只允許查看自己的題目，未來可以擴展為公開題目
    if (userId !== user.id) {
      return new Response(JSON.stringify({ error: 'forbidden' }), {
        status: 403,
        headers: { 'content-type': 'application/json' },
      })
    }

    const limit = Math.min(Number(url.searchParams.get('limit') || 50), 100)
    const offset = Math.max(Number(url.searchParams.get('offset') || 0), 0)
    const search = (url.searchParams.get('q') || '').toLowerCase().trim()

    // 初始化 store
    console.log('[API] Initializing questionStore...')
    console.log('[API] QP_SQLITE_PATH:', process.env.QP_SQLITE_PATH || 'not set (using memory store)')
    let store
    try {
      store = questionStore()
      console.log('[API] questionStore initialized successfully')
    } catch (storeError) {
      console.error('[API] Failed to initialize questionStore:', storeError)
      console.error('[API] Store error stack:', storeError instanceof Error ? storeError.stack : 'No stack')
      throw new Error(`Failed to initialize question store: ${storeError instanceof Error ? storeError.message : String(storeError)}`)
    }

    // 获取题目列表
    console.log('[API] Querying questions for userId:', userId, 'limit:', limit, 'offset:', offset)
    let questions: Question[]
    let total: number | null = null
    let hasMore = false
    try {
      if (search) {
        const raw = store.getByUser(userId, 1000, 0)
        const filtered = raw.filter((q) => {
          const text = [q.question, ...(q.choices || []), ...(q.keywords || [])].join(' ').toLowerCase()
          return text.indexOf(search) >= 0
        })
        total = filtered.length
        questions = filtered.slice(offset, offset + limit)
        hasMore = offset + questions.length < total
      } else {
        questions = store.getByUser(userId, limit, offset)
        hasMore = questions.length === limit
      }
      console.log('[API] Found', questions.length, 'questions (hasMore:', hasMore, ')')
    } catch (queryError) {
      console.error('[API] Failed to query questions:', queryError)
      console.error('[API] Query error stack:', queryError instanceof Error ? queryError.stack : 'No stack')
      throw new Error(`Failed to query questions: ${queryError instanceof Error ? queryError.message : String(queryError)}`)
    }

    // 返回時不包含正確答案（安全考慮）
    const safeQuestions = questions.map(q => ({
      id: q.id,
      question: q.question,
      choices: q.choices,
      lang: q.lang,
      category: q.category,
      keywords: q.keywords,
      createdAt: q.createdAt,
    }))
    return new Response(JSON.stringify({ questions: safeQuestions, limit, offset, total, hasMore }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    console.error('[API] /api/questions/list error:', e)
    const errorMessage = e instanceof Error ? e.message : String(e)
    const errorStack = e instanceof Error ? e.stack : undefined
    console.error('[API] Error stack:', errorStack)
    return new Response(JSON.stringify({ 
      error: 'failed to list questions', 
      details: errorMessage 
    }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

