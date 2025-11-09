import { test, expect } from '@playwright/test'

const langs = ['en', 'zh-hant']

for (const lang of langs) {
  test(`created controls visible & URL sync [${lang}]`, async ({ page }) => {
    await page.goto(`/${lang}/rooms/created`)
    await expect(page.locator('#created-controls')).toBeVisible()
    const selects = page.locator('#created-controls select')
    if ((await selects.count()) >= 2) {
      await selects.nth(1).selectOption('title')
      await expect(page).toHaveURL(new RegExp(`[?&]sort=title`))
    }
  })

  test(`joined controls visible [${lang}]`, async ({ page }) => {
    await page.goto(`/${lang}/rooms/joined`)
    await expect(page.locator('#joined-controls')).toBeVisible()
  })
}


