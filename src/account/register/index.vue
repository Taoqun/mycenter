<template lang="html">
  <div>
    <s-head text="注册"></s-head>
    <s-register></register>
  </div>
</template>

<script>
import Shead from 'VUEMODULES/head'
import Register from 'VUEMODULES/register'
export default {
  components:{
    "s-head":Shead,
    's-register':Register
  }
}
</script>

<style lang="scss">
</style>
