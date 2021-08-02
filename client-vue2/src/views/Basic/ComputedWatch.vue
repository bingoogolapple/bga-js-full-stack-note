<template>
  <div>
    <h4>计算属性和侦听器</h4>
    <div>原始消息：{{ message }}</div>
    <div>
      直接在模板中反转的消息（不推荐）：{{
        message.split('').reverse().join('')
      }}
    </div>
    <div>计算属性反转后的消息：{{ reversedMessage }}</div>
    firstName:<input v-model="firstName" /> lastName:<input
      v-model="lastName"
    /><br />
    fullNameComputedWithSetter:<input
      v-model="fullNameComputedWithSetter"
    /><br />
    <div>侦听属性实现：{{ fullName }}</div>
    <div>计算属性实现：{{ fullNameComputed }}</div>
  </div>
</template>

<script>
export default {
  name: 'ComputedWatch',
  data() {
    return {
      message: '我是消息',
      firstName: 'Foo',
      lastName: 'Bar',
      fullName: 'Foo Bar'
    }
  },
  computed: {
    // 算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值
    // 计算属性的 getter
    // reversedMessage: function () {
    // 两种写法都可以
    reversedMessage() {
      return this.message.split('').reverse().join('')
    },
    fullNameComputed() {
      return this.firstName + ' ' + this.lastName
    },
    // 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
    fullNameComputedWithSetter: {
      // getter
      // get: function () {
      // 两种写法都可以
      get() {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      // set: function (newValue) {
      // 两种写法都可以
      set(newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },
  watch: {
    // 有一些数据需要随着其它数据变动而变动时，可以考虑侦听属性。但是使用侦听属性前，先考虑是否能通过计算属性实现，计算属性在大多数情况下更合适
    // firstName: function (newValue, oldValue) {
    // 两种写法都可以
    firstName(newValue, oldValue) {
      console.log(`oldFirstName ${oldValue}, newFirstName ${newValue}`)
      this.fullName = newValue + ' ' + this.lastName
    },
    // 可以只写第一个参数，新的值
    lastName(newValue) {
      this.fullName = this.firstName + ' ' + newValue
    }
  }
}
</script>
