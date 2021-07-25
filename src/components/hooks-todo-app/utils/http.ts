import React from 'react'
import qs from 'qs'
import axios, { AxiosRequestConfig } from 'axios'
import { updateAuthToken, useAuthContext } from './auth'
import assert from 'assert'

interface FetchConfig extends RequestInit {
    token?: string
    data?: object
}

export const httpFetch = async (
    endpoint: string,
    { data, token, ...customConfig }: FetchConfig = {}
) => {
    const config = {
        method: 'GET',
        headers: {
            Authorization: token ? `Bearer ${token}` : '',
            'Content-Type': data ? 'application/json' : ''
        },
        ...customConfig
    }

    if (config.method.toUpperCase() === 'GET') {
        endpoint += `?${qs.stringify(data)}`
    } else {
        config.body = JSON.stringify(data || {})
    }

    console.log('发起网络请求', endpoint, config)

    // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为 2xx 的时候抛出异常
    return fetch(endpoint, config)
        .then(async (res) => {
            if (res.status === 401 && res.url.indexOf('api/auth/login') === -1) {
                updateAuthToken(null)
                window.location.reload()
                return Promise.reject({ message: '请重新登录' })
            }
            const data = await res.json()
            console.log('网络请求结果', data)
            if (res.ok) {
                return data
            } else {
                return Promise.reject(data)
            }
        })
}

export const useHttpFetch = () => {
    const { userInfo } = useAuthContext()
    const token = userInfo?.token
    // JS 中的 typeof 是在 runtime 时运行的，TS 中的 typeof 是在静态环境运行的
    // utility type 的用法：用泛型给它传入一个其他类型，然后 utility type 对这个类型进行某种操作
    return React.useCallback(
        (...[endpoint, config]: Parameters<typeof httpFetch>) => {
            return httpFetch(endpoint, { ...config, token: token })
        }, [token])
}


export const httpAxios = async (
    endpoint: string,
    { ...customConfig }: AxiosRequestConfig = {}
) => {
    const config: AxiosRequestConfig = {
        method: 'GET',
        ...customConfig
    }
    config.url = endpoint

    return axios.request(config).then(res => {
        return res.data
    })
}

export const useHttpAxios = () => {
    // JS 中的 typeof 是在 runtime 时运行的，TS 中的 typeof 是在静态环境运行的
    // utility type 的用法：用泛型给它传入一个其他类型，然后 utility type 对这个类型进行某种操作
    return React.useCallback(
        (...[endpoint, config]: Parameters<typeof httpAxios>) => {
            return httpAxios(endpoint, config)
        }, [])
}