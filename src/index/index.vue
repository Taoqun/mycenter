<template lang="html">
    <div>
        <s-head text="首页"></s-head>
        <s-index></s-index>
    </div>
</template>

<script>
    import Shead from 'VUEMODULES/common/head'
    import Index from 'VUEMODULES/index/index'
    export default {
        components:{
            "s-head":Shead,
            "s-index":Index,
        }
    }
</script>

<style lang="css">
</style>
