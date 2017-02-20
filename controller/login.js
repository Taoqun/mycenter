const userInfo = require('../dataModel/loginDataModel.js').userInfo

// 登录账户验证
exports.login = function(req, res) {
    let obj = {
        account: req.query.account,
        password: req.query.password
    }
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
    userInfo.find({
        account: obj.account
    }, (err, result) => {

        if (err) {
            return console.log(err)
        }

        if (result && result.length === 1) {
            if (obj.password === result[0].password) {

                let setSession = require('../dataModel/sessionDataModel.js').session
                setSession.find({ account: obj.account }, (err, result) => {
                    if(result.length === 0){
                        let ss = Math.random().toString(36).substr(2)
                        let account = obj.account
                        let obj = new setSession({
                            session_id:ss,
                            account:account
                        })
                        obj.save((err)=>{
                            if(err){}
                            res.cookie('sessions_id',ss)
                            res.cookie('account',account)
                            res.json({code: 1,verify: true,account: true,password: true})
                        })
                    }else{
                        res.cookie('sessions_id',result[0].session_id)
                        res.json({code: 1,verify: true,account: true,password: true})
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


    let account = req.body.account
    let password = req.body.password
    let name = req.body.name

    // 查找是够有相同的账户
    userInfo.find({
        account: account
    }, (err, result) => {
        if (err) {
            return console.log(err)
        }

        if (result && result.length === 0) {
            let add = new userInfo({
                    account: account,
                    password: password,
                    name: name,
                    date: Date.now()
                })
                // 生成session id
            let session_id = Math.random().toString(36).substr(2)
            let setSession = require('../dataModel/sessionDataModel.js').session

            setSession.find({
                session_id: session_id
            }, (err, result) => {
                if (result.length === 0) {
                    // 存储session_id 到数据库
                    let ses_id = new setSession({
                        session_id: session_id,
                        account: account,
                    })
                    res.clearCookie()
                    ses_id.save(function(err) {})
                        // 清除cookie
                        // 设置session id
                        // 保存
                    add.save(function(err) {
                        if (err) {
                            return res.json({
                                register: false
                            })
                        }
                        res.cookie('sessions_id', session_id)
                        res.cookie('account', decodeURIComponent(account) )
                        require('../dataModel/taskDataModel.js').run.init(account, res)
                        //res.json({register:true})
                    })
                } else {
                    res.json({
                        register: false
                    })
                }
            })

        } else {
            res.json({
                register: false
            })
        }
    })
}
