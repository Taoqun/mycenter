const session = require('../dataModel/sessionDataModel.js').session

exports.run = function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*')
    if(req.cookies && req.cookies.sessions_id){
        let id = req.cookies.sessions_id
        session.find({session_id:id},(err,result)=>{
            if(err){ return console.log(err) }
            if(result.length === 0){
                res.json({code:0})
            }else{
                res.cookie('account',result[0].account)
                next()
            }
        })
    }else{
        res.json({code:0})
    }
}
