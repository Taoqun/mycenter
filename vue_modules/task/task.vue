<template lang="html">
    <div class="task-center">

        <div class="list-group">
            <h3 class="title">任务夹</h3>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
            <div class="list-ui-group">
                <h6 class="group-name"><i class="icon el-icon-menu"></i>书单</h6>
                <ul>
                    <li class="list-name" data-id='123'><i class="icon el-icon-document"></i>菜单1</li>
                    <li class="list-name active" data-id='123'><i class="icon el-icon-document"></i>菜单1</li>
                    <li class="list-name" data-id='123'><i class="icon el-icon-document"></i>菜单1</li>
                    <li class="list-name" data-id='123'><i class="icon el-icon-document"></i>菜单1</li>
                </ul>
            </div>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
            <p class="list-name" data-id="123"><i class="icon el-icon-document"></i>菜单1</p>
        </div>

        <div class="task-list">
            <h3 class="title">列表: 书单</h3>
            <div class="add-task">
                <input type="input" name="name" placeholder='添加任务至"书单"' value="">
            </div>
            <div class="task-list-show task-list-no">
                <h3 class="task-list-show-name"><i class="el-icon-arrow-down"></i>待完成</h3>
                <ul>
                    <li>111111</li>
                    <li>111111</li>
                    <li>111111</li>
                    <li>111111</li>
                </ul>
            </div>
            <div class="task-list-show task-list-off">
                <h3 class="task-list-show-name"><i class="el-icon-arrow-down"></i>已完成</h3>
                <ul>
                    <li>222222</li>
                    <li>222222</li>
                    <li>222222</li>
                    <li>222222</li>
                    <li>222222</li>
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
    import "LIBCSS/element.css"
    export default {
    }
</script>

<style lang="scss">
    body{
        background-color:#F9FAFC;
    }
    // 调整head样式
    .head{
        padding:0;
        h1{
            margin-top:0;
            margin-bottom:10px;
            padding-top:10px;
        }
    }

    .task-center{
        width:100%;
        margin:10px auto 0;
        display:flex;
        background-color:#EFF2F7;
        & > div{
            flex-grow:1;
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
            width:300px;
            background-color:#313643;
            color:#fff;
            ul{
                overflow:hidden;
                transition:all 0.4s ease-out 0s;
            }

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
                &:hover{
                    background-color:#324057;
                }
            }
            .active{
                background-color:#475669;
            }
            .list-ui-group{
                border-bottom:1px solid #1F2D3D;
                .list-name{
                    padding-left:40px;
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
                    border-bottom:1px solid #D3DCE6;
                    border-top:1px solid #D3DCE6;
                    color:#475669;
                    i{
                        margin-right:5px;
                    }
                }
                li{
                    margin:0 20px;
                    font-size:12px;
                    line-height:30px;
                    padding:5px 20px;
                    box-sizing:border-box;
                    border-bottom:1px solid #EFF2F7;
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
