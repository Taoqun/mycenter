const express = require('express')
const mongoose = require('mongoose')
var Schema = mongoose.Schema;

// 链接mongoDB 数据库
mongoose.connect('mongodb://localhost:27017/taoqun')
var db = mongoose.connection;

//连接失败时的操作
db.on('error', () => {
    console.log('连接失败 mongo')
});

db.on('disconnected', () => {
    console.log('mongo 断开')
})

// 链接成功
db.on('open', function() {
    //do something after connecting 
    console.log('mongo 连接成功')

    /* 定义数据模型 */
    var Student_Schema = new Schema({
        name: String,
        id: Number,
        phone: String,
        date:Object,
    });

    // /*定义模型Student，注意数据库存的是students*/
    var MyStudent = mongoose.model("Student", Student_Schema);

    /* mongoose 增加 */
    var sam = new MyStudent({
        name: "sam976",
        id: 123,
        phone: "18706888888",
        date: Date.now()
    });
    /* 保存 */
    sam.save(function(err) {});
    
    /* mongoose 查找 */
    MyStudent.find({ _id:"589862c2d58de6283ca983b7"},(err,result,res)=>{
        if(err){ return console.log(err) }
        console.log(result)
    })
    
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


})




// 运行
var app = express()

// 设置静态文件
app.use(express.static('public'))

// get请求
app.get('/', (req, res) => {

    res.send('hello world')
})

app.get('/index', (req, res) => {
    res.json({
        "a": "bb"
    })
})

app.post('/post', (req, res) => {
    console.log('post')
    res.send('this is post')
})

app.use(function(req, res, next) {
    res.status(404).send('Sorry cant find that!')
});

var server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(host)
    console.log('应用实例 访问地址为 http://', host, port)
})
