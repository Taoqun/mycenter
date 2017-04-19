<template lang="html">
  <div>
    <s-head text="注册"></s-head>
    <s-register></s-register>
  </div>
</template>

<script>
import Shead from 'VUEMODULES/common/head'
import register from 'VUEMODULES/account/register'
export default {
  components:{
    "s-head":Shead,
    's-register':register
  }
}
</script>

<style lang="scss">
</style>
