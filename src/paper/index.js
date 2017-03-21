import React from "react"
import ReactDOM from "react-dom"

import "REACTMODULES/paper/paper.scss"
import "CSS/markdown.css"

import Head from "REACTMODULES/common/head.jsx"

let title = "文章"
ReactDOM.render(
    <Head text={title} />,
    document.getElementById("head")
)
