// TypeScript configuration for Node.js environment
import { defineConfig } from 'vite';
import * as path from 'path';
import { fileURLToPath } from 'url';
import react from '@vitejs/plugin-react';
// Explicitly declare types
type ViteConfigInput = Parameters<typeof defineConfig>[0];
// Use Node.js path module for file paths
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'react-native': 'react-native-web',
      'react-native-svg': 'react-native-svg-web',
      'expo-status-bar': path.resolve(__dirname, 'node_modules/expo-status-bar/build/StatusBar.web.js')
    },
    extensions: ['.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.tsx', '.ts', '.jsx', '.js']
  },
  optimizeDeps: {
    esbuildOptions: {
      resolveExtensions: ['.web.js', '.js', '.ts', '.jsx', '.tsx', '.json'],
      mainFields: ['browser', 'module', 'main']
    }
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true
    }
  },
  server: {
    port: 8080,
  },
});
