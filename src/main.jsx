import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from './App.jsx'
import './styles.css'

// createRoot связывает React с контейнером из index.html, render отображает App.
// StrictMode включает дополнительные проверки в разработке и может повторно запустить эффекты.
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
