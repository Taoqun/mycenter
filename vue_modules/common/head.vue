<template lang="html">
  <div class="head">
    <h1>私人助理 · {{text}}</h1>
    <ul class="nav-list">
      <li v-for="item in head_list"><a :href="item.url">{{item.name}}</a></li>
    </ul>
  </div>
</template>

<script>
import 'CSS/cssreset.css'
export default {
  props:{
    text:{
      type:String,
      default:'测试'
    }
  },
  data(){
    return {
      head_list:[
        {name:'首页',url:'/index/'},
        {name:'任务中心',url:'/task/'},
        {name:'发现',url:'/index'},
        {name:'收藏',url:'/index'},
        {name:'个人中心',url:'/account/user_info'},
        {name:'设置',url:'/index'},
        {name:'关于',url:'/index'},
      ]
    }
  }
}
</script>

<style lang="scss">
    body{
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
  .head{
    padding:30px 0;
    background-color:#324057;
    color:#20A0FF;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    h1{
      width:1000px;
      margin:20px auto;
      font-size:20px;
      line-height:1.5;
    }
    .nav-list{
      width:1000px;
      margin: 0 auto;
      font-size:0px;
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
