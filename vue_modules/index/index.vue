<template lang="html">
    <div id="index">
        <h6 class="title">生辰 <p>彼得·潘</p> </h6>
        <div class="birth_text alive">
            <p>生之时</p>
            <p v-show="birth_date" class="birth_date">出生日期 {{birth_date}}</p>
            <p>你已经 {{ your_age}} 岁了</p>
            <p>今年已经过去了 {{year_progress}}</p>
            <div class="progress_wrap">
                <div class="progress" style="width:0%">{{ year_progress }}</div>
            </div>
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

        <div class="birth_text death">
            <p>死之钟</p>
            <p v-show="birth_date" class="birth_date">死亡日期 {{birth_date}}</p>
            <p>你的生命已经过去了 {{ your_age}}</p>
            <div class="progress_wrap">
                <div class="progress" style="width:0%">{{ year_progress }}</div>
            </div>
            <h5>剩下的日子里，你大约可以</h5>
            <ul>
                <li><p> 吃84105次饭 </p></li>
                <li><p> 做2210次爱 </p></li>
                <li><p> 度过4005次周末 </p></li>
                <li><p> 享受152个长假 </p></li>
            </ul>
        </div>

        <div class="model_choice_date" v-show="model_date">
            <div class="black_bg"> </div>
            <div class="chiose_body">
                <p class="chioce_text">选择你的出生日期</p>
                <el-date-picker
                  v-model="birth_value"
                  type="date"
                  placeholder="选择日期"
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
    import {ajax , gotologin} from 'JS/ajax.js'
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
                your_birth_day:'',
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
                if(this.your_birth_day){
                    let year = this.your_birth_day.getFullYear()
                    let month = this.your_birth_day.getMonth() + 1
                    let day = this.your_birth_day.getDate()
                    str = year + '-' + month + '-' + day
                }
                return str
            },
        },
        methods:{
            contime(){
                console.log( this.birth_value )
            },
            close_date_model(){
                console.log( this.birth_value )
                if(!this.birth_value){
                    this.$alert('请选择您的出生日期', '选择日期', {
                      confirmButtonText: '确定',
                   })
                }else{
                    console.log( this.birth_value )
                    ajax({
                      url:'/birth/setbirth',
                      method:'post',
                      data:{birth_day: this.birth_value.valueOf() }
                  }).then( (data) => {
                        if(data.code){
                            this.your_birth_day = this.birth_value
                            setInterval( () => {
                                this.update_time()
                            },1000)
                            this.model_date = false
                        }
                    } )
                }
            },
            update_time(){
                let year_now = new Date() ,
                    birth_day = this.your_birth_day,
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

                    let ps = document.querySelectorAll(".progress")
                    ps[0].style.width = this.year_progress
                    ps[1].style.width = this.year_progress
            },
        },
        mounted(){
            ajax({
                url:'/birth/getbirth',
                method:'get',
            }).then( (data) => {
                gotologin(data)
                if(data.birth_day){
                    this.your_birth_day = new Date(data.birth_day)
                    this.update_time()
                    setInterval( () => {
                        this.update_time()
                    },1000)
                }else{
                    this.model_date = true
                }
            } )
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
            border:1px solid rgba(0,0,0,0.1);

            .progress{
                position:absolute;
                top:0;
                left:0;
                height:100%;
                line-height:30px;
                width:0%;
                transition:all 1s linear 0s;
                background-color:#324057;
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
            .birth_date{
                opacity:0.5;
                font-size:12px;
                line-height:12px;
                display: none;
            }
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
                border-left:1px solid #1F2D3D;
                border-top:1px solid #1F2D3D;
            }
            li{
                width:30%;
                flex-grow:1;
                box-sizing: border-box;
                border:1px solid #1F2D3D;
                border-left:none;
                border-top:none;
                p{
                    transition: background-color 0.6s ease-in-out 0s,color 0.5s ease-in-out 0s;
                    background-color: #fff;
                    cursor:pointer;
                }
                &:hover p{
                    background-color: #1F2D3D;
                    color:#F9FAFC;
                }
            }
        }
        .alive{
            color:#1F2D3D;
            background-color: #F9FAFC;
        }
        .death{
            color:#F9FAFC;
            background-color: #1F2D3D;
            .progress_wrap{
                border:1px solid rgba(255,255,255,0.5);
                .progress{
                    background-color: #324057;
                    color:#8492A6;
                }
            }

            ul{
                border-color:#475669;
            }
            li{
                width:50%;
                border-color:#475669;
                p{
                    background-color: #1F2D3D;
                    color:#475669;
                }
                &:hover p{
                    background-color: #324057;
                    color:#8492A6;
                }
            }
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
    @media screen and (max-width:1000px){
        #index{
            width:100%;
        }
    }
</style>
