// 引入 controller 来触发 Controller 执行一遍，类里面的装饰器依赖就收集完成了，收集完成后就会生成路由
import './controller'
import { BaseApp } from './decorator'

const app = new BaseApp()
app.start()
