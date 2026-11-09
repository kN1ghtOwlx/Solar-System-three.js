import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'static',

  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true
  }
});