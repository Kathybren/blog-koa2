
const model = require('../model/index')
const User = model.getModel('user')
const userModel = require('../util/modle')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const secret = require('../config/secret.json')
class UserController {
    
    static async login(ctx) {
        const data = ctx.request.body
        const { user } = ctx.request.body
        const info = await User.findOne({ user })
        if (info) {
            if (bcrypt.compareSync(info.pwd, data.pwd)) {
                const UserToken = {
                    user: info.user,
                    id: info.id
                }
                const token = jwt.sign(UserToken, secret.sign, { expiresIn: '1h' })
                ctx.body = {
                    code: 0,
                    message: '登录成功',
                    token
                }
            } else {
                ctx.body = {
                    code: -1,
                    message: '用户名或密码错误'
                }
            }
        } else {
            ctx.body = {
                code: -1,
                message: '用户名不存在'
            }
        }
    }
    static async createUser(ctx) {
        // const data = ctx.request.body
        let { user, pwd } = ctx.request.body;
        const isexit = await User.findOne({ user })
        if (isexit) {
            ctx.body = {
                code: -1,
                message: '用户名已经存在'
            }
            return
        }
        // jiayan
        const salt = bcrypt.genSaltSync()
        const hash = bcrypt.hashSyne(pwd, salt)
        pwd = hash
        const result = await User.create({ user, pwd });
        // 签发token
        const newUser = await User.findOne({ user })
        const UserToken = {
            user: newUser.user,
            id: newUser.id
        }
        const token = jwt.sign(UserToken, secret.sign, { expiresIn: '1h' })
        ctx.body = {
            code: 0,
            message: '创建成功',
            token
        }
    }
    static async getUserName(ctx) {
        const user = ctx.user
        console.log(user)
        if (user) {
            ctx.body = {
                code: 1,
                message: '成功',
                user
            }
        } else {
            ctx.body = {
                code: -1,
                message: '获取用户信息失败'
            }
        }
    }
}
module.exports = UserController