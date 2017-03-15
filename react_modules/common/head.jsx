import React from 'react'
import "CSS/cssreset.css"
import "./header.scss"

import {headList} from "ROOT/config.js"

let lis = headList.map( (item)=>{
        return <li key={item.name}><a href={item.url} >{item.name}</a></li>
    });

const Component1 = React.createClass({
    getDefaultProps() {
        return {
            text:'测试'
        }
    },
    render() {
        return (
          <div className="head">
              <h1>私人助理 · {this.props.text}</h1>
              <ul className="nav-list">{ lis }</ul>
          </div>
        );
    }
})

// 导出组件
export default Component1;
