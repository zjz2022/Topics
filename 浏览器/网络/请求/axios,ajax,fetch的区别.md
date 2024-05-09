### axios,ajax,fetch的区别

axios，ajax和fetch都是前端开发中非常常用的网络请求库和API，它们的主要目的都是在浏览器环境中从服务器请求或发送数据。但它们在使用方法和内部机制上有一些重要的区别。

1. Ajax：
   Ajax（Asynchronous JavaScript and XML）并非一种新的程序语言，而是一种使用现有标准的新方法。它采用异步方式与服务器进行通信，可以在页面不刷新的情况下提供动态功能。Ajax主要依赖于XMLHttpRequest对象，这是所有现代浏览器的标准API。

2. Fetch：
   Fetch API是一个较新的网络API，是W3C的一个标准。Fetch API可以提供Promise API，使其异步处理请求和响应，同时提供强大的请求和响应模型。Fetch API允许你配置请求和响应的许多方面，包括CORS和安全头部，但是 Fetch API比Ajax低级，它不支持像自动转换JSON和请求/响应拦截的功能。

3. Axios：
   Axios是一个基于Promise 的HTTP库，可用于浏览器和node.js。Axios提供了丰富的HTTP请求方法，易用的请求终止，URL参数转换，响应数据转换，请求和响应拦截以及更多其他有用的方法和配置。另一个优点是浏览器和Node环境中都可以使用Axios。

简单地说，选择哪一个发起HTTP请求，取决于你的具体需求和你对某个库或API的熟悉程度。