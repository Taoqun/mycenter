const tasklist = require('../dataModel/taskDataModel.js').tasklist

exports.createTask = function(req,res){
}
exports.createTaskList = function(req,res){
}
exports.createListGroup = function(req,res){
}
exports.getTask = function(req,res){
    let account=''
    const session = require('../dataModel/sessionDataModel.js').session
    let id = decodeURIComponent( req.cookies.sessions_id )
    session.find({session_id:id},(err,result)=>{
        account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return console.log(err)}
            res.json(result)
        })
    })
}
exports.getList = function(req,res){
}
exports.getListGroup = function(req,res){
}
exports.updateTask = function(req,res){
}
exports.updateList = function(req,res){
}
exports.updateListGroup = function(req,res){
}
