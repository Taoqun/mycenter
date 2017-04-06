<template lang="html">
    <div class="api_detail">
        <s-left-menu :menuList="menulist"></s-left-menu>
        <div class="right_body">
            <!-- 面包屑导航 -->
            <!-- 请求地址 -->
            <!-- 请求header参数 -->
            <!-- 请求get/post 参数 -->
            <s-nav :location="location"></s-nav>
            <s-header></s-header>
            <s-keyvalue title="header 请求参数" :keyvalue="header_key_value"></s-keyvalue>
            <s-keyvalue title="get / post 请求参数"></s-keyvalue>
        </div>
    </div>
</template>

<script>
    import menuList from './detail_left_menu.vue'
    import topNav from './top_nav.vue'
    import Header from './header.vue'
    import keyValue from './key_value.vue'
    import Vue from 'vue'
    import Element from 'element-ui'
    Vue.use(Element)

    export default {
        components:{
            "s-left-menu":menuList,
            "s-nav":topNav,
            "s-header":Header,
            "s-keyvalue":keyValue,
        },
        data(){
            return{
                menulist:[
                    {name:"模块1",list:[
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                    ]},
                    {name:"模块1",list:[
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                    ]},
                    {name:"模块1",list:[
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                        {name:'文档',url:'#'},
                    ]},
                ],
                location:[
                    {name:'项目',url:''},
                    {name:'模块',url:'#'},
                    {name:'文档',url:'#'},
                ],
                header_key_value:[
                    {
                        key:'这里是key值',
                        value:'这里是value',
                        dis:'这里是描述',
                    },
                    {
                        key:'这里是key值',
                        value:'这里是value',
                        dis:'这里是描述',
                    },
                ],
                data_key_value:[
                    {
                        key:'这里是key值',
                        value:'这里是value',
                        dis:'这里是描述',
                    },
                ],
            }
        },
        computed:{

        },
        created(){

        },
        mounted(){
            document.addEventListener('keydown',(event)=>{
                event.preventDefault()
                event.stopPropagation()
                if( event.keyCode === 83 && event.ctrlKey ){
                    this.$message({
                        type:"success",
                        message:"保存成功",
                    })
                }
            })
        },
        methods:{

        },
    }
</script>

<style lang="scss">
    .api_detail{
        width:1200px;
        margin:20px auto;
        display:flex;
        .left_menu{
            width:200px;
        }
        .right_body{
            width:800px;
            flex-grow:1;
            background-color:#EFF2F7;
        }
    }
</style>
