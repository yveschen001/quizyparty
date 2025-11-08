import type { APIRoute } from 'astro'
export const prerender = false
import { userStore } from '../../../../server/user'
import { createSession, setSessionCookie } from '../../../../lib/auth'
import crypto from 'node:crypto'
import * as dotenv from 'dotenv'
import * as path from 'node:path'
import * as fs from 'node:fs'

// Load environment variables - do this once at module load time
let envLoaded = false
function loadEnv() {
  if (envLoaded || process.env.NODE_ENV === 'production') return
  try {
    const envPath = path.join(process.cwd(), '.env.local')
    if (fs.existsSync(envPath)) {
      const result = dotenv.config({ path: envPath })
      if (result.error) {
        console.warn('[OAuth Callback] Failed to load .env.local:', result.error.message)
      } else {
        console.log('[OAuth Callback] Loaded .env.local successfully')
        envLoaded = true
      }
    }
  } catch (e) {
    console.warn('[OAuth Callback] Error loading .env.local:', e)
  }
}
loadEnv()

// In Astro API routes, use process.env for server-side environment variables
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || ''
const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || ''

export const GET: APIRoute = async ({ url, request, cookies, redirect }) => {
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')
  const error = url.searchParams.get('error')

  if (error) {
    return redirect('/?error=oauth_failed', 302)
  }

  if (!code || !state) {
    return redirect('/?error=invalid_request', 302)
  }

  // Verify state (should match what we sent)
  const storedState = cookies.get('oauth_state')?.value
  let redirectUrl = '/'
  if (!storedState || !state.startsWith(storedState)) {
    return redirect('/?error=state_mismatch', 302)
  }

  // Extract redirect URL from state
  const stateParts = state.split('|')
  if (stateParts.length > 1) {
    try {
      redirectUrl = Buffer.from(stateParts[1], 'base64').toString()
    } catch {
      redirectUrl = '/'
    }
  }

  // Exchange code for access token
  try {
    const tokenRes = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: GOOGLE_CLIENT_ID,
        client_secret: GOOGLE_CLIENT_SECRET,
        redirect_uri: GOOGLE_REDIRECT_URI,
        grant_type: 'authorization_code',
      }),
    })

    if (!tokenRes.ok) {
      return redirect('/?error=token_exchange_failed', 302)
    }

    const tokenData = await tokenRes.json()
    const accessToken = tokenData.access_token

    // Get user info from Google
    const userRes = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    if (!userRes.ok) {
      return redirect('/?error=user_info_failed', 302)
    }

    const googleUser = await userRes.json()

    // Create or update user
    const store = userStore()
    let user = store.getByProvider('google', googleUser.id)
    const now = Date.now()

    if (!user) {
      // Check if email already exists
      const existingUser = store.getByEmail(googleUser.email)
      if (existingUser) {
        // Update existing user to use Google auth
        user = existingUser
        store.update(user.id, {
          provider: 'google',
          providerId: googleUser.id,
          avatar: googleUser.picture,
          name: googleUser.name,
        })
      } else {
        // Create new user
        user = {
          id: crypto.randomUUID(),
          email: googleUser.email,
          name: googleUser.name || googleUser.email,
          avatar: googleUser.picture,
          provider: 'google',
          providerId: googleUser.id,
          createdAt: now,
          updatedAt: now,
        }
        store.create(user)
      }
    } else {
      // Update existing user info
      store.update(user.id, {
        name: googleUser.name || user.name,
        avatar: googleUser.picture || user.avatar,
      })
    }

    // Create session
    const sessionId = createSession(user.id)
    const res = redirect(redirectUrl + '?success=logged_in', 302)
    setSessionCookie(res, sessionId)
    cookies.delete('oauth_state')

    return res
  } catch (e) {
    console.error('[OAuth callback]', e)
    return redirect('/?error=oauth_error', 302)
  }
}

