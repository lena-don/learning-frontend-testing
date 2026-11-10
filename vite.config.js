import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    // Только тесты из src. Тесты в e2e запускает Playwright.
    include: ['src/**/*.test.{js,jsx}'],
  },
})
