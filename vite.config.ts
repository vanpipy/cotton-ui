import path from 'path';
import { splitVendorChunkPlugin } from 'vite';
import { defineConfig } from 'vitest/config';
import { createVuePlugin } from 'vite-plugin-vue2';

export default defineConfig({
  plugins: [createVuePlugin(), splitVendorChunkPlugin()],

  build: {
    sourcemap: true,
    manifest: true,
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs'],
      name: 'Cotton',
      fileName: 'cotton',
    },
    outDir: path.resolve(__dirname, 'lib'),
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  },

  test: {
    root: '.',
    environment: 'jsdom',
    include: ['./src/**/*.spec.ts'],
  },
});
