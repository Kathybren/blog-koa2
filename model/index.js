const mongoose = require("mongoose");
const DB_URL = 'mongodb://hh:hh@120.79.157.131:27017/tt'

mongoose.connect(DB_URL)

const models = {
    user: {
        'user': { type: String, require: true },
        'pwd': { type: String, require: true }
    },
    list: {
        'auth': { type: String, require: true },
        'title': { type: String, require: true },
        'content': { type: String, require: true },
        'type': { type: Number, require: true }
    }
}
for(let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}
module.exports = {
    getModel: function(name) {
        return mongoose.model(name)
    }
}