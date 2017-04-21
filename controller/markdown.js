const Paper = require('../dataModel/markdownDataModel.js').getPaperModel
const userInfo = require("../dataModel/userInfoDataModel.js").userInfo
const getAccount = require("./getAccount.js")
const error = require("./error.js")

exports.getUserId = (req,res)=>{
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
            userInfo.find({account:account},(err,result)=>{
                if(err){ return console.log(err) }
                let id = result[0]["_id"]
                res.redirect("/getPaperList/"+id)
            })
    })
};
exports.getPaperList = function(req, res) {
    let id = req.params.id
    let page = req.query.page || 1

    userInfo.find({ _id: id }, (err, result) => {
        if (err) {
            error(err,res)
            return
        }
        if (result.length === 1) {
            render_paper(result[0].account)
        } else {
            res.render("error/404.html",{tips:'没有查找到账户'})
        }
    })

    function render_paper(account) {
        let markdown = Paper
        markdown.count({account}, (err, count) => {
            if (err) {
                error(err,res)
                return
            }
            if (page > count / 10) {
                page = Math.ceil(count / 10)
            }
            if (page <= 0) {
                page = 1
            }
            markdown.find({account}).sort({ date: -1 }).limit(10).skip((page - 1) * 10).exec((err, result) => {
                if (err) {
                    error(err,res)
                    return
                }
                let obj = {}
                obj.list = result
                obj.account = account
                obj.name = result[0].name
                obj.userid = id
                obj.page = Math.ceil(count / 10)
                obj.active = page
                obj.maxpage = page
                // 渲染模板
                res.render("paperlist/index.html", obj)
            })
        })
    }
};
exports.addPaper = function(req, res) {
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        addPaper(account)
    });
    function addPaper(account){
        userInfo.find({account:account},(err,result)=>{
            if(err){ error(err,res) ;return; }
            if(result.length){
                let account = result[0].account
                let user_id = result[0]["_id"]
                let name = result[0]["name"]
                let paper_id = account + '_' +  (new Date()).valueOf()
                let date = parseInt( (new Date()).valueOf() ) + (1000*60*60*8)
                let paper = new Paper({
                    account:account,
                    date:(new Date(date)).valueOf(),
                    title:"",
                    name:name,
                    content:'',
                    des:"暂无内容",
                    paper_id:paper_id,
                })
                paper.save( (err) => {
                    if(err){ error(err,res) ;return; }
                    Paper.find({paper_id:paper_id},(err,result) => {
                        if(err){ return console.log(err) }
                        let paper_id = result[0]["_id"]
                        let str = "/updatePaper/"+user_id +'/' +paper_id
                        res.redirect(str)
                    })
                })
            }else{
                res.render("/error/404.html")
            }
        })
    }
};
exports.getPaper = function(req, res) {
    let user_id = req.params.user_id
    let paper_id = req.params.paper_id
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account)=>{
        userInfo.find({ _id: user_id }, (err, result) => {
            if(err){ error(err,res) ;return; }
            let Paper_account = result[0].account
            let author = (account === Paper_account)
            verifyAccount(author,Paper_account)
        })
    })
    function verifyAccount(author,Paper_account){
        Paper.find({ _id: paper_id }, (err, result) => {
            if(err){ error(err,res) ;return; }
            // 渲染模板
            // 文章标签 关键词 标题 内容 时间 修改文章的地址 等等
            let paper = result[0]
            let date = paper.date.getFullYear() +"-"+ (paper.date.getMonth()+1) +"-"+ paper.date.getDate()
            let hyperdown = require("hyperdown")
            let parse =  new hyperdown()
            let content = parse.makeHtml( paper.content )
            let obj = {}

            obj.title = paper.title
            obj.name = paper.name
            obj.keywords = paper.keywords
            obj.date = date
            obj.content = content
            obj.length = paper.content.length
            obj.user_id = user_id
            obj.paper_id = paper_id
            obj.author = author
            res.render("paper/index.html",obj)
        })
    }
};
exports.updatePaper = function(req, res) {
    let user_id = req.params.user_id
    let paper_id = req.params.paper_id
    userInfo.find({_id:user_id},(err,result) => {
        if(err){ error(err,res) ;return; }
        if( result.length ){
            let account = result[0]["account"]
            Paper.find( {_id:paper_id} , (err,result) => {
                if(err){ return console.log(err) }
                if(result.length){
                    let obj = result[0]
                        obj.user_id = user_id
                    res.render("markdown/index.html",obj)
                }
            })
        }
    })
};
exports.savePaper = (req,res)=>{
    let title = req.body.title
    let content = req.body.content
    let keywords = req.body['keywords[]']
    let user_id = req.body.user_id
    let paper_id = req.body.paper_id
    let sessions_id = req.cookies.sessions_id
    getAccount(sessions_id).then((account) => {
        let obj = {}
        obj.title = title
        obj.content = content
        if( keywords && Array.isArray(keywords) ){
            obj.keywords = keywords
        }else if(keywords && typeof keywords === 'string'){
            obj.keywords = [keywords]
        }else{
            obj.keywords = []
        }
        obj.des = content.substr(0,500).replace( /[\#\-\*\>\``]/gi,'')
        Paper.update({_id:paper_id},obj,(err,result)=>{
            if(err){
                console.log(err)
                res.json({code:0,des:"error"})
                return
            }
            res.json({code:1,des:"success"})
        })
    })
};
exports.delPaper = (req, res) => {
    let user_id = req.params.user_id
    let paper_id = req.params.paper_id
    userInfo.find({_id:user_id},(err,result) => {
        if(err){ error(err,res) ;return; }
        if( result.length ){
            let account = result[0]["account"]
            Paper.find( {_id:paper_id} , (err,result) => {
                if(err){ return console.log(err) }
                if(result.length){
                    Paper.remove( {_id:paper_id},(err,result) => {
                        let str = '/getPaperList/'+user_id
                        res.redirect(str)
                    })
                }
            })
        }
    })
};
