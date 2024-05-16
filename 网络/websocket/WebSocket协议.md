https://www.wallarm.com/what/a-simple-explanation-of-what-a-websocket-is#

# WebSocket协议

WebSocket 允许我们创建“实时”应用程序，与传统 API 协议相比，该应用程序速度更快且开销更少。 WebSocket 有时被称为高端计算机通信协议，需要建立客户端-服务器通信通道。在这篇文章中，我们将深入探讨 WebSocket 是什么、它是如何工作的，以及一些应该解决的相关安全问题。

## WebSocket 是如何工作的？ 

按照传统的定义，WebSocket是一种双工协议，主要用于客户端-服务器通信通道。它本质上是双向的，这意味着通信在客户端与服务器之间来回发生。 

使用 WebSocket 开发的连接只要任何参与方中断连接就会持续存在。一旦一方断开连接，另一方将无法进行通信，因为连接会在其前面自动断开。

WebSocket需要[HTTP](https://www.wallarm.com/what/what-is-http-2-and-how-is-it-different-from-http-1)的支持来发起连接。说到它的实用性，当涉及到数据的无缝流和各种不同步流量时，它是现代 Web 应用程序开发的支柱。 

![websocket工作方案](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/63fe488452cc63cf1cb0ae45_148.2.png)

## 为什么需要 Web Socket 以及何时应该避免使用 Web Socket？ 

WebSocket 是一种重要的客户端-服务器通信工具，人们需要充分了解其实用性并避免使用其最大潜力的场景。下一节将对其进行详细解释。

在以下情况下使用 WebSocket：

1. ‍ 开发**实时网络应用程序** 

WebSocket 最常见的用途是实时应用程序开发，其中它有助于在客户端连续显示数据。当后端服务器不断发回这些数据时，WebSocket 允许在已经打开的连接中不间断地推送或传输这些数据。 WebSocket 的使用使此类数据传输变得快速并充分利用了应用程序的性能。 

此类 WebSocket 实用程序的一个现实示例是比特币交易网站。在这里，WebSocket 协助部署的后端服务器向客户端发送数据处理。

1. ‍ 创建**聊天应用程序** 

聊天应用程序开发人员在一次性交换和发布/广播消息等操作中向 WebSocket 寻求帮助。由于使用同一个 WebSocket 连接来发送/接收消息，因此通信变得简单快捷。

1. ‍ 正在**开发游戏应用程序**

在游戏应用程序开发过程中，服务器必须不间断地接收数据，而不要求 UI 刷新。 WebSocket 可以在不影响游戏应用程序 UI 的情况下实现这一目标。

既然已经清楚了应该在哪里使用 WebSocket，请不要忘记了解应该避免使用 WebSocket 的情况，让自己远离大量的操作麻烦。

当需要获取旧数据或仅需要一次性处理数据时，不应该使用 WebSocket。在这些情况下，使用 HTTP 协议是明智的选择。



## WebSocket 与 HTTP 

由于 HTTP 和 WebSocket 都用于应用程序通信，因此人们经常感到困惑，并且很难从这两者中选择一个。看一下下面提到的文本，可以更清楚地了解 HTTP 和 WebSocket。

如前所述，WebSocket 是一种框架式双向协议。相反，HTTP 是一个在 TCP 协议之上运行的单向协议。

由于WebSocket协议能够支持连续的数据传输，因此主要用于实时应用程序开发。 HTTP 是无状态的，用于开发[RESTful](https://www.wallarm.com/what/differences-soap-vs-rest#what_is_rest_)和 SOAP 应用程序。 Soap仍然可以使用HTTP来实现，但是REST被广泛传播和使用。

在 WebSocket 中，通信发生在两端，这使其成为更快的协议。在 HTTP 中，连接是在一端建立的，这使得它比 WebSocket 有点慢。

WebSocket使用统一的TCP连接，需要一方终止连接。在发生这种情况之前，连接将保持活动状态。 HTTP 需要为单独的请求构建不同的连接。请求完成后，连接会自动断开。 

![Websocket 与 HTTP](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/63fe48adb8834a29a618ce84_148.3.png)

## WebSocket 连接是如何建立的？  

该过程从**WebSocket 握手**开始，涉及使用新方案 ws 或 wss。为了快速理解，您可以将它们分别视为 HTTP 和安全 HTTP (HTTPS)。

使用此方案，服务器和客户端应遵循标准 WebSocket 连接协议。 WebSocket 连接的建立从 HTTP 请求升级开始，该请求具有几个标头，例如 Connection: Upgrade、Upgrade: WebSocket、Sec-WebSocket- Key 等。 

以下是建立此连接的方式：

1. **请求**

**连接：升级**标头 表示 WebSocket 握手，而**Sec-WebSocket-Key**具有 Base64 编码的随机值。该值是在每次 WebSocket 握手期间任意生成的。除了上述内容之外，密钥标头也是该请求的一部分。

上面列出的标头组合起来形成 HTTP GET 请求。它将包含类似的数据：

```
获取 ws: //websocketexample.com:8181/HTTP/1.1

主机：本地主机：8181

连接：升级

编译指示：无缓存

缓存控制：无缓存

升级：网络套接字

Sec-WebSocket-版本：13

Sec-WebSocket-Key：b6gjhT32u488lpuRwKaOWs==
```

为了澄清这一点，**Sec-WebSocket-Version**可以解释可供客户端使用的 WebSocket 协议版本。 



1. **响应**

响应标头**Sec-WebSocket-Accept具有****Sec-WebSocket-Key**请求标头中提交的值的热情。这与特定的协议规范相关，并被广泛用于防止误导性信息。换句话说，它增强了 API 安全性并阻止配置不当的服务器在应用程序开发中造成错误。 

先前发送的请求成功后，将收到类似于以下文本序列的响应：

```
HTTP/ 1 . 1 101切换协议 

升级：网络套接字

连接：升级

Sec-WebSocket-接受：rG8wsswmHTJ85lJgAE3M5RTmcCE=
```

### 如何保护您的 WebSocket API

<iframe src="https://www.youtube.com/embed/H3XHz6_rolk?origin=https://www.wallarm.com" width="100%" loading="lazy" frameborder="0" scrolling="0" class="whats_template_iframe" style="box-sizing: border-box; width: 748.8px; height: 400px; margin: 0px auto 30px; display: block;"></iframe>

## WebSocket协议 

WebSocket 协议是一种框架协议，涉及每个数据的各种离散卡盘。它还部署帧类型、数据部分和有效负载长度以确保正常运行。要详细了解 WebSocket 协议，了解其构建模块至关重要。下面提到了最重要的部分。

- **Fin Bit**是 WebSocket 的基本位。当开始连接时它将自动生成。 
- ‍ RSV1 **、RSV2、RSV3 位**是为进一步的机会保留的位。 
- **操作码**是每个帧的一部分，解释解释特定帧的有效负载数据的过程。一些常见的操作码值为 0x00、0x0、0x02、0x0a、0x08 等。 
- 当一位设置为 1 时， 掩码**位激活。**

WebSocket 要求对所有有效负载数据使用客户端选择的随机密钥。屏蔽密钥与有效负载数据结合时，有助于 XOR 操作中的有效负载数据共享。这样做对于应用程序[API 安全性](https://www.wallarm.com/what/api-security-tutorial)非常重要，因为屏蔽可以防止缓存误解或缓存中毒。 

现在让我们详细了解其关键组成部分：

**有效负载长度**

这用于 WebSocket 中有效负载数据的总长度编码。当编码数据长度小于126字节时，显示Payload len。一旦有效负载数据长度超过 126 字节，就会使用附加字段来描述有效负载长度。 

**掩蔽键**

客户端发送到服务器的每个帧都用 32 位值进行掩码。当掩码位为 1 时，显示掩码键。如果掩码位为 0，则掩码键为零。 

**有效载荷数据**

各种任意应用数据和扩展数据被称为有效负载数据。客户端和服务器使用此数据进行协商，并用于早期的 WebSocket 握手。 

‍

API 安全检查表

不确定您对 API 安全性的立场如何？该清单可以作为工程和安全团队寻求保持 API 合规性和安全性的起点。

[下载免费清单](https://www.wallarm.com/resources/api-security-checklist?utm_source=what)



## 结论 

WebSocket 支持客户端和服务器之间的双向交互式通信会话，而无需轮询服务器以获得答复，从而提供了比其他协议更高的速度和实际功能。但与所有应用程序一样，使用 WebSocket 需要仔细的编程实践和运行时保护，以防范一组独特的威胁。与传统方法相比，这种 API 深度防御策略将改善对用户和组织的保护。

并且不要忘记安全性，尝试 Wallarm 的可靠解决方案 - [API 安全平台](https://www.wallarm.com/product/api-security-platform)
