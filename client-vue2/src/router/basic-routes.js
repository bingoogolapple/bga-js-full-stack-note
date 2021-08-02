import Lifecycle from '../views/Basic/Lifecycle.vue'
import BindIf from '../views/Basic/BindIf.vue'
import Form from '../views/Basic/Form.vue'
import For from '../views/Basic/For.vue'
import ClassStyle from '../views/Basic/ClassStyle.vue'
import ComputedWatch from '../views/Basic/ComputedWatch.vue'
import KeyReuse from '../views/Basic/KeyReuse.vue'
import Event from '../views/Basic/Event.vue'
import SlotComponent from '../views/Basic/SlotComponent.vue'

export default [
  {
    // 默认情况下 Basic/index.vue 出口是不会渲染任何东西，这是因为没有匹配到合适的子路由。如果你想要渲染点什么，可以提供一个空的子路由
    path: '',
    // component: Lifecycle, // 直接指定 Lifecycle 组件或者重定向
    redirect: {
      name: 'Lifecycle'
    }
  },
  {
    path: 'lifecycle', // 注意，以 / 开头的嵌套路径会被当作根路径。 这让你充分的使用嵌套组件而无须设置嵌套的路径
    name: 'Lifecycle',
    component: Lifecycle
  },
  {
    path: 'bindIf',
    name: 'BindIf',
    component: BindIf
  },
  {
    path: 'form',
    name: 'Form',
    component: Form
  },
  {
    path: 'for',
    name: 'For',
    component: For
  },
  {
    path: 'classStyle',
    name: 'ClassStyle',
    component: ClassStyle
  },
  {
    path: 'computedWatch',
    name: 'ComputedWatch',
    component: ComputedWatch
  },
  {
    path: 'keyReuse',
    name: 'KeyReuse',
    component: KeyReuse
  },
  {
    path: 'event',
    name: 'Event',
    component: Event
  },
  {
    path: 'slotComponent',
    name: 'SlotComponent',
    component: SlotComponent
  },
  {
    path: '*',
    redirect: {
      name: 'Lifecycle'
    }
  }
]
