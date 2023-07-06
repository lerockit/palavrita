import react from '@vitejs/plugin-react'
import path from 'path'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'tailwind-config': path.resolve(__dirname, './tailwind.config.js'),
    },
  },
  optimizeDeps: {
    include: ['tailwind-config'],
  },
})
