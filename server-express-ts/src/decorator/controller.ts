import { RequestHandler } from "express"
import { Methods } from "./request"
import { router } from "./router"

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
 * 打印添加了 @controller 注解的类的实例方法的信息
 * target：添加了 @controller 注解的 Controller 类。function
 * target.prototype：添加了 @controller 注解的 Controller 类的 prototype。object
 * key：方法名
 * handler：方法实例。function
 */
export function controller(rootPath: string) {
    return function (target: new (...args: any[]) => any) {
        // console.log(`controller target:${typeof target} target.prototype:${typeof target.prototype}`)
        for (let key in target.prototype) {
            // 没有对实例方法添加注解时，path 为 undefined
            const path = Reflect.getMetadata('path', target.prototype, key)
            const method: Methods = Reflect.getMetadata('method', target.prototype, key)
            const middlewares: RequestHandler[] = Reflect.getMetadata('middlewares', target.prototype, key);
            const handler = target.prototype[key]
            // console.log(`controller key:${key} method:${method} path:${path} handler:${typeof handler}`)
            if (path && method) {
                // router.get(path, handler)
                const fullPath = rootPath === '/' ? path : `${rootPath}${path}`
                if (middlewares && middlewares.length) {
                    router[method](fullPath, ...middlewares, handler)
                } else {
                    router[method](fullPath, handler)
                }
            }
        }
    }
}