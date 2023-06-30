import { defineConfig } from 'vitest/config';
import { createVuePlugin } from 'vite-plugin-vue2';
import vueJsx from '@vitejs/plugin-vue2-jsx';

export default defineConfig({
  plugins: [createVuePlugin(), vueJsx()],

  test: {
    globals: true,
    environment: 'jsdom',
    transformMode: {
      web: [/.[tj]sx$/],
    },
  },
});
