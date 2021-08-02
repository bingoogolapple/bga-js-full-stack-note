<template>
  <div class="router">
    <div>
      <!-- 要指定全路径，或者通过 name 来指定 -->
      <router-link
        to="/router/dynamic/user/bingoogolapple/post/11?qp1=我是查询参数值1"
        >to 字符串：动态路由参数</router-link
      >
      <!-- 如果提供了 path，params 会被忽略，query 不会被忽略，并且 query 会覆盖 path 中的查询参数 -->
      <router-link
        :to="{
          path: `/router/dynamic/user/BGA/post/${second}?qp1=我是`,
          query: { qp1: '我是查询参数值2' }
        }"
        >to 对象 path：动态路由参数</router-link
      >
      <router-link
        :to="{
          name: 'Dynamic',
          params: { username: 'B', post_id: 33 },
          query: { qp1: '我是查询参数值3' }
        }"
        >to 对象 name：动态路由参数</router-link
      >
      <router-link to="/router/componentParam/boolean/11?qp1=我是查询参数值1"
        >测试布尔模式路由组件参数</router-link
      >
      <router-link to="/router/componentParam/obj/22?qp1=我是查询参数值2"
        >测试对象模式路由组件参数</router-link
      >
      <router-link to="/router/componentParam/method/33?qp1=我是查询参数值3"
        >测试函数模式路由组件参数</router-link
      >
      <router-link to="/router/nameRouterView/emails"
        >嵌套命名视图 emails</router-link
      >
      <router-link to="/router/nameRouterView/profile"
        >嵌套命名视图 profile</router-link
      >
      <button @click="pushStr">push 字符串：动态路由参数</button>
      <button @click="pushObjPath">push 对象 path：动态路由参数</button>
      <button @click="pushObjName">push 对象 name：动态路由参数</button>
      <button @click="replaceStr">replace 字符串：动态路由参数</button>
      <button @click="replaceObjPath">replace 对象 path：动态路由参数</button>
      <button @click="replaceObjName">replace 对象 name：动态路由参数</button>
    </div>
    <div>
      <h2>Roter</h2>
      <!-- 一个被渲染组件同样可以包含自己的嵌套 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Router',
  data() {
    return {
      second: 2
    }
  },
  methods: {
    pushStr() {
      // 如果当前已经在该路径了，并且没有指定第三个回调参数 onAbort 的话，再次 push 时控制台会报错 NavigationDuplicated: Avoided redundant navigation to current location
      this.$router.push(
        '/router/dynamic/user/bingoogolapple/post/11?qp1=我是查询参数值1'
      )
    },
    pushObjPath() {
      // 如果提供了 path，params 会被忽略，query 不会被忽略，并且 query 会覆盖 path 中的查询参数
      this.$router.push(
        {
          path: `/router/dynamic/user/BGA/post/${this.second}?qp1=我是`,
          query: { qp1: '我是查询参数值2' }
        },
        route => {
          // 将会在导航成功完成（在所有的异步钩子被解析之后）的时候进行相应的调用
          // 在导航守卫 beforeRouteUpdate 执行之后，watch $route 执行之前执行
          console.log('onComplete', route)
        },
        errorMsg => {
          // 将会在导航终止（导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由）的时候进行相应的调用
          // 导航守卫 beforeRouteUpdate 执行之前执行
          console.log('onAbort', errorMsg)
        }
      )
    },
    pushObjName() {
      this.$router.replace({
        name: 'Dynamic',
        params: { username: 'B', post_id: 33 },
        query: { qp1: '我是查询参数值3' }
      })
    },
    replaceStr() {
      // 如果当前已经在该路径了，并且没有指定第三个回调参数 onAbort 的话，再次 replace 时控制台会报错 NavigationDuplicated: Avoided redundant navigation to current location
      this.$router.push(
        '/router/dynamic/user/bingoogolapple/post/11?qp1=我是查询参数值1'
      )
    },
    replaceObjPath() {
      // 如果提供了 path，params 会被忽略，query 不会被忽略，并且 query 会覆盖 path 中的查询参数
      this.$router.replace(
        {
          path: `/router/dynamic/user/BGA/post/${this.second}?qp1=我是`,
          query: { qp1: '我是查询参数值2' }
        },
        route => {
          // 将会在导航成功完成（在所有的异步钩子被解析之后）的时候进行相应的调用
          // 在导航守卫 beforeRouteUpdate 执行之后，watch $route 执行之前执行
          console.log('onComplete', route)
        },
        errorMsg => {
          // 将会在导航终止（导航到相同的路由、或在当前导航完成之前导航到另一个不同的路由）的时候进行相应的调用
          // 导航守卫 beforeRouteUpdate 执行之前执行
          console.log('onAbort', errorMsg)
        }
      )
    },
    replaceObjName() {
      this.$router.replace({
        name: 'Dynamic',
        params: { username: 'B', post_id: 33 },
        query: { qp1: '我是查询参数值3' }
      })
    }
  }
}
</script>

<style scoped lang="less">
.router {
  display: flex;
  :first-child {
    flex: 0 0 230px;
    a {
      display: block;
      padding: 10px 0px;
      color: #2c3e50;

      &.router-link-active {
        color: #42b983;
      }
    }
    button {
      margin: 4px 0;
    }
  }
  :last-child {
    flex-grow: 1;
  }
}
</style>
