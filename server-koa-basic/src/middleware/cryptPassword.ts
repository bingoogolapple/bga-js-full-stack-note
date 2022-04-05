import { Context, Next } from 'koa'
import bcrypt from 'bcryptjs'

const cryptPassword = (ctx: Context, next: Next) => {
  const { password } = ctx.request.body
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(password, salt)
  //   bcrypt.compareSync(password, hash)
  ctx.request.body.password = hash
  // Auto-gen a salt and hash
  //   bcrypt.hashSync(password, 10)
  return next()
}

export default cryptPassword
