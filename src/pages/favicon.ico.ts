// Minimal placeholder favicon to avoid 404 during local dev
export function GET() {
  return new Response(new Uint8Array(), {
    headers: { 'Content-Type': 'image/x-icon', 'Cache-Control': 'public, max-age=86400' },
  })
}


