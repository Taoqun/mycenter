<template lang="html">
    <div id="user_info">
        <h3>用户中心</h3>
        <div class="user_main clearfix ">
            <div class="setting_left">
                <ul>
                    <li><p class="base">基础设置</p></li>
                    <li><p>个人资料</p></li>
                    <li><p>其他设置</p></li>
                    <li><p>账号管理</p></li>
                </ul>
            </div>
            <div class="setting_right">
                <div class="setting_base">
                    <h6>基础设置</h6>
                    <div class=""><span>姓名</span><input type="text" name="" value=""></div>
                    <div class=""><span>出生年月日</span><input type="text" name="" value=""></div>
                    <div class=""><span>性别</span><input type="text" name="" value=""></div>
                    <div class=""><span>邮箱</span><input type="text" name="" value=""></div>
                    <div class=""><span>电话</span><input type="text" name="" value=""></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
    #user_info{
        width:1000px;
        margin:20px auto;

        .user_main{
            margin:10px 0;
            padding:20px;
        }
        .setting_left{
            float:left;
            padding:20px;
        }
        .setting_right{
            overflow:hidden;
            padding:20px;
        }
    }


    @media screen and (max-width:1000px){
        #user_info{
            width:100%;
        }
    }
</style>
