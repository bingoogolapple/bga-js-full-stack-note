import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { AppDispatch, RootState } from '.'
import { getUserInfo, setAuthorizationToken, updateToken } from '../utils/auth'
import { increment } from './counter'

export interface UserInfo {
    id: string
    username: string
    email: string
}

interface State {
    userInfo: UserInfo | undefined
    userInfos: UserInfo[] | undefined
    loading: boolean
}
const initialState: State = {
    userInfo: getUserInfo(),
    userInfos: [],
    loading: false
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setUserInfo: (state, action: PayloadAction<UserInfo | undefined>) => {
            state.userInfo = action.payload
        },
        setUserInfos: (state, action: PayloadAction<UserInfo[]>) => {
            state.userInfos = action.payload
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload
        }
    },
    extraReducers: (builder) => {
        builder.addCase(increment, (state, action) => {
            console.log('increment 触发 auth extraReducers', action)
        })
    }
    // extraReducers: {
    //     [increment.type]: (state, action) => {
    //         console.log('increment 触发 auth extraReducers', action)
    //     }
    // }
})

export default authSlice.reducer

export const selectUserInfo = (state: RootState) => state.auth.userInfo
export const selectFollowers = (state: RootState) => state.auth.userInfos
export const loginAction = (username: string, password: string) => (dispatch: AppDispatch) => {
    return axios.post('/api/auth/login', { username, password })
        .then((res => {
            console.log(`登录结果 ${JSON.stringify(res.data)}`)
            let bearerToken = res.data.data
            updateToken(bearerToken)
            setAuthorizationToken(bearerToken)
            let userInfo = jwtDecode<{ userInfo: UserInfo }>(res.data.data).userInfo
            dispatch(authSlice.actions.setUserInfo(userInfo))
        }))
}
export const logoutAction = () => (dispatch: AppDispatch) => {
    updateToken(null)
    setAuthorizationToken(null)
    dispatch(authSlice.actions.setUserInfo(undefined))
}
export const registerAction = (username: string, password: string) => (dispatch: AppDispatch) => {
    return axios.post('/api/users', { username, password })
        .then((res => {
            console.log(`注册结果 ${JSON.stringify(res.data)}`)
        }))
}
const { setLoading } = authSlice.actions
export const listAction = () => (dispatch: AppDispatch) => {
    dispatch(setLoading(true))
    return axios.get('/api/users')
        .then((res => {
            dispatch(setLoading(false))
            const userInfos = res.data.data
            dispatch(authSlice.actions.setUserInfos(userInfos))
        }))
        .catch(e => {
            dispatch(setLoading(false))
            throw e
        })
}