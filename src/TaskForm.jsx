import { useState } from 'react'
import { MAX_TITLE_LENGTH, validateTitle } from './tasks.js'

export function TaskForm({ onAdd }) {
  // value хранит текст управляемого поля, error — сообщение после неудачной отправки.
  const [value, setValue] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(event) {
    // По умолчанию браузер отправляет форму с навигацией. Здесь её обрабатывает React.
    // onSubmit срабатывает и при нажатии кнопки, и при отправке поля клавишей Enter.
    event.preventDefault()
    const result = validateTitle(value)

    if (result.error) {
      setError(result.error)
      return
    }

    // onAdd — функция, которую App передал через пропс. Вызываем её после валидации.
    onAdd(result.title)
    setValue('')
    setError('')
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* htmlFor связывает подпись с id поля и задаёт доступное имя «Новая задача». */}
      <label htmlFor="task-title">Новая задача</label>
      <div className="form-controls">
        {/* value берётся из состояния, а onChange записывает введённый текст обратно. */}
        {/* aria-invalid отмечает ошибку. aria-describedby указывает на текст ошибки или подсказку. */}
        <input
          id="task-title"
          type="text"
          placeholder="Например, написать первый тест"
          value={value}
          onChange={(event) => {
            setValue(event.target.value)
            // При новой попытке ввода убираем сообщение о предыдущей ошибке.
            setError('')
          }}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? 'task-error' : 'task-hint'}
        />
        <button className="primary-button" type="submit">Добавить</button>
      </div>
      {/* role="alert" помогает скринридеру объявить появившуюся ошибку. */}
      {error ? (
        <p className="form-error" id="task-error" role="alert">{error}</p>
      ) : (
        <p className="form-hint" id="task-hint">До {MAX_TITLE_LENGTH} символов</p>
      )}
    </form>
  )
}
