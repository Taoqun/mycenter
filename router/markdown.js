const markdown = require("../controller/markdown.js")
const verify = require('../controller/verify.js')
const renderVerify = require("../controller/renderVerify.js")
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app){
    app.get("/getPaperList",renderVerify,markdown.getUserId)
    app.get("/getPaperList/:id",markdown.getPaperList)
    // 文章 增查改删 页面渲染
    app.get("/paper/:user_id/:paper_id",markdown.getPaper)
    app.get("/addPaper/",renderVerify,markdown.addPaper)
    app.get("/updatePaper/:user_id/:paper_id",renderVerify,markdown.updatePaper)
    app.get("/delPaper/:user_id/:paper_id",renderVerify,markdown.delPaper)
    app.post("/paper/savePaper",renderVerify,urlencodedParser,markdown.savePaper)
}
