import 'dotenv/config'
import express, { RequestHandler } from 'express'
// import bodyParser from 'body-parser'
import cookieSession from 'cookie-session'
import router from './router'
import { errorRequestHandler, NotFoundError } from './utils/ErrorHandler'

const {
  NODE_ENV,
  SERVER_PORT,
  COOKIE_SESSION_SECRET_KEY,
  COOKIE_SESSION_MAX_AGE
} = process.env

console.log('环境', NODE_ENV)

const app = express()

// 处理 form 表单提交 application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: false }))
// 处理 json 提交 application/json
// app.use(bodyParser.json())
app.use(express.json())
// 使用 cookie-session 中间件来处理登录
app.use(
  cookieSession({
    name: 'session',
    keys: [COOKIE_SESSION_SECRET_KEY || ''],
    maxAge: COOKIE_SESSION_MAX_AGE
      ? parseInt(COOKIE_SESSION_MAX_AGE)
      : 24 * 60 * 60 * 1000
  })
)

// 要写到 app.get、app.post 等请求处理的前面，才能实现先走自定义中间件，再走 app.get、app.post 等请求处理
// 否则先被匹配到的 app.get、app.post 等请求处理后就不会走到中间件里了
app.use((req, res, next) => {
  // req.developer = 'BGA'
  console.log('自定义中间件', {
    method: req.method,
    protocol: req.protocol,
    url: req.url,
    originalUrl: req.originalUrl,
    path: req.path,
    baseUrl: req.baseUrl,
    query: req.query,
    params: req.params,
    hostname: req.hostname,
    ip: req.ip,
    body: req.body,
    headers: req.headers
  })

  next()
})

// 先走中间件，再走路由
app.use(router)

// http://localhost:8000/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
app.get<RequestHandler>('/aa/:p1/:p2', (req, res) => {
  console.log('请求测试链接', req.url)
  res.send({
    method: req.method, // GET
    protocol: req.protocol, // http
    url: req.url, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    originalUrl: req.originalUrl, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    path: req.path, // "/aa/bb/cc"
    baseUrl: req.baseUrl, // ""
    query: req.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
    params: req.params, // {"p1": "bb", "p2": "cc"}
    hostname: req.hostname, // localhost
    ip: req.ip, // "::1"
    headers: req.headers
  })
  // throw new NotFoundError(`111资源不存在 ${req.path}`)
})

// http://localhost:8000/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
app.post('/aa/:p1/:p2', (req, res) => {
  console.log('请求测试链接', req.url)
  res.send({
    method: req.method, // GET
    protocol: req.protocol, // http
    url: req.url, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    originalUrl: req.originalUrl, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    path: req.path, // "/aa/bb/cc"
    baseUrl: req.baseUrl, // ""
    query: req.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
    params: req.params, // {"p1": "bb", "p2": "cc"}
    hostname: req.hostname, // localhost
    ip: req.ip, // "::1"
    body: req.body,
    headers: req.headers
  })
})

app.all<RequestHandler>('*', (req, res, next) => {
  throw new NotFoundError(`资源不存在 ${req.path}`)
})

// 要写到 app.get、app.post 等请求处理的后面，才能实现先走 app.get、app.post 等请求处理，当发生异常时才能捕获全局异常
app.use(errorRequestHandler)

app.listen(SERVER_PORT, () => {
  console.log(
    `listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`
  )
})
