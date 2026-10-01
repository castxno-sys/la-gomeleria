import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Permite abrir la app desde un celular conectado a la misma red wifi.
  server: { host: true },
})
