<template lang="html">
  <div class="">
    <s-head text="登陆"></s-head>
    <s-login></s-login>
  </div>
</template>

<script>
  import sHead from 'VUEMODULES/head'
  import Login from 'VUEMODULES/login'
  export default {
    components:{
      "s-head":sHead,
      "s-login":Login
    }
  }
</script>

<style lang="scss">
</style>
