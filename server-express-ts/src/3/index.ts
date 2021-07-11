import express, { Request, Response, NextFunction } from "express"
import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
// 引入 controller 来触发 Controller 执行一遍，类里面的装饰器依赖就收集完成了，收集完成后就会生成路由
import './controller'
// 引入路由
import { router } from './decorator'

const app = express()

// 处理 form 表单提交 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 json 提交 application/json
app.use(bodyParser.json())
// 使用 cookie-session 来处理登录，登录状态保留 24 小时
app.use(
    cookieSession({
        name: 'session',
        keys: ['bga'],
        maxAge: 24 * 60 * 60 * 1000
    })
)
app.use((req: Request, res: Response, next: NextFunction) => {
    // req.developer = 'BGA'

    console.log('全局中间件')
    // console.log(`req.url ${req.url}`)
    // console.log(`req.baseUrl ${req.baseUrl}`)
    // console.log(`req.query object ${req.query}`)
    // console.log(`req.query jsonstring ${JSON.stringify(req.query)}`)
    // console.log(`req.params object ${req.params}`)
    // console.log(`req.params jsonstring ${JSON.stringify(req.params)}`)
    // console.log(`req.hostname ${req.hostname}`)
    // console.log(`req.ip ${req.ip}`)
    // console.log(`req.body ${JSON.stringify(req.body)}`)
    // console.log(`req.headers ${req.headers}`)
    // console.log(`req.rawHeaders ${req.rawHeaders}`)

    next()
})
// 先走中间件，再走路由
app.use(router)

const PORT = 8000
app.listen(PORT, () => {
    console.log(`listening on ${PORT} port, http://localhost:${PORT}`)
})
