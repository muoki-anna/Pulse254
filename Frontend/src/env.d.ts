/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACK_URL: string;
  // Add more variables if you have
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
