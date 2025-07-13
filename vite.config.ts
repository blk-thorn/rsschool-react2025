import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  base: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          const extType = assetInfo.name?.split('.')[1]?.toLowerCase() || '';
          if (extType === 'css') {
            return '[name][extname]';
          }
          return 'assets/[name][extname]';
        },
        entryFileNames: '[name].js',
        chunkFileNames: '[name].js'
      }
    }
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
