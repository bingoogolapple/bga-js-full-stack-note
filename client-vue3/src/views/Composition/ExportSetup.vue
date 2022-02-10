<template>
  <div>
    <h4>export 方式的 setup 函数</h4>
    <button @click="handleUpdatePObj">handleUpdatePObj | {{ pObj.p1 }}</button>
    <div>
      p1Responsive:{{ p1Responsive }} p1NoResponsive:{{ p1NoResponsive }}
    </div>
    <div>readonlyPObj.p1:{{ readonlyPObj.p1 }}</div>
    <div>p1ToRef:{{ p1ToRef }} pObj.p1ToRef:{{ pObj.p1ToRef }}</div>
    <div>compositionProvideMsg：{{ compositionProvideMsg }}</div>
    <!-- update:modelValue 事件内联写法时通过 $event 来获取参数 -->
    <ComponentTwo
      msg="ComponentTwo：我是组件外部的消息"
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
    </ComponentTwo>
    <ComponentTwo
      msg="ComponentTwo：我是组件外部的消息"
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
    </ComponentTwo>

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

<script>
// https://v3.cn.vuejs.org/guide/composition-api-introduction.html
// https://v3.cn.vuejs.org/guide/composition-api-setup.html

import { ref, reactive, readonly, toRefs, toRef, provide, watch } from 'vue'
import ComponentTwo from '@/components/ComponentTwo.vue'
import CompositionRender from '@/components/CompositionRender.vue'

export default {
  components: { ComponentTwo, CompositionRender },
  setup(props, context) {
    console.log('Steup Page', props, context)

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

    // 暴露给 template
    return {
      searchText,
      noneProp1,
      pObj,
      readonlyPObj,
      p1NoResponsive,
      p1Responsive,
      p1ToRef,
      onNoParam,
      onParam,
      handleUpdatePObj,
      compositionProvideMsg
    }
  }
}
</script>

<style scoped lang="less"></style>
