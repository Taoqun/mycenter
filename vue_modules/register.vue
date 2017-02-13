<template>
    <div id="register">
        <div class="register-main">
            <h4>注册账户</h4>
            <p class="description">
              如果已有账号可以选择<a href="/account/login">登 陆</a>
            </p>
            <div class="account">
                <span class="input-title"><i class="el-icon-message"></i>账户名</span>
                <div class="line-input">
                  <el-input type="text" class="text" placeholder="账户名/邮箱/电话号码" v-model="account"></el-input>
                  <el-alert
                   :title="account_alert.text"
                   show-icon
                   :type="account_alert.type"
                   :closable="accountAlert">
                 </el-alert>
                </div>

            </div>
            <div class="account">
                <span class="input-title"><i class="el-icon-message"></i>昵称</span>
                <div class="line-input">
                  <el-input type="text" class="text" placeholder="昵称" v-model="name"></el-input>
                </div>
            </div>
            <div class="password">
                <span class="input-title"><i class="el-icon-information" ></i>密码</span>
                <div class="line-input">
                  <el-input type="text" class="text" placeholder="密码" v-model="password"></el-input>
                  <el-alert
                   :title="password_alert.text"
                   show-icon
                   :type="password_alert.type"
                   :closable="passwordAlert">
                 </el-alert>
                </div>
            </div>
            <div class="password">
                <span class="input-title"><i class="el-icon-information" ></i>重复密码</span>
                <div class="line-input">
                  <el-input type="text" class="text" placeholder="密码" v-model="passwordAgain"></el-input>
                  <el-alert
                   :title="passwordAgain_alert.text"
                   show-icon
                   :type="passwordAgain_alert.type"
                   :closable="passwordAgainAlert">
                 </el-alert>
                </div>
            </div>
            <div class="submitwrap">
              <el-button type="primary" class="submit" @click="loginIn">注册</el-button>
            </div>

            <div class="login-select">
                  <p> - <a href="/account/login">登录</a> - <a href="/account/register">注册</a> - </p>
            </div>
        </div>

        <el-dialog title="提示" v-model="dialog" size="tiny">
          <span>{{alertText}}</span>
          <span slot="footer" class="dialog-footer">
            <el-button type="success" @click="dialog = false">确 定</el-button>
          </span>
        </el-dialog>

        <div v-loading.fullscreen.lock="loading" element-loading-text="注册成功，跳转中！"></div>
    </div>
</template>
<script>
  import Vue from 'vue'
  import VueResource from 'vue-resource'
  import element from 'element-ui'
  import 'LIBCSS/element.css'
  Vue.use(element)
  Vue.use(VueResource)
    export default{
        data(){
            return{
                account:'',
                name:'',
                password:'',
                passwordAgain:'',
                dialog:false,
                alertText:'',
                loading:false,
                account_alert:{
                  text:'请输入邮箱',
                  type:'success',
                },
                password_alert:{
                  text:'请输入与密码',
                  type:'success',
                },
                passwordAgain_alert:{
                  text:'请再次输入密码',
                  type:'success'
                },
            }
        },
        computed:{
          accountAlert(){
            if(!this.account){
              this.account_alert.text = '请输入邮箱！'
              this.account_alert.type = 'info'
            }else if(this.account && /.+@.+\..+/.test(this.account) ){
              this.account_alert.text = '邮箱正确！'
              this.account_alert.type = 'success'
            }else{
              this.account_alert.text = '请输入正确的邮箱！'
              this.account_alert.type = 'error'
            }
            return false
          },
          passwordAlert(){
            if(!this.password){
              this.password_alert.text = '请输入密码！'
              this.password_alert.type = 'info'
            }else if( this.password.length < 6){
              this.password_alert.text = '密码的长度不能小于6位数！'
              this.password_alert.type = 'error'
            }else if( this.password.length >= 6){
              this.password_alert.text = '确认！'
              this.password_alert.type = 'success'
            }
            return false
          },
          passwordAgainAlert(){
            if(!this.passwordAgain){
              this.passwordAgain_alert.text = '请再次输入密码！'
              this.passwordAgain_alert.type = 'info'
            }else if( this.passwordAgain !== this.password ){
              this.passwordAgain_alert.text = '两次输入的密码不一致！'
              this.passwordAgain_alert.type = 'error'
            }else if( this.passwordAgain == this.password ){
              this.passwordAgain_alert.text = '密码一致'
              this.passwordAgain_alert.type = 'success'
            }
            return false
          }
        },
        methods:{
            loginIn(){
                // 检测邮箱账户 邮箱是否匹配 重复密码是否相等 并且密码的长度大于6
                if(!this.account || !this.password){
                  this.alertText = '请输入账号或者密码！'
                  this.dialog = true
                  return
                }
                if(!/.+@.+\..+/.test(this.account)){
                  this.alertText = '邮箱不正确！'
                  this.dialog = true
                  return
                }
                if(this.password && this.passwordAgain && this.password !== this.passwordAgain){
                  this.alertText = '密码不相等'
                  this.dialog = true
                  return
                }
                if(this.account && this.password){
                    this.$http.post(
                      'http://localhost:8081/account/sendRegister',
                      {
                          account:this.account,
                          password:this.password,
                          name:this.name,
                      },
                      {emulateJSON:true}
                    ).then((res)=>{
                            console.log(res.body)
                            let result = res.body
                            if(result.register === 'yes'){
                              localStorage.account = this.account
                              localStorage.password = this.password
                              this.loading = true
                            }else if(result.register === 'no'){
                              this.alertText = '账号已存在，请更换后重试！'
                              this.dialog = true
                            }
                        },(res)=>{
                            console.log(1)
                    })
                }
            }
        }
    }
</script>
<style lang="scss">
    #register{
        width:1000px;
        margin:30px auto;
        .register-main{
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
          margin-bottom:30px;
          a{
            color:#20A0FF;
            padding-left:3px;
          }
        }
        .account,.password{
          margin-left:100px;
            .input-title{
                display:inline-block;
                vertical-align:middle;
                color:#666;
                padding:10px 0;
                letter-spacing:3px;
                i{
                    display:inline-block;
                    margin-right:10px;
                    vertical-align:middle;
                }
            }
            .text{
              width:300px;
            }

        }
        .line-input{
          font-size:0px;
          &>div{
            display:inline-block;
            vertical-align:middle;
          }
          .el-alert{
            width:200px;
            margin-left:30px;
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
