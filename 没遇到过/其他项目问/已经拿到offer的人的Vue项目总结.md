# Vue项目总结

 初始化项目准备 

 项目配置 

配置选择

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650887957888-5119709b-2f06-4c94-b2e5-f14c859093fb.webp)



Babel:编译

ts:约束类型

Linter/Formatter:代码校验

Unit Testing:单元测试



版本选择

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888048472-12c77152-49ca-4e77-87ba-4eeb2aa4e54c.webp)



class风格选择

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888078806-dbdca5d3-7e2b-4b92-9c2d-6543e7796837.webp)



是否在ts基础上使用babel

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888104443-ac3b967b-f9b4-4717-9a9e-9a0272f9a7f7.webp)



选择lint形式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888122053-c26dfbef-b1b7-4595-a7f6-668412de48f4.webp)



保存时和提交时的校验选择

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888154351-b018c7f5-c8b9-4de3-b0b0-23b8353615ff.webp)



单元测试解决方案

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888172758-93ebd77c-5eb9-44c1-a93e-ce50f8eb4e02.webp)



配置写在哪

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888200177-e8ff1b14-0c7d-4388-960c-5ab7a69c7bde.webp)



 自动格式化 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642164147680-a888114e-f53d-4ff8-b916-653d52210b29.webp)



地址:

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/2022_logo_spring_festeval_2.svg+xml)[![img](https://common.cnblogs.com/images/festival/2022_logo_spring_festeval_2.svg)VUE保存自动格式化 - ThisCall - 博客园"editor.formatOnSave": true, https://www.cnblogs.com/vs1435/p/11798670.html ctrl + shift +博客园](https://www.cnblogs.com/dianzan/p/13613288.html)

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642163741363-ede9eed0-7b3b-437d-8d4d-c65e1e94f9d0.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642163758114-e47e40fe-49b3-4392-8e6a-4cb9cd8fb063.webp)



 在Vue中使用jsx 

地址:https://github.com/vuejs/babel-plugin-jsx/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md

第一步:安装包

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1651296411608-7c4a040c-3e5e-4651-b9e8-d6262349f24b.webp)



第二步:配置babel，在babel.config.js里配置

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1651296402387-b041f9e5-5869-44a5-b5da-2e4b14c47d51.webp)





 Prettier的使用 

第一步:打开保存save

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888778649-daf3eefc-794b-450c-92da-7b5014d7af7e.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650888836094-0b0e2024-e918-4810-a805-a4ea8c4b648b.webp)

建议选择工作区，因为工作区选中后之后当前项目触发





 JSON Scheme的介绍 

jsonschema是描述你的JSON数据格式；JSON模式（应用程序/模式+ JSON）有多种用途，其中之一就是实例验证。验证过程可以是交互式或非交互式的。例如，应用程序可以使用JSON模式来构建用户界面使互动的内容生成除了用户输入检查或验证各种来源获取的数据。

比较出名的库

:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1651301221256-ee268ffe-8e40-4054-9d7e-5a6dd5560ca7.webp)



这个库主要是为了进行一些校验，如下:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1651301248957-305152b4-21b9-40f4-90c2-6f6c5bb7105d.webp)



 路由配置 

 $router和$route 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166501303-ef0b3720-807d-4da4-90a4-25deaf3b52ae.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166482598-3494aa42-65e2-4f43-b378-593ebdfc0055.webp)



 编程式导航 

相当于是js的写法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166287199-1ebb099e-3b4d-4eb9-b52d-674cb63d6c52.webp)



 声明式导航 

相当于是一个a标签

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166253617-d4548b2c-2376-4a63-ae73-a0f06578d4bb.webp)



 重定向 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166568459-b2976f6e-e333-4f9d-8a8f-7363143888f7.webp)



 占位符 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166581296-e3105f15-55fe-48fe-9938-68082fb5bffc.webp)



 路由原信息 

在路由创建时配置的信息

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642166185076-a74119b7-59bd-4360-9fef-9887bf65d1bc.webp)



路由产生时就会自带一个meta

 路由传参 

params参数:属于路径中的一部分，需要注意，在配置路由的时候需要占位

query参数:不属于路径当中的一部分，类似于ajax中的queryString/home?k=v&kv=，不需要占位

一、query参数

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642167455168-6cc8a661-80dc-43ba-937e-1de3435a9fdd.webp)



this.$route.query.keyword

二、params参数(要占位)

在后面加个问号可以指定param参数可传可不传

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642167682760-3c1d5fcf-72f4-4320-8bef-3b71e439ba4b.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642167696938-75640023-674c-4ece-a278-78985a378edc.webp)



获取方法:this.$route.params.keyword

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642168407565-ef118e6a-4fbf-41f1-86d4-67fcb18c04e8.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642168643940-95f64f5d-0181-4752-9f8a-cd76a2ff14b9.webp)



 通过编程式导航+事件委派实现路由传参 

因为routerLink是个组件会导致组件挂载销毁性能不足，所以选用编程式导航

如果给每个dom都挂载事件的话，也会导致性能受损，所以可以用事件委派，即给共同的父亲挂载一个事件、

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642254169831-f880f410-4d26-4f1e-a4be-cb473e68cead.webp)



通过自定义属性把要路由传递的值给挂上

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642254187687-ea76d5c8-1112-4e80-92c8-6f92283d90e3.webp)



通过dataset获取dom上的自定义属性

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642254046962-052cd9f0-ab5c-4ace-acac-6e1f4a0a1052.webp)



 如果传递同一个参数多次会报错问题解决 

只有在编程式导航是才会产生这种错误

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642168783788-9ccb83c3-f3a3-4c78-97e7-e42d22e770e8.webp)





 跨域问题 

 配置代理 

在vue里vue.config.js和webpack.config.js是差不多的

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642177531529-b2ed9baa-cf66-4012-a202-7eec8bd26686.webp)





 nprogress进度条的使用 

https://madewith.cn/vuejs这个网站搜索nprogress

配合请求拦截器和响应拦截器使用

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642219817494-9fdba42c-f08f-458c-bd55-9e7105ecb6b3.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642220277516-2f0e7454-aaf3-49e2-ad81-1ae55a29f0fc.webp)



在请求拦截器里开始进度条

start方法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642220297238-a9e21a14-0ec3-4110-96e8-8368e893d8c4.webp)



在响应拦截器里结束进度条

done进度条结束

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642220317600-aab2eb7c-05ba-47e7-9c30-c0dff431f3c4.webp)





 vuex状态管理 

官方提供的状态管理库，集中式管理共用数据

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642220551065-c2b597ef-d23c-4fd0-b045-6440aad6fa76.webp)



 vuex的核心 

state:

mutations

actions

getters

modules

 基本结构 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642221085764-73c720c7-771e-4cc5-bc17-9aed12aba622.webp)



 在入口文件中注册仓库 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642221062968-3ac9d886-06f2-478d-bc01-8fe7cc8826db.webp)



 用法 

一、如果使用dispatch，要先和action联系

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642223493755-bf9485d0-56a6-4625-b58f-59d132464736.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642223565478-8cae10de-172b-489b-ab7e-5022d1ef970d.webp)



commit是解构赋值出来了一个函数，这个函数可以调用一个mutation上的方法，只有mutation才可以直接修改数据



二、可以直接使用commit，这样就会直接联系到mutations

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642223720011-bd31e027-a186-4f95-a5ce-095e16d3d3f9.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642223734602-370a2400-d4a6-446c-9fef-cd799a9ad976.webp)



这里直接使用ADD方法，如果mutations上有这个方法就会成功调用这个方法



 模块化开发 

用法:

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642226450657-45e8b6d6-2e92-4461-b2c3-b04fc4f36161.webp)



小模块

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642226478723-a6c10619-cb11-414b-9f11-7d585f2ed62c.webp)



通过模块化开发让条理更加清晰

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642226498776-f3584570-e0a7-45a8-9175-629183567c1f.webp)





 通过transtion实现过渡动画 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642257527423-6037ee4b-dd59-4a37-b1a3-18fdfd1a78d5.webp)



![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642257491794-6d88a7da-4e4f-4324-be5f-3a6c1788d758.webp)



 通过mockjs模拟数据 

 axios封装 

axios的封装可以基于这种实例的封装，create，用的时候调用就行

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642919038365-f09efc48-da15-4986-8d25-81ed04a16708.webp)



 swiper轮播图 

一定要用5版本的

引入swiper

安装要安装5版本的

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642952934904-6e9791c9-339f-4553-b89d-cdde8dd668a3.webp)



引入css样式

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642952965699-8d464ecb-70f3-4fc8-a62a-5e804f646f27.webp)



用法

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642953007042-f088f007-35bf-4cd0-bc95-1cc906b78530.webp)



注意:swiper-container是轮播图容器的大小，必须有个固定大小才能看见轮播图

 轮播图区域结构 

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1642953074288-6a272e1d-28a2-4214-9a23-b840b8867a7e.webp)



swiper-wrapper是轮播图图片区域

swiper-pagination是分页器区域

swiper-button是按钮

swiper-scrollbar是滚动条