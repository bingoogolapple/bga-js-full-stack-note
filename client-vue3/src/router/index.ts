import {
  createRouter,
  createWebHashHistory,
  createWebHistory
} from 'vue-router'
import routes from './routes'

// https://router.vuejs.org/zh/guide

const router = createRouter({
  // history: createWebHistory('base/vue3'), // 修改了 base 后，$route 获取到的 path 是不带 base 的
  history: createWebHashHistory(),
  routes
})

router
  .isReady()
  .then(() => {
    console.log('router.isReady success')
  })
  .catch(e => {
    console.log('router.isReady error', e)
  })

export default router
