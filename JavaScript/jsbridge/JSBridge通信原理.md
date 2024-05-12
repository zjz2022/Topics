## JSBridge通信原理

JSBridge是一类通信协议，通常用于Javascript和原生App代码（如Android或iOS平台）之间的通信。原则上，它是一个在JavaScript和原生代码之间创建“桥梁”的机制。

在许多情况下，网页需要访问设备的特性（比如获取地理位置、调用相机、获得设备信息等），这些特性通常不能直接通过JavaScript来访问。因此，我们需要一个可以在JavaScript和原生代码之间传递信息的机制，这就是JSBridge的作用。

以下是JSBridge的基础通信原理：

1. JS调用原生功能：JavaScript可以调用一个特殊的协议URL（如jsbridge://class.method?params），App会注册一个特定的URL处理程序来拦截这类URL，从JavaScript获取信息，并执行相应的原生代码。

2. 原生调用JS：通常的方式是原生代码调用JavaScript的window对象中已经注册好的方法。例如，Android中可以使用webView的loadUrl("javascript:methodName(params)")来调用在window对象上的JavaScript方法。

3. 回调：通常情况下，调用结束后需要返回一些结果，这个时候就需要用到回调函数。JavaScript调用原生代码时，会传递一个回调函数名，原生代码执行结束后再次调用这个JavaScript函数并将结果传递回去。

需要注意的是，由于安全原因，许多现代浏览器禁止了在URL中的自定义特殊协议，所以JSBridge可能无法在普通的浏览器环境中正常工作。但对于自定义的Webview，例如在一些App内置的浏览器环境中，这一规则通常可以被绕过。