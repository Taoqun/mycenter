
//  控制器 逻辑
const Login = require('../controller/login.js')
const Task = require('../controller/task.js')


const verify = require('../controller/verify.js')

// 引入路由
const birth_router = require("./birth_router.js")
const markdown_router = require("./markdown.js")
const api_router = require("./api_router.js")
// 插件类
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require('cookie-parser')

module.exports = function(app){

    app.use(cookieParser())

    // 执行其他路由
    birth_router(app);
    markdown_router(app);
    api_router(app);

    app.get('/test',function(req,res){
        res.render('test/test.ejs', {json:'{name:[1,2,3]}'} )
    })

    app.get('/',function(req,res){
        res.redirect('/account/login')
    })

    // 登录注册请求
    app.get('/login', Login.login)
    app.post('/account/sendRegister',urlencodedParser,Login.register)
    app.get('/account/exit',Login.exit)

    // 获取更新个人资料
    app.get('/account/getUserInfo',verify,Login.getUserInfo)
    app.post("/account/updateAvatar",urlencodedParser,verify,Login.updateAvatar)
    app.post('/account/updateUserInfo',urlencodedParser,verify,Login.updateUserInfo)
    app.post('/account/delAccount',urlencodedParser,verify,Login.delAccount)

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
        res.status(404).render('error/404.html',{tips:''})
    });
}
