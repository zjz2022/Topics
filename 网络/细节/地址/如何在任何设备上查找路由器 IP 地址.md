# 如何在任何设备上查找路由器 IP 地址

有时候，您可能想知道路由器 IP 地址是什么。以下是各种设备通过几个简单步骤查找路由器 IP 的方法。

内容

- [什么是 IP 地址？](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#what-is-ip-address)
- 如何查找路由器的 IP 地址
  - [Windows（命令提示符）](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#windows-command-prompt)
  - [Windows（控制台）](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#windows-control-panel)
  - [Android](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#android)
  - [Mac OS X](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#macos-x)
  - [iPhone 和 iPad](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#iphone-and-ipad)
  - [Linux](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#linux)
  - [Chrome OS](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#chrome-os)
- [重置路由器会更改 IP 地址吗？](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#does-resetting-router-change-ip-address)
- [如何查找路由器的公共 IP 地址](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#how-to-find-routers-public-ip-address)
- [在路由器上设置 VPN 有哪些好处？](https://nordvpn.com/zh/blog/chazhao-luyouqi-ip-dizhi/#benefits-of-vpn-on-router)

## 什么是 IP 地址？

IP 地址就如同设备的标识标签。IP 地址允许在线发送的数据包找到预期的收件者。默认网关 IP 地址是属于网络入口节点的 IP 地址。由于路由器很可能是无线网络的入口节点，因此路由器 IP 和默认网关 IP 是相同的，也被称为私人 IP 地址。

IP 代表互联网协议，尽管它是网络的一种名称标签，但不应将其与网络名称混淆。路由器的 IP 是互联网上其他网络和服务器与之通信的一种方式：网络名称是当您试图将设备连接到路由器时显示的名称。通常可以轻易更改网络名称。

如何分辨私人和公共 IP 地址？互联网分配号码机构（IANA）保留了一些仅供私人网络使用的 IPv4 地址范围。如果您想知道“我默认的网关 IP 地址是什么？”，很可能是以下地址：

| 私人 IP 地址范围              |
| :---------------------------- |
| 10.0.0.0 – 10.255.255.255     |
| 172.16.0.0 – 172.31.255.255   |
| 192.168.0.0 – 192.168.255.255 |

## 如何查找您的路由器的 IP 地址

那么如何查找 IP 地址呢？查找路由器 IP 地址最简单的方法是在路由器背面寻找贴纸。不过也可能找不到，所以您必须使用已连接的设备来查找。

默认情况下，连接到同一网络的所有设备都会将请求发送到路由器。不同的设备有不同方法来识别路由器的 IP 地址。Windows 电脑称其为“默认网关”，而 iOS 设备则将路由器的 IP 地址存储在“路由器”下。

找到路由器的默认 IP 后，只需将 IP 输入到网络浏览器的地址栏即可访问路由器的网络介面。

请注意，您也可以使用 VPN 更改与您在线关联的公共 IP 地址。这能保护您的真实 IP 地址不受访问网站的影响，增强整体隐私。事实上，您可以[在路由器上设置 VPN](https://nordvpn.com/zh/blog/luyouqi-vpn-anzhuang/)，但要这样做，需要使用路由器的 [IP 地址](https://nordvpn.com/zh/what-is-my-ip/)，访问路由器配置网页。

### 如何在 Windows 上使用命令提示符查找路由器 IP 地址

这种技术是查找默认网关地址的一种简单方法。键入“cmd”打开命令提示符。在弹出的黑色窗口中，键入“ipconfig”。看到结果后，快速扫描直到找到默认网关地址。以下是一些易于理解的视觉化指导。

1. 在搜索栏中键入“CMD”，然后选择“命令提示符”。

   

2. 输入“ipconfig”。

3. 您应该会在“Default Gateway”下看到路由器的 IP 地址。

   

### 如何在 Windows 上使用控制台查找路由器 IP 地址

您也可以通过控制台查找路由器的 IP 地址。

1. 在搜索栏中键入“控制面板”，然后点击控制面板图标。

   

2. 点击“网络和 Internet”下的“查看网络状态和任务”。

   

3. 点击“连接”旁的网络名称。

   

4. 弹出新窗口。点击“详细信息”。

   

5. 您应该会在“IPv4 默认网关”下看到本地 IP 地址。

   

### 如何在 Android 上查找路由器 IP 地址

您可以通过系统首选项轻松完成此操作。

1. 前往“设置”，然后点击“连接”。

   

2. 点击“Wi-Fi”。

   

3. **找到已连接的无线网路**并点击它。

   

4. 点击“查看更多”下拉式功能表。

   

5. 点击“IP 设置”，然后点击“静态”。

   

   

6. 您现在应该会在“网关”下看到路由器的 IP 地址。

   

### 如何在 Mac OS X 上查找路由器 IP 地址

1. 点击屏幕顶部的**苹果图标**，进入“系统设置”。

   

2. 选择“网络”和“Wi-Fi”。

   

3. 您会看到**已连接的无线网络**。点击“详细信息”。

   

4. 选择“TCP/IP”选项卡。您应该会在“路由器”旁看到路由器的 IP 地址。

   

### 如何在 iPhone 和 iPad 上查找路由器 IP 地址

1. 前往“设置”，然后转到“Wi-Fi”。

   

2. 点击**您已连接的 Wi-Fi**。

   

3. 在“路由器”旁可以看到本地 IP 地址。

   

### 如何在 Linux 上查找路由器 IP 地址

1. 点击通知区域中的“网络图标”，选择“设置”。
2. 选择“网络”选项卡，然后点击“已连接”旁的设置图标。
3. 点击“详细信息”，您会发现路由器的 IP 地址列在“默认路由器”旁。

### 在 Chrome OS 上查找路由器 IP 地址

1. 点击工作列右侧的通知区域。
2. 选择已连接的 Wi-Fi。
3. 将弹出一个新窗口。点击“网络”选项卡。您应该可以在“网关”下看到 IP 地址。

## 重置路由器会更改 IP 地址吗？

不会，重置路由器不会更改路由器的 IP 地址。您的互联网服务提供商会记住该设备，您会得到相同的公共 IP 地址。但是，如果您将路由器关闭并保持关闭几分钟，很可能会重新分配一个新的 IP 地址。为了确保更改公共 IP 地址，请尝试将路由器关闭一个晚上。

如果您想用新的 IP 地址访问互联网，可以使用 VPN 更改路由器的 IP 地址。VPN 将保护您的 IP 地址不受您访问网站的影响，同时增强您的在线安全性。您可以将路由器配置为通过 VPN 服务器发送和接收所有流量，这是一种临时更改路由器可见 IP 地址的简单方法。除了提高隐私外，配置 VPN 的路由器还可以使数据在传输过程中更加安全。

只需点击一下，即可确保网络安全。

使用世界领先的 VPN 保持安全

[立即获取 NordVPN](https://nordvpn.com/zh/pricing/)

[了解更多](https://nordvpn.com/zh/what-is-a-vpn/)

## 如何查找路由器的公共 IP 地址

您的路由器还有一个公共（外部）IP，这是您自己以外的网路设备所看到的 IP 地址。查到您的公共 IP 地址最简单的方法是询问网站。通过[专用 IP 检查器](https://nordvpn.com/zh/ip-lookup/)检查您的 IP 地址，您应该能够查看它是否为公共地址。

或者，如果您按照本文的指示找到路由器的 IP 地址，您可以进入路由器的管理页面。只需将 IP 粘贴到浏览器的地址栏中，然后点击 Enter。它会转到管理页面，您会在管理页面找到路由器的公共 IP 地址，以及其他互联网连接的相关信息。

## 在路由器上设置 VPN 有哪些好处？

在路由器使用 VPN 带来的好处不容忽视。设置 VPN 后，每个连接到路由器的设备都能获得在线隐私的好处。

使用 VPN 增强的路由器可以帮助对抗任何想要监视您在线活动的窥探者。在路由器上设置 VPN 后，就不必每次都要在上网前启动 [VPN 应用程序](https://nordvpn.com/zh/download/)，VPN 会一直处于开启状态。