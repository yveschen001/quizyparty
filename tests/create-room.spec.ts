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
      user: { id: 'smoke-user', name: 'Smoke Tester', email: 'smoke@example.com', avatar: '' },
    }

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/auth/me')) return jsonResponse(userPayload)
      if (url.includes('/api/room-templates')) {
        return jsonResponse({ templates: [], total: 0, limit: 0, offset: 0 })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }

    ;(window as any).__smokeFetchPatched = true
  })
}

test.describe('Create room smoke', () => {
  test('legacy Your Rooms section stays hidden @smoke', async ({ page }) => {
    await mockApi(page)
    await page.goto('/zh-hant/create-room')
    await expect(page.locator('text="Your Rooms"')).toHaveCount(0)
  })
})

