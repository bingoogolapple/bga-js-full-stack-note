import axios from 'axios'
import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'
import { createAction, updateStateAction } from '../dva'

function delay(timeout: number, handleData: () => any) {
  return new Promise(resolve => {
    setTimeout(() => {
      const result = handleData()
      resolve(result)
    }, timeout)
  })
}

function getUserInfo() {
  return fetch('https://api.github.com/users/bingoogolapple')
    .then(res => res.json())
}

interface State {
  count: number
  followers: number
}

interface CountModel extends Model {
  state: State
  reducers: {
    updateState: Reducer<State>
  }
  effects: {
    increment: Effect
    decrement: Effect
    delayIncrementWithNum: Effect
    getUserInfo: Effect
  }
}

const initialState: State = {
  count: 0,
  followers: 0
}

const namespace: string = 'counter'
const model: CountModel = {
  namespace: namespace,
  state: initialState,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *increment({ payload }, { call, put, select }) {
      let { count } = yield select((state: { counter: State }) => state.counter)
      yield put(updateStateAction({ count: count + 1 }))
    },
    *decrement({ payload }, { call, put, select }) {
      let { count } = yield select((state: { counter: State }) => state.counter)
      yield put(updateStateAction({ count: count - 1 }))
    },
    *delayIncrementWithNum({ payload }, { call, put, select }) {
      let { count } = yield select((state: { counter: State }) => state.counter)
      let newCount = yield call(delay, 2000, () => {
        return count + payload
      })
      yield put(updateStateAction({ count: newCount }))
    },
    *getUserInfo(_: any, { call, put }) {
      try {
        // const data = yield call(getUserInfo)
        const { data } = yield call(axios.get, 'https://api.github.com/users/bingoogolapple')
        console.log('data', data)
        const followers = data.followers
        yield put(updateStateAction({ followers: followers }))
      } catch (error) {
        console.warn('获取 followers 失败', error)
      }
    }
  }
}

export default model

const incrementType = `${namespace}/increment`
const incrementAction = createAction(incrementType)
const decrementType = `${namespace}/decrement`
const decrementAction = createAction(decrementType)
const delayIncrementWithNumType = `${namespace}/delayIncrementWithNum`
const delayIncrementWithNumAction = createAction(delayIncrementWithNumType)
const getUserInfoType = `${namespace}/getUserInfo`
const getUserInfoAction = createAction(getUserInfoType)
export const CounterActionType = {
  incrementType,
  incrementAction,
  decrementType,
  decrementAction,
  delayIncrementWithNumType,
  delayIncrementWithNumAction,
  getUserInfoType,
  getUserInfoAction
}
