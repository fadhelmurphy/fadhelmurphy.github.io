export {};

declare global {
  interface ImportMetaEnv {
    readonly PUBLIC_PREFIX: string;
    readonly PUBLIC_BASE_PORT: string;
    readonly PUBLIC_BASE_DOMAIN: string;
    readonly PUBLIC_BASE_PROTOCOL: string;
    readonly PUBLIC_ROOT_DOMAIN: string;
    readonly SITE_FOR_BUILD: string;
  }

  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }
}
