<template>
  <div>
    <h4>Mixin 混入</h4>
    <div>{{ msg1 }}</div>
    <div>{{ msg2 }}</div>
    <div>{{ msg3 }}</div>
    <div>{{ globalMsg }}</div>
    <div>{{ $options.customMsg1 }}</div>
    <div>{{ $options.customMsg2 }}</div>
    <div>{{ $options.customMsg3 }}</div>
    <div>{{ $customGlobalMsg1 }}</div>
    <button @click="test1">test1</button>
    <button @click="test2">test2</button>
    <button @click="test3">test3</button>
    <button @click="globalTest">globalTest</button>
  </div>
</template>

<script>
// https://v3.cn.vuejs.org/guide/mixins.html
// data、methods、自定义属性：只会选择一个，组件中的会覆盖 mixin 中的
// 生命周期函数：都会执行，先执行 mixin 里面的，再执行组件里面的
const myMixin1 = {
  data() {
    return {
      msg1: 'mixin1 消息1',
      msg3: 'mixin1 消息3'
    }
  },
  created() {
    console.log('mixin1 created')
    this.test1()
    this.test2()
    this.test3()
  },
  methods: {
    test1() {
      console.log('mixin1 test1')
    },
    test3() {
      console.log('mixin1 test3')
    }
  }
}

const myMixin2 = {
  customMsg1: 'mixin 自定义属性消息1',
  customMsg3: 'mixin 自定义属性消息3',
  data() {
    return {
      msg1: 'mixin2 消息1',
      msg3: 'mixin2 消息3'
    }
  },
  created() {
    console.log('mixin2 created')
    this.test1()
    this.test2()
    this.test3()
  },
  methods: {
    test1() {
      console.log('mixin2 test1')
    },
    test3() {
      console.log('mixin2 test3')
    }
  }
}

export default {
  // 局部 mixin，存在多个时后者覆盖前者
  mixins: [myMixin1, myMixin2],
  customMsg1: '组件自定义属性消息1',
  customMsg2: '组件自定义属性消息2',
  data() {
    return {
      msg1: '组件消息1',
      msg2: '组件消息2'
    }
  },
  created() {
    console.log('组件 created')
    this.test1()
    this.test2()
    this.test3()
  },
  mounted() {
    setTimeout(() => {
      this.$customGlobalMsg1 = '修改后的全局自定义属性消息1'
      console.log(this.$customGlobalMsg1)
    }, 3000)
  },
  methods: {
    test1() {
      console.log('组件 test1')
    },
    test2() {
      console.log('组件 test2')
    }
  }
}
</script>

<style scoped lang="less"></style>
