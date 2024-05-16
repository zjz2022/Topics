## websocket升级流程（怎么建立WebSocket连接）（小林coding）

**解析**

> 属于次高频考题：属于自产自产《[大厂后端Top100面试题讲解](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483813&idx=1&sn=d76cd77235886194667bb81cd1920b64&scene=21#wechat_redirect)》
>
> 所属专项：计算机网络｜HTTP
>
> 专项考察占比：
>
> 【**计算机网络**】面试中考察计算机网络的比率：[大厂：11%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483843&idx=1&sn=7c7bd2c6b906c0ab38c868b84b88da56&chksm=c3585cacf42fd5ba38542da8ac77a7e731b486243c4aaf249d46d91b6c5e0e4e945f9729ad98&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)｜ [腾讯：17%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483854&idx=1&sn=668db515e36dcdc8c180b11abef66e72&chksm=c3585ca1f42fd5b7d399b32a3c909b61a16f13c3bdb6ef6e0461470acdd3955c33a8a0d46120&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)｜ [阿里：7%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483854&idx=1&sn=668db515e36dcdc8c180b11abef66e72&chksm=c3585ca1f42fd5b7d399b32a3c909b61a16f13c3bdb6ef6e0461470acdd3955c33a8a0d46120&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)
>
> 【**计算机网络-HTTP**】面试考察计网时问HTTP问题的比率：[35%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483843&idx=1&sn=7c7bd2c6b906c0ab38c868b84b88da56&chksm=c3585cacf42fd5ba38542da8ac77a7e731b486243c4aaf249d46d91b6c5e0e4e945f9729ad98&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)

**参考口述回答：**

> WebSocket连接建立的过程：
>
> 1. 客户端发起连接请求
>
> 首先，客户端（如Web浏览器）会向服务器发起一个HTTP请求，意在建立一个WebSocket连接。这个HTTP请求不同于常规的请求，因为它包含了特殊的头信息，用以表明客户端希望将连接从HTTP升级到WebSocket。
>
> 1. 包含特殊的头信息
>
> 在HTTP请求头中，必须包含以下关键信息：
>
> - `Upgrade: websocket`：这个头部告诉服务器，客户端希望将连接升级到WebSocket协议。
> - `Connection: Upgrade`：此头部表示客户端要求服务器升级当前的HTTP连接到WebSocket连接。
> - `Sec-WebSocket-Key`：一个由客户端随机生成的密钥，用于服务器在响应中生成对应的`Sec-WebSocket-Accept`值，以证明它理解了WebSocket协议。
> - `Sec-WebSocket-Version`：支持的WebSocket协议版本，通常是13。
>
> 可能还包括其他一些可选的头信息，如子协议、扩展等。
>
> 1. 服务器响应并升级连接
>
> 服务器在接收到这个特殊的HTTP请求后，会检查请求头中的信息，确认是否支持并愿意进行连接升级。如果一切正常，服务器会返回一个HTTP响应，状态码为`101 Switching Protocols`，表示服务器同意将连接从HTTP升级到WebSocket。
>
> 服务器的响应中会包含以下头部信息：
>
> - `Upgrade: websocket`：确认连接已经升级到WebSocket。
> - `Connection: Upgrade`：表示连接已被升级。
> - `Sec-WebSocket-Accept`：根据客户端提供的`Sec-WebSocket-Key`计算得出的值，用于验证服务器的响应。
>
> 1. 完成握手并建立WebSocket连接
>
> 当客户端接收到服务器的`101 Switching Protocols`响应后，WebSocket握手过程就完成了。此时，连接已经从HTTP连接正式升级为WebSocket连接。
>
> 1. 进行数据传输
>
> 一旦WebSocket连接建立成功，客户端和服务器就可以通过这个连接进行双向的、全双工的数据传输了。这意味着客户端和服务器可以同时发送和接收消息。
>
> 1. 关闭WebSocket连接
>
> 当数据传输完成或者任何一方决定关闭连接时，会发送一个WebSocket关闭帧来通知对方关闭连接。这样，WebSocket连接就会被优雅地关闭。
>
> 总的来说，WebSocket连接的建立过程是一个从HTTP协议升级到WebSocket协议的过程，它允许客户端和服务器之间进行实时、双向的通信。

**推荐学习资料：**

《小林Coding》｜图解网络：怎么建立WebSocket连接？