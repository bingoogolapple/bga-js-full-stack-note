import express from "express"
import bodyParser from 'body-parser'
// 引入 controller 来触发 Controller 执行一遍，类里面的装饰器依赖就收集完成了，收集完成后就会生成路由
import './controller'
// 引入路由
import { router } from './decorator'
import { PORT } from "./config"

const app = express()

// 处理 form 表单提交 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// 处理 json 提交 application/json
app.use(bodyParser.json())
// 先走中间件，再走路由
app.use(router)

app.listen(PORT, () => {
    console.log(`listening on ${PORT} port, env ${process.env.NODE_ENV}, http://localhost:${PORT}`)
})
