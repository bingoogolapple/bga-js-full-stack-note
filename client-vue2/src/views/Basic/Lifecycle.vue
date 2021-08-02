<template>
  <div>
    <h4>生命周期</h4>
    <input v-model="message" />
  </div>
</template>

<script>
export default {
  name: 'Lifecycle',
  data() {
    return {
      message: '我是测试消息'
    }
  },
  // 不要在选项 property 或回调上使用箭头函数，因为箭头函数并没有 this，this 会作为变量一直向上级词法作用域查找
  // beforeCreate: function () {
  // 两种写法都可以
  beforeCreate() {
    // 在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用，此时还未初始化数据，message 为 undefined，messageVisibility 也为 undefined
    console.log(`beforeCreate ${this.message} ${this.messageVisibility}`)
  },
  created() {
    // 在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，property 和方法的运算，watch/event 事件回调
    console.log(`created ${this.message}`)
  },
  beforeMount() {
    // 在挂载开始之前被调用：相关的 render 函数首次被调用，该钩子在服务器端渲染期间不被调用
    console.log(`beforeMount ${this.message}`)
  },
  mounted() {
    // 实例被挂载后调用，该钩子在服务器端渲染期间不被调用
    console.log(`mounted ${this.message}`)
    // 注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 $nextTick
    this.$nextTick(function () {
      // 仅在渲染整个视图之后运行的代码
      console.log('mounted 整个视图渲染完毕')
    })
  },
  beforeUpdate() {
    // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
    console.log(`beforeUpdate ${this.message}`)
  },
  updated() {
    // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或侦听器取而代之。该钩子在服务器端渲染期间不被调用
    console.log(`updated ${this.message}`)
    // 注意，updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 $nextTick
    this.$nextTick(function () {
      // 仅在渲染整个视图之后运行的代码
      console.log('updated 整个视图渲染完毕')
    })
  },
  beforeDestroy() {
    // 组件销毁前
    console.log(`beforeDestroy ${this.message}`)
  },
  destroyed() {
    // 组件销毁完成
    console.log(`destroyed ${this.message}`)
  },
  // TODO 区分以下 v2 还是 v3
  activated() {
    // 被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用
    console.log(`activated ${this.message}`)
  },
  deactivated() {
    // 被 keep-alive 缓存的组件停用时调用。该钩子在服务器端渲染期间不被调用
    console.log(`deactivated ${this.message}`)
  },
  beforeUnmount() {
    // 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。该钩子在服务器端渲染期间不被调用
    console.log(`beforeUnmount ${this.message}`)
  },
  unmounted() {
    // 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。该钩子在服务器端渲染期间不被调用
    console.log(`unmounted ${this.message}`)
  },
  errorCaptured: (err, vm, info) => {
    // 当捕获一个来自子孙组件的错误时被调用。此钩子可以返回 false 以阻止该错误继续向上传播
    console.log(`errorCaptured ${err} ${vm} ${info}`)
  },
  renderTracked({ key, target, type }) {
    // 跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键
    console.log(`renderTracked ${key} ${target} ${type}`)
  },
  renderTriggered({ key, target, type }) {
    // 当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键
    console.log(`renderTriggered ${key} ${target} ${type}`)
  }
}
</script>
