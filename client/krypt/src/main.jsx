import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { TransctionProvider } from './context/TransctionContext.jsx'
createRoot(document.getElementById('root')).render(
  <TransctionProvider>
  <StrictMode>
    <App />
  </StrictMode>,
  </TransctionProvider>
  
)
