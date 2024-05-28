localstorage 的跨域

只要不同源就不能共享 localStorage 的数据。但是在实际开发中又时常会遇到这样的需求，那我们该如何解决呢？

目前广泛采用的是 postMessage 和 iframe 相结合的方法。postMessage(data,origin)方法允许来自不同源的脚本采用异步方式进行通信，可以实现跨文本档、多窗口、跨域消息传递。接受两个参数：

- data：要传递的数据，[HTML5](https://link.jianshu.com?t=http://lib.csdn.net/base/html5)规范中提到该参数可以是[JavaScript](https://link.jianshu.com?t=http://lib.csdn.net/base/javascript)的任意基本类型或可复制的对象，然而并不是所有浏览器支持任意类型的参数，部分浏览器只能处理字符串参数，所以在传递参数时需要使用 JSON.stringify()方法对对象参数序列化。
- origin：字符串参数，指明目标窗口的源，协议+主机+端口号[+URL]，URL 会被忽略，所以可以不写，只是为了安全考虑，postMessage()方法只会将 message 传递给指定窗口，当然也可以将参数设置为"\*"，这样可以传递给任意窗口，如果要指定和当前窗口同源的话设置为"/"。
