# Fetch

##  简介

Fetch API是一个用用于访问和操纵 HTTP 管道的强大的原生 API。

> 这种功能以前是使用 XMLHttpRequest实现的。Fetch提供了一个更好的替代方法，可以很容易地被其他技术使用，例如 Service Workers。Fetch还提供了单个逻辑位置来定义其他HTTP相关概念，例如CORS和HTTP的扩展。

可见 `fetch` 是作为 `XMLHttpRequest` 的替代品出现的。
使用 `fetch`，不需要再额外加载一个外部资源。但它还没有被浏览器完全支持，所以仍然需要一个`polyfill`。

- es5 的 polyfill — [es5-shim, es5-sham](https://github.com/es-shims/es5-shim) .
- Promise 的 polyfill — [es6-promise](https://github.com/jakearchibald/es6-promise) .
- fetch 的 polyfill — [fetch-ie8](https://github.com/camsong/fetch-ie8) .

## 尝试一个 fetch

一个基本的 fetch请求：

```
const options = {
    method: "POST", // 请求参数
    headers: { "Content-Type": "application/json"}, // 设置请求头
    body: JSON.stringify({name:'123'}), // 请求参数
    credentials: "same-origin", // cookie设置
    mode: "cors", // 跨域
}
fetch('http://www.xxx.com', options)
  .then(function(response) {
    return response.json();
  })
  .then(function(myJson) {
    console.log(myJson); // 响应数据
  })
  .catch(function(err){
    console.log(err); // 异常处理
  })
```



## Promise 特性

fetch 方法返回一个 Promise 对象， 根据 Promise Api 的特性，fetch 可以方便地使用 then 方法将各个处理逻辑串起来， 使用 `Promise.resolve()` 或 `Promise.reject()` 方法将分别返会肯定结果的 Promise 或否定结果的 Promise，从而调用下一个 then 或者 catch。 一旦 then 中的语句出现错误，也将跳到 catch 中。

## response type

一个 fetch 请求的响应类型(response.type)为如下三种之一:

- basic
- cors
- opaque

同域下，响应类型为 `basic`。

跨域下，服务器没有返回 CORS 响应头,，响应类型为 `opaque`。此时我们几乎不能查看任何有价值的信息，比如不能查看 response、status、url 等等。

同样是跨域下，如果服务器返回了CORS响应头，那么响应类型将为 `cors`。此时响应头中除 Cache-Control、Content-Language、Content-Type、Expores、Last-Modified 和 Progma 之外的字段都不可见。

注意：无论是同域还是跨域,，**以上 fetch 请求都到达了服务器**。

## mode

fetch 可以设置不同的模式使得请求有效。模式可在 fetch 方法的第二个参数对象中定义。

```
fetch(url, {mode: 'cors'});
```



可定义的模式如下:

- same-origin：表示同域下可请求成功；反之浏览器将拒绝发送本次 fetch，时抛出错误 `ypeError: Failed to fetch(…)`
- cors：表示同域和带有CORS响应头的跨域下可请求成功，请求将被拒绝
- cors-with-forced-preflight：表示在发出请求前，将执行 preflight 检查
- no-cors：常用于跨域请求不带CORS响应头场景，此时响应类型为 “opaque”

除此之外，还有两种不太常用的 mode 类型，分别是 navigate，websocket， 它们是 HTML标准 中特殊的值。

## header

fetch 获取 http 响应头非常 easy，如下：

```
fetch(url).then(function(response) { 
    console.log(response.headers.get('Content-Type'));
});
```



设置 http 请求头也一样简单。

```
var headers = new Headers();
headers.append("Content-Type", "text/html");
fetch(url,{
  headers: headers
});
```



header 的内容也是可以被检索的。

```
var header = new Headers({
  "Content-Type": "text/plain"
});
console.log(header.has("Content-Type")); //true
console.log(header.has("Content-Length")); //false
```



## post

在 fetch 中发送 post 请求，同样可以在 fetch 方法的第二个参数对象中设置。

```
var headers = new Headers();
headers.append("Content-Type", "application/json;charset=UTF-8");
fetch(url, {
  method: 'post',
  headers: headers,
  body: JSON.stringify({
    date: '2016-10-08',
    time: '15:16:00'
  })
});
```



## credentials

跨域请求中需要带有 cookie 时，可在 fetch 方法的第二个参数对象中添加 credentials 属性，并将值设置为 `include`。

```
fetch(url,{
  credentials: 'include'
});
```



除此之外, credentials 还可以取以下值：

- omit: 缺省值，默认为该值
- same-origin: 同源，表示同域请求才发送 cookie

## catch

同 XMLHttpRequest 一样，无论服务器返回什么样的状态码(chrome中除407之外的其他状态码)，它们都不会进入到错误捕获里。也就是说，此时，XMLHttpRequest 实例不会触发 onerror 事件回调，fetch 不会触发 reject。通常只在网络出现问题时或者 `ERR_CONNECTION_RESET` 时, 它们才会进入到相应的错误捕获里。（其中，请求返回状态码为407时， chrome 浏览器会触发 onerror 或者 reject 掉 fetch。)

## Fetch 的不足

> 由于 `fetch` 是一个非常底层的 API，它并没有被进行很多封装，还有许多问题需要处理：
>
> - 不能直接传递 JavaScript 对象作为参数
> - 需要自己判断返回值类型，并执行响应获取返回值的方法
> - 获取返回值方法只能调用一次，不能多次调用
> - 无法正常的捕获异常
> - 老版浏览器不会默认携带 cookie
> - 不支持 jsonp

## 参考文档

- [Fetch进阶指南](http://louiszhai.github.io/2016/11/02/fetch/)