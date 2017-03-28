import React from 'react'
import './api_left_menu.scss'
import "CSS/ali/iconfont.css"


let toggle = (node) => {
    let height = node.clientHeight
    node.style.height = height + 'px'

    if(height === 0){
        openUL(node)
    }else if(height > 0 ){
        node.dataset.height = height
        closeUL(node)
    }
}

let openUL = (node)=>{
    let height = node.clientHeight
        height = parseInt(height)
    let trueHeight = node.dataset.height
        trueHeight = parseInt(trueHeight)

    if(height < trueHeight && height < trueHeight + 5 ){
        height++
        height++
        node.style.height = height + 'px'
        setTimeout(()=>{
            openUL(node)
        },1)
    }else{
        node.style.height = 'auto'
    }
}
let closeUL = (node) => {
    let height = node.clientHeight
    let trueHeight = node.dataset.height

    if(height >5 ){
        height--
        height--
        node.style.height = height + 'px'
        setTimeout(()=>{
            closeUL(node)
        },1)
    }else{
        node.style.height = '0px'
    }
}

const Main = React.createClass({
    onCloseGroup(event){
        if(event){
            let ul = event.target.nextSibling
            toggle(ul)
        }
    },
    render(){
        return (
            <div className="left_menu">
                <div className="search_btn">
                    <input></input>
                    <button>搜索</button>
                </div>
                <div className="group">
                    <h6 onClick={this.onCloseGroup}><span className="iconfont icon-zhankaicaidan"></span>注册登录</h6>
                    <ul>
                        <li>注册请求</li>
                        <li>登录</li>
                    </ul>
                </div>
                <div className="group">
                    <h6 onClick={this.onCloseGroup} ><span className="iconfont icon-zhankaicaidan"></span>markdown接口</h6>
                    <ul>
                        <li>新建文档接口</li>
                        <li>查看文档</li>
                        <li>更新文档</li>
                        <li>删除文档</li>
                    </ul>
                </div>
            </div>
        )
    },
})

export default Main
