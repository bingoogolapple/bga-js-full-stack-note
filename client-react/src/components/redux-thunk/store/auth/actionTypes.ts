import { Action } from 'redux'
import { UserInfo } from './reducer'

export type AuthActionType = 'updateLoading' | 'updateUserInfo' | 'updateUserInfos'
export interface AuthAction extends Action<AuthActionType> {
    userInfo?: UserInfo
    userInfos?: UserInfo[]
    loading?: boolean
}