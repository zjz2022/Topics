https://www.quora.com/How-does-pusher-work-Could-someone-explain-the-architecture-too-if-possible

底层技术使用 websockets 协议在浏览器和服务器之间实现全双工连接。 （这是维基百科的定义，所以我将简化它）。

**标准**
在浏览器和服务器之间的标准通信中，浏览器总是向服务器发起通信以请求特定资源。服务器处理请求并发回响应（HTML、FILE）等并关闭连接。正如您所看到的，除非客户端发起请求，否则服务器无法知道其客户端。这里使用的协议是标准的HTTP。

**全双工连接**
如果服务器可以将数据推送到客户端而不需要客户端请求任何内容，该怎么办？此行为是您在手机上收到的推送通知的典型行为，包括。短信

为了实现这一点，服务器需要知道客户端（其 IP）。此外，它需要打开与客户端的连接才能发送消息。问题就出在这里。服务器无法请求在客户端上打开连接，因为它基本上会避开所有安全性（美国国家安全局的梦魇）。

因此，我们保持连接打开（长连接）。基本上，当浏览器使用 websocket 打开到服务器的连接时，服务器通过响应（握手）提供详细信息，并且连接保持打开状态。但是传统服务器无法在内存中保留那么多打开的连接，因为大多数传统服务器使用每个请求线程模型，并且只有很少的 100 个连接，就可能使服务器饱和。

这就是非阻塞 IO Web 服务器发挥作用的地方。这些服务器可以管理与其客户端的数百个开放连接，*而无需*消耗大量资源（CPU/内存）

Node.js 是此类服务器的完美示例。它是一个 IO 事件驱动服务器，使用 V8 来快速执行 JavaScript。它是一个单线程服务器，每当需要执行 IO 相关任务时，它就会屈服于其他请求。当有数据要从打开的套接字（Linux 套接字）读取时，它使用 libevent（操作系统内核）来获取通知。

Node 中有很多支持 websocket 的库，它们使用 webocket 协议在客户端/服务器之间进行通信。

使用套接字/节点的快速示例（取自[socket.io](http://socket.io/)提供 websocket 实现的站点)

//server
var io = require(' [socket.io](http://socket.io/)').听(80);
io.sockets.on('connection', function (socket) {
socket.emit('news', { hello: 'world' });
socket.on('我的其他事件', function (data) {
console.log （数据）;
}）;
}）;

//客户端
<script src="/ [socket.io](http://socket.io/)/socket.io[​](http://socket.io/).js"></script>
<script>
var socket = io.connect(' [http://localhost](http://localhost/)'）；
socket.on('新闻', function (data) {
console.log(data);
socket.emit('我的其他事件', { my: '数据' });
});
</脚本>

从上面的示例中，服务器只需侦听“连接”事件，然后将事件发送回客户端。 （握手）
客户端正在侦听该事件，然后将另一个事件发回服务器。 （实际消息传输）

更详细的规范请参见[https://github.com/LearnBoost/socket.io](http://socket.io/)-规格

使用非阻塞服务器时需要注意一些事项。对于初学者来说，您不能在同一线程中执行计算工作，例如计算 10000 的斐波那契数列。由于它是单线程的，您需要将其卸载到其他进程。
您的数据库需要支持相同的非阻塞机制。所以你不能使用传统数据库（除非你有支持的驱动程序）。您必须使用 mongodb、couchdb，甚至更好地使用 redis 进行发布/订阅，并使用 mongo 作为数据存储。

总而言之，
1.为了能够将消息推送到客户端，您必须使用 websockets
2.您需要一个可以处理 100 个打开连接而不消耗大量资源的服务器，即非阻塞单线程服务器
3.您有使用一些支持websocket传输协议的socket库

最后，请注意浏览器对 Websocket 的支持。该网站保持最新状态（http://caniuse.com/websockets）
