exports.login = function(req,res){

  console.log(req.query)
  let run = require('../dataController/loginController').run
      run.find(req,res)
}
