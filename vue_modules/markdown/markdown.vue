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
                <textarea id="edit" contenteditable="true" @keydown.stop="stop" @keyup.stop="run"></textarea>
            </div>
            <code class="markdown_preview" id="markdown_preview">
                <div class="markdown-body"></div>
            </code>
        </div>
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

            }
        },
        methods:{
            stop(){
                return false
            },
            run(){
                let tem = document.querySelector("#markdown_edit #edit").value
                    tem = parse(tem)
                document.querySelector(".markdown-body").innerHTML = tem
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
