### Http请求头有哪些

下面是一个HTTP请求的请求头：

```css
GET /home.html HTTP/1.1
Host: developer.mozilla.org
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate, br
Referer: https://developer.mozilla.org/testpage.html
Connection: keep-alive
Upgrade-Insecure-Requests: 1
If-Modified-Since: Mon, 18 Jul 2016 02:36:04 GMT
If-None-Match: "c561c68d0ba92bbeb8b0fff2a9199f722e3a621a"
Cache-Control: max-age=0
```

常见的请求字段如下表所示：

| 字段名          | 说明                                                         | 示例                                                         |
| :-------------- | :----------------------------------------------------------- | :----------------------------------------------------------- |
| Accept          | 能够接受的回应内容类型（Content-Types）                      | Accept: text/plain                                           |
| Accept-Charset  | 能够接受的字符集                                             | Accept-Charset: utf-8                                        |
| Accept-Encoding | 能够接受的编码方式列表                                       | Accept-Encoding: gzip, deflate                               |
| Authorization   | 用于超文本传输协议的认证的认证信息                           | Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==            |
| Cache-Control   | 用来指定在这次的请求/响应链中的所有缓存机制 都必须 遵守的指令 | Cache-Control: no-cache                                      |
| Connection      | 该浏览器想要优先使用的连接类型                               | Connection: keep-alive Connection: Upgrade                   |
| Cookie          | 服务器通过 Set- Cookie （下文详述）发送的一个 超文本传输协议Cookie | Cookie: $Version=1; Skin=new;                                |
| Content-Length  | 以 八位字节数组 （8位的字节）表示的请求体的长度              | Content-Length: 348                                          |
| Content-Type    | 请求体的 多媒体类型                                          | Content-Type: application/x-www-form-urlencoded              |
| Host            | 服务器的域名(用于虚拟主机 )，以及服务器所监听的传输控制协议端口号 | Host: en.wikipedia.org:80 Host: en.wikipedia.org             |
| User-Agent      | 浏览器的浏览器身份标识字符串                                 | User-Agent: Mozilla/5.0 (X11; Linux x86_64; rv:12.0) Gecko/20100101 Firefox/21.0 |
| Origin          | 发起一个针对 跨来源资源共享 的请求                           | Origin: http://www.example-social-network.com                |



### 作用

> https://github.com/linwu-hi/code-interview/issues/154

## 使用场景

通过配合请求头和响应头，可以实现一些常见的功能：

### 1. 协商缓存

通过请求头的`If-Modified-Since`、`If-None-Match`和响应头的`Last-Modified`、`ETag`实现缓存的协商，减少不必要的数据传输。

> If-Modified-Since、If-None-Match、Last-Modified、ETag 都不是http请求头的字段哦！！！那么它们是什么？叫什么？

### 2. 会话状态管理

通过请求头的`Cookie`字段，服务器可以在客户端维护会话状态，实现用户登录状态、购物车、个性化设置等功能。

以上是HTTP常见请求头及其作用的简要介绍，HTTP头字段在HTTP通信中扮演着重要的角色，帮助服务器和浏览器进行信息交换和功能实现。