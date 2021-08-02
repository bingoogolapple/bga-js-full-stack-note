<template>
  <div class="component-one">
    <slot />
    <div>{{ msg }}</div>
    <div>{{ message }}</div>
    <!-- 使用 kebab-case 的事件名 -->
    <button v-on:click="$emit('on-no-param')">无参</button>
    <button v-on:click="$emit('on-param', '我是参数1')">有参</button>
    <!-- 一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件 -->
    <!-- 为了在自定义组件上使用 v-model 进行双向绑定，需将其 value attribute
      绑定到一个名叫 value 的 prop 上，在其 input
      事件被触发时，将新的值通过自定义的 input 事件抛出 -->
    <input
      v-bind:value="value"
      v-on:input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: 'ComponentOne',
  // 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态
  props: {
    msg: String,
    value: String
  },
  // 组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
  data() {
    return {
      message: '我是组件中的消息'
    }
  }
}
</script>

<style scoped lang="less">
.component-one {
  border: 1px solid #42b983;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
