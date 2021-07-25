import React, { ReactNode } from 'react'
import axios from 'axios'
import jwtDecode from 'jwt-decode'
import { Redirect, Route, RouteProps } from 'react-router-dom'
import { httpAxios, httpFetch } from './http'

const LS_KEY_TOKEN = 'jwt'
const HEADER_KEY_TOKEN = 'Authorization'
const LOGIN_PATH = '/reactDemo/hooksTodoApp/login'

export interface UserInfo {
  id: string
  username: string
  email: string
  token: string
}

/**
 * 更新 token
 */
export const updateAuthToken = (token: string | null) => {
  if (token) {
    localStorage.setItem(LS_KEY_TOKEN, token)
  } else {
    localStorage.removeItem(LS_KEY_TOKEN)
  }
}

/**
 * 获取 token
 */
const getToken = () => {
  return localStorage.getItem(LS_KEY_TOKEN)
}

/**
 * 添加 axios 拦截器
 */
axios.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    console.log('发起网络请求', config)
    return config
  },
  err => Promise.reject(err)
)
axios.interceptors.response.use(
  res => {
    console.log('网络请求成功', res.data)
    return res
  },
  err => {
    const res = err.response
    if (
      res &&
      res.status === 401 &&
      res.config.url?.indexOf('api/auth/login') === -1
    ) {
      updateAuthToken(null)
      window.location.reload()
      return Promise.reject({ message: '请重新登录' })
    }
    console.error('网络请求失败', res?.data)
    return Promise.reject(res?.data)
  }
)

/**
 * 获取用户信息
 */
const getUserInfo = () => {
  const token = getToken()
  if (token) {
    const userInfo = jwtDecode<{ userInfo: UserInfo }>(token).userInfo
    userInfo.token = token
    return userInfo
  } else {
    return null
  }
}

/**
 * 鉴权上下文。默认叫 Context，改名为 AuthContext
 */
type AuthContextValue = {
  login: (data: any) => Promise<void>
  logout: () => Promise<void>
  userInfo: UserInfo | null
}
export const AuthContext = React.createContext<AuthContextValue | null>(null)
AuthContext.displayName = 'AuthContext'

/**
 * 鉴权提供者
 */
export const withAuthContextProvider = <P extends object>(
  WrappedComponent: React.ComponentType<P>
) => {
  return (props: P) => {
    const [userInfo, setUserInfo] = React.useState(getUserInfo)
    const login = React.useCallback((data: any) => {
      return httpFetch('/api/auth/login', {
        method: 'POST',
        data: data
      }).then(res => {
        updateAuthToken(res.data)
        setUserInfo(getUserInfo())
        window.location.href = '#/reactDemo/hooksTodoApp/home'
      })
    }, [])
    const logout = React.useCallback(async () => {
      updateAuthToken(null)
      setUserInfo(null)
    }, [])

    return (
      <AuthContext.Provider value={{ userInfo, login, logout }}>
        <WrappedComponent {...(props as P)} />
      </AuthContext.Provider>
    )
  }
}

/**
 * 鉴权提供者
 */
export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [userInfo, setUserInfo] = React.useState(getUserInfo)
  const login = React.useCallback((data: any) => {
    // return httpFetch('/api/auth/login', {
    //   method: 'POST',
    //   data: data
    // }).then(res => {
    //   updateAuthToken(res.data)
    //   setUserInfo(getUserInfo())
    //   window.location.href = '#/reactDemo/hooksTodoApp/home'
    // })

    return httpAxios('/api/auth/login', { method: 'POST', data: data }).then(
      res => {
        updateAuthToken(res.data)
        setUserInfo(getUserInfo())
        window.location.href = '#/reactDemo/hooksTodoApp/home'
      }
    )
  }, [])
  const logout = React.useCallback(async () => {
    updateAuthToken(null)
    setUserInfo(null)
  }, [])

  return (
    <AuthContext.Provider
      children={children}
      value={{ userInfo, login, logout }}
    />
  )
}

/**
 * 使用鉴权上下文
 */
export const useAuthContext = () => {
  const authContext = React.useContext(AuthContext)
  if (!authContext) {
    throw new Error('useAuth 必须在 AuthContext.Provider 中使用')
  }
  return authContext
}

/**
 * 鉴权路由
 */
export const AuthRoute = ({
  component: WrappedComponent,
  ...routeProps
}: RouteProps) => {
  const authContext = useAuthContext()
  return (
    <Route
      {...routeProps}
      render={props => {
        if (authContext?.userInfo) {
          if (WrappedComponent) {
            return <WrappedComponent {...props} />
          } else if (routeProps.render) {
            return routeProps.render(props)
          } else {
            return <></>
          }
        } else {
          return (
            <Redirect
              to={{
                pathname: LOGIN_PATH,
                state: { from: props.location }
              }}
            />
          )
        }
      }}
    />
  )
}
