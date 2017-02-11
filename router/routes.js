
let Login = require('../controller/login.js')

exports.routers = function(app){
  // get请求
  app.get('/', (req, res) => {
    res.sendFile(__dirname, 'index/index.html')
  })

  app.get('/index', (req, res) => {
    res.sendFile(__dirname, 'index/index.html')
  })

  app.get('/index/login',(req,res)=>{
    res.redirect('/index/index.html')
  })

  app.get('/login', Login.login)

  app.use(function(req, res, next) {
      res.status(404).send('404 未找到')
  });

}
