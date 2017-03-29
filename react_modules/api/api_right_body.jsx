import React from 'react'
import "CSS/ali/iconfont.css"
import './api_right_body.scss'




let num = Math.random() * 1000
    num = parseInt(num)
let header_list = [<li key={num}>
        <input placeholder="key"></input>
        <input placeholder="value"></input>
        <span className="iconfont icon-close"></span>
    </li>,]


const Body = React.createClass({
    getInitialState(){
        return {
            header_list:'',
            body_list:'',
        }
    },
    add_header_list(){
        let num = Math.random() * 1000
            num = parseInt(num)
        let str = <li key={num}>
                <input placeholder="key"></input>
                <input placeholder="value"></input>
                <span className="iconfont icon-close"></span>
            </li>;
        header_list.push(str)
        this.setState({ header_list :0 })
    },
    render(){
        return (
            <div className="right_body">
                { /* tab选项卡 */ }
                <div className="api_title">
                    <ul>
                        <li>星谷<span className="iconfont icon-close"></span></li>
                        <li>个人助理<span className="iconfont icon-close"></span></li>
                        <li>测试<span className="iconfont icon-close"></span></li>
                    </ul>
                </div>
                { /* api请求类型 请求地址  请求 保存按钮 */ }
                <div className="api_url">
                    <div className="chose_type">
                        <span>GET <i className="iconfont icon-unfold"></i></span>
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
                <div className="api_data">
                    <h3 className="api_title">参数</h3>
                    <h6 onClick={ this.add_header_list } className="api_title api_header_title">header</h6>
                    <ul className="api_data_list">
                        { header_list }
                    </ul>
                    <h6 className="api_title api_data_title">query/body</h6>
                    <ul className="api_data_list">
                        <li>
                            <input placeholder="key"></input>
                            <input placeholder="value"></input>
                            <span className="iconfont icon-close"></span>
                        </li>
                        <li>
                            <input placeholder="key"></input>
                            <input placeholder="value"></input>
                            <span className="iconfont icon-close"></span>
                        </li>
                        <li>
                            <input placeholder="key"></input>
                            <input placeholder="value"></input>
                            <span className="iconfont icon-close"></span>
                        </li>
                        <li>
                            <input placeholder="key"></input>
                            <input placeholder="value"></input>
                            <span className="iconfont icon-close"></span>
                        </li>
                    </ul>
                </div>
            </div>
        )
    }
})

export default Body;
