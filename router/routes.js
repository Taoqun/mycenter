
let Login = require('../controller/login.js')
let Task = require('../controller/task.js')
let verify = require('../controller/verify.js').run
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require('cookie-parser')

module.exports = function(app){

    app.use(cookieParser())

    // get请求
    app.get('/',function(req,res){
        res.redirect('/account/login')
    })
    // 登录注册请求
    app.get('/login', Login.login)
    app.post('/account/sendRegister',urlencodedParser,Login.register)

    // 增查改删 任务
    app.post('/task/createTask',urlencodedParser,verify,Task.createTask)
    app.get('/task/getTask',verify,Task.getTask)
    app.post('/task/updateTask',urlencodedParser,verify,Task.updateTask)
    app.get('/task/delTask',verify,Task.delTask)

    // 增查改删 清单
    app.post('/task/addList',urlencodedParser,verify,Task.addList)
    app.get('/task/getList',verify,Task.getList)
    app.post('/task/updateList',urlencodedParser,verify,Task.updateList)
    app.get('/task/delList',verify,Task.delList)

    // 增查改删 清单文件夹
    app.post('/task/addGroup',urlencodedParser,verify,Task.addGroup)
    app.get('/task/delGroup',verify,Task.delGroup)
    app.post('/task/updatGroup',urlencodedParser,verify,Task.updateGroup)


    // 404
    app.use(function(req, res, next) {
        res.status(404).send('404 未找到')
    });
}
