
const mongoose = require('mongoose')

// 链接mongoDB 数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taoqun')


// 名字
// 账户名
// 密码
// 创建日期

let DB_type_userinfo = new mongoose.Schema({
    name:String,
    account:String,
    password:String,
    birth_day:Date,
    death_day:Date,
    sex:String,
    phone:String,
    email:String,
    date:Date,
})

// 选择集合
let userInfo = mongoose.model('userlist',DB_type_userinfo)

exports.userInfo = userInfo

// userInfo.find({account: "taoqun"}, (err, result) => {
//     if (err) { return console.log(err)}
//     //console.log(result)
//     return result
// })
// console.log('yes mongo')

/* mongoose 增加 */
// var sam = new MyStudent({
//     name: "taoqun",
//     age: 18706888888,
//     account:'taoqun'
// });
// /* 保存 */
// sam.save(function(err) {});

/* mongoose 查找 */
// MyStudent.find({account: "taoqun"}, (err, result, res) => {
//     if (err) {
//         return console.log(err)
//     }
// })

/* mongoose 更新 修改 */
// MyStudent.update({ _id:"589862c2d58de6283ca983b7"},{date:Date.now()},(err,result)=>{
//     if(err){ return console.log(err) }
//     console.log(result)
// })

/* mongoose 删除 */
// MyStudent.remove({},(err,result)=>{
//     if(err){ return console.log(err) }
//     console.log(result)
// })
//
//
//
//
