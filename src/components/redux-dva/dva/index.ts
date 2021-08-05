import { create, DvaOption, Dispatch } from 'dva-core-ts'
import createLoading from 'dva-loading-ts'
import { createLogger } from 'redux-logger'

export function createStore(option: DvaOption, context: any) {
  option.onAction = [createLogger()]
  option.onError = (e: Error, dispatch: Dispatch<any>) => {
    console.error('dva create error: ', e)
  }

  // 1、创建实例
  const app = create(option)
  // 2、加载 model 对象
  const keys = context.keys().filter((item: string) => item !== './index.ts')
  for (let i = 0; i < keys.length; i += 1) {
    app.model(context(keys[i]).default)
  }
  // 使用 dva-loading，必须在 app.start() 之前调用
  app.use(createLoading())
  // 3、启动 dva
  app.start()
  // 4、导出 dva 的数据
  return app._store
}

export const createAction = (type: string) => (payload?: any) => ({
  type,
  payload
})

export const updateStateAction = createAction('updateState')
