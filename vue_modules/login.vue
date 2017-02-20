<template>
    <div id="login">
        <div class="login-main">
            <h4>登陆私人助理</h4>
            <p class="description">
              没有账号可以点击<a href="/account/register"> 注 册</a>
            </p>
            <div class="account">
                <span><i class="el-icon-message"></i>账户名</span>
                <el-input type="text" class="text" placeholder="账户名/邮箱/电话号码" v-model="account"></el-input>
            </div>
            <div class="password">
                <span><i class="el-icon-information" ></i>密码</span>
                <el-input type="text" class="text" placeholder="密码" v-model="password"></el-input>
            </div>
            <div class="submitwrap">
              <el-button type="primary" class="submit" @click="loginIn">登录</el-button>
            </div>

            <div class="login-select">
                <p> - <a href="/account/login">登录</a> - <a href="/account/register">注册</a> - </p>
            </div>
        </div>

        <el-dialog title="提示" v-model="dialog" size="tiny">
          <span>{{ dialog_text }}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="primary" @click="dialog = false">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<script>
    import Vue from 'vue'
    import element from 'element-ui'
    import 'CSS/element.css'
    import {ajax} from 'JS/ajax.js'
    Vue.use(element)
    export default{
        data(){
            return{
                account:'',
                password:'',
                dialog:false,
                dialog_text:'没有输入账号或者密码',
            }
        },
        methods:{
            loginIn(){
                if(this.account && this.password){
                    ajax({
                      url:'/login',
                      method:'GET',
                      data:{
                          account:this.account,
                          password:this.password
                      },
                    }).then((res)=>{
                            let data = res.body
                            if(data.verify){
                                setTimeout(()=>{
                                    location.href = location.protocol + '//'+location.hostname+':'+location.port+"/index"
                                },1000)
                            }else if( !data.verify && data.account ){
                                this.dialog_text='密码错误！'
                                this.dialog = true;
                            }else if(!data.verify && !data.account ){
                                this.dialog_text='账户不存在,若无账户，可注册!'
                                this.dialog = true;
                            }
                    },(res)=>{
                        this.dialog_text='登录失败！'
                        this.dialog = true;
                        console.log('失败')
                    })
                }else{
                    this.dialog_text='没有输入账号或者密码'
                    this.dialog = true
                }
            }
        }
    }
</script>
<style lang="scss">
    #login{
        width:1000px;
        margin:30px auto;
        .login-main{
            width:100%;
            padding:20px;
            margin:0 auto;
            background-color:#F9FAFC;
            border:1px solid #eee;
            box-shadow:0 0 10px #D3DCE6;

        }

        h4{
            font-size:20px;
            color:#1D8CE0;
            text-align:left;
            line-height:40px;
        }
        .description{
          line-height:30px;
          border-bottom:1px solid #e8e8e8;
          a{
            color:#20A0FF;
            padding-left:3px;
          }
        }
        .account,.password{
          margin-left:100px;
            span{
                display:inline-block;
                vertical-align:middle;
                color:#666;
                padding:10px 0;
                letter-spacing:3px;
            }
            i{
                display:inline-block;
                margin-right:10px;
                vertical-align:middle;
            }
            .text{
              display:block;
              width:300px;
            }

        }
        .submitwrap{
          margin-left:100px;
        }
        .submit{
            width:300px;
            margin:20px 0 0;
        }
        .login-select{
            margin-top:30px;
            border-top:1px solid #1F2D3D;
            padding:20px;
            text-align:center;
        }
    }
</style>
