
let Login = require('../controller/login.js')
let Task = require('../controller/task.js')
let verify = require('../controller/verify.js').run
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require('cookie-parser')

module.exports = function(app){

    app.use(cookieParser())

    // get请求
    app.get('/login', Login.login)
    app.post('/account/sendRegister',urlencodedParser,Login.register)

    app.post('/task/createTask',urlencodedParser,verify,Task.createTask)
    app.get('/task/getTask',verify,Task.getTask)
    app.post('/task/updateTask',urlencodedParser,verify,Task.updateTask)
    app.get('/task/delTask',verify,Task.delTask)

    app.get('/task/getList',verify,Task.getList)
    app.post('/task/updateList',urlencodedParser,verify,Task.updateList)
    app.use(function(req, res, next) {
        res.status(404).send('404 未找到')
    });
}
