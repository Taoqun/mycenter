
let Login = require('../controller/login.js')
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false })

exports.routers = function(app){
    // get请求
    app.get('/', (req, res) => {
        res.redirect('/account/login')
    })

    app.get('/index', (req, res) => {
        res.redirect('/account/login')
    })

    app.get('/account', (req, res) => {
        res.redirect('/account/login')
    })

    app.get('/index/login',(req,res)=>{
        res.redirect('/account/login')
    })

    app.get('/login', Login.login)

    app.post('/account/sendRegister',urlencodedParser,Login.register)

    app.use(function(req, res, next) {
        res.status(404).send('404 未找到')
    });

}
