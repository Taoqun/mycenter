<template lang="html">
  <div class="head">
    <h1>私人助理 · {{text}}</h1>
    <ul class="nav-list">
      <li v-for="item in head_list"><a :href="item.url">{{item.name}}</a></li>
    </ul>
  </div>
</template>

<script>
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
        {name:'首页',url:'/account/login/'},
        {name:'发现',url:'/account/login/'},
        {name:'收藏',url:'/account/login/'},
        {name:'关于',url:'/account/login/'}
      ]
    }
  }
}
</script>

<style lang="scss">
  .head{
    padding:30px 0;
    background-color:#324057;
    color:#20A0FF;
    h1{
      width:900px;
      margin:20px auto;
      font-size:20px;
      line-height:1.5;
    }
    .nav-list{
      width:900px;
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
