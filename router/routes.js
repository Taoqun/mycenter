
let Login = require('../controller/login.js')
let Task = require('../controller/task.js')
let bodyParser = require('body-parser');
let urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.routers = function(app){
    // get请求
    app.all('*',(req,res,next)=>{
        res.header('Access-Control-Allow-Origin', '*')
        next()
    })

    app.get('/', (req, res) => {
        let cookie = req.cookies
        if(cookie.session_id){
            res.redirect('/task')
        }else{
            res.redirect('/account/login')
        }
    })

    app.get('/login', Login.login)

    app.post('/account/sendRegister',urlencodedParser,Login.register)
    app.post('/task/create',urlencodedParser,Task.create)
    app.use(function(req, res, next) {
        res.status(404).send('404 未找到')
    });

}
