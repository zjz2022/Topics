# 客户端存储

 cookie 

 如何设置一个 cookie 

服务端是通过 setCookie 的响应头来设置 cookie 的，要设置多个 cookie 时，得多写几个 setCookie。服务器如果希望在浏览器保存 Cookie，就要在 HTTP 回应的头信息里面，放置一个 Set-Cookie 字段

前端使用 document.cookie 属性来读写当前网页的 Cookie。写入的时候，Cookie 的值必须写成 key=value 的形式



 如何删除一个 cookie 

通过把该 cookie 的过期时间改为过去时即可删除成功，具体操作的话可以通过操作两个字段来完成

1max-age: 将要过期的最大秒数，设置为 -1 即可删除

2expires: 将要过期的绝对时间，存储到 cookies 中需要通过 date.toUTCString() 处理，设置为过期时间即可删除

max-age 更为简单，以下代码可在命令行控制台中进行测试

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1650552635447-03afb6f7-a12f-481c-9ffc-78157ed7488e.webp)





 cookie有过期时间吗? 

cookie:通过 Expires、Max-Age 中的一种

Expires属性指定一个具体的到期时间，到了指定时间以后，浏览器就不再保留这个 Cookie。它的值是 UTC 格式。如果不设置该属性，或者设为null，Cookie 只在当前会话（session）有效，浏览器窗口一旦关闭，当前 Session 结束，该 Cookie 就会被删除。另外，浏览器根据本地时间，决定 Cookie 是否过期，由于本地时间是不精确的，所以没有办法保证 Cookie 一定会在服务器指定的时间过期。

Max-Age属性指定从现在开始 Cookie 存在的秒数，比如60 * 60 * 24 * 365（即一年）。过了这个时间以后，浏览器就不再保留这个 Cookie。

如果同时指定了Expires和Max-Age，那么Max-Age的值将优先生效。

如果Set-Cookie字段没有指定Expires或Max-Age属性，那么这个 Cookie 就是 Session Cookie，即它只在本次对话存在，一旦用户关闭浏览器，浏览器就不会再保留这个 Cookie。





 cookie能跨域携带吗? 

●前端请求时在request对象中配置"withCredentials": true；

●服务端在response的header中配置"Access-Control-Allow-Origin", "http://xxx:${port}";

●服务端在response的header中配置"Access-Control-Allow-Credentials", "true"





 怎么能防止cookie被窃取呢? 

通过配置cookie的:Secure / HttpOnly

Secure属性指定浏览器只有在加密协议 HTTPS 下，才能将这个 Cookie 发送到服务器。另一方面，如果当前协议是 HTTP，浏览器会自动忽略服务器发来的Secure属性。该属性只是一个开关，不需要指定值。如果通信是 HTTPS 协议，该开关自动打开。

HttpOnly属性指定该 Cookie 无法通过 JavaScript 脚本拿到，主要是Document.cookie属性、XMLHttpRequest对象和 Request API 都拿不到该属性。这样就防止了该 Cookie 被脚本读到，只有浏览器发出 HTTP 请求时，才会带上该 Cookie。





 localhost:3000 与 localhost:5000 的 cookie 信息是否共享 

共享，根据同源策略，cookie 是区分端口的，但是浏览器实现来说，“cookie 区分域，而不区分端口，也就是说，同一个 ip 下的多个端口下的 cookie 是共享的！





 浏览器中 cookie 有哪些字段 

名称:唯一标识cookie的名称(不区分大小写)

值:存储在cookie里的字符串值(必须经过URL编码)

域:cookie有效的域,发送到这个域的所有请求都会包含对应cookie

路径:请求URL中包含这个路径才会把cookie发到服务器

过期时间:表示何时删除cookie(通过这种方式可以删除cookie)

安全标志:secure是cookie中唯一的非名/值对，只需一个secure就可以了

注意:这些域、路径等是用于告诉浏览器什么情况下应该在请求中包含cookie。这些参数并不会随请求发送给服务器，实际发送的只有cookie的名/值

  





 用cookie要怎么实现登录功能呢? 

前端可以自己创建 cookie，如果服务端创建的 cookie 没加HttpOnly，那恭喜你也可以修改他给的 cookie。

调用document.cookie可以创建、修改 cookie，和 HTTP 一样，一次document.cookie能且只能操作一个 cookie。

  



 token 

 为什么采用token呢？ 

Token 是服务端生成的一串字符串，以作为客户端请求的一个令牌。当第一次登录后，服务器会生成一个 Token 并返回给客户端，客户端后续访问时，只需带上这个 Token 即可完成身份认证。

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1646902715954-b3fd9c1e-89cf-46e4-89a2-c3dd83beaef8.webp)



1用户输入账号密码，并点击登录。

2服务器端验证账号密码无误，创建 Token。

3服务器端将 Token 返回给客户端，由***客户端自由保存***。

4

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1646963326886-1c71b63b-d952-4e05-9681-8eb4eb859948.webp)



 token可以避开同源策略吗? 

Token 完全由应用管理，所以它可以避开同源策略

 token可以在服务间共享吗？ 

Token 可以是无状态的，可以在多个服务间共享。

 token怎么生成的? 

最常见的 Token 生成方式是使用 JWT（Json Web Token），它是一种简洁的，自包含的方法用于通信双方之间以 JSON 对象的形式安全的传递信息。

上文中我们说到，使用 Token 后，服务器端并不会存储 Token，那怎么判断客户端发过来的 Token 是合法有效的呢？

答案其实就在 Token 字符串中，其实 Token 并不是一串杂乱无章的字符串，而是通过多种算法拼接组合而成的字符串，我们来具体分析一下。

JWT 算法主要分为 3 个部分：header（头信息），playload（消息体），signature（签名）。

 token存在哪里呢? 

1存储在localStorage中，每次调用接口的时候都把它当成一个字段传给后台

2存储在cookie中，让它自动发送，不过缺点就是不能跨域

3拿到之后存储在localStorage中，每次调用接口的时候放在HTTP请求头的Authorization字段里面



 token有过期时间吗？ 

token有过期时间的，jwt可以通过设置第三个属性来实现过期时间的设置

jwt.sign(xxx,xxx,time)



 Token存放在cookie, sessionStorage 和 localStorage 中的区别 

Token 在用户登录成功之后返回给客户端，客户端组要有三种存储方式

1储存在 localStorage 中，每次调用接口时放在http请求头里面，长期有效

2储存在 sessionStorage 中，每次调用接口时把它当为一个字段传给后台，浏览器关闭自动清除

3储存在 cookie 中，每次调用接口会自动发送，不过缺点是不能跨域





区别:

将 Token 存储在 webStorage(localStorage,sessionStorage) 中可以通过同域的js访问，这样导致很容易受到 ==xss== 攻击，特别是项目中引入很多第三方js库的情况下，如果js脚本被盗用，攻击者就可以轻易访问你的网站。



将 Token 存储在 cookie 中，可以指定 httponly 来防止 js 被读取，也可以指定 secure 来保证 Token 只在 HTTPS 下传输，缺点是不符合 RestFul 最佳实践，容易受到 ==CSRF== 攻击。



 jwt是啥? 

●JSON Web Token（简称 JWT）是目前最流行的跨域认证解决方案。

●是一种认证授权机制。

●

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1646908691233-c577b595-1f59-4ab3-bc9c-3597fe76ad81.webp)



●客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage。

●

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1646908797955-655290e2-c512-4d27-8720-1fdedfb522c2.webp)



 jwt和token有啥区别吗? 

相同：

●都是访问资源的令牌

●都可以记录用户的信息

●都是使服务端无状态化

●都是只有验证成功后，客户端才能访问服务端上受保护的资源

区别：

●Token：服务端验证客户端发送过来的 Token 时，还需要查询数据库获取用户信息，然后验证 Token 是否有效。

●JWT： 将 Token 和 Payload 加密后存储于客户端，服务端只需要使用密钥解密进行校验（校验也是 JWT 自己实现的）即可，不需要查询或者减少查询数据库，因为 JWT 自包含了用户信息和加密的数据。

 还有什么鉴权方式吗？ 

1Session-Cookie

2Token 验证（包括 JWT，SSO）

 Web Storage 

 cookie、localStorage、sessionStorage的区别能说说吗？ 

cookie

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/1646907904808-54267291-b896-4b91-93de-6c351b5ffce0.webp)



生命周期：

cookie：可设置失效时间，没有设置的话，默认是关闭浏览器后失效

localStorage：除非被手动清除，否则将会永久保存。

sessionStorage： 仅在当前网页会话下有效，关闭页面或浏览器后就会被清除。

存放数据大小：

cookie：4KB左右

localStorage和sessionStorage：可以保存5MB的信息。

http请求：

cookie：每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题

localStorage和sessionStorage：仅在客户端（即浏览器）中保存，不参与和服务器的通信

 Storage的方法有哪些 

clear():删除所有值(不能在firefox中实现)

getItem(name):取得给定name的值

key(index):取得给定数值位置的名称

removeItem(name):删除给定name的名/值对

setItem(name,value):设置给定name的值



 localStorage可以跨域吗 

不能，要访问同一个localStorage对象，页面必须来自同一个域(子域不可以),在相同的端口上使用相同的协议