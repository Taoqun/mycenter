import React from 'react'
import "CSS/ali/iconfont.css"
import './api_right_body.scss'




const Body = React.createClass({
    render(){
        return (
            <div className="right_body">
                <div className="api_title">
                    <ul>
                        <li>星谷<span className="iconfont icon-close"></span></li>
                        <li>个人助理<span className="iconfont icon-close"></span></li>
                        <li>测试<span className="iconfont icon-close"></span></li>
                    </ul>
                </div>
                <div className="api_url">
                    <div className="chose_type">
                        <span>GET</span>
                        <ul>
                            <li>GET</li>
                            <li>POST</li>
                            <li>PUT</li>
                            <li>DELETE</li>
                        </ul>
                    </div>
                    <input className="api_url_input"></input>
                    <button className="api_btn api_set_ajax">发送</button>
                    <button className="api_btn api_svae">保存</button>
                </div>
            </div>
        )
    }
})

export default Body;
