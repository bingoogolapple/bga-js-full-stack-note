import Home from '../views/Home.vue'
import Basic from '../views/Basic/index.vue'
import Router from '../views/Router/index.vue'
import Vuex from '../views/Vuex.vue'
import NotFound from '../views/NotFound.vue'

import basicRoutes from './basic-routes'
import routerRoutes from './router-routes'

// 定义路由，每个路由应该映射一个组件
export default [
  {
    // 默认情况下出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由
    path: '',
    // component: Home, // 直接指定 Home 组件或者重定向
    redirect: '/home' // 重定向可以是字符串 path 路径
    // redirect: {
    //   name: 'Home' // 重定向也可以是命名的路径对象
    // }
    // redirect: to => { // 甚至是一个方法，动态返回重定向目标
    //   // const { hash, params, query } = to
    //   console.log('重定向 to', to)
    //   // return '/home'
    //   return {
    //     name: 'Home'
    //   }
    // }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/basic',
    name: 'Basic',
    component: Basic,
    children: basicRoutes // 要在嵌套的出口中渲染组件，需要在 VueRouter 的参数中使用 children 配置
  },
  {
    path: '/router',
    name: 'Router',
    component: Router,
    children: routerRoutes
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    // 有时候，同一个路径可以匹配多个路由，此时，匹配的优先级就按照路由的定义顺序：路由定义得越早，优先级就越高
    path: '/user-*', // 常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配特定前缀的路径，可以使用通配符 *
    component: NotFound // 路径为 /user-admin 时，this.$route.params.pathMatch 为 admin
  },
  {
    path: '*', // 常规参数只会匹配被 / 分隔的 URL 片段中的字符。如果想匹配任意路径，可以使用通配符 *
    component: NotFound // 路径为 /test-not-found 时，this.$route.params.pathMatch 为 /test-not-found
  }
]
