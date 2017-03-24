module.exports = (err,res)=> {
    console.log(err)
    res.render("error/404.html",{tips:'服务器错误'})
    return
}
