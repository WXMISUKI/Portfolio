/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE?: string
  readonly VITE_SITE_URL?: string
  readonly VITE_API_URL?: string
  readonly VITE_SENTRY_DSN?: string
  readonly VITE_GA_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
