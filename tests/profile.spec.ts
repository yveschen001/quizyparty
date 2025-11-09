import { test, expect, Page } from '@playwright/test'

async function mockApi(page: Page) {
  await page.addInitScript(() => {
    if ((window as any).__smokeFetchPatched) return
    const nativeFetch = window.fetch ? window.fetch.bind(window) : null
    const jsonResponse = (data: unknown) =>
      Promise.resolve(
        new window.Response(JSON.stringify(data ?? {}), {
          status: 200,
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

test.describe('Profile smoke', () => {
  test('stats render and language toggle @smoke', async ({ page }) => {
    await mockApi(page)
    await page.goto('/zh-hant/profile')

    await expect(page.locator('[data-stat-card]')).toHaveCount(4)

    await page.click('#open-settings')
    await expect(page.locator('#settings-modal')).toBeVisible()
    await page.selectOption('#settings-lang', 'en')
    await page.click('#settings-save')
    await page.waitForURL(/\/en\/profile/)
    await expect(page).toHaveURL(/\/en\/profile/)

    await page.reload()
    await expect(page).toHaveURL(/\/en\/profile/)
  })
})

