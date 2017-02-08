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

app.get('/index/a', function (req, res) {
    res.send('<p>222</p>')
});


app.get('/login', (req, res) => {

    var run = require('./controller/loginController').run
        run.find(req,res)
})


app.use(function(req, res, next) {
    res.status(404).send('404 未找到')
});

var server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(host)
    console.log('应用实例 访问地址为 http://localhost:8081')

    // 自动打开浏览器 指定网址
    // open.exec('start http://localhost:8081/index/')
})
