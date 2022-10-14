import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin(), splitVendorChunkPlugin()],

  test: {
    environment: 'jsdom',
  },
});
