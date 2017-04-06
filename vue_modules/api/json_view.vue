<template lang="html">
    <div class="data_view">
        <p class="data_title">返回示例</p>
        <span class="control_edit" :class="{'check':!control_edit}" @click="change_control_edit">
            <i class="iconfont" :class='{"icon-weisuo":!control_edit,"icon-locked":control_edit}'></i>
            {{control_str}}
        </span>
        <el-alert
          v-show="error"
          title="json解析错误，请检查!"
          type="error">
        </el-alert>
        <textarea class="data_result" :readonly="control_edit" v-model="result"></textarea>
    </div>
</template>

<script>
    import "CSS/ali/iconfont.css"
    export default {
        data(){
            return {
                result:'',
                control_edit:true,
                error:false,
            }
        },
        computed:{
            control_str(){
                return (this.control_edit ? '编辑' : '预览')
            }
        },
        methods:{
            change_control_edit(){
                this.control_edit = !this.control_edit
            }
        },
        mounted(){
            let obj = {}
                obj.name = 'taoqun'
                obj.age = 25
                obj.sex = 'man'
            let str = JSON.stringify(obj)
            this.result = JSON.parse(str,null,4)
        }
    }
</script>

<style lang="scss">
    .data_view{
        margin:20px;
        position:relative;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        .data_title{
            display:inline-block;
            padding:0 10px;
            line-height:25px;
            height:25px;
            background-color:#fff;
            color:#8492A6;
            border-top-left:5px;
            border-top-right:5px;
        }
        .data_result{
            display:block;
            width:100%;
            min-height:300px;
            padding:20px;
            font-size:15px;
            line-height:1.5em;
            border:none;
            background-color:#F9FAFC;
            box-sizing:border-box;
        }
        .control_edit{
            position:absolute;
            top:0;
            right:0;
            height:25px;
            line-height:25px;
            padding: 0 10px;
            display:inline-block;
            text-align:center;
            color:#8492A6;
            background-color:#D3DCE6;
            border-top-left:5px;
            border-top-right:5px;
            cursor:pointer;
        }
        .check{
            color:#FF4949;
        }
    }
</style>
