import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/': {
        target: 'https://api.anthropic.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\//, ''),
      },
    },
  },
})


// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': { // Cela pointe vers l'API d'anthropic.com, pas vers un fichier ou un dossier
//         target: 'https://api.anthropic.com',
//         changeOrigin: true,
//         rewrite: (path) => path.replace(/^\/api/, ''),
//       },
//     },
//   },
// })