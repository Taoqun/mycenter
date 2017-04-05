<template lang="html">
    <div class="api_list">
        <h6>项目列表</h6>
        <ul>
            <li v-for="item in list">
                <p class="project_title">{{item.title}}</p>
                <p class="project_name">{{ item.name }}</p>
                <p class="in_project">
                    <el-button>进入项目</el-button>
                </p>
                <p class="control_btn">
                    <el-button class="update_project">修改</el-button>
                    <el-button class="delete_project">删除</el-button>
                </p>
            </li>
        </ul>
    </div>
</template>

<script>
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    Vue.use(ElementUI)
    export default {
        data(){
            return {
                list:[
                    {
                        name:"taoqun",
                        title:"test",
                    },
                    {
                        name:"taoqun",
                        title:"test",
                    },
                    {
                        name:"taoqun",
                        title:"test",
                    },
                    {
                        name:"taoqun",
                        title:"test",
                    },
                ]
            }
        }
    }
</script>

<style lang="scss">
    .api_list{
        width:1000px;
        margin:20px auto;
        ul{
            display:flex;
            flex-wrap:wrap;
            justify-content: center;
        }
        li{
            width:25%;
            margin:20px;
            padding:20px;
            box-sizing:border-box;
            text-align:center;
            border:1px solid #e8e8e8;
        }
        p{
            font-size:15px;
            line-height:2em;
        }
        .control_btn,.in_project{
            margin-top:20px;
        }
    }
</style>
