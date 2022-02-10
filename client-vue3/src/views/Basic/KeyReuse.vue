<template>
  <div>
    <h4>用 key 管理可复用的元素</h4>
    <button @click="switchLoginType">切换登录类型</button>
    <div>
      对于 v-if/v-else/v-else-if 的各分支项 key，Vue2 中不指定唯一 key
      时会复用，Vue3 中不指定唯一 key 时也不会复用，因为 Vue3 会自动生成唯一的
      key，如果手动提供 key，那么每个分支必须使用唯一的
      key。不能通过故意使用相同的 key 来强制重用分支
    </div>
    <template v-if="loginType === 'username'">
      <label>Username</label>
      <input placeholder="Enter your username" />
    </template>
    <template v-else>
      <label>Email</label>
      <input placeholder="Enter your email address" />
    </template>
    <div>指定了唯一 key 时就不会复用</div>
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
