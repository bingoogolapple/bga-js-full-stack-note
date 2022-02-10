import { RouteRecordRaw } from 'vue-router'
import ExportSetup from '../views/Composition/ExportSetup.vue'
import ScriptSetup from '../views/Composition/ScriptSetup.vue'
import ComputedWatch from '../views/Composition/ComputedWatch.vue'
import Lifecycle from '../views/Composition/Lifecycle.vue'
import TodoList from '../views/Composition/TodoList.vue'

const routes: RouteRecordRaw[] = [
  {
    // 默认情况下 Composition/index.vue 出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由
    path: '',
    // component: Setup, // 直接指定 Setup 组件或者重定向
    redirect: {
      name: 'ExportSetup'
    }
  },
  {
    path: 'exportSetup', // 注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
    name: 'ExportSetup',
    component: ExportSetup
  },
  {
    path: 'scriptSetup',
    component: ScriptSetup
  },
  {
    path: 'computedWatch',
    component: ComputedWatch
  },
  {
    path: 'lifecycle',
    component: Lifecycle
  },
  {
    path: 'todoList',
    component: TodoList
  },
  {
    path: ':pathMatch(.*)*',
    redirect: {
      name: 'ExportSetup'
    }
  }
]

export default routes
