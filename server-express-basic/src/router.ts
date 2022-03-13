import { Router, Request, RequestHandler } from 'express'
import { ResBody } from './utils/ErrorHandler'

const router = Router()

interface LoginInfo {
  username: string
  password: string
}

// 登录校验中间件
const checkLogin: RequestHandler = (req, res, next) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    next()
  } else {
    res.redirect('/test/login')
  }
}

// 登录后的主页面
router.get('/test/home', checkLogin, (req, res) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.send(`
        <html>
          <body>
            <h3>${req.session?.username}</h3>
            <a href='/test/logout'>退出</a>
          </body>
        </html>
      `)
  } else {
    res.redirect('/test/login')
  }
})

// 登录页面
router.get('/test/login', (req, res) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
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
})
// 登录请求
router.post('/test/login', (req: Request<any, ResBody, LoginInfo>, res) => {
  const isLogin = req.session ? req.session.login : false
  if (isLogin) {
    res.redirect('/test/home')
  } else {
    const { username, password } = req.body
    if (username === 'bingoogolapple' && password === '111111' && req.session) {
      req.session.login = true
      req.session.username = username
      res.redirect('/test/home')
    } else {
      res.send({ code: 0, msg: '用户名或密码错误' })
    }
  }
})
// 退出登录
router.get('/test/logout', (req, res) => {
  if (req.session) {
    req.session.login = undefined
  }
  res.redirect('/test/login')
})

export default router
