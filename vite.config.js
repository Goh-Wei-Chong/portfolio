import { defineConfig } from 'vite';
import { fileURLToPath, URL } from 'node:url';

export default defineConfig({
  base: process.env.BASE_PATH || '/',
  build: {
    rollupOptions: {
      input: {
        main: fileURLToPath(new URL('./index.html', import.meta.url)),
        photography: fileURLToPath(new URL('./photography/index.html', import.meta.url)),
      },
    },
  },
});
