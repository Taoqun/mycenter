const mongoose = require("mongoose")

// 项目列表
const project_list_type = new mongoose.Schema({
    account:String,
    account_name:String,
    project_name:String,
    project_id:String,
    create_date:Date,
})
exports.projectList = mongoose.model("apiProjectList",project_list_type)

// api模块列表
const api_module_type = new mongoose.Schema({
    account:String,
    account_name:String,
    project_name:String,
    project_id:String,
    module_name:String,
    module_id:String,
    create_date:Date,
})
exports.moduleList = mongoose.model('apiModelList',api_module_type)

// api列表
const api_type = new mongoose.Schema({
    account:String,
    account_name:String,
    project_name:String,
    project_id:String,
    module_name:String,
    module_id:String,
    api_name:String,
    api_id:String,
    create_date:Date,
    update_date:Date,
    api_type:String,
    api_url:String,
    api_header:Array,
    api_request_data:Array,
    api_response_data:String,
    api_markdown:String,
})

exports.apiList = mongoose.model("apiList",api_type)
