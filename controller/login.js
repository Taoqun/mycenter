let run = require('../dataController/loginController').run

exports.login = function(req,res){

      run.find(req,res)
}

exports.register = function(req,res){
    run.save(req,res)
}
