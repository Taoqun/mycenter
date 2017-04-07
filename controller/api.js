// 对项目 模块 api 增查改删

const { projectList, moduleList , apiList } = require("../dataModel/apiDataModel.js")
const getAccount = require("./getAccount.js")
const error = require("./ajaxError.js")


// project 增查改删
exports.addProject = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
        let project_name = req.body.project_name
        let obj = {}
            obj.project_name = project_name
            obj.create_date = Date.now() + (1000*60*60*8)
            obj.account = account
        projectList.find({ account,project_name },(err,result) => {
            if(err){ return error(err,res) }

            if(!result.length){
                let project = new projectList(obj)
                project.save((err) => {
                    if(err){ return error(err,res) }
                    projectList.find({ account,project_name },(err,result) => {
                        if(err){ return error(err,res) }
                        if(result.length === 1){
                            let id = result[0]["_id"]
                            let project_name = result[0]["project_name"]
                            let create_date = result[0]["create_date"]
                            res.json({code:1,id,project_name,account,create_date})
                        }else{
                            res.json({code:0,dis:'错误，出现重名项目'})
                        }
                    })
                })
            }else{
                res.json({code:2,dis:'项目名称已经存在'})
            }
        })
    })
}
exports.getProject = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
        projectList.find({account},(err,result) => {
            if(err){ return error(err,res)}
            if(result.length){
                let list = []
                    result.forEach((item,index) => {
                        let obj = {}
                            obj.project_name = item.project_name
                            obj.account = item.account
                            obj.id = item["_id"]
                            obj.create_date = item.create_date.valueOf()
                        list.push(obj)
                    })
                res.json({code:1,result:list})
            }else{
                res.json({code:3,result})
            }
        })
    })
}
exports.updateProject = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
        let project_name = req.body.project_name
        let project_id = req.body.project_id

        projectList.update({_id:project_id},{project_name},(err,result)=>{
            if(err){ return error(err,res)}
            res.json({code:1,dis:'更新成功'})
        })
    })
}
exports.deleteProject = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let _id = req.body.id
        projectList.remove({_id:_id},(err,result)=>{
            if(err){ return error(err,res)}
            res.json({code:1,dis:"删除成功"})
        })
    })
}

// api操作
exports.apiList = (req,res) => {
    let project_id = req.params.id

    res.render("api/apiDetail")

}
