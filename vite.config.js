import { fileURLToPath, URL } from "node:url";

import vue from "@vitejs/plugin-vue";
import { defineConfig } from "vite";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
	plugins: [vue(), vueDevTools()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `@use "./src/assets/global.scss";`,
			},
		},
	},
	test: {
		environment: "happy-dom",
	},
	server: {
		host: true,
		port: 5173,
		watch: {
			usePolling: true,
		},
	},
});
