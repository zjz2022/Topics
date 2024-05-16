https://www.padok.fr/en/blog/http-request

- [HTTP 请求期间会发生什么？](https://www.padok.fr/en/blog/http-request)

发布于 2023 年 4 月 6 日，更新于 2023 年 12 月 21 日。

## 这是许多 Python Web 开发人员在生活中可能使用过的一个函数：`requests.get`.

在本文中，我们将尝试了解此命令内部以及更一般的 HTTP 请求期间正在执行的操作。

概括

1. [在我们开始之前](https://www.padok.fr/en/blog/http-request#Before_we_start)
2. [启动脚本](https://www.padok.fr/en/blog/http-request#Launching_the_script)
3. [插座的打开](https://www.padok.fr/en/blog/http-request#Opening_of_the_socket)
   1. [确定服务器的 IP 地址和端口](https://www.padok.fr/en/blog/http-request#Determining_the_IP_address_and_port_of_the_server)
      1. [使用 DNS 请求确定 IP 地址](https://www.padok.fr/en/blog/http-request#Determining_the_IP_address_using_a_DNS_request)
      2. [确定端口](https://www.padok.fr/en/blog/http-request#Determining_the_port)
   2. [确定客户端的 IP 地址和端口](https://www.padok.fr/en/blog/http-request#Determining_the_client's_IP_address_and_port)
      1. [确定 IP 地址](https://www.padok.fr/en/blog/http-request#Determining_the_IP_address)
      2. [确定端口](https://www.padok.fr/en/blog/http-request#Determining_the_port_1)
4. [发送 HTTP 请求](https://www.padok.fr/en/blog/http-request#Sending_the_HTTP_Request)
   1. [HTTP 格式](https://www.padok.fr/en/blog/http-request#HTTP_format)
   2. [开放系统互连模型](https://www.padok.fr/en/blog/http-request#OSI_Model)
   3. [传输控制协议](https://www.padok.fr/en/blog/http-request#TCP)
   4. [知识产权](https://www.padok.fr/en/blog/http-request#IP)
   5. [以太网](https://www.padok.fr/en/blog/http-request#Ethernet)
5. [接收 HTTP 请求和响应](https://www.padok.fr/en/blog/http-request#Reception_of_HTTP_request_and_response)
6. [接收响应](https://www.padok.fr/en/blog/http-request#Receiving_the_Response)
7. [结论](https://www.padok.fr/en/blog/http-request#Conclusion)

### 在我们开始之前

本文并不取代真实的网络课程，为了简单起见，它可能包含一些不准确的地方。

有关信息，我正在 Mac 上工作。因此，我在本文中使用的某些命令可能不适用于 Linux 或 Windows。

### 启动脚本

让我们考虑以下 `client.py`文件：

```python
import requests

response = requests.get(url="http://www.google.com/")
```

让我们运行一下：

```bash
python client.py
```

当执行这个命令时会发生什么？

首先，如果我能够在终端中输入命令，那是因为终端正在执行，并且它启动了一个 shell。这可以是 bash，或者就我而言，是 zsh。

`htop`例如，我们可以通过软件查看计算机上运行的进程。 “树”视图允许我们以树的形式查看进程之间的父子关系。

![顶部](https://www.padok.fr/hs-fs/hubfs/Images/Blog/htop.webp?width=699&height=84&name=htop.webp)

这里我们可以看到 `Terminal`程序创建了一个 `login`进程，进程又创建了一个 `-zsh`进程。最后，当我输入命令时 `python client.py`，`-zsh`启动了 的执行 `python`，并将文件的路径 `client.py`作为参数传递。

Python 解释器现在可以开始 `client.py`逐行读取文件。

使用 Python 调试器，我们注意到该脚本使用了多个库：

- `requests`
- `http`
- `urllib3`
- `socket`

我不会详细介绍每个库的作用，而是直接关注最低级别的库：socket。该库为链接到内核的 C 代码提供了 Python 接口。

这是一个允许您仅使用套接字库发出 HTTP 请求的脚本：

`requests`、`http`和库所做的事情 `urllib3`应该类似于此脚本。但是，它们可能会添加与安全性、性能、重新发出请求、管理多个请求等相关的功能。

我们可以看到发出 HTTP 请求首先要做的就是打开一个 socket！

### 插座的打开

为了理解这一部分，我需要解释两个概念：套接字和 TCP 连接。

- 套接字是内核提供给程序与远程计算机通信的接口。
- TCP 连接是两台计算机用于相互通信的连接。对于客户端计算机上的套接字，有一个 TCP 连接。

我们可以将这两个概念表示如下：

![插座](https://www.padok.fr/hs-fs/hubfs/Images/Blog/socket.webp?width=1000&height=352&name=socket.webp)

内核打开与远程计算机的 TCP 连接，并为 Python 进程提供套接字。然后，内核和 Python 进程可以向套接字读取和写入信息。

以下是内核打开 TCP 连接时将执行的操作。

#### 确定服务器的 IP 地址和端口

使用 DNS 请求确定 IP 地址

要知道将 HTTP 请求发送到哪台计算机，内核必须发送第一个请求（称为 DNS 请求）来确定服务器的 IP。

计算机的 IP 对应于网络上计算机的地址。

我们提供一个域名作为 DNS 请求的参数，DNS 服务器会使用关联的 IP 地址进行响应。

可以使用 重现 DNS 请求 `nslookup`，例如：

![域名系统](https://www.padok.fr/hs-fs/hubfs/Images/Blog/dns.webp?width=360&height=134&name=dns.webp)

这里我们可以看到www.google.com的IP地址是142.250.179.68。

##### 确定端口

现在我们有了地址，我们需要 Web 服务器正在侦听的端口！

该端口是按约定确定的：在 Web 中，默认侦听端口是 80（对于 HTTPS，则为 443）。

#### 确定客户端的 IP 地址和端口

我们的客户端知道如何向远程服务器发送 HTTP 请求。但反之则不然。为了完成连接，服务器需要知道客户端的 IP 地址和端口，它将向其发送响应。

##### 确定 IP 地址

客户端内核一连接到其网络就知道自己的 IP 地址。

为了简单起见，我们假设我们的计算机直接连接到互联网。我们有客户的 IP 地址。

实际上，我们的计算机通常连接到通过路由器连接到互联网的专用网络。路由器传输公共 IP 地址以用于发送响应，并将服务器的响应重定向到其专用网络上的正确计算机。

##### 确定端口

客户端内核将从其拥有的可用端口中随机选择一个端口。

客户端将在连接打开时将 IP 地址和端口传达给服务器。

💡**列出计算机上的 TCP 连接：**

该 `netstat`命令允许我们列出计算机上的 TCP 连接。如果我与脚本同时运行它，我们可以看到套接字已打开：

![connexion_tcp_netstat](https://www.padok.fr/hs-fs/hubfs/Images/Blog/connexion_tcp_netstat.webp?width=559&height=52&name=connexion_tcp_netstat.webp)

在这里我们可以看到连接的必要信息：Google 的 IP 地址 142.250.179.68 和端口 80。

端口 50751 是由我的内核和我的计算机（我已隐藏在此处）在我的盒子网络上的 IP 地址随机确定的。

### 发送 HTTP 请求

#### HTTP 格式

首先要做的是将请求格式化为 HTTP 格式。

HTTP 代表超文本传输协议。因此，它是一个文本格式的协议，我们可以用文本来格式化我们的请求！

以下是要遵循的格式：

![协议_http](https://www.padok.fr/hs-fs/hubfs/Images/Blog/protocole_http.webp?width=500&height=179&name=protocole_http.webp)

现在我们有了 HTTP 格式的请求和套接字，我们的程序可以发送请求了。这是 `socket.sendall(request)`在脚本级别完成的。

现在，内核将接管。为了使我们的 HTTP 请求正确到达目的地，我们需要向其添加一些信息。

该请求可以看作是通过网络电缆发送的数据包。为了使数据包到达其目标，除了许多其他信息之外，它还需要一个要到达的地址。

这些信息添加到数据包的方式由一组协议控制。

为了更好地理解这些信息是什么以及哪个协议负责哪些信息，[OSI 模型](https://en.wikipedia.org/wiki/OSI_model)很有用。

#### 开放系统互连模型

OSI 模型由一组 7 层组成。

它从对应物理硬件（如电缆、网卡、物理端口等）的第 1 层到 HTTP 协议所在的第 7 层。

Web 请求涉及的不同协议如下：

![模型_osi](https://www.padok.fr/hs-fs/hubfs/Images/Blog/modele_osi.webp?width=700&height=356&name=modele_osi.webp)

在本文中我们将忽略第 1、5 和 6 层。我没有研究物理层，第 5 层和第 6 层不一定需要执行 HTTP 请求。人们可以很好地想象一个没有 cookie 且没有 HTML 响应的请求。

让我们回到 HTTP 请求。

首先，我们需要向其中添加与 TCP 协议相关的信息。为此，我们将 HTTP 数据包包装在 TCP 数据包中。

#### 传输控制协议

![paquet_tcp](https://www.padok.fr/hs-fs/hubfs/Images/Blog/paquet_tcp.webp?width=500&height=157&name=paquet_tcp.webp)

就像 HTTP 请求有标头和内容一样，TCP 数据包也有标头和内容。内容对应图中的“数据”字段。

在 TCP 数据包中，数据字段将包含整个 HTTP 请求。

因此，与 TCP 相关的信息可以在 TCP 标头中找到。特别是，TCP 标头包含源端口和目标端口。

#### 知识产权

同样，TCP 数据包将被封装在 IP 数据包中。

![paquet_IP](https://www.padok.fr/hs-fs/hubfs/Images/Blog/paquet_IP.webp?width=500&height=149&name=paquet_IP.webp)

顾名思义，IP 标头将包含目标 IP 地址和源 IP 地址。

#### 以太网

我们的 IP 数据包将再次封装在另一个数据包中，这次称为“帧”：以太网帧。

![以太网帧](https://www.padok.fr/hs-fs/hubfs/Images/Blog/frame_ethernet.webp?width=500&height=151&name=frame_ethernet.webp)

以太网标头将包含目标 MAC 地址和源 MAC 地址。

**MAC 地址**

MAC 地址对应于计算机的物理地址。它看起来像这样： **`6e:9b:e4:3f:0f:fc`** 。

数据包使用该地址到达下一台机器，直到到达目标服务器。

在到达目标之前，我们的数据包将经过各种机器。例如，您的互联网盒子。此外，在数据包到达目标服务器之前，多个路由器可能会中继该数据包。

操作如下：客户端计算机发送带有上网盒 MAC 地址的数据包。后者打开数据包，但仅到达 IP 层。因此，它可以读取目标 IP 地址，并根据其路由表选择数据包的下一个接收者。

当它选择了这个接收者时，它会关闭 IP 数据包并将其包装在包含下一个路由器地址的新以太网帧中。

重复此过程，直到我们到达知道目标服务器的 MAC 地址并因此可以向其发送数据包的路由器。

![地址_mac_1_2](https://www.padok.fr/hs-fs/hubfs/Images/Blog/adresse_mac_1_2.webp?width=1000&height=362&name=adresse_mac_1_2.webp)

如果我们放大路由器 1：

![地址_mac_2_2](https://www.padok.fr/hs-fs/hubfs/Images/Blog/adresse_mac_2_2.webp?width=1000&height=331&name=adresse_mac_2_2.webp)

### 接收 HTTP 请求和响应

现在我们的 HTTP 请求已被 TCP、IP 和以太网封装，它拥有到达目标服务器所需的所有信息。因此，除了物理层发生的情况（本文未介绍）之外，它已准备好通过网络发送。

就像我们可以使用 Python 套接字库发送 HTTP 请求一样，我们可以使用这个库创建一个小型 Python Web 服务器，准备在另一端接收 HTTP 请求。

这是一个例子：

首先，我们在端口 80 上打开一个套接字。然后让我们的程序侦听该套接字。

现在，我们等待传入连接。当它到达时，内核会创建一个新的套接字，专门用于与客户端的连接。这是上面代码中的“client_socket”。

然后脚本检索到达客户端套接字的内容 `.recv(1024)`。

该 `recv`函数要求它应检索的最大数据量，此处它将停止于 1024 字节。最好对接受的数据量设置限制，以避免阻塞脚本执行太长时间。只要我们还没有收到所有内容，Python 解释器就会停留在线路上 `recv()`，这会阻止其他连接的打开，并可能使我们的服务器不可用。

收到请求后，它将被传递到创建响应的 Python 代码。这是网站开发人员习惯工作的地方。

这里我们以 HTTP 格式创建一个简单的“Hello World”，并将其发送到套接字。

以下是 HTTP 响应的格式：

![协议_http_响应](https://www.padok.fr/hs-fs/hubfs/Images/Blog/protocol_http_reponse.webp?width=500&height=189&name=protocol_http_reponse.webp)

关闭套接字并通过循环 `while True`，我们返回到 `server_socket.accept()`等待新连接的状态。

发送响应类似于发送上一章中看到的请求。

### 接收响应

最后，在类似于接收请求的过程中，我们的客户端将收到响应。

该 `while True`循环允许检索整个响应。在本例中，对 www.google.com 的请求会生成超过 4096 个字节。

然后，HTTP 格式的响应就可用并且可以由我的脚本使用。

我不会向您显示对 www.google.com 请求的响应，因为它包含大量代码（html、css）。但是，如果在我的 client.py 脚本中，我将 www.google.com 替换为 localhost，并且在我的计算机上运行这两个脚本，我们可以看到它们相互通信！

这是从 client.py 调用时 server.py 的响应：

![回应](https://www.padok.fr/hs-fs/hubfs/Images/Blog/reponse.webp?width=700&height=47&name=reponse.webp)

### 结论

我希望本文能让您大致了解发出 HTTP 请求时涉及的机制。

当然，所涵盖的所有主题都可以进一步探讨。

例如，我们如何从 HTTP 切换到 HTTPS？这个主题值得单独写一篇文章，但与此同时，您可以参考这篇关于[SSL 证书](https://security.padok.fr/en/blog/purpose-ssl-certificates)的文章，这是该主题的重要组成部分。
