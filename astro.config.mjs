import { defineConfig } from 'astro/config'
import vercel from '@astrojs/vercel/serverless'
import sitemap from '@astrojs/sitemap'

export default defineConfig({
  site: process.env.SITE ?? 'https://quizyparty.com',
  adapter: vercel(),
  integrations: [
    sitemap({
      // 多語站可視情況開啟 i18n 選項
      // i18n: { defaultLocale: 'zh-hant', locales: { 'zh-hant':'zh-hant','zh-hans':'zh-hans','ja':'ja','en':'en','ko':'ko','de':'de','fr':'fr' } }
    })
  ]
})
