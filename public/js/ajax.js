import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

obj.hostname = location.hostname
obj.port = location.port
let host = obj.hostname + ':' + obj.port
console.log(host)
exports.ajax = function(obj) {
    // obj.method
    // obj.url
    // obj.data
    obj.method = obj.method || 'get'

    if (obj && obj.method.toLowerCase() === 'get') {
        return new Promise((resolve, reject) => {
            if (obj.url[0] !== '/') {
                host = host + '/'
            }
            Vue.http({
                url: host + obj.url,
                method: 'get',
                params: obj.data,
            }).then((res) => {
                resolve(res.body)
            }, (res) => {
                reject(res)
            })
        })
    } else if (obj && obj.method.toLowerCase() === 'post') {
        return new Promise((resolve, reject) => {
            if (obj.url[0] !== '/') {
                host = host + '/'
            }
            Vue.http({
                url: host + obj.url,
                method: 'post',
                body: obj.data,
            }).then((res) => {
                resolve(res.body)
            }, (res) => {
                reject(res)
            })
        })
    }
}


exports.gotologin = function(obj) {
    if (obj.code === 0) {
        let str = location.protocol + '//' + location.hostname + ':' + location.port + '/account/login'
        console.log(str)
        location.href = str
        return true
    }
}
