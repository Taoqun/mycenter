###### 个人项目 私人助理

github : [https://github.com/Taoqun/mycenter](https://github.com/Taoqun/mycenter)

主要自己做着玩，练习项目。
练习使用node后端，vue框架和ract框架，了解UI组件的使用
了解项目的搭建和架构
当然也是想自己制作创造产品，创世的欲望！

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

- [ ] markdown 写作
- [ ] 生辰 ( 模仿纯银的生辰 )

###### 待完成
- [ ] echarts 图表
- [ ] FM 随机播放音乐 豆瓣接口

###### 描述
1. 现在在用 react antd 构思文章列表页面和编辑文章的逻辑，增查改删的接口已经写好
2. 后台批量管理文章，删除等操作界面
3. 生辰 死之钟 死亡日期计算 剩下的日子 逻辑

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
