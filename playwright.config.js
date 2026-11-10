import { defineConfig } from '@playwright/test'

// 127.0.0.1 — адрес своего компьютера. 4173 — порт отдельного сервера для тестов.
const baseURL = 'http://127.0.0.1:4173'

export default defineConfig({
  testDir: './e2e',
  // Chromium — браузер с открытым исходным кодом, на котором основан Google Chrome.
  // Playwright управляет этим браузером. Его сборку скачивает npx playwright install chromium.
  // По умолчанию браузер работает без видимого окна, а page.goto('/') использует baseURL.
  use: { baseURL, browserName: 'chromium' },
  webServer: {
    // Playwright запускает Vite, ждёт ответа по url и после прогона останавливает сервер.
    // npm передаёт аргументы после -- в Vite. --strictPort сообщает об ошибке,
    // если порт занят, чтобы Vite не выбрал другой порт, а тесты не ждали старый адрес.
    command: 'npm run dev -- --host 127.0.0.1 --port 4173 --strictPort',
    url: baseURL,
  },
})
