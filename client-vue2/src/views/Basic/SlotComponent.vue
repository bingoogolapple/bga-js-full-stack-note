<template>
  <div class="basic">
    <h4>slot、component</h4>
    <ComponentOne
      msg="ComponentOne：我是组件外部的消息"
      v-on:on-no-param="onNoParam"
      v-on:on-param="onParam"
      v-bind:value="searchText"
      v-on:input="searchText = $event"
      >我是插槽内容</ComponentOne
    >
    <component-one
      msg="omponent-one：我是组件外部的消息"
      v-on:on-no-param="onNoParam"
      v-on:on-param="onParam"
      v-model="searchText"
      >我是插槽内容</component-one
    >
  </div>
</template>

<script>
// @ is an alias to /src
import ComponentOne from '@/components/ComponentOne.vue'

export default {
  name: 'Basic',
  components: {
    ComponentOne
  },
  // data: function () {
  data() {
    return {
      searchText: ''
    }
  },
  methods: {
    onNoParam() {
      alert('无参')
    },
    onParam(p1) {
      alert(`有参 ${p1}`)
    }
  }
}
</script>
