// Импорт расширяет expect проверками DOM, например toHaveValue и toBeInTheDocument.
import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  // Этот хук срабатывает даже при падении проверки. cleanup размонтирует компоненты,
  // чтобы поиск в следующем тесте не находил элементы из предыдущего.
  cleanup()
})
