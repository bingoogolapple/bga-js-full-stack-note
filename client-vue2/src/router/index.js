import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'

Vue.use(VueRouter)

// 创建 router 实例，然后传 `routes` 配置
const router = new VueRouter({
  routes
})

export default router
