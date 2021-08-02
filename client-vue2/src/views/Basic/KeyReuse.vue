<template>
  <div>
    <h4>用 key 管理可复用的元素</h4>
    <div>不指定唯一 key 时会复用，指定了唯一 key 值就不会复用</div>
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" />
    </template>
    <button @click="switchLoginType">切换登录类型</button>
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" key="username-input" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" key="email-input" />
    </template>
  </div>
</template>

<script>
export default {
  name: 'KeyReuse',
  data() {
    return {
      loginType: 'username'
    }
  },
  methods: {
    switchLoginType() {
      this.loginType = this.loginType === 'username' ? 'email' : 'username'
    }
  }
}
</script>
