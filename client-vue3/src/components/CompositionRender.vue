<script>
import { h } from 'vue'

export default {
  props: ['level'],
  setup(props, context) {
    const { attrs, slots, emit, expose } = context

    // 第一个参数为标签名，第二个参数为 prop 或 attribute，第三个参数为包含其子节点的数组
    return () =>
      h('div', { class: 'test-render-props' }, [
        h(`h${props.level}`, {}, ['header']),
        // 如果 template 要接收参数的话一定要传个 {} 参数，否则会报错 TypeError: Cannot read properties of undefined
        slots.default ? slots.default({}) : h('div', {}, ['默认内容']),
        slots.default
          ? slots.default({ msg: '我是插槽参数' })
          : h('div', {}, ['默认内容']),
        h('div', {}, ['footer'])
      ])
  }
}
</script>
