
const mongoose = require('mongoose')

// 链接mongoDB 数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taoqun')

var Schema = mongoose.Schema;

var DB_type_userinfo = new Schema({
    name:String,
    account:String,
    password:String,
    date:Date,
})

var userInfo = mongoose.model('userlist',DB_type_userinfo)

function run (){}

run.prototype.find = (req,res)=>{
    let obj = {account:'taoqun'}

    userInfo.find(obj, (err, result) => {
        if (err) { return console.log(err)}

        if(result){
          res.json(result)
        }else{
          res.json({})
        }
    })
}

exports.run = new run()



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