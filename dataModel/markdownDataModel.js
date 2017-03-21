const mongoose = require("mongoose")

const markdown_data_type = new mongoose.Schema({
    account: String,
    paper_id: String,
    title: String,
    content: String,
    name: String,
    date: Date,
    keywords: Array,
    des:String,
    tag:Array,
    type: String,
});


exports.getMarkdownModel = function(account) {
    return mongoose.model(account + '_md', markdown_data_type)
};
exports.init = function(account) {
    let md = mongoose.model(account + '_md', markdown_data_type)
    let date = parseInt( (new Date()).valueOf() ) + (1000*60*60*8)
    let data = new md({
        account: account,
        paper_id: account + '_' + (new Date()).valueOf(),
        name: '',
        title: '这是你的第一篇文章',
        date: (new Date(date)).valueOf(),
        keywords: ["第一篇文章", "关键词", "标签"],
        content: "#####656\n *222*",
        des:"这是你的第一篇文章",
    })
    data.save((err) => {
        if (err) { return console.log(err) }
    })
};
