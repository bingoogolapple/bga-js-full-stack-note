<template>
  <div class="component-two">
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
    <div v-bind="$attrs">msg：{{ msg }}</div>
    <div>
      compositionProvideMsg：{{ compositionProvideMsg }}
      <button @click="handleChangeCompositionProvideMsg">
        handleChangeCompositionProvideMsg
      </button>
    </div>
    <div>属性：{{ p1 }} | {{ p2 }} | {{ isPublished }}</div>
    <div>
      setup 返回的属性：{{ p1SetupNoResponsive }} | {{ p1Setup }} |
      {{ p2Setup }} |
      {{ isPublishedSetup }}
    </div>
    <div>
      noneProp1：{{ noneProp1 }} $attrs.noneProp1：{{ $attrs.noneProp1 }}
    </div>
    <!-- 使用 kebab-case 的事件名 -->
    <button v-on:click="handleOnNoParam">无参</button>
    <button v-on:click="handleOnParam('我是参数1')">有参</button>
    <!-- 一个组件上的 v-model 默认会利用名为 modelValue 的 prop 和名为 update:modelValue 的事件 -->
    <!-- 为了在自定义组件上使用 v-model 进行双向绑定，需将其 modelValue attribute
      绑定到一个名叫 modelValue 的 prop 上，在其 update:modelValue
      事件被触发时，将新的值通过自定义的 update:modelValue 事件抛出 -->
    <input v-bind:value="modelValue" v-on:input="handleUpdateModelValue" />
  </div>
</template>

<script>
import { toRefs, toRef, reactive, inject } from 'vue'

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
  // setup 在 beforeCreate 之前被执行，不能通过 this 访问实例
  // 在 setup 中你应该避免使用 this，因为它不会找到组件实例。setup 的调用发生在 data property、computed property 或 methods 被解析之前，所以它们无法在 setup 中被获取
  // props 是响应式的，当传入新的 prop 时，它将被更新
  // context 是一个普通的 JavaScript 对象，也就是说，它不是响应式的，这意味着你可以安全地对 context 使用 ES6 解构
  setup(props, context) {
    console.log('ComponentTwo steup', props, context)

    // 因为 props 是响应式的，你不能使用 ES6 解构，也不能直接返回 props.p1，它会消除 prop 的响应性
    // 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
    const { p1, p2, isPublished } = toRefs(props)
    // 如果 p1 是可选的 prop（这里的可选是指没有在组件本身的 props 中声明），则传入的 props 中可能没有 p1。在这种情况下，toRefs 将不会为 p1 创建一个 ref（没有在 props 中声明 p1，但使用时有传入 p1 也不会创建 p1, p1 本身就是 undefined，不能通过 p1.value 获取值）。你需要使用 toRef 替代它
    const p1ToRef = toRef(props, 'p1')
    // console.log('p1:', p1, 'p1ToRef:', p1ToRef, 'p2:', p2)

    const { attrs, slots, emit, expose } = context
    // attrs 是响应式的，但内部属性不是响应式的，所以解构 attrs 的话也需要用 toRefs
    console.log('attrs', attrs)
    const { noneProp1 } = toRefs(attrs)

    console.log('slots', slots)

    const handleOnNoParam = () => {
      emit('on-no-param')
    }

    const handleOnParam = p1 => {
      emit('on-param', p1)
    }

    const todos = reactive([
      { id: 1, text: '学习 Vue' },
      { id: 2, text: '整个牛项目' }
    ])

    // 第二个参数可选，表示默认值
    const compositionProvideMsg = inject(
      'compositionProvideMsg',
      '我是 compositionProvideMsg 默认值'
    )
    const changeCompositionProvideMsgCallback = inject(
      'changeCompositionProvideMsgCallback'
    )
    const handleChangeCompositionProvideMsg = () => {
      // 即使外部传入的是响应式的也不推荐这样直接修改全局的 inject，而是应该通过调用注入的回调方法来修改
      // compositionProvideMsg.value = '我是修改后的 compositionProvideMsg'
      changeCompositionProvideMsgCallback('我是修改后的 compositionProvideMsg')
    }

    const handleUpdateModelValue = event => {
      let value = event.target.value
      console.log('handleUpdateModelValue modelModifiers', props.modelModifiers)
      if (props.modelModifiers.uppercase) {
        value = value.toUpperCase()
      }
      emit('update:modelValue', value)
    }

    return {
      p1SetupNoResponsive: props.p1,
      p1Setup: p1,
      p2Setup: p2,
      isPublishedSetup: isPublished,
      noneProp1,
      handleOnNoParam,
      handleOnParam,
      todos,
      compositionProvideMsg,
      handleChangeCompositionProvideMsg,
      handleUpdateModelValue
    }
  },
  beforeCreate() {
    console.log('ComponentTwo beforeCreate')
  }
}
</script>

<style scoped lang="less">
.component-two {
  border: 1px solid #42b983;
}
</style>
