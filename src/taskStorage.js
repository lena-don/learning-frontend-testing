export const STORAGE_KEY = 'frontend-testing-lab:tasks'

const starterTasks = [
  { id: 'starter-1', title: 'Запустить учебный проект', completed: true },
  { id: 'starter-2', title: 'Проверить форму с пустым названием', completed: false },
  { id: 'starter-3', title: 'Запустить первый тест в терминале', completed: false },
]

export function loadTasks() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY))

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

  return starterTasks
}

export function saveTasks(tasks) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  } catch {
    // При недоступном хранилище список по-прежнему работает в открытой вкладке.
  }
}
