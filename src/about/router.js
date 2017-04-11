import VueRouter from 'vue-router'
import About from "VUEMODULES/about/about_view.vue"
import Me from "VUEMODULES/about/me_view.vue"


const routes = [
    {path:'/',redirect:"/about"},
    {path:"/about",component:About},
    {path:"/me",component:Me},
]

module.exports = new VueRouter({routes})
