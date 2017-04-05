<template lang="html">
    <div class="">
        <s-head text="api详情"></s-head>
        <s-detail></s-detail>
    </div>
</template>

<script>
    import Head from "VUEMODULES/common/head.vue"
    import Detail from "VUEMODULES/api/apiDetail.vue"
    export default {
        components:{
            "s-head":Head,
            "s-detail":Detail,
        }
    }
</script>

<style lang="css">
</style>
