import { test, expect, Page } from '@playwright/test'
import { assertNoI18nFallback } from '../utils'

async function mockApi(page: Page) {
  await page.addInitScript(() => {
    if ((window as any).__smokeFetchPatched) return
    const nativeFetch = window.fetch ? window.fetch.bind(window) : null
    const jsonResponse = (data: unknown, status = 200, headers?: Record<string, string>) =>
      Promise.resolve(
        new window.Response(JSON.stringify(data ?? {}), {
          status,
          headers: { 'Content-Type': 'application/json', ...(headers || {}) },
        }),
      )

    const userPayload = {
      authenticated: true,
      user: {
        id: 'smoke-user',
        name: 'Smoke Tester',
        email: 'smoke@example.com',
        avatar: '',
      },
    }

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      const method = init?.method?.toUpperCase() || 'GET'

      if (method === 'HEAD') {
        return Promise.resolve(new window.Response(null, { status: 200 }))
      }

      if (url.includes('/api/auth/me')) {
        return jsonResponse(userPayload)
      }
      if (url.includes('/api/room-templates')) {
        return jsonResponse({ templates: [], total: 0, limit: 0, offset: 0 })
      }
      if (url.includes('/api/scores/stats')) {
        return jsonResponse({ totalAnswered: 10, totalCorrect: 8 })
      }
      if (url.includes('/api/scores/history')) {
        return jsonResponse({ history: [] })
      }
      if (url.includes('/api/scores/rooms')) {
        const now = new Date().toISOString()
        return jsonResponse({
          rooms: [
            {
              roomId: 'sample-room',
              roomTitle: 'Accessibility Quiz',
              totalAnswered: 12,
              accuracy: 0.75,
              lastAnsweredAt: now,
            },
          ],
        })
      }
      if (url.includes('/api/scores/leaderboard')) {
        return jsonResponse({ leaderboard: [] })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }

    ;(window as any).__smokeFetchPatched = true
  })
}

test('Play again link is keyboard focusable @smoke', async ({ page }) => {
  await mockApi(page)
  await page.goto('/en/rooms/joined')
  await assertNoI18nFallback(page)

  const replayLink = page.getByRole('link', { name: /play again/i }).first()
  await expect(replayLink).toBeVisible()
  await replayLink.focus()
  await expect(replayLink).toBeFocused()
})

