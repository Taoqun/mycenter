
//  控制器 逻辑
const Login = require('../controller/login.js')
const Task = require('../controller/task.js')
const verify = require('../controller/verify.js').run

// 引入路由
const birth_router = require("./birth_router.js")

// 插件类
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require('cookie-parser')

module.exports = function(app){

    app.use(cookieParser())

    // 执行其他路由
    birth_router(app)

    app.get('/test',function(req,res){
        res.render('test/test.ejs', {json:'{name:[1,2,3]}'} )
    })
    // 渲染页面模板
    app.get('/account/login',function(req,res){
        res.render('account/login/index.ejs')
    })
    app.get('/account/register',function(req,res){
        res.render('account/register/index.ejs')
    })
    app.get('/index',function(req,res){
        res.render('index/index.ejs')
    })
    app.get('/task',function(req,res){
        res.render('task/index.ejs')
    })
    // get请求
    app.get('/',function(req,res){
        res.render('account/login/index.ejs')
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
