const model = require('../model/index')
const List = model.getModel('list')
class ListModel {
    static async getList(ctx) {
        const data = await List.find({})
        ctx.body = {
            code: 0,
            data
        }
    }
    static async createList(ctx) {
        const { type, title, content } = ctx.request.body
        const auth = ctx.user.user
        if (type && title && content) {
            const result = await List.create({ auth, type, title, content })
            console.log(result)
            if (result) {
                ctx.body = {
                    code: 0,
                    success: '成功'
                }
            }
        } else {
            ctx.body = {
                code: -1,
                success: '不能为空'
            }
        }

    }
    static async destroyList(ctx) {
        const { _id } = ctx.request.body
        const result = await List.remove({ _id })
        if (result.ok === 1) {
            ctx.body = {
                code: 0,
                success: '成功'
            }
        }
    }
    static async updateList(ctx) {
        const { _id } = ctx.request.body
        const result = await List.update({ _id }, { type: 3 })
        console.log(result)
        if (result.ok === 1) {
            ctx.body = {
                code: 0,
                success: '成功'
            }
        }
    }
}
module.exports = ListModel