<template>
  <div>
    <h4>Directive 指令</h4>
    <input ref="input1" placeholder="ref 拿到实例来聚焦" />
    <input v-localFocus placeholder="局部指令聚焦" />
    <input v-globalFocus placeholder="全局指令聚焦" />
    <input v-localColor="bgColor" placeholder="指令传参" />
    <!-- 要先写 arg，再写 modifier -->
    <input
      v-localColor:argValue.modifierA.modifierB="bgColor"
      placeholder="指令传参"
    />
  </div>
</template>

<script>
// https://cn.vuejs.org/v2/guide/custom-directive.html
export default {
  // 局部指令
  directives: {
    localFocus: {
      inserted(el) {
        el.focus()
      }
    },
    localColor: {
      inserted(el, binding) {
        console.log('mounted binding', binding)
        el.style.backgroundColor = binding.value
      },
      update(el, binding) {
        console.log('updated binding', binding)
        el.style.backgroundColor = binding.value
      }
    }
  },
  data() {
    return {
      bgColor: 'yellow'
    }
  },
  mounted() {
    console.log('mounted')

    // this.$refs.input1.focus()

    setTimeout(() => {
      this.bgColor = 'pink'
    }, 3000)
  }
}
</script>

<style scoped lang="less"></style>
