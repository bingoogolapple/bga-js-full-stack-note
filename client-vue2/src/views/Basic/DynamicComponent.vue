<template>
  <div>
    <h4>
      动态组件：根据数据的变化，结合 component 标签来随之动态的切换组件的显示
    </h4>
    <button @click="switchLoginType">切换登录类型</button>
    <div>没有被 keep-alive 包裹：</div>
    <component :is="loginType" message="无 keep-alive" />
    <!-- 动态组件要用 keep-alive 包裹一下，否则切换后数据会被清空 -->
    <div>
      有被 keep-alive 包裹：
      <keep-alive>
        <component :is="loginType" message="有 keep-alive" />
      </keep-alive>
    </div>
    <h4>异步组件</h4>
    <div>
      1
      <AsyncComponent1 />
    </div>
    <div>
      2
      <AsyncComponent2 />
    </div>
    <div>
      3
      <AsyncComponent3 />
    </div>
  </div>
</template>

<script>
// 动态组件 & 异步组件 https://cn.vuejs.org/v2/guide/components-dynamic-async.html

const AsyncComponent1 = () => import('@/components/TopNav.vue')
const AsyncComponent2 = resolve => {
  setTimeout(() => {
    require(['@/components/TopNav.vue'], resolve)
  }, 2000)
}
const AsyncComponent3 = () => ({
  // 需要加载的组件 (应该是一个 `Promise` 对象)
  component: import('@/components/TopNav.vue'),
  // 异步组件加载时使用的组件
  // loading: LoadingComponent,
  // 加载失败时使用的组件
  // error: ErrorComponent,
  // 展示加载时组件的延时时间。默认值是 200 (毫秒)
  delay: 2000,
  // 如果提供了超时时间且组件加载也超时了，
  // 则使用加载失败时使用的组件。默认值是：`Infinity`
  timeout: 3000
})

import EmailLogin from '@/components/EmailLogin.vue'
import UsernameLogin from '@/components/UsernameLogin.vue'
export default {
  components: {
    EmailLogin,
    UsernameLogin,
    AsyncComponent1,
    AsyncComponent2,
    AsyncComponent3
  },
  data() {
    return {
      loginType: 'email-login'
    }
  },
  methods: {
    switchLoginType() {
      this.loginType =
        this.loginType === 'email-login' ? 'username-login' : 'email-login'
    }
  }
}
/*
EmailLogin beforeCreate
EmailLogin created 无 keep-alive
EmailLogin beforeMount 无 keep-alive

EmailLogin beforeCreate
EmailLogin created 有 keep-alive
EmailLogin beforeMount 有 keep-alive

EmailLogin mounted 无 keep-alive

EmailLogin mounted 有 keep-alive
EmailLogin activated 有 keep-alive



UsernameLogin beforeCreate
UsernameLogin created 无 keep-alive
UsernameLogin beforeMount 无 keep-alive

EmailLogin beforeDestroy 无 keep-alive        --> Vue2 中不被 keep-alive 包裹时，beforeDestroy 和 destroyed 是连续的
EmailLogin destroyed 无 keep-alive

UsernameLogin mounted 无 keep-alive

UsernameLogin beforeCreate
UsernameLogin created 有 keep-alive
UsernameLogin beforeMount 有 keep-alive

EmailLogin deactivated 有 keep-alive
UsernameLogin mounted 有 keep-alive
UsernameLogin activated 有 keep-alive



EmailLogin beforeCreate
EmailLogin created 无 keep-alive
EmailLogin beforeMount 无 keep-alive

UsernameLogin beforeDestroy 无 keep-alive
UsernameLogin destroyed 无 keep-alive

EmailLogin mounted 无 keep-alive

UsernameLogin deactivated 有 keep-alive
EmailLogin activated 有 keep-alive



UsernameLogin beforeCreate 无 keep-alive
UsernameLogin created 无 keep-alive
UsernameLogin beforeMount 无 keep-alive

EmailLogin beforeDestroy 无 keep-alive
EmailLogin destroyed 无 keep-alive

UsernameLogin mounted 无 keep-alive

EmailLogin deactivated 有 keep-alive
UsernameLogin activated 有 keep-alive
*/
</script>
