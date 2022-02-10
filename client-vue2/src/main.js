import Vue from 'vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(ElementUI)

Vue.config.productionTip = false

// 开发插件
const MyPlugin = {
  install(Vue, options) {
    console.log('MyPlugin install options', options)
    // 全局 mixin
    Vue.mixin({
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
    Vue.prototype.$customGlobalMsg1 = '我是全局自定义属性消息1'
  }
}
// 使用插件
Vue.use(MyPlugin, { p1: '参数1' })

// 全局 mixin
Vue.mixin({
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
Vue.directive('globalFocus', {
  // 当被绑定的元素插入到 DOM 中时……
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
