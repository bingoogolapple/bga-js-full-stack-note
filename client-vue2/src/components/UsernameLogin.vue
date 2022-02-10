<template>
  <div>
    <label>Username：</label>
    <input placeholder="Enter your username" />
  </div>
</template>

<script>
export default {
  props: {
    message: String
  },
  beforeCreate() {
    // Vue2 中 beforeCreate 时读取不到 props，Vue3 中可以
    // console.log(`UsernameLogin beforeCreate ${this.message}`)
    console.log(`UsernameLogin beforeCreate`)
  },
  created() {
    console.log(`UsernameLogin created ${this.message}`)
  },
  beforeMount() {
    console.log(`UsernameLogin beforeMount ${this.message}`)
  },
  mounted() {
    console.log(`UsernameLogin mounted ${this.message}`)
  },
  beforeUpdate() {
    console.log(`UsernameLogin beforeUpdate ${this.message}`)
  },
  updated() {
    console.log(`UsernameLogin updated ${this.message}`)
  },
  activated() {
    // 被 keep-alive 缓存的组件激活时调用。该钩子在服务器端渲染期间不被调用
    console.log(`UsernameLogin activated ${this.message}`)
  },
  deactivated() {
    // 被 keep-alive 缓存的组件停用时调用。该钩子在服务器端渲染期间不被调用
    console.log(`UsernameLogin deactivated ${this.message}`)
  },
  beforeDestroy() {
    console.log(`UsernameLogin beforeDestroy ${this.message}`)
  },
  destroyed() {
    console.log(`UsernameLogin destroyed ${this.message}`)
  }
}
</script>
