<template lang="html">
    <div class="">
        <s-head text="关于本站"></s-head>
        <s-about></s-about>
    </div>
</template>

<script>
    import Head from "VUEMODULES/common/head.vue"
    import About from "VUEMODULES/about/about.vue"
    export default {
        components:{
            "s-head":Head,
            "s-about":About,
        }
    }
</script>

<style lang="scss">
</style>
