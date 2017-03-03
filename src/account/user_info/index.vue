<template lang="html">
    <div>
        <s-head text="个人中心"></s-head>
        <s-userinfo></s-userinfo>
    </div>
</template>

<script>
    import Shead from 'VUEMODULES/common/head'
    import userinfo from 'VUEMODULES/account/user_info'
    export default {
        components:{
          "s-head":Shead,
          "s-userinfo":userinfo,
        }
    }
</script>

<style lang="scss">
</style>
