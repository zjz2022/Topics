 一个完整的URL包括了哪些内容 

http://www.baidu.com:80/stu/index.html?from=wx&lx=1#zhenyu



协议:(http://):传输协议就是能够把客户端和服务器端通信的信息，进行传输的工具(类似于快递小哥)

​       +http超文本传输协议,除了传递文本，还可以传递媒体资源文件(或者流文件)及XML格式数据

​        +https更加安全的http，一般涉及支付的网站都要采用https协议(s:ssl加密传输过程)

​         ftp 文件传输协议(一般应用于把本地资源上传到服务器端)



域名:(www.baidu.com):

  +顶级域名 qq.com

  +一级域名 www.qq.com

  +二级域名 sports.qq.com

  +三级域名 kbs.sports.qq.com 

  .com 国际域名

  .cn 中文域名

  .com.cn

  .edu教育

  .gov政府

  .io 博客

  .org 官方组织

  .net 系统类

  

端口号:(80):端口号取值范围0~65535，用端口号来区分同一台服务器的不同项目

  +http默认端口号:80

  +https默认端口号:443

  +ftp默认端口号:21

  +如果项目采用的是默认端口号，书写地址的时候，不用加端口号，浏览器在发送请求的时候会默认加上

（服务器根据端口号找到对应的项目）





请求资源名称:(/stu/index.html):

 +默认的路径或者名称 (xxx.com/stu/不指定资源名，服务器会找默认的资源，一般默认资源名是default.html、index。html....当然这些可以在服务器端自己配置)

 +注意伪URL地址的处理(URL重写技术是为了增加SEO搜索引擎优化的，动态的网址一般不能被搜索引擎收，所以我们要把动态网址静态化，此时需要重写url)

https://item.jd.hk/2482519.html

====》https://item.jd.hk/index.php?id=2482519(伪URL地址的处理)

（服务器根据请求资源的路径找到资源文件）



问号传参信息:(?from=wx&lx=1)

 +客户端想把信息传递给服务器有很多种方式

​    +URL地址问号传参

​    +请求报文传输(请求头和请求主体)



哈希值:(zhenyu)

 +也能充当信息传输的方式

 +锚点定位

 +基于HASH实现路由管控(不同的HASH值，展示不同的组件和模块)