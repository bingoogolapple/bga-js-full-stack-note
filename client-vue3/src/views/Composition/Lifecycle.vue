<template>
  <div>
    <h4>生命周期</h4>
    <input v-model="message" />
    <div ref="testLifecycle" id="test-lifecycle">
      <span>{{ message }}</span>
    </div>
  </div>
</template>

<script>
import {
  ref,
  watchEffect,
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onActivated,
  onDeactivated,
  onBeforeUnmount,
  onUnmounted,
  onErrorCaptured,
  onRenderTracked,
  onRenderTriggered,
  nextTick
} from 'vue'

export default {
  // 因为 setup 是围绕 beforeCreate 和 created 生命周期钩子运行的，所以不需要显式地定义它们。换句话说，在这些钩子中编写的任何代码都应该直接在 setup 函数中编写
  setup() {
    console.log(`Lifecycle setup`)

    const message = ref('我是测试消息')
    // 模板引用 https://v3.cn.vuejs.org/guide/composition-api-template-refs.html
    const testLifecycle = ref(null)
    watchEffect(() => {
      // 默认情况下会执行两次，首次是 null
      console.log(
        'Lifecycle watchEffect not post testLifecycle',
        testLifecycle.value
      )
    })
    // 用 flush: 'post' 选项来定义，这将在 DOM 更新后运行副作用，确保模板引用与 DOM 保持同步，并引用正确的元素
    watchEffect(
      () => {
        console.log(
          'Lifecycle watchEffect post testLifecycle',
          testLifecycle.value
        )
      },
      { flush: 'post' }
    )

    onBeforeMount(() => {
      // 在挂载开始之前（组件内容被渲染到页面之前）被调用：相关的 render 函数首次被调用，该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onBeforeMount`)
    })
    onMounted(() => {
      // 实例被挂载之后（组件内容被渲染到页面之后）被调用，该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onMounted`)
      // 注意 mounted 不会保证所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以在 mounted 内部使用 $nextTick
      nextTick(function () {
        // 仅在渲染整个视图之后运行的代码
        console.log('Lifecycle onMounted nextTick 整个视图渲染完毕')
      })
    })
    onBeforeUpdate(() => {
      // 数据更新时调用，发生在虚拟 DOM 打补丁之前。这里适合在更新之前访问现有的 DOM，比如手动移除已添加的事件监听器。该钩子在服务器端渲染期间不被调用，因为只有初次渲染会在服务端进行。
      console.log(
        `Lifecycle onBeforeUpdate ${message.value} | ${
          document.getElementById('test-lifecycle').innerHTML
        } | ${testLifecycle.value.innerHTML}`
      )
    })
    onUpdated(() => {
      // 由于数据更改导致的虚拟 DOM 重新渲染和打补丁，在这之后会调用该钩子。当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作。然而在大多数情况下，你应该避免在此期间更改状态。如果要相应状态改变，通常最好使用计算属性或侦听器取而代之。该钩子在服务器端渲染期间不被调用
      console.log(
        `Lifecycle onUpdated ${message.value} | ${
          document.getElementById('test-lifecycle').innerHTML
        } | ${testLifecycle.value.innerHTML}`
      )
      // 注意，updated 不会保证所有的子组件也都一起被重绘。如果你希望等到整个视图都重绘完毕，可以在 updated 里使用 $nextTick
      nextTick(function () {
        // 仅在渲染整个视图之后运行的代码
        console.log('Lifecycle onUpdated nextTick 整个视图渲染完毕')
      })
    })
    onActivated(() => {
      // 被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onActivated`)
    })
    onDeactivated(() => {
      // 被 keep-alive 缓存的组件停用时调用。该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onDeactivated`)
    })
    onBeforeUnmount(() => {
      // 在卸载组件实例之前调用。在这个阶段，实例仍然是完全正常的。该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onBeforeUnmount`)
    })
    onUnmounted(() => {
      // 卸载组件实例后调用。调用此钩子时，组件实例的所有指令都被解除绑定，所有事件侦听器都被移除，所有子组件实例被卸载。该钩子在服务器端渲染期间不被调用
      console.log(`Lifecycle onUnmounted`)
    })
    onErrorCaptured((err, vm, info) => {
      // 当捕获一个来自子孙组件的错误时被调用。此钩子可以返回 false 以阻止该错误继续向上传播
      console.log(`Lifecycle onErrorCaptured ${err} ${vm} ${info}`)
    })
    onRenderTracked(({ key, target, type }) => {
      // 跟踪虚拟 DOM 重新渲染时调用。钩子接收 debugger event 作为参数。此事件告诉你哪个操作跟踪了组件以及该操作的目标对象和键
      console.log(
        `Lifecycle onRenderTracked ${type} ${key} ${JSON.stringify(target)}`
      )
    })
    onRenderTriggered(({ key, target, type }) => {
      // 当虚拟 DOM 重新渲染被触发时调用。和 renderTracked 类似，接收 debugger event 作为参数。此事件告诉你是什么操作触发了重新渲染，以及该操作的目标对象和键
      console.log(
        `Lifecycle onRenderTriggered ${type} ${key} ${JSON.stringify(target)}`
      )
    })

    return {
      message,
      testLifecycle
    }
  }
}
</script>

<style scoped lang="less"></style>
