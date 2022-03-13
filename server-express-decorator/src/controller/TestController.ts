import { NextFunction, Request, Response } from 'express'
import { controller, get, post, use } from '../decorator'
import { fail } from '../utils/CommonTypes'

interface LoginInfo {
  username: string
  password: string
}

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
  console.log('第1个中间件 checkLogin')
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.redirect('/test/login')
  }
}

const middleware2 = (req: Request, res: Response, next: NextFunction) => {
  console.log('第2个中间件 middleware2')
  next()
}

const middleware3 = (req: Request, res: Response, next: NextFunction) => {
  console.log('第3个中间件 middleware3')
  next()
}

const middleware4 = (req: Request, res: Response, next: NextFunction) => {
  console.log('第4个中间件 middleware4')
  next()
}

@controller('/test')
class TestController {
  static isLogin(req: Request): boolean {
    return req.session ? req.session.login : false
  }

  // http://localhost:8000/test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
  @get('/aa/:p1/:p2')
  testGet(req: Request, res: Response) {
    res.send({
      method: req.method, // GET
      protocol: req.protocol, // http
      url: req.url, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      originalUrl: req.originalUrl, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      path: req.path, // "/test/aa/bb/cc"
      baseUrl: req.baseUrl, // ""
      query: req.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
      params: req.params, // {"p1": "bb", "p2": "cc"}
      hostname: req.hostname, // localhost
      ip: req.ip, // "::1"
      headers: req.headers
    })
  }

  @post('/aa/:p1/:p2')
  testPost(req: Request, res: Response) {
    res.send({
      method: req.method, // GET
      protocol: req.protocol, // http
      url: req.url, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      originalUrl: req.originalUrl, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      path: req.path, // "/test/aa/bb/cc"
      baseUrl: req.baseUrl, // ""
      query: req.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
      params: req.params, // {"p1": "bb", "p2": "cc"}
      hostname: req.hostname, // localhost
      ip: req.ip, // "::1"
      body: req.body,
      headers: req.headers
    })
  }

  @get('/logout')
  logout(req: Request, res: Response) {
    if (req.session) {
      req.session.login = undefined
      req.session.username = undefined
    }
    res.redirect('/test/login')
  }

  @use(checkLogin) // 写在上面的中间件先被执行；实际上注解是从下往上解析的，因为内部用了 unshift 来添加，所以越上面的越先执行
  @use(middleware2) // 写在下面的中间件后被执行
  @use(middleware3, middleware4) // 左边的中间件先被执行
  @get('/home')
  home(req: Request, res: Response) {
    // if (TestController.isLogin(req)) {
    res.send(`
            <html>
            <body>
                <h3>${req.session?.username}</h3>
                <a href='/test/logout'>退出</a>
            </body>
            </html>
        `)
    // } else {
    //     res.redirect('/test/login')
    // }
  }

  // 登录页面
  @get('/login')
  getLogin(req: Request, res: Response) {
    if (TestController.isLogin(req)) {
      res.redirect('/test/home')
    } else {
      res.send(`
            <html>
              <body>
                <form method="post" action="/test/login">
                  用户名：<input type="text" name="username" />
                  密码：<input type="password" name="password" />
                  <button>登陆</button>
                </form>
              </body>
            </html>
          `)
    }
  }

  // 登录请求
  @post('/login')
  postLogin(req: Request<any, any, LoginInfo>, res: Response) {
    if (TestController.isLogin(req)) {
      res.redirect('/test/home')
    } else {
      const { username, password } = req.body
      if (
        username === 'bingoogolapple' &&
        password === '111111' &&
        req.session
      ) {
        req.session.login = true
        req.session.username = username
        res.redirect('/test/home')
      } else {
        res.send(fail('用户名或密码错误'))
      }
    }
  }
}
