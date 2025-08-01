import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  test: {
    coverage: {
      all: true,
      exclude: [
        'src/tests/**',
        '**/types/**',
        '**/*.d.ts',
        'src/**/index.ts',
        'src/main.tsx',
      ],
      extension: ['.ts', '.tsx'],
      include: ['src/**/*'],
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 80,
        lines: 50,
        functions: 50,
        branches: 50,
      },
    },
    typecheck: {
      enabled: true,
      include: ['**/*.test-d.ts'],
    },
    css: false,
    reporters: ['verbose'],
    exclude: ['**/node_modules/**', '**/e2e/**'],
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    environment: 'jsdom',
    globals: true,
    maxConcurrency: 4,
    setupFiles: ['./vitest.setup.mjs'],
    cache: { dir: './node_modules/.vite/.vitest-cache' },
  },
});
