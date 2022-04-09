import { Model, Effect } from 'dva-core-ts'
import { Reducer } from 'redux'
import jwtDecode from 'jwt-decode'
import axios from 'axios'
import { createAction, updateStateAction } from '../dva'
import { getUserInfo, setAuthorizationToken, updateToken } from '../utils/auth'

export interface UserInfo {
  id: string
  username: string
  email: string
}

interface State {
  userInfo: UserInfo | undefined
  userInfos: UserInfo[] | undefined
}

interface AuthModel extends Model {
  state: State
  reducers: {
    updateState: Reducer<State>
  }
  effects: {
    login: Effect
    logout: Effect
    register: Effect
    list: Effect
  }
}

const initialState: State = {
  userInfo: getUserInfo(),
  userInfos: []
}

const namespace: string = 'auth'
const model: AuthModel = {
  namespace: namespace,
  state: initialState,
  reducers: {
    updateState(state, { payload }) {
      return { ...state, ...payload }
    }
  },
  effects: {
    *login({ payload }, { call, put }) {
      try {
        const res = yield call(axios.post, '/api/auth/login', payload)
        console.log(`登录结果 ${JSON.stringify(res.data)}`)
        let bearerToken = res.data.data
        updateToken(bearerToken)
        setAuthorizationToken(bearerToken)
        let userInfo: UserInfo = jwtDecode<{ userInfo: UserInfo }>(
          res.data.data
        ).userInfo
        yield put(updateStateAction({ userInfo }))
      } catch (error) {
        console.warn('登录失败', error)
      }
    },
    *logout(_: any, { put }) {
      try {
        updateToken(null)
        setAuthorizationToken(null)
        yield put(updateStateAction({ userInfo: undefined }))
      } catch (error) {
        console.warn('获取 followers 失败', error)
      }
    },
    *register({ payload }, { call }) {
      try {
        const res = yield call(axios.post, '/api/users', payload)
        console.log(`注册结果 ${JSON.stringify(res.data)}`)
      } catch (error) {
        console.warn('注册失败', error)
      }
    },
    *list(_: any, { call, put }) {
      try {
        const res = yield call(axios.get, '/api/users')
        const userInfos = res.data.data
        yield put(updateStateAction({ userInfos }))
      } catch (error) {
        console.warn('获取用户列表失败', error)
      }
    }
  }
}

export default model

const loginType = `${namespace}/login`
const loginAction = createAction(loginType)
const logoutType = `${namespace}/logout`
const logoutAction = createAction(logoutType)
const registerType = `${namespace}/register`
const registerAction = createAction(registerType)
const listType = `${namespace}/list`
const listAction = createAction(listType)

export const AuthActionType = {
  loginType,
  loginAction,
  logoutType,
  logoutAction,
  registerType,
  registerAction,
  listType,
  listAction
}
