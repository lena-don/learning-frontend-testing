import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  // Vite запускает и собирает приложение. Плагин преобразует JSX в JavaScript.
  plugins: [react()],
  test: {
    // ** охватывает вложенные папки, а {js,jsx} допускает оба расширения.
    // Vitest запускает файлы *.test.js и *.test.jsx из src. За e2e отвечает Playwright.
    // По умолчанию Vitest использует Node.js. JSX-тесты отдельно включают jsdom.
    include: ['src/**/*.test.{js,jsx}'],
  },
})
