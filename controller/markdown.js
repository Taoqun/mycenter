const mk = require('../dataModel/markdownDataModel.js').getMarkdownModel
const userInfo = require("../dataModel/userInfoDataModel.js").userInfo
const getAccount = require("./getAccount.js")

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
            console.log(err);
            res.end("服务器错误，查询账户失败!")
            return
        }
        if (result.length === 1) {
            render_paper(result[0].account)
        } else {
            res.end("没有查询到账户")
        }
    })

    function render_paper(account) {
        let markdown = mk(account)
        markdown.count({}, (err, count) => {
            if (err) {
                console.log(err)
                res.end("服务器错误")
                return
            }
            if (page > count / 10) {
                page = Math.ceil(count / 10)
            }
            if (page <= 0) {
                page = 1
            }
            markdown.find({}).sort({ date: -1 }).limit(10).skip((page - 1) * 10).exec((err, result) => {
                if (err) {
                    console.log(err)
                    res.end("服务器错误")
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
    let user_id = req.params.user_id
    userInfo.find({_id:user_id},(err,result)=>{
        if(err){ return console.log(err) }
        if(result.length){
            let account = result[0].account
            let name = result[0]["name"]
            let md = mk(account)
            let paper_id = account + '_' +  (new Date()).valueOf()
            let date = parseInt( (new Date()).valueOf() ) + (1000*60*60*8)
            let paper = new md({
                account:account,
                date:(new Date(date)).valueOf(),
                title:"无标题文章",
                name:name,
                content:'暂无内容',
                des:"暂无内容",
                paper_id:paper_id,
            })
            paper.save( (err) => {
                if(err){ return console.log(err) }
                md.find({paper_id:paper_id},(err,result) => {
                    if(err){ return console.log(err) }
                    let paper_id = result[0]["_id"]
                    let str = "/updatePaper/"+user_id +'/' +paper_id
                    res.redirect(str)
                })
            })
        }else{
            res.end("用户不存在")
        }
    })
};

exports.getPaper = function(req, res) {

    let user_id = req.params.user_id
    let paper_id = req.params.paper_id
    let sessions_id = req.cookies.sessions_id

    getAccount(sessions_id).then((account)=>{
        userInfo.find({ _id: user_id }, (err, result) => {
            if (err) {
                console.log(err)
                res.end("error,查找用户id错误")
                return
            }
            let Paper_account = result[0].account
            let author = (account === Paper_account)
            verifyAccount(author,Paper_account)
        })
    })
    function verifyAccount(author,Paper_account){
        let markdown = mk(Paper_account)
        markdown.find({ _id: paper_id }, (err, result) => {
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
        if(err){ return console.log(err) }
        if( result.length ){
            let account = result[0]["account"]
            let md = mk(account)
                md.find( {_id:paper_id} , (err,result) => {
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
        let md = mk(account)
        let obj = {}
            obj.title = title
            obj.content = content
            if( keywords && Array.isArray(keywords) ){
                obj.keywords = keywords
            }
            obj.des = content.substr(0,500).replace( /[\#\-\*\>\``]/gi,'')
        md.update({_id:paper_id},obj,(err,result)=>{
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
        if(err){ return console.log(err) }
        if( result.length ){
            let account = result[0]["account"]
            let md = mk(account)
                md.find( {_id:paper_id} , (err,result) => {
                    if(err){ return console.log(err) }
                    if(result.length){
                        md.remove( {_id:paper_id},(err,result) => {
                            let str = '/getPaperList/'+user_id
                            res.redirect(str)
                        })
                    }
                })
        }
    })
};
