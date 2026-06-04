/// <reference types="vite/client" />

interface ViteTypeOptions {
    strictImportMetaEnv: unknown,
}

interface ImportMetaEnv {
    /** Project webpage base URL */
    readonly VITE_BASE_URL?: string,
}