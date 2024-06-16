> 博主在总结了大量的面试经验贴之后，发现关于Cookie的考点是面试官的宠儿，无论是在入职后的工作场景中，还是面试上，这都是我们不可避免的一道坎，所以，让我们一起来跨越这道坎吧，勇于面对它，没有什么困难是不能解决的。

## 一、Cookie

### 什么是Cookie

> HTTP是无状态的协议，对于事务处理没有记忆能力，每次客户端和服务端会话完成时，服务端不会保存任何会话信息，每个请求都是完全独立的，如果服务端想要确认当前访问者的身份信息，就必须主动维护一个状态，这个状态是用来告知服务器前后两个请求是否来自同一个客户端，这个状态就是需要通过cookie或session来实现，cookie就是服务器发送到用户浏览器并保存在本地的一小块数据，它会在浏览器下次向同一服务器发起请求时被携带并发送到服务器上。

### Cookie是否可以跨域

> Cookie是不可跨域的，每个Cookie都会绑定单一的域名，无法在别的域名下获取使用，一级域名和二级域名之间通过domain是允许共享使用的。例如baidu.com是一级域名，asdx.iisp.com则是二级域名。

### Cookie的主要用途

- 会话状态管理（如用户登录状态、购物车、游戏分数或其他需要记录的信息）
- 个性化设置（如用户自定义设置、主题等）
- 浏览器行为跟踪（如跟踪分析用户行为等）

### 如何实现Cookie跨域

> 浏览器发起跨域请求的时候，是不会主动带上cookie的，如果想要实现跨域获取cookie，可以进行如下的设置。

1. 前端发送请求时将withCredentials置为true。
2. 后端将Access-Control-Allow-Origin字段的值设置为发起请求的域名。
3. 后端设置请求头Access-Control-Allow-Credentials置为true。

### cookie是如何保存到本地的？

> 服务端通过返回响应头，set-cookie字段，然后设置对应的值即可。

### Cookie的各种属性

#### 1. name

> name表示的是cookie的名字，一个域名下的cookie，name不能相同，相同的name会被覆盖掉。

#### 2. value

> value属性表示的是对应cookie的值。

#### 3. domain

> domain属性代表的是cookie绑定的域名，如果没有设置就会自动绑定到执行语句的当前页面，同一个域名下的二级域名是不能交换使用cookie的，比如 [www.baidu.com](https://link.juejin.cn?target=http%3A%2F%2Fwww.baidu.com) 和image.baidu.com，但是如果设置为.taobao.com，这样无论是a.taobao.com还是b.taobao.com都可以使用cookie，需要注意的是不能跨域设置cookie，比如阿里域名下的页面吧domain设置为百度是无效的。

#### 4. path

> path指定了可以共享Cookie的子目录，一般情况下默认是根目录你，这样所有的子目录都可以共享，如果设置了子目录，其上级目录是无法访问cookie的，但是其下级目录可以共享该cookie。domain和path共同标识了Cookie的作用域，即Cookie应该发送给哪些URL。

#### 5. Expires/Max-Age

> 这个属性用于设置cookie的有效期，如果没有设置则默认是在会话期间有效即session,所谓的会话期间就是指当客户端被关闭的时候，cookie就会被移除。Expires用于指定具体的过期时间，而Max-Age则以秒为单位设置多少秒之后过期，如果这个值为0表示删除cookie，如果这个值为负数的情况，表示的是临时存储，不会产生cookie文件，如果Max-Age和Expires同时存在，那么Max-Age优先级更高。

#### 6. HttpOnly

> 设置了HttpOnly属性的Cookie不能被JS代码获取到，也就意味着无法通过在浏览器控制台通过document.cookie获取到该cookie，所以这是一种安全措施，能够有效的防止xss攻击。

#### 7. Secure

> 这是cookie的安全属性，标记为Secure的Cookie只能通过HTTPS写加密过的请求发送给服务端，这样可以保护Cookie在浏览器和服务器之间的传输过程中不被窃取和篡改，防止出现HTTP劫持的情况。

#### 8. SameSite

> 该属性用于限制第三方Cookie的发送场景，有下面三种取值：

- Strict：跨站情况下，任何情况都不会发送Cookie。
- Lax：默认值，除了下面三种情况外，不发送第三方Cookie

- - a标签
  - link标签
  - 方法是GET的form表单请求

- None：所有的跨站都允许发送cookie，如果设置为None的话，必须开启Secure属性。

### Cookie的优缺点

#### 优点

1. 极高的拓展性和可用性。
2. 通过加密和安全传输技术SSL，减少cookie被破解的可能性。
3. 可以配置cookie的生命周期，使得即使cookie被盗，但是拿到的是一个过期的cookie。

#### 缺点

1. 特定域名下的cookie的数量有限，当超过这个限制之后，再设置cookie，浏览器就会清除以前设置的cookie。
2. cookie的大小限制为4kb。
3. 需要自己封装获取、设置和删除cookie的方法。
4. 存在安全问题，如果cookie被拦截了，拦截者无需解密cookie，只需转发cookie就能达到某种目的。
5. 有些状态不可能保存在客户端。
6. cookie无法跨域使用。

### 当HTTP协议的域名访问HTTPS协议的域名会携带cookie吗？

> 当Cookie的属性Secure设置为true的时候，此时不会进行cookie共享，但是如果没有进行这个设置的情况下，是可以共享的。

### 为什么Cookie不安全？

> 因为Cookie存储在浏览器端，一些不法分子可能通过抓包工具等截获cookie。

### 如何解决Cookie安全性问题？

1. 设置cookie的有效期的时候，尽量不要设置过长。
2. 设置HttpOnly属性为true。防止JS脚本读取cookie信息，可以防止XSS攻击。
3. 对cookie进行加密。
4. 用户第一次登录的时候，将IP和cookie进行加密后，然后保存为一个token，每次请求时都将cookie和IP组合起来加密进行对比，只有完全对应才能验证成功。
5. session和cookie同时使用。
6. 尽可能使用HTTPS。

## 二、Session

### 什么是Session？

> Session代表着服务器和客户端一次会话的过程，session对象中存储着特定用户会话所需的属性和配置信息，这样当用户在应用程序的Web页面之间跳转时，存储在session对象中的变量将不会丢失，而是在整个用户会话中一直存在下去，当客户端关闭会话或者session超时失效的时候会话结束。服务器使用Cookies实现session，cookies里面包含一个Session Id，web应用程序将此session id和其内部数据进行配对，并检索存储的变量以供请求的页面使用。

### Session如何区别用户？

> 当服务器第一次收到请求时，开辟了一块session空间，并创建了session对象，同时生成一个sessionId，并通过响应头set-cookie: jsessionid=xxxx向客户端进行响应，客户端收到该响应后，会在本机客户端的cookie信息中设置jsessionid，接下来客户端每次向同一个网站发送请求的时候，该请求头都会带上该cookie信息，这个cookie信息中包含了sessionid，服务器以此来区分不同的用户。

### Session的缺点是什么？

> 假如A服务器存储了Session，如果做了负载均衡之后，A可能会将用户的请求转发到服务器B，但是服务器B并没有存储A的session，就会导致session的失效问题。

### Session和Cookie的区别

1. cookie数据存在客户端，session数据存储在服务器上。
2. cookie因为存储在客户端，安全性不如session。
3. session因为存储在服务器上，如果访问增多的情况下，会比较占用服务器的性能。
4. 单个cookie存储数据的大小不能超过4K，很多浏览器都对存储cookie的数量进行了限制，session存储的数据量可能高于cookie。
5. session的实现依赖于cookies,需要把session id存储在cookies中。
6. 有效期不同，cookie可能设置为长时间保存，但是session一般失效时间较短，客户端关闭或者session超时都可能失效。