import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
Vue.http.options.emulateJSON = true;

import {obj} from 'ROOT/config.js'

let host = obj.hostname +':'+ obj.port
console.log(host)
exports.ajax = function(obj){
    // obj.method
    // obj.url
    // obj.data

    if( obj && obj.method.toLowerCase() === 'get'  ){
        return new Promise( ( resolve , reject ) => {
            if(obj.url[0] !== '/'){
                host = host +'/'
            }
            Vue.http({
                url: host + obj.url,
                method:'get',
                params:obj.data,
            }).then( (res)=>{
                resolve(res)

            },(res)=>{
                reject(res)
            } )
        })
    }else if(obj && obj.method.toLowerCase() === 'post' ){
        return new Promise( ( resolve , reject ) => {
            if(obj.url[0] !== '/'){
                host = host +'/'
            }
            Vue.http({
                url: host + obj.url,
                method: 'post',
                body: obj.data,
            }).then( (res)=>{
                resolve(res)

            },(res)=>{
                reject(res)
            } )
        })
    }
}
