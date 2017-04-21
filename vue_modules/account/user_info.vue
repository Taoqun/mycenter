<template lang="html">
    <div id="user_info">
        <div class="user_main clearfix ">
            <div class="setting_left">
                <ul @click="showContent">
                    <li><p class="base" :class=" {'active':show_content == 'setting_base'}" data-show="setting_base">基础设置</p></li>
                    <li><p data-show="setting_user">个人资料</p></li>
                </ul>
            </div>
            <div class="setting_right">
                <div v-show="show_content == 'setting_base' " class="setting_content setting_base">
                    <h6>基础设置</h6>
                    <div class="line_row">
                        <span class="row_text">头像</span>
                        <div class="row_input avatar">
                            <img @click="clickAvatar" ref="avatarImg" :src="user_info.avatar" alt="">
                            <input @change="avatarChange" ref="avatarInput" style="display:none;" type="file">
                        </div>
                    </div>
                    <div class="line_row"><span class="row_text">姓名</span><input class="row_input" type="text" name="" v-model="user_info.name"></div>
                    <div class="line_row"><span class="row_text">邮箱</span><input class="row_input" type="text" name="" v-model="user_info.email"></div>
                    <div class="line_row"><span class="row_text">电话</span><input class="row_input" type="text" name="" v-model="user_info.phone"></div>
                    <div class="line_row"><el-button class="save_btn" size="large" @click="saveUserInfo">保存</el-button></div>
                    <div class="line_row clearfix"><el-button class="del_account" size="large" type="danger" @click.stop="delAccount">注销此账号</el-button></div>
                </div>

                <div v-show="show_content == 'setting_user' " class="setting_content setting_base">
                    <h6>个人资料</h6>
                    <div class="line_row"><span class="row_text">姓名</span><input class="row_input" type="text" name="" v-model="user_info.name"></div>
                    <div class="line_row"><span class="row_text">生日</span>
                        <el-date-picker
                              class="row_date"
                              v-model="user_info.birth_day"
                              type="date"
                              placeholder="选择日期"
                              :picker-options="pickerOptions0">
                        </el-date-picker></div>
                    <div class="line_row"><span class="row_text">性别</span>
                        <el-select v-model="user_info.sex" placeholder="请选择" class="row_date">
                           <el-option
                             v-for="item in sexlist"
                             :label="item.label"
                             :value="item.value">
                           </el-option>
                         </el-select>
                    </div>
                    <div class="line_row"><span class="row_text">邮箱</span><input class="row_input" type="text" name="" v-model="user_info.email"></div>
                    <div class="line_row"><span class="row_text">电话</span><input class="row_input" type="text" name="" v-model="user_info.phone"></div>
                    <!-- <div class="line_row"><span class="row_text">简介</span><textarea class="row_input" type="text" name="" v-model="user_info.phone"></textarea></div> -->
                    <!-- <div class="line_row"><span class="row_text">个人网站</span><input class="row_input" type="text" name="" v-model="user_info.phone"></div> -->
                    <div class="line_row"><el-button class="save_btn" size="large" @click="saveUserInfo">保存</el-button></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue'
    import {
        Button,
        Loading,
        Select,
        DatePicker,
        MessageBox,
        Message,
        Option, } from 'element-ui'

    import {ajax, gotologin} from 'JS/ajax.js'
    Vue.use(Button)
    Vue.use(Loading)
    Vue.use(Select)
    Vue.use(Option)
    Vue.use(DatePicker)

    Vue.prototype.$msgbox = MessageBox
    Vue.prototype.$alert = MessageBox.alert
    Vue.prototype.$confirm = MessageBox.confirm
    Vue.prototype.$prompt = MessageBox.prompt
    Vue.prototype.$message = Message

    export default {
        data(){
            return{
                user_info:{
                    name:'',
                    birth_day:'',
                    sex:'',
                    email:'',
                    phone:'',
                    avatar:'',
                },
                sexlist:[
                    {
                        label:"男",
                        value:"男"
                    },
                    {
                        label:"女",
                        value:"女"
                    }
                ],
                pickerOptions0:{
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    }
                },
                show_content:'setting_base',
                the_active:'',
            }
        },
        created(){
            ajax({
                url:"/account/getUserInfo",
            }).then( ( data ) => {
                gotologin(data)
                this.user_info.name = data.name
                this.user_info.birth_day = data.birth_day || ""
                this.user_info.sex = data.sex || ""
                this.user_info.email = data.email || ""
                this.user_info.phone = data.phone || ""
                this.user_info.avatar = data.avatar || "/image/avatar.png"
            } )
        },
        mounted(){

        },
        methods:{
            clickAvatar(){
                this.$refs.avatarInput.click()
            },
            avatarChange(event){
                let file = event.target.files[0]
                let fr = new FileReader()
                    fr.onload = (e)=>{
                        this.user_info.avatar = e.target.result
                        this.updateAvatar(file)
                    }
                    fr.readAsDataURL(file)
            },
            updateAvatar(file){
                let form = new FormData()
                    form.append("img",file)
                ajax({
                    method:'post',
                    url:"/account/updateAvatar",
                    data:form
                }).then((data)=>{
                    console.log(data)
                })
            },
            saveUserInfo(){
                if(this.user_info.birth_day && this.user_info.birth_day instanceof Date){
                    this.user_info.birth_day = (new Date(this.user_info.birth_day)).valueOf()
                }
                this.user_info.birth_day = this.user_info.birth_day || ''
                this.user_info.sex = this.user_info.sex || ''

                let obj = {}
                    obj.birth_day = this.user_info.birth_day
                    obj.sex = this.user_info.sex
                    obj.name = this.user_info.name
                    obj.email = this.user_info.email
                    obj.phone = this.user_info.phone
                ajax({
                    method:'post',
                    url:'/account/updateUserInfo',
                    data: obj,
                }).then( (data)=>{
                    if(data.code){
                        this.$message({
                          message: '保存成功!',
                          type: 'success'
                        });
                    }else{
                        this.$message({
                          message: '保存失败!',
                          type: 'error'
                        });
                    }
                })
            },
            showContent(event){
                let the = event.target
                if(the.tagName.toLowerCase() === 'p' && the.dataset.show ){
                    this.show_content = the.dataset.show
                    the.className += ' active'
                    if(this.the_active){
                        this.the_active.className = this.the_active.className.replace('active','').trim()
                    }
                    this.the_active = the
                }
            },
            delAccount(){
                this.$confirm("您正在注销此账户，是否继续？","提示！",{
                      confirmButtonText: '确定',
                      cancelButtonText: '取消',
                      type: 'danger'
                }).then( () => {
                    inputPassword(this)
                })

                function inputPassword(_this){
                    _this.$prompt("请输入密码！","提示",{
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                    }).then( ({value})=> {
                        ajaxDelAccount(value,_this)
                    })
                }

                function ajaxDelAccount(password,_this){
                    let loading_del = Loading.service({ fullscreen:true })
                    ajax({
                        method:'post',
                        url:'/account/delAccount',
                        data:{password:password}
                    }).then( (data)=> {

                        loading_del.close()
                        if(data.code === 1){
                            _this.$alert("账户已删除","提示",{
                                comfirmButtonText:"确定",
                                callback:action =>{
                                    let str = location.protocol + '//' + location.hostname +':'+location.port + '/account/login'
                                    location.href = str
                                }
                            })
                        }else if(data.code === 2){
                            _this.$alert("密码不正确","提示")
                        }else if(data.code === 0){
                            _this.$alert("服务器错误","提示")
                        }else{
                            _this.$alert("出现位置问题，稍后再试","提示")
                        }

                    } )
                }

            }
        }
    }
</script>

<style lang="scss">
    #user_info{
        width:1000px;
        margin:20px auto;
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
                    font-size:0;
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
                    height:45px;
                    padding:5px 10px;
                    font-size:18px;
                    color:#C0CCDA;
                    vertical-align: middle;
                    border-radius:4px;
                    border:1px solid #C0CCDA;
                    transition:all 0.3s linear 0s;
                    box-sizing:border-box;
                    &:focus{
                        color:#475669;
                        border:1px solid #475669;
                    }
                }
                .avatar{
                    margin-left:10px;
                    padding:0;
                    width:100px;
                    height:100px;
                    border-radius:50%;
                    border:1px solid #666;
                    overflow:hidden;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .row_date{
                    width:300px;
                    height:45px;
                    input{
                        height:45px;
                    }
                }
                .save_btn{
                    width:100px;
                    margin-top:20px;
                }
                .del_account{
                    margin-top:50px;
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
