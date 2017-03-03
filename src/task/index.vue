<template lang="html">
    <div class="">
        <s-head text="任务中心"></s-head>
        <s-task></s-task>
    </div>
</template>

<script>
    import Shead from 'VUEMODULES/common/head'
    import Stask from 'VUEMODULES/task/task'
    export default {
        components:{
            "s-head":Shead,
            "s-task":Stask,
        }
    }
</script>

<style lang="css">
</style>
