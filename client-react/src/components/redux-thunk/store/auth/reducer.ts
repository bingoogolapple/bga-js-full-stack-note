// 创建笔记本，负责管理和存储数据

import { Reducer } from 'redux'
import { getUserInfo } from '../../utils/auth'
import { AuthAction } from "./actionTypes"

// 默认存储的数据
export interface AuthState {
    userInfo: UserInfo | undefined
    userInfos: UserInfo[] | undefined
    loading: boolean
}
export interface UserInfo {
    id: string
    username: string
    email: string
}
const defaultState: AuthState = {
    userInfo: getUserInfo(),
    userInfos: [],
    loading: false
}

/**
 * 返回的必须是一个函数
 * 第一个参数是上一次存储的数据
 * 第二个参数是要执行的操作
 *
 * Redux 初始化会自动执行一次 reducer，此时 preState 为空就会默认使用 defaultState
 *
 * reducer 可以接受 preState，但是绝不能修改 preState，而是拷贝一份修改后再返回给 store
 * reducer 必须是纯函数：给定固定的输入就一定会有固定的输出（不能有异步操作、时间相关操作），而且不会有任何副作用（不能修改入参的内容）
 */
const reducer: Reducer<AuthState, AuthAction> = (preState: AuthState = defaultState, action: AuthAction) => {
    // const newState: CounterState = JSON.parse(JSON.stringify(preState))
    const newState: AuthState = { ...preState }
    switch (action.type) {
        case 'updateUserInfo':
            return { ...preState, userInfo: action.userInfo }
        case 'updateUserInfos':
            return { ...preState, userInfos: action.userInfos }
        case 'updateLoading':
            newState.loading = action.loading!!
            break
        default:
            console.log("未知 Action", action.type)
            break
    }
    // 将新的数据返回给 store（管理员），store 会用新的数据覆盖老的数据
    return newState
}

export default reducer