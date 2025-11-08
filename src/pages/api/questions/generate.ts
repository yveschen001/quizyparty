import type { APIRoute } from 'astro'
export const prerender = false
import { getCurrentUser } from '../../../lib/auth'
import { questionStore } from '../../../server/question'
import { canUseGenerate, getUsageSnapshot, recordGenerateUsage, NON_VIP_MAX_GENERATE_COUNT, VIP_MAX_GENERATE_COUNT } from '../../../server/question/ai-usage'
import { getUsageKey, isVipFromCookie, resolveLanguageDisplay } from '../../../server/question/ai-shared'
import crypto from 'node:crypto'

// 後台必需關鍵詞（會自動添加到所有AI生成的題目）
const REQUIRED_KEYWORDS = ['#quiz', '#learning', '#trivia']

const OPENAI_MODEL = 'gpt-4o-mini'

const QUESTION_TEMPLATE = `You are an educational quiz generator.

Create {count} multiple-choice questions in {lang}.
Focus on this topic description: {topic}

Rules:
- Each question must include exactly four concise answer choices.
- Provide the single correct answer text as it appears in the choices.
- Add a "keywords" array (3-5 items) with short hashtags (e.g. "#science"). No spaces inside hashtags.
- Avoid repeating similar questions. Keep tone friendly and informative.

Return a JSON array only. Each item must follow this schema:
{
  "id": "question-1",
  "question": "...",
  "choices": ["...", "...", "...", "..."],
  "answer": "...",
  "keywords": ["#tag1", "#tag2", "#tag3"]
}`

const ALLOWED_COUNTS = [10, 20, 30, 40, 50, 60]

function toHashtag(value: string): string | null {
  const trimmed = value.trim()
  if (!trimmed) return null
  const noSpace = trimmed.replace(/\s+/g, '')
  if (!noSpace) return null
  return noSpace.startsWith('#') ? noSpace : `#${noSpace}`
}

function uniqueStrings(values: string[]): string[] {
  const seen = new Set<string>()
  const result: string[] = []
  for (const value of values) {
    if (!value) continue
    if (seen.has(value)) continue
    seen.add(value)
    result.push(value)
  }
  return result
}

export const POST: APIRoute = async ({ request }) => {
  const cookieHeader = request.headers.get('cookie') || ''
  const user = await getCurrentUser(cookieHeader)

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

  const usageKey = getUsageKey(user.id, cookieHeader)
  const isVip = isVipFromCookie(cookieHeader)
  const usageSnapshot = getUsageSnapshot(usageKey, isVip)

  const rawTopic: unknown = body.prompt ?? body.topic ?? body.keywords
  const topic = typeof rawTopic === 'string' ? rawTopic.trim() : ''
  const targetLangRaw: unknown = body.targetLang ?? body.lang
  const targetLang = typeof targetLangRaw === 'string' ? targetLangRaw : 'en'
  const requestedCountRaw = Number(body.count ?? 10)
  const generatedSetId = body.setId ? String(body.setId) : undefined
  const baseOrder = typeof body.orderStart === 'number' ? Number(body.orderStart) : undefined

  if (topic.length < 12) {
    return new Response(JSON.stringify({ error: 'prompt_too_short', limits: usageSnapshot }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (!Number.isFinite(requestedCountRaw) || requestedCountRaw <= 0) {
    return new Response(JSON.stringify({ error: 'invalid_count', limits: usageSnapshot, allowedCounts: ALLOWED_COUNTS }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  if (!ALLOWED_COUNTS.includes(requestedCountRaw)) {
    return new Response(JSON.stringify({ error: 'unsupported_count', limits: usageSnapshot, allowedCounts: ALLOWED_COUNTS }), {
      status: 400,
      headers: { 'content-type': 'application/json' },
    })
  }

  const maxCount = isVip ? VIP_MAX_GENERATE_COUNT : NON_VIP_MAX_GENERATE_COUNT
  if (requestedCountRaw > maxCount) {
    return new Response(
      JSON.stringify({ error: 'count_exceeds_limit', max: maxCount, limits: usageSnapshot }),
      {
        status: 400,
        headers: { 'content-type': 'application/json' },
      }
    )
  }

  if (!canUseGenerate(usageKey, isVip)) {
    return new Response(JSON.stringify({ error: 'quota_exceeded', limits: usageSnapshot }), {
      status: 429,
      headers: { 'content-type': 'application/json' },
    })
  }

  const questionLang = typeof targetLang === 'string' ? targetLang.toLowerCase() : 'en'
  const languageDisplay = resolveLanguageDisplay(questionLang)
  const requestedCount = requestedCountRaw

  // 檢查 OpenAI API Key
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY
  if (!OPENAI_API_KEY) {
    return new Response(JSON.stringify({ error: 'OpenAI API key not configured' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    // 調用 OpenAI API 生成題目
    const prompt = QUESTION_TEMPLATE
      .replace('{count}', String(requestedCount))
      .replace('{lang}', languageDisplay)
      .replace('{topic}', topic)

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: OPENAI_MODEL,
        messages: [
          {
            role: 'system',
            content: 'You are a quiz question generator. Always return valid JSON arrays only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'OpenAI API error' }))
      return new Response(JSON.stringify({ error: 'failed to generate questions', details: error }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || '[]'
    
    // 解析 AI 返回的 JSON
    let generatedQuestions: any[] = []
    try {
      // 嘗試清理可能的 markdown 代碼塊
      const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim()
      generatedQuestions = JSON.parse(cleaned)
    } catch (e) {
      console.error('[AI Generate] Failed to parse response:', e, content)
      return new Response(JSON.stringify({ error: 'failed to parse generated questions' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    if (!Array.isArray(generatedQuestions)) {
      return new Response(JSON.stringify({ error: 'generated questions must be an array' }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    // 保存生成的題目
    const now = Date.now()
    const questionIds: string[] = []
    const createdQuestions: Array<{ id: string; question: string; choices: string[]; correctAnswer: string; keywords: string[] }> = []

    for (const q of generatedQuestions) {
      if (!q || !q.question || !q.choices || !q.answer) continue

      const questionId = crypto.randomUUID()
      const questionText = String(q.question)
      const rawChoices = Array.isArray(q.choices) ? q.choices.map((choice: any) => String(choice)) : []
      const filteredChoices = rawChoices.filter((choice) => choice.trim().length > 0)
      const limitedChoices = filteredChoices.slice(0, 4)
      if (limitedChoices.length < 2) {
        continue
      }
      const answerRaw = String(q.answer)
      const correctAnswer = limitedChoices.indexOf(answerRaw) >= 0 ? answerRaw : limitedChoices[0]
      const aiKeywordsRaw = Array.isArray(q.keywords) ? q.keywords.map((kw: any) => String(kw)) : []
      const normalisedKeywords = aiKeywordsRaw
        .map((kw) => toHashtag(kw) || '')
        .filter((kw) => kw.length > 1)
      const mergedKeywords = uniqueStrings([...normalisedKeywords, ...REQUIRED_KEYWORDS])

      questionStore().create({
        id: questionId,
        userId: user.id,
        setId: generatedSetId,
        question: questionText,
        choices: limitedChoices,
        correctAnswer,
        lang: questionLang,
        category: 'ai-generated',
        keywords: mergedKeywords,
        status: 'draft',
        order: typeof baseOrder === 'number' ? baseOrder + questionIds.length : undefined,
        version: 1,
        createdAt: now,
        updatedAt: now,
      })

      questionIds.push(questionId)
      createdQuestions.push({
        id: questionId,
        question: questionText,
        choices: limitedChoices,
        correctAnswer,
        keywords: mergedKeywords,
      })
    }

    if (questionIds.length === 0) {
      return new Response(JSON.stringify({ error: 'empty_generation', limits: usageSnapshot }), {
        status: 500,
        headers: { 'content-type': 'application/json' },
      })
    }

    const updatedLimits = recordGenerateUsage(usageKey, isVip)

    return new Response(JSON.stringify({ questionIds, count: questionIds.length, questions: createdQuestions, limits: updatedLimits }), {
      status: 200,
      headers: { 'content-type': 'application/json' },
    })
  } catch (e) {
    console.error('[AI Generate]', e)
    return new Response(JSON.stringify({ error: 'failed to generate questions' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

