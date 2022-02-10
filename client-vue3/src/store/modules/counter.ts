import { Module } from 'vuex'
import { RootState } from '..'
interface CounterState {
  count: number
}
const counter: Module<CounterState, RootState> = {
  /**
   * 默认情况下，模块内部的 action、mutation 和 getter 是注册在全局命名空间的——这样使得多个模块能够对同一 mutation 或 action 作出响应
   * 如果希望模块具有更高的封装度和复用性，可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名
   */
  namespaced: true,
  // 模块内的状态已经是嵌套的了，使用 `namespaced` 属性不会对其产生影响
  state: () => ({ count: 1 }),
  // mutation 接收的第一个参数是模块的局部状态对象
  mutations: {
    // namespaced 为 false 时，commit('increment']
    // namespaced 为 true 时，commit['counter/increment']
    increment(state) {
      state.count++
    },
    incrementWithNum(state, payload) {
      state.count += payload.amount
    }
  },
  // getter 接收的第一个参数是模块的局部状态对象
  getters: {
    // namespaced 为 false 时，getters['doubleCount']
    // namespaced 为 true 时，getters['counter/doubleCount']
    doubleCount: state => {
      return state.count * 2
    },
    multiplyCount: (state, getters) => (num: number) => {
      return state.count * getters.doubleCount * num
    },
    // 对于模块内部的 getter，根节点状态会作为第三个参数暴露出来，根节点的 getters 会作为第四个参数暴露出来
    sumWithRootCount(state, getters, rootState, rootGetters) {
      return (
        state.count +
        getters.doubleCount +
        rootState.count +
        rootGetters.doneTodosCount
      )
    }
  },
  // 对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState
  actions: {
    // namespaced 为 false 时，dispatch['increment']
    // namespaced 为 true 时，dispatch['counter/increment']
    incrementAction(context) {
      context.commit('increment') // counter/increment
      context.commit('increment', null, { root: true }) // increment
      console.log('increment 模块 count', context.state.count)
      console.log('increment 根节点 count', context.rootState.count)
    },
    incrementWithNumAction(
      { commit, dispatch, state, rootState, rootGetters },
      payload
    ) {
      commit('incrementWithNum', payload) // counter/incrementWithNum
      commit('incrementWithNum', payload, { root: true }) // incrementWithNum
      dispatch('incrementAction') // counter/incrementAction
      dispatch('incrementAction', null, { root: true }) // incrementAction
      console.log('incrementWithNumAction 模块 count', state.count)
      console.log('incrementWithNumAction 根节点 count', rootState.count)
      console.log(
        'incrementWithNumAction 根节点 doneTodosCount',
        rootGetters.doneTodosCount
      )
    },
    // 在带命名空间的模块注册全局 action，可添加 root: true，并将这个 action 的定义放在函数 handler 中
    globalAction: {
      root: true,
      handler(namespacedContext, payload) {
        console.log('globalAction namespacedContext', namespacedContext)
        console.log('globalAction payload', payload)
      }
    }
  },
  // 嵌套模块
  modules: {
    // 继承父模块的命名空间
    page1: {
      /**
       * 有时我们可能需要创建一个模块的多个实例
       * 1、创建多个 store，他们公用同一个模块 (例如当 runInNewContext 选项是 false 或 'once' 时，为了在服务端渲染中避免有状态的单例)
       * 2、在一个 store 中多次注册同一个模块
       *
       * 如果我们使用一个纯对象来声明模块的状态，那么这个状态对象会通过引用被共享，导致状态对象被修改时 store 或模块间数据互相污染的问题
       * 实际上这和 Vue 组件内的 data 是同样的问题。因此解决办法也是相同的——使用一个函数来声明模块状态
       */
      state: () => ({ count2: 2 }),
      getters: {
        count3: state => {
          // getters['counter/count3']
          return state.count2 * 3
        }
      }
    },
    // 进一步嵌套命名空间
    nested1: {
      namespaced: true,
      state: () => ({ count4: 3 }),
      getters: {
        count5: state => {
          // getters['counter/nested1/count5']
          return state.count4 * 4
        }
      }
    }
  }
}

export default counter
