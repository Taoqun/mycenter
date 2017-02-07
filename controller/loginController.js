const mongoose = require('mongoose')
var Schema = mongoose.Schema;
// 链接mongoDB 数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taoqun')

var DB_type_userinfo = new Schema({
    name:String,
    account:String,
    password:String,
    date:Date,
})

var userInfo = mongoose.model('userlist',DB_type_userinfo)

exports.userInfo = userInfo
// userInfo.find({account: "taoqun"}, (err, result) => {
//     if (err) { return console.log(err)}
//     //console.log(result)
//     return result
// })
// console.log('yes mongo')
