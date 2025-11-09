import { test, expect } from '@playwright/test'

const langs = ['en', 'zh-hant']

for (const lang of langs) {
  test(`created pagination visible & url sync [${lang}]`, async ({ page }) => {
    await page.goto(`/${lang}/rooms/created`)
    const pager = page.locator('#created-pager-top [data-testid="pagination"]')
    if ((await pager.count()) === 0) test.skip()
    await expect(pager.first()).toBeVisible()
    const sizeSel = page.locator('#created-pager-top select').first()
    await sizeSel.selectOption('30')
    await expect(page).toHaveURL(new RegExp(`[?&]pageSize=30`))
  })

  test(`filters keyboard a11y [${lang}]`, async ({ page }) => {
    await page.goto(`/${lang}/rooms/created`)
    const selects = page.locator('#created-controls select')
    if ((await selects.count()) < 2) test.skip()
    await selects.nth(1).focus()
    await page.keyboard.press('ArrowDown')
    await page.keyboard.press('Enter')
    await expect(page).toHaveURL(new RegExp(`[?&]sort=`))
  })
}


