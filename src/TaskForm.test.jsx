// @vitest-environment jsdom
// Директива выше включает jsdom — библиотеку, которая создаёт window и document в Node.js.
// React добавляет форму в этот DOM в памяти, а тест ищет в нём поле, кнопку и сообщение.

import './testSetup.js'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { TaskForm } from './TaskForm.jsx'

describe('TaskForm', () => {
  it('показывает ошибку при отправке пустого поля', async () => {
    // user-event имитирует действия пользователя. await ждёт окончания клика или ввода.
    const user = userEvent.setup()
    // vi.fn заменяет обработчик из App и записывает, вызвала ли его форма и с чем.
    const onAdd = vi.fn()
    // render монтирует форму в DOM, а screen ищет элементы по всему document.body.
    render(<TaskForm onAdd={onAdd} />)

    await user.click(screen.getByRole('button', { name: 'Добавить' }))

    // Проверяем видимый результат и то, что пустое название не ушло в список.
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

    // Ожидаем ровно один вызов с названием без пробелов по краям.
    expect(onAdd).toHaveBeenCalledExactlyOnceWith('Прочитать главу')
    expect(input).toHaveValue('')
  })
})
