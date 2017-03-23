
const sessions = require("../dataModel/sessionDataModel.js").session


module.exports = (req,res,next) => {
    res.header('Access-Control-Allow-Origin', '*')
    if( req.cookies && req.cookies.sessions_id ){
        sessions.find( { session_id : req.cookies.sessions_id } ,(err, result) => {
            if(err){
                console.log(err)
                res.render("error/404.html",{tips:"服务器错误！"})
                return
            }
            if(result.length){
                next()
            }else{
                res.render("error/404.html",{tips:"您没有登录"})
            }
        })
    }else{
        res.render("error/404.html",{tips:"您没有登录"})
    }
}
