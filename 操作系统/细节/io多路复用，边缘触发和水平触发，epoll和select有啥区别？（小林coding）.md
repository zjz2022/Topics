## io多路复用，边缘触发和水平触发，epoll和select有啥区别？（小林coding）

**解析**

> 高频考题：属于高频考题：自产《[大厂后端Top100面试题讲解｜第59题](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483813&idx=1&sn=d76cd77235886194667bb81cd1920b64&scene=21#wechat_redirect)》
>
> 所属专项：操作系统｜网络系统
>
> 专项考察占比：
>
> 【**操作系统**】面试中考察操作系统的比率：[大厂：12%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483843&idx=1&sn=7c7bd2c6b906c0ab38c868b84b88da56&chksm=c3585cacf42fd5ba38542da8ac77a7e731b486243c4aaf249d46d91b6c5e0e4e945f9729ad98&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)｜ [腾讯：18%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483854&idx=1&sn=668db515e36dcdc8c180b11abef66e72&chksm=c3585ca1f42fd5b7d399b32a3c909b61a16f13c3bdb6ef6e0461470acdd3955c33a8a0d46120&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)｜ [阿里：8%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483854&idx=1&sn=668db515e36dcdc8c180b11abef66e72&chksm=c3585ca1f42fd5b7d399b32a3c909b61a16f13c3bdb6ef6e0461470acdd3955c33a8a0d46120&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)
>
> 【**操作系统-网络系统**】面试考察操作系统时，问“网络系统”相关问题的比率：[22%](https://mp.weixin.qq.com/s?__biz=Mzk0OTM5MDMzNg==&mid=2247483843&idx=1&sn=7c7bd2c6b906c0ab38c868b84b88da56&chksm=c3585cacf42fd5ba38542da8ac77a7e731b486243c4aaf249d46d91b6c5e0e4e945f9729ad98&token=1036259463&lang=zh_CN&scene=21#wechat_redirect)

### IO多路复用是什么?

IO多路复用是一种高效的IO处理方式，它允许单个进程或线程同时监视多个文件描述符，如网络连接或文件句柄。当这些描述符中的任何一个就绪时，比如有数据可读或可写，多路复用机制就能够通知应用程序进行相应的读写操作。这种机制的核心优势在于，它可以在不增加额外线程或进程的情况下，处理大量的并发连接，从而显著地提高系统的并发性和响应能力。

常见的IO多路复用技术包括select、poll和epoll等。这些技术各有特点，但核心思想都是通过一个线程来管理多个连接，减少系统资源的消耗，并提高程序运行的效率。

### select,poll,epoll的区别

- select是最早的一种I/O多路复用技术。它使用一个fd_set数据结构来表示所有被监视的文件描述符。然而，select有几个明显的缺点。首先，它监视的文件描述符数量有限，默认上限是1024。其次，每次调用select时，都需要将fd_set从用户态拷贝到内核态，并且在内核中需要遍历所有被监视的文件描述符来检查是否有就绪的，这个开销在文件描述符数量很多时会变得非常大。最后，select返回后，还需要再次遍历fd_set来找出哪些文件描述符是就绪的，这进一步增加了处理开销。
- poll则是select的一种改进方案。它使用一个pollfd结构来表示被监视的文件描述符及其事件。与select相比，poll没有文件描述符数量的限制，因为它基于链表来存储。然而，poll仍然需要在每次调用时从用户态拷贝所有的pollfd结构到内核态，并在内核中遍历检查每个文件描述符的状态。因此，当文件描述符数量很多时，poll的性能也会下降。
- epoll则是Linux特有的I/O多路复用技术，它在很多方面都优于select和poll。首先，epoll只在初始时完成一次文件描述符的注册，避免了每次调用时的拷贝开销。其次，epoll采用回调函数的方式，只有当一个或多个文件描述符就绪时，才会调用回调函数并通知用户空间，这使得epoll在处理大量文件描述符时仍然能保持高效。最后，epoll返回时已经明确指出了哪些文件描述符是就绪的，因此无需再像select和poll那样进行额外的遍历操作。

### epoll的事件触发方式？

epoll的事件触发主要有两种方式。第一种是边缘触发，也就是说，只有当文件描述符的状态从不就绪变为就绪时，epoll才会发出通知。

一旦通知过后，除非状态再次发生变化，否则不会再次通知。第二种是水平触发，这种模式下，只要文件描述符处于就绪状态，epoll就会持续发出通知，直到数据处理完毕

**推荐学习资料：**

- 《小林Coding》｜图解系统：IO多路复用
- 《小林Coding》｜图解系统：Epoll