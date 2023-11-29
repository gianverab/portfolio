/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REACT_APP_SANITY_PROJECT_ID: string;
  readonly VITE_REACT_APP_SANITY_TOKEN: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
