import { defineConfig } from 'vite'
import { resolve } from 'path';

export default defineConfig({
  base: '/DUBREUIL-portfolio-website/',

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'index-read-more.html'),
      },
    },
  },
})