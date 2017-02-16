<template lang="html">
    <div class="drop-down" v-show="show">
        <i class="drop-down-icon iconfont icon-triangleupfill"></i>
        <p v-for="item in list" @click="item.event">{{item.name}}</p>
    </div>
</template>

<script>
export default {
    props:{
        list:Array,
        show:Boolean,
    },
}
</script>

<style lang="scss">
    .drop-down{
        width:100%;
        position:absolute;
        top:100%;
        left:50%;
        margin-left:-50%;
        padding:10px 0;
        box-sizing: border-box;
        .drop-down-icon{
            display:inline-block;
            width:20px;
            height:20px;
            position:absolute;
            top:-3px;
            left:50%;
            margin-left:-10px;
            font-size:16px;
            text-align: center;
            color:#fff;
        }
        p{
            background-color:#fff;
            padding:15px 20px;
            margin:0 10px;
            color:#272727;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            position:relative;
            cursor:pointer;
            &:after{
                content:'';
                position:absolute;
                bottom:0;
                left:0;
                right:0;
                margin:0 auto;
                width:90%;
                height:1px;
                background-color:#E5E9F2;
            }
            &:first-of-type{
                border-top-left-radius: 5px;
                border-top-right-radius: 5px;
            }
            &:last-of-type{
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
            }
            &:hover{
                    background-color: #eeeeee;
            }
        }
    }
</style>
