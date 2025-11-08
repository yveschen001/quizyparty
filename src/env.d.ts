/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE?: string;
  readonly OPENAI_API_KEY?: string;
  readonly RC_WEBHOOK_AUTH?: string;
  readonly RC_ENTITLEMENT_KEY?: string;
  readonly RC_IOS_PUBLIC_API_KEY?: string;
  readonly RC_ANDROID_PUBLIC_API_KEY?: string;
  readonly GOOGLE_SA_JSON?: string;
  readonly APPLE_ISSUER_ID?: string;
  readonly APPLE_KEY_ID?: string;
  readonly APPLE_PRIVATE_KEY?: string;
  readonly QP_SQLITE_PATH?: string;
  readonly DEV_TOKEN?: string;
  readonly GOOGLE_CLIENT_ID?: string;
  readonly GOOGLE_CLIENT_SECRET?: string;
  readonly GOOGLE_REDIRECT_URI?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

