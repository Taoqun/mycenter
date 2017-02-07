const express = require('express')
// const mongoose = require('mongoose')
const open = require('child_process')

// var Schema = mongoose.Schema;
//
// // 链接mongoDB 数据库
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://localhost:27017/taoqun')
// var db = mongoose.connection;

// /* 定义数据模型 */
// var Student_Schema = new Schema({
//     name: String,
//     age: Number,
//     account: String,
// });

// /*定义模型，注意数据库存储时 后面加 s*/
// var MyStudent = mongoose.model("userlist", Student_Schema);



//连接失败时的操作
// db.on('error', () => {
//     console.log('连接失败 mongo')
// });

// 断开连接
// db.on('disconnected', () => {
//     console.log('mongo 断开')
// })

// 链接成功
//db.on('open', function() {
    //do something after connecting
    //console.log('mongo 连接成功')

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
//})

// 运行
var app = express()

// 设置静态文件
app.use(express.static('public'))
app.use(express.static('views'))


    // get请求
app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index/index.html')
})

app.get('/index', (req, res) => {
    res.sendFile(__dirname, 'index/index.html')
})



app.get('/login', (req, res) => {

    var userInfo = require('./controller/loginController').userInfo

    userInfo.find({account: "taoqun"}, (err, result) => {
        if (err) { return console.log(err)}

        if(result){
          res.json(result)
        }else{
          res.json({})
        }

    })
})


app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!')
});

var server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(host)
    console.log('应用实例 访问地址为 http://localhost:8081')

    // 自动打开浏览器 指定网址
    open.exec('start http://localhost:8081/index/')
})
