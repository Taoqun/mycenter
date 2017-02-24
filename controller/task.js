
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
exports.getTask = function(req,res){
    let id = req.cookies.sessions_id
    let list_id = req.query.list_id
    session.find({session_id:id},(err,result)=>{
        if(err){return}
        let account = result[0].account
        var taskdata = mongoose.model(account,task_type)
        if(list_id === 'all'){
            taskdata.find({},(err,result)=>{
                if(err){return res.json({code:0})}
                res.json(result)
            })
        }else if(list_id === 'box'){
            taskdata.find({list_id:''},(err,result)=>{
                if(err){return res.json({code:0})}
                res.json(result)
            })
        }else{
            let obj = {}
            obj.list_id =  list_id
            taskdata.find(obj,(err,result)=>{
                if(err){return res.json({code:0})}
                res.json(result)
            })
        }

    })
}
exports.updateTask = function(req,res){
    let id = req.cookies.sessions_id
    let task = JSON.parse( req.body.task )
    session.find({session_id:id},(err,result)=>{
        if(err){return}
        let account = result[0].account
        var taskdata = mongoose.model(account,task_type)
        taskdata.update({id:task.id},task,(err,result)=>{
            if(err){ return res.json({code:0}) }
            res.json({code:1})
        })
    })
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

// 返回用户的清单列表
exports.addList = function(req,res){
    let ses_id = req.cookies.sessions_id
    let list =  JSON.parse(req.body.list)
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return res.json({code:0}) }
            var list_arr = result[0].list_arr
                list_arr.unshift(list)

            tasklist.update({account:account},{list_arr:list_arr},(err,result)=>{
                if(err){ return res.json({code:0}) }
                if(result){
                    res.json({code:1})
                }
            })
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
exports.delList = function(req,res){
    let ses_id = req.cookies.sessions_id
    let list_id =  req.query.list_id
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){ return res.json({code:0}) }
            var list_arr = result[0].list_arr
                list_arr.map( (i,index)=>{
                    if(i.list_id === list_id){
                        list_arr.splice(index,1)
                    }
                })
            tasklist.update({account:account},{list_arr:list_arr},(err,result)=>{
                if(err){return res.json({code:0}) }
                if(result){
                    res.json({code:1})
                }
            })
        })
    })
}

exports.addGroup = function(req,res){
    let ses_id = req.cookies.sessions_id
    let list =  JSON.parse(req.body.list)
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return res.json({code:0}) }
            var group_arr = result[0].group_arr
                group_arr.unshift(list)
            tasklist.update({account:account},{group_arr:group_arr},(err,result)=>{
                if(err){ return res.json({code:0}) }
                if(result){
                    res.json({code:1})
                }
            })
        })
    })
}
exports.getGroup = function(req,res){}
exports.updateGroup = function(req,res){
    let ses_id = req.cookies.sessions_id
    let list = JSON.parse( req.body.list )
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){return res.json({code:0}) }
            if(result.length){
                result[0].group_arr.map((i)=>{
                    if(i.group_id === list.group_id){ i.name = list.name }
                })
                tasklist.update({account:account},{group_arr:result[0].list_arr},(err,result)=>{
                    if(err){ return res.json({code:0}) }
                    if(result){ res.json({code:1}) }
                })
            }else{
                res.json({code:0})
            }
        })
    })
}
exports.delGroup = function(req,res){
    let ses_id = req.cookies.sessions_id
    let group_id =  req.query.group_id
    session.find({session_id:ses_id},(err,result)=>{
        let account = result[0].account
        tasklist.find( {account:account} , (err,result)=>{
            if(err){ return res.json({code:0}) }
            var group_arr = result[0].group_arr
                group_arr.map( (i,index)=>{
                    if(i.group_id === group_id){
                        group_arr.splice(index,1)
                    }
                })
            tasklist.update({account:account},{group_arr:group_arr},(err,result)=>{
                if(err){return res.json({code:0}) }
                if(result){
                    res.json({code:1})
                }
            })
        })
    })
}
