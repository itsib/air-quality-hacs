import { defineConfig } from 'vite';
import { resolve } from 'node:path';
import copy from 'vite-plugin-cp';
import scssInline from '../../plugins/scss-inline';

const PROJECT_ROOT = resolve(__dirname);
const SOURCE_DIR = resolve(PROJECT_ROOT, 'src');

export default defineConfig({
  appType: 'custom',
  resolve: {
    alias: {
      lit: resolve(SOURCE_DIR, 'types/lit.ts'),
      i18n: resolve(SOURCE_DIR, 'i18n/i18n.ts'),
      types: resolve(SOURCE_DIR, 'types/index.ts'),
    },
  },
  build: {
    emptyOutDir: true,
    minify: false,
    lib: {
      formats: ['es'],
      entry: {
        ['air-quality']: resolve(SOURCE_DIR, 'index.ts'),
      },
    },
    outDir: resolve(PROJECT_ROOT, 'custom_components/air_quality/lovelace'),
    rollupOptions: {
      output: {
        preserveModules: false,
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js',
        manualChunks: () => 'air-quality',
      },
    },
  },
  plugins: [
    scssInline(),
    copy({
      targets: [
        {
          src: resolve(PROJECT_ROOT, 'src/images'),
          dest: resolve(PROJECT_ROOT, 'custom_components/air_quality/lovelace'),
        },
      ],
    }),
  ],
});