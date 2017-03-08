<template lang="html">
    <div class="markdown">
        <div class="markdown_head">
            <input type="text" name="" value="">
        </div>
        <div class="markdown_tool">
            <ul>

            </ul>
            <el-button @click="run">保存文章</el-button>
        </div>
        <div class="markdown_main">
            <div class="markdown_edit" id="markdown_edit">
                <textarea id="edit" contenteditable="true" @keyup.stop="run"></textarea>
            </div>
            <div class="markdown_preview markdown-body" id="markdown_preview"></div>
        </div>
    </div>
</template>

<script>
    import "CSS/cssreset.css"
    import "CSS/markdown.css"
    import { markdown } from 'markdown'
    import Vue from 'vue'
    import ElementUI from "element-ui"
    Vue.use(ElementUI)

    export default {
        data(){
            return {

            }
        },
        methods:{
            run(){
                let tem = document.querySelector("#markdown_edit #edit").value
                let str = markdown.toHTML(tem)
                document.querySelector("#markdown_preview").innerHTML = str
            }
        }
    }
</script>

<style lang="scss">
    html,body,#app,.markdown{
        width:100%;
        height:100%;
        overflow:hidden;
    }
    .markdown{
        display:flex;
        flex-direction: column;
    }
    .markdown_head{
        height:60px;
        input{
            display:block;
            width:100%;
            height:100%;
            font-size:20px;
            padding:20px;
            box-sizing:border-box;
            border:1px solid #eee;
        }
    }
    .markdown_tool{
        li{
            display:inline-block;
        }
    }
    .markdown_main{
        flex-grow:2;
        display: flex;
    }
    .markdown_edit{
        width:50%;
        #edit{
            width:100%;
            height:100%;
            padding:20px;
            box-sizing:border-box;
            border:1px solid #eee;
        }
    }
    .markdown_preview{
        width:50%;
        padding:20px;
        box-sizing:border-box;
    }
</style>
