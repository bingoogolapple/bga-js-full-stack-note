import { Context, Next } from 'koa'
import { accessLogger } from '../utils/logger'

const accessLogMiddleware = async (ctx: Context, next: Next) => {
  accessLogger.info(`method:${ctx.method} | path:${ctx.path}`)
  await next()
}

export default accessLogMiddleware
