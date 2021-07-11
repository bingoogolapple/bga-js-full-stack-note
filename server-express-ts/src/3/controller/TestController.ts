import { NextFunction, Request, Response } from 'express'
import { controller, get, post, use } from '../decorator'
import { result } from '../utils/util'

interface BodyRequest extends Request {
    body: { [key: string]: string | undefined }
}

export const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    console.log('第一个中间件')
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        next()
    } else {
        res.redirect('/test/login')
    }
}

const secondMiddleware = (req: Request, res: Response, next: NextFunction) => {
    console.log('第二个中间件')
    next()
}

@controller('/test')
class TestController {
    static isLogin(req: BodyRequest): boolean {
        return !!(req.session ? req.session.login : false);
    }

    @get('/logout')
    logout(req: BodyRequest, res: Response) {
        if (req.session) {
            req.session.login = undefined
        }
        res.redirect('/test/login')
    }

    @use(secondMiddleware) // 写在上面的后执行
    @use(checkLogin) // 写在下面的先执行
    @get('/home')
    home(req: BodyRequest, res: Response) {
        // if (TestController.isLogin(req)) {
        res.send(`
            <html>
            <body>
                <a href='/github'>GitHub</a>
                <a href='/test/logout'>退出</a>
            </body>
            </html>
        `)
        // } else {
        //     res.redirect('/test/login')
        // }
    }

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

    @post('/login')
    postLogin(req: Request, res: Response) {
        if (TestController.isLogin(req)) {
            res.redirect('/test/home')
        } else {
            const { username, password } = req.body
            if (username === 'bingoogolapple' && password === '111111' && req.session) {
                req.session.login = true
                res.redirect('/test/home')
            } else {
                res.send(result(null, '用户名或密码错误'))
            }
        }
    }
}
