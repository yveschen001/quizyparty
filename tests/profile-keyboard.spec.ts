import { test, expect, Page } from '@playwright/test'
import { assertNoI18nFallback } from './utils'

async function mockApi(page: Page) {
  await page.addInitScript(() => {
    if ((window as any).__keyboardMockPatched) return
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
        id: 'keyboard-user',
        name: 'Keyboard Tester',
        email: 'keyboard@example.com',
        avatar: '',
      },
    }

    const templatesPayload = {
      templates: [
        {
          id: 'tpl-draft-1',
          title: 'Draft Keyboard Room',
          status: 'draft',
          questionSetId: 'qs-draft-1',
          updatedAt: Date.now(),
          questionSet: { questionCount: 12 },
        },
        {
          id: 'tpl-published-1',
          title: 'Published Keyboard Room',
          status: 'published',
          questionSetId: 'qs-pub-1',
          updatedAt: Date.now() - 3600_000,
          questionSet: { questionCount: 10 },
        },
      ],
      total: 2,
      limit: 20,
      offset: 0,
    }

    const leaderboardPayload = {
      leaderboard: [
        { userId: 'keyboard-user', score: 1234 },
        { userId: 'someone', score: 1000 },
      ],
    }

    window.fetch = (input: RequestInfo | URL, init?: RequestInit) => {
      const url = typeof input === 'string' ? input : input.url
      if (url.includes('/api/auth/me')) {
        return jsonResponse(userPayload)
      }
      if (url.includes('/api/room-templates')) {
        return jsonResponse(templatesPayload)
      }
      if (url.includes('/api/scores/stats')) {
        return jsonResponse({ totalAnswered: 5, totalCorrect: 4 })
      }
      if (url.includes('/api/scores/history')) {
        return jsonResponse({
          history: [
            { answeredAt: Date.now() - 1000, isCorrect: true, timeSpentMs: 4000 },
            { answeredAt: Date.now() - 2000, isCorrect: false, timeSpentMs: 5000 },
          ],
        })
      }
      if (url.includes('/api/scores/rooms')) {
        return jsonResponse({
          rooms: [
            {
              roomId: 'sample-room',
              roomTitle: 'Sample Room',
              totalAnswered: 7,
              accuracy: 0.7,
              lastAnsweredAt: Date.now() - 5000,
            },
          ],
        })
      }
      if (url.includes('/api/scores/leaderboard')) {
        return jsonResponse(leaderboardPayload)
      }
      if (url.includes('/api/rooms')) {
        return jsonResponse({})
      }
      if (url.includes('/api/rooms/' ) && init && init.method === 'DELETE') {
        return jsonResponse({})
      }
      return nativeFetch ? nativeFetch(input, init) : jsonResponse({})
    }

    ;(window as any).__keyboardMockPatched = true
  })
}

function documentActiveHref() {
  return document.activeElement && (document.activeElement as HTMLAnchorElement).getAttribute?.('href')
}

test.describe('Keyboard navigation accessibility', () => {
  test('profile to created drafts flow via keyboard', async ({ page }) => {
    await mockApi(page)
    await page.goto('/zh-hant/profile')
    await assertNoI18nFallback(page)

    // Focus the first interactive element and tab until "My Rooms" card is focused.
    await page.keyboard.press('Tab')
    for (let i = 0; i < 15; i += 1) {
      const href = await page.evaluate(documentActiveHref)
      if (href && href.endsWith('/rooms/created')) {
        break
      }
      await page.keyboard.press('Tab')
    }
    await expect(page.locator('a[href="/zh-hant/rooms/created"]')).toBeFocused()
    await page.keyboard.press('Enter')

    await page.waitForURL('**/zh-hant/rooms/created')
    await assertNoI18nFallback(page)

    // Move focus to tablist and switch to Drafts using arrow keys.
    await page.locator('#created-tab-published').focus()
    await expect(page.locator('#created-tab-published')).toBeFocused()
    await page.keyboard.press('ArrowRight')
    await expect(page.locator('#created-tab-draft')).toBeFocused()
    await expect(page.locator('#created-tab-draft')).toHaveAttribute('aria-selected', 'true')

    // Tab into the first room card action and activate edit via Enter.
    for (let i = 0; i < 10; i += 1) {
      await page.keyboard.press('Tab')
      const role = await page.evaluate(() => document.activeElement?.getAttribute?.('data-action'))
      if (role === 'edit') {
        break
      }
    }
    await expect(page.locator('[data-action="edit"]').first()).toBeFocused()
    await page.keyboard.press('Enter')
    await page.waitForURL('**/zh-hant/create-room**')

    // Navigate back using keyboard shortcut (Alt+Left / Option+Left).
    await page.keyboard.press(process.platform === 'darwin' ? 'Meta+[' : 'Alt+ArrowLeft')
    await page.waitForURL('**/zh-hant/rooms/created')
    await assertNoI18nFallback(page)
  })
})


