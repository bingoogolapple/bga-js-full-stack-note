<template>
  <div>
    <h4>计算属性和侦听器</h4>
    <div>message:{{ message }} | reversedMessage:{{ reversedMessage }}</div>
    <h5>普通类型</h5>
    <div>
      firstName:<input v-model="firstName" /> lastName:<input
        v-model="lastName"
      />
      fullNameComputedWithSetter:<input v-model="fullNameComputedWithSetter" />
    </div>
    <div>watch 实现：{{ fullNameWatch }}</div>
    <div>watchEffect 实现：{{ fullNameWatchEffect }}</div>
    <div>computed 实现：{{ fullNameComputed }}</div>
    <h5>对象类型</h5>
    <div>
      <!-- 支持直接通过「对象.属性名」的形式做双向绑定 -->
      userInfo.firstName:<input v-model="userInfo.firstName" />
      userInfo.lastName:<input v-model="userInfo.lastName" />
      fullNameComputedWithSetter:<input
        v-model="userInfoFullNameComputedWithSetter"
      />
    </div>
    <div>
      userInfoFirstName:<input v-model="userInfoFirstName" />
      userInfoLastName:<input v-model="userInfoLastName" />
    </div>
    <div>userInfo watch 实现：{{ userInfoFullNameWatch }}</div>
    <div>userInfo computed 实现：{{ userInfoFullNameComputed }}</div>
  </div>
</template>

<script>
import { ref, reactive, toRefs, computed, watch, watchEffect } from 'vue'

export default {
  setup() {
    const message = ref('我是消息')
    const firstName = ref('Foo')
    const lastName = ref('Bar')
    const fullNameWatch = ref('FooWatch FooWatch')
    const fullNameWatchEffect = ref('FooWatchEffect BarWatchEffect')
    const userInfo = reactive({ firstName: 'Foo', lastName: 'Bar' })
    const userInfoFullNameWatch = ref('FooWatch BarWatch')

    // 算属性是基于它们的响应式依赖进行缓存的。只在相关响应式依赖发生改变时它们才会重新求值
    const reversedMessage = computed(() => {
      return message.value.split('').reverse().join('')
    })
    setTimeout(() => {
      message.value = '我是修后的消息'
    }, 2000)

    // 计算属性的 getter
    const fullNameComputed = computed(() => {
      return firstName.value + ' ' + lastName.value
    })
    // 计算属性默认只有 getter，不过在需要时你也可以提供一个 setter
    const fullNameComputedWithSetter = computed({
      get: () => {
        return firstName.value + ' ' + lastName.value
      },
      set: newValue => {
        const names = newValue.split(' ')
        firstName.value = names[0]
        lastName.value = names[names.length - 1]
      }
    })

    const userInfoFullNameComputed = computed(() => {
      return userInfo.firstName + ' ' + userInfo.lastName
    })
    const userInfoFullNameComputedWithSetter = computed({
      get: () => {
        return userInfo.firstName + ' ' + userInfo.lastName
      },
      set: newValue => {
        const names = newValue.split(' ')
        userInfo.firstName = names[0]
        userInfo.lastName = names[names.length - 1]
      }
    })

    // 有一些数据需要随着其它数据变动而变动时，可以考虑侦听属性。但是使用侦听属性前，先考虑是否能通过计算属性实现，计算属性在大多数情况下更合适
    // 注意：watch 监听器是惰性的 lazy，首次加载时不会执行
    // watch(firstName, (newValue, oldValue) => {
    //   console.log(`oldFirstName ${oldValue}, newFirstName ${newValue}`)
    //   fullName.value = newValue + ' ' + lastName.value
    // })
    // 可以只写第一个参数，新的值
    // watch(lastName, newValue => {
    //   fullName.value = firstName.value + ' ' + newValue
    // })

    // 可以监听多个数据的变化，用一个监听器承载
    // watch(
    //   [firstName, lastName],
    //   ([newFirstName, newLastName], [oldFirstName, oldLastName]) => {
    //     console.log(
    //       `oldFirstName ${oldFirstName}, newFirstName ${newFirstName}, oldLastName ${oldLastName}, newLastName ${newLastName}`
    //     )
    //     fullName.value = newFirstName + ' ' + newLastName
    //   }
    // )

    // 监听多个时也可以省略只写新的值
    // const stopWatch = watch(
    //   [firstName, lastName],
    //   ([newFirstName, newLastName]) => {
    //     console.log(`newFirstName ${newFirstName}, newLastName ${newLastName}`)
    //     fullNameWatch.value = newFirstName + ' ' + newLastName
    //   }
    // )

    // watch 也可以指定 immediate 为 true 来配置成非惰性的，初始化时也立即执行一次
    const stopWatch = watch(
      [firstName, lastName],
      ([newFirstName, newLastName]) => {
        console.log(`newFirstName ${newFirstName}, newLastName ${newLastName}`)
        fullNameWatch.value = newFirstName + ' ' + newLastName
      },
      { immediate: true }
    )

    // 注意：直接监听对象的某个具体属性会失去响应性
    // watch(
    //   [userInfo.firstName, userInfo.lastName],
    //   ([newFirstName, newLastName]) => {
    //     userInfoFullNameWatch.value = newFirstName + ' ' + newLastName
    //   }
    // )

    // 直接监听对象的某个具体属性会失去响应性，可以改成监听 toRefs 转换后的值
    const { firstName: userInfoFirstName, lastName: userInfoLastName } =
      toRefs(userInfo)
    // watch(
    //   [userInfoFirstName, userInfoLastName],
    //   ([newFirstName, newLastName]) => {
    //     userInfoFullNameWatch.value = newFirstName + ' ' + newLastName
    //   }
    // )

    // 直接监听对象的某个具体属性会失去响应性，也可以通过函数返回对象属性的方式来实现响应性
    watch(
      [() => userInfo.firstName, () => userInfo.lastName],
      ([newFirstName, newLastName]) => {
        userInfoFullNameWatch.value = newFirstName + ' ' + newLastName
      }
    )

    // watchEffect 是立即执行；会自动检测内部的依赖，依赖发生变更时会自动执行；如果没有依赖，则只会在初始时执行一次；不能获取之前依赖数据的值
    const stopWatchEffect = watchEffect(() => {
      console.log('自动检测内部的依赖，依赖发生变更时会自动执行')
      fullNameWatchEffect.value = firstName.value + ' ' + lastName.value
    })
    watchEffect(() => {
      console.log('没有依赖，只会在初始时执行一次')
    })

    // 取消监听
    setTimeout(() => {
      stopWatch()
      stopWatchEffect()
    }, 5000)

    return {
      message,
      reversedMessage,
      firstName,
      lastName,
      fullNameWatch,
      fullNameWatchEffect,
      fullNameComputed,
      fullNameComputedWithSetter,
      userInfo,
      userInfoFirstName,
      userInfoLastName,
      userInfoFullNameWatch,
      userInfoFullNameComputed,
      userInfoFullNameComputedWithSetter
    }
  }
}
</script>

<style scoped lang="less"></style>
