import { Context, Next } from 'koa'
import { controller, get, post, use } from '../decorator'
import { failure } from '../utils/CommonTypes'

export const checkLogin = async (ctx: Context, next: Next) => {
  console.log('第1个中间件 checkLogin')
  const isLogin = ctx.session ? ctx.session.login : false
  if (isLogin) {
    await next()
  } else {
    ctx.redirect('/test/login')
  }
}

const middleware2 = async (ctx: Context, next: Next) => {
  console.log('第2个中间件 middleware2')
  await next()
}

const middleware3 = async (ctx: Context, next: Next) => {
  console.log('第3个中间件 middleware3')
  await next()
}

const middleware4 = async (ctx: Context, next: Next) => {
  console.log('第4个中间件 middleware4')
  await next()
}

@controller('/test')
class TestController {
  static isLogin(ctx: Context): boolean {
    return ctx.session ? ctx.session.login : false
  }

  // http://localhost:8000/test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
  @get('/aa/:p1/:p2')
  testGet(ctx: Context) {
    ctx.body = {
      method: ctx.method, // GET
      protocol: ctx.protocol, // http
      origin: ctx.origin, // "http://localhost:8000"
      url: ctx.url, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      originalUrl: ctx.originalUrl, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      path: ctx.path, // "/test/aa/bb/cc"
      query: ctx.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
      querystring: ctx.querystring, // "aakey=aavalue&bbkey=bbvalue"
      params: ctx.params, // {"p1": "bb", "p2": "cc"}
      hostname: ctx.hostname, // localhost
      host: ctx.host, // localhost
      ip: ctx.ip, // "::1"
      headers: ctx.headers,
    }
  }

  // http://localhost:8000/test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
  @post('/aa/:p1/:p2')
  testPost(ctx: Context) {
    ctx.body = {
      method: ctx.method, // GET
      protocol: ctx.protocol, // http
      origin: ctx.origin, // "http://localhost:8000"
      url: ctx.url, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      originalUrl: ctx.originalUrl, // /test/aa/bb/cc?aakey=aavalue&bbkey=bbvalue
      path: ctx.path, // "/test/aa/bb/cc"
      query: ctx.query, // {"aakey": "aavalue", "bbkey": "bbvalue"}
      querystring: ctx.querystring, // "aakey=aavalue&bbkey=bbvalue"
      params: ctx.params, // {"p1": "bb", "p2": "cc"}
      hostname: ctx.hostname, // localhost
      host: ctx.host, // localhost
      ip: ctx.ip, // "::1"
      body: ctx.request.body,
      headers: ctx.headers,
    }
  }

  @get('/logout')
  logout(ctx: Context) {
    if (ctx.session) {
      ctx.session.login = undefined
      ctx.session.username = undefined
    }
    ctx.redirect('/test/login')
  }

  @use(checkLogin) // 写在上面的中间件先被执行；实际上注解是从下往上解析的，因为内部用了 unshift 来添加，所以越上面的越先执行
  @use(middleware2) // 写在下面的中间件后被执行
  @use(middleware3, middleware4) // 左边的中间件先被执行
  @get('/home')
  home(ctx: Context) {
    // if (TestController.isLogin(ctx)) {
    ctx.body = `
            <html>
            <body>
                <h3>${ctx.session?.username}</h3>
                <a href='/test/logout'>退出</a>
            </body>
            </html>
        `
    // } else {
    //     ctx.redirect('/test/login')
    // }
  }

  // 登录页面
  @get('/login')
  getLogin(ctx: Context) {
    if (TestController.isLogin(ctx)) {
      ctx.redirect('/test/home')
    } else {
      ctx.body = `
            <html>
              <body>
                <form method="post" action="/test/login">
                  用户名：<input type="text" name="username" />
                  密码：<input type="password" name="password" />
                  <button>登陆</button>
                </form>
              </body>
            </html>
          `
    }
  }

  // 登录请求
  @post('/login')
  postLogin(ctx: Context) {
    if (TestController.isLogin(ctx)) {
      ctx.redirect('/test/home')
    } else {
      const { username, password } = ctx.request.body
      if (username === 'bingoogolapple' && password === '111111' && ctx.session) {
        ctx.session.login = true
        ctx.session.username = username
        ctx.redirect('/test/home')
      } else {
        failure(ctx, '用户名或密码错误')
      }
    }
  }
}
