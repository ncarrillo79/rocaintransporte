import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' -> el build funciona servido desde cualquier ruta (incluye GitHub Pages en subcarpeta).
export default defineConfig({
  plugins: [react()],
  base: './',
});
