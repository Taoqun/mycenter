###### 个人项目 私人助理

github : [https://github.com/Taoqun/mycenter](https://github.com/Taoqun/mycenter)

练习项目。
练习使用node后端，vue框架和ract框架，了解UI组件的使用
了解项目的搭建和架构
当然也是想自己制作创造产品，创世的欲望！

心里的话：
学技术就是为了解决问题，有了锤子看什么都是钉子，我无心致力与学习精深的技术。学习代码，就像学习画画和木工，音乐一样，可以创作自己喜欢的的作品，无论是仿抄别人的，还是自己臆想出来的，满足自己的一小方天地，自得其乐！假若失去这样的兴趣，也就没有了意义。

-----------
###### 技术选型
前端：
- vue 全家桶
- webpack
- element-ui
- react
- antd UI

后端：
- node
- express
- mongoDB

--------------

###### 已完成
- [x] 登录
- [x] 注册
- [x] 任务中心 清单
- [x] 人生进度 今年已经过去了多少天 百分之多少的进度

###### 正在完成

- [ ] markdown 写作 [ `构思文章列表界面，逻辑中...后台增查改删已经写好了` ]
- [ ] 生辰 ( 模仿纯银的生辰 ) [ `偷懒中` ]

###### 待完成
- [ ] echarts 图表 统计清单，api，人生进度等数据可视化的需求 [ `这个放到最后做，毕竟得有数据，才能可视化啊！！` ]
- [ ] FM 随机播放音乐 豆瓣接口 [ `这个可能就不做了，觉得没啥意思了` ]
- [ ] 仿照apizaa 写一个api接口管理的页面 满足自己前后端展示浏览的需求 [`这个感觉想提前做`]
- [ ] 后台批量管理文章，删除等操作界面

---------------
说明:
- 需要本地安装 mongodb 运行后会连接数据库
- `config.js`  ==>  可以修改 端口号和配置域名 默认8081  也可以设置host 配置本地域名
- 运行 node app.js 启动服务器
- 访问地址 可以注册 / 登录 访问
- 所有请求都有sessions_id 验证 没有登录账号 无法访问页面 会跳转到登录页


```
git clone https://github.com/Taoqun/mycenter.git
cd mycenter
npm install
node app.js
```
图片预览（还没有全部完成）

- 登录
- 注册
- todo list （仿滴答清单）
- 设置中心
- markdown 写作（仿简书）

![登录](http://ocrcrbkp1.bkt.clouddn.com/myCenter/login.png)

![注册](http://ocrcrbkp1.bkt.clouddn.com/myCenter/register.png)

![todo list](http://ocrcrbkp1.bkt.clouddn.com/myCenter/todo_list.png)

![设置中心](http://ocrcrbkp1.bkt.clouddn.com/myCenter/setting.png)

![markdown](http://ocrcrbkp1.bkt.clouddn.com/myCenter/markdown.png)
