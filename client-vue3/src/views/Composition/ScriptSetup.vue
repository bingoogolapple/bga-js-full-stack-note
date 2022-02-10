<template>
  <div>
    <h4>script 方式的 setup 函数</h4>
    <button @click="handleUpdatePObj">handleUpdatePObj | {{ pObj.p1 }}</button>
    <div>
      p1Responsive:{{ p1Responsive }} p1NoResponsive:{{ p1NoResponsive }}
    </div>
    <div>readonlyPObj.p1:{{ readonlyPObj.p1 }}</div>
    <div>p1ToRef:{{ p1ToRef }} pObj.p1ToRef:{{ pObj.p1ToRef }}</div>
    <div>compositionProvideMsg：{{ compositionProvideMsg }}</div>
    <!-- update:modelValue 事件内联写法时通过 $event 来获取参数 -->
    <ComponentThree
      msg="ComponentThree：我是组件外部的消息"
      v-on:on-no-param="onNoParam"
      v-on:on-param="onParam"
      :p1="pObj.p1"
      :p2="pObj.p2"
      :noneProp1="noneProp1"
      :isPublished="pObj.isPublished"
      v-bind:modelValue="searchText"
      @update:modelValue="searchText = $event"
    >
      <template v-slot:header>
        <div>我是自定义 header</div>
      </template>
      <template v-slot:default>
        <div>我是自定义插槽内容</div>
      </template>
      <template v-slot:footer>
        <div>我是自定义 footer</div>
      </template>
      <template v-slot:todoList="slotProps">
        <li>
          自定义条目 {{ slotProps.todoIndex }} - {{ slotProps.todoItem.text }}
        </li>
      </template>
    </ComponentThree>
    <ComponentFour
      msg="ComponentFour：我是组件外部的消息"
      @on-no-param="onNoParam"
      @on-param="onParam"
      v-bind="pObj"
      v-model.uppercase="searchText"
      :noneProp1="noneProp1"
    >
      <template v-slot:header>
        <div>我是自定义 header</div>
      </template>
      <template v-slot:default>
        <div>我是自定义插槽内容</div>
      </template>
      <template v-slot:footer>
        <div>我是自定义 footer</div>
      </template>
      <template v-slot:todoList="slotProps">
        <li>
          自定义条目 {{ slotProps.todoIndex }} - {{ slotProps.todoItem.text }}
        </li>
      </template>
    </ComponentFour>

    <CompositionRender level="1"></CompositionRender>
    <CompositionRender level="2">
      <!-- <template>
        <span>自定义内容</span>
      </template> -->
      <template #default="{ msg }">
        <div>自定义内容 | {{ msg }}</div>
      </template>
    </CompositionRender>
  </div>
</template>

<script setup>
// https://v3.cn.vuejs.org/api/sfc-script-setup.html
/*
1、要使用这个语法，需要将 setup attribute 添加到 <script> 代码块上；
2、里面的代码会被编译成组件 setup() 函数的内容。这意味着与普通的 <script> 只在「组件被首次引入」的时候执行一次不同，<script setup> 中的代码会在每次「组件实例被创建」的时候执行
3、当使用 <script setup> 的时候，任何在 <script setup> 声明的顶层的绑定 (包括变量，函数声明，以及 import 引入的内容) 都能在模板中直接使用
4、<script setup> 范围里的值也能被直接作为自定义组件的标签名使用；其 kebab-case 格式的 <my-component> 同样能在模板中使用。不过强烈建议使用 PascalCase 格式以保持一致性。同时也有助于区分原生的自定义元素
5、<script setup> 可以和普通的 <script> 一起使用，但是必须写到普通的 <script> 后面
*/

import { ref, reactive, readonly, toRefs, toRef, provide, watch } from 'vue'
import ComponentThree from '@/components/ComponentThree.vue'
import ComponentFour from '@/components/ComponentFour.vue'
import CompositionRender from '@/components/CompositionRender.vue'

// ref 处理基础类型的数据
const searchText = ref('')
const noneProp1 = ref('我是 None-Props')
// reactive 处理非基础类型的数据
const pObj = reactive({
  p1: 60,
  p2: 90,
  isPublished: true
})

// 使用 readonly 转换为非响应式对象后，修改属性时控制台会有警告
const readonlyPObj = readonly(pObj)
setTimeout(() => {
  // readonlyPObj.p1 += 1
}, 2000)

// 结构后悔变成非响应式数据，如果需要结构可以使用 toRefs 函数来保留响应式
const { p1: p1NoResponsive } = pObj
const { p1: p1Responsive, p1ToRefs } = toRefs(pObj)

// 从 toRefs 中取属性时，如果不存在会是 undefined，可以通过 toRef 来动态添加响应式属性
console.log('p1ToRefs', p1ToRefs)
const p1ToRef = toRef(pObj, 'p1ToRef')
setTimeout(() => {
  p1ToRef.value = 30
  // 两种方式都可以修改新增的响应式属性
  // pObj.p1ToRef = 30
  console.log('toRef timeout pObj', pObj)
}, 2000)

setTimeout(() => {
  searchText.value = '222'
  pObj.p1 += 1
  noneProp1.value = '我是修改后的 None-Props'
}, 2000)

const onNoParam = () => {
  alert('无参')
}
const onParam = p1 => {
  alert(`有参 ${p1}`)
}
const handleUpdatePObj = () => {
  pObj.p1 += 1
}

// Provide & Inject https://v3.cn.vuejs.org/guide/composition-api-provide-inject.html
const compositionProvideMsg = ref('我是自定义 compositionProvideMsg 值')
// 要传入响应式的，不然修改后子组件不会刷新改数据；但不推荐在子组件中直接修改该响应式数据，推荐注入一个回调方法来在提供该数据的地方统一修改
// provide('compositionProvideMsg', compositionProvideMsg.value)
// 为了避免在子组件中直接修改数据，可以用 readonly 包一下
// provide('compositionProvideMsg', compositionProvideMsg)
provide('compositionProvideMsg', readonly(compositionProvideMsg))
// watch(compositionProvideMsg, newValue => {
//   console.log('监听到 compositionProvideMsg 发生变化', newValue)
// })
provide('changeCompositionProvideMsgCallback', newValue => {
  compositionProvideMsg.value = newValue
})
</script>

<style scoped lang="less"></style>
