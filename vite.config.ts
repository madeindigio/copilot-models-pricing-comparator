import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set BASE to the repository name when deploying to GitHub Pages
// e.g. if your repo is https://github.com/user/models-pricing, set base to '/models-pricing/'
// You can override this with VITE_BASE_URL env var in the GitHub Actions workflow
const base = process.env.VITE_BASE_URL ?? '/'

export default defineConfig({
  plugins: [react()],
  base,
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
})
