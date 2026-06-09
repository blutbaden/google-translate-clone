interface ImportMeta {
  readonly env: ImportMetaEnv;
}

interface ImportMetaEnv {
  readonly NG_APP_ENV: string;
  readonly NG_APP_GOOGLE_TRANSLATE_API_KEY: string;
  readonly NG_APP_GOOGLE_TRANSLATE_API_HOST: string;
  [key: string]: any;
}

declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NG_APP_ENV: string;
    readonly NG_APP_GOOGLE_TRANSLATE_API_KEY: string;
    readonly NG_APP_GOOGLE_TRANSLATE_API_HOST: string;
  }
}
