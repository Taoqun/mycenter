import Vue from 'vue'
import app from './index.vue'
import store from 'Store/api/store.js'
 new Vue({
     el:"#app",
     components:{app},
     store,
 })
