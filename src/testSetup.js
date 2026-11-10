import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
  // Удаляем компоненты из DOM, чтобы следующий тест начал с пустой страницы.
  cleanup()
})
