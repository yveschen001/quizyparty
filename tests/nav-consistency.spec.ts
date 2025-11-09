import { test, expect, Page } from '@playwright/test'

const pagesToCheck = ['/zh-hant/profile', '/zh-hant/rooms/created', '/zh-hant/rooms/joined']
const expectedMenu = [
  '查看個人檔案',
  '我的房間',
  '我參與的答題',
  '關於',
  '隱私權條款',
  '使用者條款',
  '登出',
]

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
      if (url.includes('/api/scores')) {
        if (url.includes('/stats')) return jsonResponse({ totalAnswered: 0, totalCorrect: 0 })
        if (url.includes('/history')) return jsonResponse({ history: [] })
        if (url.includes('/rooms')) return jsonResponse({ rooms: [] })
        if (url.includes('/leaderboard')) return jsonResponse({ leaderboard: [] })
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }

    ;(window as any).__smokeFetchPatched = true
  })
}

test.describe('Avatar menu consistency', () => {
  for (const path of pagesToCheck) {
    test(`menu order & no raw keys on ${path} @smoke`, async ({ page }) => {
      await mockApi(page)
      await page.goto(path)

      const trigger = page.locator('#user-menu-trigger')
      await trigger.click()

      const menuItems = page.locator('#user-menu a, #user-menu button')
      await expect(menuItems).toHaveCount(expectedMenu.length)
      const texts = (await menuItems.allTextContents()).map((v) => v.trim())
      expect(texts).toEqual(expectedMenu)

      // assert there is no raw i18n key like profile.xxx.yyy
      const bodyText = await page.locator('body').innerText()
      const rawKeyMatch = bodyText.match(/\b[a-z]{2,}\.[a-z]{2,}\b/gi)
      if (rawKeyMatch) {
        throw new Error(`Detected potential i18n key leaking: ${rawKeyMatch.join(', ')}`)
      }
    })
  }
})

