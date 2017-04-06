<template lang="html">
    <div class="api_detail">
        <s-left-menu :menuList="menulist"></s-left-menu>
        <div class="right_body">
            <!-- 面包屑导航 -->
            <!-- 请求地址 -->
            <!-- 请求header参数 -->
            <!-- 请求get/post 参数 -->
            <s-nav :location="location"></s-nav>
            <s-header :type="type"></s-header>
            <s-keyvalue title="header 请求参数" :keyvalue="header_key_value"></s-keyvalue>
            <s-keyvalue title="get / post 请求参数"></s-keyvalue>
            <s-view></s-view>
            <s-markd></s-markd>
        </div>
    </div>
</template>

<script>
    import MenuList from './detail_left_menu.vue'
    import TopNav from './top_nav.vue'
    import Header from './header.vue'
    import keyValue from './key_value.vue'
    import PreView from './json_view.vue'
    import Markd from './markdown_view.vue'
    import Vue from 'vue'
    import Element from 'element-ui'
    Vue.use(Element)

    export default {
        components:{
            "s-left-menu":MenuList,
            "s-nav":TopNav,
            "s-header":Header,
            "s-keyvalue":keyValue,
            "s-view":PreView,
            "s-markd":Markd,
        },
        data(){
            return{
                menulist:[
                    {name:"头部模块",list:[
                        {name:'获取用户信息',url:'#'},
                        {name:'修改用户信息',url:'#'},
                        {name:'删除用户',url:'#'},
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
                type:{type:'get'},
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
                if( event.keyCode === 83 && event.ctrlKey ){
                    this.$message({
                        type:"success",
                        message:"保存成功",
                    })
                    event.preventDefault()
                    event.stopPropagation()
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
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        .left_menu{
            width:200px;
        }
        .right_body{
            width:800px;
            padding-bottom:200px;
            flex-grow:1;
            background-color:#EFF2F7;
        }
    }
</style>
