import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

const TEST_URL='https://ad1q3eqae2.execute-api.ap-northeast-2.amazonaws.com/test'
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),VitePWA({
        registerType: 'autoUpdate' ,
        devOptions: {
            enabled: true
        },
        injectRegister: 'auto',
        manifest: {
            name: 'ChatAI',
            short_name: 'ChatAI',
            description: 'ChatAI for KIMES',
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'icons/logo.png',
                    sizes: '192x192',
                    type: 'image/png'
                }
            ]
        }
    },)],
    server:{
        proxy:{
            '^/test':{
                target: TEST_URL,
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/test/, ''),
                secure: false
            }
        }
    }
})
