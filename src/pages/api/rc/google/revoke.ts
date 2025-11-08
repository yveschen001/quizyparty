import type { APIRoute } from 'astro'
import crypto from 'node:crypto'

async function getGoogleAccessToken() {
  const raw = process.env.GOOGLE_SA_JSON || '{}'
  const sa = JSON.parse(raw) as { client_email: string; private_key: string }
  if (!sa.client_email || !sa.private_key) throw new Error('Missing GOOGLE_SA_JSON')
  const now = Math.floor(Date.now() / 1000)
  const header = { alg: 'RS256', typ: 'JWT' }
  const claim = {
    iss: sa.client_email,
    scope: 'https://www.googleapis.com/auth/androidpublisher',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: now + 3600,
  }
  const enc = (o: unknown) => Buffer.from(JSON.stringify(o)).toString('base64url')
  const unsigned = `${enc(header)}.${enc(claim)}`
  const sign = crypto.createSign('RSA-SHA256').update(unsigned).end().sign(sa.private_key, 'base64url')
  const assertion = `${unsigned}.${sign}`

  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion }),
  })
  const json = await res.json()
  if (!res.ok) throw new Error(`g-token ${res.status} ${JSON.stringify(json)}`)
  return json.access_token as string
}

export const POST: APIRoute = async ({ request }) => {
  try {
    const { packageName, purchaseToken, refundType = 'prorated' } = await request.json()
    if (!packageName || !purchaseToken) return new Response('missing packageName/purchaseToken', { status: 400 })
    const token = await getGoogleAccessToken()
    const api = `https://androidpublisher.googleapis.com/androidpublisher/v3/applications/${packageName}/purchases/subscriptionsv2/tokens/${purchaseToken}:revoke`
    const revocationContext =
      refundType === 'full' ? { fullRefund: {} } :
      refundType === 'item' ? { itemBasedRefund: { productId: '' } } :
      { proratedRefund: {} }

    const resp = await fetch(api, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'content-type': 'application/json' },
      body: JSON.stringify({ revocationContext }),
    })
    const data = await resp.text()
    return new Response(data, { status: resp.status, headers: { 'content-type': 'application/json' } })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: String(e?.message || e) }), { status: 500 })
  }
}


