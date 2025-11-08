// Load environment variables manually for server-side code
// This ensures .env.local is loaded even if Astro's auto-loading doesn't work

let envLoaded = false

function ensureEnvLoaded() {
  if (envLoaded) {
    return
  }

  try {
    // Use dotenv to load .env.local
    // Only load if not in production (Astro handles production differently)
    if (process.env.NODE_ENV !== 'production') {
      const dotenv = require('dotenv')
      const path = require('path')
      const envPath = path.join(process.cwd(), '.env.local')
      
      const result = dotenv.config({ path: envPath })
      if (result.error) {
        // File might not exist, that's okay
        console.warn('[env] Could not load .env.local:', result.error.message)
      } else {
        envLoaded = true
        console.log('[env] Loaded .env.local')
      }
    }
  } catch (e) {
    // Silently fail - Astro should handle it in production
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[env] Failed to load .env.local:', e)
    }
  }
}

// Auto-load on import
ensureEnvLoaded()

