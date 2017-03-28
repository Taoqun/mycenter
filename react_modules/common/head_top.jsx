import React from 'react'
import "CSS/cssreset.css"
import './head_top.scss'
import {headList} from 'ROOT/config.js'

let lis = headList.map( (item,index) => {
    if(index === 0){
        return <li key={item.name}><a className="active" href={item.url}>{item.name}</a></li>
    }else{
        return <li key={item.name}><a href={item.url}>{item.name}</a></li>
    }
})

const Head = React.createClass({
    render(){
        return (
            <ul className="head">
                { lis }
            </ul>
        )
    },
})
export default Head;
