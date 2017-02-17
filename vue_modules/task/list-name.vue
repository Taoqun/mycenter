<template lang="html">
    <div class="">
        <p class="list-name"  v-for="item in list" :data-id="item.id">
            <i class="icon iconfont icon-sortlight"></i>{{item.name}}
            <i class="more iconfont icon-more" @click.stop="showMore(item)"></i>
            <s-drop-menu :list="listmore" :obj="item" :listgroup="list" :show="item.moreMenu"></s-drop-menu>
        </p>
    </div>
</template>

<script>
import dropMenu from 'VUEMODULES/common/drop-down'
export default {
    props:{
        list:Array,
        listmore:Array,
    },
    components:{
        "s-drop-menu":dropMenu,
    },
    methods:{
        showMore(item){
            let show = item.moreMenu
            this.list.map((i)=>{
                i.moreMenu = false
            })
            item.moreMenu = !show;
        },
    }
}
</script>

<style lang="scss">
    .list-name{
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
</style>
