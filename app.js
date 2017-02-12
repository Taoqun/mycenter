const express = require('express')
// const mongoose = require('mongoose')
const child = require('child_process')

// 运行
var app = express()

// 设置静态文件
app.use(express.static('public')) // public 文件  && 字体文件element.css里配置
app.use(express.static('views'))


require('./router/routes.js').routers(app)

var server = app.listen(8081, () => {
  
    console.log('自动打开 http://localhost:8081/')

    // 自动打开默认浏览器 指定网址 window start || mac open
    // child.exec('start http://localhost:8081/index/')
    // child.exec('open http://localhost:8081/')
})
