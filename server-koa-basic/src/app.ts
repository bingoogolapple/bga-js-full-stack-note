// import dotenv from 'dotenv'
// dotenv.config()
import 'dotenv/config'
import { Server } from 'http'
import Koa from 'koa'
import koaBody from 'koa-body'
import koaStatic from 'koa-static'
import cors from '@koa/cors'
import error from 'koa-json-error'
import AccessLogMiddleware from './middleware/AccessLogMiddleware'
import router from './router'
import router1 from './router/router1'
import router2 from './router/router2'
import { startupLogger } from './utils/logger'
import db from './db'
import path from 'path'
import { verifyToken } from './utils/jwt'
db()

const { NODE_ENV, SERVER_PORT } = process.env

startupLogger.info('环境', NODE_ENV)

const app = new Koa()

/**
 * koa 中错误
 * 1、404：当请求的资源找不到，或者没有通过 ctx.body 返回时，由 koa 自动返回
 * 2、手动抛出：通过 ctx.throw 手动抛出
 * 3、500：运行时错误
 * 其他
 * 1、ctx.app.emit('error', { code: 404, message: '我是错误信息' }, ctx)
 */
// app.on('error', (err, ctx) => {
//   console.log('请求异常', err)
//   ctx.body = {
//     code: err.status || 500,
//     message: err.message + ' 1111111'
//   }
// })

// 自定义错误处理中间件
// app.use(async (ctx, next) => {
//   try {
//     await next()
//     if (!ctx.status || (ctx.status === 404 && ctx.body == null)) {
//       // 主动抛出 404，否则不会走到 catch 中返回 json
//       ctx.throw(404)
//     }
//   } catch (e: any) {
//     ctx.body = { code: -1, message: e.message }
//   }
// })

// 使用开源的错误处理中间件
app.use(
  error({
    postFormat: (e, obj) => {
      obj.code = obj.status
      delete obj.status
      if (NODE_ENV === 'prod') {
        delete obj.stack
      }
      return obj
    }
  })
)

app
  .use(async (ctx, next) => {
    console.log('全局中间件1 before')
    await next()
    console.log('全局中间件1 after')
  })
  .use(async (ctx, next) => {
    // ctx.body = '全局中间件2 before'
    console.log('全局中间件2 before')
    await next()
    console.log('全局中间件2 after')
    // ctx.body = '全局中间件2 after'
  })
  .use(async (ctx, next) => {
    // ctx.body = '全局中间件3 before'
    console.log('全局中间件3 before')
    await next()
    console.log('全局中间件3 after')
    // ctx.body = '全局中间件3 after'
  })
// .use(async ctx => {
//   // 最后一个中间件可以没有 next
//   console.log('全局中间件4')
//   // ctx.throw('我是错误信息', 404)
//   // throw new Error('我是错误信息')
//   // ctx.app.emit('error', { code: 404, message: '我是错误信息' }, ctx)
//   // http://localhost:8000/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
//   ctx.body = {
//     method: ctx.method, // GET
//     protocol: ctx.protocol, //
//     origin: ctx.origin, // "http://localhost:8000"
//     url: ctx.url, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
//     originalUrl: ctx.originalUrl, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
//     path: ctx.path, // "/aa/bb/cc"
//     query: ctx.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
//     querystring: ctx.querystring, // "aakey=aavalue&bbkey=bbvalue"
//     // params: ctx.params, // router 才有 params，原始中间件 ctx 拿不到 params
//     hostname: ctx.hostname, // localhost
//     host: ctx.host, // localhost
//     ip: ctx.ip, // "::1"
//     headers: ctx.headers
//   }
// })

app
  .use(
    cors({
      // origin: ctx => {
      //   var whitelist = ['http://example1.com', 'http://example2.com']
      //   if (whitelist.includes(ctx.origin)) {
      //     return ctx.origin
      //   }
      //   return ''
      // }
    })
  )
  // .use(verifyToken)
  .use(koaStatic(path.join(__dirname, '..', 'upload')))
  .use(
    koaBody({
      multipart: true,
      formidable: {
        uploadDir: path.join(__dirname, '../upload-temp'), // 默认上传到 /var/folders/kt/zsr04x5s3r582r3x2wkzxt6w0000gp/T 临时目录中
        keepExtensions: true, // 上传到临时目录中的文件保留文件后缀
        maxFileSize: 2 * 1024 * 1024 // 设置上传文件大小最大限制，默认为 2M
      }
    })
  )
  .use(AccessLogMiddleware)
  .use(router.routes())
  /**
   * 1、主要用于 405 Method Not Allowed 这个状态码相关
   * 2、如果不加这个中间件，如果接口是 get 请求，而前端使用 post 请求，会返回 404 状态码，接口未定义。如果加了这个中间件，这种情况时，会返回 405 Method Not Allowed ，提示 request method 不匹配，并在响应头返回接口支持的请求方法，更有利于调试
   * 3、如果前面或后面的中间件给 body 赋了值，也不会触发 allowedMethods 内部逻辑
   */
  .use(router.allowedMethods())
// .use(router1.routes())
// .use(router2.routes())

const run = (callback?: Function): Server => {
  return app.listen(SERVER_PORT, () => {
    startupLogger.info(
      `listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`
    )
    callback && callback()
  })
}

export default run
