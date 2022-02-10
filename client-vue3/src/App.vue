<template>
  <div id="app">
    <top-nav />
    <TopNav />
    <!-- 路由出口，路由匹配到的组件将渲染在这里 -->
    <router-view />
  </div>
</template>

<script>
import TopNav from '@/components/TopNav.vue'

export default {
  components: {
    TopNav
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
