###### 个人项目 私人助理

github : [https://github.com/Taoqun/mycenter](https://github.com/Taoqun/mycenter)

使用node后端，vue框架和ract框架，
了解项目的搭建和架构
当然也是想自己制作创造产品，创世的欲望！

心里的话：
学技术就是为了解决问题，有了锤子看什么都是钉子，我无心致力与学习精深的技术。学习代码，就像学习画画和木工，音乐一样，可以创作自己喜欢的的作品，无论是仿抄别人的，还是自己臆想出来的，满足自己的一小方天地，自得其乐！假若失去这样的兴趣，也就没有了意义。

-----------
###### 技术选型
前端：
- vue
- vue-resource
- vue-router
- webpack
- element-ui
- react
- antd UI
- markdown 解析 使用`segmentFault` 官方库 [HyperDown.js](https://github.com/SegmentFault/HyperDown.js)生成页面

后端：
- node
- express
- ejs
- mongoDB `mongoose`

--------------

###### 已完成
- [x] 登录
- [x] 注册
- [x] 任务中心 清单
- [x] 人生进度 今年已经过去了多少天 百分之多少的进度
- [x] markdown 写作
- [x] 404 页面 [ `加上各种问题提示` ]
- [x] 字体采用 有字库 提供的苹方字体
- [x] markdown 优化 删除文章时 需要用户确认
- [x] markdown 关键词 标签 填写项

###### 正在完成
- [ ] 暂时偷懒...

###### 待完成
- [ ] 后台批量管理文章，修改、删除等操作 [`延后...`]
- [ ] FM 随机播放音乐 豆瓣接口 [ `这个可能就不做了，觉得没啥意思了` ]
- [ ] 仿照apizaa 写一个api接口管理的页面 满足自己前后端展示浏览的需求 [`这个感觉想提前做` `仿apizza postman 暂时不做请求功能 只做文档查看的增查改删`]
- [ ] echarts 图表 统计清单，api，人生进度等数据可视化的需求 [ `这个放到最后做，毕竟得有数据，才能可视化啊！！` ]

######  已放弃的想法和功能
- [ ] 生辰 ( 模仿纯银的生辰 ) [ `偷懒中` `没有兴趣继续往下做了 pass` ]

---------------

```
git clone https://github.com/Taoqun/mycenter.git
cd mycenter
npm install
node app.js
```

说明:
- 需要本地启动 `mongoDB`
- `config.js` 可以修改 端口号和配置域名

###### 图片预览（还没有全部完成）

- 登录
- 注册
- todo list （仿滴答清单）
- 设置中心
- markdown 写作（仿简书）
- api文档管理中心 (仿apizza postman 暂时不做请求功能 只做文档的增查改删)

![登录](http://ocrcrbkp1.bkt.clouddn.com/myCenter/login.png)
![注册](http://ocrcrbkp1.bkt.clouddn.com/myCenter/register.png)
![todo list](http://ocrcrbkp1.bkt.clouddn.com/myCenter/todo_list.png)
![设置中心](http://ocrcrbkp1.bkt.clouddn.com/myCenter/setting.png)
![写作模式切换](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0-%E5%86%99%E4%BD%9C%E6%A8%A1%E5%BC%8F%E5%88%87%E6%8D%A2.png)
![文章](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0.png)
![文章夜间模式](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%A4%9C%E9%97%B4%E6%A8%A1%E5%BC%8F.png)
![文章列表](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.png)
