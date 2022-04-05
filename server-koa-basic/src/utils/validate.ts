import Schema, { Rules, ValidateError, Values } from 'async-validator'
import { Context } from 'koa'

const validate = async <T extends Values>(
  ctx: Context,
  rules: Rules,
  allErrorMsg: boolean = false
): Promise<{ data?: T; error?: string }> => {
  const validator = new Schema(rules)
  let data: any
  switch (ctx.method) {
    case 'GET':
      data = getQueryData(ctx)
      break
    case 'POST':
    case 'PUT':
      data = getFormData(ctx)
      break
  }
  return await validator
    .validate(data)
    .then(() => {
      return {
        data: data as T
      }
    })
    .catch(({ errors }: { errors: ValidateError[] }) => {
      return {
        error: errors.map(item => item.message).join(',')
      }
    })
}

const getFormData = (ctx: Context) => {
  return ctx.request.body
}

const getQueryData = (ctx: Context) => {
  return ctx.request.query
}

export default validate
