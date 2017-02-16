
const mongoose = require('mongoose')

// 链接mongoDB 数据库
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/taoqun')

var Schema = mongoose.Schema;

var list_type = new Schema({
    name:String,
    task_id:String,
    task_list_id:String,
    dis:String,
    IsCompalte:Boolean,
    create_date:Date,
})

var taskList = mongoose.model('tasklist',list_type)
function run (){}

run.prototype.create = function(req,res){
    let obj = {}
    obj = req.body

    let task = new taskList({
        name:obj.name,
        task_id:obj.task_id,
        task_list:obj.task_list,
        dis:obj.dis,
        IsCompalte:obj.IsCompalte,
        create_date:obj.create_date,
    })

    task.save(function(err){
        if(err){
            return res.json({code:0,dis:'保存失败'})
        }
        res.json({code:1,dis:'保存成功'})
    })




}
exports.run = new run()
