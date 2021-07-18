// 创建管理员
/**
 * 三大设计原则：
 * 1、store 是唯一的
 * 2、只有 store 能够改变自己的内容
 * 3、reducer 必须是纯函数：给定固定的输入就一定会有固定的输出（不能有异步操作、时间相关操作），而且不会有任何副作用（不能修改入参的内容）
 */

// 使用 redux-logger 中间件需要使用 applyMiddleware
import { createStore, applyMiddleware } from 'redux'
// https://github.com/zalmoxisus/redux-devtools-extension
import { composeWithDevTools } from 'redux-devtools-extension'
// https://github.com/LogRocket/redux-logger
import { createLogger } from 'redux-logger'

// 引入笔记本
import reducer from './reducer'

const middlewares = []

const logger = createLogger({
    // ...options
})
middlewares.push(logger)

// 自定义日志打印中间件
const customLogMiddleware = (store: any) => (next: any) => (action: any) => {
    console.log('customLogMiddlewares preState', store.getState(), 'action', action)
    let result = next(action) // 加载下一个中间件
    console.log('customLogMiddlewares nextState', store.getState())
    return result
}
// 自定义异常捕获中间件
const customErrorMiddleware = (store: any) => (next: any) => (action: any) => {
    try {
        return next(action)
    } catch (e) {
        console.log('customErrorMiddleware', e)
    }
}
middlewares.push(customLogMiddleware, customErrorMiddleware)



const composeEnhancers = composeWithDevTools({
    name: '多个 reducer' // 可选，只是为了便于在开发者工具中区分同时存在多个 store 的情况
    // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const enhancer = composeEnhancers(
    applyMiddleware(...middlewares),
    // other store enhancers if any
)

// 创建一个 store
const store = createStore(
    reducer, // 把笔记本给管理员
    enhancer
)

export default store


/**
 * 1、跨组件的状态共享：当某个组件发起一个请求时，将某个 Loading 的数据状态设为 True，另一个全局状态组件则显示 Loading 的状态。
 * 2、同组件多个实例的状态共享：某个页面组件初次加载时，会发送请求拿回了一个数据，切换到另外一个页面后又返回。这时数据已经存在，无需重新加载。设想如果是本地的组件 state，那么组件销毁后重新创建，state 也会被重置，就还需要重新获取数据
 */

/**
 * 理解 Redux 的三个基本概念：
 * 1、其中 State 即 Store，一般就是一个纯 JavaScript Object。
 * 2、Action 也是一个 Object，用于描述发生的动作。
 * 3、Reducer 则是一个函数，接收 Action 和 State 并作为参数，通过计算得到新的 Store
 */