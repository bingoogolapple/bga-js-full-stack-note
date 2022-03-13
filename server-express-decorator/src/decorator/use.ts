import { RequestHandler } from 'express'

/**
 * 为添加了 @use 注解的方法添加 middlewares 元数据
 * target：添加了注解的方法所属的 Controller 类的实例
 * key：添加了注解的方法名
 * middlewares：使用注解时指定的参数，中间件
 */
export function use(...middlewares: RequestHandler[]) {
  return function (target: any, key: string) {
    // 一个方法上使用多个相同的装饰器，默认给过空的 []
    const originMiddlewares: Array<RequestHandler> =
      Reflect.getMetadata('middlewares', target, key) || []
    // console.log(`use middlewares ${middlewares}`)
    originMiddlewares.unshift(...middlewares)
    Reflect.defineMetadata('middlewares', originMiddlewares, target, key)
  }
}
