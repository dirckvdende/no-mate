
import { fileURLToPath, URL } from "node:url"
import { ConfigEnv, defineConfig, loadEnv } from "vite"
import vue from "@vitejs/plugin-vue"
import vueDevTools from "vite-plugin-vue-devtools"
import { cwd } from "node:process"
import { resolve } from "node:path"

/**
 * Get a path to an HTML file
 * @param name The name of the file, without ".html"
 * @returns The path to the file
 */
function htmlPath(name: string): string {
    return resolve(__dirname, `${name}.html`)
}

/**
 * Get the base URL from environment variables, or default to "/"
 * @param configEnv Loaded configuration
 * @returns The base URL as a string
 */
function baseUrl(configEnv: ConfigEnv): string {
    const env = loadEnv(configEnv.mode, cwd())
    return env.VITE_BASE_URL ?? "/"
}

// https://vite.dev/config/
export default defineConfig((configEnv) => ({
    base: baseUrl(configEnv),
    plugins: [
        vue(),
        vueDevTools(),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        },
    },
    build: {
        rolldownOptions: {
            input: {
                main: htmlPath("index"),
            },
            output: {
                assetFileNames: "[hash:16][extname]",
                chunkFileNames: "[hash:16].js",
                entryFileNames: "[hash:16].js",
            }
        }
    },
}))
