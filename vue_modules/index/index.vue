<template lang="html">
    <div id="index">
        <h6 class="title">生辰</h6>
        <div class="alive">
            <p>生之时</p>
            <p v-show="birth_date" class="birth_date">出生日期{{birth_date}}</p>
            <p>你已经23.24302619岁了</p>
            <h5>在这个世界上，你已经存在了</h5>
            <ul>
                <li> 23年 </li>
                <li> 279月 </li>
                <li> 1212周 </li>
                <li> 8489天 </li>
                <li> 203752小时 </li>
                <li> 12225174分钟 </li>
            </ul>
        </div>

        <div class="death">

        </div>

        <div class="progress_wrap">
            <div class="progress" style="width:0%">{{progress}}%</div>
        </div>

        <div class="model_choice_date" v-show="model_date">
            <div class="black_bg"> </div>
            <div class="chiose_body">
                <p class="chioce_text">选择你的出生日期</p>
                <el-date-picker
                  v-model="birth_value"
                  type="date"
                  placeholder="选择日期"
                  @change="contime"
                  :picker-options="pickerOptions0">
                </el-date-picker>
                <el-button type="success" @click="close_date_model">确定</el-buttom>
            </div>

        </div>

    </div>
</template>

<script>
import Vue from 'vue'
import elementUI from 'element-ui'
Vue.use(elementUI)

export default {
    data(){
        return {
            progress:0,
            birth_value:'',
            pickerOptions0:{
                disabledDate(time) {
                    return time.getTime() > Date.now()
                }
            },
            model_date:false,
        }
    },
    computed:{
        birth_date(){
            let str = ''
            if(this.birth_value){
                let year = this.birth_value.getFullYear()
                let month = this.birth_value.getMonth() +1
                let day = this.birth_value.getDate()
                str = year + '-' + month + '-' + day
            }
            return str
        }
    },
    methods:{
        contime(){
            console.log( this.birth_value.getFullYear() )
        },
        close_date_model(){
            console.log( this.birth_value )
            if(!this.birth_value){
                this.$alert('请选择您的出生日期', '选择日期', {
                  confirmButtonText: '确定',
               })
            }else{
                this.model_date = false
            }
        },
    },
    mounted(){
        let timer = setInterval(()=>{
            if(this.progress === 100 ){
                clearInterval(timer)
                return
            }
            let ps = document.querySelector(".progress")
            this.progress += 10
            ps.style.width = this.progress + '%'
        },300)
    }
}
</script>

<style lang="scss">
#index{
    width:1000px;
    margin:20px auto;
    font-family:'microsoft YaHei';
    position: relative;

    .progress_wrap{
        width:100%;
        height:30px;
        margin:20px 0;
        position:relative;
        border-radius:10px;
        overflow:hidden;

        .progress{
            position:absolute;
            top:0;
            left:0;
            height:100%;
            line-height:30px;
            width:0%;
            transition:all 0.3s linear 0s;
            background-color:#666;
            color:#fff;
            text-align:center;
        }
    }

    .title{
        text-align:center;
        font-size:30px;
        letter-spacing: 20px;
        line-height: 50px;
    }
    .birth_date{

    }
}
.model_choice_date{
    position:absolute;
    top:0;
    left:0;
    width:100%;
    min-height:100%;
    padding:20px;
    box-sizing:border-box;
    background-color:rgba(255,255,255,0.9);
    text-align:center;
    border:1px solid #D3DCE6;
    .black_bg{
        width:100%;
        height:100%;
        position:absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        background-color: rgba(0,0,0,0.6);
        z-index:0;
    }
    .chiose_body{
        z-index:2;
        position:relative;
    }
    .chioce_text{
        text-align:center;
        font-size:30px;
        line-height: 60px;
        letter-spacing: 2px;
        margin-bottom:20px;
        color:#20A0FF;
    }
}
</style>
