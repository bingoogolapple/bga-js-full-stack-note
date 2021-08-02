import Home from '../views/Home.vue'
import Basic from '../views/Basic/index.vue'
import Vuex from '../views/Vuex.vue'
import Router from '../views/Router.vue'

import basicRoutes from './basic-routes'

// 定义路由，每个路由应该映射一个组件
export default [
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/basic',
    name: 'Basic',
    component: Basic,
    children: basicRoutes
  },
  {
    path: '/vuex',
    name: 'Vuex',
    component: Vuex
  },
  {
    path: '/router',
    name: 'Router',
    component: Router
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '*',
    redirect: '/home'
  }
]
