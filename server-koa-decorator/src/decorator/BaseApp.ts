import 'dotenv/config'
import { Server } from 'http'
import Koa from 'koa'
import cors from '@koa/cors'
import error from 'koa-json-error'
import path from 'path'
import koaStatic from 'koa-static'
import koaBody from 'koa-body'
import session from 'koa-session'
import { startupLogger } from '../utils/logger'
import router from './router'
import accessLogMiddleware from '../middleware/accessLogMiddleware'
// 引入 controller 来触发 Controller 执行一遍，类里面的装饰器依赖就收集完成了，收集完成后就会生成路由
import '../controller'

import db from '../db'

db()

const { NODE_ENV, SERVER_PORT, KOA_SESSION_SECRET_KEY, KOA_SESSION_MAX_AGE } = process.env

startupLogger.info('环境', NODE_ENV)

export class BaseApp {
  protected readonly app = new Koa()

  start(callback?: Function): Server {
    // 处理全局异常，洋葱模型，放到最前面
    this.handleGlobalError()
    this.app.use(accessLogMiddleware)
    // 初始化 cors 跨域资源共享
    this.app.use(cors(this.getCorsOptions()))
    // 初始 koa-static
    this.initKoaStatic()
    // 初始化 koa-body
    this.initKoaBody()
    // 初始化 koa-session
    this.initKoaSession()
    // 使用完 Router 中间件之前
    this.beforeRouter()
    // 使用 Router
    this.initRouter()
    // 使用完 Router 中间件之后
    this.afterRouter()
    // 启动服务
    return this.listen(callback)
  }

  // 处理全局异常
  protected handleGlobalError() {
    this.app.use(
      error({
        postFormat: (e, obj) => {
          obj.code = obj.status
          delete obj.status
          if (NODE_ENV === 'prod') {
            delete obj.stack
          }
          return obj
        },
      }),
    )
  }

  // 获取跨域资源共享配置信息 https://mp.weixin.qq.com/s/EmpDfXvzAs74XM-PE4qW4g
  protected getCorsOptions(): cors.Options {
    return {}
  }

  // 初始化 koa-static
  protected initKoaStatic() {
    this.app.use(koaStatic(path.join(__dirname, '../../upload')))
  }

  // 初始化 koa-body
  protected initKoaBody() {
    this.app.use(
      koaBody({
        multipart: true,
        formidable: {
          uploadDir: path.join(__dirname, '../../upload-temp'), // 默认上传到 /var/folders/kt/zsr04x5s3r582r3x2wkzxt6w0000gp/T 临时目录中
          keepExtensions: true, // 上传到临时目录中的文件保留文件后缀
          maxFileSize: 2 * 1024 * 1024, // 设置上传文件大小最大限制，默认为 2M
        },
      }),
    )
  }

  // 初始化 koa-session
  protected initKoaSession() {
    this.app.keys = [KOA_SESSION_SECRET_KEY || '']
    this.app.use(
      session({ maxAge: KOA_SESSION_MAX_AGE ? parseInt(KOA_SESSION_MAX_AGE) : 24 * 60 * 60 * 1000 }, this.app),
    )
  }

  // 使用 Router 中间件之前
  protected beforeRouter() {}

  // 初始化 Router
  protected initRouter() {
    this.app.use(router.routes())
    this.app.use(router.allowedMethods())
  }

  // 使用 Router 中间件之后
  protected afterRouter() {}

  // 启动服务
  protected listen(callback?: Function): Server {
    return this.app.listen(SERVER_PORT, () => {
      startupLogger.info(`listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`)
      callback && callback()
    })
  }
}
