<template>
    <div id="login">
        <div class="login-main">
            <h4>登录</h4>
            <div class="account">
                <span><i class="el-icon-message"></i>账户名</span>
                <el-input type="text" placeholder="账户名" v-model="account"></el-input>
            </div>
            <div class="password">
                <span><i class="el-icon-information" ></i>密码</span>
                <el-input type="text" placeholder="密码" v-model="password"></el-input>
            </div>
            <el-button type="primary" class="submit" @click="loginIn">登录</el-button>

            <div class="login-select">
                <p> - <a>登录</a> - <a>注册</a> - </p>
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue'
    import VueResource from 'vue-resource'
    import 'LIBCSS/cssreset.css'
    import 'LIBCSS/element.css'
    import element from 'element-ui'
    Vue.use(element)
    Vue.use(VueResource)
    export default{
        data(){
            return{
                account:'',
                password:'',
            }
        },
        methods:{
            loginIn(){
                if(this.account && this.password){
                    this.$http.get('http://localhost:8081/login')
                        .then((res)=>{
                            console.log(res.body[0])
                            let data = res.body[0]
                            this.account =   data.account
                            this.password = data.password
                        },(res)=>{
                            console.log(1)
                        })
                }else{
                    console.log('no account or password')
                }
            }
        }
    }
</script>
<style lang="scss">
    #login{
        width:100%;
        height:100%;
        position:fixed;
        top:0;
        left:0;

        .login-main{
            width:300px;
            padding:20px;
            background-color:#F9FAFC;
            border:1px solid #eee;
            box-shadow:0 0 10px #D3DCE6;
            position:absolute;
            top:100px;
            left:50%;
            transform:translate(-50%,0px);
        }

        h4{
            font-size:20px;
            color:#1D8CE0;
            text-align:center;
            line-height:40px;
        }
        .account,.password{
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
        }
        .submit{
            width:100%;
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
