<template lang="html">
  <div class="">
    <s-head text="登陆"></s-head>
    <s-login></s-login>
  </div>
</template>

<script>
  import sHead from 'VUEMODULES/common/head'
  import Login from 'VUEMODULES/account/login'
  export default {
    components:{
      "s-head":sHead,
      "s-login":Login
    }
  }
</script>

<style lang="scss">
</style>
