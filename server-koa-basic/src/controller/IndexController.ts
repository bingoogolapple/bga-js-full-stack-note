import { Context } from 'koa'
import { isNumber } from 'lodash'
import AdminService from '../service/AdminService'
import { failure, paginate } from '../utils/CommonTypes'

class IndexController {
  async index(ctx: Context) {
    ctx.body = [1, 2, 3, 4, 5, 6, 7, 8]
  }
  async sequelize1(ctx: Context) {
    const admin = await AdminService.getAdmin()
    ctx.body = admin
  }

  async getAdminList(ctx: Context) {
    const usp = new URLSearchParams(ctx.request.querystring)
    let currentPage = 1
    let pageSize = 10
    if (usp.get('currentPage') && isNumber(usp.get('currentPage'))) {
      currentPage = Number(usp.get('currentPage'))
    }
    if (usp.get('pageSize') && isNumber(usp.get('pageSize'))) {
      pageSize = Number(usp.get('pageSize'))
    }
    try {
      const { rows, count } = await AdminService.getAdminList(
        usp.get('username'),
        currentPage,
        pageSize
      )
      paginate(ctx, rows, currentPage, pageSize, count)
    } catch (e) {
      console.log('查询管理员列表失败', e)
      failure(ctx, e as string)
    }
  }
}

export default new IndexController()
