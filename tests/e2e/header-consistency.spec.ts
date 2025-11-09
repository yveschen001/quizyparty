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
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }
    ;(window as any).__smokeFetchPatched = true
  })
}

test.describe('Header consistency @smoke', () => {
  test('profile has user menu trigger', async ({ page }) => {
    await mockApi(page)
    await page.goto('/zh-hant/profile')
    await assertNoI18nFallback(page)
    await expect(page.locator('#user-menu-trigger')).toBeVisible()
  })

  test('joined page has the same user menu trigger', async ({ page }) => {
    await mockApi(page)
    await page.goto('/zh-hant/rooms/joined')
    await assertNoI18nFallback(page)
    await expect(page.locator('#user-menu-trigger')).toBeVisible()
  })
})


