### 请求｜Option

1 客户端请求消息**客户端发送一个HTTP请求到服务器的请求消息包括以下格式：请求行（request line）、请求头部（header）、空行和请求数据四个部分组成。

```js
GET /hello.txt HTTP/1.1
//HTTP1.0 定义了三种请求方法： GET, POST 和 HEAD 方法。
//HTTP1.1 新增了六种请求方法：OPTIONS、PUT、PATCH、DELETE、TRACE 和 CONNECT 方法。
User-Agent: curl/7.16.3 libcurl/7.16.3 OpenSSL/0.9.7l zlib/1.2.3
Host: www.example.com
Accept-Language: en, mi
```

**request header**

1.Accept

作用： 浏览器端可以接受的媒体类型, 例如： Accept: text/html 代表浏览器可以接受服务器回发的类型为 text/html 也就是我们常说的html文档,如果服务器无法返回text/html类型的数据,服务器应该返回一个406错误(non acceptable)

2.Accept-Encoding：

作用： 浏览器申明自己接收的编码方法，通常指定压缩方法，是否支持压缩，支持什么压缩方法（gzip，deflate），（注意：这不是只字符编码）; 例如： Accept-Encoding: zh-CN,zh;q=0.8

4.Connection

Connection: keep-alive 当一个网页打开完成后，客户端和服务器之间用于传输HTTP数据的TCP连接不会关闭，如果客户端再次访问这个服务器上的网页，会继续使用这一条已经建立的连接

8.Cache-Control

Cache-Control与Expires的作用一致，都是指明当前资源的有效期，控制浏览器是否直接从浏览器缓存取数据还是重新发请求到服务器取数据。

**2 服务器响应消息**HTTP响应也由四个部分组成，分别是：状态行、消息报头、空行和响应正文。

```js
HTTP/1.1 200 OK
// 当前的GMT时间。
Date: Mon, 27 Jul 2009 12:28:53 GMT
//服务器名字。Servlet一般不设置这个值，而是由Web服务器自己设置。
Server: Apache
//文档的最后改动时间。
Last-Modified: Wed, 22 Jul 2009 19:15:56 GMT
// 指纹，比较两次请求是否变化，允许缓存更有效并节省带宽
ETag: "34aa387-d-1568eb00"
Accept-Ranges: bytes
//表示内容长度。只有当浏览器使用持久HTTP连接时才需要这个数据。
Content-Length: 51
//过期时间
Expires：
Set-cookie:
Vary: Accept-Encoding
//用于定义网络文件的类型和网页的编码:
//text/html ： HTML格式 /plain ：纯文本格式 /xml ： XML格式 /png：png图片格式
//application/xhtml+xml ：XHTML格式 /json： JSON数据格式 /pdf：pdf格式
Content-Type: text/plain //Content-Type 标头告诉客户端实际返回的内容的内容类型。一般是指网页中存在的 Content-Type，用于定义网络文件的类型和网页的编码，决定浏览器将以什么形式、什么编码读取这个文件，这就是经常看到一些 PHP 网页点击的结果却是下载一个文件或一张图片的原因。
/*
text/html ： HTML格式
text/plain ：纯文本格式
text/xml ： XML格式
image/jpeg ：jpg图片格式 png gif图片格式
application/xhtml+xml ：XHTML格式
application/xml： XML数据格式
application/atom+xml ：Atom XML聚合格式
application/json： JSON数据格式
application/pdf：pdf格式
application/msword ： Word文档格式
application/octet-stream ： 二进制流数据（如常见的文件下载）
*/
```

**response header**

1.刷新和延时跳转

一秒刷新页面一次 response.setHeader(“refresh”,“1”);

二秒跳到其他页面 response.setHeader(“refresh”,“2;URL=otherPagename”);

2.没有缓存

response.setHeader(“Pragma”, “No-cache”);

response.setHeader(“Cache-Control”, “no-cache”);

3.设置过期的时间期限

response.setDateHeader(“Expires”, System.currentTimeMillis()+自己设置的时间期限);

4.设置请求文件最后修改时间

response.setDateHeader(“Last-Modified”, System.currentTimeMillis());

5.访问别的页面(重定向)

response.setStatus（302）;

response.setHeader(“location”,“url”);

**3 OPTIONS**

在CORS机制一个域名A要访问域名B的服务，在一些特殊的复杂请求下（简单请求并不会进行预请求），浏览器必须先使用OPTIONS请求进行一个预检请求（preflight request）来获取B服务是否允许跨域请求，服务进行确认之后，才会发起真正的HTTP请求。在预检请求的返回中，服务器端也可以通知客户端，是否需要携带身份凭证（包括 Cookies 和 HTTP 认证相关数据）。

简单请求：

1. http方法是以下之一：GET | HEAD | POST
2. HTTP的头信息不超出以下几种字段：

- Accept
- Accept-Language | Content-Language
- Content-Type （需要注意额外的限制）

1. Content-Type 的值为 text/plain

请求情况：

- withCredentials为true不会产生预请求
- 请求头Content-Type为application/json会产生预请求
- 设置了用户自定义请求头会产生预检请求
- delete方法产生预检请求

**预检请求不一定每一次都会产生**

这个因为浏览器会对预检请求进行缓存，同时通过服务器端设置 Access-Control-Max-Age 字段来设置缓存时间。

那么当第一次请求该 URL 时会发出 OPTIONS 请求，浏览器会根据返回的 Access-Control-Max-Age 字段缓存该请求的 OPTIONS 预检请求的响应结果。