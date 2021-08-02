<template>
  <div class="router">
    <h2>Roter</h2>
    <span>{{ username }}</span>
    <button @click="goBack">后退</button>
  </div>
</template>

<script>
export default {
  name: 'Router',
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/')
    }
  },
  computed: {
    username() {
      return this.$route.query.username
    }
  },
  created() {
    console.log('访问路由器', this.$router)
    console.log('访问当前路由', this.$route)
  }
}
</script>

<style scoped lang="less">
</style>
