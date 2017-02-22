
// 引入数据模型
const tasklist = require('../dataModel/taskDataModel.js').tasklist
const session = require('../dataModel/sessionDataModel.js').session
const task_type = require('../dataModel/taskDataModel.js').task_type

// 引入数据库中间件
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
    let id =  req.cookies.sessions_id
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
    let ses_id = req.cookies.sessions_id
    let list = JSON.parse( req.body.list )
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return res.json({code:0}) }
            if(result.length){
                result[0].list_arr.map((i)=>{
                    if(i.list_id === list.list_id){ i.name = list.name }
                })
                tasklist.update({account:account},{list_arr:result[0].list_arr},(err,result)=>{
                    if(err){ return res.json({code:0}) }
                    if(result){ res.json({code:1}) }
                })
            }else{
                res.json({code:0})
            }
        })
    })
}
exports.updateListGroup = function(req,res){
}
exports.delTask = function(req,res){
    let ses_id = req.cookies.sessions_id
    let task_id = req.query.task_id

    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        let taskdata = mongoose.model(account,task_type)
        let obj = {}
            obj.id = task_id
        taskdata.remove(obj,(err,result)=>{
            if(err){return res.json({code:0}) }
            if(result){
                res.json({code:1})
            }
        })
    })
}
