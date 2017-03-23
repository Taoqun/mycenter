const session = require("../dataModel/sessionDataModel.js").session



module.exports = function(session_id){
    return new Promise(function(resolve,reject){
        session.find({session_id:session_id},(err,result)=>{
            if(err){ return console.log(err) }
            if(result.length){
                resolve( result[0].account )
            }else{
                resolve('')
            }
        })
    })
}
