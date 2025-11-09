import { test, expect } from '@playwright/test'

test('zh-hant should not leak i18n keys', async ({ page }) => {
  await page.goto('/zh-hant/rooms/joined')
  await page.waitForTimeout(500)
  const bodyText = await page.locator('body').innerText()
  expect(bodyText).not.toContain('common.card.')
  expect(bodyText).not.toContain('common.controls.')
})


