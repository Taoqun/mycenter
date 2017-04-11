<template lang="html">
    <div class="about_wrap">
        <div class="left_menu">
            <ul>
                <li><router-link to="about">关于本站</router-link></li>
                <li><router-link to="me">关于我</router-link></li>
            </ul>
        </div>
        <div class="right_body">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import Router from "vue-router"
    Vue.use(Router)
    export default {

    }
</script>

<style lang="scss">
    .about_wrap{
        width:1000px;
        margin:20px auto;
        display:flex;

        .left_menu{
            color:#1F2D3D;
            li{
                font-size:15px;
                line-height:2em;
                margin:0 10px;
            }
            a{
                display:block;
                height:100%;
                padding:5px 20px;
                background-color:#F9FAFC;
                border-bottom:1px solid #EFF2F7;
                transition:all 0.3s linear 0s;
            }
            a:hover{
                background-color:#EFF2F7;
            }
        }
        .right_body{
            flex-grow:1;
            margin-left:20px;
            padding:20px;
            border-top:1px solid #e8e8e8;
        }
    }
</style>
