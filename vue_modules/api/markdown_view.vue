<template lang="html">
    <div class="markd">
        <p class="title">markdown 文档描述</p>
        <span class="control_edit" :class="{'check':!control_edit}" @click="change_control_edit">
            <i class="iconfont" :class='{"icon-weisuo":!control_edit,"icon-locked":control_edit}'></i>
            {{control_str}}
        </span>
        <textarea class="result" v-show="!control_edit" v-model="result.result" :readonly="control_edit"></textarea>
        <div class="preview markdown-body" v-show="control_edit" v-html="html"></div>
    </div>
</template>

<script>
    import hyperdown from 'hyperdown'
    import "CSS/markdown.css"
    export default {
        props:{
            result:Object,
        },
        data(){
            return {
                html:'',
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
                if( this.control_edit ){
                    let tem = this.result
                    let parse = new hyperdown()
                        tem = parse.makeHtml(tem)
                    this.html = tem
                }
            }
        },
    }
</script>

<style lang="scss">
    .markd{
        margin:20px;
        position:relative;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        .title{
            display:inline-block;
            background-color: #fff;
            padding:0 10px;
            font-size:15px;
            line-height:25px;
            height:25px;
        }
        .result,.preview{
            display:block;
            width:100%;
            min-height:300px;
            padding:20px;
            font-size:15px;
            line-height:1.5em;
            box-sizing: border-box;
            border:none;
            background-color:#F9FAFC;
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
