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
  // Передаём функцию инициализации, чтобы прочитать хранилище при создании списка.
  const [tasks, setTasks] = useState(loadTasks)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    saveTasks(tasks)
  }, [tasks])

  // Список и счётчик вычисляются из одних данных при каждом рендере.
  const visibleTasks = getVisibleTasks(tasks, filter)
  const completedCount = tasks.filter((task) => task.completed).length

  function addTask(title) {
    const task = { id: crypto.randomUUID(), title, completed: false }
    setTasks((currentTasks) => [...currentTasks, task])
    setFilter('all')
  }

  function toggleTask(id) {
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
              <p className="progress" role="status">Выполнено {completedCount} из {tasks.length}</p>
            </div>

            <TaskForm onAdd={addTask} />

            <div className="filters" role="group" aria-label="Фильтр задач">
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

            {visibleTasks.length ? (
              <ul className="task-list">
                {visibleTasks.map((task) => (
                  <li key={task.id}>
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
