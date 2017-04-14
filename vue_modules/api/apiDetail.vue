<template lang="html">
    <div class="api_detail">
        <s-left-menu
            :menuList="menulist"
            :modulelist="moduleList"
            :modulemore="module_more"
            :apilist="apiList"
            :apimore="api_more" >
        </s-left-menu>
        <div class="right_body">
            <!-- 面包屑导航 -->
            <!-- 请求地址 -->
            <!-- 请求header参数 -->
            <!-- 请求get/post 参数 -->
            <s-nav :location="location"></s-nav>
            <s-header :type="type"></s-header>
            <s-keyvalue title="header 请求参数" :keyvalue="api_header"></s-keyvalue>
            <s-keyvalue title="get / post 请求参数" :keyvalue="api_request_data"></s-keyvalue>
            <s-view :result="api_response_data"></s-view>
            <s-markd :result="markd"></s-markd>
            <div class="btn_center">
                <el-button type="danger" class="delete" @click="delApiControl">删除</el-button>
                <el-tooltip class="success" content="Ctrl + S 快捷保存" effect="dark">
                    <el-button type="success" @click="updateApi">保存</el-button>
                </el-tooltip>
            </div>
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
    import {ajax} from "JS/ajax.js"
    Vue.use(Element)
    import { mapGetters } from 'vuex'

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
                moduleList:[],
                apiList:[],
                module_more:[
                    {name:"添加api",event:this.addApi},
                    {name:"重命名",event:this.updateModule},
                    {name:"删除",event:this.delModule},
                ],
                api_more:[
                    {name:"重命名",event:this.updateApiName},
                    {name:"删除",event:this.delApi},
                ],
                type:{
                    type:'get',
                    url:'',
                },
                location:[
                    {name:''},
                    {name:''},
                    {name:''},
                ],
                api_header:{list:[]},
                api_request_data:{list:[]},
                api_response_data:{
                    result:''
                },
                markd:{
                    result:''
                },
            }
        },
        computed:{
            menulist(){
                let list = []
                this.moduleList.map((module,index)=>{
                    let obj = {}
                        obj.module_name = module.module_name
                        obj.module_id = module.module_id
                        obj.show = module.show
                        obj.list = this.apiList.filter((api)=>{
                            return obj.module_id === api.module_id
                        })
                    list.push(obj)
                })
                return list
            },
            ...mapGetters(["api_id"])
        },
        watch:{
            api_id(){
                console.log(this.api_id)
                this.type.type = ''
                this.type.url = ''
                this.api_header = {list:[]}
                this.api_request_data = {list:[]}
                this.api_response_data.result = ''
                this.markd.result = ''
                this.getApi()
            }
        },
        created(){},
        mounted(){
            let load = document.querySelector(".sk-cube-grid")
            if(load){
                load.parentNode.removeChild(load)
            }
            
            document.addEventListener('keydown',(event)=>{
                if( event.keyCode === 83 && event.ctrlKey ){
                    this.updateApi()

                    event.preventDefault()
                    event.stopPropagation()
                }
            })
            document.addEventListener("click",()=>{
                this.moduleList.map((item)=>{
                    item.show = false
                })
                this.apiList.map((item)=>{
                    item.show = false
                })
            })
            this.getModules()
            this.getApiList()
        },
        methods:{
            getModules(){
                let project_id = window.project_id
                ajax({
                    method:'get',
                    url:"/api/getModules",
                    data:{project_id:project_id}
                }).then((data)=>{
                    if(data.code){
                        data.result.map((item)=>{
                            item.show = false
                        })
                        this.moduleList = data.result
                    }else{
                        this.$message.error("获取失败"+ data.dis )
                    }
                })
            },
            getApiList(){
                ajax({
                    method:"get",
                    url:"/api/getApiList",
                }).then((data)=>{
                    if(data.code === 1){
                        data.result.map((item)=>{
                            item.show = false
                        })
                        this.apiList = data.result
                    }
                })
            },
            addModule(){
                this.$prompt("请输入你需要创建的模块名称","添加模块",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    if(!value){return}
                    let obj = {}
                        obj.project_id = window.project_id
                        obj.module_name = value
                    ajax({
                        url:"/api/addModule",
                        method:"post",
                        data:obj
                    }).then((data)=>{
                        if(data.code === 1){
                            this.moduleList.push(data.obj)
                        }else{
                            this.$message.error("添加失败:"+data.dis)
                        }
                    })
                },()=>{})
            },
            addApi(item,list){
                let module_id = item.module_id
                let obj ={}
                    obj.module_id = module_id
                    obj.project_id = window.project_id
                this.$prompt("请输入你要添加的api名称","添加api",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    if(!value){return}
                    obj.api_name = value
                    ajax({
                        method:"post",
                        url:"/api/addApi",
                        data:obj
                    }).then((data)=>{
                        if(data.code === 1){
                            this.apiList.push( data.obj )
                        }
                    },()=>{})
                },()=>{})
            },
            updateModule(item,list){
                let obj ={}
                    obj.module_id = item.module_id
                    obj.project_id = window.project_id
                this.$prompt("输入模块的新名称","修改模块名称",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    obj.module_name = value
                    ajax({
                        method:"post",
                        url:"/api/updateModule",
                        data:obj
                    }).then((data)=>{
                        if(data.code === 1){
                            this.$message("修改成功")
                            list.map((item)=>{
                                if(item.module_id === obj.module_id ){
                                    item.module_name = value
                                }
                            })
                        }else{
                            this.$message.error("修改失败")
                        }
                    })
                },()=>{})
            },
            delModule(item,list){
                let module_id = item.module_id
                this.$confirm(`确定删除${item.module_name}吗？`,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=>{
                    ajax({
                        method:"post",
                        url:"/api/deleteModule",
                        data:{module_id}
                    }).then((data)=>{
                        if(data.code === 1){
                            list.map((item,index)=>{
                                if( item.module_id === module_id ){
                                    list.splice(index,1)
                                }
                            })
                        }
                    })
                },()=>{})
            },
            updateApiName(item,list){
                let obj ={}
                    obj.api_id = item.api_id
                this.$prompt(`请输入你需要修改${item.api_name}的名称`,"修改名称",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    obj.api_name = value
                    ajax({
                        url:"/api/updateApi",
                        method:"post",
                        data:obj
                    }).then((data)=>{
                        if(data.code){
                            list.map((i)=>{
                                if(i.api_id === item.api_id){
                                    i.api_name = value
                                }
                            })
                        }else{
                            this.$message.error("修改错误")
                        }
                    })
                })
            },
            delApi(item,list){
                let api_id = item.api_id
                this.$confirm(`确认删除${item.api_name}吗？`,"删除",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=>{
                    ajax({
                        method:"post",
                        url:"/api/deleteApi",
                        data:{api_id}
                    }).then((data)=>{
                        if(data.code){
                            list.map((i,index)=>{
                                if(i.api_id === item.api_id ){
                                    list.splice(index,1)
                                }
                            })
                            this.api_id = ''
                            this.$message("删除成功")
                        }else{
                            this.$message.error("删除失败")
                        }
                    })
                },()=>{})
            },
            getApi(){
                let api_id = this.api_id
                ajax({
                    url:"/api/getApi",
                    method:"get",
                    data:{api_id}
                }).then((data)=>{
                    if(data.code === 1 ){
                        let obj = data.result
                        this.type.type = obj.type || 'get'
                        this.type.url = obj.api_url || ''
                        this.location = []
                        this.location.push({name:window.project_name})
                        this.moduleList.map((item)=>{
                            if(item.module_id === obj.module_id ){
                                this.location.push({name:item.module_name})
                            }
                        })
                        this.location.push({name:obj.api_name})
                        this.api_header.list = obj.api_header  || [{key:'',value:'',dis:''}]
                        this.api_request_data.list = obj.api_request_data  || [{key:'',value:'',dis:''}]
                        this.api_response_data.result = obj.api_response_data || ''
                        this.markd.result = obj.api_markdown || ''
                    }
                })
            },
            updateApi(){
                if(!this.api_id){
                    this.$message.error("请选择api")
                    return
                }
                let obj = {}
                    obj.api_id = this.api_id
                    obj.api_type = this.type.type
                    obj.api_url = this.type.url
                    obj.api_header = JSON.stringify(this.api_header.list)
                    obj.api_request_data = JSON.stringify(this.api_request_data.list)
                    obj.api_response_data = this.api_response_data.result
                    obj.api_markdown = this.markd.result

                ajax({
                    method:'post',
                    url:'/api/updateApi',
                    data:obj
                }).then((data)=>{
                    if(data.code === 1){
                        this.$message({
                            type:"success",
                            message:"保存成功",
                        })
                    }else{
                        this.$message.error("保存失败")
                    }
                })
            },
            delApiControl(){
                let obj = {}
                    obj.api_id = this.api_id
                this.apiList.map((i)=>{
                    if(this.api_id === i.api_id){
                        obj.api_name = i.api_name
                    }
                })
                this.delApi(obj,this.apiList)
            }
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
        .btn_center{
            text-align:center;
            .delete{
                margin-right:30px;
            }
        }
    }
</style>
