<template>
  <div>
    <h1>NotFound</h1>
    <!-- 当使用一个通配符时，$route.params 内会自动添加一个名为 pathMatch 参数。它包含了 URL 通过通配符被匹配的部分 -->
    {{ $route.params.pathMatch }}
  </div>
</template>
<script>
export default {
  created() {
    console.log('访问路由器', this.$router)
    console.log('访问当前路由', this.$route)
  }
}
</script>
