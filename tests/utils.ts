import { expect, Page } from '@playwright/test'

const RAW_KEY_REGEX = /\b[a-z][a-z0-9]*\.[\w.-]+\b/gi

export async function assertNoI18nFallback(page: Page) {
  const bodyText = await page.locator('body').innerText()

  if (bodyText.includes('🚧 ')) {
    throw new Error('Detected fallback marker "🚧 " in page content')
  }
  if (bodyText.includes('???')) {
    throw new Error('Detected placeholder "???" in page content')
  }

  const matches = bodyText.match(RAW_KEY_REGEX)
  if (matches) {
    throw new Error(`Detected raw i18n keys in page content: ${Array.from(new Set(matches)).join(', ')}`)
  }

  await expect(page.locator('body')).not.toContainText('🚧 ')
  await expect(page.locator('body')).not.toContainText('???')
}

