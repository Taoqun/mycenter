###### 个人项目 私人助理

github : [https://github.com/Taoqun/mycenter](https://github.com/Taoqun/mycenter)

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
- 字体采用 有字库 提供的苹方字体

后端：
- node
- express
- ejs
- mongoDB `mongoose`

--------------

###### 已完成
- [x] 登录
- [x] 注册
- [x] 我的任务 todo-list [`仿滴答清单`]
- [x] ~~人生进度 今年已经过去了多少天 百分之多少的进度~~ [`仿生辰`]
- [x] markdown 写作 [`仿简书`]
- [x] 404 页面 [ `加上各种问题提示` ]
- [x] markdown 局部优化 删除文章时 需要用户确认
- [x] markdown 关键词 填写
- [x] 仿照apizaa 写一个api接口管理的页面 满足自己前后端展示浏览的需求 [`自己想了一种样式布局`]

###### 正在完成
- [ ] ~~暂时偷懒...~~
- [ ] 关于本站
- [ ] 首页

###### 待完成
- [ ] 后台批量管理文章，修改、删除等操作 [`延后...`]
- [ ] echarts 图表 统计清单，api，人生进度等数据可视化的需求 [ `这个放到最后做，毕竟得有数据，才能可视化啊！！` ]


###### 想法
- [ ] 看一席[《中国美色》](http://v.youku.com/v_show/id_XMjUzMDE4OTU4OA==.html?spm=a2h0z.8244218.2371631.5&from=y1.9-3.1)，想做一个颜色标识的网站，现在经常查颜色用千图网的配色表，但感觉还不够。
- [x] 买一台服务器啊~~ [`182.61.49.55` `已经购买，部署完成，大家访问ip即可访问`]
- [ ] 写个微信小程序啊~~

######  已放弃的想法和功能
- [ ] ~~生辰 ( 模仿纯银的生辰 )~~ [ `偷懒中` `没有兴趣继续往下做了 pass` ]
- [ ] ~~FM 随机播放音乐 豆瓣接口 已经用request抓了几千条数据存在数据库里了~~ [ `这个可能就不做了，觉得没啥意思了` ]

---------------

```
git clone https://github.com/Taoqun/mycenter.git
cd mycenter
npm install
node app.js
```

说明:
- 需要本地启动 `mongoDB`
- `config.js` 可以修改 端口号和配置域名,修改后前端需要重新编译，然后重启node

```
change config.js pros hostname // 改变端口和域名
webpack -p // 重新编译 -p 去除无用代码 减少js文件大小
node app.js // 重新启动node服务器
```

###### 图片预览（还没有全部完成）

- 登录
- 注册
- todo list （仿滴答清单）
- 设置中心
- markdown 写作（仿简书）
- api文档管理中心 (仿apizza postman 暂时不做请求功能 只做文档的增查改删)

![配色参考](http://ocrcrbkp1.bkt.clouddn.com/myCenter/color.jpg)
[配色参考](http://ocrcrbkp1.bkt.clouddn.com/myCenter/color.jpg)

![登录](http://ocrcrbkp1.bkt.clouddn.com/myCenter/login.png)
[登录](http://ocrcrbkp1.bkt.clouddn.com/myCenter/login.png)

![注册](http://ocrcrbkp1.bkt.clouddn.com/myCenter/register.png)
[注册](http://ocrcrbkp1.bkt.clouddn.com/myCenter/register.png)

![todo list](http://ocrcrbkp1.bkt.clouddn.com/myCenter/todo_list.png)
[todo list](http://ocrcrbkp1.bkt.clouddn.com/myCenter/todo_list.png)

![设置中心](http://ocrcrbkp1.bkt.clouddn.com/myCenter/setting.png)
[设置中心](http://ocrcrbkp1.bkt.clouddn.com/myCenter/setting.png)

![写作模式切换](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0-%E5%86%99%E4%BD%9C%E6%A8%A1%E5%BC%8F%E5%88%87%E6%8D%A2.png)
[写作模式切换](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0-%E5%86%99%E4%BD%9C%E6%A8%A1%E5%BC%8F%E5%88%87%E6%8D%A2.png)

![文章](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0.png)
[文章](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0.png)

![文章夜间模式](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%A4%9C%E9%97%B4%E6%A8%A1%E5%BC%8F.png)
[文章夜间模式](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%A4%9C%E9%97%B4%E6%A8%A1%E5%BC%8F.png)

![文章列表](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.png)
[文章列表](http://ocrcrbkp1.bkt.clouddn.com/myCenter/%E6%96%87%E7%AB%A0%E5%88%97%E8%A1%A8.png)

![文章查看](http://ocrcrbkp1.bkt.clouddn.com/myCenter/paper.png)
[文章查看](http://ocrcrbkp1.bkt.clouddn.com/myCenter/paper.png)

![api列表](http://ocrcrbkp1.bkt.clouddn.com/apilist.png)
[api列表](http://ocrcrbkp1.bkt.clouddn.com/apilist.png)

![api详情](http://ocrcrbkp1.bkt.clouddn.com/api.png)
[api详情](http://ocrcrbkp1.bkt.clouddn.com/api.png)
