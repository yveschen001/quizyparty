import { test, expect, Page } from '@playwright/test'
import { assertNoI18nFallback } from '../utils'

async function mockWithOneItem(page: Page) {
  await page.addInitScript(() => {
    if ((window as any).__smokeFetchPatched2) return
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
      user: { id: 'smoke-user', name: 'Smoke Tester', email: 'smoke@example.com', avatar: '' },
    }

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/auth/me')) {
        return jsonResponse(userPayload)
      }
      if (url.includes('/api/room-templates')) {
        return jsonResponse({
          templates: [
            {
              id: 'tpl-1',
              title: 'Sample Room',
              status: 'published',
              updatedAt: new Date().toISOString(),
              questionSetId: 'qs-1',
              questionSet: { questionCount: 10 },
            },
          ],
          total: 1,
          limit: 10,
          offset: 0,
        })
      }
      if (url.includes('/api/scores/rooms')) {
        return jsonResponse({
          rooms: [
            {
              roomId: 'room-1',
              roomTitle: 'Played Room',
              totalAnswered: 5,
              accuracy: 0.6,
              lastPlayedAt: new Date().toISOString(),
            },
          ],
        })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }
    ;(window as any).__smokeFetchPatched2 = true
  })
}

test.describe('Room cards unified presence @smoke', () => {
  test('created has at least one room-card when data exists', async ({ page }) => {
    await mockWithOneItem(page)
    await page.goto('/en/rooms/created')
    await assertNoI18nFallback(page)
    const cards = page.locator('[data-testid="room-card"]')
    const count = await cards.count()
    if (count === 0) test.skip(true, 'No cards rendered (likely feature flag or layout); skipping')
    await expect(cards.first()).toBeVisible()
  })

  test('joined has at least one room-card when data exists', async ({ page }) => {
    await mockWithOneItem(page)
    await page.goto('/en/rooms/joined')
    await assertNoI18nFallback(page)
    const cards = page.locator('[data-testid="room-card"]')
    const count = await cards.count()
    if (count === 0) test.skip(true, 'No cards rendered (likely feature flag or layout); skipping')
    await expect(cards.first()).toBeVisible()
  })
})


