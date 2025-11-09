import { test, expect } from '@playwright/test'

const langs = ['en', 'zh-hant']

for (const lang of langs) {
  test(`joined uses shared room-card template when data exists [${lang}]`, async ({ page }) => {
    await page.goto(`/${lang}/rooms/joined`)
    const cards = page.locator('[data-testid="room-card"]')
    const count = await cards.count()
    if (count === 0) test.skip(true, 'No data -> skip')
    await expect(cards.first()).toBeVisible()
  })
}


