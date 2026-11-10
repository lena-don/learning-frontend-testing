// @vitest-environment jsdom

import './testSetup.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TaskForm } from './TaskForm.jsx'

describe('TaskForm', () => {
  it('показывает ошибку при отправке пустого поля', async () => {
    const user = userEvent.setup()
    // vi.fn записывает вызовы. Так можно проверить контракт формы с родителем.
    const onAdd = vi.fn()
    render(<TaskForm onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: 'Добавить' }))

    expect(screen.getByRole('alert')).toHaveTextContent('Введите название задачи.')
    expect(onAdd).not.toHaveBeenCalled()
  })

  it('передаёт очищенное название родителю и очищает поле', async () => {
    const user = userEvent.setup()
    const onAdd = vi.fn()
    render(<TaskForm onAdd={onAdd} />)
    // Связь label с input задаёт доступное имя поля.
    const input = screen.getByRole('textbox', { name: 'Новая задача' })

    await user.type(input, '  Прочитать главу  ')
    await user.click(screen.getByRole('button', { name: 'Добавить' }))

    expect(onAdd).toHaveBeenCalledExactlyOnceWith('Прочитать главу')
    expect(input).toHaveValue('')
  })
})
