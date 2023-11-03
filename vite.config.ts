import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import * as path from "path";
import dotenv from "dotenv";

dotenv.config();

export default defineConfig(({ mode }) => ({
  server: {
    proxy: {
      "/api": {
        target:
          mode === "development"
            ? "http://localhost:5001/content-creator-x/us-central1"
            : "https://us-central1-content-creator-x.cloudfunctions.net",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
