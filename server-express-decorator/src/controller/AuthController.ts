import { Response } from 'express'
import validator from 'validator'
import { isEmpty } from 'lodash'
import { controller, post } from '../decorator'
import { sqlQuery } from '../mysql'
import md5 from 'md5'
import { User } from '../model/User'
import { generateToken } from '../utils/jwt'
import { success, fail } from '../utils/CommonTypes'

@controller('/api/auth')
class AuthController {
  @post('/login')
  login(req: { body: { username: string; password: string } }, res: Response) {
    const { username, password } = req.body
    let errors: { [key: string]: string } = {}
    if (validator.isEmpty(username)) {
      errors.username = '请填写用户名'
    }
    if (validator.isEmpty(password)) {
      errors.password = '请填写密码'
    }
    if (!isEmpty(errors)) {
      res.json(fail('登录失败，参数不合法', -1, errors))
      return
    }

    const sql = 'select * from user where `username`=? AND `password`=?'
    const values = [username, md5(password)]
    sqlQuery(sql, values, (users: User[]) => {
      if (isEmpty(users)) {
        res.json(fail('用户名或密码错误'))
      } else {
        const { password, ...userInfo } = users[0]
        res.json(success(generateToken(userInfo)))
      }
    })
  }
}
