import { NextFunction, Request, Response } from 'express'
import { sign, verify, VerifyErrors } from 'jsonwebtoken'
import { EXPIRES_IN, JWT_SECRET } from "../config"
import { result } from './util'
import { UserInfo } from '../model/User'

export const generateToken = (userInfo: UserInfo): string => {
    const token = sign({
        userInfo
    }, JWT_SECRET, { expiresIn: EXPIRES_IN })
    // 包含 expiresIn 时长度为 248，不包含 expiresIn 时长度为 225
    // console.log(`tokenLength:${token.length}`)
    return token
}

export interface AuthRequest extends Request {
    userInfo?: UserInfo
}

export const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
    const bearerHeader = req.header('Authorization')
    // console.log(`bearerHeader ${bearerHeader}`, bearerHeader)
    const bearerPrefix = 'Bearer '
    if (bearerHeader && bearerHeader.startsWith(bearerPrefix)) {
        const bearerToken = bearerHeader.substring(bearerPrefix.length)
        verify(bearerToken, JWT_SECRET, (err: VerifyErrors | null, authData: any) => {
            if (err) {
                res.status(401).json(result(err, err.message))
            } else {
                console.log('authData', authData, req.url, req.method, req.query)
                req.userInfo = authData.UserInfo
                next()
            }
        })
    } else {
        /**
         * https://www.loggly.com/blog/http-status-code-diagram
         * 401 Unauthorized：该 HTTP 状态码表示认证错误，表示这个请求没有被服务器认证或者客户端传送的证书错误，可以修改后在进行重试
         * 403 Forbidden ：该 HTTP 状态码关于授权的，跟应用的的逻辑有关，表示客户端没有权限去访问要求资源
         */
        res.status(401).json(result(null, '未登录'))
    }
}