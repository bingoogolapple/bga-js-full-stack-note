import { NextFunction, Request, Response } from 'express'
import { sign, verify, VerifyErrors } from 'jsonwebtoken'
import { UnauthorizedError } from './CommonTypes'

const { JWT_SECRET, JWT_EXPIRES_IN } = process.env

export interface UserInfo {
  id: string
  username: string
  email: string
}

// 生成 token
export const generateToken = (userInfo: UserInfo): string => {
  const token = sign(
    {
      userInfo
    },
    JWT_SECRET || '',
    { expiresIn: JWT_EXPIRES_IN }
  )
  // 包含 expiresIn 时长度为 248，不包含 expiresIn 时长度为 225
  // console.log(`tokenLength:${token.length}`)
  return token
}

export interface AuthRequest extends Request {
  userInfo?: UserInfo
}

export const verifyToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): void => {
  const bearerHeader = req.header('Authorization')
  // console.log(`bearerHeader ${bearerHeader}`, bearerHeader)
  const bearerPrefix = 'Bearer '
  if (bearerHeader && bearerHeader.startsWith(bearerPrefix)) {
    const bearerToken = bearerHeader.substring(bearerPrefix.length)
    verify(
      bearerToken,
      JWT_SECRET || '',
      (err: VerifyErrors | null, authData: any) => {
        if (err) {
          throw new UnauthorizedError(err.message)
        } else {
          console.log('authData', authData, req.method, req.url)
          req.userInfo = authData.UserInfo
          next()
        }
      }
    )
  } else {
    throw new UnauthorizedError('未登录')
  }
}
