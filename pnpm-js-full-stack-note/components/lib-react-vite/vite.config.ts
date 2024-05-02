import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import dts from 'vite-plugin-dts'

// https://cn.vitejs.dev/config/
// https://cn.vitejs.dev/guide/build.html#library-mode
// https://cn.vitejs.dev/config/build-options.html#build-lib
// pnpm dev => { mode: 'development', command: 'serve', ssrBuild: false }
// pnpm build => { mode: 'production', command: 'build', ssrBuild: false }
// pnpm preview => { mode: 'production', command: 'serve', ssrBuild: false }
export default defineConfig(async ({ command }) => {
  // let root = resolve(__dirname);
  let root = undefined
  if (command === 'serve') {
    // dev 独有配置
    root = resolve(__dirname, 'example')
  }
  return {
    root,
    plugins: [
      react(),
      dts({
        entryRoot: 'src', // 这里指定下 entryRoot 为 src，避免 monorepo 场景下生成的 .d.ts 目录混乱
      }),
    ],
    build: {
      // 如果为 true，将会创建一个独立的 source map 文件
      // 如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中
      // 'hidden' 的工作原理与 'true' 相似，只是 bundle 文件中相应的注释将不被保留。浏览器不会自动加载 sourcemap，需要在浏览器的调试控制台中右键 - Add source map
      sourcemap: true,
      lib: {
        entry: resolve(__dirname, 'src/index.ts'),
        name: 'LibReactVite',
        fileName: (format) => `index.${format}.js`,
      },
      rollupOptions: {
        // 确保外部化处理那些你不想打包进库的依赖
        external: ['react', 'react-dom'],
        output: {
          // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
          globals: {
            react: 'React',
            'react-dom': 'ReactDom',
          },
        },
      },
    },
  }
})
