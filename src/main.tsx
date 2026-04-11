/**
 * @file main.tsx
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

import { TerminalProvider } from './context/terminal_context' 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <TerminalProvider>
      <App />
    </TerminalProvider>
  </StrictMode>,
)