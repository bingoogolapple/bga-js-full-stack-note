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
// https://github.com/reduxjs/redux-thunk
import thunk from 'redux-thunk'

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

// 添加 thunk 中间件后即可进行异步处理
middlewares.push(thunk)

const composeEnhancers = composeWithDevTools({
    name: 'redux-thunk' // 可选，只是为了便于在开发者工具中区分同时存在多个 store 的情况
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
