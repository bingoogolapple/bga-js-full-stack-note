import { DvaLoadingState } from 'dva-loading-ts'
import { createStore } from '../dva'
import counter, { CounterActionType } from './counter'
import auth, { AuthActionType } from './auth'

export type RootState = {
  loading: DvaLoadingState
  counter: typeof counter.state
  auth: typeof auth.state
}

// @ts-ignore
const context = require.context('./', false, /\.ts$/)
export default createStore({}, context)

export { CounterActionType, AuthActionType }
