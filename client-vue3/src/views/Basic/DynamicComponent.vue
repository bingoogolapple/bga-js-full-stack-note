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
// 动态组件 & 异步组件 https://v3.cn.vuejs.org/guide/component-dynamic-async.html

import { defineAsyncComponent } from 'vue'
const AsyncComponent1 = defineAsyncComponent(() =>
  import('@/components/TopNav.vue')
)
const AsyncComponent2 = defineAsyncComponent(
  () =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(import('@/components/TopNav.vue'))
      }, 2000)
    })
)
const AsyncComponent3 = defineAsyncComponent({
  // 工厂函数
  loader: () => import('@/components/TopNav.vue'),
  // 加载异步组件时要使用的组件
  // loadingComponent: LoadingComponent
  // 加载失败时要使用的组件
  // errorComponent: ErrorComponent,
  // 在显示 loadingComponent 之前的延迟 | 默认值：200（单位 ms）
  delay: 3000,
  // 如果提供了 timeout ，并且加载组件的时间超过了设定值，将显示错误组件
  // 默认值：Infinity（即永不超时，单位 ms）
  timeout: 3000,
  // 定义组件是否可挂起 | 默认值：true
  suspensible: false,
  /**
   *
   * @param {*} error 错误信息对象
   * @param {*} retry 一个函数，用于指示当 promise 加载器 reject 时，加载器是否应该重试
   * @param {*} fail  一个函数，指示加载程序结束退出
   * @param {*} attempts 允许的最大重试次数
   */
  onError(error, retry, fail, attempts) {
    if (error.message.match(/fetch/) && attempts <= 3) {
      // 请求发生错误时重试，最多可尝试 3 次
      retry()
    } else {
      // 注意，retry/fail 就像 promise 的 resolve/reject 一样：
      // 必须调用其中一个才能继续错误处理。
      fail()
    }
  }
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
EmailLogin beforeCreate 无 keep-alive
EmailLogin created 无 keep-alive
EmailLogin beforeMount 无 keep-alive

EmailLogin beforeCreate 有 keep-alive
EmailLogin created 有 keep-alive
EmailLogin beforeMount 有 keep-alive

EmailLogin mounted 无 keep-alive

EmailLogin mounted 有 keep-alive
EmailLogin activated 有 keep-alive



EmailLogin beforeUnmount 无 keep-alive        --> Vue2 中不被 keep-alive 包裹时，beforeUnmount 和 unmounted 不是连续的

UsernameLogin beforeCreate 无 keep-alive
UsernameLogin created 无 keep-alive
UsernameLogin beforeMount 无 keep-alive

UsernameLogin beforeCreate 有 keep-alive
UsernameLogin created 有 keep-alive
UsernameLogin beforeMount 有 keep-alive

EmailLogin unmounted 无 keep-alive
UsernameLogin mounted 无 keep-alive

EmailLogin deactivated 有 keep-alive
UsernameLogin mounted 有 keep-alive
UsernameLogin activated 有 keep-alive



UsernameLogin beforeUnmount 无 keep-alive

EmailLogin beforeCreate 无 keep-alive
EmailLogin created 无 keep-alive
EmailLogin beforeMount 无 keep-alive

UsernameLogin unmounted 无 keep-alive

EmailLogin mounted 无 keep-alive

UsernameLogin deactivated 有 keep-alive
EmailLogin activated 有 keep-alive



EmailLogin beforeUnmount 无 keep-alive

UsernameLogin beforeCreate 无 keep-alive
UsernameLogin created 无 keep-alive
UsernameLogin beforeMount 无 keep-alive

EmailLogin unmounted 无 keep-alive

UsernameLogin mounted 无 keep-alive

EmailLogin deactivated 有 keep-alive
UsernameLogin activated 有 keep-alive
*/
</script>
