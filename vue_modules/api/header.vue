<!-- api 头部模块 url type key value -->
<template lang="html">
    <div class="type_url">
        <span class="control_edit" :class="{'check':!control_type_edit}" @click="change_type_edit">
            <i class="iconfont" :class='{"icon-weisuo":!control_type_edit,"icon-locked":control_type_edit}'></i>
            {{control_type_str}}
        </span>
        <p class="title">请求类型 / 接口地址</p>
        <el-select v-model="type.type" :disabled="control_type_edit" @change="change" placeholder="请选择" class="select">
           <el-option
             v-for="item in options"
             :label="item.label"
             :value="item.value">
           </el-option>
         </el-select>
         <el-input v-model="url" :readonly="control_type_edit" class="input"></el-input>
         <el-button class="btn" :disabled="control_type_edit" type="info">发送</el-button>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Element from 'element-ui'
    Vue.use(Element)
    import 'CSS/ali/iconfont.css'

    export default {
        props:{
            type:Object,
        },
        data(){
            return {
                url:'http://www.baidu.com',
                options:[
                    {label:'GET',value:'get'},
                    {label:'POST',value:'post'},
                    {label:'PUT',value:'put'},
                    {label:'DELETE',value:'delete'},
                ],
                control_type_edit:true,
            }
        },
        computed:{
            control_type_str(){
                return (this.control_type_edit ? "编辑" : "预览")
            },
        },
        methods:{
            change(){
                console.log(this.type)
            },
            change_type_edit(){
                this.control_type_edit = !this.control_type_edit
            },
        }
    }
</script>

<style lang="scss">
    .type_url{
        display:flex;
        border:1px solid #F9FAFC;
        margin:20px;
        margin-top:40px;
        position:relative;
        background-color:#fff;
        .select,.input,.btn{
            border-radius:0px;
            margin:10px;
        }
        .control_edit,.title{
            position:absolute;
            top:-25px;
            height:25px;
            line-height:25px;
            padding: 0 10px;
            display:inline-block;
            text-align:center;
            color:#8492A6;
            background-color:#D3DCE6;
            border-top-left:5px;
            border-top-right:5px;
            transition:all 0.3s linear 0s;
            i{
                font-size:14px;
            }
        }
        .control_edit{
            right:0px;
            cursor:pointer;
        }
        .title{
            left:0;
            right:none;
        }
        .check{
            color:#FF4949;
        }
    }

</style>
