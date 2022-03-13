import 'dotenv/config'
import express, { ErrorRequestHandler, Express } from 'express'
import cookieSession from 'cookie-session'
import cors, { CorsOptions, CorsOptionsDelegate } from 'cors'
import { NotFoundError } from '../utils/CommonTypes'
import { router } from './router'

const {
  NODE_ENV,
  SERVER_PORT,
  COOKIE_SESSION_SECRET_KEY,
  COOKIE_SESSION_MAX_AGE
} = process.env

console.log('环境', NODE_ENV)

export class BaseApp {
  protected readonly app: Express = express()

  start() {
    // 初始化 cors 跨域资源共享
    this.app.use(cors(this.getCorsOptions()))
    // 初始化 body 解析
    this.initbodyParser()
    // 初始化 cookie-session
    this.initCookieSession()

    // 使用完 Router 中间件之前
    this.beforeRouter()

    // 使用 Router
    this.app.use(router)

    // 使用完 Router 中间件之后
    this.afterRouter()

    // 处理 404
    this.handle404Error()
    // 放到最后面才能实现先执行 Router，当发生异常时才能捕获全局异常
    this.handleGlobalError()
    // 启动服务
    this.listen()
  }

  // 获取跨域资源共享配置信息 https://mp.weixin.qq.com/s/EmpDfXvzAs74XM-PE4qW4g
  protected getCorsOptions(): CorsOptions | CorsOptionsDelegate | undefined {
    // var whitelist = ['http://example1.com', 'http://example2.com']

    // return {
    //   origin: function (origin, callback) {
    //     console.log('getCorsOptions', origin)
    //     if (!origin || whitelist.indexOf(origin) !== -1) {
    //       callback(null, true)
    //     } else {
    //       callback(new Error('Not allowed by CORS'))
    //     }
    //   }
    // }

    // return function (req, callback) {
    //   var corsOptions
    //   if (whitelist.indexOf(req.header('Origin')) !== -1) {
    //     corsOptions = { origin: true }
    //   } else {
    //     corsOptions = { origin: false }
    //   }
    //   callback(null, corsOptions)
    // }
    return undefined
  }

  // 初始化 body 解析
  protected initbodyParser() {
    // 处理 form 表单提交 application/x-www-form-urlencoded
    this.app.use(express.urlencoded({ extended: false }))
    // 处理 json 提交 application/json
    this.app.use(express.json())
  }

  // 初始化 cookie-session
  protected initCookieSession() {
    // 使用 cookie-session 中间件来处理登录
    this.app.use(
      cookieSession({
        name: 'session',
        keys: [COOKIE_SESSION_SECRET_KEY || ''],
        maxAge: COOKIE_SESSION_MAX_AGE
          ? parseInt(COOKIE_SESSION_MAX_AGE)
          : 24 * 60 * 60 * 1000
      })
    )
  }
  // 使用完 Router 中间件之前
  protected beforeRouter() {}

  // 使用完 Router 中间件之后
  protected afterRouter() {}

  // 处理 404
  protected handle404Error() {
    this.app.all('*', (req, res, next) => {
      throw new NotFoundError(`资源不存在 ${req.path}`)
    })
  }

  /**
   * 处理全局异常，注意点如下：
   * 1、错误处理中间件函数的定义方式与其他中间件函数基本相同，差别在于错误处理函数有四个自变量而不是三个
   * 2、请在其他 app.use() 和路由调用之后，最后定义错误处理中间件
   * 3、自带的 ErrorRequestHandler 处理不了 async 方法中抛出的异常，需要 RequestHandler 中添加 try catch，并调用 next 将错误传递出去，即传给自带的 ErrorRequestHandler
   */
  protected handleGlobalError() {
    // https://expressjs.com/zh-cn/guide/error-handling.html
    const errorRequestHandler: ErrorRequestHandler = (err, req, res, next) => {
      if (err.statusCode) {
        console.log('捕获到已知全局异常', err)
        return res.status(err.statusCode).json({
          code: err.statusCode,
          msg: err.message
        })
      } else {
        console.log('捕获到未知全局异常', err)
        return res.status(500).json({
          code: 500,
          msg: `${err.message}${err.original ? ` ${err.original}` : ''}`
        })
      }
    }
    this.app.use(errorRequestHandler)
  }

  // 启动服务
  protected listen() {
    this.app.listen(SERVER_PORT, () => {
      console.log(
        `listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`
      )
    })
  }
}
