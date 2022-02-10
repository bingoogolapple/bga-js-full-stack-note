<template>
  <div>
    <h4>渲染函数</h4>
    <RenderFunctionComponent level="1"></RenderFunctionComponent>
    <RenderFunctionComponent level="2">
      <!-- <template>
        <span>自定义内容</span>
      </template> -->
      <template #default="{ msg }">
        <span>自定义内容 | {{ msg }}</span>
      </template>
    </RenderFunctionComponent>
  </div>
</template>

<script>
// https://cn.vuejs.org/v2/guide/render-function.html
// template -> render -> h -> 虚拟 DOM -> 真实 DOM -> 展示到页面上

const RenderFunctionComponent = {
  props: ['level'],
  render(createElement) {
    console.log('slots', this.$slots, this.$scopedSlots)
    // 第一个参数为标签名，第二个参数为 prop 或 attribute，第三个参数为包含其子节点的数组
    return createElement('div', { class: 'test-render-props' }, [
      createElement(`h${this.level}`, {}, ['header']),
      this.$slots.default
        ? this.$slots.default
        : createElement('div', {}, ['默认内容1']),
      // 使用 $scopedSlots 这种方式来传递参数
      this.$scopedSlots.default
        ? this.$scopedSlots.default({ msg: '我是插槽参数' })
        : createElement('div', {}, ['默认内容2']),
      createElement('div', {}, ['footer'])
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
