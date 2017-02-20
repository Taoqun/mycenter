// 读入模块
const mongoose = require('mongoose')
// mongoose.Promise = global.Promise;
// 设置数据类型
let DB_session_id = new mongoose.Schema({
    session_id:String,
    account:String,
    date:Date,
})

// 选择集合
let session = mongoose.model('sessionlist',DB_session_id)

exports.session = session
