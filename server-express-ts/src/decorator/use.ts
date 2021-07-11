import { RequestHandler } from 'express'

export function use(middleware: RequestHandler) {
  return function (target: any, key: string) {
    // 一个方法上使用多个相同的装饰器
    const originMiddlewares = Reflect.getMetadata('middlewares', target, key) || []
    // console.log(`middleware ${middleware}`)
    originMiddlewares.push(middleware)
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}
