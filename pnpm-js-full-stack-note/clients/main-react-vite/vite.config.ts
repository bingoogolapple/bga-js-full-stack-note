import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://cn.vitejs.dev/config/
// https://cn.vitejs.dev/guide/build.html
// https://cn.vitejs.dev/config/build-options.html
// pnpm dev => { mode: 'development', command: 'serve', ssrBuild: false }
// pnpm build => { mode: 'production', command: 'build', ssrBuild: false }
// pnpm preview => { mode: 'production', command: 'serve', ssrBuild: false }
export default defineConfig(async ({ mode, command }) => {
  if (command === 'serve') {
    // dev 独有配置
  } else {
    // build 独有配置
  }
  const env = loadEnv(mode, process.cwd(), '')
  console.log('mode', mode)
  console.log('command', command)
  console.log('env', env.MAIN_REACT_A)
  return {
    plugins: [react()],
    define: {
      // __MAIN_REACT_A__: env.MAIN_REACT_A,
    },
  }
})
