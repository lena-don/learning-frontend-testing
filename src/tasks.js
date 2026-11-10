export const MAX_TITLE_LENGTH = 80

// Чистая функция получает строку и возвращает результат. Для её теста хватит Node.js.
export function validateTitle(rawTitle) {
  const title = rawTitle.trim()

  if (!title) {
    return { error: 'Введите название задачи.' }
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return { error: `Сократите название до ${MAX_TITLE_LENGTH} символов.` }
  }

  return { title }
}

export function getVisibleTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed)
  }

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed)
  }

  return tasks
}
