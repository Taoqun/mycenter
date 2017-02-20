const session = require('../dataModel/sessionDataModel.js').session

exports.run = function(req,res,next){
    console.log('原始请求URL',req.originalUrl)
    console.log(typeof req.originalUrl )
    res.header('Access-Control-Allow-Origin', '*')
    if( req.originalUrl == '/account/sendRegister' || req.originalUrl == '/login'  ){
        next()
    }else if(req.cookies && req.cookies.sessions_id){
        let id = req.cookies.sessions_id
            id = decodeURIComponent(id)
            console.log(id)
        session.find({session_id:id},(err,result)=>{
            if(err){ return console.log(err) }
            if(result.length === 0){
                console.log('验证不通过，跳转！')
                res.clearCookie()
                res.redirect('/account/login')
            }else{
                res.cookie('account',result[0].account)
                next()
            }
        })
    }else{
        console.log('验证不通过，跳转！cookie不存在！需要登录')
        res.redirect('/account/login')
    }
}
