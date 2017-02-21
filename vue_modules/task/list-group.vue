<template lang="html">
    <div>
        <div class="list-ui-group" v-for="item in list">
            <h6 class="group-name"><i class="icon iconfont  icon-file"></i>{{item.name}}
                <i class="more iconfont icon-more" @click.stop="showMore(item)"></i>
                <s-drop-menu :list="groupmore" :obj="item"  :listgroup="list" :show="item.moreMenu"></s-drop-menu>
            </h6>
            <div class="ui_group_list_group">
                <s-list-name :list="item.task_list" :listmore="listmore" :tasklist="tasklist" :listname="listname"></s-list-name>
                <p v-show="!item.task_list.length" class="no_list">暂无清单</p>
            </div>
        </div>
    </div>
</template>

<script>
import dropMenu from 'VUEMODULES/common/drop-down'
import s_list_name from './list-name.vue'
export default {
    props:{
        list:Array,
        groupmore:Array,
        listmore:Array,
        tasklist:Object,
        listname:Object,
    },
    components:{
        "s-drop-menu":dropMenu,
        's-list-name':s_list_name,
    },
    methods:{
        showMore(item){
            let show = item.moreMenu
            this.list.map((i)=>{
                i.moreMenu = false
            })
            item.moreMenu = !show;
        },
    },
}
</script>

<style lang="scss">
.list-ui-group{
    border-bottom:1px solid #1F2D3D;
    transition:all 0.5s ease-in-out 0s;
    .group-name{
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
    .list-name{
        padding-left:10px;
        border-bottom:0px solid #1F2D3D;
        margin-right:0px;
    }
    .ui_group_list_group{
        transition:all 0.5s ease-in 0s;
        box-sizing:border-box;
        margin-right:17px;

        .no_list{
            line-height:30px;
            text-align:center;
            color:#ccc;
        }
    }
}
</style>
