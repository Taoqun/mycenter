const mk = require('../dataModel/markdownDataModel.js').getMarkdownModel

const getAccount = require("./getAccount.js")


exports.addPaper = function(req, res) {
    let sessions_id = req.cookies.sessions_id
    if (!sessions_id) { return res.json({ code: 0, des: '没有session_id' }) };

    getAccount(sessions_id).then((account) => {
        let obj = {}

        // 验证id id规则 账户名 加 下划线 加 13位日期数字化
        // 793264946@qq.com_1234567890123
        if (req.body.paper_id) {
            obj.paper_id = req.body.paper_id
        } else {
            res.json({ code: 0, des: '没有生成id' })
            return
        }
        if (obj.paper_id.indexOf(account) === -1) {
            res.json({ code: 0, des: 'id不正确' })
            return
        }
        if (!/\d{13}/.test(obj.paper)) {
            res.json({ code: 0, des: 'id不正确' })
            return
        }

        let markdown = mk(account)

        markdown.find({ paper_id: obj.paper_id }, (err, result) => {
            if (err) { return console.log(err) }

            if (result.length) {

                res.json({ code: 2, des: 'id已存在' })
            } else {

                obj.name = req.body.name
                obj.title = req.body.title
                obj.date = Date.now()
                obj.keywords = req.body.keywords
                obj.content = req.body.content
                obj.type = req.body.type

                let md = new markdown(obj)

                md.save((err) => {
                    if (err) { return console.log(err) }
                    res.json({ code: 1, des: 'success' })
                })
            }
        })
    })

};

exports.getPaperList = function(req, res) {
    let sessions_id = req.cookies.sessions_id
    if (!sessions_id) { return res.json({ code: 0, des: '没有sessions_id' }) }
    getAccount(sessions_id).then((account) => {
        let markdown = mk(account)

        let pageSize = req.query.pageSize || 10
            pageSize = parseInt(pageSize) || 10

        let currentPage = req.query.currentPage || 0
            currentPage = parseInt(currentPage) || 0

        let skips = currentPage * pageSize

        let type = req.query.type || ''

        markdown.find({ type: type }).skip(skips).limit(pageSize).sort({ "date": 1 }).exec((err, result) => {
            if (err) { return console.log(err) }

            if (result.length) {
                res.json(result[0])
            } else {
                res.json({ code: 0, des: '无数据' })
            }
        })
    })

};
exports.upPaper = function(req, res) {
    let sessions_id = req.sessions_id
    getAccount(sessions_id).then((account) => {
        let markdown = mk(account)
        let obj = {}

        if (req.body.paper_id) {
            obj.paper_id = req.body.paper_id
        } else {
            res.json({ code: 0, des: '无id' })
            return
        }

        obj.title = req.body.title
        obj.keywords = req.body.keywords
        obj.content = req.body.content
        obj.type = req.body.type

        markdown.find({ paper_id: obj.paper_id }, (err, result) => {
            if (err) { return console.log(err) }

            if (result.length === 1) {
                markdown.update({ paper_id: obj.paper_id }, obj, (err) => {
                    if (err) { return console.log(err) }
                    res.json({ code: 1, des: 'success' })
                })
            } else {
                res.json({ code: 0, des: '没有查到文章' })
            }
        })
    })
};
exports.delPaper = (req,res) => {
    let sessions_id = req.sessions_id
    getAccount(sessions_id).then((account) => {
        let paper_id = req.body.paper_id
        let markdown = mk(account)
        let arr = []

        if(paper_id instanceof String){
            arr.push( paper_id )
        }else if( paper_id instanceof Array ){
            arr = paper_id
        }

        let success = []
        let error = []

        // 从数据删除 并且判断是否全部遍历完成
        const remove = (item) => {
            markdown.remove({paper_id:item},(err)=>{
                if(err){ return console.log(err) }
                if( (success.length + error.length) === arr.length  || (success.length + error.length) === (arr.length - 1) ){
                    res.json( {code:1,success:success.length,error:error.length} )
                }
            })
        }
        // 查询 判断是否查询成功 执行删除
        const find = (item)=>{
            markdown.find( { paper_id:item },(err,result)=>{
                if(err){ return console.log(err) }
                if( result.length ){
                    success.push(item)
                    remove(item)
                }else{
                    error.push(item)
                }

            })
        }

        arr.map(( item, index ) => {
            find(item)
        })

    })
}
