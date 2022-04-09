import 'dotenv/config'
import { Server } from 'http'
import Koa from 'koa'
import { startupLogger } from './utils/logger'

const { NODE_ENV, SERVER_PORT } = process.env

startupLogger.info('环境', NODE_ENV)

const app = new Koa()

app.use(async ctx => {
  console.log('11111')
  ctx.body = [1, 2, 3, 4]
})

const run = (callback?: Function): Server => {
  return app.listen(SERVER_PORT, () => {
    startupLogger.info(`listening on ${SERVER_PORT} port, http://localhost:${SERVER_PORT}`)
    callback && callback()
  })
}

export default run
