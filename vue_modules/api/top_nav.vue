<template lang="html">
    <div class="">
        <p class="location" v-html="crumbs"></p>
    </div>
</template>

<script>
    export default {
        props:{
            location:Array,
        },
        computed:{
            crumbs(){
                let str = ''
                    this.location.forEach((item,index)=>{
                        str += `${item.name}`
                        if( index !== this.location.length -1 ){
                            str += ' / '
                        }
                    })
                return str
            }
        }
    }
</script>

<style lang="scss">
    .location{
        font-size:15px;
        line-height:1.5em;
        padding:10px 20px;
        background-color:#D3DCE6;

        a:hover{
            text-decoration:underline;
        }
    }
</style>
