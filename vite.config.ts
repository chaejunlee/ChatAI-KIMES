import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default ({ mode }) => {
	process.env = {
		...process.env,
		...loadEnv(mode, process.cwd()),
	};

	return defineConfig({
		plugins: [
			react(),
			VitePWA({
				registerType: "autoUpdate",
				devOptions: {
					enabled: true,
				},
				injectRegister: "auto",
				manifest: {
					name: "ChatAI",
					short_name: "ChatAI",
					description: "ChatAI for KIMES",
					theme_color: "#ffffff",
					icons: [
						{
							src: "icons/logo.png",
							sizes: "192x192",
							type: "image/png",
						},
					],
				},
			}),
		],
		server: {
			proxy: {
				"^/api": {
					target: process.env.VITE_API_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(/^\/api/, ""),
					secure: false,
				},
			},
		},
	});
};
