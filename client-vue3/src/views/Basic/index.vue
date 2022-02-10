<template>
  <div class="basic">
    <div>
      <!-- 要指定全路径，或者通过 name 来指定 -->
      <router-link to="/basic/lifecycle">生命周期</router-link>
      <router-link :to="{ name: 'BindIf' }">数据绑定、条件渲染</router-link>
      <router-link to="/basic/form">表单输入绑定</router-link>
      <router-link to="/basic/for">列表渲染</router-link>
      <router-link to="/basic/classStyle">Class与Style绑定</router-link>
      <router-link to="/basic/transitionAnimate">过渡与动画</router-link>
      <router-link to="/basic/computedWatch">计算属性与侦听器</router-link>
      <router-link to="/basic/keyReuse">KeyReuse</router-link>
      <router-link to="/basic/event">Event</router-link>
      <router-link to="/basic/slotComponent">SlotComponent</router-link>
      <router-link to="/basic/dynamicComponent">DynamicComponent</router-link>
      <router-link to="/basic/mixin">Mixin 混入</router-link>
      <router-link to="/basic/directive">Directive 指令</router-link>
      <router-link to="/basic/teleport">Teleport 传送门</router-link>
      <router-link to="/basic/renderFunction">渲染函数</router-link>
    </div>
    <div>
      <h2>Basic</h2>
      <!-- 一个被渲染组件同样可以包含自己的嵌套 -->
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rootMsg: '我是根节点消息'
    }
  },
  // 要访问组件实例 property，我们需要将 provide 转换为返回对象的函数
  provide() {
    return {
      // 修改了 this.rootMsg 后，provide 里的 rootMsg 不会发生变化，孩子节点也不会刷新
      rootMsg: this.rootMsg
    }
  }
}
</script>

<style scoped lang="less">
.basic {
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
