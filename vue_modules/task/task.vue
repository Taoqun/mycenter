<template lang="html">
    <div class="task-center">
        <div class="list-group" @click="chooseList">
            <div class="user-info">
                <div class="img" @click.stop="showDropList">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=950162565,3259577602&fm=21&gp=0.jpg" alt="" width=50 height=50>
                </div>
                <p class="name" @click.stop="showDropList">taoqun</p>
                <s-drop-menu :list="drop_list" :show="drop_list_show"></s-drop-menu>
            </div>
            <h3 class="title">任务夹</h3>
            <p class="list-menu"><i class="icon iconfont icon-form_light"></i>所有任务</p>
            <p class="list-menu"><i class="icon el-icon-date"></i>日历</p>
            <p class="list-menu"><i class="icon iconfont icon-punch_light"></i>收集箱</p>
            <p class="list-menu" @click="chooceAddType"><i class="icon iconfont icon-add"></i>新建</p>

            <s-list-group :list="list_ui_group" :groupmore="groupMore" :listmore="listMore"></s-list-group>
            <s-list-name  :list="list_group" :listmore="listMore"></s-list-name>
        </div>

        <div class="task-list">
            <h3 class="title">列表: 书单</h3>
            <div class="add-task">
                <input type="input" name="name" placeholder='添加任务至"书单"' v-model="add_task" @keyup.enter="addTask">
            </div>
            <div class="task-list-show task-list-no">
                <h3 class="task-list-show-name" @click="closeTaskList"><i class="el-icon-arrow-down"></i>待完成</h3>
                    <transition-group name="leave-arr" tag="ul">
                    <li v-for="item in no_List" :key="item.id">
                        <i class="iconfont icon-square" @click.stop="item.IsCompalte = !item.IsCompalte"></i>
                        <input type="text" name="" @click.stop="setdis(item)" v-model="item.name">
                        <i class="iconfont icon-delete_light" @click="delTask(item)"></i>
                    </li>
                    </transition-group>
            </div>
            <div class="task-list-show task-list-off">
                <h3 class="task-list-show-name" @click="closeTaskList"><i class="el-icon-arrow-down"></i>已完成</h3>
                    <transition-group name="leave-arr" tag="ul">
                    <li v-for="item in off_list" :key="item.id">
                        <i class="iconfont icon-squarecheck" @click.stop="item.IsCompalte = !item.IsCompalte"></i>
                        <input type="text" name="" @click.stop="setdis(item)" v-model="item.name">
                        <i class="iconfont icon-delete_light" @click="delTask(item)"></i>
                    </li>
                    </transition-group>
            </div>
        </div>

        <div class="task-discription" @click.stop="stopEvent">
            <h3 class="title">任务描述</h3>
            <div class="task-li-name">
                <input type="text" value="" placeholder="任务名称" v-model="task_dis.name">
            </div>
            <div class="task-li-discription">
                <textarea placeholder="任务描述" v-model="task_dis.dis"></textarea>
            </div>
        </div>

        <el-dialog title="请选择" v-model="dialogVisible" size="tiny">
            <el-radio-group v-model="addType">
                <el-radio-button label="文件夹"></el-radio-button>
                <el-radio-button label="清单"></el-radio-button>
             </el-radio-group>
           <div class="dialog-input">
               <p>请输入{{addType}}名称:</p>
               <el-input v-model="add_list_name" placeholder="请输入名称"></el-input>
           </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="showAddListInput">确 定</el-button>
          </span>
        </el-dialog>

        <el-dialog title="请输入清单名称！" v-model="add_list_obj.show" size="tiny">

           <div class="dialog-input" style="margin:5px 0;">
               <el-input v-model="add_list_obj.str" placeholder="请输入名称"></el-input>
           </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="add_list_obj.show = false">取 消</el-button>
            <el-button type="primary" @click="addListName">确 定</el-button>
          </span>
        </el-dialog>

    </div>
</template>

<script>
    import "CSS/element.css"
    import 'CSS/ali/iconfont.css'
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import dropMenu from 'VUEMODULES/common/drop-down'
    import {ajax} from 'JS/ajax.js'
    import { MessageBox } from 'element-ui';
    import s_list_name from './list-name.vue'
    import s_list_group from './list-group.vue'
    Vue.use(ElementUI)
    export default {
        components:{
            "s-drop-menu":dropMenu,
            's-list-name':s_list_name,
            's-list-group':s_list_group,
        },
        data(){
            return{
                drop_list:[
                    {name:'同步',event:this.stopEvent},
                    {name:'设置',event:this.stopEvent},
                    {name:'首页',event:this.stopEvent},
                    {name:'退出',event:this.stopEvent},
                ],
                drop_list_show:false,
                list_group:[
                    {name:"这里是菜单",type:"list",id:123,moreMenu:false},
                ],
                list_ui_group:[
                    {
                        name:"这里是文件夹",
                        type:"group",
                        group_id:'123456789',
                        name_id:123,
                        moreMenu:false,
                        task_list:[
                            {name:"菜单1",type:'list',group_id:'123456789',id:123,moreMenu:false},
                            {name:"菜单2",type:'list',group_id:'123456789',id:123,moreMenu:false,},
                            {name:"菜单3",type:'list',group_id:'123456789',id:123,moreMenu:false,},
                            {name:"菜单4",type:'list',group_id:'123456789',id:123,moreMenu:false,},
                        ]
                    },
                ],
                task_list:[
                    {
                        name:'已完成的任务会在这里显示',
                        IsCompalte:true,
                        id:2,
                        dis:'已完成的任务会在这里显示',
                    },
                    {
                        name:'取消勾选，可回退至待完成',
                        IsCompalte:true,
                        id:2,
                        dis:'取消勾选，可回退至待完成',
                    },
                    {
                        name:'是不是很赞',
                        IsCompalte:true,
                        id:2,
                        dis:'是不是很赞',
                    },
                    {
                        name:'回车添加任务',
                        IsCompalte:false,
                        id:4,
                        dis:'回车添加任务',
                    },
                    {
                        name:'点击查看任务详情',
                        IsCompalte:false,
                        id:5,
                        dis:'点击查看任务详情',
                    },
                    {
                        name:'勾选完成任务',
                        IsCompalte:false,
                        id:6,
                        dis:'勾选完成任务',
                    },
                ],
                choose_list:'',
                add_task:'',
                task_dis:{
                    name:'',
                    dis:'',
                },
                dialogVisible:false,
                addType:'清单',
                listOptions:[
                    {
                        label:'文件夹',
                        value:'1'
                    },
                    {
                        label:'清单',
                        value:'2'
                    },
                ],
                add_list_name:'',
                groupMore:[
                    {name:'添加',event:this.addList},
                    {name:'重命名',event:this.updateGroup},
                    {name:'删除',event:this.delGroup},
                ],
                listMore:[
                    {name:'重命名',event:this.updateList},
                    {name:'删除',event:this.delList},
                ],
                add_list_obj:{
                    show:false,
                    str:'',
                    tips:'',
                    item:'',
                },
            }
        },
        computed:{
            no_List(){
                let list = []
                this.task_list.map( (i)=>{
                    if(!i.IsCompalte){
                        list.push(i)
                    }
                })

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
                let clsName = the.className
                if(tagName === 'p' && clsName.indexOf('list-name') != -1 ){
                    if(this.choose_list){
                        this.choose_list.className = this.choose_list.className.replace('active','').trim()
                    }
                    this.choose_list = the
                    this.choose_list.className += ' active'
                }
                if(tagName === 'h6' && clsName.indexOf('group-name') != -1 ){
                    let parent = the.parentNode
                    let list = parent.querySelector('.ui_group_list_group')
                        if(list.dataset.show === 'false'){
                            list.style.height = list.dataset.height
                            list.dataset.show = 'true'
                            setTimeout(()=>{
                                list.style.height = 'auto'
                                list.style.overflow = 'visible'
                            },500)
                            return
                        }
                        list.style.height = list.dataset.height = list.offsetHeight + 'px'
                        list.style.overflow = 'hidden'
                        setTimeout(()=>{
                            list.style.height="0px"
                            list.dataset.show = 'false'
                        },0)
                }
            },
            addTask(event){
                if(this.add_task){
                    this.task_list.unshift({
                        name:this.add_task,
                        IsCompalte:false,
                        id:'',
                        discription:'',
                        date:Date.now()
                    })
                    let ui = document.querySelector('.task-list-no ul')
                        ui.style.height = 'auto'
                        ui.dataset.show = 'true'
                    let i = document.querySelector('.task-list-no h3 i')
                        i.className = 'el-icon-arrow-down'
                }
                this.add_task = ''
            },
            updateList(item,list){
                this.$prompt('请输入新名称',item.name,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    if(value){
                        let check = true
                        list.map((i)=>{
                            if( i.name == value){
                                check = false
                            }
                        })
                        if(check){
                            item.name = value
                        }else{
                            this.$message({
                                message:'清单名称已存在!',
                                type:'error'
                            })
                        }
                    }
                })
            },
            updateGroup(item,list){
                this.$prompt('请输入新名称',item.name,{
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({value})=>{
                    if(value){
                        console.log(value)
                        console.log(list)
                        let check = true
                        list.map((i)=>{
                            if( i.name == value){
                                check = false
                            }
                        })
                        if(check){
                            item.name = value
                        }else{
                            this.$message({
                                message:'清单名称已存在!',
                                type:'error'
                            })
                        }
                    }
                })
            },
            delTask(item){
                this.task_list.splice( this.task_list.indexOf(item),1 )
            },
            delGroup(item){
                this.list_ui_group.splice( this.list_ui_group.indexOf(item),1 )
            },
            delList(item){
                if(item.group_id){
                    this.list_ui_group.map((i)=>{
                        if(i.group_id === item.group_id){
                            i.task_list.splice( i.task_list.indexOf(item),1 )
                        }
                    })
                }else{
                    this.list_group.splice( this.list_group.indexOf(item),1 )
                }
            },
            chooceAddType(){
                this.dialogVisible = true
            },
            showAddListInput(){
                console.log( this.addType )
                if( this.add_list_name ){

                    if(this.addType == '文件夹'){
                        let check = true
                        this.list_ui_group.map((i)=>{
                            if(i.name === this.add_list_name ){
                                check = false
                            }
                        })
                        if(check){
                            this.dialogVisible = false
                            this.list_ui_group.unshift( {name:this.add_list_name,type:'group',group_id:Date.now().toString(),moreMenu:false,name_id:Date.now(),task_list:[]} )
                            this.$message({
                                message:'文件夹添加成功!',
                                type:'success'
                            })
                        }else{
                            this.$message('文件夹名称已存在！');
                            return
                        }
                    }else if(this.addType == '清单'){
                        let check = true
                        this.list_group.map((i)=>{
                            if( i.name === this.add_list_name ){
                                check = false
                            }
                        })
                        if(check){
                            this.dialogVisible = false
                            this.list_group.unshift( {name:this.add_list_name,group_id:'all',type:'list',moreMenu:false,id:Date.now()} )
                            this.$message({
                                message:'清单添加成功!',
                                type:'success'
                            })
                        }else{
                            this.$message('清单名称已存在！')
                            return
                        }
                    }
                }else{
                    this.$message('请输入清单名称')
                }
                this.add_list_name = ''
            },
            addList(item){
                this.add_list_obj.show = true
                this.add_list_obj.item = item
                this.add_list_obj.str = ''
            },
            addListName(){
                let check = true
                this.add_list_obj.item.task_list.map((i)=>{
                    if(i.name == this.add_list_obj.str){
                        check = false
                    }
                })
                if(check){
                    let item = this.add_list_obj.item

                    item.task_list.unshift({
                        name:this.add_list_obj.str,
                        group_id:item.group_id,
                        type:'list',
                        moreMenu:false,
                        date:Date.now(),
                        id:Date.now(),
                    })
                    this.add_list_obj.str = ''
                    this.add_list_obj.show = false
                    this.$message({
                        message:'添加成功!',
                        type:'success'
                    })
                }else{
                    this.$message({
                        message:'清单名称已存在!',
                        type:'error'
                    })
                }
            },
            closeTaskList(event){
                let the = event.target
                let tagName = the.tagName.toLowerCase()
                let clsname = the.className
                if( tagName === 'h3' && clsname.indexOf('task-list-show-name') != -1 ){
                    let ui = the.nextElementSibling
                    if( ui.dataset.show === 'false'  ){
                        ui.style.height = ui.dataset.height
                        setTimeout(()=>{
                            the.querySelector('i').className = 'el-icon-arrow-down'
                        },500)
                        ui.dataset.show = 'true'
                        return
                    }
                    ui.style.height = ui.dataset.height = ui.clientHeight + 'px'
                    setTimeout(()=>{
                        ui.style.height = '0px'
                        setTimeout(()=>{
                            the.querySelector('i').className = 'el-icon-arrow-right'
                        },500)
                        ui.dataset.show = 'false'
                    },0)
                }
            },
            stopEvent(){
                console.log(1)
            },
            showDropList(){
                this.drop_list_show = !this.drop_list_show
            },
            setdis(item){
                this.task_dis = item
            },
        },
        mounted(){
            document.addEventListener('click',()=>{
                this.drop_list_show = false
                this.task_dis = {}

                this.list_ui_group.map((i)=>{
                    i.moreMenu = false
                    i.task_list.map((j)=>{
                        j.moreMenu = false
                    })
                })
                this.list_group.map((i)=>{
                    i.moreMenu = false
                })
            })

            // ajax({
            //     url:"/task/create",
            //     method:"post",
            //     data:{
            //         name:'taoqun',
            //         dis:'',
            //         task_list_id:'hahaha',
            //         task_id:Date.now().toString(),
            //         IsCompalte:false,
            //         create_date:Date.now()
            //     },
            // }).then((res)=>{
            //     console.log(res)
            // },(res)=>{
            //     console.log(res)
            // })
        }
    }
</script>

<style lang="scss">
    body{
        background-color:#F9FAFC;
        font-family:'microsoft Yahei';
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
    .dialog-input{
        margin:20px 0 0;
        width:217px;
        p{
            line-height:25px;
            font-size:14px;
        }
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
        }
        .title{
            line-height:20px;
            padding:10px 0 ;
            background-color:#324057;
            text-indent:20px;
            transition:all 0.2s linear 0s;
            color:#fff;
            box-sizing:border-box;
            &:hover{
                background-color:#475669;
            }
        }
        .list-group,.task-list,.list-discription{
            overflow:hidden;
        }
        .list-group{
            flex-grow:0;
            width:250px;
            overflow-y: auto;
            margin-right:-17px;
            background-color:#313643;
            color:#fff;
            overflow:hidden;
            .title{
                font-size:15px;
                color:#ccc;
            }
            .title:hover{
                color:#fff;
            }
            .icon{
                margin-right:10px;
                display:inline-block;
            }
            .user-info{
                position:relative;
                padding:10px;
                box-sizing: border-box;
                margin-right:17px;
                .img{
                    display:inline-block;
                    vertical-align:middle;
                    width:50px;
                    height:50px;
                    font-size:0px;
                    overflow:hidden;
                    cursor:pointer;
                    border-radius:50%;
                    img{
                        width:100%;
                        height:100%;
                    }
                }
                .name{
                    display:inline-block;
                    vertical-align: middle;
                    height:50px;
                    line-height:50px;
                    overflow:hidden;
                    text-overflow:ellipsis;
                    white-space: nowrap;
                    letter-spacing: 1px;
                    padding-left:10px;
                    font-size:16px;
                    cursor:pointer;
                }
            }
            .list-menu{
                margin-right:17px;
                line-height:20px;
                padding:10px 0px;
                text-overflow:ellipsis;
                white-space:nowrap;
                cursor:pointer;
                transition:all 0.2s linear 0s;
                border-bottom:1px solid #1F2D3D;
                color:#ccc;
                font-size:15px;
                box-sizing: border-box;
                position:relative;
                &:hover{
                    background-color:#324057;
                    color:#fff;
                }
                .icon{
                    margin-left:15px;
                }
                .more{
                    float:right;
                    margin-right:10px;
                    opacity:0.2;
                }

                &:hover .more{
                    opacity:1;
                }
            }
            .active{
                background-color:#475669;
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
                    font-weight:normal;
                    letter-spacing: 2px;
                    line-height:40px;
                    padding:0 20px;
                    margin:10px 0;
                    border-top:1px solid #D3DCE6;
                    color:#475669;
                    cursor:pointer;
                    transition:all 0.5s linear 0s;
                    &:hover{
                        letter-spacing: 0px;
                    }
                    i{
                        margin-right:5px;
                    }
                }
                ul{
                    transition:all 0.5s ease-in-out 0s;
                    border-bottom:1px solid #D3DCE6;
                    box-sizing:border-box;
                    overflow:hidden;
                }
                li{
                    height:40px;
                    margin:0 20px;
                    font-size:12px;
                    line-height:30px;
                    box-sizing:border-box;
                    border-bottom:1px solid #EFF2F7;
                    display:flex;
                    transition:all 0.5s ease-in 0s;
                    i{
                        font-size:15px;
                        height:40px;
                        width:40px;
                        text-align:center;
                        line-height:40px;
                    }
                    input{
                        flex-grow:1;
                        width:100%;
                        height:100%;
                        overflow:hidden;
                        padding:0;
                        margin:0;
                        outline:0;
                        border:none;
                        padding:0px 0px;
                        line-height:40px;
                        font-size:13px;
                        box-sizing:border-box;
                        background-color:transparent;
                        cursor:pointer;
                    }
                    &:hover{
                        background-color:#EFF2F7;
                    }
                }
            }
            .task-list-off{
                li input,li .iconfont,.task-list-show-name{
                    color:#ccc;
                }
            }
        }
        .task-discription{
            display:flex;
            flex-direction:column;

            .task-li-name{
                border-left:1px solid #D3DCE6;
                border-bottom:1px solid #D3DCE6;
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
                border-left:1px solid #D3DCE6;
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

    @media screen and (max-width:900px){
        #app .task-center .task-discription{
            display:none;
        }
    }
    @media screen and (max-width:600px){
        #app .task-center .list-group{
            display:none;
        }
    }
    .leave-arr-enter,.leave-arr-active{
        opacity: 0;
        transform: translateX(100%);
    }
    .leave-arr-leave-active{
        opacity:0;
        transform: translateX(100%);
    }
</style>
