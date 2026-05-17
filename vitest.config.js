import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: 'jsdom',
    globals: true,

    include: [
      'src/**/*.test.js'
    ],

    exclude: [
      'node_modules',
      'dist',
      'e2e',
      'playwright-report',
      'test-results'
    ],

    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{js,vue}'],
      exclude: [
        'src/main.js',
        'src/**/*.test.js'
      ]
    }
  }
})