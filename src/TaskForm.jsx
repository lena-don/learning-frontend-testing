import { useState } from 'react'
import { MAX_TITLE_LENGTH, validateTitle } from './tasks.js'

export function TaskForm({ onAdd }) {
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    event.preventDefault()
    const result = validateTitle(value)

    if (result.error) {
      setError(result.error)
      return
    }

    // Форма сообщает о вводе через пропс. Списком задач управляет App.
    onAdd(result.title)
    setValue('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <label htmlFor="task-title">Новая задача</label>
      <div className="form-controls">
        <input
          id="task-title"
          type="text"
          placeholder="Например, написать первый тест"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-error' : 'task-hint'}
        />
        <button className="primary-button" type="submit">Добавить</button>
      </div>
      {error ? (
        <p className="form-error" id="task-error" role="alert">{error}</p>
      ) : (
        <p className="form-hint" id="task-hint">До {MAX_TITLE_LENGTH} символов</p>
      )}
    </form>
  )
}
