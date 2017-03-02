

/*
 * 导入相关的控制层
 * 
 */



const birth = require("../controller/birth.js")
const verify = require('../controller/verify.js').run
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false })

module.exports = function(app){
    app.get("/birth/getbirth",verify,birth.getbirth)
    app.post("/birth/setbirth",urlencodedParser,verify,birth.setbirth)
}
