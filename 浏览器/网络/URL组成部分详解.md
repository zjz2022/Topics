URL 是 Uniform Resource Locator 的简写，统一资源定位符。

一个 URL 由以下几部分组成：

```
    scheme://host:port/path/?query-string=xxx#anchor
```

- scheme：代表的是访问的协议，一般为 http 或者 https 以及 ftp 等。
  https 协议是在 http 协议的基础上进行了一层加密
  啥叫协议
  中国人和中国人说话，要遵循汉语的的语法结构，使用汉语的发音。当我们和外国人交流时，就要适用外国的语言了，遵循外国的语法机构和发音。其实这就是一种协议，只不过我们称之为语言。
  计算机再这方面体现的更为直观，两台机器之间该如何通信呢，就需要制定各种各样的协议了。例如：文件传输适用 TCP 协议。域名系统适用 DNS 协议。有了些协议的存在，各种数据流按照规则传输，计算机之间得以通信。
- host：主机名，域名，比如www.baidu.com。
  域名和 ip 地址的关系
  类似于: 手机中人名和电话号码的关系
- port：端口号。当你访问一个网站的时候，浏览器默认使用 80 端口。
  请求服务器时,所请求的端口,
  小区中,端口号类似于门牌号, 浏览器自动完成了端口号的输入
- path：查找路径。比如：www.jianshu.com/trending/now，后面的trending/now就是path。
- query-string：查询字符串，比如：www.baidu.com/s?wd=python，后面的wd=python就是查询字符串。
  理解为参数
- anchor：锚点，后台一般不用管，前端用来做页面定位的。

注意：URL 中的所有字符都是 ASCII 字符集，如果出现非 ASCII 字符，比如中文，浏览器会进行编码再进行传输。
