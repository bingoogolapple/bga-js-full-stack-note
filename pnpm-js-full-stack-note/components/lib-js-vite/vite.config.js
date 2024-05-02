import { resolve } from 'path'
import { defineConfig } from 'vite'

// https://cn.vitejs.dev/config/
// https://cn.vitejs.dev/guide/build.html#library-mode
// https://cn.vitejs.dev/config/build-options.html#build-lib
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.js'),
      name: 'LibJsVite',
      fileName: (format) => `index.${format}.js`,
    },
  },
})
