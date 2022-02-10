import { createApp, Plugin } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

// 开发插件
const MyPlugin: Plugin = {
  install(app, options) {
    console.log('MyPlugin install options', options)
    // 全局 mixin
    app.mixin({
      // data() {
      //   return {
      //     globalMsg: '我是全局 mixin 消息'
      //   }
      // },
      methods: {
        globalTest() {
          console.log('globalTest')
        }
      }
    })

    // 添加实例属性，其中一个组件里修改后不会影响其他组件实例里的值；并且在同一个组件内部也是非响应式的
    app.config.globalProperties.$customGlobalMsg1 = '我是全局自定义属性消息1'
  }
}
// 使用插件
const app = createApp(App).use(store).use(router).use(MyPlugin, { p1: '参数1' })

// 全局 mixin
app.mixin({
  data() {
    return {
      globalMsg: '我是全局 mixin 消息'
    }
  }
  // methods: {
  //   globalTest() {
  //     console.log('globalTest')
  //   }
  // }
})

// 注册一个全局自定义指令 `v-globalFocus`
app.directive('globalFocus', {
  // 当被绑定的元素挂载到 DOM 中时……
  mounted(el) {
    // 聚焦元素
    el.focus()
  }
})

app.mount('#app')
