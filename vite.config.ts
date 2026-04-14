import path from "path";
import { fileURLToPath } from "url";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteSingleFile } from "vite-plugin-singlefile";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
  base: "/ridvan-nv2/",   // GitHub Pages için zorunlu

  plugins: [
    react(),
    tailwindcss(),
    viteSingleFile()
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },

  build: {
    outDir: "docs",
    emptyOutDir: true,

    /** 🔥 EN KRİTİK KISIM — HTML OPTİMİZASYONUNU KAPATIYORUZ */
    minify: false,
    cssMinify: false,

    /** HTML içindeki meta viewport’un bozulmasını engeller */
    rollupOptions: {
      output: {
        inlineDynamicImports: true,
      }
    }
  }
});