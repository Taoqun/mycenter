const markdown = require("../controller/markdown.js")

const verify = require('../controller/verify.js').run
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })


module.exports = function(app){
    app.get("/getPaperList/:id",markdown.getPaperList)
    app.post("/markdown/setPaper",verify,urlencodedParser,markdown.addPaper)
    app.post("/markdown/upPaper",verify,urlencodedParser,markdown.upPaper)

    // 查看文章
    app.get("/paper/:user_id/:paper_id",markdown.getPaper)
}
