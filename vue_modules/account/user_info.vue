<template lang="html">
    <div id="user_info">
        <div class="user_main clearfix ">
            <div class="setting_left">
                <ul>
                    <li><p class="base active">基础设置</p></li>
                    <li><p>个人资料</p></li>
                    <li><p>其他设置</p></li>
                    <li><p>账号管理</p></li>
                </ul>
            </div>
            <div class="setting_right">
                <div class="setting_content setting_base">
                    <h6>基础设置</h6>
                    <div class="line_row"><span class="row_text">姓名</span><input class="row_input" type="text" name="" value=""></div>
                    <div class="line_row"><span class="row_text">生日</span><input class="row_input" type="text" name="" value=""></div>
                    <div class="line_row"><span class="row_text">性别</span><input class="row_input" type="text" name="" value=""></div>
                    <div class="line_row"><span class="row_text">邮箱</span><input class="row_input" type="text" name="" value=""></div>
                    <div class="line_row"><span class="row_text">电话</span><input class="row_input" type="text" name="" value=""></div>
                    <div class="line_row"><el-button class="save_btn" size="large">保存</el-button></div>

                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import element_ui from 'element-ui'
    Vue.use(element_ui)

    export default {
    }
</script>

<style lang="scss">
    #user_info{
        width:1000px;
        margin:20px auto;
        font-family:'microsoft YaHei';

        .user_main{
            margin:10px 0;
            padding:20px 0;
        }
        .setting_left{
            float:left;
            padding:20px;
            p{
                width:160px;
                font-size:16px;
                line-height:30px;
                padding:10px;
                color:#1F2D3D;
                transition:all 0.1s linear 0s;
                box-sizing:border-box;
                cursor:pointer;
                border-left:2px solid transparent;
            }
            p:hover,.active{
                background-color:#EFF2F7;
                border-left:2px solid #20A0FF;
            }
        }
        .setting_right{
            overflow:hidden;
            width:800px;
            min-height:800px;
            position:relative;
            .setting_content{
                position: absolute;
                top:0;
                left:0;
                padding:20px;
                width:100%;
                h6{
                    width:100%;
                    text-indent:20px;
                    font-size:20px;
                    border-bottom:1px solid #20A0FF;
                    padding:10px;
                    margin:0 0 50px 0;
                }
                .line_row{
                    margin:15px 0;
                    padding-left:50px;

                }
                .row_text{
                    width:100px;
                    display:inline-block;
                    vertical-align: middle;
                    text-align: left;
                    font-size:18px;
                    line-height:25px;
                    margin-right:20px;
                    letter-spacing:5px;
                    color:#8492A6;
                }
                .row_input{
                    display:inline-block;
                    width:300px;
                    height:35px;
                    padding:5px 10px;
                    font-size:18px;
                    color:#C0CCDA;
                    vertical-align: middle;
                    border-radius:4px;
                    border:1px solid #C0CCDA;
                    transition:all 0.3s linear 0s;
                    &:focus{
                        color:#475669;
                        border:1px solid #475669;
                    }
                }
                .save_btn{
                    width:100px;
                    margin-top:20px;
                }
            }
        }
    }


    @media screen and (max-width:1000px){
        #user_info{
            width:100%;
        }
    }
</style>
