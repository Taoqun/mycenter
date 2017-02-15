const express = require('express')
// const mongoose = require('mongoose')
const child = require('child_process')
const cookieParser = require('cookie-parser')

// 运行
const app = express()
app.use(cookieParser())
// 设置静态文件
app.use(express.static('public')) // public 文件  && 字体文件element.css里配置
app.use(express.static('views'))


require('./router/routes.js').routers(app)

const server = app.listen(8081, () => {

    // 端口号80 默认为本地ip打开  可以更改host 域名 这样可以直接访问

     console.log('已创建服务器，监听端口8081  http://localhost:8081/index')

    // 自动打开默认浏览器 指定网址 window start || mac open
    // child.exec('open  http://taoqun.com/')
    // child.exec('start http://taoqun.com/')
    //
    // }
})
