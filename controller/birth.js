// 获取数据库结构模型
const userinfo = require("../dataModel/userInfoDataModel.js").userInfo
const getaccount = require("./getAccount.js")

// 获取 更新 出生日期 死亡日期

exports.getbirth = function(req, res) {

    let session_id = req.cookies.sessions_id

    getaccount(session_id).then((account) => {

        userinfo.find({ account: account }, (err, result) => {

            if (err) { return console.log(err) }
            let obj = {}
            if (result[0].birth_day) {
                obj.birth_day = result[0].birth_day.valueOf()
            }
            if (result[0].death_span) {
                obj.death_span = result[0].death_span
            }
            res.json(obj)
        })
    })
}

exports.setbirth = function(req, res) {

    if (!req.body.birth_day && !req.body.death_span) { return }
    let session_id = req.cookies.sessions_id

    getaccount(session_id).then((account) => {
        let obj = {}

        if (req.body.birth_day) {
            obj.birth_day = parseInt( req.body.birth_day ) + (1000*60*60*8)
        }
        if (req.body.death_span) {
            obj.death_span = parseInt( req.body.death_span )
        }
        userinfo.update({ account: account }, obj, (err, result) => {
            if (err) { return console.log(err) }
            res.json({ code: 1, des: 'success' })
        })
    })
}
