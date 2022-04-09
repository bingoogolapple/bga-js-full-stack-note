import { Dispatch } from 'redux'
import { AuthAction } from "./actionTypes"
import axios from 'axios'
import jwtDecode from "jwt-decode"
import { UserInfo } from './reducer'
import { setAuthorizationToken, updateToken } from '../../utils/auth'

export const updateUserInfos = (userInfos?: UserInfo[]): AuthAction => ({ type: 'updateUserInfos', userInfos: userInfos })
export const updateUserInfo = (userInfo?: UserInfo): AuthAction => ({ type: 'updateUserInfo', userInfo: userInfo })
export const updateLoading = (loading: boolean): AuthAction => ({ type: 'updateLoading', loading: loading })

export const login = (username: string, password: string) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch(updateLoading(true))
        axios.post('/api/auth/login', { username, password }).then(res => {
            console.log(`登录结果 ${JSON.stringify(res.data)}`)
            let bearerToken = res.data.data
            updateToken(bearerToken)
            setAuthorizationToken(bearerToken)
            let userInfo: UserInfo = jwtDecode<{ userInfo: UserInfo }>(res.data.data).userInfo
            dispatch(updateUserInfo(userInfo))
        })
            .catch(e => console.error('登录失败', e))
            .finally(() => dispatch(updateLoading(false)))
    }
}

export const logout = () => {
    return (dispatch: Dispatch<AuthAction>) => {
        updateToken(null)
        setAuthorizationToken(null)
        dispatch(updateUserInfo(undefined))
    }
}

export const register = (username: string, email: string, password: string) => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch(updateLoading(true))
        axios.post('/api/users', { username, email, password }).then(res => {
            console.log(`注册结果 ${JSON.stringify(res.data)}`)
        })
            .catch(e => console.error('注册失败', e))
            .finally(() => dispatch(updateLoading(false)))
    }
}

export const list = () => {
    return (dispatch: Dispatch<AuthAction>) => {
        dispatch(updateLoading(true))
        axios.get('/api/users').then(res => {
            console.log(`用户列表 ${JSON.stringify(res.data)}`)
            dispatch(updateUserInfos(res.data.data))
        })
            .catch(e => console.error('获取用户列表失败', e))
            .finally(() => dispatch(updateLoading(false)))
    }
}

