import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      // This mimics the Vercel proxy for local development
      '/api': {
        target: 'http://52.62.66.116:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
