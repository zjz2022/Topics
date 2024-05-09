https://vishalrana9915.medium.com/understanding-websockets-in-depth-6eb07ab298b3

webSockets 是一种功能强大的通信协议，可通过单个 TCP 连接在客户端和服务器之间实现双向实时通信。在本博客中，我们将介绍您需要了解的有关 Web 套接字的所有内容。

Web 套接字允许我们创建“实时”应用程序，与传统 API 协议相比，该应用程序速度更快且开销更少

Web 套接字使用`DUPLEX`客户端和服务器之间进行通信的协议。

**下面是Websocket的一些要点：**

- Web 套接字本质上是双向的。
- 只要任何参与者（客户端或服务器）关闭连接，使用 Web 套接字开发的连接就会持续存在。
- Web-socket 使用 HTTP 来发起连接。

# 为什么使用 WEB-Socket？

Websocket 可靠且易于使用，对于需要实时性的系统来说是一个福音。假设您正在开发一个应用程序，需要实时显示不断变化的数据。`You first choice should be implementation of web sockets, There are other way as well, but that will increase the overhead on your servers and eventually you have to find some other reliable way to do it.`

因此，为了节省开销，您可以考虑使用 Websocket。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1HRWVGIw84vgM2UofVE6FrA.png)

一旦客户端和服务器之间的握手建立，连接将保持持久并持续到任何部分断开连接（**WEBSOCKET**）

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1iqjRGCjIXKahgjvYbi1XEw.png)

每个请求都会产生新的 TCP 连接，收到响应后，连接将被终止（**HTTP**）

## Websocket 的一般用例可以是：

- 证券交易所（实时更新股票价格、订单簿等）
- 聊天应用程序（因为发送和接收消息应该很快）
- 需要实时更改的 Web 应用程序
- 博彩业
- 以及更多

# 网络套接字如何工作？

Websocket 的工作原理是在客户端和服务器之间建立连接。为了启动连接，客户端发送带有升级标头的 http GET 请求，以便服务器知道这是一个升级请求，如果服务器支持升级属性，则返回状态 101，如果不支持，则返回错误代码。

如果服务器返回 101 以外的任何代码，客户端必须结束连接。

Websocket 被认为是因为它们在客户端和服务器之间建立了单个连接，并且每次我们必须通信时都没有与服务器进行握手的开销。

## Web 套接字中的连接设置

连接设置从客户端发起的握手请求开始。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1-3IvoAwQ-iny8f_sPtvHGw.png)

客户端发起握手

客户端需要发送某些标头，以便告诉服务器我们要创建 Websocket 连接。由于请求是使用 http GET 方法发出的。

**客户端请求标头如下所示：**

握手中的标头字段可以由客户端以任何顺序发送。

```
        GET  /chat  HTTP/1.1
        主机： server.example.com
        升级： websocket
        连接： 升级
        Sec-WebSocket-Key： dGhlIHNhbXBsZSBub25jZQ==
        来源： http://example.com 
        Sec-WebSocket-协议： 聊天、 超级聊天
        Sec-WebSocket-版本： 13
```

- 我们正在`GET`通过 http 发出请求。 （版本需要大于或等于1.1）
- `Host`name 添加在标头中，以便客户端和服务器验证它们是否同意使用哪个主机。
- 和标`Connection`头`Upgrade`字段完成 HTTP
  升级。
- `Sec-WebSocket-Protocol`由客户端发送以指定要使用的协议（可选）
- `Sec-WebSocket-Version`发送以指示客户端可以接受哪些子协议（基于 WebSocket 协议的应用程序级协议）（可选）
- `Origin`header 用于防止脚本在 Web 浏览器中使用 WebSocket API 未经授权地跨域使用 WebSocket 服务器。服务器将只接受来自列出的来源的连接。
- `Sec-WebSocket-key`是通过随机选择 16 字节值作为随机数生成的 Base64 编码值。

当服务器收到这些请求时，它必须验证并向客户端做出响应，表明它已收到握手请求，并且它们可以形成连接。

**服务器将做以下事情**

- 为了证明已收到握手，服务器必须`Sec-WebSocket-key`从请求标头中获取 ，将其与 组合`Globally Unique Identifier`，创建该串联字符串的 SHA-1 哈希值。
- 然后它使用 base64 对该字符串进行编码并作为服务器握手返回。

**来自服务器的握手如下所示：**

```
        HTTP/1.1  101 切换 协议
        升级： websocket
        连接： 升级
        Sec-WebSocket-Accept： s3pPLMBiTxaQ9kYGzzhZRbK+xOo= 
        Sec-WebSocket-Protocol： 聊天
```

- 响应`101 status code`，除 101 之外的任何代码都会导致错误，并意味着 websocket 握手未完成。
- `Connection`和字段`Upgrade`表示HTTP 升级。
- `Sec-WebSocket-Accept`表示服务器是否愿意接受连接请求。如果此字段存在，则此字段包含`Sec-WebSocket-key`和`Globally Unique Identifier`组合的 Base64 编码哈希值。
- `Sec-WebSocket-Protocol`是可选字段，表示服务器选择哪种协议进行通信。

这些字段由脚本页面的 WebSocket 客户端检查。如果值与`Sec-WebSocket-Accept`预期值不匹配、缺少`header field`或 ，`HTTP status code is not 101`则将不会建立连接，并且不会发送 WebSocket 帧。

**Websocket 有默认的 URI 格式**

```
ws-URI = "ws:"  "//"主机 [ ":"端口 ] 路径 [ "?"查询] 
wss-URI = “wss：”  “//”主机[ “：”端口]路径[ “？”询问 ]
```

端口组件是可选的，默认端口 80 用于`ws`，443 用于`wss`。

`wss is used as a secure URI`设置安全标志并在服务器和客户端之间完成 TLS 握手以实现安全通信。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1qjjsNnL6VRrlCBHW_AEMAw.png)

## **WebSocket 框架**

WebSocket 中的帧是客户端和服务器之间交换数据的基本单位。在网络套接字协议中，数据使用一系列帧来传输。客户端在将帧发送到服务器之前必须对其进行屏蔽，如果服务器收到未屏蔽的帧，则服务器应关闭连接。

> 在这种情况下，服务器可以发送状态码为 1002（协议错误）的 Close 帧。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1mKMUtnunbxm3bWMHLWQNbg.png)

Websocket框架

- FIN（1 位）— 指示这是否是消息中的最后一个片段。值1代表是。第一个片段也可以是最终片段
- `RSV1`，`RSV2, RSV3`（每个 1 位）— 这必须是零值。如果这是一个非零值，则必须定义一个扩展来定义非零值的含义。
- `Opcode(4 bits)`— 它定义有效负载数据，它必须具有以下值之一。

```
      %x0 表示连续帧

      * %x1 表示文本帧

      * %x2 表示二进制帧

      * %x3-7保留用于进一步的非控制帧

      * %x8 表示连接关闭*

       %x9 表示 ping 

      * %xA 表示a pong 

      * %xB-F 保留用于进一步的控制帧
```

- `Mask (1 bit)`— 它定义是否使用标记，如果设置为 1，则还必须定义一个屏蔽键。将用于解密“有效负载数据”，每个客户端都应将标记值发送为 1 并发送屏蔽密钥。
- `Masking-key(0 or 4 bytes)`— 使用此密钥对从客户端发送的每个帧进行屏蔽。屏蔽键是 32 位值。
- `Payload length (7 bits, 16 bits, 64 bits) `— “有效负载数据”的长度，以字节为单位：如果 0–125，则为有效负载长度。如果是 126，则接下来解释为 16 位无符号整数的 2 个字节是有效负载长度。如果是 127，则接下来的 8 个字节解释为 64 位无符号整数（最高有效位必须为 0）是有效负载长度。
- `Payload Data`—“有效负载数据”定义为与“应用程序数据”连接的“扩展数据”。

> 最小的有效**完整**WebSocket 消息是服务器发送的两字节即关闭消息，不带任何消息。
>
> 对于负载大于 16KB 的客户端到服务器消息，最长的可能标头为 14 字节：长度为 8+1 字节，掩码为 4 字节（加上第一个 fin/type 字节）。

## 碎片

在 WebSocket 中发送消息时，消息通常会被分割成多个帧，特别是当消息很大或很复杂时。**这就是碎片的用武之地**。片段允许将消息分割成更小的片段，每个片段作为单独的帧发送。

当消息被分割成片段时，除了序列中的最后一个帧之外，每个片段的 FIN 位都设置为 0。 FIN 位指示当前帧是否是消息中的最后一帧，或者是否会跟随更多帧。

如果FIN位设置为0，则意味着有更多帧到来，接收方应在处理消息之前继续等待更多帧。

当发送消息的最后一个片段时，发送时 FIN 位设置为 1。这向接收方发出信号，表明这是消息中的最后一个帧。

## **从概念上讲，WebSocket 实际上只是 TCP 之上的一层，它 执行以下操作：**

- *为浏览器添加基于 Web 源的安全模型。*
- *添加寻址和协议命名机制，以支持
  一个端口上的多个服务和一个 IP
  地址上的多个主机名*
- *在 TCP 之上分层成帧机制，以恢复
  TCP 所基于的 IP 数据包机制，但没有长度限制*
- *包括额外的带内关闭握手，旨在
  在代理和其他中介存在的情况下工作*

# WEB Socket 与 HTTP 有何不同？

Http 对单独的请求使用不同的连接。它增加了服务器的负载，因为服务器必须为每个请求创建新的握手。一旦请求完成，连接就会关闭。另一方面，只要双方不中断，Web 套接字连接就会持续存在。

> WebSocket 协议是一个独立的基于 TCP 的协议。它与 HTTP 的唯一关系是 HTTP 服务器将其握手解释为升级请求。

> 它还以这样的方式设计，即通过使其握手成为有效的 HTTP 升级请求，其服务器可以与 HTTP 服务器共享端口。

WebSocket 协议的设计原则是应该
有**最小的帧**（唯一存在的帧是使协议基于帧而不是基于流，并支持 Unicode 文本和二进制帧之间的区别）。

预期**元数据将由应用层分层在 WebSocket 之上**，就像元数据由应用层（例如 HTTP）**分层在 TCP 之上一样。**

> 默认情况下，WebSocket 协议使用端口 80 进行常规 WebSocket
> 连接，使用端口 443 进行通过
> 传输层安全 (TLS)建立隧道的 WebSocket 连接

## 结论

Websocket 在双向通信和以最小开销进行读取时间更新方面非常强大。碎片化使其更加强大且重量轻。您应该了解 Web 套接字协议及其基本原理及其工作原理。

我希望这个博客能让您了解它是如何工作的！

阅读愉快。
