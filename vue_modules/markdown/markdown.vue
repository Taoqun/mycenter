<template lang="html">
    <div class="markdown " :class="{'dark_bg':!preview_show,'markdown_night_mode':night_mode}">
        <div class="markdown_main" :class="{'markdown_center':!preview_show}">

            <div class="markdown_top">
                <div class="markdown_head">
                    <input  type="text" name="" placeholder="键入标题" v-model="title">
                    <span class="text_num">当前字数 <i>{{ content.length }}</i></span>
                </div>
                <div class="keywords">
                    <input @keyup.enter="setKeyword" type="text" name="" value="" placeholder="输入关键词标签,回车保存" >
                    <ul>
                        <li v-for="item in keywords"><span @click="delKeywrods(item)" class="iconfont icon-close"></span>{{item}}</li>
                    </ul>
                </div>
                <div class="markdown_tool clearfix">
                    <div class="save_text btn" @click="saveContent">保存文章</div>
                    <ul class="markdown_menu clearfix">
                        <li @click="changeEditType">写作模式</li>
                        <li @click="changeNightMode">夜间模式</li>
                        <li><a href="/index">首页</a></li>
                        <li><a href="/getPaperList">文章列表</a></li>
                        <li><a :href="'/paper/' + user_id +'/'+paper_id ">查看本文</a></li>
                    </ul>
                </div>
            </div>

            <div id="markdown_edit">
                <textarea id="edit" placeholder="内容区" v-model="content"></textarea>
            </div>

        </div>
        <transition name="right">
            <div v-show="preview_show" class="markdown_preview markdown-body" id="markdown_preview">
            </div>
        </transition>

    </div>
</template>

<script>
    import "CSS/cssreset.css"
    import "CSS/markdown.css"
    import "CSS/ali/iconfont.css"
    import hyperdown from 'hyperdown'
    import { ajax } from "JS/ajax.js"
    import Vue from 'vue'
    import {MessageBox,Message} from 'element-ui'

    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message

    export default {
        data(){
            return {
                preview_show:true,
                night_mode:false,
                title:'',
                name:'',
                content:'',
                date:'',
                user_id:'',
                paper_id:'',
                keywords:[],
            }
        },
        watch:{
            title(){
                document.querySelector("title").innerText = this.title
            },
            content(){
                let tem = this.content
                    // tem = markdown.toHTML(tem)
                let parse = new hyperdown()
                    tem = parse.makeHtml(tem)
                document.querySelector(".markdown-body").innerHTML = tem
            }
        },
        mounted(){
            this.title = title
            this.name = name
            this.date = date
            this.user_id = user_id
            this.paper_id = paper_id
            this.keywords = keywords
            this.content = document.querySelector("#content").value
            let load = document.querySelector(".sk-cube-grid")
            if(load){
                load.parentNode.removeChild(load)
            }
        },
        methods:{
            stop(){
                return false
            },
            changeEditType(){
                this.preview_show = !this.preview_show
            },
            changeNightMode(){
                this.night_mode = !this.night_mode
            },
            saveContent(){
                let obj = {}
                    obj.title = this.title
                    obj.content = this.content
                    obj.user_id = this.user_id
                    obj.paper_id = this.paper_id
                    obj.keywords = this.keywords

                    ajax({
                        url:"/paper/savePaper",
                        method:"post",
                        data:obj
                    }).then( (data)=>{
                        if(data.code){
                            this.$message({
                                 message: '保存成功',
                                 type: 'success'
                             });
                        }else{
                            this.$message({
                                 message: '保存失败',
                                 type: 'error'
                             });
                        }
                    })
            },
            setKeyword(event){
                if( !event.target.value ){
                    this.$message({
                         message: '请输入关键词！',
                         type: 'error'
                     });
                     return
                }
                if( event.target.value.length > 10 ){
                    this.$message({
                         message: '关键词长度不能大于10位',
                         type: 'error'
                     });
                    return
                }
                if(this.keywords.length < 5 ){
                    this.keywords.push( event.target.value )
                    event.target.value = ''
                }else{
                    this.$message({
                         message: '关键词不能超过5个',
                         type: 'error'
                     });
                }
            },
            delKeywrods(obj){
                if(obj){
                    this.keywords.splice( this.keywords.indexOf(obj),1 )
                }
            },
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
            border:none;
            border-right:1px solid #EFF2F7;
            outline:none;
            transition:all 0.5s linear 0s;
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
        transition:all 0.5s linear 0s;
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
        a{
            display:block;
            height:100%;
        }
        &:hover{
            opacity:1;
            background-color:#99A9BF;
        }
    }
    .markdown_menu{
        background-color: #EFF2F7;
        position:relative;
        overflow:hidden;
        transition:all 0.5s linear 0s;
    }
    .markdown_main{
        width:50%;
        display: flex;
        flex-direction: column;
        flex-grow:1;
        transition:all 0.5s linear 0.7s;
    }
    .keywords{
        font-size:0px;
        padding:5px 20px;
        border-right:1px solid #EFF2F7;
        text-align:right;
        background-color: #D3DCE6;
        transition:all 0.5s linear 0s;
        ul{
            display: inline-block;
            vertical-align: middle;
            margin-left:10px;
        }
        ::-webkit-input-placeholder{
            color:#99A9BF;
        }
        input{
            height:25px;
            width:180px;
            vertical-align: middle;
            font-size:12px;
            padding:5px;
            line-height:1.5em;
            border:none;
            transition:all 0.5s linear 0s;
            background-color: #D3DCE6;
            border-bottom:1px solid rgba(153,169,191,0.5);
            color:#99A9BF;
        }
        li{
            vertical-align: middle;
            font-size:12px;
            padding:5px;
            display:inline-block;
            color:#99A9BF;
            transition: all 0.3s linear 0s;
            cursor:pointer;
            span{
                vertical-align: middle;
                display:inline-block;
                opacity:0;
                padding:5px 0;
                transition: all 0.5s linear 0s;
            }
            &:hover{
                background-color:#EFF2F7;
            }
            &:hover span{
                opacity:1;
                padding:5px 2px 5px 5px;
                color:#324057;
            }
        }
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
        margin-right:-15px;
    }
    .save_text{
        float:right;
    }
    #edit{
        width:100%;
        height:100%;
        padding:25px 20px;
        box-sizing:border-box;
        border:none;
        border-right:1px solid #EFF2F7;
        outline:none;
        font-size:18px;
        line-height:1.5em;
        color:#475669;
        background-color:#F9FAFC;
        resize:none;
        transition:all 0.3s linear 0s;
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
        overflow: auto;
    }
    .right-enter-active,.right-leave-active {
        transition: all .5s linear 0s;
    }
    .right-enter, .right-leave-active {
      width:0;
    }

    .markdown_night_mode{
        background-color:#3f3f3f;
        .markdown_head{
            input{
                background-color: #3f3f3f;
                color:#adb1b1;
                border-right:1px solid #2f2f2f;
            }
        }
        .keywords{
            background-color: #4c4c4c;
            color:#b1b1b1;
            border-right:1px solid #2f2f2f;
            input{
                background-color: #4c4c4c;
                color:#b1b1b1;
                border-color:#3f3f3f;
            }
            li:hover{
                background-color:#4c4c4c;
                color:#6ec0ff;
                span{
                    color:#6ec0ff;
                }
            }
        }
        .markdown_tool{
            background-color: #3f3f3f;
            color:#adb1b1;
            box-sizing: border-box;
            border-right:1px solid #2f2f2f;
        }
        .markdown_menu{
            background-color: #2f2f2f;
        }
        .markdown_menu li,.btn{
            background-color: #2f2f2f;
            color:#adb1b1;
            a{
                color:#adb1b1;
            }
            &:hover{
                background-color: #4c4c4c;
                color:#ff716d;
            }
        }
        .btn:hover{
            background-color: #2f2f2f;
        }
        #edit{
            background-color:#3f3f3f;
            color:#adb1b1;
            border-right:1px solid #2f2f2f;
        }
        .markdown_preview{
            background-color:#3f3f3f;
            color:#adb1b1;
        }
    }
    @media screen and (max-width:1000px){
        .markdown_preview{
            display:none;
        }
    }
</style>
