const Koa = require('koa')
const logger = require('koa-logger')
const bodyParser = require('koa-bodyparser')

const error = require('./middleware/error')
const router = require('./router/index')
// const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util')
var mongoose = require("mongoose");
// const verify = util.promisify(jwt.verify) // 解密
const secret = 'demo'
const app = new Koa()

app.use(error())
app.use(logger())
app.use(bodyParser())
//数组中的路径不需要通过jwt验证
app.use(jwtKoa({secret}).unless({path: [/^\/api\/login/, /^\/api\/createUser/]}))
app
    .use(router.routes())
    .use(router.allowedMethods())
app.listen(8081)
console.log('[demo] start-quick is starting at port 3000')