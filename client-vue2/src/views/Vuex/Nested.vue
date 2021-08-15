<template>
  <div>
    <h4>Nested</h4>
    State
    <div>nestedCount1: {{ nestedCount1 }}</div>
    <div>rootCount1: {{ rootCount1 }}</div>
    <div>nestedCount2: {{ nestedCount2 }}</div>
    <div>nestedCount3: {{ nestedCount3 }}</div>
    <div>nestedCountPlusRootCoount: {{ nestedCountPlusRootCoount }}</div>
    <div>nestedCount4: {{ nestedCount4 }}</div>
    <div>nestedCount5: {{ nestedCount5 }}</div>
    <div>count: {{ count }}</div>
    <div>counterDoubleCountAlias1: {{ counterDoubleCountAlias1 }}</div>
    <div>counterDoubleCountAlias2: {{ counterDoubleCountAlias2 }}</div>
    <div>doubleCount: {{ doubleCount }}</div>
    <div>count2: {{ count2 }}</div>
    <div>count3: {{ count3 }}</div>
    <div>count4: {{ count4 }}</div>
    <div>count5: {{ count5 }}</div>
    <div>count4Alias: {{ count4Alias }}</div>
    <div>count5Alias: {{ count5Alias }}</div>
    <hr />
    <button @click="localIncrement">localIncrement</button>
    <button @click="incrementAlias1">incrementAlias1</button>
    <button @click="incrementAlias2">incrementAlias2</button>
    <button @click="increment">incrementAlias2</button>
    <hr />
    <button @click="localIncrementAction">localIncrementAction</button>
    <button @click="incrementActionAlias1">incrementActionAlias1</button>
    <button @click="incrementActionAlias2">incrementActionAlias2</button>
    <button @click="'counter/incrementAction'">counter/incrementAction</button>
    <button @click="globalAction">globalAction</button>
    <button @click="incrementAction">incrementAction</button>
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

import { createNamespacedHelpers } from 'vuex'
// 可以通过使用 createNamespacedHelpers 创建基于某个命名空间辅助函数。它返回一个对象，对象里有新的绑定在给定命名空间值上的组件绑定辅助函数
const { mapState: innerMapState, mapGetters: innerMapGetters } =
  createNamespacedHelpers('counter/nested1')

export default {
  name: 'Nested',
  computed: {
    nestedCount1() {
      return this.$store.state.counter.count
    },
    rootCount1() {
      return this.$store.state.count
    },
    ...mapState({
      nestedCount2: state => state.counter.count,
      nestedCount3: 'counter/count',
      nestedCountPlusRootCoount(state) {
        return state.counter.count + state.count
      }
    }),
    ...mapState('counter', {
      nestedCount4: state => state.count,
      nestedCount5: 'count'
    }),
    ...mapState('counter', ['count', 'count2']),
    ...mapState('counter/nested1', ['count4']),

    ...innerMapState({ count4Alias: 'count4' }),

    ...mapGetters({
      counterDoubleCountAlias1: 'counter/doubleCount'
    }),
    ...mapGetters('counter', {
      counterDoubleCountAlias2: 'doubleCount'
    }),
    ...mapGetters('counter', ['doubleCount', 'count3']),
    ...mapGetters('counter/nested1', ['count5']),
    ...mapGetters(['counter/doubleCount']),

    ...innerMapGetters({ count5Alias: 'count5' })
  },
  methods: {
    localIncrement() {
      this.$store.commit('counter/increment')
      this['counter/increment']()
    },
    ...mapMutations({
      incrementAlias1: 'counter/increment'
    }),
    ...mapMutations('counter', {
      incrementAlias2: 'increment'
    }),
    ...mapMutations(['counter/increment']), // this['counter/increment']()
    ...mapMutations('counter', ['increment']),

    localIncrementAction() {
      this.$store.dispatch('counter/incrementAction')
      this['counter/incrementAction']()
      this['counter/incrementWithNumAction']({ amount: 2 })
    },
    ...mapActions({
      incrementActionAlias1: 'counter/incrementAction'
    }),
    ...mapActions('counter', {
      incrementActionAlias2: 'incrementAction'
    }),
    ...mapActions([
      'counter/incrementAction', // this['counter/incrementAction']()
      'counter/incrementWithNumAction', // this['counter/incrementWithNumAction']()
      'globalAction'
    ]),
    ...mapActions('counter', [
      'incrementAction', // this.incrementAction()
      'incrementWithNumAction' // this.incrementWithNumAction()
    ])
  }
}
</script>
