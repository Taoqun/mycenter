const markdown = require("../controller/markdown.js")

const verify = require('../controller/verify.js').run
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app){
    app.get("/getPaperList",verify,markdown.getUserId)
    app.get("/getPaperList/:id",markdown.getPaperList)

    // 文章 增查改删 页面渲染
    app.get("/paper/:user_id/:paper_id",markdown.getPaper)
    app.get("/addPaper/:user_id",verify,markdown.addPaper)
    app.get("/updatePaper/:user_id/:paper_id",verify,urlencodedParser,markdown.updatePaper)
    app.get("/delPaper/:user_id/:paper_id",verify,markdown.delPaper)
}
