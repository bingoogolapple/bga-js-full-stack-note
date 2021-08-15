<template>
  <div class="vuex">
    <div>
      <!-- 要指定全路径，或者通过 name 来指定 -->
      <router-link to="/vuex/counter">计数器</router-link>
      <router-link to="/vuex/nested">嵌套模块</router-link>
    </div>
    <div>
      <h2>Vuex</h2>
      <!-- 一个被渲染组件同样可以包含自己的嵌套 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Vuex'
}
</script>

<style scoped lang="less">
.vuex {
  display: flex;
  :first-child {
    flex: 0 0 150px;
    a {
      display: block;
      padding: 10px 0px;
      color: #2c3e50;

      &.router-link-active {
        color: #42b983;
      }
    }
  }
  :last-child {
    flex-grow: 1;
  }
}
</style>
