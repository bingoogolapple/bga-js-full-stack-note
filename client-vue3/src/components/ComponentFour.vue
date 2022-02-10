<template>
  <div class="component-four">
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
    <div>p1SetupNoResponsive：{{ p1SetupNoResponsive }}</div>
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

    <div>
      <h5>Vuex</h5>
      <div>
        countNoResponsive:{{ countNoResponsive }} | countResponsive:{{
          countResponsive
        }}
      </div>
      <!-- 也可以直接在模板中通过 store 和 setup script 中定义的 state 来直接获取数据，获取到的数据是响应式的 -->
      <div>
        state.count:{{ state.count }} | store.state.count:{{
          store.state.count
        }}
        | $store.state.count:{{ $store.state.count }}
      </div>
      <div>store.state.counter.count:{{ store.state.counter.count }}</div>
      <button v-on:click="handleIncrementCount">handleIncrementCount</button>
      <button v-on:click="handleAsyncActionA">handleAsyncActionA</button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  // 继承多余的未定义的参数，默认值为 true；Vue2 中会透传 style，Vue3 中不会透传 style
  inheritAttrs: false
}
</script>

<script lang="ts" setup>
// <script setup> 可以和普通的 <script> 一起使用，但是必须写到普通的 <script> 后面，并且两者都必须指定 lang="ts"
import {
  defineProps,
  withDefaults,
  defineEmits,
  toRefs,
  toRef,
  reactive,
  inject,
  useSlots,
  useAttrs
} from 'vue'

import { useStore } from 'vuex'
import { RootState, INCREMENT } from '../store'

interface IProps {
  msg: string
  modelValue: string
  modelModifiers: any
  p1?: number
  p2: number
  isPublished: boolean
}
// const props = defineProps<IProps>()
// 通过 withDefaults 来指定默认值
// TODO 改成 TS 后如何做属性参数校验？
const props = withDefaults(defineProps<IProps>(), {
  modelModifiers: {},
  p1: 10
})

interface IEmits {
  (e: 'update:modelValue', value: string): void
  (e: 'on-no-param'): void
  (e: 'on-param', p: string): void
}
// TODO 改成 TS 后如何做 emit 参数校验？
const emit = defineEmits<IEmits>()

// 因为 props 是响应式的，你不能使用 ES6 解构，也不能直接返回 props.p1，它会消除 prop 的响应性
// 如果需要解构 prop，可以在 setup 函数中使用 toRefs 函数来完成此操作
const { p1, p2, isPublished } = toRefs(props)
console.log('p1:', p1, 'p2:', p2, 'isPublished:', isPublished)

// eslint-disable-next-line
const p1SetupNoResponsive = props.p1

// 如果 p1 是可选的 prop（这里的可选是指没有在组件本身的 props 中声明），则传入的 props 中可能没有 p1。在这种情况下，toRefs 将不会为 p1 创建一个 ref（没有在 props 中声明 p1，但使用时有传入 p1 也不会创建 p1, p1 本身就是 undefined，不能通过 p1.value 获取值）。你需要使用 toRef 替代它
const p1ToRef = toRef(props, 'p1')
// console.log('p1:', p1, 'p1ToRef:', p1ToRef, 'p2:', p2)

const slots = useSlots()
const attrs = useAttrs()
// attrs 是响应式的，但内部属性不是响应式的，所以解构 attrs 的话也需要用 toRefs
console.log('attrs', attrs)
const { noneProp1 } = toRefs(attrs)

console.log('slots', slots)

const handleOnNoParam = () => {
  emit('on-no-param')
}

const handleOnParam = (p1: string) => {
  emit('on-param', p1)
}

const todos = reactive([
  { id: 1, text: '学习 Vue' },
  { id: 2, text: '整个牛项目' }
])

// 第二个参数可选，表示默认值
const compositionProvideMsg = inject<string>(
  'compositionProvideMsg',
  '我是 compositionProvideMsg 默认值'
)
const changeCompositionProvideMsgCallback = inject<any>(
  'changeCompositionProvideMsgCallback'
)
const handleChangeCompositionProvideMsg = () => {
  // 即使外部传入的是响应式的也不推荐这样直接修改全局的 inject，而是应该通过调用注入的回调方法来修改
  // compositionProvideMsg.value = '我是修改后的 compositionProvideMsg'
  changeCompositionProvideMsgCallback('我是修改后的 compositionProvideMsg')
}

const handleUpdateModelValue = (event: any) => {
  let value = event.target.value
  console.log('handleUpdateModelValue modelModifiers', props.modelModifiers)
  if (props.modelModifiers.uppercase) {
    value = value.toUpperCase()
  }
  emit('update:modelValue', value)
}

// Vuex
const store = useStore<RootState>()
const state = store.state
// 这种方式响应式会被移除
const countNoResponsive = store.state.count
// 通过 toRefs 保留响应式
const { count: countResponsive } = toRefs(store.state)
const handleIncrementCount = () => {
  store.commit(INCREMENT)
}
const handleAsyncActionA = () => {
  store.dispatch('asyncActionA').then(amount => {
    console.log(`asyncActionA amount is ${amount}`)
  })
}
</script>

<style scoped lang="less">
.component-four {
  border: 1px solid #42b983;
}
</style>
