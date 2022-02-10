import { RouteRecordRaw } from 'vue-router'

import Counter from '../views/Vuex/Counter.vue'
import Nested from '../views/Vuex/Nested.vue'

const routes: RouteRecordRaw[] = [
  {
    // 默认情况下 Vuex/index.vue 出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由
    path: '',
    component: Counter // 直接指定 Counter 组件或者重定向
  },
  {
    path: 'counter',
    name: 'Counter',
    component: Counter
  },
  {
    path: 'nested',
    name: 'Nested',
    component: Nested
  },
  {
    path: ':pathMatch(.*)*',
    redirect: {
      name: 'Counter'
    }
  }
]

export default routes
