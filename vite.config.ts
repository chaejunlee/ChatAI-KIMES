import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const TEST_URL='https://ad1q3eqae2.execute-api.ap-northeast-2.amazonaws.com/test'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    proxy:{
        '/api':{
            target: TEST_URL,
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            secure: false
        }
    }
  }
})
