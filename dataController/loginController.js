
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
    let obj = {
        account: req.query.account,
        password: req.query.password
    }
    if(!obj.account || !obj.password){
        res.json({code:0,tips:'麻烦不要传空值！'})
        return
    }
    if( !/.+@.+\..+/.test(obj.account) ){
        res.json({code:2,tips:'邮箱不符合规则'})
        return
    }
    if( obj.password.length < 6 ){
        res.json({code:3,tips:'密码太短不符合规则'})
        return
    }
    userInfo.find({account:obj.account}, (err, result) => {

        if (err) { return console.log(err)}

        if( result && result.length === 1){
            if(obj.password === result[0].password){
                res.json({code:1,verify:true,account:true,password:true})
            }else{
                res.json({code:0,verify:false,account:true,password:false})
            }
        }else{
          res.json({code:0,verify:false,account:false,password:false})
        }
    })
}

run.prototype.save = function(req,res){
    let account = req.body.account
    let password = req.body.password
    let name = req.body.name

    userInfo.find({account:account},(err,result) => {
        if(err){return console.log(err)}

        if(result && result.length === 0){
            let add = new userInfo({
                account:account,
                password:password,
                name:name,
                date: Date.now()
            })
            add.save(function(err){
                if(err){
                    return res.json({register:false})
                }
                res.json({register:true})
            })
        }else{
            res.json({register:false})
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
