## DNS

**域名系统**它作为将域名相互映射的一个分布式数据库，由 解析器 和 多个DNS服务器 组成的。

域名服务器是指保存有该网络中所有主机的域名和对应IP地址，并具有将域名转换为IP地址功能的服务器。

```
www(三级域名).baidu(二级域名).com(顶级域名).(根域名)
```

​		本地域名服务器是电脑解析时的**默认**域名服务器，即电脑中设置的首选 DNS 服务器和备选 DNS 服务器。

​		DNS服务器根据域名的层级，进行分级查询。所谓"分级查询"，就是从根域名开始，依次查询每一级域名的NS记录，直到查到最终的IP地址，分为迭代查询和递归查询。

​		为了缓解各个域名服务器的查询压力和加快 DNS 查询速度，浏览器、操作系统、域名服务器都会将 DNS 的查询结果进行缓存，当在缓存有效时间内再次收到重复的 DNS 请求时，就会直接返回 IP 地址，而不会继续下一步的域名查询了。缓存的优先级由 DNS 查询的路径来定，浏览器缓存>操作系统缓存> hosts 文件>本地DNS服务器缓存>根域名服务器缓存>...

​		缓存时间一般由 DNS响应报文 中 资源记录部分 中的 TTL (Time to live)指定的值，单位为秒

DNS 同时使用 TCP 和 UDP 协议的 53 号端口。这种单个应用协议同时使用两种传输协议的情况在 TCP/IP 栈也算是个另类。但很少有人知道 DNS 分别在什么情况下使用这两种协议。DNS 在 区域传输 （同步解析记录）和 DNS 响应大于 UDP 报文最大长度的时候使用 TCP 协议，其他时候使用 UDP 协议（快，是UDP的最大优势）。

**DNS查询的完整过程是怎么样的？**

浏览器将会检查缓存中有没有这个域名对应的解析过的 IP 地址，如果有该解析过程将会结束。浏览器缓存域名也是有限制的，包括缓存的时间、大小，可以通过 TTL 属性来设置。

如果用户的浏览器中缓存中没有，操作系统会先检查自己本地的 DNS 解析器缓存和 hosts 文件是否有这个网址映射关系，如果有，就先调用这个 IP 地址映射，完成域名解析。

如果都没有，会找 TCP/IP 参数中设置的首选 DNS 服务器，我们叫它本地 DNS 服务器。通过递归查询的方式向本地 DNS 服务器发起查询，如果本地 DNS 服务器中有 A记录 或者该域名的映射缓存，则返回

如果都没有，本地域名服务器会开始迭代查询的过程，会先向 13 台根域名服务器查询该域名，根域名服务器会返回该域名的顶级域名服务器的 IP 地址，也就是 NS 记录。然后本地域名服务器再向顶级域名服务器发起查询，顶级域名服务器返回二级域名服务器的 NS 记录，重复这个过程直到返回 A 记录为止，最后把 A 记录中的 IP 地址返回给主机