// 对项目 模块 api 增查改删
const { projectList, moduleList , apiList } = require("../dataModel/apiDataModel.js")
const getAccount = require("./getAccount.js")
const error = require("./ajaxError.js")
// project 增查改删
exports.addProject = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
        let project_name = req.body.project_name
        if(!project_name){
            res.json({code:0,dis:"无项目名称"})
            return
        }
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
                res.json({code:0,dis:'项目名称已经存在'})
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
        if(!project_name || !project_id){
            res.json({code:0,dis:"缺少项目id或名称"})
            return
        }
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
        if(!_id){
            res.json({code:0,dis:"缺少id"})
            return
        }
        projectList.remove({_id:_id},(err,result)=>{
            if(err){ return error(err,res)}
            moduleList.remove({project_id:_id},(err,result)=>{
                if(err){ return error(err) }
                res.json({code:1,dis:"删除成功"})
            })
        })

    })
}
// api操作
exports.apiList = (req,res) => {
    let project_id = req.params.id
    projectList.find({_id:project_id},(err,result)=>{
        if(err){ return error(err,res) }
        let obj = {}
        if(result.length){
            obj.title = result[0]["project_name"]
            obj.project_id = result[0]["_id"]
            res.render("api/apiDetail",obj)
        }else{
            res.render("error/404.html")
        }
    })
}
// 模块增查改删
exports.addModule = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{

        let {project_id,module_name} = req.body
        if( !project_id || !module_name){
            res.json({code:0,dis:"缺少项目id或者模块名称"})
            return
        }

        let obj ={}
            obj.account = account
            obj.project_id = project_id
            obj.module_name = module_name

        moduleList.find(obj,(err,result)=>{
            if(err){return error(err)}
            if( !result.length ){
                let module = new moduleList(obj)
                module.save((err)=>{
                    if(err){ return error(err,res) }
                    let obj = {}
                        obj.module_name = module["module_name"]
                        obj.module_id = module["_id"]
                        obj.show = false
                        obj.project_id = module["project_id"]
                    res.json({code:1,obj})
                })
            }else{
                res.json({code:0,dis:"名称已存在"})
            }
        })
    })
}
exports.getModules = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let project_id = req.query.project_id
        moduleList.find({account,project_id},(err,result)=>{
            if(err){ return error(err,res) }
            let list = []
            result.map((item)=>{
                let obj = {}
                    obj.project_id = item.project_id
                    obj.module_name = item.module_name
                    obj.module_id = item["_id"]
                list.push(obj)
            })
            res.json({code:1,result:list})
        })
    })
}
exports.updateModule = (req,res) => {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let module_name = req.body.module_name
        let module_id = req.body.module_id
        if( !module_id || !module_name  ){
            res.json({code:0,dis:"模块id或名称为空"})
            return
        }
        moduleList.update({_id:module_id},{module_name},(err,result)=>{
            if(err){ return error(err,res) }
            res.json({code:1})
        })
    })
}
exports.deleteModule = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let module_id = req.body.module_id
        if( !module_id ){
            res.json({code:0,dis:"模块id或名称为空"})
            return
        }
        moduleList.remove({_id:module_id},(err,result)=>{
            if(err){ return error(err,res) }
            apiList.remove({account,module_id},(err,result)=>{
                if(err){ return error(err,res) }
                res.json({code:1})
            })
        })
    })
}
// api 增查改删
exports.addApi = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let obj = {}
            obj.project_id = req.body.project_id
            obj.module_id = req.body.module_id
            obj.api_name = req.body.api_name
            obj.account = account
            obj.create_date = Date.now() + (1000*60*60*8)
        if( !obj.project_id || !obj.module_id || !obj.api_name ){
            res.json({code:0,dis:"project_id or module_id or api_name is null"})
            return
        }
        let api = new apiList(obj)
        api.save((err)=>{
            if(err){return error(err,res)}
            apiList.find(obj,(err,result)=>{
                if(err){return error(err,res)}
                let obj = {}
                    obj.api_name = api["api_name"]
                    obj.api_id = api["_id"]
                    obj.module_id = api["module_id"]
                res.json({code:1,obj})
            })
        })

    })
}
exports.getApiList = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        apiList.find({account},(err,result)=>{
            if(err){ return error(err,res)}
            let list = []
            if(result.length){
                result.map((item,index)=>{
                    let obj = {}
                        obj.api_id = item["_id"]
                        obj.api_name = item.api_name
                        obj.module_id = item.module_id
                    list.push(obj)
                })
            }
            res.json({code:1,result:list})
        })
    })
}
exports.getApi = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let api_id = req.query.api_id
        if(!api_id){
            res.json({code:0,dis:"api_id为空"})
            return
        }
        apiList.find({account,_id:api_id},(err,result)=>{
            if(err){ return error(err,res) }
            res.json({code:1,result:result[0]})
        })
    })
}
exports.updateApi = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let find = {}
            find.account = account
            find.api_id = req.body.api_id
        if(!find.api_id){
            res.json({code:0,dis:"api_id is undefined"})
            return
        }
        let obj = {}
            obj.update_date = Date.now() + (1000*60*60*8)
            req.body.api_name ? obj.api_name = req.body.api_name :''
            req.body.api_type ? obj.api_type = req.body.api_type : ''
            req.body.api_url ? obj.api_url = req.body.api_url : ''
            req.body.api_header && JSON.parse(req.body.api_header) instanceof Array ? obj.api_header = JSON.parse(req.body.api_header) : ''
            req.body.api_request_data && JSON.parse(req.body.api_request_data) instanceof Array ? obj.api_request_data = JSON.parse(req.body.api_request_data) : ''
            req.body.api_response_data ? obj.api_response_data = req.body.api_response_data : ''
            req.body.api_markdown ? obj.api_markdown = req.body.api_markdown : ''
        apiList.update({_id:find.api_id},obj,(err,result)=>{
            if(err){ return error(err,res)}
            res.json({code:1})
        })
    })
}
exports.deleteApi = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        let obj = {}
            obj.api_id = req.body.api_id
            if(!obj.api_id){
                res.json({code:0,dis:"api_id is null"})
                return
            }
            apiList.remove({_id:obj.api_id},(err,result)=>{
                if(err){ return error(err,res) }
                res.json({code:1})
            })
    })
}
