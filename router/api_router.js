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

    app.get("/api/project/:id",verify,Api.apiList)

}
