import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
// NOTE: Set base to '/studypilot/' for GitHub Pages deployment.
// Change 'studypilot' if your GitHub repo has a different name.
export default defineConfig({
  base: '/studypilot/',
  plugins: [
    react(),
    tailwindcss(),
  ],
})
