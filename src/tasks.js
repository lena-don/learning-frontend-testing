// Одно значение для правила валидации и подсказки в форме.
export const MAX_TITLE_LENGTH = 80

// Чистая функция зависит только от аргумента и не меняет внешние данные.
// Форма получает либо { title } с очищенным названием, либо { error } с сообщением.
export function validateTitle(rawTitle) {
  // Сначала убираем пробелы по краям, чтобы строка из пробелов считалась пустой.
  const title = rawTitle.trim()

  if (!title) {
    return { error: 'Введите название задачи.' }
  }

  if (title.length > MAX_TITLE_LENGTH) {
    return { error: `Сократите название до ${MAX_TITLE_LENGTH} символов.` }
  }

  return { title }
}

// filter создаёт новый массив и оставляет элементы, для которых условие истинно.
// Исходный список сохраняется, поэтому переключение фильтра не удаляет задачи.
export function getVisibleTasks(tasks, filter) {
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed)
  }

  if (filter === 'completed') {
    return tasks.filter((task) => task.completed)
  }

  return tasks
}
