<template lang="html">
    <div>
        <s-head text="项目列表"></s-head>
        <s-list></s-list>
    </div>
</template>

<script>
    import head from "VUEMODULES/common/head"
    import list from 'VUEMODULES/api/apiList'
    
    export default {
        components:{
            "s-head":head,
            "s-list":list,
        },
        mounted(){
            console.log(111)
        }
    }
</script>

<style lang="css">
</style>
