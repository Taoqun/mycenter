import React from 'react'
import ReactDOM from 'react-dom'

import Head from 'REACTMODULES/common/head_top.jsx'
import LeftMenu from 'REACTMODULES/api/api_left_menu.jsx'
import Body from 'REACTMODULES/api/api_right_body.jsx'

ReactDOM.render(
    <Head></Head>,
    document.getElementById("head")
)
ReactDOM.render(
    <LeftMenu></LeftMenu>,
    document.getElementById("left_menu")
)
ReactDOM.render(
    <Body></Body>,
    document.getElementById("right_body")
)
