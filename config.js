// 配置文件
// 配置地址
// 配置端口
// 配置好  hostname 地址 和 端口号 后台node会读取此配置监听端口号
let port, hostname;
// port = 80
// hostname = 'http://182.61.49.55'

const obj = {
    port: port || 8081,
    hostname: hostname || 'http://localhost'
}

exports.obj = obj

// 配置首页名称 地址 头部模块  方便 vue react 调用
const head_list = [
    { name: '首页', url: '/index/' },
    { name: '我的任务', url: '/task/' },
    { name: '配色表', url: '/colors/' },
    { name: '文章中心', url: '/getPaperList' },
    { name: '写文章', url: '/addPaper/' },
    { name: 'API文档', url: '/api/apiList' },
    { name: '个人中心', url: '/account/user_info' },
    { name: '设置', url: '/account/user_info' },
    { name: '关于', url: '/about' },
];

exports.headList = head_list
