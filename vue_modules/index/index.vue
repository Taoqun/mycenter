<template lang="html">
    <div id="index">
        <h6 class="title">生辰 <p>彼得·潘</p> </h6>
        <div class="birth_text alive">
            <p>生之时</p>
            <p v-show="birth_date" class="birth_date">出生日期{{birth_date}}</p>
            <p>你已经 {{ your_age}} 岁了</p>
            <p>今年已经过去了 {{year_progress}}</p>
            <h5>在这个世界上，你已经存在了</h5>
            <ul>
                <li><p> {{ Math.round(your_age) }}年 </p></li>
                <li><p> {{your_month}}月 </p></li>
                <li><p> {{your_week}}周 </p></li>
                <li><p> {{your_day}}天 </p></li>
                <li><p> {{your_hours}}小时 </p></li>
                <li><p> {{your_minute}}分钟 </p></li>
            </ul>
        </div>

        <div class="death">

        </div>

        <div class="progress_wrap">
            <div class="progress" style="width:0%">{{ year_progress }}</div>
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
                birth_value:'',
                pickerOptions0:{
                    disabledDate(time) {
                        return time.getTime() > Date.now()
                    }
                },
                model_date:false,
                your_age:'',
                your_month:'',
                your_day:'',
                your_week:'',
                your_hours:'',
                your_minute:'',
                year_progress:'',
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
            },
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
            update_time(){
                let year_now = new Date() ,
                    birth_day = new Date("1993-12-03") ,
                    day = 1000 * 60 * 60 * 24 ,
                    week = day * 7 ,
                    hours = 1000 * 60 * 60 ,
                    minute = 1000 * 60 ;

                let year_start = year_now.getFullYear() +'-1-1' ,
                    year_end   = (year_now.getFullYear()+1) + '-1-1';

                    year_start = new Date(year_start)
                    year_end = new Date(year_end)

                let this_year =  year_end.valueOf() - year_start.valueOf()
                let month = this_year / 12

                    year_now = year_now.valueOf()
                    birth_day = birth_day.valueOf()

                // 今年过去的时间
                let how_time = year_now - year_start.valueOf()

                    this.your_age = ( (year_now - birth_day) / this_year ).toFixed(8)
                    this.your_month = Math.round( (year_now - birth_day) / month )
                    this.your_week = Math.round( (year_now - birth_day) / week )
                    this.your_day = Math.round( (year_now - birth_day) / day )
                    this.your_hours = Math.round( (year_now - birth_day) / hours )
                    this.your_minute = Math.round( (year_now - birth_day) / minute )
                    this.year_progress = ( ( how_time / this_year ) * 100  ).toFixed(6) + '%'

                    let ps = document.querySelector(".progress")
                    ps.style.width = this.year_progress
            },
        },
        mounted(){
            setInterval( () => {
                this.update_time()
            },1000)
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
                transition:all 1s linear 0s;
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
        .birth_text{
            padding:50px;
            p{
                font-size:20px;
                line-height:40px;
                text-align:center;
            }
            h5{
                font-size:20px;
                line-height:40px;
            }
            ul{
                display:flex;
                justify-content: space-between;
                flex-wrap:wrap;
                border-left:1px solid #999;
                border-top:1px solid #999;
            }
            li{
                width:30%;
                flex-grow:1;
                box-sizing: border-box;
                border:1px solid #999;
                border-left:none;
                border-top:none;
                p{
                    transition: all 0.3s linear 0s;
                    background-color: #fff;
                    cursor:pointer;
                }
                &:hover p{
                    background-color: #999;
                }
            }
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
    .run-enter-active,.run-leave-active{
        transition:all 0.5s linear 0s;
    }
    .run-enter,.run-leave-active{
        transform:translateY(100%)
    }
</style>
