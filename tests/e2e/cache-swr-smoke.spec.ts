import { test, expect } from '@playwright/test'

test('SWR cache smoke on created', async ({ page }) => {
  await page.goto('/en/rooms/created?sort=updated&page=1&pageSize=20')
  await expect(page.locator('#created-controls')).toBeVisible()
  // quick back-and-forth to simulate repeated visits
  await page.goto('/en/rooms/joined')
  await page.goto('/en/rooms/created?sort=updated&page=1&pageSize=20')
  await expect(page.locator('#created-controls')).toBeVisible()
})


