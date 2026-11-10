// Ключ — имя записи в хранилище браузера. Префикс отличает её от других записей.
export const STORAGE_KEY = 'frontend-testing-lab:tasks'

const starterTasks = [
  { id: 'starter-1', title: 'Запустить учебный проект', completed: true },
  { id: 'starter-2', title: 'Проверить форму с пустым названием', completed: false },
  { id: 'starter-3', title: 'Запустить первый тест в терминале', completed: false },
]

export function loadTasks() {
  try {
    // localStorage хранит строки. JSON.parse восстанавливает из строки массив объектов.
    // Если ключа ещё нет, getItem возвращает null и проверка массива ниже не проходит.
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))

    // every проверяет структуру каждой задачи, включая типы полей.
    // task?.id даёт undefined для null, и && прекращает проверку на первом несовпадении.
    if (Array.isArray(saved) && saved.every((task) =>
      typeof task?.id === 'string' &&
      typeof task.title === 'string' &&
      typeof task.completed === 'boolean'
    )) {
      return saved
    }
  } catch {
    // Хранилище может быть недоступно или содержать некорректный JSON.
  }

  // При первом запуске или ошибке показываем учебные задачи. Сохранённый [] тоже допустим.
  return starterTasks
}

export function saveTasks(tasks) {
  try {
    // stringify упаковывает массив в строку, которую можно прочитать при перезагрузке.
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // При недоступном хранилище список по-прежнему работает в открытой вкладке.
  }
}
