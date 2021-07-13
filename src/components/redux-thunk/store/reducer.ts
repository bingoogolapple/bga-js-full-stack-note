import { combineReducers } from 'redux'

// 引入笔记本
import counter, { CounterState } from './counter/reducer'
import auth, { AuthState } from './auth/reducer'

const rootReducer = combineReducers({ counter, auth })

export type RootState = {
    counter: CounterState,
    auth: AuthState
}

export default rootReducer
