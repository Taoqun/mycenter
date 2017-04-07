const Api = require("../controller/api.js")
const verify = require("../controller/verify.js")

const bodyParser = require("body-parser")
const parser = bodyParser.urlencoded({extended:false})


module.exports = (app)=>{
    // api 项目增查改删
    app.get("/api/getApiProject",verify,Api.getProject)
    app.post("/api/addProject",parser,verify,Api.addProject)
    app.post("/api/updateProject",parser,verify,Api.updateProject)
    app.post("/api/deleteProject",parser,verify,Api.deleteProject)

    // 渲染api详情页面
    app.get("/api/project/:id",verify,Api.apiList)

    // 模块增查改删
    app.get("/api/getModules",verify,Api.getModules)
    app.post("/api/addModule",parser,verify,Api.addModule)
    app.post("/api/updateModule",parser,verify,Api.updateModule)
    app.post("/api/deleteModule",parser,verify,Api.deleteModule)

    // api增查改删

    app.get("/api/getApi",verify,Api.getApi)
    app.post("/api/addApi",parser,verify,Api.addApi)
    app.post("/api/updateApi",parser,verify,Api.updateApi)
    app.post("/api/deleteApi",parser,verify,Api.deleteApi)
}
