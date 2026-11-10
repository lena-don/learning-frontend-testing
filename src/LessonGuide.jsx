const lessons = [
  {
    title: 'Функция',
    tool: 'Vitest',
    description: 'Передай функции пустую строку, обычное название и строку на границе лимита.',
    command: 'npm test -- src/tasks.test.js',
  },
  {
    title: 'Компонент',
    tool: 'Testing Library',
    description: 'Заполни форму в тесте и проверь сообщение об ошибке или вызов обработчика.',
    command: 'npm test -- src/TaskForm.test.jsx',
  },
  {
    title: 'Связка компонентов',
    tool: 'Testing Library',
    description: 'Добавь задачу, отметь её и проверь, как меняются список и счётчик.',
    command: 'npm test -- src/App.test.jsx',
  },
  {
    title: 'Сценарий в браузере',
    tool: 'Playwright',
    description: 'Пройди путь пользователя в Chromium и проверь список после перезагрузки. Перед первым запуском установи браузер командой npx playwright install chromium.',
    command: 'npm run test:e2e',
  },
]

export function LessonGuide() {
  return (
    <aside className="lesson-guide" aria-labelledby="guide-title">
      <p className="eyebrow">Учебный маршрут</p>
      <h2 id="guide-title">От функции до браузера</h2>
      <p className="guide-intro">Открывай шаги по порядку. В каждом есть команда для терминала.</p>
      <ol className="lesson-list">
        {lessons.map((lesson, index) => (
          <li key={lesson.title}>
            <details open={index === 0}>
              <summary>
                <span className="lesson-number" aria-hidden="true">0{index + 1}</span>
                <span className="lesson-label">
                  <strong>{lesson.title}</strong>
                  <small>{lesson.tool}</small>
                </span>
              </summary>
              <div className="lesson-body">
                <p>{lesson.description}</p>
                <code>{lesson.command}</code>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </aside>
  )
}
