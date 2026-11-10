import { expect, test } from '@playwright/test'

test('новая задача и её статус сохраняются после перезагрузки', async ({ page }) => {
  // Playwright передаёт page — вкладку в изолированной сессии со своим localStorage.
  // Адрес '/' дополняется baseURL из playwright.config.js.
  await page.goto('/')
  const title = 'Пройти сценарий в браузере'

  // Локатор описывает, как найти элемент по роли и доступному имени.
  // Элемент ищется при действии или проверке, поэтому задачу можно описать до её создания.
  const field = page.getByRole('textbox', { name: 'Новая задача' })
  const task = page.getByRole('checkbox', { name: title })

  // fill заполняет поле, а Enter отправляет HTML-форму. await сохраняет порядок действий.
  await field.fill(title)
  await field.press('Enter')
  // Эта проверка ждёт, что чекбокс появится и будет без галочки.
  await expect(task).not.toBeChecked()
  // check приводит чекбокс в отмеченное состояние.
  await task.check()
  await expect(task).toBeChecked()

  // React заново создаст состояние, а localStorage сохранит данные по тому же адресу.
  await page.reload()

  // Тот же локатор находит чекбокс в новой странице. expect повторяет проверку до тайм-аута.
  await expect(task).toBeChecked()
})
