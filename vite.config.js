import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "https://make-my-trip-api.vercel.app",
        changeOrigin: true,
        secure: true,
      },
    },
  },
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ["core-js-pure"],
    },
  },
});
