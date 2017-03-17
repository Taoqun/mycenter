import React from 'react'
import ReactDOM from 'react-dom'
import Head from "REACTMODULES/common/head.jsx"
import Body from "REACTMODULES/paper/paper_list.jsx"
ReactDOM.render(
    <div>
        <Head text={"文章列表"} />
        <Body />
    </div>,
    document.getElementById("app")
)
