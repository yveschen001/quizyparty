import { test, expect, Page } from '@playwright/test'
import { assertNoI18nFallback } from '../utils'

async function mockEmptyApi(page: Page) {
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
      user: { id: 'smoke-user', name: 'Smoke Tester', email: 'smoke@example.com', avatar: '' },
    }

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/auth/me')) {
        return jsonResponse(userPayload)
      }
      if (url.includes('/api/room-templates')) {
        // created: empty templates
        return jsonResponse({ templates: [], total: 0, limit: 0, offset: 0 })
      }
      if (url.includes('/api/scores/rooms')) {
        // joined: empty
        return jsonResponse({ rooms: [] })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }
    ;(window as any).__smokeFetchPatched = true
  })
}

test.describe('Rooms empty/loading states @smoke', () => {
  test('created empty shows empty-state', async ({ page }) => {
    await mockEmptyApi(page)
    await page.goto('/en/rooms/created')
    await assertNoI18nFallback(page)
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible()
  })

  test('joined empty shows empty-state', async ({ page }) => {
    await mockEmptyApi(page)
    await page.goto('/en/rooms/joined')
    await assertNoI18nFallback(page)
    await expect(page.locator('[data-testid="empty-state"]')).toBeVisible()
  })
})


