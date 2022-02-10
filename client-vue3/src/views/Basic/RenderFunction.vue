<template>
  <div>
    <h4>渲染函数</h4>
    <RenderFunctionComponent level="1"></RenderFunctionComponent>
    <RenderFunctionComponent level="2">
      <!-- <template>
        <span>自定义内容</span>
      </template> -->
      <template #default="{ msg }">
        <div>自定义内容 | {{ msg }}</div>
      </template>
    </RenderFunctionComponent>
  </div>
</template>

<script>
// https://v3.cn.vuejs.org/guide/render-function.html
// template -> render -> h -> 虚拟 DOM -> 真实 DOM -> 展示到页面上
import { h } from 'vue'

const RenderFunctionComponent = {
  props: ['level'],
  render() {
    console.log('slots', this.$slots)
    // 第一个参数为标签名，第二个参数为 prop 或 attribute，第三个参数为包含其子节点的数组
    return h('div', { class: 'test-render-props' }, [
      h(`h${this.level}`, {}, ['header']),
      // 如果 template 要接收参数的话一定要传个 {} 参数，否则会报错 TypeError: Cannot read properties of undefined
      this.$slots.default
        ? this.$slots.default({})
        : h('div', {}, ['默认内容']),
      this.$slots.default
        ? this.$slots.default({ msg: '我是插槽参数' })
        : h('div', {}, ['默认内容']),
      h('div', {}, ['footer'])
    ])
  }
}

export default {
  components: {
    RenderFunctionComponent
  }
}
</script>

<style scoped lang="less"></style>
