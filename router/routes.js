
let Login = require('../controller/login.js')
let Task = require('../controller/task.js')
let run = require('../controller/verify.js').run
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })
const cookieParser = require('cookie-parser')

exports.routers = function(app){

    app.use(cookieParser())

    // get请求
    app.get('/task',run)
    app.get('/login', Login.login)
    app.post('/account/sendRegister',urlencodedParser,Login.register)

    app.post('/task/createTask',urlencodedParser,run,Task.createTask)
    app.get('/task/getTask',run,Task.getTask)
    app.use(function(req, res, next) {
        res.status(404).send('404 未找到')
    });

}
