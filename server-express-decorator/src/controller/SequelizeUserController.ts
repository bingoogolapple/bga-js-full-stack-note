import { Request, Response } from 'express'
import md5 from 'md5'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'
import { isEmpty } from 'lodash'
import { controller, post, get, del, use } from '../decorator'
import UserModel from '../model/UserModelDefine'
import { verifyToken } from '../utils/jwt'
import { success, fail } from '../utils/CommonTypes'
import { Op, WhereOptions } from 'sequelize'
import dataSource from '../model/dataSource'

@controller('/api/users')
class UserController {
  // 这种方式需要手动 try catch 处理提交和回滚
  @post('/testTransaction1')
  async testTransaction1(req: Request, res: Response) {
    const transaction = await dataSource.transaction()
    try {
      const user1 = await UserModel.findByPk('111133576bac45baa3f02d4dac3cd8d2')
      const user2 = await UserModel.findByPk('e7055dcbf1ed42258fec931069473441')
      // 执行多个数据库操作
      await user1?.update({ balance: user1.balance - 10 }, { transaction })
      await user2?.update({ balance: user2.balance + 10 }, { transaction })
      // throw new Error('测试异常')
      await transaction.commit()
      res.json(success())
    } catch (err) {
      await transaction.rollback()
      throw err
    }
  }
  // 这种方式不需要手动处理提交和回滚
  @post('/testTransaction2')
  async testTransaction2(req: Request, res: Response) {
    await dataSource.transaction(async transaction => {
      const user1 = await UserModel.findByPk('111133576bac45baa3f02d4dac3cd8d2')
      const user2 = await UserModel.findByPk('e7055dcbf1ed42258fec931069473441')
      // 执行多个数据库操作
      await user1?.update({ balance: user1.balance + 10 }, { transaction })
      await user2?.update({ balance: user2.balance - 10 }, { transaction })
      // throw new Error('测试异常')
      res.json(success())
    })
  }
  @post('/bulkCreate')
  async bulkCreate(req: Request, res: Response) {
    let users = []
    for (let i = 1; i < 51; i++) {
      users.push({
        id: uuidv4().replace(/-/g, ''),
        username: `user${i}`,
        email: `user${i}@bga.com`,
        password: md5('111111'),
        balance: i % 2 === 0 ? 50 : undefined
      })
    }
    // 默认情况下，bulkCreate 不会在要创建的每个对象上运行验证(而 create 可以做到). 为了使 bulkCreate 也运行这些验证，必须通过 validate: true 参数。但这会降低性能
    const result = await UserModel.bulkCreate(users, { validate: true })
    res.json(result)
  }

  @post('/')
  async addUser(req: Request, res: Response) {
    const { username, email, password } = req.body
    let errors: { [key: string]: string } = {}
    if (validator.isEmpty(username)) {
      errors.username = '请填写用户名'
    }
    if (validator.isEmpty(email)) {
      errors.email = '请填写的邮箱'
    } else if (!validator.isEmail(email)) {
      errors.email = '请填写正确的邮箱'
    }
    if (validator.isEmpty(password)) {
      errors.password = '请填写密码'
    }
    if (!isEmpty(errors)) {
      res.json(fail('添加用户失败', -1, errors))
      return
    }

    const existUser = await UserModel.findOne({
      where: {
        [Op.or]: [
          {
            username: { [Op.eq]: username }
          },
          { email } // 如果是判断等于的话，两种写法都行
        ]
      }
    })
    if (existUser) {
      res.json(fail(`用户名或邮箱重复`))
      return
    }

    const id = uuidv4().replace(/-/g, '')
    const user = await UserModel.create({
      id,
      username,
      email,
      password: md5(password)
    })
    res.json(user)
  }

  @get('/getUserByUsername/:username')
  async getByUsername(req: { params: { username: string } }, res: Response) {
    const existUser = await UserModel.findOne({
      where: {
        username: req.params.username
      }
    })
    if (isEmpty(existUser)) {
      res.json(fail('用户不存在'))
    } else {
      res.json(success(existUser))
    }
  }

  @get('/getUserByEmail/:email')
  async getUserByEmail(req: { params: { email: string } }, res: Response) {
    const existUser = await UserModel.findOne({
      where: {
        email: req.params.email
      }
    })
    if (isEmpty(existUser)) {
      res.json(fail('用户不存在'))
    } else {
      res.json(success(existUser))
    }
  }

  @get('/:id')
  async getUser(req: { params: { id: string } }, res: Response) {
    const existUser = await UserModel.findOne({
      where: {
        id: req.params.id
      }
    })
    if (isEmpty(existUser)) {
      res.json(fail('用户不存在'))
    } else {
      res.json(success(existUser))
    }
  }

  @use(verifyToken)
  @del('/:id')
  async deleteUser(req: Request, res: Response) {
    const affectedRows = await UserModel.destroy({
      where: {
        id: req.params.id
      }
    })
    if (affectedRows > 0) {
      res.json(success())
    } else {
      res.json(fail('用户不存在'))
    }
  }

  @use(verifyToken)
  @get('/')
  async list(
    req: Request<
      any,
      any,
      any,
      { username: string; email: string; currentPage: string; pageSize: string }
    >,
    res: Response
  ) {
    let { username, email, currentPage = 1, pageSize = 10 } = req.query
    if (typeof currentPage === 'string') {
      currentPage = parseInt(currentPage)
    }
    if (typeof pageSize === 'string') {
      pageSize = parseInt(pageSize)
    }

    const orArr = []
    if (username) {
      orArr.push({
        username: {
          [Op.like]: `%${username}%`
        }
      })
    }
    if (email) {
      orArr.push({
        email: {
          [Op.like]: `%${email}%`
        }
      })
    }

    let where: WhereOptions = {}
    if (orArr.length > 0) {
      where = { [Op.or]: orArr }
    }

    const offset = (currentPage - 1) * pageSize

    const users = await UserModel.findAndCountAll({
      where,
      order: [['username', 'DESC']],
      offset: offset,
      limit: pageSize
    })
    res.json(users)
  }
}
