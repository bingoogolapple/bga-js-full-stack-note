<template>
  <div>
    <label>Email：</label>
    <input placeholder="Enter your email address" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

// 通过 defineComponent 来应用使用 ts
export default defineComponent({
  props: {
    message: String
  },
  beforeCreate() {
    // Vue2 中 beforeCreate 时读取不到 props，Vue3 中可以
    console.log(`EmailLogin beforeCreate ${this.message}`)
  },
  created() {
    console.log(`EmailLogin created ${this.message}`)
  },
  beforeMount() {
    console.log(`EmailLogin beforeMount ${this.message}`)
  },
  mounted() {
    console.log(`EmailLogin mounted ${this.message}`)
  },
  beforeUpdate() {
    console.log(`EmailLogin beforeUpdate ${this.message}`)
  },
  updated() {
    console.log(`EmailLogin updated ${this.message}`)
  },
  activated() {
    // 被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用
    console.log(`EmailLogin activated ${this.message}`)
  },
  deactivated() {
    // 被 keep-alive 缓存的组件停用时调用。该钩子在服务器端渲染期间不被调用
    console.log(`EmailLogin deactivated ${this.message}`)
  },
  beforeUnmount() {
    console.log(`EmailLogin beforeUnmount ${this.message}`)
  },
  unmounted() {
    console.log(`EmailLogin unmounted ${this.message}`)
  }
})
</script>
