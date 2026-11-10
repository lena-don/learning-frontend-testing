import { defineConfig } from '@playwright/test'

const baseURL = 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './e2e',
  use: { baseURL, browserName: 'chromium' },
  webServer: {
    // Playwright запускает Vite перед тестами и останавливает после прогона.
    command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
  },
})
