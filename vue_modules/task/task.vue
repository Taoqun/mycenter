<template lang="html">
    <div class="task-center">
        <div class="list-group" @click="chooseList">
            <h3 class="title">任务夹</h3>
            <div class="list-ui-group" v-for="item in list_ui_group">
                <h6 class="group-name"><i class="icon iconfont  icon-file"></i>{{item.name}}</h6>
                <p class="list-name" v-for="li in item.task_list" data-id="li.id"><i class="icon iconfont icon-post"></i>{{li.name}}</p>
            </div>
            <p class="list-name"  v-for="item in list_group" :data-id="item.id"><i class="icon iconfont icon-edit"></i>{{item.name}}</p>
        </div>

        <div class="task-list">
            <h3 class="title">列表: 书单</h3>
            <div class="add-task">
                <input type="input" name="name" placeholder='添加任务至"书单"' v-model="add_task" @keyup.enter="addTask">
            </div>
            <div class="task-list-show task-list-no">
                <h3 class="task-list-show-name"><i class="el-icon-arrow-down"></i>待完成</h3>
                <ul>
                    <li v-for="item in no_List"><input type="text" name="" v-model="item.name"></li>
                </ul>
            </div>
            <div class="task-list-show task-list-off">
                <h3 class="task-list-show-name"><i class="el-icon-arrow-down"></i>已完成</h3>
                <ul>
                    <li v-for="item in off_list"><input type="text" name="" v-model="item.name"></li>
                </ul>
            </div>
        </div>

        <div class="task-discription">

            <h3 class="title">任务描述</h3>

            <div class="task-li-name">
                <input type="text" value="" placeholder="任务名称">
            </div>

            <div class="task-li-discription">
                <textarea placeholder="任务描述"></textarea>
            </div>

        </div>

    </div>
</template>

<script>
    import "CSS/element.css"
    import 'CSS/ali/iconfont.css'
    export default {
        data(){
            return{
                list_group:[
                    {name:"菜单",type:"list",id:123},
                    {name:"菜单",type:"list",id:123},
                    {name:"菜单",type:"list",id:123},
                    {name:"菜单",type:"list",id:123},
                ],
                list_ui_group:[
                    {
                        name:"书单1",
                        type:"group",
                        name_id:123,
                        task_list:[
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                        ]
                    },
                    {
                        name:"书单2",
                        type:"group",
                        name_id:123,
                        task_list:[
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                            {name:"菜单",id:123},
                        ]
                    }
                ],
                task_list:[
                    {
                        name:'2222',
                        IsCompalte:false,
                        id:123,
                        discription:'aaaaaaaaaaa',
                    },
                    {
                        name:'2222',
                        IsCompalte:false,
                        id:123,
                        discription:'aaaaaaaaaaa',
                    },
                    {
                        name:'2222',
                        IsCompalte:false,
                        id:123,
                        discription:'aaaaaaaaaaa',
                    },
                    {
                        name:'2222',
                        IsCompalte:false,
                        id:123,
                        discription:'aaaaaaaaaaa',
                    },
                    {
                        name:'2222',
                        IsCompalte:true,
                        id:123,
                        discription:'aaaaaaaaaaa',
                    }
                ],
                choose_list:'',
                add_task:'',
            }
        },
        computed:{
            no_List(){
                let list = []
                this.task_list.map( (i)=>{
                    if(!i.IsCompalte){
                        list.push(i)
                    }
                } )
                return list
            },
            off_list(){
                let list = []
                this.task_list.map( (i)=>{
                    if(i.IsCompalte){
                        list.push(i)
                    }
                } )
                return list
            },
        },
        methods:{
            chooseList(event){
                let the = event.target
                let tagName = the.tagName.toLowerCase()
                if(tagName === 'p' ){
                    if(this.choose_list){
                        this.choose_list.className = this.choose_list.className.replace('active','').trim()
                    }
                    this.choose_list = the
                    this.choose_list.className += ' active'
                }
                if(tagName === 'h6'){
                    let group = the.parentNode
                    if( group.className.indexOf('close') != -1 ){
                        group.style.height = group.dataset.height
                        group.className = group.className.replace('close','').trim()
                        return;
                    }
                    group.style.height = group.dataset.height = group.clientHeight + 'px'

                    setTimeout(()=>{
                        group.style.height="40px"
                        group.className += ' close'
                    },0)
                }
            },
            addTask(event){
                this.task_list.push({
                    name:this.add_task,
                    IsCompalte:false,
                    id:'',
                    discription:'',
                })
                this.add_task = ''
            }
        },
    }
</script>

<style lang="scss">
    body{
        background-color:#F9FAFC;
    }
    // 调整head样式
    .head{
        display:none;
        padding:0;
        h1{
            margin-top:0;
            margin-bottom:10px;
            padding-top:10px;
        }
    }
    html,body,#app,#app > div,.task-center{
        width:100%;
        height:100%;
        overflow:hidden;
        box-sizing:border-box;
    }
    .task-center{
        margin:0 auto 0;
        display:flex;
        background-color:#EFF2F7;
        align-items: stretch;
        & > div{
            flex-grow:1;
            height:100%;
            box-sizing:border-box;
            padding-bottom:30px;
        }
        .title{
            line-height:20px;
            padding:10px 0 ;
            background-color:#324057;
            text-indent:20px;
            transition:all 0.2s linear 0s;
            color:#fff;
            border-right:1px solid #333;
            box-sizing:border-box;
            &:hover{
                background-color:#475669;
            }
        }
        .list-group{
            flex-grow:0;
            width:250px;
            background-color:#313643;
            color:#fff;
            .icon{
                margin-right:10px;
                display:inline-block;
            }
            .group-name,.list-name{
                line-height:20px;
                padding:10px 20px;
                overflow:hidden;
                text-overflow:ellipsis;
                white-space:nowrap;
                cursor:pointer;
                transition:all 0.2s linear 0s;
                border-bottom:1px solid #1F2D3D;
                &:hover{
                    background-color:#324057;
                }
            }
            .active{
                background-color:#475669;
            }
            .list-ui-group{
                border-bottom:1px solid #1F2D3D;
                overflow:hidden;
                transition:all 0.5s ease-in-out 0s;
                .list-name{
                    padding-left:40px;
                    border-bottom:0px solid #1F2D3D;
                }

            }
        }
        .task-list{
            background-color:#F9FAFC;
            color:#1F2D3D;
            .add-task{
                margin:10px 20px;
                input{
                    width:100%;
                    height:50px;
                    line-height:50px;
                    padding:10px;
                    margin:0px 0px;
                    border:1px solid #E5E9F2;
                    border-radius:5px;
                    font-size:15px;
                    color:#324057;
                    box-sizing:border-box;
                }
            }
            .task-list-show{
                margin:0 20px;
                .task-list-show-name{
                    font-size:14px;
                    line-height:40px;
                    padding:0 20px;
                    margin:10px 0;
                    border-bottom:1px solid #D3DCE6;
                    border-top:1px solid #D3DCE6;
                    color:#475669;
                    i{
                        margin-right:5px;
                    }
                }
                li{
                    height:40px;
                    margin:0 20px;
                    font-size:12px;
                    line-height:30px;
                    box-sizing:border-box;
                    border-bottom:1px solid #EFF2F7;
                    input{
                        width:100%;
                        height:100%;
                        padding:0;
                        margin:0;
                        outline:0;
                        border:none;
                        padding:5px 20px;
                        line-height:30px;
                        font-size:13px;
                        box-sizing:border-box;
                        background-color:transparent;
                    }
                    &:hover{
                        background-color:#EFF2F7;
                    }
                }
            }
        }
        .task-discription{
            display:flex;
            flex-direction:column;
            .task-li-name{
                margin:10px 20px;
                input{
                    width:100%;
                    height:50px;
                    border:none;
                    padding:0 20px;
                    font-size:14px;
                    box-sizing:border-box;
                }
            }
            .task-li-discription{
                margin:10px 20px 0;
                flex-grow:1;
                display:flex;
                flex-direction: column;
                textarea{
                    flex-grow:1;
                    width:100%;
                    height:100%;
                    border:none;
                    font-size:15px;
                    padding:20px;
                    box-sizing:border-box;
                }
            }
        }
    }
</style>
