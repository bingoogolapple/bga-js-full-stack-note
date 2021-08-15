<template>
  <div>
    <h4>Counter</h4>
    State
    <div>localCount: {{ localCount }}</div>
    <div>mapCount: {{ mapCount }}</div>
    <div>countAlias: {{ countAlias }}</div>
    <div>countPlusLocalCount: {{ countPlusLocalCount }}</div>
    <div>count: {{ count }}</div>
    <hr />
    Mutations
    <button @click="localDecrement">localDecrement</button>
    <button @click="localDecrementWithNum(10)">localDecrementWithNum</button>
    <button @click="incrementWithObjNum(10)">incrementWithObjNum</button>
    <button @click="decrement">decrement</button>
    <button @click="decrementWithNum(10)">decrementWithNum</button>
    <button @click="decrementAliaxs">decrementAliaxs</button>
    <button @click="decrementWithNumAlias(10)">decrementWithNumAlias</button>
    <hr />
    Actions
    <button @click="localIncrementAction">localIncrementAction</button>
    <button @click="localIncrementWithNumAction">
      localIncrementWithNumAction
    </button>
    <button @click="localDecrementWithNumAsyncAction">
      localDecrementWithNumAsyncAction
    </button>
    <button @click="decrementWithNumAsync(10)">decrementWithNumAsync</button>
    <button @click="decrementWithNumAsyncAlias(10)">
      decrementWithNumAsyncAlias
    </button>
    <button @click="actionA">actionA</button>
    <button @click="actionB">actionB</button>
    <button @click="asyncActionA">asyncActionA</button>
    <button @click="asyncActionB">asyncActionB</button>
    <hr />
    Getters
    <div>localDoneTodosCount: {{ localDoneTodosCount }}</div>
    <div>doneTodosCountAlias: {{ doneTodosCountAlias }}</div>
    <div>doneTodosCount: {{ doneTodosCount }}</div>
    <div>第一次获取 computedCurrentTodo: {{ computedCurrentTodo }}</div>
    <div>第二次获取 computedCurrentTodo: {{ computedCurrentTodo }}</div>
    <div>第一次获取 methodCurrentTodo: {{ methodCurrentTodo() }}</div>
    <div>第二次获取 methodCurrentTodo: {{ methodCurrentTodo() }}</div>
    <hr />
    处理表单双向绑定，避免严格模式报错
    <input :value="message1" @input="updateMessage1" />
    <input v-model="message2" />
  </div>
</template>

<script>
// 当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用 mapState 辅助函数帮助我们生成计算属性
import { mapState } from 'vuex'
// 当一个组件需要获取多个 getters 的时候，将这些 getters 都声明为计算属性会有些重复和冗余。为了解决这个问题，可以使用 mapGetters 辅助函数帮助我们生成计算属性
import { mapGetters } from 'vuex'
// 可以在组件中使用 this.$store.commit('xxx') 提交 mutation，或者使用 mapMutations 辅助函数将组件中的 methods 映射为 store.commit 调用
import { mapMutations } from 'vuex'
// 可以在组件中使用 this.$store.dispatch('xxx') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用
import { mapActions } from 'vuex'

import { DECREMENT_WITH_NUM } from '../../store/index'

export default {
  name: 'Counter',
  data() {
    return {
      currentTodoId: 1
    }
  },
  computed: {
    localCount() {
      return this.$store.state.count
    },
    ...mapState({
      // 箭头函数可使代码更简练
      mapCount: state => state.count,
      // 传字符串参数 'count' 等同于 `state => state.count`
      countAlias: 'count',
      // 为了能够使用 `this` 获取局部状态，必须使用常规函数
      countPlusLocalCount(state) {
        return state.count + this.localCount
      }
    }),
    // 当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组
    ...mapState([
      // 映射 this.count 为 store.state.count
      'count'
    ]),
    // 通过属性访问 Getter
    localDoneTodosCount() {
      // getter 在通过属性访问时是作为 Vue 的响应式系统的一部分缓存其中的
      return this.$store.getters.doneTodosCount
    },
    // 也可以通过让 getter 返回一个函数，来实现给 getter 传参
    // 通过「computed」访问时会缓存结果
    computedCurrentTodo() {
      //   console.log('computed 中查询 currentTodo')
      return this.$store.getters.getTodoById(this.currentTodoId)
    },
    // 如果想将一个 getter 属性另取一个名字，使用对象形式
    ...mapGetters({
      // 映射 this.doneTodosCountAlias 为 store.getters.doneTodosCount
      doneTodosCountAlias: 'doneTodosCount'
    }),
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      // 映射 this.doneTodosCount 为 store.getters.doneTodosCount
      'doneTodosCount'
    ]),

    // 表单处理方式1，避免严格模式报错
    ...mapState({
      message1: state => state.message
    }),
    // 表单处理方式2（双向绑定的计算属性），避免严格模式报错
    message2: {
      get() {
        return this.$store.state.message
      },
      set(value) {
        this.$store.commit('updateMessage', value)
      }
    }
  },
  //   computed: mapState([
  //     'count'
  //   ]),
  methods: {
    localDecrement() {
      this.$store.commit('decrement')
    },
    localDecrementWithNum(num) {
      // 也可以向 store.commit 传入额外的参数
      this.$store.commit(DECREMENT_WITH_NUM, num)
    },
    incrementWithObjNum(num) {
      // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
      this.$store.commit('incrementWithNum', { amount: num })
      // 提交 mutation 的另一种方式是直接使用包含 type 属性的对象
      this.$store.commit({ type: 'incrementWithObjNum', amount: num })
    },
    ...mapMutations([
      // 将 `this.decrement()` 映射为 `this.$store.commit('decrement')`
      'decrement',
      // `mapMutations` 也支持载荷：将 `this.decrementWithNum(amount)` 映射为 `this.$store.commit('decrementWithNum', amount)`
      DECREMENT_WITH_NUM
    ]),
    ...mapMutations({
      decrementAliaxs: 'decrement', // 将 `this.decrementAliaxs()` 映射为 `this.$store.commit('decrement')`
      decrementWithNumAlias: DECREMENT_WITH_NUM // 将 `this.decrementWithNumAlias(amount)` 映射为 `this.$store.commit('decrementWithNum', amount)`
    }),
    // 也可以通过让 getter 返回一个函数，来实现给 getter 传参
    // 通过「method」访问时，每次都会去进行调用，而不会缓存结果
    methodCurrentTodo() {
      //   console.log('method 中查询 currentTodo')
      return this.$store.getters.getTodoById(this.currentTodoId)
    },
    // Action 通过 store.dispatch 方法触发
    localIncrementAction() {
      this.$store.dispatch('incrementAction')
    },
    localIncrementWithNumAction() {
      // 以载荷形式分发
      this.$store.dispatch('incrementWithNum', { amount: 10 })
      // 以对象形式分发
      this.$store.dispatch({ type: 'incrementWithNum', amount: 10 })
    },
    localDecrementWithNumAsyncAction() {
      this.$store.dispatch('decrementWithNumAsync', 10)
    },
    ...mapActions(['decrementWithNumAsync']), // 将 `this.decrementWithNumAsync(amount)` 映射为 `this.$store.dispatch('decrementWithNumAsync', amount)`
    ...mapActions({ decrementWithNumAsyncAlias: 'decrementWithNumAsync' }), // 将 `this.decrementWithNumAsyncAlias(amount)` 映射为 `this.$store.dispatch('decrementWithNumAsync', amount)`
    actionA() {
      this.$store.dispatch('actionA').then(amount => {
        console.log(`actionA amount is ${amount}`)
      })
    },
    actionB() {
      this.$store.dispatch('actionB')
    },
    asyncActionA() {
      this.$store.dispatch('asyncActionA').then(amount => {
        console.log(`asyncActionA amount is ${amount}`)
      })
    },
    asyncActionB() {
      this.$store.dispatch('asyncActionB')
    },

    // 表单处理方式1，避免严格模式报错
    updateMessage1(e) {
      this.$store.commit('updateMessage', e.target.value)
    }
  }
}
</script>
