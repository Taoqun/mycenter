<template lang="html">
  <div class="head">
    <canvas id="canvas"></canvas>
    <h1>私人助理 · {{text}}</h1>
    <ul class="nav-list">
      <li v-for="item in head_list"><a :href="item.url">{{item.name}}</a></li>
    </ul>

  </div>
</template>

<script>
    import 'CSS/cssreset.css'
    import CanvasAnimate from "JS/CanvasAnimate.js"
    import {headList} from "ROOT/config.js"
    export default {
        props:{
            text:{
              type:String,
              default:'测试'
            }
        },
        data(){
            return {
              head_list:headList
            }
        },
        mounted(){
            var a = window.getComputedStyle(document.querySelector(".head"))
            var cvs = document.querySelector("#canvas")
            cvs.width = parseInt( a.width )
            cvs.height = parseInt( a.height )
            let options = {
                length:50,
                RoundColor:'#1D8CE0',
                LineColor:'#475669',
                moveon:true,
                clicked:true,
            };
            var new_cvs = new CanvasAnimate(cvs,options)
                new_cvs.Run()

        }
    }
</script>

<style lang="scss">
    body{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
  .head{
    padding:30px 0;
    box-sizing:border-box;
    background-color:#324057;
    color:#20A0FF;
    position:relative;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    #canvas{
        position:absolute;
        top:0;
        left:0;
    }
    h1{
      width:1000px;
      margin:20px auto;
      font-size:20px;
      line-height:1.5;
      position:relative;
    }
    .nav-list{
      width:1000px;
      margin: 0 auto;
      font-size:0px;
      position:relative;
      li{
        display:inline-block;

        a{
          display:block;
          height:100%;
          padding:10px 15px;
          font-size:15px;
          color:#fff;
          background-color:#475669;
          transition:all 0.2s linear 0s;
        }
        a:hover{
          background-color:#1F2D3D;
        }
      }
    }
  }
</style>
