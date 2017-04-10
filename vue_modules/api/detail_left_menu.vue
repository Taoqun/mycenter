<template lang="html">
    <div class="left_menu">
        <div class="api_module_menu" v-for="item in menuList">
            <h6 @click="toogle_list">{{item.module_name}}
                <i class="more iconfont icon-more" :data-moduleid="item.module_id" @click.stop="ModuleshowMore(item)"></i>
                <s-dropdown :show="item.show" :listgroup="modulelist" :obj="item" :list="modulemore"></s-dropdown>
            </h6>
            <ul>
                <li v-for="menu in item.list" :data-apiid="menu.api_id">{{menu.api_name}}
                    <i class="more iconfont icon-more"  @click.stop="ApiShowMore(menu)"></i>
                    <s-dropdown :show="menu.show" :listgroup="apilist" :obj="menu" :list="apimore"></s-dropdown>
                </li>
            </ul>
            <p v-show="!item.list.length" class="addApi">暂无api
                <el-button type="danger" size="mini" @click="addApi(item)" :data-moduleid="item.module_id">点击添加</el-button>
            </p>
        </div>
        <p v-show="!menuList.length" class="addModule">暂无模块，<el-button type="danger" @click="addModule">点击添加</el-button></p>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Element from 'element-ui'
    import {ajax} from "JS/ajax.js"
    import Dropdown from "VUEMODULES/common/drop-down.vue"
    Vue.use(Element)
    export default {
        components:{
            "s-dropdown":Dropdown,
        },
        props:{
            menuList:{
                type:Array,
                default:[]
            },
            modulemore:Array,
            modulelist:Array,
            apilist:Array,
            apimore:Array,
        },
        methods:{
                toogle_list(event){
                    let dom = event.target
                    let ul = dom.nextElementSibling
                    if(ul && ul.dataset.show && ul.dataset.show === 'false' ){
                        ul.dataset.show = 'true'
                        ul.style.overflow = 'hidden'
                        ul.style.height = ul.dataset.height + 'px'
                        setTimeout(()=>{
                            ul.style.overflow = 'visible'
                            ul.style.height = 'auto'
                        },500)
                    }else if(ul && ul.tagName.toLowerCase() === "ul" ){
                        let height = ul.dataset.height = ul.clientHeight
                        ul.dataset.show = 'false'
                        ul.style.overflow = 'hidden'
                        ul.style.height = height + 'px'
                        setTimeout(()=>{
                            ul.style.height = '0px'
                        })
                    }
                },
                ModuleshowMore(item){
                    let show = item.show
                    this.modulelist.map((i)=>{
                        if(i.module_id === item.module_id){
                            i.show = !show
                        }else{
                            i.show = false
                        }
                    })
                },
                ApiShowMore(item){
                    let show = item.show
                    this.apilist.map((i)=>{
                        if(i.api_id === item.api_id){
                            i.show = !show
                        }else{
                            i.show = false
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
                                this.modulelist.push(data.obj)
                            }else{
                                this.$message.error("添加失败:"+data.dis)
                            }
                        })
                    },()=>{})
                },
                addApi(item){
                    let the = event.target
                    if(event.target.tagName.toLowerCase() === 'span'){
                        the = the.parentNode
                    }
                    let module_id = the.dataset.moduleid
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
                                this.apilist.push( data.obj )
                            }
                        },()=>{})
                    })
                },
        },
        mounted(){
            let list = document.querySelectorAll(".api_module_menu h6")
            Array.prototype.map.call(list,function(item,index){
                item.click()
            })
        },
    }
</script>

<style lang="scss">
.left_menu{

    .api_module_menu{
        font-size:15px;
        line-height:1em;
        h6{
            padding:10px 20px;
            background-color:#324057;
            color:#F9FAFC;
            font-size:16px;
            cursor:pointer;
            border-bottom:1px solid #1F2D3D;
            position:relative;
        }
        .more{
            float:right;
            cursor:pointer;
        }
        .addApi{
            padding:10px 20px;
            background-color:#475669;
            color:#F9FAFC;
        }
        ul{
            // overflow:hidden;
            transition:all 0.5s linear 0s;
        }
        li{
            display:block;
            height:100%;
            padding:10px 20px;
            padding-left:40px;
            background-color: #475669;
            color:#F9FAFC;
            position:relative;
        }
    }
    .addModule{
        padding:10px 20px;
        background-color:#324057;
        color:#F9FAFC;
    }
}
</style>
