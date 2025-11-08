import type { APIRoute } from 'astro'
import { SignJWT, importPKCS8 } from 'jose'

async function appleToken() {
  const iss = process.env.APPLE_ISSUER_ID as string
  const kid = process.env.APPLE_KEY_ID as string
  const pk = (process.env.APPLE_PRIVATE_KEY as string)?.replace(/\\n/g, '\n')
  if (!iss || !kid || !pk) throw new Error('Missing APPLE_ISSUER_ID/APPLE_KEY_ID/APPLE_PRIVATE_KEY')
  const key = await importPKCS8(pk, 'ES256')
  const now = Math.floor(Date.now() / 1000)
  return await new SignJWT({})
    .setProtectedHeader({ alg: 'ES256', kid, typ: 'JWT' })
    .setIssuer(iss)
    .setIssuedAt(now)
    .setExpirationTime(now + 1800)
    .setAudience('appstoreconnect-v1')
    .sign(key)
}

// GET ?originalTransactionId=1000000...
export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url)
    const otid = url.searchParams.get('originalTransactionId')
    if (!otid) return new Response('missing originalTransactionId', { status: 400 })
    const token = await appleToken()
    const api = `https://api.storekit.itunes.apple.com/inApps/v1/subscriptions/${otid}`
    const resp = await fetch(api, { headers: { Authorization: `Bearer ${token}` } })
    const data = await resp.text()
    return new Response(data, { status: resp.status, headers: { 'content-type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500 })
  }
}


