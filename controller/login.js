const userInfo = require('../dataModel/userInfoDataModel.js').userInfo
const getaccount = require("./getAccount.js")


// 登录账户验证
exports.login = function(req, res) {
    let obj = {
            account: req.query.account,
            password: req.query.password
        }
        // 检测账号密码 是否符合规则
    if (!obj.account || !obj.password) {
        res.json({
            code: 0,
            tips: '麻烦不要传空值！'
        })
        return
    }
    if (!/.+@.+\..+/.test(obj.account)) {
        res.json({
            code: 2,
            tips: '邮箱不符合规则'
        })
        return
    }
    if (obj.password.length < 6) {
        res.json({
            code: 3,
            tips: '密码太短不符合规则'
        })
        return
    }
    // 检查账号是否已经注册
    userInfo.find({ account: obj.account }, (err, result) => {

        if (err) {
            return console.log(err)
        }

        if (result && result.length === 1) {
            if (obj.password === result[0].password) {
                let name = result[0].name
                let account = obj.account
                    // 获取账号的状态 是否已经登录
                    // 登录返回 session_id
                    // 未登录 生成 session_id 存储并返回
                let setSession = require('../dataModel/sessionDataModel.js').session
                setSession.find({ account: obj.account }, (err, result) => {
                    if (result.length === 0) {
                        let ss = Math.random().toString(36).substr(2)
                        let obj = new setSession({
                            session_id: ss,
                            account: account,
                            name: name,
                        })
                        obj.save((err) => {
                            if (err) {}
                            res.cookie('sessions_id', ss)
                            res.cookie('account', account)
                            res.json({ code: 1, verify: true, account: true, password: true })
                        })
                    } else {
                        res.cookie('sessions_id', result[0].session_id)
                        res.json({ code: 1, verify: true, account: true, password: true })
                    }
                })
            } else {
                res.json({
                    code: 0,
                    verify: false,
                    account: true,
                    password: false
                })
            }
        } else {
            res.json({
                code: 0,
                verify: false,
                account: false,
                password: false
            })
        }
    })
}
// 注册保存账户
exports.register = function(req, res) {

    // 存储需要注册的账号密码
    let account = req.body.account.trim()
    let password = req.body.password.trim()
    let name = req.body.name.trim()

    // 查找是够有相同的账户
    userInfo.find({ account: account }, (err, result) => {
        if (err) { return console.log(err) }

        // 账户不存在 进行保存
        if (result && result.length === 0) {
            let id = Date.now()
            let add = new userInfo({
                account: account,
                password: password,
                name: name,
                avatar:'/image/avatar.png',
                date: Date.now()
            })

            // 生成session id
            getSessionId()

            function getSessionId() {
                let session_id = Math.random().toString(36).substr(2)
                let setSession = require('../dataModel/sessionDataModel.js').session

                setSession.find({ session_id: session_id }, (err, result) => {
                    if (result.length === 0) {
                        // 存储session_id 到数据库
                        let ses_id = new setSession({
                            session_id: session_id,
                            account: account,
                            name: name,
                        })
                        res.clearCookie()
                        ses_id.save(function(err) {})
                            // 清除cookie
                            // 设置session id
                            // 保存
                        add.save(function(err) {
                            if (err) { return res.json({ register: false, dis: '保存失败!' }) }

                            res.cookie('sessions_id', session_id)
                            res.cookie('account', decodeURIComponent(account))
                            require("../dataModel/markdownDataModel.js").init(account)
                            require('../dataModel/taskDataModel.js').run.init(account, res)
                                //res.json({register:true})
                        })
                    } else {
                        getSessionId()
                    }
                })
            }
        } else {
            // 账户存在返回false
            res.json({ register: false, dis: '账户已存在!' })
        }
    })
}
// 退出 清除session
exports.exit = function(req, res) {
        let session_id = req.cookies.sessions_id
        getaccount(session_id).then((account) => {
            let session = require('../dataModel/sessionDataModel.js').session
            session.remove({ account: account }, (err) => {
                if (err) {
                    console.log(err);
                    res.json({ code: 0 });
                    return
                }
                res.json({ code: 1 })
            })
        })
    }
    // 获取用户信息
exports.getUserInfo = function(req, res) {
    let session_id = req.cookies.sessions_id
    getaccount(session_id).then((account) => {
        userInfo.find({ account: account }, (err, result) => {
            if (err) { return console.log(err) }

            let obj = result[0]
            let json = {}
            json.name = obj.name
            json.phone = obj.phone
            json.email = obj.email
            json.avatar = obj.avatar ? '/image/'+obj.avatar : '/image/avatar.png'
            json.sex = obj.sex
            json.date = obj.date.valueOf()
            json.birth_day = obj.birth_day
            res.json(json)
        })
    })
}
// 更新用户信息
exports.updateUserInfo = function(req, res) {
    let session_id = req.cookies.sessions_id
    let obj = {}
    if (req.body.name) { obj.name = req.body.name }
    if (req.body.email) { obj.email = req.body.email }
    if (req.body.phone) { obj.phone = req.body.phone }
    if (req.body.sex) { obj.sex = req.body.sex }
    if (req.body.birth_day) { obj.birth_day = parseInt(req.body.birth_day) + (8 * 1000 * 60 * 60) }
    getaccount(session_id).then((account) => {
        userInfo.update({ account: account }, obj, (err, result) => {
            if (err) {
                console.log(err);
                res.json({ code: 0 });
                return
            }
            res.json({ code: 1 })
        })
        let session = require("../dataModel/sessionDataModel.js").session
        session.update({ session_id: session_id }, { name: obj.name }, (err, result) => {
            if (err) { return console.log(err) }
        })
    })
}
// 更新上传头像
exports.updateAvatar = function(req,res){
    let a = req.body.avatar
    let sessions_id = req.cookies.sessions_id
    getaccount(sessions_id).then((account)=>{
        let formidable = require('formidable')
        let path = require("path")
        let fs = require("fs")
        let form = new formidable()
            form.encoding = 'utf-8'; // 编码
            form.keepExtensions = true; // 保留扩展名
            form.maxFieldsSize = 10 * 1024 * 1024; // 文件大小
            form.uploadDir = path.resolve(__dirname) + '/../public/image'
            form.parse(req,function(err,fileds,files){ // 解析 formData数据
                if(err){ return console.log(err) }
                let imgPath = files.img.path // 获取文件路径
                let imgName = form.uploadDir+"/"+ account + '.' + files.img.type.split("/")[1] // 修改之后的名字
                let avatar = account + '.' + files.img.type.split("/")[1]
                let data = fs.readFileSync(imgPath) // 同步读取文件
                fs.writeFile(imgName,data,function(err){ // 存储文件
                    if(err){ return console.log(err) }
                    fs.unlink(imgPath,function(){}) // 删除文件
                    userInfo.update({account},{avatar},(err,result)=>{
                        res.json({code:1,img:"/image/"+ avatar })
                    })
                })
            })
        })
}
// 删除账户
exports.delAccount = function(req, res) {
    let session_id = req.cookies.sessions_id
    let password = req.body.password

    getaccount(session_id).then((account) => {

        userInfo.find({ account: account }, (err, result) => {
            if (result[0].password === password) {
                let session = require('../dataModel/sessionDataModel.js').session
                let mongoose = require('mongoose')
                let task = require("../dataModel/taskDataModel.js")
                var taskdata = mogoose.model(account, task.task_type)
                session.remove({ account: account }, (err) => {
                    if (err) {
                        console.log(err);
                        res.json({ code: 0, dis: "服务器错误" });
                        return
                    }
                })

                taskdata.remove({}, (err) => {
                    if (err) {
                        console.log(err);
                        res.json({ code: 0, dis: "服务器错误" });
                        return
                    }
                })
                task.tasklist.remove({ account: account }, (err) => {
                    if (err) {
                        console.log(err);
                        res.json({ code: 0, dis: "服务器错误" });
                        return
                    }
                })
                userInfo.remove({ account: account }, (err, result) => {
                    if (err) {
                        console.log(err);
                        res.json({ code: 0, dis: '服务器错误，删除失败！' });
                        return
                    }
                    res.cookie('sessions_id', 'null')
                    res.cookie('account', 'null')
                    res.json({ code: 1, dis: '删除成功' })
                })
            } else {
                res.json({ code: 2, dis: '密码不正确！' })
            }
        })
    })
}
