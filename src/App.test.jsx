// @vitest-environment jsdom
// jsdom предоставляет DOM и отдельное хранилище для тестов, которые запускаются в Node.js.

import './testSetup.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App.jsx'
import { STORAGE_KEY } from './taskStorage.js'

describe('Список задач', () => {
  beforeEach(() => {
    // Vitest предоставляет jsdom.window. stubGlobal подставляет его хранилище,
    // чтобы тест и App обращались к одному объекту даже в Node.js со своим localStorage.
    vi.stubGlobal('localStorage', jsdom.window.localStorage)
    // Пустой список в хранилище даёт одинаковую отправную точку каждому тесту.
    localStorage.setItem(STORAGE_KEY, '[]')
  })

  afterEach(() => {
    // Возвращаем исходное глобальное значение после каждого теста.
    vi.unstubAllGlobals()
  })

  it('связывает форму, список, фильтр и счётчик', async () => {
    const user = userEvent.setup()
    // Монтируем весь App. Его собственный обработчик соединяет форму со списком.
    render(<App />)

    const title = 'Проверить фильтры'
    await user.type(screen.getByRole('textbox', { name: 'Новая задача' }), title)
    await user.click(screen.getByRole('button', { name: 'Добавить' }))
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 0 из 1')

    await user.click(screen.getByRole('checkbox', { name: title }))
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 1 из 1')

    await user.click(screen.getByRole('button', { name: 'Активные' }))
    // queryByRole вернёт null при отсутствии элемента. getByRole здесь выбросил бы ошибку.
    expect(screen.queryByRole('checkbox', { name: title })).not.toBeInTheDocument()
    expect(screen.getByText('Активных задач нет.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Выполненные' }))
    expect(screen.getByRole('checkbox', { name: title })).toBeChecked()
  })

  it('показывает задачи из хранилища при открытии', () => {
    // Заполняем хранилище до render, потому что App читает его при инициализации.
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { id: 'saved-1', title: 'Продолжить обучение', completed: true },
    ]))

    render(<App />)

    expect(screen.getByRole('checkbox', { name: 'Продолжить обучение' })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 1 из 1')
  })
})
