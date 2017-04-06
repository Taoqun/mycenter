<template lang="html">
    <div class="left_menu">
        <div class="api_module_menu" v-for="item in menuList">
            <h6 @click="toogle_list">{{item.name}}</h6>
            <ul>
                <li v-for="menu in item.list"><a :href="menu.url">{{menu.name}}</a></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        props:{
            menuList:{
                type:Array,
                default:[]
            }
        },
        methods:{
                toogle_list(event){
                    let dom = event.target
                    let ul = dom.nextElementSibling
                    if(ul && ul.dataset.show && ul.dataset.show === 'false' ){
                        ul.dataset.show = 'true'
                        ul.style.height = ul.dataset.height + 'px'
                        setTimeout(()=>{
                            ul.style.height = 'auto'
                        },500)
                    }else{
                        let height = ul.dataset.height = ul.clientHeight
                        ul.dataset.show = 'false'
                        ul.style.height = height + 'px'
                        setTimeout(()=>{
                            ul.style.height = '0px'
                        })
                    }
                }
        },
    }
</script>

<style lang="scss">
    .api_module_menu{
        font-size:15px;
        line-height:1em;
        h6{
            padding: 20px;
            background-color:#324057;
            color:#F9FAFC;
            font-size:20px;
            cursor:pointer;
        }
        ul{
            overflow:hidden;
            transition:all 0.5s linear 0s;
        }
        a{
            display:block;
            height:100%;
            padding:10px;
            padding-left:40px;
            background-color: #475669;
            color:#F9FAFC;
        }
    }




</style>
