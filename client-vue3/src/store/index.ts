import { createStore, Plugin } from 'vuex'
import counter from './modules/counter'

function mockHttpRequest(timeout: number, handleData: () => any) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = handleData()
      resolve(result)
    }, timeout)
  })
}
const myPlugin: Plugin<RootState> = store => {
  // 当 store 初始化后调用
  // eslint-disable-next-line
  store.subscribe((mutation, state) => {
    // 每次 mutation 之后调用
    // mutation 的格式为 { type, payload }
    // console.log(mutation, state)
  })
}

// 使用常量替代 Mutation 事件类型
export const INCREMENT = 'increment'
export const DECREMENT_WITH_NUM = 'decrementWithNum'

const debug = process.env.NODE_ENV !== 'production'

interface Todo {
  id: number
  text: string
  done: boolean
}
export interface RootState {
  count: number
  todos: Todo[]
  message: string
}
/**
 * Mutation 需遵守 Vue 的响应规则：
 * 1、最好提前在你的 store 中初始化好所有所需属性
 * 2、当需要在对象上添加新属性时，你应该：
 *  a、使用 Vue.set(obj, 'newProp', 123), 或者
 *  b、以新对象替换老对象。例如，利用对象展开运算符 (opens new window)我们可以这样写 state.obj = { ...state.obj, newProp: 123 }
 */
export default createStore<RootState>({
  state: {
    count: 0,
    todos: [
      { id: 1, text: 'Vue', done: true },
      { id: 2, text: 'VueRouter', done: false },
      { id: 3, text: 'Vuex', done: false }
    ],
    message: ''
  },
  // 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。这个回调函数就是我们实际进行状态更改的地方
  // 一条重要的原则就是要记住 mutation 必须是同步函数，都是同步事务
  mutations: {
    // 接受 state 作为第一个参数
    decrement(state) {
      state.count--
    },
    // 我们可以使用 ES2015 风格的计算属性命名功能来使用一个常量作为函数名
    [INCREMENT](state) {
      state.count++
    },
    // 也可以向 store.commit 传入额外的参数
    [DECREMENT_WITH_NUM](state, num) {
      state.count -= num
    },
    // 在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的 mutation 会更易读
    incrementWithNum(state, payload) {
      console.log('incrementWithNum', payload)
      state.count += payload.amount
    },
    // 当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变
    incrementWithObjNum(state, payload) {
      console.log('incrementWithObjNum', payload)
      state.count += payload.amount
    },
    updateMessage(state, message) {
      state.message = message
    }
  },
  // Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算
  getters: {
    // Getter 接受 state 作为其第一个参数
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    },
    // Getter 也可以接受其他 getter 作为第二个参数
    doneTodosCount: (state, getters) => {
      return getters.doneTodos.length
    },
    // 也可以通过让 getter 返回一个函数，来实现给 getter 传参
    // 「注意，getter 在通过方法访问时，每次都会去进行调用，而不会缓存结果」
    getTodoById: state => (id: number) => {
      // console.log('查询 getTodoById')
      return state.todos.find(todo => todo.id === id)
    }
  },
  /**
   * Action 类似于 mutation，不同在于：
   * 1、Action 提交的是 mutation，而不是直接变更状态
   * 2、Action 可以包含任意异步操作
   */
  actions: {
    /**
     * Action 函数接受一个与 store 实例具有相同方法和属性的 context 对象
     * 因此你可以调用，context.commit 提交一个 mutation
     * 或者通过 context.state 和 context.getters 来获取 state 和 getters
     */
    incrementAction(context) {
      context.commit('increment')
    },
    // 实践中，我们会经常用到 ES2015 的 参数解构 来简化代码（特别是我们需要调用 commit 很多次的时候）
    incrementWithNum({ commit }, payload) {
      commit('incrementWithNum', payload)
    },
    // 可以在 action 内部执行异步操作
    decrementWithNumAsync({ commit }, num) {
      setTimeout(() => {
        commit('decrementWithNum', num)
      }, 2000)
    },
    // 组合 Action，一个 store.dispatch 在不同模块中可以触发多个 action 函数。在这种情况下，只有当所有触发函数完成后，返回的 Promise 才会执行
    actionA({ commit }) {
      return mockHttpRequest(1000, () => {
        return 3
      }).then(amount => {
        commit('incrementWithNum', { amount: amount })
        return amount
      })
    },
    actionB({ dispatch, commit }) {
      return dispatch('actionA').then(amount => {
        commit('incrementWithNum', { amount: amount * 2 })
      })
    },
    async asyncActionA({ commit }) {
      const amount = await mockHttpRequest(1000, () => {
        return 3
      })
      commit('incrementWithNum', { amount: amount })
      return amount
    },
    async asyncActionB({ dispatch, commit }) {
      const amount = await dispatch('asyncActionA')
      commit('incrementWithNum', { amount: amount * 2 })
    }
  },
  modules: { counter },
  // 在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到
  // 不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更——请确保在发布环境下关闭严格模式，以避免性能损失
  strict: debug,
  plugins: debug ? [myPlugin] : []
})

/*
模块动态注册
注册模块 `nested1`
store.registerModule('nested1', {
  ...
})
注册嵌套模块 `nested1/nested2`
store.registerModule(['nested1', 'nested2'], {
  ...
})

模块动态注册功能使得其他 Vue 插件可以通过在 store 中附加新模块的方式来使用 Vuex 管理状态。例如 vuex-router-sync 插件就是通过动态注册模块将 vue-router 和 vuex 结合在一起，实现应用的路由状态管理

也可以使用 store.unregisterModule(moduleName) 来动态卸载模块。注意，不能使用此方法卸载静态模块（即创建 store 时声明的模块）

注意，可以通过 store.hasModule(moduleName) 方法检查该模块是否已经被注册到 store
*/

// TODO 测试 https://vuex.vuejs.org/zh/guide/testing.html
