const express = require('express')
// const mongoose = require('mongoose')
const child = require('child_process')
const cookieParser = require('cookie-parser')
const routers = require('./router/routes.js')
const obj = require('./config.js').obj
// 运行
const app = express()
app.use(cookieParser())
// 设置静态文件
app.use(express.static('public')) // public 文件  && 字体文件element.css里配置
app.use(express.static('views'))


routers(app)

const server = app.listen( obj.port , () => {

    let str = obj.hostname +':'+obj.port
    // 端口号80 默认为本地ip打开  可以更改host 域名 这样可以直接访问
     console.log('tips:可以设置监听80端口，配置host域名，即可访问!')
     console.log('已创建服务器，监听端口'+ obj.port + '    ' + str )
    //  child.exec('webpack  --watch')

    // 自动打开默认浏览器 指定网址 window start || mac open
    // child.exec('open ' + str)
    // child.exec('open ' + str)
})
