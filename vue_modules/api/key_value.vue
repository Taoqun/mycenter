<template lang="html">
    <div class="header_data">
        <span class="control_edit" :class="{'check':!control_data_edit}" @click="change_data_edit">
            <i class="iconfont" :class='{"icon-unlock":!control_data_edit,"icon-lock":control_data_edit}'></i>
            {{control_data_str}}
        </span>
        <p class="title">{{title}}</p>
        <ul class="clearfix">
            <li v-for="item in keyvalue">
                <el-input class="input" v-model="item.key" :readonly="control_data_edit" placeholder="key"></el-input>
                <el-input class="input" v-model="item.value" :readonly="control_data_edit" placeholder="value"></el-input>
                <el-input class="input" v-model="item.dis" :readonly="control_data_edit" placeholder="描述"></el-input>
                <el-button v-show="!control_data_edit" @click="delItem(item)" type="danger" class="input" icon="close">删除</el-button>
            </li>
            <el-button v-show="!control_data_edit" @click="add_data" type="info" class="add_btn">增加</el-button>
        </ul>
    </div>
</template>
<script>
    export default {
        props:{
            title:{
                type:String,
                default:' ',
            },
            keyvalue:{
                type:Array,
                default:function(){
                    return [{
                            key:'',
                            value:'',
                            dis:''}]
                }
            }
        },
        data(){
            return {
                control_data_edit:true,
            }
        },
        computed:{
            control_data_str(){
                return (this.control_data_edit ? "编辑" : "预览")
            }
        },
        methods:{
            change_data_edit(){
                this.control_data_edit = !this.control_data_edit
            },
            delItem(item){
                this.keyvalue.splice( this.keyvalue.indexOf(item),1)
            },
            add_data(){
                if(this.keyvalue.length === 0 || this.keyvalue[this.keyvalue.length-1].key ){
                    let obj = {
                        key:'',
                        value:'',
                        dis:'',
                    }
                    this.keyvalue.push(obj)
                }else{
                    this.$message({
                        type:'error',
                        message:'请先填好上一条数据,key必填',
                        showClose:true,
                    })
                }
            }
        },
    }
</script>

<style lang="scss">
    .header_data{
        background-color:#fff;
        margin:20px;
        margin-top:40px;
        padding:20px;
        position:relative;
        li{
            display:flex;
        }
        .input{
            flex-grow:1;
            margin:10px 10px;
            i{
                font-size:12px;
                line-height:1em;
            }
            input{
                color:#8492A6;
                transition:all 0.3s ease-in 0s;
            }
            input:focus{
                color:#1F2D3D;
            }
        }
        .add_btn{
            float:right;
            margin-right:10px;
        }
        .control_edit,.title{
            position:absolute;
            top:-25px;
            height:25px;
            line-height:25px;
            padding: 0 10px;
            display:inline-block;
            text-align:center;
            color:#8492A6;
            background-color:#fff;
            border-bottom:1px solid #EFF2F7;
            border-top-left:5px;
            border-top-right:5px;
            transition:all 0.3s linear 0s;
            i{
                font-size:14px;
            }
        }
        .control_edit{
            right:0px;
            cursor:pointer;
        }
        .title{
            left:0;
            right:none;
        }
        .check{
            color:#FF4949;
        }
    }


</style>
