import React from 'react'
import "./paper_list.scss"


var List = React.createClass({
    getInitialState(){
        return{
            list:[
                {
                    id:123456,
                    title:"关于Function.prototype.toString的野生小技巧",
                    name:"taoqun",
                    date:Date.now(),
                    content:'摘要: require.js 参考阮一峰 "Javascript模块化编程(三)：require.js的用法" r.js 合并压缩 参考司徒正美 "r.js合并实践" 准备： vue.js 原本是学习vue组件 require.js 然后想到用require 加载 r.js 文件太多 合并 文件目录 一、先',
                    url:"http://www.baidu.com",
                },
                {
                    id:1234562,
                    title:"关于Function.prototype.toString的野生小技巧",
                    name:"taoqun",
                    date:Date.now(),
                    content:'摘要: require.js 参考阮一峰 "Javascript模块化编程(三)：require.js的用法" r.js 合并压缩 参考司徒正美 "r.js合并实践" 准备： vue.js 原本是学习vue组件 require.js 然后想到用require 加载 r.js 文件太多 合并 文件目录 一、先',
                    url:"http://www.baidu.com",
                },
                {
                    id:123456213,
                    title:"关于Function.prototype.toString的野生小技巧",
                    name:"taoqun",
                    date:Date.now(),
                    content:'摘要: require.js 参考阮一峰 "Javascript模块化编程(三)：require.js的用法" r.js 合并压缩 参考司徒正美 "r.js合并实践" 准备： vue.js 原本是学习vue组件 require.js 然后想到用require 加载 r.js 文件太多 合并 文件目录 一、先',
                    url:"http://www.baidu.com",
                },
            ]
        }
    },
    handleClick(event){
        console.log(event.target)
    },
    render() {
        return(
            <div className="paper_list_wrap">
                {
                    this.state.list.map( (i)=>{
                        let date = new Date(i.date),
                            date_str = date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate(),
                            html_str = <div className="paper_list" key={i.id}>
                                    <h3 className="paper_title"><a href={i.url}>{i.title}</a></h3>
                                    <p className="paper_name">{i.name}<span>{date_str}</span></p>
                                    <p className="paper_content">{i.content}...</p>
                                    <p><a className="paper_read_more" href={i.url}>阅读全文</a></p>
                                  </div>;
                        return html_str
                    })
                }
            </div>
        )
    }
})


export default List
