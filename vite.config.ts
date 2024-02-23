import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/guide/build.html#library-mode
/** @type {import('rollup').RollupOptions} */
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'main',
      fileName: 'main',
    },
  },
  plugins: [ react() ],
})
