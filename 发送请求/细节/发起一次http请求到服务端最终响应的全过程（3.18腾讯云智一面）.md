[前言](https://zhuanlan.zhihu.com/p/161560683/edit#前言)

[概述](https://zhuanlan.zhihu.com/p/161560683/edit#概述)

[过程详解](https://zhuanlan.zhihu.com/p/161560683/edit#过程详解)

[一、DNS 解析](https://zhuanlan.zhihu.com/p/161560683/edit#一、DNS解析)

[二、TCP 三次握手](https://zhuanlan.zhihu.com/p/161560683/edit#二、TCP三次握手)

[三、 发起 HTTP 请求](https://zhuanlan.zhihu.com/p/161560683/edit#三、 发起 HTTP 请求)

[四、服务器响应 HTTP 请求](https://zhuanlan.zhihu.com/p/161560683/edit#四、服务器响应HTTP请求)

[五、浏览器解析](https://zhuanlan.zhihu.com/p/161560683/edit#五、浏览器解析)

[六、浏览器进行页面渲染](https://zhuanlan.zhihu.com/p/161560683/edit#六、浏览器进行页面渲染)

[七、服务器关闭 TCP 连接](https://zhuanlan.zhihu.com/p/161560683/edit#七、服务器关闭TCP连接)

## 1、前言

当我们在浏览器栏输入：[https://blog.csdn.net/dianxin113](https://link.zhihu.com/?target=https%3A//blog.csdn.net/dianxin113) 的时候，具体发生了什么呢？这个请求是怎么到达服务器及返回结果的呢？

## 2、概述

1. **浏览器进行 DNS 域名解析，得到对应的 IP 地址**
2. **根据这个 IP，找到对应的服务器建立连接（三次握手）**
3. **建立 TCP 连接后发起 HTTP 请求（一个完整的 http 请求报文）**
4. **服务器响应 HTTP 请求，浏览器得到 html 代码（服务器如何响应）**
5. **浏览器解析 html 代码，并请求 html 代码中的资源（如 js、css、图片等）**
6. **浏览器对页面进行渲染呈现给用户**
7. **服务器关闭 TCP 连接（四次挥手）**

## **3、过程详解**

### 一、DNS 解析

1. 首先会搜索浏览器自身的 DNS 缓存（缓存时间比较短，大概只有 1 分钟，且只能容纳 1000 条缓存）
2. 如果浏览器自身的缓存里面没有找到，那么浏览器会搜索系统自身的 DNS 缓存
3. 如果还没有找到，那么尝试从 hosts 文件里面去找
4. 在前面三个过程都没获取到的情况下，浏览器就会发起一个 DNS 的系统调用，就会向本地配置的首选 DNS 服务器（一般是电信运营商提供的，也可以使用像 Google 提供的 DNS 服务器）发起域名解析请求（通过的是 UDP 协议向 DNS 的 53 端口发起请求，这个请求是递归的请求，也就是运营商的 DNS 服务器必须得提供给我们该域名的 IP 地址）

具体过程如下

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-e7bd4f3b342fe452a833f4c0a082723a_720w.webp)

_DNS 优化两个方面：DNS 缓存、DNS 负载均衡_

### 二、TCP 三次握手

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-b4cf470d3b83a333e5b3a265fa68f057_720w.webp)

三次握手完成之后这个 TCP 连接就进入 Established 状态，就可以发起 http 请求了。

**【问题 1】：TCP 为什么需要 3 次握手？**

2 个计算机通信是靠协议（目前流行的 TCP/IP 协议）来实现,如果 2 个计算机使用的协议不一样，那是不能进行通信的，所以这个 3 次握手就相当于试探一下对方是否遵循 TCP/IP 协议，协商完成后就可以进行通信了，当然这样理解不是那么准确。

**【问题 2】：为什么 HTTP 协议要基于 TCP 来实现？**

目前在 Internet 中所有的传输都是通过 TCP/IP 进行的，HTTP 协议作为 TCP/IP 模型中应用层的协议也不例外，TCP 是一个端到端的可靠的面向连接的协议，所以 HTTP 基于传输层 TCP 协议不用担心数据的传输的各种问题。

### 三、 发起 HTTP 请求

HTTP 是一个客户端和服务器端请求和应答的标准（TCP）。客户端是终端用户，服务器端是网站。通过使用 Web 浏览器、网络爬虫或者其它的工具，客户端发起一个到服务器上指定端口（默认端口为 80）的 HTTP 请求。

通俗来讲，他就是计算机通过网络进行通信的规则，是一个基于请求与响应，无状态的，应用层的协议，常基于 TCP/IP 协议传输数据。目前任何终端（手机，笔记本电脑。。）之间进行任何一种通信都必须按照 Http 协议进行，否则无法连接。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-2c46004ed2bcc2ed267c8a563fe28d24_720w.webp)

一个 HTTP 请求报文由请求行（request line）、请求头部（header）、空行和请求数据 4 个部分组成，下图给出了请求报文的一般格式。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-ebb1db1a28e2c5e23447ac08d231c233_720w.webp)

- **请求行**：用于描述客户端的请求方式（GET/POST 等），请求的资源名称(URL)以及使用的 HTTP 协议的版本号。
  它们用空格分隔。例如，GET /index.html HTTP/1.1。
  HTTP 协议的请求方法有 GET、POST、HEAD、PUT、DELETE、OPTIONS、TRACE、CONNECT。
  GET 是最常见的一种请求方式，当客户端要从服务器中读取文档时，当点击网页上的链接或者通过在浏览器的地址栏输入网址来浏览网页的，使用的都是 GET 方式。GET 方法要求服务器将 URL 定位的资源放在响应报文的数据部分，回送给客户端。 POST 方法可以允许客户端给服务器提供信息较多。POST 方法将请求参数封装在 HTTP 请求数据中，以名称/值的形式出现，可以传输大量数据，这样 POST 方式对传送的数据大小没有限制，而且也不会显示在 URL 中，对隐私数据保密性更好。 HEAD 就像 GET，只不过服务端接受到 HEAD 请求后只返回响应头，而不会发送响应内容。当我们只需要查看某个页面的状态的时候，使用 HEAD 是非常高效的，因为在传输的过程中省去了页面内容。
- **请求头**：请求头部由关键字/值对组成，每行一对，关键字和值用英文冒号“:”分隔。请求头部通知服务器有关于客户端请求的信息，典型的请求头有：
  User-Agent：产生请求的浏览器类型。 Accept：客户端可识别的内容类型列表。 Host：请求的主机名，允许多个域名同处一个 IP 地址，即虚拟主机。 Connection 告诉服务器支持 keep-alive 特性 Cookie 每次请求时都会携带上 Cookie 以方便服务器端识别是否是同一个客户端
- **空行**：最后一个请求头之后是一个空行，发送回车符和换行符，通知服务器以下不再有请求头。
- **请求数据**：当使用 POST 等方法时，通常需要客户端向服务器传递数据。这些数据就储存在请求正文中（GET 方式是保存在 url 地址后面，不会放到这里）。POST 方法适用于需要客户填写表单的场合。与请求数据相关的最常使用的请求头是 Content-Type 和 Content-Length。

**【问题 3】：那什么是 URL、URI、URN？**

URI Uniform Resource Identifier 统一资源标识符
URL Uniform Resource Locator 统一资源定位符
URN Uniform Resource Name 统一资源名称

URL 和 URN 都属于 URI，为了方便就把 URL 和 URI 暂时都通指一个东西

### 四、服务器响应 HTTP 请求

接收到 HTTP 请求之后，就轮到负载均衡登场了，它位于网站的最前端，把短时间内较高的访问量分摊到不同机器上处理。负载均衡方案有软件、硬件两种。软件方案常见的就是 NGINX 了。

Nginx 的作用主要有两个 1，处理静态文件请求，2 转发请求给后端服务器。然后后端服务器查询数据库返回数据。数据返回给客户端仍然通过 HTTP 协议传输。

HTTP 响应报文主要由状态行、响应头部、空行以及响应数据组成。

1.**状态行**：由 3 部分组成，分别为：协议版本，状态码，状态码描述。

其中协议版本与请求报文一致，状态码描述是对状态码的简单描述，所以这里就只介绍状态码。

一些常见的状态码如下：

状态代码为 3 位数字。

1xx：指示信息–表示请求已接收，继续处理。 2xx：成功–表示请求已被成功接收、理解、接受。 3xx：重定向–要完成请求必须进行更进一步的操作。 4xx：客户端错误–请求有语法错误或请求无法实现。 5xx：服务器端错误–服务器未能实现合法的请求。

**2.响应头**：响应头用于描述服务器的基本信息，以及客户端如何处理数据

**3.空格：**CRLF（即 \r\n）分割

**4.消息体**：服务器返回给客户端的数据

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-d01ab5acfcc075e489213805e03a064f_720w.webp)

上面的 HTTP 响应中，响应头中的 Content-Length 同样用于表示消息体的字节数。Content-Type 表示消息体的类型，通常浏览网页其类型是 HTML，当然还会有其他类型，比如图片、视频等。

### 五、浏览器解析

浏览器拿到 index.html 文件后，就开始解析其中的 html 代码，遇到 js/css/image 等静态资源时，就向服务器端去请求下载（会使用多线程下载，每个浏览器的线程数不一样），这个时候就用上 keep-alive 特性了，建立一次 HTTP 连接，可以请求多个资源，下载资源的顺序就是按照代码里的顺序，但是由于每个资源大小不一样，而浏览器又多线程请求请求资源，所以从下图看出，这里显示的顺序并不一定是代码里面的顺序。

浏览器在请求静态资源时（在未过期的情况下），向服务器端发起一个 http 请求（询问自从上一次修改时间到现在有没有对资源进行修改），如果服务器端返回 304 状态码（告诉浏览器服务器端没有修改），那么浏览器会直接读取本地的该资源的缓存文件。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-3c8cbe9c33997a0e3e2d5da46d8a5376_720w.webp)

### 六、浏览器进行页面渲染

浏览器渲染页面详细过程（3.22 快手一面+4.2 美团二面）

最后，浏览器利用自己内部的工作机制，把请求的静态资源和 html 代码进行渲染，渲染之后呈现给用户，浏览器是一个边解析边渲染的过程。

首先浏览器解析 HTML 文件构建 DOM 树，然后解析 CSS 文件构建渲染树，等到渲染树构建完成后，浏览器开始布局渲染树并将其绘制到屏幕上。

这个过程比较复杂，涉及到两个概念: reflow(回流)和 repain(重绘)。DOM 节点中的各个元素都是以盒模型的形式存在，这些都需要浏览器去计算其位置和大小等，这个过程称为 relow;当盒模型的位置,大小以及其他属性，如颜色,字体,等确定下来之后，浏览器便开始绘制内容，这个过程称为 repain。

页面在首次加载时必然会经历 reflow 和 repain。reflow 和 repain 过程是非常消耗性能的，尤其是在移动设备上，它会破坏用户体验，有时会造成页面卡顿。所以我们应该尽可能少的减少 reflow 和 repain。

JS 的解析是由浏览器中的 JS 解析引擎完成的。JS 是单线程运行，JS 有可能修改 DOM 结构，意味着 JS 执行完成前，后续所有资源的下载是没有必要的，所以 JS 是单线程，会阻塞后续资源下载。

### 七、服务器关闭 TCP 连接

一般情况下，一旦 Web 服务器向浏览器发送了请求数据，它就要关闭 TCP 连接。

而关闭 TCP 连接就需要进行四次挥手了。

中断连接端可以是客户端，也可以是服务器端。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-728406429bada28774da09ea7581ea01_720w.webp)

- 第一次挥手：客户端发送一个 FIN=M，用来关闭客户端到服务器端的数据传送，客户端进入 FIN_WAIT_1 状态。意思是说"我客户端没有数据要发给你了"，但是如果你服务器端还有数据没有发送完成，则不必急着关闭连接，可以继续发送数据。
- 第二次挥手：服务器端收到 FIN 后，先发送 ack=M+1，告诉客户端，你的请求我收到了，但是我还没准备好，请继续你等我的消息。这个时候客户端就进入 FIN_WAIT_2 状态，继续等待服务器端的 FIN 报文。
- 第三次挥手：当服务器端确定数据已发送完成，则向客户端发送 FIN=N 报文，告诉客户端，好了，我这边数据发完了，准备好关闭连接了。服务器端进入 LAST_ACK 状态。
- 第四次挥手：客户端收到 FIN=N 报文后，就知道可以关闭连接了，但是他还是不相信网络，怕服务器端不知道要关闭，所以发送 ack=N+1 后进入 TIME_WAIT 状态，如果 Server 端没有收到 ACK 则可以重传。服务器端收到 ACK 后，就知道可以断开连接了。客户端等待了 2MSL 后依然没有收到回复，则证明服务器端已正常关闭，那好，我客户端也可以关闭连接了。最终完成了四次握手。

上面是一方主动关闭，另一方被动关闭的情况，实际中还会出现同时发起主动关闭的情况，也是通过四次握手。

**【问题 4】为什么连接的时候是三次握手，关闭的时候却是四次握手？**

答：因为当 Server 端收到 Client 端的 SYN 连接请求报文后，可以直接发送 SYN+ACK 报文。其中 ACK 报文是用来应答的，SYN 报文是用来同步的。但是关闭连接时，当 Server 端收到 FIN 报文时，很可能并不会立即关闭 SOCKET，所以只能先回复一个 ACK 报文，告诉 Client 端，"你发的 FIN 报文我收到了"。只有等到我 Server 端所有的报文都发送完了，我才能发送 FIN 报文，因此不能一起发送。故需要四步握手。

**【问题 5】为什么 TIME_WAIT 状态需要经过 2MSL(最大报文段生存时间)才能返回到 CLOSE 状态？**

答：虽然按道理，四个报文都发送完毕，我们可以直接进入 CLOSE 状态了，但是我们必须假象网络是不可靠的，有可以最后一个 ACK 丢失。所以 TIME_WAIT 状态就是用来重发可能丢失的 ACK 报文。在 Client 发送出最后的 ACK 回复，但该 ACK 可能丢失。Server 如果没有收到 ACK，将不断重复发送 FIN 片段。所以 Client 不能立即关闭，它必须确认 Server 接收到了该 ACK。Client 会在发送出 ACK 之后进入到 TIME_WAIT 状态。Client 会设置一个计时器，等待 2MSL 的时间。如果在该时间内再次收到 FIN，那么 Client 会重发 ACK 并再次等待 2MSL。所谓的 2MSL 是两倍的 MSL(Maximum Segment Lifetime)。MSL 指一个片段在网络中最大的存活时间，2MSL 就是一个发送和一个回复所需的最大时间。如果直到 2MSL，Client 都没有再次收到 FIN，那么 Client 推断 ACK 已经被成功接收，则结束 TCP 连接。

然而如果浏览器或者服务器在其头信息加入了这行代码：

Connection:keep-alive

TCP 连接在发送后将仍然保持打开状态，于是，浏览器可以继续通过相同的连接发送请求。保持连接节省了为每个请求建立新连接所需的时间，还节约了网络带宽。

自此一次完整的 HTTP 事务宣告完成。
