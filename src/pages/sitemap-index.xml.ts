export function GET({ site }: { site: URL }) {
  const langs = ['zh-hant', 'en', 'ja', 'zh-hans'];
  const body = `<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${langs
    .map((l) => `  <sitemap><loc>${new URL(`/${l}/`, site).toString()}</loc></sitemap>`) 
    .join('\n')}\n</sitemapindex>`;
  return new Response(body, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
}
