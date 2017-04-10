import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const bus = {
    state:{
        api_id:'',

    },
    mutations:{
        getApi(state,api_id){
            state.api_id = api_id
        },
    },
    getters:{
        api_id(state){
            return state.api_id
        }
    },
}

module.exports = (new Vuex.Store(bus))
