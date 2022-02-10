<template>
  <div>
    <h4>动态路由匹配</h4>
    <div>username: {{ username }}</div>
    <div>postId: {{ postId }}</div>
    <div>qp1: {{ qp1 }}</div>
    <button @click="goBack">后退</button>
    <button @click="forward">前进</button>
  </div>
</template>

<script>
export default {
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    },
    forward() {
      this.$router.go(1)
    }
  },
  computed: {
    username() {
      return this.$route.params.username
    },
    postId() {
      return this.$route.params.post_id
    },
    qp1() {
      return this.$route.query.qp1
    }
  },
  watch: {
    /**
     * 提醒一下，当使用路由参数（包括路径参数和查询参数）时，例如从 /user/foo 导航到 /user/bar，原来的组件实例会被复用。
     * 因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。
     * 不过，这也意味着组件的生命周期钩子不会再被调用。
     *
     * 复用组件时，想对路由参数的变化作出响应的话，方式1：可以简单地 watch (监测变化) $route 对象
     */
    $route(to, from) {
      console.log('watch：路由参数方式变化', to, from)
    }
  },
  // 复用组件时，想对路由参数的变化作出响应的话，方式2：使用导航守卫，会先于 watch 被调用
  beforeRouteUpdate(to, from, next) {
    console.log('导航守卫：路由参数方式变化', to, from)
    next()
  },
  created() {
    console.log('访问路由器', this.$router)
    console.log('访问当前路由', this.$route)
  }
}
</script>
