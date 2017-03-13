// 读入模块
const mongoose = require('mongoose')
    // mongoose.Promise = global.Promise;
    // 设置数据类型
    //
    // session_id 值
    // 账户名
    // 日期
let DB_session_id = new mongoose.Schema({
    session_id: String,
    account: String,
    name: String,
    date: Date,
})

// 选择集合
let session = mongoose.model('sessionlist', DB_session_id)

exports.session = session