import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // use global test APIs (describe, it, expect)
    environment: 'jsdom', // or 'happy-dom'
    setupFiles: ['./vitest.setup.ts'],
    coverage: {
      provider: 'istanbul', // or 'c8'
      reporter: ['text', 'json', 'html'],
    },
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
