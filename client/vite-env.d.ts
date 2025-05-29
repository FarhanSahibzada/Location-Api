/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APIKEY: string;
  readonly VITE_AUTH_DOMAIN: string;
  readonly VITE_PROJECT_ID: string;
  readonly VITE_STORAGE_BUCKET: string;
  readonly VITE_MESSAGING_SENDER_ID: string;
  readonly VITE_APP_ID: string;
  // Add any other VITE_ vars here
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
