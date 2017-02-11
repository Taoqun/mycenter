exports.login = function(req,res){
  let run = require('../dataController/loginController').run
      run.find(req,res)
}
