import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"], // Keeping this as per your requirement
  },
  server: {
    host: true, // Allows external access to your dev server
    port: 3000, // Default port for the development server
  },
  build: {
    outDir: "dist", // Ensures the build output goes to the `dist` folder (default for Vite)
  },
});
