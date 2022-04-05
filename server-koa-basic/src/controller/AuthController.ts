import { Rules } from 'async-validator'
import { Context } from 'koa'
import validate from '../utils/validate'

class AuthController {
  async login(ctx: Context) {
    // console.log('login query', ctx.request.query)
    // console.log('login querystring', ctx.request.querystring)
    console.log('login body', ctx.request.body)

    const rules: Rules = {
      username: [
        {
          type: 'string',
          required: true,
          message: '用户名不可以为空'
        }
      ],
      password: [
        {
          type: 'string',
          required: true,
          message: '密码不可以为空'
        },
        {
          type: 'string',
          min: 6,
          message: '密码长度不可以小于6位'
        }
      ]
    }
    interface LoginInfo {
      username: string
      password: string
    }
    const { data, error } = await validate<LoginInfo>(ctx, rules, true)
    if (error) {
      ctx.body = error
    } else {
      ctx.body = data
    }
  }
}

export default new AuthController()
