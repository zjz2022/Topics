## 1 浏览器存储/持久化储存

### 1.1 **浏览器的存储方式有哪些，有什么差异**

**共同点：**

都是保存在浏览器端、且同源的

**区别：**

0. localStorage只能接收字符串，所以要用 JSON.stringfy(value) 来接收 value值

1. cookie数据始终在同源的http请求中携带（即使不需要），即cookie在浏览器和服务器间来回传递，而sessionStorage和localStorage不会自动把数据发送给服务器，仅在本地保存。cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下 

2. 存储大小限制也不同，cookie数据不能超过4K，同时因为每次http请求都会携带cookie、所以cookie只适合保存很小的数据，如会话标识。sessionStorage和localStorage虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大 

3. 数据有效期不同，sessionStorage：仅在当前浏览器窗口关闭之前有效；localStorage：始终有效，窗口或浏览器关闭也一直保存，因此用作持久数cookie：只在设置的cookie过期时间之前有效，即使窗口关闭或浏览器关闭 

4. 作用域不同，sessionStorage不在不同的浏览器窗口中共享，即使是同一个页面；localstorage在所有同源窗口中都是共享的；cookie也是在所有同源窗口中都是共享的 

5. web Storage支持事件通知机制，可以将数据更新的通知发送给监听者
6. Storage的api接口使用更方便

### 1.2 个人信息保存在哪里？cookie、sessionStroage两者token存放问题与解决方式

### 1.3 如何实现保持登录

##  2 localStorage

###  2.1 如何写一个会过期的localStorage，说说想法

**惰性删除 和 定时删除**

**惰性删除**

惰性删除是指，某个键值过期后，该键值不会被马上删除，而是等到下次被使用的时候，才会被检查到过期，此时才能得到删除。

```js
var lsc = (function (self) {
var prefix = 'lsc_'
    /**
    * 增加一个键值对数据
    * @param key 键
    * @param val 值
    * @param expires 过期时间，单位为秒
    */
    self.set = function(key, val, expires) {
        key = prefix + key;
        val = JSON.stringify({'val': val, 'expires': new Date().getTime() + expires * 1000});
        localStorage.setItem(key, val);
    };
    /**
    * 读取对应键的值数据
    * @param key 键
    * @returns {null|*} 对应键的值
    */
    self.get = function(key) {
        key = prefix + key;
        var val = localStorage.getItem(key);
        if (!val) {
            return null;
        }
    	val = JSON.parse(val);
        if (val.expires < new Date().getTime()) {
            localStorage.removeItem(key);
            return null;
        }
    	return val.val;
    };
    return self;
}(lsc || {}));
```

**定时删除**

定时删除是指，每隔一段时间执行一次删除操作

1. 随机测试20个设置了过期时间的key。
2. 删除所有发现的已过期的key。
3. 若删除的key超过5个则重复**步骤****1**，直至重复500次。

```javascript
var lsc = (function (self) {
	var prefix = 'lsc_'
	var list = [];
    //初始化
    self.init = function () {
        var keys = Object.keys(localStorage);
        var reg = new RegExp('^' + prefix);
        var temp = [];
        //遍历所有localStorage中的所有key
        for (var i = 0; i < keys.length; i++) {
            //找出可过期缓存的key
            if (reg.test(keys[i])) {
                temp.push(keys[i]);
            }
        }
        list = temp;
	};
	self.init();
	self.check = function () {
        if (!list || list.length == 0) {
            return;
        }
    	var checkCount = 0;
    while (checkCount < 500) {
    	var expireCount = 0;
        // 随机测试20个设置了过期时间的key
        for (var i = 0; i < 20; i++) {
            if (list.length == 0) {
                break;
            }
            var index = Math.floor(Math.random() * list.length);
            var key = list[index];
            var val = localStorage.getItem(list[index]);
            // 从list中删除被惰性删除的key
            if (!val) {
                list.splice(index, 1);
                expireCount++;
                continue;
            }
            val = JSON.parse(val);
            // 删除所有发现的已过期的key
            if (val.expires < new Date().getTime()) {
                list.splice(index, 1);
                localStorage.removeItem(key);
                expireCount++;
            }
        }
        // 若删除的key不超过5个则跳出循环
        if (expireCount <= 5 || list.length == 0) {
            break;
        }
		checkCount++;
		}
	}
    //每隔一秒执行一次定时删除
    window.setInterval(self.check, 1000);
    return self;
}(lsc || {}));
```

### 2.2 **localStorage** **能跨域吗**

不能

**解决办法**

- 通过postMessage来实现跨源通信
- 可以实现一个公共的iframe部署在某个域名中，作为共享域
- 将需要实现localStorage跨域通信的页面嵌入这个iframe

### 2.3 localstorage的注意哪些问题

1. 兼容性问题
2. localStorage在浏览器的隐私模式下面是不可读取的
3. localStorage本质上是对字符串的读取，如果存储内容多的话会消耗内存空间，会导致页面变卡
4. localStorage不能被爬虫抓取到

## 3 cookie

1. **cookie？** 

- cookie 是存储于访问者计算机中的变量。每当一台计算机通过浏览器来访问某个页面时，那么就可以通过 JavaScript 来创建和读取 cookie。

- 实际上 cookie 是存于用户硬盘的一个文件，这个文件通常对应于一个域名，当浏览器再次访问这个域名时，便使这个cookie可用。因此，cookie可以跨越一个域名下的多个网页，但不能跨越多个域名使用。

- 不同浏览器对 cookie 的实现也不一样。即保存在一个浏览器中的 cookie 到另外一个浏览器是 不能获取的。

2. 怎么使用 cookie？

语法

```javascript
document.cookie = "name=value;expires=evalue; path=pvalue; domain=dvalue;secure;”
```

3. **注意事项**

- cookie可能被禁用。当用户非常注重个人隐私保护时，他很可能禁用浏览器的cookie功能
- cookie是与浏览器相关的。这意味着即使访问的是同一个页面，不同浏览器之间所保存的cookie也是不能互相访问的
- cookie可能被删除。因为每个cookie都是硬盘上的一个文件，因此很有可能被用户删除
- cookie安全性不够高。所有的cookie都是以纯文本的形式记录于文件中，因此如果要保存用户名密码等信息时，最好事先经过加密处理
- cookie 在保存时，只要后面保存的 name 相同，那么就会覆盖前面的 cookie，注意是完全覆盖，包括失效时间，pat

4. **cookie禁用**

sessionID通过cookie保存在客户端，如果将cookie禁用，必将对session的使用造成一定的影响

解决办法：url重写









## 18 浏览器缓存（3.13滴滴一面）

### 18.1 强缓存、协商缓存区别，优势劣势

**缓存操作的目标**

HTTP 缓存只能存储 GET 请求的响应，而对其他类型的请求无能为力。

**缓存发展史**

HTTP/1.0 提出缓存概念，即强缓存 Expires 和协商缓存 Last-Modified。后 HTTP/1.1 又有了更好的方案，即强缓存 Cache-Control 和协商缓存 ETag。

为什么 Expires 和 Last-Modified 不适用呢?

Expires 即过期时间，但问题是这个时间点是服务器的时间，如果客户端的时间和服务器时间有差，就不准确。所以用 Cache-Control 来代替，它表示过期时长，这就没歧义了。

Last-Modified 即最后修改时间，而它能感知的单位时间是秒，也就是说如果在1秒内改变多次，内容文件虽然改变了，但展示还是之前的，存在不准确的场景，所以就有了 ETag，通过内容给资源打标识来判断资源是否变化。

浏览器缓存机制是一种优化网络性能的策略，主要由两个部分构成：强缓存（Expires和Cache-Control）和协商缓存（Last-Modified和Etag）。

1. 强缓存：强缓存的原理是，当浏览器进行资源请求时，先判断该资源在浏览器缓存中是否有对应的缓存以及缓存是否过期（根据Expires或Cache-Control字段判断）。如果有且缓存有效，那么就直接从缓存读取，服器端并不会收到请求。强缓存不会向服务器发送请求，直接从缓存中读取资源，在 chrome 控制台的 Network 中可以看到该请求返回 200 的状态码，并且 size 显示 from memory cache 或者 from disk cache。

2. 协商缓存：只有在强缓存失效的情况下，才会执行协商缓存的策略。协商缓存需要请求服务器，询问缓存是否仍然有效。服务器根据请求头中的If-Modified-Since或者If-None-Match字段判断。如果缓存仍然有效，则服务器返回304状态码，告诉浏览器继续使用缓存；否则，服务器会返回新的资源以及对应的缓存头信息，浏览器在接收到新的资源后，会更新缓存。

挑选强缓存还是协商缓存，需要根据业务场景、资源类型等因素进行考量。遵循的原则是：尽可能地利用缓存，同时确保用户能及时看到更新的内容。

### 18.2 强缓存怎么设置

浏览器的强缓存机制主要依赖于两个HTTP响应头部字段来控制，它们是Expires和Cache-Control。

- Expires：这是一个绝对时间，告诉浏览器在这个时间点之前，该资源可以直接从浏览器缓存中获取，而无须向服务器发送请求。例如：Expires: Wed, 22 Oct 2018 08:41:00 GMT。约定的时间格式是格林威治时间（GMT）。

- Cache-Control：这是一个相对时间，以秒为单位，告诉浏览器在这个时间段内，资源可以直接从浏览器缓存中获取，无需向服务器发送请求。例如：Cache-Control: max-age=3600，表明资源在接下来的3600秒（即1个小时）内都有效。

浏览器在处理资源请求的时候，会先检查本地的强缓存。它会查看响应头中的Expires或Cache-Control字段，如果当前时间没有超过Expires规定的时间或者没有超过Cache-Control规定的过期时间，那么浏览器会直接从缓存中获取该资源。如果两者都存在，那么Cache-Control的优先级高于Expires。

这就是浏览器判断是否有强缓存、并决定是否从缓存中获取资源的机制。

### 18.3 

浏览器通过检查本地缓存数据库来判断是否存在对应的缓存。当浏览器成功缓存一个资源时，它会将资源的一些关键信息，例如URL、响应头（包括各种控制缓存行为的头信息，如Expires，Cache-Control，Last-Modified，ETag等）以及资源的内容保存在本地的缓存数据库中。

当浏览器需要请求某个资源的时候，首先它会根据请求的URL在本地缓存数据库中查找是否有对应的记录。如果存在，那么接下来浏览器会检查这个缓存的有效性。

强缓存情况下，如我之前所述，浏览器会查看本地缓存的Expires和Cache-Control字段，确定是否可以直接使用缓存数据。

如果已经过期，那么进入协商缓存状态，浏览器会查看Last-Modified和ETag来决定接下来的操作。它会携带这些值去向服务器发送请求，由服务器确认是否需要发送新的文件资源。

所以，总的来说，浏览器是根据URL在本地查找，并依据查到的缓存的头信息的相关字段来判断缓存是否存在和是否有效。

### 18.4 协商缓存

协商缓存，也被称为弱缓存，相较于强缓存，判定缓存有效性则需要与服务器端进行交互。浏览器将携带缓存标识发送请求，由服务器根据标识信息决定是否使用缓存。

这种机制依赖于服务器返回的响应头中的Last-Modified 和 ETag。

Last-Modified：服务器在返回资源响应时，会添加这个字段，表示这个资源在服务器上最后修改的时间。

ETag：服务器根据资源的内容，生成一个唯一的标识符，只要资源有变化，这个标识符就会变。

在浏览器再次发起请求时，会携带If-Modified-Since（值为上一次返回的Last-Modified的值）或If-None-Match（值为上一次返回的ETag的值）的请求头，服务器接收到请求后，会进行判断：

- 如果请求头中携带的If-Modified-Since 或 If-None-Match 的值，与服务器上的Last-Modified或ETag值相同，说明资源没有变化，服务器就直接返回304状态码和空的响应体，浏览器直接从缓存加载数据。

- 如果If-Modified-Since 或 If-None-Match 的值与Last-Modified或ETag不相同，服务器就会将新的资源发送给客户端。

通过这种方式，服务器能够只在必要的时候才发送完整的响应。协商缓存能够充分利用缓存，减少冗余的数据传输，提高网页加载速度。

### 18.5 

强缓存：当浏览器的资源直接被强缓存命中时，服务器并没有实质性参与，浏览器直接从本地缓存加载资源。在浏览器的网络开发者工具中，它的请求状态码显示为：200 OK(from cache)。需要注意的是，这不是HTTP状态码，HTTP状态码是服务器返回给客户端的，而这种情况下，服务器并未实际参与。

协商缓存：当强缓存失效，浏览器与服务器进行协商，服务器会根据HTTP请求头信息中的If-Modified-Since或If-None-Match等字段来决定是否命中协商缓存。如果协商缓存命中，服务器会返回HTTP状态码304 Not Modified（资源未被修改）和空的响应体，告诉浏览器可以直接从缓存中读取。

无缓存：如果强缓存和协商缓存都未命中，服务器会返回完整的响应数据，HTTP状态码为200 OK，这表示资源被正常返回，此时浏览器会接收数据并更新缓存。

### 18.6 cookie

#### 18.6.1 

设置Cookie：

你可以在浏览器中使用JavaScript设置Cookie。例如，你可以使用 document.cookie 属性来创建一个新的Cookie：

document.cookie = "username=John Doe; expires=Thu, 18 Dec 2023 12:00:00 UTC; path=/";


这将创建一个名为 "username" 的Cookie，其值为 "John Doe"，过期时间是未来的某个日期，而且这个Cookie 只能在站点的根路径（及其子目录）下访问。

读取Cookie：

document.cookie 属性会返回所有的Cookie，如格式：cookie1=value; cookie2=value; cookie3=value;。要从中读取特定的Cookie，你需要使用字符串函数解析 document.cookie 的值。

删除Cookie：

删除Cookie的最常见方法是将其过期时间设置为过去的时间点。

#### 18.6.2 

- http only属性？

  - 在哪里设置？前端还是后端设置？

如果你不想让浏览器的JavaScript脚本访问Cookie，你可以设置Cookie的 HttpOnly 标志。HttpOnly标记告诉浏览器这个Cookie只能通过HTTP(S)请求访问，JavaScript无法访问。

例如，服务器可以在设置Cookie时包含下面的HTTP头部信息：

Set-Cookie: id=a3fWa; Expires=Thu, 21 Oct 2021 07:28:00 GMT; Secure; HttpOnly


这个 HttpOnly 标记不能在前端设置，它必须在后端设置。这是因为前端JavaScript不允许修改HTTP响应头部，它只能读取从服务器发送的Cookie，并且只能修改没有 HttpOnly 标记的Cookie。如果一个Cookie被标记为 HttpOnly，浏览器就不会允许任何客户端脚本（如JavaScript）访问到这个Cookie。这可以防止一些XSS（跨站脚本攻击）攻击。

### 

### 18.15 

### 18.18 前端缓存

### 18.19 

### 18.20 

### 18.21 

### 18.22 





## **4 












