import { Context, Next } from 'koa'
import { accessLogger } from '../utils/logger'

const AccessLogMiddleware = (ctx: Context, next: Next) => {
  accessLogger.info(`method:${ctx.method} | path:${ctx.path}`)
  // 必须要 return next() 或者转换成 async await 的写法，否则会 404
  return next()
}

export default AccessLogMiddleware
