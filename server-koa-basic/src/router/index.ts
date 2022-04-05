import KoaRouter from 'koa-router'
import IndexController from '../controller/IndexController'
import AuthController from '../controller/AuthController'
import UploadController from '../controller/UploadController'
import { verifyToken } from '../utils/jwt'
import router1 from './router1'
import router2 from './router2'
const router = new KoaRouter({
  // prefix: '/api'
})

// router.use(verifyToken)

router.get(
  '/aa/:p1/:p2',
  async (ctx, next) => {
    console.log('路由中间件1 before')
    await next()
    console.log('路由中间件1 after')
  },
  async (ctx, next) => {
    console.log('路由中间件2 before')
    await next()
    console.log('路由中间件2 after')
  },
  ctx => {
    console.log('路由中间件3')
    // ctx.throw('我是错误信息', 404)
    // http://localhost:8000/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
    ctx.body = {
      method: ctx.method, // GET
      protocol: ctx.protocol, // http
      origin: ctx.origin, // "http://localhost:8000"
      url: ctx.url, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      originalUrl: ctx.originalUrl, // /aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      path: ctx.path, // "/aa/bb/cc"
      query: ctx.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
      querystring: ctx.querystring, // "aakey=aavalue&bbkey=bbvalue"
      params: ctx.params, // {"p1": "bb", "p2": "cc"}
      hostname: ctx.hostname, // localhost
      host: ctx.host, // localhost
      ip: ctx.ip, // "::1"
      headers: ctx.headers
    }
  }
)

router.get('/', IndexController.index)
router.get('/sequelize1', IndexController.sequelize1)
router.get('/getAdminList', IndexController.getAdminList)
router.post('/auth/login', AuthController.login)
// router.post('/upload', verifyToken, UploadController.upload)
router.post('/upload', UploadController.upload)

// 嵌套
router.use('/nested1', router1.routes())
router.use(router2.routes())

export default router
