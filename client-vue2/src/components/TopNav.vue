<template>
  <div id="nav">
    <!--
        使用 router-link 组件来导航，通过传入 `to` 属性指定链接，默认会被渲染成一个 `<a>` 标签
        当 <router-link> 对应的路由匹配成功，将自动设置 class 属性值 .router-link-active，但该属性不能精确匹配
        .outer-link-exact-active 可以精确匹配
      -->
    <router-link to="/home">Home</router-link> |
    <router-link to="/basic">Basic</router-link> |
    <router-link to="/vuex">Vuex</router-link> |
    <router-link to="/router">Router</router-link> |
    <router-link to="/about">About</router-link>
  </div>
</template>

<script>
export default {
  name: 'TopNav'
}
</script>

<style lang="less">
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-active {
      color: #42b983;
    }
  }
}
</style>
