<template>
  <div class="component-one">
    <!-- 父组件里调用的数据属性使用的都是父组件里的数据，子组件里调用的数据属性使用的都是子组件里的数据 -->
    <slot name="header"><div>我是默认 header</div></slot>
    <!-- 插槽名 name(可选，默认值是 default) -->
    <slot><div>我是默认插槽内容</div></slot>
    <slot name="footer"><div>我是默认 footer</div></slot>
    <ul>
      <!-- 作用域插槽，父组件使用带有插槽的子组件，子组件传递参数给父组件在插槽中使用 -->
      <slot
        name="todoList"
        v-for="(todo, index) of todos"
        :todoItem="todo"
        :todoIndex="index"
      >
        <li :key="todo.id">默认条目 {{ index }} - {{ todo.text }}</li>
      </slot>
    </ul>
    <!-- 这种方式 Vue2 中能透传多余属性，不能透传 style；Vue3 中能透传多余属性和 style -->
    <div v-bind="$attrs">{{ msg }}</div>
    <div>{{ message }}</div>
    <div>属性：{{ p1 }} | {{ p2 }} | {{ isPublished }}</div>
    <!-- 使用 kebab-case 的事件名 -->
    <button v-on:click="$emit('on-no-param')">无参</button>
    <button v-on:click="$emit('on-param', '我是参数1')">有参</button>
    <!-- 一个组件上的 v-model 默认会利用名为 modelValue 的 prop 和名为 update:modelValue 的事件 -->
    <!-- 为了在自定义组件上使用 v-model 进行双向绑定，需将其 modelValue attribute
      绑定到一个名叫 modelValue 的 prop 上，在其 update:modelValue
      事件被触发时，将新的值通过自定义的 update:modelValue 事件抛出 -->
    <input v-bind:value="modelValue" v-on:input="handleUpdateModelValue" />
  </div>
</template>

<script>
// v-model 从 Vue2 迁移到 Vue3 https://v3.cn.vuejs.org/guide/migration/v-model.html#_3-x-%E8%AF%AD%E6%B3%95
export default {
  // 继承多余的未定义的参数，默认值为 true；Vue2 中会透传 style，Vue3 中不会透传 style
  inheritAttrs: false,
  // 注意在 JavaScript 中对象和数组是通过引用传入的，所以对于一个数组或对象类型的 prop 来说，在子组件中改变变更这个对象或数组本身将会影响到父组件的状态
  // String、Number、Boolean、Array、Object、Date、Function、Symbol、Promise、其他构造函数
  props: {
    msg: String,
    modelValue: String,
    modelModifiers: {
      default: () => ({})
    },
    p1: {
      type: Number,
      validator: value => {
        return value < 100
      },
      default: 10
      // default 也可以是函数
      // default: () => {
      //   return 10
      // }
    },
    p2: {
      type: Number,
      validator: value => {
        return value < 100
      },
      required: true
    },
    isPublished: {
      type: Boolean,
      required: true
    }
  },
  // emits 可以是数组或对象，从组件触发自定义事件，emits 可以是简单的数组，也可以是对象，后者允许配置事件验证
  // emits: ['update:modelValue', 'on-no-param', 'on-param'],
  emits: {
    // 没有验证函数
    'update:modelValue': null,
    'on-no-param': null,
    // 带有验证函数
    'on-param': p => {
      if (p.length < 3) {
        return false
      }
      return true
    }
  },
  // 组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝
  data() {
    return {
      // 外部 p1、p2、isPublished 改变后组件内部 data 中的 message 不会跟着改变
      message: `我是组件中的消息 ${this.p1} ${this.p2} ${this.isPublished}`,
      todos: [
        { id: 0, text: '学习 JavaScript' },
        { id: 1, text: '学习 Vue' },
        { id: 2, text: '整个牛项目' }
      ]
    }
  },
  mounted() {
    // {duoyude: '多余的参数', style: {…}, __vInternal: 1, onOnNoParam: ƒ, onOnParam: ƒ}
    console.log('mounted', this.$attrs)
  },
  methods: {
    handleUpdateModelValue(event) {
      let value = event.target.value
      console.log('handleUpdateModelValue', this.modelModifiers)
      if (this.modelModifiers.uppercase) {
        value = value.toUpperCase()
      }
      this.$emit('update:modelValue', value)
    }
  }
}
</script>

<style scoped lang="less">
.component-one {
  border: 1px solid #42b983;
}
</style>
