import { defineConfig } from 'vite'
// Adds Tailwind CSS
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default defineConfig({
  plugins: [
    react(), 
    tailwindcss(),
  ],
})
