import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_URL_ANALYSIS || "/",
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
  },
});
