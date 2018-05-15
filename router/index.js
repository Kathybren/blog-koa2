const Router = require('koa-router')
const config = require('../config')
const UserController = require('../controller/user')
const ListController = require('../controller/list')
const router = new Router({
    prefix: '/api'
})

router
    .get('/', (ctx, next) => {
        ctx.response.body = config.INFO
    })
    .post('/login', UserController.login)  // 登录
    .post('/createUser', UserController.createUser) // 注册
    .post('/userInfo', UserController.getUserName) // 获取用户信息
    .post('/user/getList', ListController.getList) // 获取list
    .post('/user/todoList', ListController.createList)  // 创建list
    .post('/user/DestroyList', ListController.destroyList)  // 删除list
    .post('/user/updateList', ListController.updateList)  // 更新list

module.exports = router