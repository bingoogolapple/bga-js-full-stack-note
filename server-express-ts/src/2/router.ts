import { Router, Request, Response, NextFunction } from 'express'
import url from "url"
import { result } from './util'

const router = Router()

interface RequestWithBody extends Request {
    body: {
        [key: string]: string | undefined
    }
}

router.get("/hello", (req: Request, res: Response) => {
    let username: any = url.parse(req.url, true).query.username
    res.send(`Hello ${username} ${req.developer}`)
})
router.post("/testpost", (req: RequestWithBody, res: Response) => {
    const { username, password } = req.body
    res.send(JSON.stringify({
        username, password
    }))
})

const checkLogin = (req: Request, res: Response, next: NextFunction) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        next()
    } else {
        res.redirect('/testlogin')
    }
}

router.get("/testloginhome", checkLogin, (req: Request, res: Response) => {
    // const isLogin = req.session ? req.session.login : false
    // if (isLogin) {
    res.send(`
        <html>
          <body>
            <a href='/testlogout'>退出</a>
          </body>
        </html>
      `)
    // } else {
    //     res.redirect('/testlogin')
    // }
})

router.get("/testlogin", (req: Request, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.redirect('/testloginhome')
    } else {
        res.send(`
        <html>
          <body>
            <form method="post" action="/testlogin">
              用户名：<input type="text" name="username" />
              密码：<input type="password" name="password" />
              <button>登陆</button>
            </form>
          </body>
        </html>
      `)
    }
})
router.post("/testlogin", (req: RequestWithBody, res: Response) => {
    const isLogin = req.session ? req.session.login : false
    if (isLogin) {
        res.redirect('/testloginhome')
    } else {
        const { username, password } = req.body
        if (username === 'bingoogolapple' && password === '111111' && req.session) {
            req.session.login = true
            res.redirect('/testloginhome')
        } else {
            res.send(result(null, '用户名或密码错误'))
        }
    }
})
router.get('/testlogout', (req: Request, res: Response) => {
    if (req.session) {
        req.session.login = undefined
    }
    res.redirect('/testlogin')
})

export default router