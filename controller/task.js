const tasklist = require('../dataModel/taskDataModel.js').tasklist
const session = require('../dataModel/sessionDataModel.js').session
const task_type = require('../dataModel/taskDataModel.js').task_type

const mongoose = require('mongoose')

// 创建任务
exports.createTask = function(req,res){
    let obj = JSON.parse( req.body.obj )
    let id = req.cookies.sessions_id
    session.find({session_id:id},(err,result)=>{
        let account = result[0].account
        var taskdata = mongoose.model(account,task_type)
        let newtask = new taskdata(obj)
            newtask.save(function(err){
                if(err){return res.json({code:0})}
                res.json({code:1})
            })
    })

}
exports.createTaskList = function(req,res){
}
exports.createListGroup = function(req,res){
}
// 返回用户的清单列表
exports.getTask = function(req,res){
    let id = req.cookies.sessions_id
    let list_id = req.query.list_id
    session.find({session_id:id},(err,result)=>{
        if(err){return}
        let account = result[0].account
        var taskdata = mongoose.model(account,task_type)
        let obj = {}
            obj.list_id =  list_id
        taskdata.find(obj,(err,result)=>{
            if(err){return res.json({code:0})}
            res.json(result)
        })
    })
}
exports.getList = function(req,res){

    let id = decodeURIComponent( req.cookies.sessions_id )
    session.find({session_id:id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return console.log(err)}
            let obj = {}
            obj.list_arr = result[0].list_arr
            obj.group_arr = result[0].group_arr
            res.json(obj)
        })
    })
}
exports.getListGroup = function(req,res){
}
exports.updateTask = function(req,res){

}
exports.updateList = function(req,res){
}
exports.updateListGroup = function(req,res){
}
