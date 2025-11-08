import type { APIRoute } from 'astro'

export const GET: APIRoute = () => {
  // Use process.env in API routes for compatibility with CommonJS module system
  const site = process.env.SITE || 'https://quizyparty.com'
  const sitemap = `${site.replace(/\/$/, '')}/sitemap-index.xml`
  return new Response(
    `User-agent: *\nAllow: /\nSitemap: ${sitemap}\n`,
    { headers: { 'Content-Type': 'text/plain; charset=utf-8' } }
  )
}
