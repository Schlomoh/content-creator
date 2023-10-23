import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import * as path from "path";
import dotenv from 'dotenv'

dotenv.config()

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/auth': `http://localhost:${process.env.VITE_PORT}`,
            '/api': `http://localhost:${process.env.VITE_PORT}`
        }
    },
    plugins: [react()],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
})
