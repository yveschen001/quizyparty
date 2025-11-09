import { test, expect } from '@playwright/test'

test.describe('Profile stats', () => {
  test('all/30d range toggle syncs URL and updates tabs', async ({ page }) => {
    await page.goto('/en/profile?range=all')
    await expect(page.locator('#scope-all')).toHaveAttribute('aria-selected', 'true')
    await page.click('#scope-30d')
    await expect(page).toHaveURL(/range=30d/)
    await expect(page.locator('#scope-30d')).toHaveAttribute('aria-selected', 'true')
    // 百分比文字格式存在（不強制數值）
    const acc = page.locator('#stats-accuracy')
    await expect(acc).toBeVisible()
    await expect(acc).toContainText('%')
  })
})


