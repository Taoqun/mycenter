<template lang="html">
    <div class="task-center">
        <div class="list-group" @click="chooseList">
            <div class="user-info">
                <div class="img" @click.stop="showDropList">
                    <img src="https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=950162565,3259577602&fm=21&gp=0.jpg" alt="" width=50 height=50>
                </div>
                <p class="name" @click.stop="showDropList">{{user_info.name}}</p>
                <s-drop-menu :list="drop_list" :show="drop_list_show"></s-drop-menu>
            </div>
            <h3 class="title">任务夹</h3>
            <p class="list-menu" @click="getAllTask" data-listid='all'><i class="icon iconfont icon-form_light"></i>所有任务</p>
            <p class="list-menu" @click="NoFn"><i class="icon el-icon-date"></i>日历</p>
            <!-- <p class="list-menu" @click="getAllTask" data-listid='all'><i class="icon iconfont icon-punch_light"></i>收集箱</p> -->
            <p class="list-menu" @click="chooceAddType"><i class="icon iconfont icon-add"></i>新建</p>

            <s-list-group :list="list_ui_group" :groupmore="groupMore" :listmore="listMore" :tasklist="task_list" :listname="task_list_name"></s-list-group>
            <s-list-name  :list="list_group" :listmore="listMore" :tasklist="task_list" :listname="task_list_name"></s-list-name>
        </div>

        <div class="task-list">
            <h3 class="title">{{task_list_name.name}}</h3>
            <div class="add-task">
                <input type="input" name="name" :placeholder=' " 添加任务至  " + task_list_name.name ' v-model="add_task" @keyup.enter="addTask">
            </div>
            <div class="task-list-show task-list-no">
                <h3 class="task-list-show-name" v-show="no_List.length" @click="closeTaskList"><i class="el-icon-arrow-down"></i>待完成</h3>
                    <ul>
                    <li v-for="item in no_List" :key="item.id" data-list-id="item.list_id">
                        <i class="iconfont icon-square" @click.stop="changeComplate(item)"></i>
                        <input type="text" name="" @click.stop="setdis(item)" v-model="item.name" @change="updateTask">
                        <i class="iconfont icon-delete_light" @click="delTask(item)"></i>
                    </li>
                    </ul>
            </div>
            <div class="task-list-show task-list-off">
                <h3 class="task-list-show-name" v-show="off_list.length" @click="closeTaskList"><i class="el-icon-arrow-down"></i>已完成</h3>
                    <ul>
                    <li v-for="item in off_list" :key="item.id">
                        <i class="iconfont icon-squarecheck" @click.stop="changeComplate(item)"></i>
                        <input type="text" name="" @click.stop="setdis(item)" v-model="item.name">
                        <i class="iconfont icon-delete_light" @click="delTask(item)"></i>
                    </li>
                    </ul>
            </div>
        </div>

        <div class="task-discription" @click.stop="stopEvent">
            <h3 class="title">任务描述</h3>
            <div class="task-li-name">
                <input type="text" value="" placeholder="任务名称" v-model="task_dis.name" @change="updateTask">
            </div>
            <div class="task-li-discription">
                <textarea placeholder="任务描述" v-model="task_dis.dis" @keyup="updateTask" ></textarea>
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
    // import "CSS/element.css"
    import 'CSS/ali/iconfont.css'
    import Vue from 'vue'
    import ElementUI from 'element-ui'
    import dropMenu from 'VUEMODULES/common/drop-down'
    import {ajax,gotologin} from 'JS/ajax.js'
    import { MessageBox , Loading  } from 'element-ui';
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
                    // {name:'同步',event:this.stopEvent},
                    {name:'首页',event:this.gotoIndex},
                    {name:'设置',event:this.gotoSetting},
                    {name:'退出',event:this.exitAccount},
                ],
                user_info:{
                    name:'',
                    account:'',
                },
                task_list_name:{name:'所有任务'},
                drop_list_show:false,
                list_group:[],
                list_ui_group:[],
                task_list:{tasklist:[],list_id:'all'},
                choose_list:'',
                add_task:'',
                task_dis:{
                    name:'',
                    dis:'',
                    id:''
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
                this.task_list['tasklist'].map( (i)=>{
                    if(!i.IsComplete){
                        list.push(i)
                    }
                })
                return list
            },
            off_list(){
                let list = []
                this.task_list['tasklist'].map( (i)=>{
                    if(i.IsComplete){
                        list.push(i)
                    }
                })
                return list
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

            let loadscreen = Loading.service({ fullscreen: true , text:'获取数据中！' })

            ajax({
                url:'/task/getList',
                method:'get',
            }).then((data)=>{
                if( gotologin(data) ){
                    return
                }
                this.list_ui_group = data.group_arr
                this.list_group = data.list_arr
                this.user_info.name = data.name
                this.user_info.account = data.account

                this.list_ui_group.map( (i)=>{
                    let arr = []
                    this.list_group.map( (j)=>{
                        if(i.group_id === j.group_id){
                            i.task_list.push(j)
                            arr.push(j)
                        }
                    })
                    arr.map((k)=>{
                        this.list_group.splice( this.list_group.indexOf(k),1 )
                    })
                })
                setTimeout(()=>{
                    loadscreen.close()
                    this.$message({message:'数据获取完毕！',type:'success'});
                    this.getAllTask()
                },500)

            })
        },
        created(){
            this.list_ui_group = []
            this.list_group = []
        },
        methods:{
            chooseList(event){
                let the = event.target
                let tagName = the.tagName.toLowerCase()
                let clsName = the.className
                if( tagName === 'p' && clsName.indexOf('list-name') != -1 ){
                    if(this.choose_list){
                        this.choose_list.className = this.choose_list.className.replace('active','').trim()
                    }
                    this.choose_list = the
                    this.choose_list.className += ' active'
                }
                if( tagName === 'h6' && clsName.indexOf('group-name') != -1 ){
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
                    let obj = {
                        name:this.add_task,
                        IsComplete:false,
                        id:parseInt( Date.now() ).toString() + Math.random().toString(36).substr(2),
                        list_id:this.task_list['list_id'],
                        dis:'',
                        date:Date.now()
                    }

                    this.task_list['tasklist'].unshift(obj)
                    let ui = document.querySelector('.task-list-no ul')
                        ui.style.height = 'auto'
                        ui.dataset.show = 'true'
                    let i = document.querySelector('.task-list-no h3 i')
                        i.className = 'el-icon-arrow-down'

                    ajax({
                        method:'post',
                        url:"/task/createTask",
                        data:{ obj: JSON.stringify( obj )  }
                    }).then((data)=>{
                    })
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
                            ajax({
                                url:'/task/updateList',
                                method:'post',
                                data:{list: JSON.stringify(item)}
                            }).then((data)=>{
                                if(data.code){
                                    this.$message({
                                        message:'保存成功!',
                                        type:'success'
                                    })
                                }else{
                                    this.$message({
                                        message:'保存失败!',
                                        type:'error'
                                    })
                                }
                            })
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
                        let check = true
                        list.map((i)=>{
                            if( i.name == value){
                                check = false
                            }
                        })
                        if(check){
                            item.name = value
                            ajax({
                                url:'/task/updateGroup',
                                method:'post',
                                data:{list : JSON.stringify(item)}
                            }).then( (data)=>{
                                if(data.code){
                                    this.$message({
                                        message:'保存成功!',
                                        type:'success'
                                    })
                                }else{
                                    this.$message({
                                        message:'保存失败!',
                                        type:'error'
                                    })
                                }
                            } )
                        }else{
                            this.$message({
                                message:'清单名称已存在!',
                                type:'error'
                            })
                        }
                    }
                },()=>{})
            },
            delTask(item){
                ajax({
                    url:'/task/delTask',
                    method:'get',
                    data:{task_id:item.id}
                }).then((data)=>{
                    if(data.code){
                        this.task_list['tasklist'].splice( this.task_list['tasklist'].indexOf(item),1 )
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                    }else{
                        this.$message({
                            message:'删除失败！',
                            type:'error'
                        })
                    }
                })

            },
            delGroup(item){
                this.list_ui_group.splice( this.list_ui_group.indexOf(item),1 )
                item.task_list.map((i)=>{
                    i.group_id = ''
                })
                this.list_group = item.task_list.concat( this.list_group )
                ajax({
                    url:'/task/delGroup',
                    method:"get",
                    data:{group_id:item.group_id}
                }).then((data)=>{
                    if(data.code){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })

                    }else{
                        this.$message({
                            message:'删除失败！',
                            type:'error'
                        })
                    }
                })
            },
            delList(item){
                if(item.group_id && item.group_id !== "all"){
                    this.list_ui_group.map((i)=>{
                        if(i.group_id === item.group_id){
                            i.task_list.splice( i.task_list.indexOf(item),1 )
                        }
                    })
                }else{
                    this.list_group.splice( this.list_group.indexOf(item),1 )
                }

                ajax({
                    url:'/task/delList',
                    method:'get',
                    data:{list_id:item.list_id}
                }).then((data)=>{
                    if(data.code){
                        this.$message({
                            message:'删除成功！',
                            type:'success'
                        })
                    }else{
                        this.$message({
                            message:'删除失败！',
                            type:'error'
                        })
                    }
                })

            },
            chooceAddType(){
                this.dialogVisible = true
            },
            // 增加文件夹或者清单
            // 遍历清单检查名字是否已经存在
            // 添加名称到文件夹或者清单
            // 发送ajax
            showAddListInput(){
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
                            let obj = {
                                name:this.add_list_name,
                                type:'group',
                                group_id:Date.now().toString() + Math.random().toString(36).substr(2),
                                moreMenu:false,
                                name_id:Date.now(),
                                task_list:[]
                            }
                            this.list_ui_group.unshift( obj )
                            ajax({
                                url:'/task/addGroup',
                                method:'post',
                                data:{list: JSON.stringify(obj) }
                            }).then( (data)=>{
                                if(data.code){
                                    this.$message({
                                        message:'文件夹添加成功!',
                                        type:'success'
                                    })
                                }else{
                                    this.$message({
                                        message:'文件夹添加失败!',
                                        type:'error'
                                    })
                                }
                            } )

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
                            let obj = {
                                name:this.add_list_name,
                                group_id:'all',
                                type:'list',
                                list_id:Date.now().toString() + Math.random().toString(36).substr(2),
                                moreMenu:false,
                            }
                            this.list_group.unshift( obj )
                            ajax({
                                url:'/task/addList',
                                method:'post',
                                data:{list:JSON.stringify(obj)}
                            }).then( (data)=>{
                                if(data.code){
                                    this.$message({
                                        message:'清单添加成功!',
                                        type:'success'
                                    })
                                }else{
                                    this.$message({
                                        message:'添加失败!',
                                        type:'error'
                                    })
                                }
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
                    let obj = {
                        name:this.add_list_obj.str,
                        group_id:item.group_id,
                        type:'list',
                        moreMenu:false,
                        date:Date.now(),
                        list_id: Date.now().toString() + Math.random().toString(36).substr(2),
                    }
                    item.task_list.unshift(obj)
                    this.add_list_obj.str = ''
                    this.add_list_obj.show = false
                    ajax({
                        url:'/task/addList',
                        method:'post',
                        data:{list: JSON.stringify(obj) }
                    }).then( (data)=>{
                        if(data.code){
                            this.$message({
                                message:'添加成功!',
                                type:'success'
                            })
                        }else{
                            this.$message({
                                message:'添加失败!',
                                type:'error'
                            })
                        }
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
            stopEvent(){ },
            showDropList(){
                this.drop_list_show = !this.drop_list_show
            },
            setdis(item){
                this.task_dis = item
            },
            // 获取所有任务
            getAllTask(){
                this.task_list['list_id'] = 'all'
                this.task_list_name.name = '所有任务'

                if(this.choose_list){
                    this.choose_list.className = this.choose_list.className.replace('active','').trim()
                }
                ajax({
                    url:"/task/getTask",
                    method:'get',
                    data:{list_id: this.task_list['list_id'] }
                }).then((data)=>{
                    if(data){
                        this.task_list['tasklist'] = data
                        this.task_list['list_id'] = 'all'
                    }
                })
            },
            changeComplate(item){
                let parentNode = event.target.parentNode
                parentNode.style.transform = 'translateY(100%)'
                setTimeout(()=>{
                    parentNode.style.transform = 'translateY(0)'
                    item.IsComplete = !item.IsComplete
                    ajax({
                        url:'/task/updateTask',
                        method:'post',
                        data:{task: JSON.stringify(item)}
                    }).then( (data)=>{
                        if(data.code){
                        }
                    })
                },300)
            },
            updateTask(){
                ajax({
                    url:'/task/updateTask',
                    method:'post',
                    data:{task: JSON.stringify(this.task_dis) }
                }).then( (data)=>{
                    if(data.code){

                    }
                })
            },
            NoFn(){
                this.$message({
                    message:'功能还没做!',
                    type:'error'
                })
            },
            gotoIndex(){
                location.href = location.protocol + '//' + location.hostname + ':' + location.port+ '/index/'
            },
            gotoSetting(){
                location.href = location.protocol + '//' + location.hostname + ':' + location.port+ '/account/user_info'
            },
            exitAccount(){
                ajax({
                    url:"/account/exit"
                }).then( (data)=>{
                    if(data.code){
                        this.$message({
                            message:'已退出!，3秒后跳出页面',
                            type:'success'
                        })
                        setTimeout( ()=>{
                            location.href = location.protocol + '//' + location.hostname + ':' + location.port+ '/account/login'
                        },3000)
                    }else{
                        this.$message({
                            message:'退出错误，请重试！',
                            type:'error'
                        })
                    }
                })
            },
        }
    }
</script>

<style lang="scss">
    body{
        background-color:#F9FAFC;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    }
    // 调整head样式
    .head{
        display:none;
        padding:0;
        font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
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
                    transition:all 0.3s ease-in 0s;
                    i{
                        font-size:15px;
                        height:40px;
                        width:40px;
                        text-align:center;
                        line-height:40px;
                        cursor:pointer;
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
        transform: translateY(-30px)
    }
    .leave-arr-leave-active{
        transform: translateY(30px)
    }
</style>
