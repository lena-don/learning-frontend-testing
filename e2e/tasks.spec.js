import { expect, test } from '@playwright/test'

test('новая задача и её статус сохраняются после перезагрузки', async ({ page }) => {
  // page — вкладка в новом контексте браузера. Хранилище тестов изолировано.
  await page.goto('/')
  const title = 'Пройти сценарий в браузере'
  const field = page.getByRole('textbox', { name: 'Новая задача' })
  const task = page.getByRole('checkbox', { name: title })

  await field.fill(title)
  await field.press('Enter')
  await expect(task).not.toBeChecked()
  await task.check()
  await expect(task).toBeChecked()

  await page.reload()

  // Локатор находит элемент заново после навигации. expect ждёт нужного состояния.
  await expect(task).toBeChecked()
})
