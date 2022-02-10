<template>
  <div>
    <h4>路由组件传参</h4>
    <h5>路由参数转计算属性</h5>
    <div>idComputed: {{ idComputed }}</div>
    <div>qp1Computed: {{ qp1Computed }}</div>
    <h5>路由参数转属性</h5>
    <div>id: {{ id }}</div>
    <div>qp1: {{ qp1 }}</div>
  </div>
</template>

<script>
export default {
  name: 'ComponentParam',
  props: ['id', 'qp1'], // 在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。使用 props 将组件和路由解耦
  computed: {
    idComputed() {
      return this.$route.params.id
    },
    qp1Computed() {
      return this.$route.query.qp1
    }
  },
  created() {
    console.log('访问路由器', this.$router)
    console.log('访问当前路由', this.$route)
  }
}
</script>
