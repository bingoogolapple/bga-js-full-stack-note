export enum Methods {
    get = 'get',
    post = 'post',
    put = 'put',
    delete = 'delete',
    patch = 'patch'
}

// /**
//  * 为添加了 @get 注解的方法添加 path 元数据
//  * target：添加了 @get 注解的方法所属的 Controller 类的实例
//  * key：添加了 @get 注解的方法名
//  * path：使用 @get 注解时指定的参数，请求路径
//  */
// export function get(path: string) {
//   return function (target: any, key: string) {
//     console.log(`defineMetadata target:${typeof target} key:${key} path:${path}`)
//     Reflect.defineMetadata('path', path, target, key)
//   }
// }

/**
 * 生成请求装饰器
 * 为添加了注解的方法添加 path 和 method 元数据
 * target：添加了注解的方法所属的 Controller 类的实例
 * key：添加了注解的方法名
 * path：使用注解时指定的参数，请求路径
 * method：生成注解时指定的参数，请求的类型
 */
function generateRequestDecorator(method: Methods) {
    return function (path: string) {
        return function (target: any, key: string) {
            Reflect.defineMetadata('path', path, target, key)
            Reflect.defineMetadata('method', method, target, key)
        }
    }
}

export const get = generateRequestDecorator(Methods.get)
export const post = generateRequestDecorator(Methods.post)
export const put = generateRequestDecorator(Methods.put)
export const del = generateRequestDecorator(Methods.delete)
export const patch = generateRequestDecorator(Methods.patch)


// 执行 yarn test 来输出调试信息
// "scripts": {
//   "test": "tsc && node ./build/controller/TestController.js"
// }