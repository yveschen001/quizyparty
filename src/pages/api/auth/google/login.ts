import type { APIRoute } from 'astro'
export const prerender = false
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
        console.warn('[OAuth Login] Failed to load .env.local:', result.error.message)
      } else {
        console.log('[OAuth Login] Loaded .env.local successfully')
        envLoaded = true
      }
    } else {
      console.warn('[OAuth Login] .env.local file not found at:', envPath)
    }
  } catch (e) {
    console.warn('[OAuth Login] Error loading .env.local:', e)
  }
}
loadEnv()

export const GET: APIRoute = async ({ url, cookies, redirect }) => {
  // Ensure env is loaded (in case module was cached)
  loadEnv()
  
  // In Astro API routes, use process.env for server-side environment variables
  const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || ''
  const GOOGLE_REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || ''

  // Debug: log environment variable status (only in development)
  if (process.env.NODE_ENV !== 'production') {
    console.log('[OAuth Login] Env check:', {
      hasClientId: !!GOOGLE_CLIENT_ID,
      hasRedirectUri: !!GOOGLE_REDIRECT_URI,
      clientIdLength: GOOGLE_CLIENT_ID.length,
      redirectUri: GOOGLE_REDIRECT_URI,
      allGoogleKeys: Object.keys(process.env).filter(k => k.includes('GOOGLE')),
    })
  }

  if (!GOOGLE_CLIENT_ID || !GOOGLE_REDIRECT_URI) {
    const errorMsg = {
      error: 'Google OAuth not configured',
      message: 'Please check your .env.local file has GOOGLE_CLIENT_ID and GOOGLE_REDIRECT_URI set.',
      hint: 'If you just added them, restart the dev server with: pnpm dev',
      debug: process.env.NODE_ENV !== 'production' ? {
        hasClientId: !!GOOGLE_CLIENT_ID,
        hasRedirectUri: !!GOOGLE_REDIRECT_URI,
        allGoogleKeys: Object.keys(process.env).filter(k => k.includes('GOOGLE')),
      } : undefined,
    }
    console.error('[OAuth Login] Missing config:', errorMsg)
    return new Response(JSON.stringify(errorMsg), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }

  try {
    // Generate state for CSRF protection
    const state = crypto.randomBytes(32).toString('hex')
    
    // Build Google OAuth URL
    const redirectUrl = url.searchParams.get('redirect') || '/'
    const encodedRedirect = Buffer.from(redirectUrl).toString('base64')
    const fullState = state + '|' + encodedRedirect

    // Set cookie before redirect
    cookies.set('oauth_state', fullState, {
      path: '/',
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 10, // 10 minutes
      secure: process.env.NODE_ENV === 'production',
    })

    const params = new URLSearchParams({
      client_id: GOOGLE_CLIENT_ID,
      redirect_uri: GOOGLE_REDIRECT_URI,
      response_type: 'code',
      scope: 'openid email profile',
      state: fullState,
      access_type: 'offline',
      prompt: 'consent',
    })

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`
    return redirect(googleAuthUrl, 302)
  } catch (e) {
    console.error('[OAuth Login] Error:', e)
    return new Response(JSON.stringify({ error: 'Failed to initiate OAuth login' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    })
  }
}

