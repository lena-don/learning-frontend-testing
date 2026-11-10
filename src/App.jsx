import { useEffect, useState } from 'react'
import { LessonGuide } from './LessonGuide.jsx'
import { TaskForm } from './TaskForm.jsx'
import { loadTasks, saveTasks } from './taskStorage.js'
import { getVisibleTasks } from './tasks.js'

const filters = [
  { value: 'all', label: 'Все' },
  { value: 'active', label: 'Активные' },
  { value: 'completed', label: 'Выполненные' },
]

const emptyMessages = {
  all: 'Задач пока нет.',
  active: 'Активных задач нет.',
  completed: 'Выполненных задач пока нет.',
}

export function App() {
  // Передаём саму loadTasks без скобок. React вызовет её при инициализации состояния.
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')

  // Эффект связывает состояние React с внешним хранилищем. Он сохраняет начальный
  // список после первого рендера и запускается снова при изменении tasks.
  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Отдельное состояние для результатов фильтрации и счётчика не нужно.
  // Счётчик берётся из полного списка, поэтому переключение фильтра его не меняет.
  const visibleTasks = getVisibleTasks(tasks, filter)
  const completedCount = tasks.filter((task) => task.completed).length

  function addTask(title) {
    // UUID служит постоянным идентификатором. Названия задач могут совпадать.
    const task = { id: crypto.randomUUID(), title, completed: false }
    // Функция обновления получает актуальный массив. ... копирует его элементы в новый.
    setTasks((currentTasks) => [...currentTasks, task])
    // Возвращаемся к фильтру «Все», чтобы новая задача сразу была видна.
    setFilter('all')
  }

  function toggleTask(id) {
    // map создаёт новый массив. Для нужного id создаём копию задачи через ...task
    // и меняем completed на противоположное значение. Остальные задачи сохраняем как есть.
    setTasks((currentTasks) => currentTasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    ))
  }

  return (
    <div className="shell">
      <header className="masthead">
        <div className="brand">
          <span className="brand-mark" aria-hidden="true">✓</span>
          Мастерская тестов
        </div>
        <span className="edition">React · Практикум</span>
      </header>

      <main>
        <section className="hero" aria-labelledby="page-title">
          <p className="eyebrow">Учебный проект / 01</p>
          <h1 id="page-title">Список задач</h1>
          <p>Добавь задачу, отметь её выполненной и проверь фильтры. Затем повтори те же действия в тестах.</p>
        </section>

        <div className="workspace">
          <section className="board" aria-labelledby="board-title">
            <div className="board-heading">
              <h2 id="board-title">Мои задачи</h2>
              {/* role="status" позволяет скринридеру объявить изменение счётчика. */}
              <p className="progress" role="status">Выполнено {completedCount} из {tasks.length}</p>
            </div>

            <TaskForm onAdd={addTask} />

            <div className="filters" role="group" aria-label="Фильтр задач">
              {/* aria-pressed сообщает, какая кнопка-фильтр сейчас выбрана. */}
              {filters.map(({ value, label }) => (
                <button
                  key={value}
                  type="button"
                  aria-pressed={value === filter}
                  onClick={() => setFilter(value)}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* key помогает React сопоставлять строки при смене фильтра. */}
            {visibleTasks.length ? (
              <ul className="task-list">
                {visibleTasks.map((task) => (
                  <li key={task.id}>
                    {/* Вложенный в label чекбокс получает имя из текста задачи. */}
                    <label className="task-row">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)}
                      />
                      <span>{task.title}</span>
                    </label>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="empty-state">{emptyMessages[filter]}</p>
            )}
          </section>
          <LessonGuide />
        </div>
      </main>

      <footer>Задачи сохраняются в этом браузере.</footer>
    </div>
  )
}
