
const mongoose = require('mongoose')

// 链接mongoDB 数据库
//mongoose.Promise = global.Promise;
//mongoose.connect('mongodb://localhost:27017/taoqun')

var Schema = mongoose.Schema;

var list_type = new Schema({
    user_name:String,
    task_arr:Array,
    list_arr:Array,
    group_arr:Array,
    create_date:Date,
})

var taskList = mongoose.model('tasklist',list_type)

function run (){}

run.prototype.init =  function(username,res){
    let list = new taskList({
        user_name:username.toString(),
        task_arr:[
            {name:'已完成的任务会在这里显示',IsCompalte:true,id:1,list_id:0,dis:'已完成的任务会在这里显示',},
            {name:'取消勾选，可回退至待完成',IsCompalte:true,id:1,list_id:0,dis:'取消勾选，可回退至待完成',},
            {name:'是不是很赞',IsCompalte:true,id:1,list_id:0,dis:'是不是很赞', },
            {name:'回车添加任务',IsCompalte:false,id:1,list_id:0,dis:'回车添加任务', },
            {name:'点击查看任务详情',IsCompalte:false,id:1,list_id:0,dis:'点击查看任务详情', },
            {name:'勾选完成任务',IsCompalte:false,id:1,list_id:0,dis:'勾选完成任务', }
            ],
        list_arr:[{name:"这里是清单",type:"list",list_id:123,group_id:'',moreMenu:false}],
        group_arr:[{
                    name:"这里是文件夹",
                    type:"group",
                    group_id:'123456789',
                    name_id:123,
                    moreMenu:false,
                    task_list:[{name:"点击获取清单任务",type:'list',group_id:'123456789',id:123,moreMenu:false},
                        {name:"右侧可以点击删除",type:'list',group_id:'123456789',id:123,moreMenu:false,},
                        {name:"或者重新命名",type:'list',group_id:'123456789',id:123,moreMenu:false,},
                        {name:"可以添加清单",type:'list',group_id:'123456789',id:123,moreMenu:false,}]
                }],
        create_date:Date.now(),
    })
    list.save(function(err){
        if(err){
            res.json({register:false})
            return
        }
        res.json({register:true})
    })
}
exports.run = new run()
exports.tasklist = taskList
