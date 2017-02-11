const express = require('express')
// const mongoose = require('mongoose')
const open = require('child_process')

// 运行
var app = express()

// 设置静态文件
app.use(express.static('public')) // public 文件  && 字体文件element.css里配置
app.use(express.static('views'))


require('./router/routes.js').routers(app)

var server = app.listen(8081, () => {
    let host = server.address().address
    let port = server.address().port
    console.log(host)
    console.log('应用实例 访问地址为 http://localhost:8081')

    // 自动打开浏览器 指定网址
    // open.exec('start http://localhost:8081/index/')
})
