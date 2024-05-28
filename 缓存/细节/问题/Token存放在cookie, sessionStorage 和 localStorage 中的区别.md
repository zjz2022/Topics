### Token存放在cookie, sessionStorage 和 localStorage 中的区别

Token 在用户登录成功之后返回给客户端，客户端组要有三种存储方式



1. 储存在 localStorage 中，每次调用接口时放在http请求头里面，长期有效
2. 储存在 sessionStorage 中，每次调用接口时把它当为一个字段传给后台，浏览器关闭自动清除
3. 储存在 cookie 中，每次调用接口会自动发送，不过缺点是不能跨域

**区别:**
将 Token 存储在 webStorage(localStorage,sessionStorage) 中可以通过同域的js访问，这样导致很容易受到 xss 攻击，特别是项目中引入很多第三方js库的情况下，如果js脚本被盗用，攻击者就可以轻易访问你的网站。



将 Token 存储在 cookie 中，可以指定 httponly 来防止 js 被读取，也可以指定 secure 来保证 Token 只在 HTTPS 下传输，缺点是不符合 RestFul 最佳实践，容易受到 CSRF 攻击。