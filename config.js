// 配置文件
// 配置地址
// 配置端口
// 配置好  hostname 地址 和 端口号 后台node会读取此配置监听端口号
let port ,hostname;

    //port = 8081
    //hostname = 'http://www.taoqun.com'

const obj = {
    port: port || 8081,
    hostname: hostname || 'http://localhost'
}

exports.obj = obj

// 配置首页名称 地址 头部模块  方便 vue react 调用
const head_list = [
      {name:'首页',url:'/index/'},
      {name:'任务中心',url:'/task/'},
      {name:'文章中心',url:'/getPaperList'},
      {name:'写文章',url:'/addPaper/'},
      {name:'生辰',url:'/birth'},
      {name:'个人中心',url:'/account/user_info'},
      {name:'设置',url:'/account/user_info'},
      {name:'关于',url:'/about'},
    ];

exports.headList = head_list
