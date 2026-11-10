// @vitest-environment jsdom

import './testSetup.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { App } from './App.jsx'
import { STORAGE_KEY } from './taskStorage.js'

describe('Список задач', () => {
  beforeEach(() => {
    // У новых версий Node.js есть свой localStorage. Здесь используем хранилище jsdom.
    vi.stubGlobal('localStorage', jsdom.window.localStorage)
    // Пустой список в хранилище даёт одинаковую отправную точку каждому тесту.
    localStorage.setItem(STORAGE_KEY, '[]')
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('связывает форму, список, фильтр и счётчик', async () => {
    const user = userEvent.setup()
    render(<App />)

    const title = 'Проверить фильтры'
    await user.type(screen.getByRole('textbox', { name: 'Новая задача' }), title)
    await user.click(screen.getByRole('button', { name: 'Добавить' }))
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 0 из 1')

    await user.click(screen.getByRole('checkbox', { name: title }))
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 1 из 1')

    await user.click(screen.getByRole('button', { name: 'Активные' }))
    // queryByRole вернёт null, если задача исчезла из видимого списка.
    expect(screen.queryByRole('checkbox', { name: title })).not.toBeInTheDocument()
    expect(screen.getByText('Активных задач нет.')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Выполненные' }))
    expect(screen.getByRole('checkbox', { name: title })).toBeChecked()
  })

  it('показывает задачи из хранилища при открытии', () => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([
      { id: 'saved-1', title: 'Продолжить обучение', completed: true },
    ]))

    render(<App />)

    expect(screen.getByRole('checkbox', { name: 'Продолжить обучение' })).toBeChecked()
    expect(screen.getByRole('status')).toHaveTextContent('Выполнено 1 из 1')
  })
})
