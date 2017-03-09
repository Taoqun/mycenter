<template lang="html">
    <div class="markdown" :class="{'dark_bg':!preview_show}">
        <div class="markdown_main" :class="{'markdown_center':!preview_show}">

            <div class="markdown_top">
                <div class="markdown_head">
                    <input type="text" name="" placeholder="键入标题" value="">
                    <span class="text_num">当前字数 <i>999</i></span>
                </div>

                <div class="markdown_tool clearfix">
                    <div class="save_text btn" @click="run">保存文章</div>
                    <ul class="markdown_menu clearfix">
                        <li @click="changeEditType">模式</li>
                        <li>主题</li>
                    </ul>
                </div>
            </div>

            <div id="markdown_edit">
                <textarea id="edit" @keydown.stop="stop" @keyup.stop="run" placeholder="内容区"></textarea>
            </div>

        </div>
        <transition name="right">
            <div v-show="preview_show" class="markdown_preview markdown-body" id="markdown_preview">
            </div>
        </transition>

    </div>
</template>

<script>
    // import "CSS/cssreset.css"
    import "CSS/markdown.css"
    import { markdown ,parse } from 'markdown'
    import Vue from 'vue'
    import ElementUI from "element-ui"
    Vue.use(ElementUI)

    export default {
        data(){
            return {
                preview_show:true,
            }
        },
        methods:{
            stop(){
                return false
            },
            run(){
                let tem = document.querySelector("#markdown_edit #edit").value
                    tem = markdown.toHTML(tem)
                document.querySelector(".markdown-body").innerHTML = tem
            },
            changeEditType(){
                this.preview_show = !this.preview_show
            }
        }
    }
</script>

<style lang="scss">
    html,body,#app,.markdown{
        width:100%;
        height:100%;
        margin:0;
        padding:0;
        overflow:hidden;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .clearfix{zoom:1}
    .clearfix:after{
        content:'';
        display: block;
        width:0px;
        height:0px;
        clear:both;
        overflow:hidden;
    }
    .markdown{
        display:flex;
        background-color: #fff;
        transition:all 0.5s linear 1.5s;
    }
    .dark_bg{
        background-color: #324057;
    }
    .markdown_head{
        height:60px;
        position:relative;
        input{
            display:block;
            width:100%;
            height:100%;
            font-size:20px;
            padding:20px;
            box-sizing:border-box;
            color:#475669 ;
            border:1px solid #EFF2F7;
            outline:none;
        }
        .text_num{
            position:absolute;
            top:0px;
            bottom:0px;
            margin:auto;
            right:20px;
            height:15px;
            line-height: 1.5em;
            display: inline-block;
            vertical-align:bottom;
            font-size:12px;
            color:#ddd;
            z-index:999;
        }
    }
    .markdown_tool{
        width:100%;
        background-color: #fff;
    }
    .markdown_menu,.markdown_menu li{
        list-style:none;
        margin:0;
        padding:0;
        vertical-align: middle;
    }
    .markdown_menu li,.btn{
        line-height: 36px;
        padding:0 10px;
        background-color:#D3DCE6;
        float:left;
        cursor:pointer;
        vertical-align: bottom;
        transition:all 0.3s linear 0s;
        color:#475669;
        opacity:0.5;
        &:hover{
            opacity:1;
            background-color:#99A9BF;
        }
    }
    .markdown_menu{
        background-color: #EFF2F7;
        position:relative;
        overflow:hidden;
    }

    .markdown_main{
        width:50%;
        display: flex;
        flex-direction: column;
        flex-grow:1;
        transition:all 0.5s linear 0.7s;
    }
    .markdown_center{
        width:800px;
        flex-grow:0;
        margin:50px auto 10px;
    }
    .markdown_edit{
        width:50%;
        flex-grow:1;
    }
    #markdown_edit{
        flex-grow:1;
        width:100%;
        height:100%;
    }
    .save_text{
        float:right;
    }
    #edit{
        width:100%;
        height:100%;
        padding:25px 20px;
        box-sizing:border-box;
        border:1px solid #EFF2F7;
        outline:none;
        font-size:18px;
        line-height:1.5em;
        color:#475669;
        background-color:#F9FAFC;
        resize:none;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    .markdown_preview{
        width:50%;
        padding:20px;
        box-sizing:border-box;
        background-color: #fcfcf2;
        font-size:20px;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        transition:all 0.5s linear 0s;
    }
    .right-enter-active,.right-leave-active {
        transition: all .5s linear 0s;
    }
    .right-enter, .right-leave-active {
      width:0;
    }
</style>
