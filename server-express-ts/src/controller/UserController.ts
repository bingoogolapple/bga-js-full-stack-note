import { Response } from 'express'
import md5 from 'md5'
import { v4 as uuidv4 } from 'uuid'
import validator from 'validator'
import { isEmpty } from 'lodash'
import { controller, post, get, del, use } from '../decorator'
import { User } from '../model/User'
import { sqlQuery } from '../mysql'
import { result } from '../utils/util'
import { verifyToken } from '../utils/jwt'

@controller('/api/users')
class UserController {
    @post('/')
    addUser(req: { body: User }, res: Response) {
        const { username, email, password } = req.body
        let errors: { [key: string]: string } = {}
        if (validator.isEmpty(username)) {
            errors.username = "请填写用户名"
        }
        if (validator.isEmpty(email)) {
            errors.email = "请填写的邮箱"
        } else if (!validator.isEmail(email)) {
            errors.email = "请填写正确的邮箱"
        }
        if (validator.isEmpty(password)) {
            errors.password = "请填写密码"
        }
        if (!isEmpty(errors)) {
            res.json(result(errors, '添加用户失败'))
            return
        }

        const sql = "insert into user values (?, ?, ?, ?)"
        const id = uuidv4().replace(/-/g, '')
        const values = [id, username, email, md5(password)]
        sqlQuery(sql, values, (data: any) => {
            if (data.affectedRows > 0) {
                res.json(result({ id, username, email }))
            } else {
                res.json(result(null, '添加用户失败'))
            }
        })
    }

    @get('/getUserByUsername/:username')
    getByUsername(req: { params: { username: string } }, res: Response) {
        const sql = "select id,username,email from user where `username`=?"
        const values = [req.params.username]
        sqlQuery(sql, values, (data: User[]) => {
            if (isEmpty(data)) {
                res.json(result(null, '用户不存在'))
            } else {
                res.json(result(data[0]))
            }
        })
    }

    @get('/getUserByEmail/:email')
    getUserByEmail(req: { params: { email: string } }, res: Response) {
        const sql = "select id,username,email from user where `email`=?"
        const values = [req.params.email]
        sqlQuery(sql, values, (data: User[]) => {
            if (isEmpty(data)) {
                res.json(result(null, '用户不存在'))
            } else {
                res.json(result(data[0]))
            }
        })
    }

    @get('/:id')
    getUser(req: { params: { id: string } }, res: Response) {
        const sql = "select id,username,email from user where `id`=?"
        const values = [req.params.id]
        sqlQuery(sql, values, (data: User[]) => {
            if (isEmpty(data)) {
                res.json(result(null, '用户不存在'))
            } else {
                res.json(result(data[0]))
            }
        })
    }

    @use(verifyToken)
    @del('/:id')
    deleteUser(req: { params: { id: string } }, res: Response) {
        const sql = "delete from user where `id`=?"
        const values = [req.params.id]
        sqlQuery(sql, values, (data: any) => {
            if (data.affectedRows > 0) {
                res.json(result(true))
            } else {
                res.json(result(null, '删除用户失败'))
            }
        })
    }

    @use(verifyToken)
    @get('/')
    list(req: { params: { id: string } }, res: Response) {
        const sql = "select id,username,email from user"
        sqlQuery(sql, [], (data: any) => {
            if (data) {
                res.json(result(data))
            } else {
                res.json(result(null, '获取用户列表失败'))
            }
        })
    }
}
