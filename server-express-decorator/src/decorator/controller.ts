import { RequestHandler } from 'express'
import { Methods } from './request'
import { router } from './router'

/**
 * 打印添加了 @controller 注解的类的实例方法的信息
 * target：添加了 @controller 注解的 Controller 类。function
 * target.prototype：添加了 @controller 注解的 Controller 类的 prototype。object
 * key：方法名
 * handler：方法实例。function
 */
//  export function controller(target: any) {
//     console.log(`controller target:${typeof target} target.prototype:${typeof target.prototype}`)
//     for (let key in target.prototype) {
//       // 没有对实例方法添加注解时，path 为 undefined
//       const path = Reflect.getMetadata('path', target.prototype, key)
//       const method: Methods = Reflect.getMetadata('method', target.prototype, key)
//       const handler = target.prototype[key]
//       console.log(`controller key:${key} method:${method} path:${path} handler:${typeof handler}`)
//       if (path) {
//         // router.get(path, handler)
//         router[method](path, handler)
//       }
//     }
//   }

/**
 * 为添加了 @controller 注解的类的实例方法生成请求、中间件、处理方法映射关系注入到 router 中
 * rootPath：使用注解时指定的参数 controller 请求路劲
 * target：添加了 @controller 注解的 Controller 类。function
 */
export function controller(rootPath: string) {
  return function (target: new (...args: any[]) => any) {
    /**
     * target.prototype：添加了 @controller 注解的 Controller 类的 prototype。object
     * key：方法名
     * handler：方法实例。function
     */
    // console.log(`controller target:${typeof target} target.prototype:${typeof target.prototype}`)
    for (let key in target.prototype) {
      // 没有对实例方法添加注解时，path 为 undefined
      const path = Reflect.getMetadata('path', target.prototype, key)
      const method: Methods = Reflect.getMetadata(
        'method',
        target.prototype,
        key
      )
      const middlewares: RequestHandler[] = Reflect.getMetadata(
        'middlewares',
        target.prototype,
        key
      )
      const handler = target.prototype[key]
      // console.log(`controller key:${key} method:${method} path:${path} handler:${typeof handler}`)
      if (path && method) {
        // router.get(path, handler)

        // 自带的 ErrorRequestHandler 处理不了 async 方法中抛出的异常，需要加个 delegateHandler 来统一处理 try catch，并调用 next 将错误传递出去，即传给自带的 ErrorRequestHandler
        const delegateHandler: RequestHandler = async (req, res, next) => {
          try {
            await handler(req, res, next)
          } catch (err) {
            next(err)
          }
        }
        const fullPath = rootPath === '/' ? path : `${rootPath}${path}`
        if (middlewares && middlewares.length) {
          router[method](fullPath, ...middlewares, delegateHandler)
        } else {
          router[method](fullPath, delegateHandler)
        }
      }
    }
  }
}

// 执行 yarn test-decorator 来输出调试信息
// "scripts": {
//   "test-decorator": "ts-node ./src/controller/TestController.ts"
// }
