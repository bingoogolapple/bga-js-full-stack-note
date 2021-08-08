
import axios from 'axios'
import jwtDecode from "jwt-decode"
import { UserInfo } from '../store/auth'

export const setAuthorizationToken = (token: string | null) => {
    if (token) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    } else {
        delete axios.defaults.headers.common["Authorization"]
    }
}

export const updateToken = (token: string | null) => {
    if (token) {
        localStorage.setItem('jwt', token)
    } else {
        localStorage.removeItem('jwt')
    }
}

export const getUserInfo = () => {
    let token = localStorage.getItem('jwt')
    setAuthorizationToken(token)
    if (token) {
        return jwtDecode<{ userInfo: UserInfo }>(token).userInfo
    } else {
        return undefined
    }
}