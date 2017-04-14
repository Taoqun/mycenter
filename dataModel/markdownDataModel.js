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

let paper = mongoose.model('paper', markdown_data_type)

exports.getPaperModel = paper
exports.init = function(account) {
    let date = parseInt( (new Date()).valueOf() ) + (1000*60*60*8)
    let data = new paper({
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
