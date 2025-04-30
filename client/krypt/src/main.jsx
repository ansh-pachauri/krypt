import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TranscationProvider } from './context/TransctionContext.jsx'
createRoot(document.getElementById('root')).render(
  <TranscationProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </TranscationProvider>
  
)
