## URL加载的过程

1）首先，在浏览器地址栏中输入url

​		如果为非url结构的字符串，交给浏览器默认引擎去搜索改字符串；若为url结构的字符串，浏览器主进程会交给 网络进程，开始干活。

2）浏览器先查看浏览器缓存-系统缓存-路由器缓存，如果缓存中有，会直接在屏幕中显示页面内容。若没有，则跳到第三步操作。

​		网络进程会先看看是否存在本地缓存，如果有就直接返回资源给浏览器进程，无则下一步 DNS-> IP -> TCP。

3）在发送http请求前，需要域名解析(DNS解析)，解析获取相应的IP地址。

​		网络进程拿到url后，先会进行DNS域名解析得到IP地址。如果请求协议是HTTPS，那么还需要建立TLS连接。

4）浏览器向服务器利用IP地址和服务器建立TCP连接。，与浏览器建立tcp三次握手。

5）握手成功后，浏览器向服务器发送http请求，请求数据包。

连接建立之后，向服务器发送请求。服务器收到请求信息后，会根据请求信息生成响应行、响应头、响应体，并发给网络进程。网络进程接受了响应信息之后，就开始解析响应头的内容。

6）服务器处理收到的请求，将数据返回至浏览器

​		默认情况，每个页面一个渲染进程。但若处于同一站点（同根域名+协议），那么渲染进程就会复用。

7）浏览器收到HTTP响应

8）读取页面内容，浏览器渲染，解析html源码

​		渲染进程准备好后，浏览器进程发出“提交文档的消息”，渲染进程接受了消息之后，会跟网络进程简历传输数据的管道。等数据传输完成了，渲染进程会告诉浏览器进程，确认文档提交，这时候浏览器会更新页面，安全状态，url，前进后退的历史。

9）渲染进程接受到数据，生成Dom树、解析css样式、js交互,渲染显示页面。

​		同步构建DOM树和CSSOM树，当CSSOM生成结束执行js。浏览器会先从DOM树的根节点开始遍历每个可见节点，并把这些节点添加到渲染树中。不可见的节点不会添加到渲染树，比如css设置了display为none 属性的节点。根据生成的渲染树，进行布局（也可以叫做回流），得到各个节点在页面中的确切位置和大小。生成分层树，页面都是一层一层叠加在一起形成的。比如一些复杂的css动画，z-index等，渲染引擎会为他们生成专用的图层，并生成对应的图层树。