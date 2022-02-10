<template>
  <div>
    <h4>slot、component</h4>
    <!-- input 事件内联写法时通过 $event 来获取参数 -->
    <ComponentOne
      msg="ComponentOne：我是组件外部的消息"
      v-on:on-no-param="onNoParam"
      v-on:on-param="onParam"
      :p1="50"
      :p2="80"
      isPublished
      v-bind:value="searchText"
      v-on:input="searchText = $event"
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
    </ComponentOne>

    <ComponentOne
      msg="ComponentOne：我是组件外部的消息"
      @on-no-param="onNoParam"
      @on-param="onParam"
      :p1="50"
      :p2="80"
      is-published
      duoyude="多余的参数"
      style="background: red"
      v-bind:value="searchText"
      v-on:input="onSearchTextChanged"
    >
      <!-- #插槽名 是简写方式 -->
      <template #header>
        <div>我是自定义 header</div>
      </template>
      <template #default>
        <div>我是自定义插槽内容</div>
      </template>
      <template #footer>
        <div>我是自定义 footer</div>
      </template>
      <template #todoList="{ todoIndex, todoItem }">
        <li>解构自定义条目 {{ todoIndex }} - {{ todoItem.text }}</li>
      </template>
    </ComponentOne>

    <component-one
      msg="component-one：我是组件外部的消息"
      v-on:on-no-param="onNoParam"
      v-on:on-param="onParam"
      :p1="pObj.p1"
      :p2="pObj.p2"
      :isPublished="pObj.isPublished"
      v-model="searchText"
      >我是自定义插槽内容</component-one
    >

    <component-one
      msg="component-one：我是组件外部的消息"
      @on-no-param="onNoParam"
      @on-param="onParam"
      v-bind="pObj"
      v-model="searchText"
    ></component-one>
  </div>
</template>

<script>
// @ is an alias to /src
import ComponentOne from '@/components/ComponentOne.vue'

export default {
  name: 'SlotComponent',
  components: {
    ComponentOne
  },
  data() {
    return {
      searchText: '',
      pObj: {
        p1: 50,
        p2: 80,
        isPublished: false
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.searchText = '222'
      this.pObj.p1 += 1
    }, 2000)
  },
  methods: {
    onNoParam() {
      alert('无参')
    },
    onParam(p1) {
      alert(`有参 ${p1}`)
    },
    // 非内联写法时，第一个参数就是内部传出的参数
    onSearchTextChanged(p1) {
      this.searchText = p1
    }
  }
}
</script>
