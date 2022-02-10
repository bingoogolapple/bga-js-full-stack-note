<template>
  <div class="composition">
    <div>
      <!-- 要指定全路径，或者通过 name 来指定 -->
      <router-link to="/composition/exportSetup"
        >export 方式的 setup 函数</router-link
      >
      <router-link to="/composition/scriptSetup"
        >script 方式的 setup 函数</router-link
      >
      <router-link to="/composition/ComputedWatch"
        >计算属性与侦听器</router-link
      >
      <router-link to="/composition/lifecycle">生命周期</router-link>
      <router-link to="/composition/todoList">TodoList</router-link>
    </div>
    <div>
      <h2>Composition</h2>
      <!-- 一个被渲染组件同样可以包含自己的嵌套 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="less">
.composition {
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
