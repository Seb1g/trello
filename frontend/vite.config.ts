import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 5173,
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:5000',
    }
  },
  root: "src",
  plugins: [react()],
})
