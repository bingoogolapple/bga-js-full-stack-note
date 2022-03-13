import { ErrorRequestHandler } from 'express'

export const errorRequestHandler: ErrorRequestHandler = (
  err: GeneralError,
  req,
  res,
  next
) => {
  if (err.statusCode) {
    return res.status(err.statusCode).json({
      code: err.statusCode,
      msg: err.message
    })
  } else {
    return res.status(500).json({
      code: 500,
      msg: err.message
    })
  }
}

export interface ResBody<T = any> {
  code: number
  msg?: string
  data?: T
}

export class GeneralError extends Error {
  statusCode?: number

  constructor(message: string) {
    super()
    this.message = message
  }
}

/**
 * https://www.loggly.com/blog/http-status-code-diagram
 * 401 Unauthorized：该 HTTP 状态码表示认证错误，表示这个请求没有被服务器认证或者客户端传送的证书错误，可以修改后在进行重试
 * 403 Forbidden ：该 HTTP 状态码关于授权的，跟应用的的逻辑有关，表示客户端没有权限去访问要求资源
 */
export class UnauthorizedError extends GeneralError {
  constructor(message: string) {
    super(message)
    this.statusCode = 401
  }
}

export class ForbiddenError extends GeneralError {
  constructor(message: string) {
    super(message)
    this.statusCode = 403
  }
}

export class NotFoundError extends GeneralError {
  constructor(message: string) {
    super(message)
    this.statusCode = 404
  }
}

export class ConflictError extends GeneralError {
  constructor(message: string) {
    super(message)
    this.statusCode = 409
  }
}

export class InternalServerError extends GeneralError {
  constructor(message: string) {
    super(message)
    this.statusCode = 500
  }
}
