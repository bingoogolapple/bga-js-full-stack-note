import { Context, Next } from 'koa'
import { accessLogger } from '../utils/logger'

const AccessLogMiddleware = (ctx: Context, next: Next) => {
  accessLogger.info(`method:${ctx.method} | path:${ctx.path}`)
  return next()
}

export default AccessLogMiddleware
