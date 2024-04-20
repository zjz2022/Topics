- [TCP 是什么？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#what-is-tcp)
- [UDP 是什么？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#what-is-udp)
- TCP 和 UDP 如何工作？
  - [TCP 如何工作？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#how-does-tcp-work)
  - [UDP 如何工作？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#how-does-udp-work)
- [TCP 和 UDP 之间的主要区别是什么？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#main-difference-between-tcp-and-udp)
- [TCP 与 UPD：速度差异](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#tcp-and-udp-speed-differences)
- [OpenVPN 使用 TCP 或 UDP？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#does-openvpn-use-tcp-or-udp)
- [NordVPN 使用哪种协议？](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#which-protocol-does-nordvpn-use)
- [常见问题](https://nordvpn.com/zh/blog/tcp-udp-xieyi-bijiao/#faq)

## TCP 是什么？

TCP（传输控制协议）是一种网络协议，通过互联网将您的数据从设备传输到网页服务器。每当您在 Skype 上与朋友聊天、发送电子邮件、观看在线视频或浏览网页时，都会使用 TCP 协议。

TCP 是基于连接的，因此在传输数据时会建立接收端和发送端之间的连接，并在传输过程中始终保持这种连接。它能确保数据完整无损地到达。由于其可靠性，TCP 是受欢迎的互联网安全协议。

TCP 具有以下优点：

- 

  TCP 独立于操作系统运行，有助于在系统和设备之间实现更大的互通性。

- 

  TCP 在传输数据时会检查错误，以确保发送的数据完整到达目的地。

- 

  TCP 根据接收端的容量进行优化和调整传输数据的速度。

- 

  TCP 会确认数据已到达目的地，如果第一次传输失败，会尝试重新传输。

尽管 TCP 有上述优点，但也有一些缺点：

- 

  TCP 使用相当多的带宽，并且比 UDP 慢，我们将在本文进一步讨论。

- 

  如果在传输过程中丢失了一小部分的数据，TCP 可能无法加载其他信息。例如，如果页面上的某个元素（如图片或视频）无法加载，则页面的其余数据也可能无法加载。

- 

  TCP 在本地局域网或个人局域网上的运作效果不佳。

## UDP 是什么？

UDP 的全名是“用户数据报协议”。与 TCP 相比，UDP 网络协议可靠性较低，但速度更快、更简单。它通常在速度至关重要的情境中使用，如流媒体或游戏。

UDP 是无连接的，因此不会在双方之间建立事先的连接。尽管有可能在传输过程中丢失数据，但换来的是更高的速度。

以下是 UDP 的优点：

- 

  UDP 以较小负担（overhead）发送数据包，从而减少端到端延迟。

- 

  即使其中一些数据包丢失，UDP 仍会传送数据，这表示数据包丢失不会中断整个传输。

- 

  一个 UDP 传输可以通过广播和多播功能，同时发送给多个接收端。

- 

  UDP 传输比其他选择（如 TCP）更快速、更高效。

当然，UDP 也有以下的缺点：

- 

  UDP 不会检查数据包是否成功到达目的地。

- 

  UDP 无法保证传输的完整性。有些数据包可能会丢失，但发送端无法从他们这端证明传输完整性。

- 

  如果路由器需要优先传输某个数据包，它很可能会在 UDP 数据包上传输TCP 数据包。

- 

  UDP 不按特定顺序发送数据，因此数据包会按任何顺序到达。

## TCP 和 UDP 如何工作？

TCP 比 UDP 更可靠。它会将数据包从设备传输到网页服务器。UDP 更快速、更简单，但不保证数据包的传递。

### TCP 如何工作？

TCP 的工作原理是通过互联网发送小数据包，在到达接收端后再重新组装。以下是实际操作的步骤：

1. TCP 为每个数据包分配一个唯一的标识符和一个序号。这使得接收端能够识别哪个数据包已被接收，并识别下一个即将到达的数据包。
2. 一旦接收到数据包，而且处于正确的顺序，接收端就会向发送端发送确认。
3. 发送端现在可以发送另一个数据包。
4. 如果数据包丢失或以错误顺序发送，则接收端会保持静默，表示需要重新发送相同的数据包。

![TCP 如何工作](https://nordvpn.com/wp-content/uploads/infographic-tcp-vs-udp-1-zh-cn.svg)

由于数据是依序发送的，这有助于数据拥塞和流量控制，并更容易发现和修复任何错误。这也表示通过 TCP 发送的数据更有可能完全到达目的地。然而，这也有缺点。两方之间需要进行大量的来回通信，因此建立连接和交换数据需要更长的时间。

### UDP 如何工作？

UDP 的工作方式是无需唯一的标识符或序号，来完成与 TCP 相同的工作。它以流的形式发送数据，仅有校验和（checksum）来确保到达的数据未被破坏。UDP 几乎没有错误校正功能，也不关心丢失的数据包。它较容易出错，但发送数据的速度比 TCP 更快速。

![UDP 如何工作](https://nordvpn.com/wp-content/uploads/infographic-tcp-vs-udp-2-zh-cn.svg)

UDP 安全吗？几乎不可能设置只允许某些 UDP 通信并封锁其余通信的防火墙。然而，尽管 TCP 较安全，但 UDP 连接并非完全不受保护。用户可以为特定应用程序使用代理，或者在远程用户和公司内部网络之间建立隧道连接。

## TCP 和 UDP 之间的主要区别是什么？

TCP 和 UDP 的主要区别在于 UDP 比 TCP 更快速。UDP 具有速度优势，因为用户无需允许或确认接收数据即可重新发送。这使 UDP 能够更快建立连接和传输数据。然而，这也引起了人们对 UDP 实际安全性的担忧。就 [VPN](https://nordvpn.com/zh/what-is-a-vpn/) 使用 UDP 与 TCP 的争论而言，OpenVPN 在 UDP 端口上工作效果最佳，尽管它可以配置在任何端口上运行。

以下是 TCP 和 UDP 的比较：

|                | TCP            | UDP                  |
| :------------- | :------------- | :------------------- |
| 可靠性         | 高             | 较低                 |
| 速度           | 较低           | 高                   |
| 传输方法       | 数据包依序传送 | 数据包以流的形式传送 |
| 错误检测和修正 | 是             | 否                   |
| 拥塞控制       | 是             | 否                   |
| 确认           | 是             | 仅校验和             |

UDP 和 TCP 都会将数据分为称为数据包的较小单元。这些数据包包括发送端和接收端的 IP、各种配置、您正在发送的实际数据以及尾部（指示数据包结束的数据）。

那么，UDP 和 TCP 哪个较好呢？这完全取决于您使用的用途。如果应用程序需要快速和稳定的资料传输才能正常工作，就必须使用 UDP。否则，TCP 是一种稳定可靠的协议，用于传输数据，并且在传输过程中不会丢失任何数据。

## TCP 与 UPD：速度差异

UDP 比 TCP 更快，但也更容易出错。原因是 UDP 不像 TCP 那样对数据包进行严格的检查，而是采用更连续的数据流。TCP 依序发送数据，因此使用更多的流量控制。这使得连接更安全、更顺畅，但由于发送端和接收端之间有大量来回通信，因此造成速度降低。

## OpenVPN 使用 TCP 或 UDP？

OpenVPN 与 TCP 和 UDP 都兼容，但使用哪种协议取决于您的需求。OpenVPN 是许多领先 VPN 提供商所使用的开源 [VPN 协议](https://nordvpn.com/zh/blog/vpn-xieyi-bijiao/)，包括 NordVPN。TCP 更可靠，但在许多情况下，UDP 是首选协议，而且通常是多数 VPN 服务的默认协议。

如果您正在玩游戏、流媒体或使用 VoIP 服务，UDP 是不错的选择。它可能会丢失一两个数据包，但对整体连接影响不大。对此类服务使用 TCP 可能会导致延迟（尤其是当您连接到世界另一端的服务器时），这可能会完全破坏您的体验。因此，建议将通过 TCP 的 OpenVPN 用于静态用途，如电子邮件、网络浏览和文件传输。当您设置 VPN 时，重要的是根据具体需求选择最适合的配置，以个案为基础进行工作。您可以在 NordVPN 应用程序中将协议切换到 OpenVPN UDP 或 TCP。

## NordVPN 使用哪种协议？

NordVPN 希望在不影响速度的情况下提供最佳浏览体验，因此我们默认使用 UDP 协议。我们建议先尝试使用 UDP 协议，只有在遇到任何问题时，才考虑切换到 TCP。

若要在 NordVPN 上将 UDP 更改为 TCP（适用于 Windows 用户）：

1. 点击右上角的齿轮图标，进入“设置”。
2. 从左侧菜单中选择“高级”。
3. 在“协议”下选择 TCP。

若要在 NordVPN 上将 UDP 更改为 TCP（适用于 MacOS 用户）：

1. 点击左上角的滑块按钮或在菜单栏上找到 NordVPN 并选择“首选项”（默认热键：Cmd+,），打开“首选项”面板。
2. 默认情况下，“连接：首选 UDP 而非 TCP”处于启用状态。单击复选框以将其关闭。