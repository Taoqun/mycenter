<template lang="html">
    <div class="api_list">
        <h6 class="title clearfix">
            <span>项目列表</span>
            <el-button class="add_btn" type="danger" @click="addProject">添加项目</el-button>
        </h6>
        <ul>
            <li v-for="item in list">
                <p class="project_name">{{ item.project_name }}</p>
                <p class="project_account">{{item.account}}</p>
                <p class="project_create_date">{{
                    (new Date(item.create_date)).getFullYear() + '-'  +
                    ((new Date(item.create_date)).getMonth() +1) + '-' +
                    (new Date(item.create_date)).getDate()
                }}</p>
                <p class="in_project">
                    <a :href="'/api/project/'+item.id">进入项目</a>
                </p>
                <p class="control_btn">
                    <el-button class="update_project" type="danger" :data-id="item.id" @click="editProject(item)">修改</el-button>
                    <el-button class="delete_project" type="danger" :data-id="item.id" @click="delProject(item)">删除</el-button>
                </p>
            </li>
            <p v-show="!list.length" class="no_project">暂无项目 <el-button type="danger" @click="addProject">新建项目</el-button></p>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import {ajax} from "JS/ajax.js"
    Vue.use(ElementUI)
    export default {
        data(){
            return {
                list:[]
            }
        },
        methods:{
            addProject(){
                this.$prompt("请输入项目名称","添加项目",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    console.log(value)
                    let data = {}
                        data.project_name = value
                    ajax({
                        url:"/api/addProject",
                        method:'post',
                        data:data,
                    }).then((data)=>{
                        if(data.code === 1){
                            this.list.push(data)
                        }else{
                            this.$message({
                                type:"error",
                                message:"添加失败:" + (data.dis ? data.dis : ' '),
                            })
                        }
                    })
                },()=>{})
            },
            editProject(item){
                let obj = {}
                    obj.project_id = item.project_id
                this.$prompt("请输入项目的新名称","修改名称",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    obj.project_name = value
                    ajax({
                        method:"post",
                        url:"/api/updateProject",
                        data:obj,
                    }).then((data)=>{
                        if(data.code){
                            item.project_name = value
                            this.$message({
                                type:"success",
                                message:"修改成功",
                            })
                        }else{
                            this.$message.error("修改失败")
                        }
                    })
                },()=>{})
            },
            delProject(item){
                this.$confirm(`确定删除 ${item.project_name} 项目吗?`,"确认",{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(()=>{
                    ajax({
                        method:'post',
                        url:"/api/deleteProject",
                        data:{id:item.id}
                    }).then((data)=>{
                        if(data.code){
                            this.list.splice( this.list.indexOf(item),1 )
                        }else{
                            this.$message.error("删除失败")
                        }
                    })
                },()=>{})

            }
        },
        created(){
            ajax({
                method:"get",
                url:"/api/getApiProject",
            }).then((data)=>{
                if(data.code){
                    this.list = data.result
                }
            })
        }
    }
</script>

<style lang="scss">
    .api_list{
        width:1000px;
        margin:20px auto;
        .title{
            border-bottom:1px solid #e8e8e8;
            padding:10px 20px;
            font-weight:normal;
            font-size:16px;
            line-height:36px;
        }
        .add_btn{
            float:right;
        }
        .project_name{
            font-size:20px;
            line-height:2em;
        }
        .project_account,.project_create_date{
            font-size:12px;
            line-height:1.5em;
        }
        ul{
            display:flex;
            flex-wrap:wrap;
            justify-content:flex-start;
        }
        li{
            flex-grow:1;
            width:20%;
            margin:20px;
            padding:20px;
            box-sizing:border-box;
            text-align:center;
            border:1px solid #e8e8e8;
        }
        p{
            font-size:15px;
            line-height:2em;
        }
        .control_btn,.in_project{
            margin-top:20px;
        }
        .in_project{
            a{
                display:inline-block;
                padding:5px 20px;
                color:#fff;
                border-radius:4px;
                background-color:#ff4949;
            }
        }
        .no_project{
            margin:20px;
        }
    }
</style>
