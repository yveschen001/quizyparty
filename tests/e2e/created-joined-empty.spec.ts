import { test, expect, Page } from '@playwright/test'
import { assertNoI18nFallback } from '../utils'

async function mockApi(page: Page) {
  await page.addInitScript(() => {
    if ((window as any).__smokeFetchPatched) return
    const nativeFetch = window.fetch ? window.fetch.bind(window) : null
    const jsonResponse = (data: unknown, status = 200) =>
      Promise.resolve(
        new window.Response(JSON.stringify(data ?? {}), {
          status,
          headers: { 'Content-Type': 'application/json' },
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
      if (url.includes('/api/auth/me')) {
        return jsonResponse(userPayload)
      }
      if (url.includes('/api/room-templates')) {
        return jsonResponse({ templates: [], total: 0, limit: 0, offset: 0 })
      }
      if (url.includes('/api/scores/stats')) {
        return jsonResponse({ totalAnswered: 0, totalCorrect: 0 })
      }
      if (url.includes('/api/scores/history')) {
        return jsonResponse({ history: [] })
      }
      if (url.includes('/api/scores/rooms')) {
        return jsonResponse({ rooms: [] })
      }
      if (url.includes('/api/scores/leaderboard')) {
        return jsonResponse({ leaderboard: [] })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }

    ;(window as any).__smokeFetchPatched = true
  })
}

test('Rooms created/joined show empty states @smoke', async ({ page }) => {
  await mockApi(page)

  await page.goto('/en/profile')
  await assertNoI18nFallback(page)

  await page.getByRole('link', { name: /rooms i created/i }).click()
  await expect(page).toHaveURL(/\/en\/rooms\/created/)
  await assertNoI18nFallback(page)
  await expect(page.locator('#created-message')).toContainText(/no rooms|empty|create/i, {
    timeout: 5000,
  })

  await page.goto('/en/profile')
  await page.getByRole('link', { name: /rooms i joined/i }).click()
  await expect(page).toHaveURL(/\/en\/rooms\/joined/)
  await assertNoI18nFallback(page)
  await expect(page.locator('#message')).toContainText(/no participation|empty|join/i, {
    timeout: 5000,
  })
})

