const model = require('../model/index')
const User = model.getModel('user')
class UserModel {
    /**
  * 查询用户信息
  * @param user  姓名
  * @returns {Promise.<*>}
  */
    static async findUserByName(name) {
        console.log(name)
        var query = User.find({ user: 'hk' })
        var res = null
        await query.exec(function (err, doc) {
            if (err) {
                res = {}
            } else {
                res = doc
            }
        })
        // console.log('res====>' + res)
        return res;
        // const userInfo = await User.findOne({user:'hk8'}).exec()
        // console.log(userInfo)
        // return userInfo
    }
    static async createUser(user) {
        await User.create({
            'name': user.user,
            'password': user.pwd
        })
        return true
    }
}
module.exports = UserModel