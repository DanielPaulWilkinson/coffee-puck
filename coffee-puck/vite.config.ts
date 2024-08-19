import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    plugins: [
        vue(),
    ],
    server: {
        host: true,
        port: 3028,
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
    base: "/",
    build: {
        sourcemap: true,
        cssCodeSplit: true,
        manifest: true,
        rollupOptions: {
            input: [
                "src/main.ts",
            ],
        },
    },
});
