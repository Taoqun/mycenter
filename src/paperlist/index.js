import React from "react"
import ReactDOM from 'react-dom'
import "REACTMODULES/paperlist/paper_list.scss"
import Head from  "REACTMODULES/common/head.jsx"

let title = "文章列表"

ReactDOM.render(
    <Head text={title} />,
    document.getElementById("head")
)
