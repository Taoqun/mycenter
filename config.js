// 配置文件
// 配置地址
// 配置端口
// 配置好  hostname 地址 和 端口号 后台node会读取此配置监听端口号
let port ,hostname;

    port = 80
    hostname = 'http://www.taoqun.com'

const obj = {
    port: port || 8080,
    hostname: hostname || 'localhost'
}

exports.obj = obj
