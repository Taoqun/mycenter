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
    let id = req.params.id
    let page = req.query.page || 1
    let userList = require("../dataModel/userInfoDataModel").userInfo

    userList.find({ _id: id }, (err, result) => {
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
                res.render("paper/index.html", obj)
            })
        })
    }
};

exports.getPaper = function(req, res) {

    let user_id = req.params.user_id
    let paper_id = req.params.paper_id
    let userList = require("../dataModel/userInfoDataModel").userInfo

    userList.find({ _id: user_id }, (err, result) => {
        if (err) {
            console.log(err)
            res.end("error,查找用户id错误")
            return
        }
        let account = result[0].account
        let markdown = mk(account)
        markdown.find({ _id: paper_id }, (err, result) => {
            // 返回文章的信息
            // 文章标签 关键词 标题 内容 时间 修改文章的地址 等等
            res.end(result[0]["content"])
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
exports.delPaper = (req, res) => {
    let sessions_id = req.sessions_id
    getAccount(sessions_id).then((account) => {
        let paper_id = req.body.paper_id
        let markdown = mk(account)
        let arr = []

        if (paper_id instanceof String) {
            arr.push(paper_id)
        } else if (paper_id instanceof Array) {
            arr = paper_id
        }

        let success = []
        let error = []

        // 从数据删除 并且判断是否全部遍历完成
        const remove = (item) => {
                markdown.remove({ paper_id: item }, (err) => {
                    if (err) { return console.log(err) }
                    if ((success.length + error.length) === arr.length || (success.length + error.length) === (arr.length - 1)) {
                        res.json({ code: 1, success: success.length, error: error.length })
                    }
                })
            }
            // 查询 判断是否查询成功 执行删除
        const find = (item) => {
            markdown.find({ paper_id: item }, (err, result) => {
                if (err) { return console.log(err) }
                if (result.length) {
                    success.push(item)
                    remove(item)
                } else {
                    error.push(item)
                }

            })
        }

        arr.map((item, index) => {
            find(item)
        })

    })
}
