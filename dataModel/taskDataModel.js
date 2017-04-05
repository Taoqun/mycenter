const mongoose = require('mongoose')

// 链接mongoDB 数据库
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/taoqun')


// 账户名
// 清单列表
// 文件夹列表
// 创建日期
var list_type = new mongoose.Schema({
    account: String,
    list_arr: Array,
    group_arr: Array,
    create_date: Date,
})

// 账户名
// 任务名称
// 是否完成
// 任务id
// 所对应的清单id
// 描述
// 日期
var task_type = new mongoose.Schema({
    account: String,
    name: String,
    IsComplete: Boolean,
    id: String,
    list_id: String,
    dis: String,
    date: Date,
})

var taskList = mongoose.model('tasklist', list_type)

function run() {}

run.prototype.init = function(account, res) {

    var taskdata = mongoose.model(account, task_type)
    let taskArr = [
        { name: '已完成的任务会在这里显示', IsComplete: true, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '已完成的任务会在这里显示', date: Date.now() },
        { name: '取消勾选，可回退至待完成', IsComplete: true, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '取消勾选，可回退至待完成', date: Date.now() },
        { name: '是不是很赞', IsComplete: true, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '是不是很赞', date: Date.now() },
        { name: '回车添加任务', IsComplete: false, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '回车添加任务', date: Date.now() },
        { name: '点击查看任务详情', IsComplete: false, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '点击查看任务详情', date: Date.now() },
        { name: '勾选完成任务', IsComplete: false, id: parseInt(Date.now()).toString() + Math.random().toString(36).substr(2), list_id: 'all', dis: '勾选完成任务', date: Date.now() }
    ]
    taskArr.map((i) => {
        let task = new taskdata(i)
        task.save(function(err) {})
    })

    let group_id = Date.now().toString() + Math.random().toString(36).substr(2) + account + parseInt(account).toString(36)
    let list = new taskList({
        account: account,
        list_arr: [
            { name: "这里是清单", type: "list", list_id: Date.now().toString() + Math.random().toString(36).substr(2), group_id: '', moreMenu: false },
            { name: "点击获取清单任务", type: 'list', group_id: group_id, list_id: Date.now().toString() + Math.random().toString(36).substr(2), moreMenu: false },
            { name: "右侧可以点击删除", type: 'list', group_id: group_id, list_id: Date.now().toString() + Math.random().toString(36).substr(2), moreMenu: false, },
            { name: "或者重新命名", type: 'list', group_id: group_id, list_id: Date.now().toString() + Math.random().toString(36).substr(2), moreMenu: false, },
            { name: "可以添加清单", type: 'list', group_id: group_id, list_id: Date.now().toString() + Math.random().toString(36).substr(2), moreMenu: false, }
        ],
        group_arr: [{
            name: "这里是文件夹",
            type: "group",
            group_id: group_id,
            name_id: 123,
            moreMenu: false,
            task_list: [],
        }],
        create_date: Date.now(),
    })

    list.save(function(err) {
        if (err) {
            res.json({ register: false, dis: '保存清单任务失败！' })
            return
        }
        res.json({ register: true })
    })
}
exports.run = new run()
exports.tasklist = taskList
exports.task_type = task_type
