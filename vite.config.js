import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  server: {
    host: true,   // Enables Vite to listen on all network interfaces
    port: 5174,   // Optional: specify a custom port if needed
  },
  base: './'
});
// export default defineConfig({
//   plugins: [react()],
// })
