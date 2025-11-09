import { test, expect, Page } from '@playwright/test'

async function mockCreatedFailThenSuccess(page: Page) {
  await page.addInitScript(() => {
    const nativeFetch = window.fetch ? window.fetch.bind(window) : null
    let count = 0
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/room-templates')) {
        count++
        if (count === 1) {
          return Promise.resolve(new Response('fail', { status: 500 }))
        }
        return Promise.resolve(
          new Response(JSON.stringify({ templates: [], total: 0, limit: 0, offset: 0 }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        )
      }
      return nativeFetch ? nativeFetch(input, init) : Promise.resolve(new Response('{}'))
    }
  })
}

async function mockJoinedFailThenSuccess(page: Page) {
  await page.addInitScript(() => {
    const nativeFetch = window.fetch ? window.fetch.bind(window) : null
    let count = 0
    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/scores/rooms')) {
        count++
        if (count === 1) {
          return Promise.resolve(new Response('fail', { status: 500 }))
        }
        return Promise.resolve(
          new Response(JSON.stringify({ rooms: [] }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
          }),
        )
      }
      return nativeFetch ? nativeFetch(input, init) : Promise.resolve(new Response('{}'))
    }
  })
}

test.describe('Rooms error state', () => {
  test('created shows ErrorState then recovers on Retry', async ({ page }) => {
    await mockCreatedFailThenSuccess(page)
    await page.goto('/en/rooms/created')
    await expect(page.locator('[data-testid="error-state"]')).toBeVisible()
    await page.locator('#created-retry').click()
    // 之後錯誤區域應可關閉
    await expect(page.locator('[data-testid="error-state"]')).toBeHidden()
  })

  test('joined shows ErrorState then recovers on Retry', async ({ page }) => {
    await mockJoinedFailThenSuccess(page)
    await page.goto('/en/rooms/joined')
    await expect(page.locator('[data-testid="error-state"]')).toBeVisible()
    await page.locator('#joined-retry').click()
    await expect(page.locator('[data-testid="error-state"]')).toBeHidden()
  })
})


