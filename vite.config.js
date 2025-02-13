import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // ทำให้สามารถเข้าถึงจากเครื่องอื่นในเครือข่ายเดียวกัน
    port: 5173, // หรือใช้พอร์ตอื่นถ้าจำเป็น
  },
})
