import { describe, expect, it } from 'vitest'
import { getVisibleTasks, validateTitle } from './tasks.js'

describe('validateTitle', () => {
  it('убирает пробелы с начала и конца названия', () => {
    // Arrange — готовим входные данные.
    const input = '  Написать тест  '

    // Act — запускаем код, который изучаем.
    const result = validateTitle(input)

    // Assert — сравниваем результат с ожидаемым.
    expect(result).toEqual({ title: 'Написать тест' })
  })

  it.each(['', '   '])('отклоняет пустой ввод %j', (input) => {
    expect(validateTitle(input)).toEqual({ error: 'Введите название задачи.' })
  })

  it('принимает название из 80 символов', () => {
    const title = 'а'.repeat(80)

    expect(validateTitle(title)).toEqual({ title })
  })

  it('отклоняет название из 81 символа', () => {
    expect(validateTitle('а'.repeat(81))).toEqual({
      error: 'Сократите название до 80 символов.',
    })
  })
})

describe('getVisibleTasks', () => {
  const activeTask = { id: 'a', title: 'Прочитать пример', completed: false }
  const completedTask = { id: 'b', title: 'Установить зависимости', completed: true }
  const tasks = [activeTask, completedTask]

  it('показывает только активные задачи', () => {
    expect(getVisibleTasks(tasks, 'active')).toEqual([activeTask])
  })

  it('показывает только выполненные задачи', () => {
    expect(getVisibleTasks(tasks, 'completed')).toEqual([completedTask])
  })

  it('показывает все задачи по порядку при фильтре «Все»', () => {
    expect(getVisibleTasks(tasks, 'all')).toEqual([activeTask, completedTask])
  })
})
