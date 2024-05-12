# 前端难点（面经）

## 9.1 多图加载方案

在前端展示1000张图片时，如果一次性加载，可能会导致页面加载缓慢，用户体验下降。以下是一些可以应用的优化策略：

1. **懒加载（Lazy Loading）**：只有当图片进入或即将进入视口时，才加载图片。这可以减少初始页面加载的时间。在最新的HTML标准中，可以直接使用loading="lazy"属性。

```html
<img data-src="image.jpg" alt="description" loading="lazy">
```

如果你希望使用JavaScript来实现懒加载，可以使用Intersection Observer API。

```js
let images = document.querySelectorAll('img[data-src]');

let imgObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let img = entry.target;
      img.src = img.getAttribute('data-src');
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  imgObserver.observe(img);
});
```

1. 图片压缩：对图片进行压缩可以减少图片的大小，从而减少加载时间。可以使用工具或库如imagemin，或者在服务器端进行图片压缩。
2. 使用CDN：通过使用内容分发网络（CDN），可以将图片缓存到距离用户更近的服务器上，从而减少加载时间。
3. 使用缩略图：如果图片的细节不重要，可以先加载缩略图，当用户点击时再加载完整的图片。
4. 分页加载/无限滚动：不是一次性加载所有图片，而是当用户滚动到页面底部时，加载更多图片。可以使用分页(Pagination)或无限滚动(Infinity Scrolling)的方式来实现。
5. 虚拟滚动。同懒加载，可以使用ElementUI和vue-virtual-scroller进行显示。

以下是一个简单的无限滚动的实现：

```js
let page = 0;

let inScroll = false;

function loadImages() {
  if (inScroll) {
    return;
  }
//然后，我们定义一个布尔变量inScroll，用于防止在加载图片时重复发送请求。
  inScroll = true;

  fetch(`/api/images?page=${page}`)
    .then(response => response.json())
    .then(data => {
      page++;
      data.forEach(image => {
        let img = document.createElement('img');
        img.src = image.url;
        document.body.appendChild(img);
      });

      inScroll = false;
    });
}

window.onscroll = function() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
    loadImages();
  }
};

loadImages();
```

注意，这是一个基础的实现，实际的应用可能需要进行错误处理、API防抖、空数据处理等。

## 9.2 axios

axios 是基于 http （基于 tcp 传输层）的网络请求库。

**拦截器执行顺序：**

​		请求的发送需要在请求拦截器之后，在响应拦截器之前，所以数组先放入request，接着在数组的前后分别加入请求和响应拦截器，由于加入请求拦截器的方法是unshift，所以最后通过promise进行请求的链式调用的时候，我们可以看到执行顺序是从左往右的，所以**最后注册的请求拦截器会最先执行**，而响应拦截的执行顺序和注册顺序是一样的。

**fetch和axios区别：**

- Axios可以兼容IE浏览器，而Fetch在IE浏览器和一些老版本浏览器上没有受到支持
- 传递数据的方式不同，Axios是放到`data`属性里，以对象的方式进行传递，而Fetch则是需要放在`body`属性中，以字符串的方式进行传递
- Axios的相应超时设置是非常简单的，直接设置`timeout`属性就可以了，而fetch需要通过new AbortController()然后设置settimeout
- Axios还有非常好的一点就是会自动对数据进行转化，而Fetch则不同，它需要使用者进行手动转化。
- Axios的一大卖点就是它提供了拦截器，可以统一对请求或响应进行一些处理，使用它可以为请求附加token、为请求增加时间戳防止请求缓存，以及拦截响应，一旦状态码不符合预期则直接将响应消息通过弹框的形式展示在界面上，比如密码错误、服务器内部错误、表单验证不通过等问题。而Fetch没有拦截器功能，但是要实现该功能并不难，直接重写全局Fetch方法就可以办到。
- Fetch唯一碾压Axios的一点就是现代浏览器的原生支持。

https://juejin.cn/post/6934155066198720519#heading-2

**如何取消请求：**

1 利用防抖

2 利用request.cancel

通过 cancel 属性来取消请求 另一种方法是直接在请求对象上设置 cancel 属性，该属性是一个函数。当您需要取消请求时，只需调用此函数即可。

3 利用CancelToken()

我们首先创建了一个名为 source 的 CancelToken 实例，并将其传递给请求的 config 对象中。然后，在需要取消请求的位置，我们通过调用 source.cancel() 方法来发送取消请求信号。如果请求已经被取消，则会抛出一个包含取消原因的错误，并且您可以在 catch 块中检查这个错误并处理它。

4 利用signal

参数中携带signal：controller.signal, 设置一个全局变量controller= null，第一行进行判断controller && controller.abort()，第二行controller = new AbortController()

你可以在 Vue.js 应用中创建一个单独的服务文件（例如 `httpService.js`），在这个文件中封装你的 Axios 请求。下面是一个简单的示例：

```js
// 引入axios库
import axios from 'axios';

// 创建axios实例
const http = axios.create({
  baseURL: 'http://api.example.com',  // API服务器的基础URL
  timeout: 1000,  // 设置请求超时时间,时间内就接受，时间外就catch
});

// 添加请求拦截器
http.interceptors.request.use(config => {
  // 在发送请求之前，可以在这里做些什么，例如添加Token到header
  config.headers['Authorization'] = 'Bearer token';
  return config;
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
http.interceptors.response.use(response => {
  // 对响应数据做点什么，例如处理不同的HTTP状态码
  if (response.status === 200) {
    return response.data;
  } else {
    return Promise.reject(response);
  }
}, error => {
  // 对响应错误做点什么
  return Promise.reject(error);
});

// 导出http对象
export default http;
```

然后你可以在 Vue.js 组件中这样使用这个封装好的服务：

```js
import http from './httpService';

export default {
  data() {
    return {
      posts: [],
    };
  },
  async created() {
    try {
      this.posts = await http.get('/posts');
    } catch (error) {
      console.error(error);
    }
  },
};
```

这个封装的服务包含了请求拦截器和响应拦截器，可以方便你在请求之前或响应之后执行某些操作，例如添加认证信息到请求头，或处理不同的 HTTP 状态码。注意，这只是一个基本的例子，实际的需求可能更复杂。

**axios底层原理XHR**

~~~js
class Axios {
    constructor() {

    }

    request(config) {
        return new Promise(resolve => { //利用promise
            const {url = '', method = 'get', data = {}} = config;
            // 发送ajax请求
            const xhr = new XMLHttpRequest();
            xhr.open(method, url, true);
            xhr.onload = function() {
                console.log(xhr.responseText)
                resolve(xhr.responseText);
            }
            xhr.serRequestHeader(k,v)//发送额外配置的头部字段
            xhr.send(data);//如果data为空需要传null
        })
    }
}
// 最终导出axios的方法，即实例的request方法
function CreateAxiosFn() {
    let axios = new Axios();
    let req = axios.request.bind(axios);
    return req;
}

// 得到最后的全局变量axios
let axios = CreateAxiosFn();
//接收到数据后xhr对象上的一下属性会被填充
```
reponseText：作为响应主体被返回的文本。
responseXML：如果响应的内容类型是“text/xml”或“application/xml”，这个属性中将保存包含着响应数据的XML DOM文档。
status ： 响应的HTTP状态。
statusText：HTTP状态的说明。
```
//XHR头部信息：setRequestHeader
```
Accept：浏览器能够处理的内容类型。
Accept-Charset：浏览器能够处理的字符集。
Accept-Encoding：浏览器能够处理的压缩编码。
Accept-Language：浏览器当前设置的语言。
Connection：浏览器与服务器之间连接的类型。
Cookie：当前页面设置的任何Cookie。
Host：发出请求的页面所在的域。
Referer：发出请求的页面的URL。注意，HTTP规范将这个头部字段拼写错了，
而为保证与规范一致，也只能讲错就错了。(这个英文单词的正确拼法应该是
referrer。）
User-Agent：浏览器的用户代理字符串。
```
// 定义get,post...方法，挂在到Axios原型上 axios.method()
const methodsArr = ['get', 'delete', 'head', 'options', 'put', 'patch', 'post'];
methodsArr.forEach(met => {
    Axios.prototype[met] = function() {
        console.log('执行'+met+'方法');
        // 处理单个方法
        if (['get', 'delete', 'head', 'options'].includes(met)) { // 2个参数(url[, config])
            return this.request({
                method: met,
                url: arguments[0],
                ...arguments[1] || {}
            })
        } else { // 3个参数(url[,data[,config]])
            return this.request({
                method: met,
                url: arguments[0],
                data: arguments[1] || {},
                ...arguments[2] || {}
            })
        }

    }
})
~~~

1. **创建一个新的** **`axios`** **实例：** 当你调用 `axios.method()` 函数时，Axios 首先会创建一个新的 `axios` 实例。这个实例包含了 Axios 的所有功能，包括拦截器、转换函数、取消功能等。
2. **合并配置参数：** Axios 会将你提供的配置参数与默认配置合并。例如，如果你提供了一个 URL，但没有提供方法，那么 Axios 会使用默认的 `get` 方法。合并后的配置将被应用到新创建的 `axios` 实例上。
3. **创建一个新的 HTTP 请求：** Axios 会使用配置中的 URL、方法、头部信息、数据等，创建一个新的 HTTP 请求。这个请求是由 XMLHttpRequest 对象（浏览器）或 http 模块（Node.js）创建的，这取决于你在哪个环境中使用 Axios。
4. **发送 HTTP 请求：** Axios 会将创建好的 HTTP 请求发送到服务器。发送请求的过程可能会触发请求拦截器，拦截器可以修改请求或添加额外的功能，例如日志记录。
5. **处理响应：** 当服务器返回响应时，Axios 会接收到这个响应。Axios 会解析响应的状态码、头部信息和数据，然后将其封装到一个新的 Promise 对象中。这个过程可能会触发响应拦截器，拦截器可以修改响应或添加额外的功能。
6. **返回 Promise：** Axios 的 `method()` 函数返回的是一个 Promise 对象。这个 Promise 代表了 HTTP 请求的结果，你可以使用 `.then` 或 `.catch` 来处理这个 Promise。如果请求成功，Promise 将被解析并返回响应数据；如果请求失败，Promise 将被拒绝并返回错误信息。

## 9.3 Koa

Express优点：线性逻辑，通过中间件形式把业务逻辑细分、简化，一个请求进来经过一系列中间件处理后再响应给用户，清晰明了。 缺点：基于 callback 组合业务逻辑，业务逻辑复杂时嵌套过多，异常捕获困难。

Koa优点：首先，借助 co 和 generator，很好地解决了异步流程控制和异常捕获问题。其次，Koa 把 Express 中内置的 router、view 等功能都移除了，使得框架本身更轻量。 缺点：社区相对较小

- express采取回调方式解决异步问题，koa采取promise方式解决异步问题
- express 内置许多中间件，koa只提供了核心代码，没有扩展其他中间件
- express中间件与koa中间件又差异
- express只能通过回调的方式处理错误，koa可以通过监听 on("error") 处理错误
- koa中请求与响应都扩展到了ctx上，express是直接对请求req与响应res进行扩展

**KOA启动服务的流程**

koa 主要的启动流程就是下面的 4 步：引入 koa 包 => 实例化 koa => 编写中间件 => 监听服务器

实例化koa：

​		执行 constructor ，将 ctx、response、request 等对象封装在 koa 实例中；

编写中间件：

​		首先判断 fn 的类型，不是方法直接抛错 => 是生成器函数的话用 co 封装 => 是 async 函数的话直接放入中间件数组中 => 如果是普通函数的话，1.X 版本会报错，2.X 版本可以执行，但是由于没有 next，只能执行第一个

​		koa 的中间件机制巧妙的运用了闭包和 async await 的特点，形成了一个洋葱式的流程，和 JS 的事件流 (捕获 -> target -> 冒泡) 相似

```js
const koa = require("koa");
const app = new koa();
app.use(function 1(){}) 
//use 的作用就是把中间件函数依次放入 ctx.middleware 中，等待请求到来的时候顺序调用
app.listen(port,function(){})
//封装原生的 node sever 监听
//封装 koa.callback()，并且为这个服务器设置了 node 的 request 事件，这意味着当每一个请求到来时就会执行 koa.callback() 方法，这是极为关键的一步，是 koa 中间件原理的基础
```

**普通函数采用 dispatch 算法也能取得洋葱式的流程，为何要使用 async ?**

因为next()采用的异步算法。

**为何要用 Promise.resolve 返回**

因为他是洋葱式的层级，如果用普通的 Boolean 返回的话，只能返回到上一层，没法全局获取，对错误的把控难以控制。Promise 任何一层报错，都能用 catch 捕获

https://www.ucloud.cn/yun/94307.html

## 9.4 React坑

### 9.4.1 过期闭包

​		过期闭包就是闭包中的变量获取的是过期的取值。解决过期闭包最好的方法就是在useEffect中合理管理依赖变量，或者是在useState中使用函数更新状态。 当然，解决过期闭包最关键的一点就是保证闭包中的变量能够及时获取最新的数值。

### 9.4.2 父子引用函数

​		一个最简单的 case 就是一个组件依赖了父组件的 callback，同时内部 useffect 依赖了这个 callback，每次 Parent 重渲染都会生成一个新的 fetchData，因为 fetchData 是 Child 的 useEffect 的 dep，每次 fetchData 变动都会导致子组件重新触发 effect，一方面这会导致性能问题，假如 effect 不是幂等的这也会导致业务问题（如果在 effect 里上报埋点怎么办）

解决思路1：不再 useEffect 里监听 fetchData: 导致 stale closure 问题 和页面 UI 不一致。此时一方面父组件 query 更新，但是子组件的搜索并未更新但是子组件的 query 显示却更新了，这导致了子组件的 UI 不一致。

解决思路2：在思路 1 的基础上加强刷 token

- 如果子组件的 effect 较多，需要建立 refreshToken 和 effect 的映射关系
- 触发 eslint-hook 的 warning，进一步的可能触发 eslint-hook 的 auto fix 功能，导致 bug
- fetchData 仍然可能获取的是旧的闭包？

解决思路3：useCallback 包裹 fetchData, 这实际上是把 effect 强刷的控制逻辑从 callee 转移到了 caller

解决思路4：使用 useEventCallback 作为逃生舱，

解决思路5：拥抱 mutable，实际上这种做法就是放弃 react 的快照功能（变相放弃了 concurrent mode )，达到类似 vue3 的编码风格。实际上我们发现 hook + mobx === vue3, vue3 后期的 api 实际上能用 mobx + hook 进行模拟。

解决思路6：useReducer 这也是官方推荐的较为正统的做法我们仔细看看我们的代码，parent 里的 fetchData 为什么每次都改变，因为我们父组件每次 render 都会生成新的函数，为什每次都会生成新的函数，我们依赖了 query 导致没法提取到组件外，除了使用 useCallback 我们还可以将 fetchData 的逻辑移动至 useReducer 里。因为 useReducer 返回的 dispatch 永远是不变的，我们只需要将 dispatch 传递给子组件即可，然而 react 的 useReducer 并没有内置对异步的处理，所以需要我们自行封装处理, 幸好有一些社区封装可以直接拿来使用，比如 zustand, 这也是我目前觉得较好的方案，尤其是 callback 依赖了多个状态的时候。

https://juejin.cn/post/6916792895055855623

## 9.5 登录流程

https://juejin.cn/post/7083481223384793096

## 9.6 图片放大镜

1. 黄色的遮挡层跟随鼠标功能。
2. 把鼠标坐标给遮挡层不合适。因为遮挡层坐标以父盒子为准。
3. 首先是获得鼠标在盒子的坐标。
4. 之后把数值给遮挡层做为left 和top值。
5. 此时用到鼠标移动事件，但是还是在小图片盒子内移动。
6. 发现，遮挡层位置不对，需要再减去盒子自身高度和宽度的一半。
7. 遮挡层不能超出小图片盒子范围。
8. 如果小于零，就把坐标设置为0
9. 如果大于遮挡层最大的移动距离，就把坐标设置为最大的移动距离
10. 遮挡层的最大移动距离：小图片盒子宽度 减去 遮挡层盒子宽度

```html
<div>
    <!-- 小图与遮罩 -->
    <div id="small">
        <img src="images/189602.jpg"  class="small-img" alt="" >
        <div id="mark"></div>
    </div>
    <!-- 等比例放大的大图 -->
    <div id="big">
        <img src="images/189602.jpg" alt="" id="bigimg">
    </div>
</div>
 window.addEventListener("load", function() {
        // 获取小图和遮罩、大图、大盒子
        var small = document.getElementById("small")
        var mark = document.getElementById("mark")
        var big = document.getElementById("big")
        var bigimg = document.getElementById("bigimg")
        // 在小图区域内获取鼠标移动事件;遮罩跟随鼠标移动
        small.onmousemove = function (e) {
            // 得到遮罩相对于小图的偏移量(鼠标所在坐标-小图相对于body的偏移-遮罩本身宽度或高度的一半)
            var s_left = e.pageX - mark.offsetWidth / 2 - small.offsetLeft
            var s_top = e.pageY - mark.offsetHeight / 2 - small.offsetTop
            // 遮罩仅可以在小图内移动，所以需要计算遮罩偏移量的临界值（相对于小图的值）
            var max_left = small.offsetWidth - mark.offsetWidth;
            var max_top = small.offsetHeight - mark.offsetHeight;
            // 遮罩移动右侧大图也跟随移动（遮罩每移动1px，图片需要向相反对的方向移动n倍的距离）
            var n = big.offsetWidth / mark.offsetWidth
            // 遮罩跟随鼠标移动前判断：遮罩相对于小图的偏移量不能超出范围，超出范围要重新赋值（临界值在上边已经计算完成：max_left和max_top）
            // 判断水平边界
            if (s_left < 0) {
                s_left = 0
            } else if (s_left > max_left) {
                s_left = max_left
            }
            //判断垂直边界
            if (s_top < 0) {
                s_top = 0
            } else if (s_top > max_top) {
                s_top = max_top
            }
            // 给遮罩left和top赋值（动态的？因为e.pageX和e.pageY为变化的量），动起来！
            mark.style.left = s_left + "px";
            mark.style.top = s_top + "px";
            // 计算大图移动的距离
            var levelx = -n * s_left;
            var verticaly = -n * s_top;
            // 让图片动起来
            bigimg.style.left = levelx + "px";
            bigimg.style.top = verticaly + "px";
        }
        // 鼠标移入小图内才会显示遮罩和跟随移动样式，移出小图后消失
        small.onmouseenter = function () {
            mark.style.display = "block"
            big.style.display= "block"
        }
        small.onmouseleave = function () {
            mark.style.display = "none"
            big.style.display= "none"
        }
    })
* {
        margin: 0;
        padding: 0;
    }

    #small {
        width: 500px;
        height: 320px;
        float: left;
        position: relative;
    }

    #big {
        /* background-color: seagreen; */
        width: 768px;
        height: 768px;
        float: left;
        /* 超出取景框的部分隐藏 */
        overflow: hidden;
        margin-left: 20px;
        position: relative;
        display: none;
    }

    #bigimg {
        /* width: 864px; */
        position: absolute;
        left: 0;
        top: 0;
    }

    #mark {
        width: 220px;
        height: 220px;
        background-color: #fff;
        opacity: .5;
        position: absolute;
        left: 0;
        top: 0;
        /* 鼠标箭头样式 */
        cursor: move;
        display: none;
    }

    .small-img {
        width: 100%;
        height:100%;
    }
```

## 9.7 视频播放

**RTSP和HLS的特点**

​		RTSP，是目前三大流媒体协议之一，即实时流传输协议。它本身并不传输数据，传输数据的动作可以让UDP/TCP协议完成，而且RTSP可以选择基于RTP协议传输。RTSP对流媒体提供了诸如暂停，快进等控制，它不仅提供了对于视频流的控制还定义了流格式，如TS、 mp4 格式。最大的特点除了控制视频操作外还具有低延时的特点，通常可实现毫秒级的延时，但是也存在一些弊端，如该视频流技术实现复杂，而且对浏览器很挑剔，且flash插件播不了，这也极大的限制了它的发展。

​		HLS，由苹果公司提出，它是基于Http的流媒体网络传输协议，主要传输TS格式流，最大的特点是安卓、苹果都能兼容，通用性强，而且码流切换流畅，满足不同网络、不同画质的用户播放需要，但是因为该种视频流协议也存在较为致命的缺陷，那就是网络延时太高。本质上HLS视频流传输是将整个视频流分成一个个小切片，可理解为切土豆片，这些小片都是基于HTTP文件来下载——先下载，后观看。用户观看视频实际上是下载这些小的视频切片，每次只下载一些，苹果官方建议是请求到3个片之后才开始播放，若是直播，时延将超10秒，所以比较适合于点播。因此HLS视频的切片一般建议10s，时间间隔太短就切容易造成碎片化太严重不方便数据存储和处理，太长容易造成时延加重。

**前端加载RTSP视频流：**

1. 使用媒体服务器进行转码：你可以设置一个媒体服务器，如 Wowza、GStreamer、FFmpeg 或 Red5，将 RTSP 流转码为浏览器支持的流格式，如 HTTP Live Streaming（HLS）或者 MPEG-DASH。然后，你可以使用 video 标签或者一些 JavaScript 库（如 video.js、hls.js）在前端播放转码后的流。
2. 使用 WebRTC：使用WebRTC播放RTSP视频流的过程中，你需要一个媒体服务器来做转码，比如使用GStreamer或者FFmpeg，将RTSP流转成WebRTC流。这需要后端的支持。在前端，你需要用到JavaScript的WebRTC API来播放视频。WebRTC并不是将视频流转换为图片流进行发送的。它处理的是压缩编码的音视频数据流，这是一种更有效的数据传输方式。具体来说，RTSP（实时流协议）视频流通常包含H.264或其他格式的编码视频数据。这些数据是连续的帧序列，每一帧都是图像的一部分，但并非直接的图像流。这些帧包括I帧（关键帧，包含完整的图像信息）和P帧（预测帧，只包含与前一帧的差异信息）。当你使用像GStreamer这样的媒体服务器接收RTSP流时，你是在接收这些编码的视频数据，而不是逐帧图像。然后，GStreamer可以将这些编码的数据重新打包为WebRTC可以理解的格式，然后通过WebRTC协议发送出去。
3. 使用插件或者特定的浏览器：一些浏览器插件和特定的浏览器（如 VLC 插件、QuickTime 插件、IE 浏览器等）可以直接播放 RTSP 流。但这种方法的兼容性不好，且用户体验也不理想。

```js
//<video src="" poster=""></video>
autoplay:视频会马上自动开始播放，不会停下来等着数据载入结束
autobuffer(preload):视频会自动开始缓存
crossorigin:该枚举属性指明抓取相关图片是否必须用到CORS。不加这个属性时，抓取资源不会走CORS请求(即，不会发送 Origin: HTTP 头)，保证其在 <canvas> 元素中使用时不会被污染。
width|height
```

RTSP视频流：

```js
1 rtsp2web 是一个依赖 ffmpeg，能实时将传入的 rtsp 视频流转码成图像数据并通过 ws 推送到前端的智能工具包。
优点：
高性能，配置丰富。
并发，支持同时播放多路视频。
合并同源，多个视频窗口同时播放同一个rtsp视频源时，只会创建一个转码进程，不会创建多个。
智能释放资源，智能检测当前没有在使用的转码进程，将其关闭，并释放电脑资源。

2 将RTSP视频流在后端进行转码通过IPB视频压缩进行传输(base64)，然后通过websocket进行发送，要使用这种帧间压缩技术，通常你需要选择一个具有这种功能的视频编码器。例如，H.264（AVC）、H.265（HEVC）、VP8、VP9和AV1等，这些都是支持这种压缩技术的视频编码器。使用这些编码器进行视频压缩的过程通常是由具体的编码库（例如FFmpeg）或者工具（例如HandBrake）实现的。
	1. I帧也被称为关键帧，这是一个独立的帧，不依赖于任何其他帧进行解码。I帧包含了一帧完整的图像数据，就像一张静态的图片。视频播放时，通常从最近的I帧开始。由于I帧包含完整的图像数据，所以它的大小一般比P帧和B帧要大。但是，I帧的存在使得视频具有了“随机访问”（seek）的功能，也就是说，你可以任意跳转到视频的任何位置开始播放。
	2.P帧依赖于前面最近的I帧或者P帧进行解码。P帧只存储与前一帧的差异信息，而不是完整的图像信息。这使得P帧的大小通常小于I帧。
	3. B帧既依赖于前面的帧（I帧或P帧），也依赖于后面的帧（I帧或P帧）进行解码。B帧只存储与前后帧的差异信息，所以它的大小通常是这三种帧类型中最小的。然而，由于B帧依赖于后面的帧，所以在处理B帧时需要更多的计算资源。
```

除了Base64，传输视频数据的其他一些常见方式包括：

1. 二进制流：使用原始的二进制数据流直接传输。许多网络协议（如TCP/IP和WebSocket）都支持直接传输二进制数据。
2. HTTP流：在这种方式中，服务器将视频作为连续的数据流发送，而不是一次性发送整个文件。客户端可以接收并处理数据流，这样可以实现实时的视频播放。这种技术常见于直播和在线视频流应用中。
3. MPEG-DASH或HLS：这两种都是适应性流媒体传输协议，它们通过将视频分割成一系列较小的HTTP请求的片段，使得视频播放器可以选择从不同质量级别的片段中进行下载和播放，以此适应网络条件的变化。
4. RTMP/RTSP：这两种都是实时流媒体协议，用于实时音视频数据的传输，常用于互动直播、视频会议等场合。
5. WebRTC：这是一个开源项目，它使得网页应用程序能够进行实时通信(RTC)，支持视频会话、文件传输等。

这些方式各有优点和适用的场景，你可以根据你的具体需求选择合适的方式。

**点云数据进行播放：**

点云数据的实时播放在前端通常通过WebGL库来实现，比如Three.js或者Potree。

1. LOD (Level of Detail)：这是一种在计算机图形中常用的技术，通过降低远离视点或移动较快的对象的细节来减少渲染负担。在处理点云数据时，可以根据每个点与摄像机的距离来选择性地渲染点。距离摄像机越远的点，其细节级别就越低，可能会降低渲染的精度，或者完全不渲染这些点。这种方式可以大大降低渲染的复杂度，提高渲染性能。
2. 八叉树：这是一种用于分割三维空间的数据结构，使得我们能够更快地查询和更新空间中的点。在点云中，八叉树可以用来实现空间的分层和数据的精简。我们可以通过建立八叉树，将点云数据分成多个区域，并在每个区域内只保留一部分代表性的点。当渲染时，我们可以根据摄像机的位置和方向，只选择和渲染一部分区域，从而大大减少需要渲染的点的数量。

```html
<template>
  <div id="canvas-container"></div>
</template>

<script>
import * as THREE from 'three';
export default {
  mounted() {
    this.initThree();
  },
  methods: {
      //进行初始化
    initThree() {    },
      // 创建xyz点云
    createPointCloud() {
      const geometry = new THREE.BufferGeometry();
    },
      // 进行动画渲染
    animate() {
      requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
    },
  },
};
</script>
```

**点云数据前端渲染，和rtsp帧同步**

在前端进行实时播放点云数据和RTSP流数据可能会面临几个挑战：

1. 性能问题：实时播放点云数据和视频流需要大量的CPU和GPU资源。点云渲染特别需要高性能的GPU。如果硬件性能不足，可能会导致渲染延迟、帧率低或者浏览器崩溃。对于移动设备和老旧设备，这个问题可能更严重。
2. 网络问题：实时流数据需要稳定、高速的网络连接。如果网络带宽不足或者连接不稳定，可能会导致数据丢失、延迟或者卡顿。特别是在移动网络和公共Wi-Fi环境下，这个问题可能更严重。
3. 兼容性问题：不是所有的浏览器和设备都支持点云渲染和RTSP流播放。你可能需要使用特定的技术（如WebGL、WebRTC）和库（如three.js、hls.js）来实现兼容性。
4. 内存问题：实时流数据可能会消耗大量的内存。如果不正确地管理内存，可能会导致内存泄漏，进而导致浏览器崩溃。
5. 同步问题：如果你需要同时播放点云数据和视频流，并且需要它们之间保持同步，这可能是一个挑战。网络延迟和渲染性能可能会影响同步的准确性。
6. 性能问题使用WebGL: WebGL可以直接在GPU上运行，比使用CPU渲染的JavaScript要快得多。Three.js是一个非常好的库，它提供了一个易于使用的WebGL抽象，可以帮助你提高渲染性能。级别细化(LOD)：可以根据观察者与对象的距离，以不同的精度显示对象，从而减少渲染的复杂性。降低点云密度: 如果可能，可以降低点云的密度，减少渲染的负载。使用Web Worker：对于CPU密集型的任务，例如数据解码，可以使用Web Worker在后台线程中进行，避免阻塞主线程。
7. 内存问题合理管理内存：注意定时清理不再使用的对象，尤其是大型对象，例如点云数据和视频帧。在JavaScript中，你可以通过设置对象引用为null来使其被垃圾回收。使用流式处理：尽可能使用流式处理方法处理数据，而不是一次性加载所有数据到内存中。例如，你可以使用流式API读取网络数据，一边读取一边处理，而不是等待所有数据都下载完成再处理。使用Web Worker：Web Worker运行在单独的线程中，有自己的内存空间。你可以利用Web Worker在后台处理大量数据，避免阻塞主线程和消耗主线程的内存。
8. 同步问题使用时间戳：你可以在服务器端为每帧点云数据和视频帧添加时间戳，然后在前端根据时间戳同步显示。使用缓冲：为了避免网络延迟造成的同步问题，你可以在前端使用一些缓冲策略，例如预加载一些数据，或者在显示前等待一小段时间以确保所有数据都已经准备好。使用同步API：如果服务器支持，可以使用一些同步API，例如WebRTC的RTCPeerConnection API，它提供了一些机制来同步音频和视频流。

**如果你发现大量的微任务阻塞了DOM的渲染，下面有一些可能的解决方案：**

1. 代码优化：检查并优化你的代码，减少不必要的操作。确保你的JavaScript函数尽可能高效，避免在微任务中执行长时间的操作。
2. 使用宏任务：如果你有一项需要长时间的任务，而且这项任务可以被拆分，那么你可以考虑使用宏任务（例如setTimeout或setInterval）。这样，你的长任务可以在多个事件循环中执行，而不会阻塞UI的渲染。
3. 使用Web Worker：Web Workers是一种让Web应用能够运行在背景线程的技术。你可以把一些计算密集型或长时间的任务放到Web Worker中去执行，这样主线程（UI线程）就不会被阻塞。
4. 请求空闲回调（requestIdleCallback）：这是一个可以在浏览器空闲时段内调用的函数，这样可以让你的代码不会阻塞重要的事件，比如DOM的渲染。
5. 使用更快的计算机和网络：这是一个显而易见但往往被忽视的解决方案。更快的处理器和网络连接可以在一定程度上缓解由于大量的微任务而导致的延迟。

**如果你的应用突然收到了大量的数据并且导致了卡顿，这里有一些可能的解决方案：**

1. 分批处理：你可以将接收到的大量数据分批处理。例如，如果你需要对大量数据进行复杂的计算，你可以分割这个任务到多个宏任务中（例如使用setTimeout或setInterval），这样你的任务就不会阻塞DOM的渲染。
2. 使用Web Workers：Web Workers可以在背景线程上运行，这样就不会影响主线程（即UI线程）。你可以将一些复杂或耗时的处理任务放在Web Worker中执行。
3. 虚拟化或者分页：如果你需要将大量数据显示在UI上，例如一个大型的表格或者列表，你可以考虑使用虚拟化或者分页。虚拟化是指只渲染当前视窗内的元素，而不是所有的元素。分页则是将数据分成多个部分，每次只显示一部分。
4. 使用更优的数据结构和算法：如果你需要在大量数据上进行查找或排序等操作，使用优化的数据结构和算法可以大大提高效率。
5. 后端优化：如果可能，你可以在后端进行一些预处理，例如预排序，预过滤，或者预聚合。这样前端就可以直接使用这些处理过的数据，而不需要在前端进行复杂的处理。

### 9.7.1 图片渲染流程

​		当你在HTML的 `<img>` 标签中使用URL（通常是HTTP或HTTPS URL）来指定图片时，浏览器将会发起一个新的HTTP或HTTPS请求到该URL以获取图片数据。

​		这个过程大致如下：

1. 浏览器解析HTML页面，遇到 `<img>` 标签并读取 `src` 属性。
2. 浏览器发起一个GET请求到该 `src` URL。这个请求会被浏览器的网络堆栈处理，通过DNS查找，TCP连接，发送HTTP请求，接收HTTP响应，到最后的数据接收。
3. 服务器接收到GET请求后，返回对应的图片文件。响应的HTTP headers通常包括内容类型（Content-Type），这对于图片通常是 `image/jpeg`, `image/png` 或者其他图片格式。
4. 浏览器接收到来自服务器的响应，并根据响应头中的内容类型将响应体解析为图片数据。
5. 解析完成后，浏览器将图片渲染到屏幕上。
6. 在图片加载和渲染的过程中，浏览器也会处理其他的事情，比如加载状态的展示（例如显示一个加载图标或者 `alt` 文本），以及错误处理（例如如果图片加载失败，显示一个错误标记）。

​		所以，使用URL来渲染图片实际上是浏览器内部进行了一系列的网络请求和图片解码处理。

​		解析图片数据和将图片渲染到屏幕上都可能成为性能瓶颈，这取决于许多因素，包括图片的大小、解码效率、渲染性能、设备硬件性能等。因此，很难做出一个泛泛的判断。以下是一些可能影响性能的因素：

1. **图片的大小**：大尺寸的图片文件需要更多的时间来下载和解码，这可能会消耗大量的CPU和内存。在低性能的设备上，这可能会导致明显的性能问题。
2. **解码效率**：图片的解码效率取决于图片的格式和浏览器的实现。一些图片格式（例如JPEG和PNG）需要比其他格式（例如WebP）更多的时间来解码。
3. **渲染性能**：渲染图片到屏幕上的速度取决于浏览器的渲染引擎和设备的GPU性能。如果渲染过程中需要应用复杂的CSS样式或者进行大量的重绘，这可能会消耗大量的GPU资源。
4. **设备硬件性能**：设备的CPU和GPU性能，内存大小，网络速度等都可能影响图片的下载、解码和渲染的速度。

在现代浏览器和设备上，浏览器通常会优化图片的下载和解码过程，并尽可能地使用GPU来加速渲染。然而，在低性能的设备或者网络条件差的情况下，用户可能会感受到图片加载的延迟。

为了提高性能和用户体验，开发者可以采取一些优化策略，例如使用更高效的图片格式（如WebP），提供适应不同网络条件和设备性能的响应式图片，使用图片懒加载等技术。

## 9.8 一些坑

**1 使用Pinia的坑**

```js
// 使用Pinia时，不可以使用解构赋值。
import { useCategoryStore } from '@/stores/category';
const CategoryStore = useCategoryStore()
const { getCategory, categoryList} = useCategoryStore()
这是由于pinia在使用解构赋值时会丢失响应信息，此时的axios由于是异步发送会有延迟。导致axios接收后不会去更新这个解构完的pinia了。可以通过 Pinia 提供的响应式方法，storeToRefs 来处理。


storeToRefs接收一个store参数。
//首先判断是否为vue2环境，如果是vue2环境，直接使用toRefs将store转换为一个普通对象；如果不是vue2环境，首先获取store的原始对象，然后遍历原始对象的键值，在遍历过程中，只会处理ref（ref类型的值包括store中的state与getter，getter会被转为计算属性）与reactive类型的值，对于符合条件的值，会将这些值转为ref类型的值，然后将其复制到一个新的对象中refs中，最后返回refs。

https://juejin.cn/post/7088709186766241822
```

**2 Router缓存**

```js
//使用带有参数的路由时需要注意的是，当用户从 /users/johnny 导航到 /users/jolyne 时，相同的组件实例将被重复使用。因为两个路由都渲染同个组件，比起销毁再创建，复用则显得更加高效。不过，这也意味着组件的生命周期钩子不会被调用。
解决思路：
1.让组件实例不复用，强制销毁重建 （给Routerview :key="$router.fullpath"）
2.监听路由变化，变化后执行数据的更新
```

## 9.9 鉴权

https://blog.csdn.net/liusuyun_1/article/details/123956581 react项目之菜单，按钮权限的实现方案

https://juejin.cn/post/7097914569179267102 React中基于Router-V6实现配置式路由与路由鉴权详细过程

## 9.10 小兔鲜

**1 购物车流程&&sku**

封装carStore(state + action) --> 组件点击添加按钮 --> 是否选择了规格(是否有sku.id) --> 调用action添加(通过匹配skuId找到了就是添加过)

sku组件的作用是为了让用户能够选择商品的规格，在选择的过程中，组件的选中状态要进行更新，还要提示用户当前规格是否禁用，每次选择都要产出对应的Sku数据。

1. 初始化规格渲染

​			通过axios请求后端返回数据，在specs属性中得到[{},...]，进行双重遍历

1. 点击规格更新选中状态

​			绑定@cllick，给每个规格项添加selected决定是否激活，配合动态class属性(:class="{}")激活对应类名

1. 点击规格更新禁用状态

​			首先利用全连接生成有效路径字典(方便查看库存) --> 删除库存为0的字段 --> 通过powerSet子集算法得到所有的子集 --> 通过arr.join('-')将数组转为字符串作为对象的key --> 根据子集生成路径字典对象。

​			初始化规格禁用，遍历每一个规格对象，使用name作为key和路径字典进行匹配，匹配不上则禁用。

​			点击规格更新禁用状态，首先按顺序得到规格项中选择的数组，将name进行填充，过滤undefined使用join得到有效的key，和路径字典匹配。

1. 产出选择的Sku数据

​			通过已选择的Sku的数组进行判断，然后通过key进行匹配。通过通信传给父组件。

**2 合并前后端购物车**

登陆时调用合并购物车接口-->获取最新的购物车列表-->覆盖本地购物车列表

**3 支付功能**

客户端通过get请求跳转支付地址(订单id+回跳地址url) --> 后端请求支付响应结果 --> 跳转到回跳地址url(参数支付成功和订单id)

绑定地址需要encodeURIComponent(uriComponent) 接收 string、number、boolean、null，undefined 或者任何 object。在编码之前，uriComponent 会被转化为字符串。

## 9.11 Web worker

​		Web Workers 可以让你在后台线程中运行 JavaScript，这样就不会阻塞主线程，从而提升页面性能。然而，Web Workers 主要用于执行复杂和耗时的计算任务，如大量数据的处理和计算。

​		至于图片渲染，它是由浏览器的渲染引擎负责的，通常在主线程上执行，并且不能在 Web Worker 中完成。浏览器会使用 GPU 加速来提升渲染性能。

​		但是，在某些情况下，Web Workers 可以帮助提升图片处理的性能：

1. **图像解码**：如果你需要解码大量的图像数据，这是一个耗时的操作，可以在 Web Worker 中进行，这样就不会阻塞主线程。
2. **图像处理**：如果你需要对图像进行复杂的处理，例如应用滤镜或其他像素级操作，这可以在 Web Worker 中完成，然后将处理过的图像数据发送回主线程以进行渲染。

​		因此，Web Workers 不直接加速图片的渲染，但它们可以在处理和准备图片数据时提供帮助，这样可以减少主线程的负载，从而提高总体性能。

```js
//worker.js
self.onmessage = async function(event) {
  const { id, buffer } = event.data;
  try {
    const imageBitmap = await createImageBitmap(new Blob([buffer]));
    postMessage({ id, imageBitmap }, [imageBitmap]);
  } catch (error) {
    console.error('Error in worker:', error);
    postMessage({ id, error });
  }
};
//main.js
// 创建 worker
const worker = new Worker('imageWorker.js');

worker.onmessage = function(event) {
  const { id, imageBitmap, error } = event.data;
  if (error) {
    console.error('Error from worker:', error);
    return;
  }

  const imgElement = document.getElementById(id);
  imgElement.src = URL.createObjectURL(imageBitmap);
};

// 假设我们有一个包含图像数据的 ArrayBuffer
const imageArrayBuffer = ...;

// 发送图像数据到 worker 进行解码
worker.postMessage({ id: 'myImage', buffer: imageArrayBuffer });
```

​		注意，这个例子需要在支持 `createImageBitmap` 和 `Blob` API 的浏览器环境中运行。另外，因为跨域问题，Web Worker 只能在服务器环境中使用，不能直接在本地文件系统中使用。

​		在这个例子中，我们创建了一个 Web Worker，并使用 `postMessage` 将图像数据发送到 Worker。Worker 接收到数据后，使用 `createImageBitmap` 进行解码，并将解码后的 ImageBitmap 对象发送回主线程。主线程接收到 ImageBitmap 对象后，将其转换为 Blob URL，并设置为图像元素的 `src` 属性，从而显示图像。

​		**`	URL.createObjectURL()`** 静态方法会创建一个 [`DOMString`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FDOMString)，其中包含一个表示参数中给出的对象的URL。这个 URL 的生命周期和创建它的窗口中的 `document` 绑定。这个新的URL 对象表示指定的 [`File`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FFile) 对象或 [`Blob`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FBlob) 对象。

注：

​		简单的理解一下就是将一个`file`或`Blob`类型的对象转为`UTF-16`的字符串，并保存在当前操作的`document`下。*扩展1：*`*UTF-8*`*与*`*UTF-16*`*与*`*GBK*`*到底有啥区别， 都是***可变长度的编码方式***通过对*`*Unicode*`*码值进行对应规则转换后，编码保持到内存/文件中*

​		在每次调用 `createObjectURL()` 方法时，都会创建一个新的 URL 对象，即使你已经用相同的对象作为参数创建过。当不再需要这些 URL 对象时，每个对象必须通过调用 [`URL.revokeObjectURL()`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.juejin.cn%2F%3Ftarget%3Dhttps%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FAPI%2FURL%2FrevokeObjectURL) 方法来释放。浏览器在 document 卸载的时候，会自动释放它们，但是为了获得最佳性能和内存使用状况，你应该在安全的时机主动释放掉它们。

**SharedWorker**

​		WebWorker只属于某个页面，不会和其他页面的Render进程（浏览器内核进程）共享，所以Chrome在Render进程中（每一个Tab页就是一个render进程）创建一个新的线程来运行Worker中的JavaScript程序。

​		SharedWorker是浏览器所有页面共享的，不能采用与Worker同样的方式实现，因为它不隶属于某个Render进程，可以为多个Render进程共享使用，所以Chrome浏览器为SharedWorker单独创建一个进程来运行JavaScript程序，在浏览器中每个相同的JavaScript只存在一个SharedWorker进程，不管它被创建多少次。

​		看到这里，应该就很容易明白了，本质上就是进程和线程的区别。SharedWorker由独立的进程管理，WebWorker只是属于render进程下的一个线程

## 9.12 文件上传

在Web前端上传文件的时候，通常采用的是HTTP协议来传输文件数据。这个过程一般可以分为以下步骤：

1. 用户在浏览器上选择要上传的文件。这通常通过一个HTML的<input type="file">元素来完成。
2. 前端JavaScript代码会获取到这个文件对象，这个对象包含了文件的所有信息，如文件名、大小、类型等。
3. 前端代码会将这个文件对象发送到后端服务器。这通常使用的是AJAX技术（使用XMLHttpRequest对象或者Fetch API），或者使用HTML表单的POST提交。
4. 在发送请求时，文件对象会被编码为一种叫做"multipart/form-data"的数据格式。这个格式可以包含多个不同类型的数据段，每个段都有自己的头信息和数据内容。
5. 后端服务器接收到这个请求后，会解码这个"multipart/form-data"数据，得到文件的内容，然后进行后续的处理，如保存到服务器的硬盘上。
6. 上传成功后，服务器会返回一个响应给前端，前端根据响应结果来更新用户界面，比如显示一个上传成功的提示。

在具体的实现中，可能会使用到各种前端库和框架来简化这个过程，比如jQuery, Axios等。但是这个基本的过程是不变的。

`axios`是一个基于Promise的HTTP库，可以用于浏览器和node.js中。以下是一个**使用axios在浏览器中上传文件**的例子：

```js
let fileInput = document.querySelector('input[type="file"]');
let file = fileInput.files[0];
let formData = new FormData();

formData.append('file', file);

axios.post('/upload', formData, {
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
.then(response => {
  console.log(response);
})
.catch(error => {
  console.error(error);
});
```

在这个例子中，我们首先获取用户选择的文件，然后创建一个`FormData`对象，并将文件添加到这个对象中。之后，我们使用`axios.post`方法向服务器发送一个POST请求，请求的URL是`/upload`，请求的数据是我们刚才创建的`FormData`对象。

`axios.post`方法返回一个Promise对象，这个对象代表了服务器的响应。当服务器的响应到达时，我们使用`.then`方法来处理这个响应。如果在发送请求或处理响应时发生了错误，我们使用`.catch`方法来处理这个错误。

`axios`接收文件与上传文件的流程有一些不同。以下是一个**使用****`axios`****在浏览器中接收文件**的例子：

```js
axios({
  url: '/download',
  method: 'GET',
  responseType: 'blob', // 注意这里的响应类型是 'blob'，还有 base64 （利用 fileReader 而不是 formData）
})
.then(response => {
  // 创建一个新的 Blob 对象
  const blob = new Blob([response.data], { type: response.headers['content-type'] });

  // 创建一个链接
  let downloadUrl = window.URL.createObjectURL(blob);

  // 创建一个隐藏的 'a' 标签，设置其链接并触发点击事件，从而下载文件
  let link = document.createElement('a');
  link.href = downloadUrl;
  link.setAttribute('download', 'file');
  document.body.appendChild(link);
  link.click();
  link.remove();
})
.catch(error => {
  console.error(error);
});
```

在这个例子中，我们发送了一个GET请求到`/download`来获取文件。注意我们设置`responseType`为`blob`，这样`axios`会将响应的数据处理为一个Blob对象，我们可以将其直接用于文件下载。

服务器响应到达后，我们创建一个新的Blob对象，然后使用`window.URL.createObjectURL`方法将这个Blob对象转化为一个URL。然后我们创建一个新的`a`元素，将这个URL设置为其`href`属性，然后模拟用户点击这个`a`元素，从而开始文件下载。

请注意，这是一个简化的例子，实际使用中可能需要处理一些额外的问题，例如错误处理和兼容性问题。

**大文件上传**

- 将大文件转换成二进制流的格式
- 利用流可以切割的属性，将二进制流切割成多份
- 组装和分割块同等数量的请求块，并行或串行的形式发出请求
- 待我们监听到所有请求都成功发出去以后，再给服务端发出一个合并的信号

**断点续传**

- 为每一个文件切割块添加不同的标识
- 当上传成功的之后，记录上传成功的标识
- 当我们暂停或者发送失败后，可以重新发送没有上传成功的切割文件

**后端**

- 接收每一个切割文件，并在接收成功后，存到指定位置，并告诉前端接收成功
- 收到合并信号，将所有的切割文件排序，合并，生成最终的大文件，然后删除切割小文件，并告知前端大文件的地址

**刷新页面**

​		如果你希望在前端刷新页面时保留已上传文件的状态，你可以尝试以下几种方法：

1. 利用localStorage或sessionStorage: 这些是浏览器提供的存储API，允许你在用户浏览器上存储一些数据。在文件上传后，你可以将文件的状态（比如上传的进度、文件名等信息）存储在localStorage或sessionStorage中。当页面刷新后，你可以从中读取数据并恢复文件的状态。
2. 利用Cookies: 和localStorage或sessionStorage类似，你也可以将文件的状态存储在Cookies中。
3. 利用服务器端的存储: 当文件被上传到服务器时，你可以在服务器上保存文件的状态。当页面刷新时，前端可以向服务器请求文件的状态并进行恢复。
4. 利用IndexedDB: 这是一个在浏览器中运行的非关系型数据库，适合存储大量数据。如果你需要在前端存储大量的文件状态数据，可以考虑使用IndexedDB。

​		请注意，以上方法在某些情况下可能不适用，例如在浏览器的隐私模式下或用户禁用了Cookies等。因此，需要根据你的具体需求和环境来选择最适合的方法。

​       有关刷新页面续传，其实没必要把文件内容存到浏览器storage里，只需要根据每一片slice切片大小计算出每片在文件流当中的偏移量，即可在每次上传时按这个偏移量读取相应分片内容。设计好上传本身各个动作形成的这个状态机，只需要在状态机里维护好当前上传到第几个分片即可，没必要记住分片内容，因为内容本身就存在磁盘上了。另外，上传的话最好先做md5校验，确认这个文件确实是你上次上传到一半的那个。刷新页面后，用户可以根据之前的操作状态提示用户重新选择文件，文件名提示一下这个文件是可以支持断点续传的，引导用户选中，然后按照刷新页面前最后一次的上传分片偏移量去做续传就好，上传完成后服务端校验分片重组后文件的完整性。（但是根据H5的标准，在没有用户操作的前提下浏览器环境的js是不可能主动去访问磁盘上的文件的）

## 9.13 扫码登陆

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-c528984cb6e215ff47af8206ce713af7_1440w.webp)

**客户端标识：**也就是 UUID，这是贯穿整个流程的纽带，一个闭环登录过程，每一步业务处理都是围绕该次的 UUD 进行处理的。UUID 的生成有根据 session_id 的也有根据客户端 ip 地址的。个人还是建议每个二维码都有单独的 UUID，适用场景更广一些！

**前端和服务器通讯：**前端肯定是要和服务器保持一直通讯的，用以获取登录结果和二维码状态。看了下网上的一些实现方案，基本各个方案都有用的：轮询、长轮询、长链接、websocket。也不能肯定的说哪个方案好哪个方案不好，只能说哪个方案更适用于当前应用场景。个人比较建议使用长轮询、websocket 这种比较节省服务器性能的方案。

**总结下核心流程：**

1. 请求业务服务器获取用以登录的二维码和 UUID。
2. 通过 websocket 连接 socket 服务器，并定时(时间间隔依据服务器配置时间调整)发送心跳保持连接。
3. 用户通过 APP 扫描二维码，发送请求到业务服务器处理登录。根据 UUID 设置登录结果。
4. socket 服务器通过监听获取登录结果，建立 session 数据，根据 UUID 推送登录数据到用户浏览器。
5. 用户登录成功，服务器主动将该 socker 连接从连接池中剔除，该二维码失效。

https://juejin.cn/post/7056544865647067172

## 9.14 列表优化

**时间切片**

利用requestAnimationFrame(),原理是由于它会在浏览器渲染完去执行。在执行完一次会等待浏览器渲染完继续执行。

**虚拟列表（只渲染当前可视区域）**

​	**item 高度固定**

```
自定义一个组件，传递 3 个值给 VirtualList  组件：
	size：每一项的高度
	keeps：希望展示几条数据
	arrayData：列表数据

VirtualList 组件里得有 3 个部分：
		最外层容器区域。高度固定，超出区域出现滚动条，高度为传入的 size 乘上 keeps；
		列表本应该有的高度区域，也就是列表如果全部渲染的总高度。因为只渲染 keeps 指定的条数的数据，就会导致没有滚动条或滚动条无法起到预告总的列表长度的功能，所以要用一个高度为列表总长度的 div 让滚动条正确显示；
		要展示的内容。展示的数据应该是总数据 arrayData 的某一部分。展示的数据 item 还得传给父组件，在父组件进行使用，这里就用到了插槽。

当滚动列表时（handleScroll 触发），我们要及时的根据滚动的距离更新应该显示的数据：
		onscroll 处理的是对象内部内容区的滚动事件，所以是对最外部固定高度的 wrap 容器进行监听。
		如下图所示：蓝色矩形为可视区域，假设传入的 keeps 为 3 ，当滚动列表（红色矩形）时，渲染的列表区域，也就是 3 个 item（深蓝绿色矩形） 占据的区域也会跟着滚动，如果仅仅改变渲染的内容，也就是根据滚动距离从 item1 开始渲染，那么此时这个 item1 就会替换下图的 item0 ，位于可视区域之外，无法被看见。
```

​	**item 高度不固定**

```
		原来对于列表如果全部渲染应该有的高度的计算 this.arrayData.length * this.size + 'px' 显然不合适了，因为每项 item 的高度 size 不确定了。
		[ 在二分法中，计算中间项的索引时用的是 mid = start + (end - start) / 2 而不是直接使用更简单的公式 mid = (start + end) / 2，是为了防止值溢出的情况，因为 start + end 的值可能会大于 js 最大的能表示的数。（如果 start < 0 或 end < 0时，end - start 也可能会溢出）]
		在页面加载完毕后，对数据数组里每一项的 height, top 和 bottom 的值做个缓存（此时的 size 为我们预估的，滚动条的高度并不准确），存放在数组 positionListArr 里；
		用二分法开始查找，我们页面滚动的距离 scrollTop 对应于 positionListArr 里的哪一项的 bottom 的值。之所以用二分法是因为后面会根据真实 dom 重行计算每一项的 height, top 和 bottom，到时候每一项的 size 就可能不一样了；
之后对于 end 和 offset 计算原理就跟 item 高度固定的情况一样了。
```

**利用 css**

​		最近看到一个新的 css 属性 `content-visibility`，利用这个属性（大概率还得配合 `contain-intrinsic-size`）就可以实现只渲染当前可视窗口区域内的内容，跳过不在屏幕上的内容渲染。但目前兼容性极差，只能说未来可期~

https://juejin.cn/post/6979865534166728711

## 9.15 富文本编辑器

利用html的`contentEditable`属性，可以让我们对任意网页上的标签内容进行编辑。PS：对禁止复制文字或者需要登录才能复制文字的网页，用这招即可完美破解：

这是浏览器的一个api，当元素进入编辑模式的时候，document 对象暴露出一个 execCommand 方法去操纵当前的可编辑区域 。

```
打开一个有文字的网页，先让页面变成可编辑，控制台运行document.body.contentEditable = true
然后选中页面一些文字，控制台运行document.execCommand('bold', false)，即可使选中区域加粗
```

https://juejin.cn/post/7018355368996634638

## 9.16 SSO

​		指在多系统应用群中登录一个系统，便可在其他所有系统中得到授权而无需再次登录，包括单点登录与单点注销两部分。

假如公司有两个不同域名或IP下的管理网站，[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com)，[http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com)，我们想要输入用户名和密码登录a.com, 即可自动登录[http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com)，怎么实现呢？

登录[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com)后会在a平台产生会话信息，如果我们登录b.com,怎么判断该用户已经登录a平台了，然后自己登录？这里我们需要借助第三方平台来做授权验证，即c.com,该授权中心维护一套共有的账号和密码，当用户访问 [http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com) 后，我们会跳转到 c.com,并带上[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com) 这个来源访问地址，在[http://c.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fc.com) 中判断是否有登录，如果未登录，则给出登录界面，登录成功后，则产生会话信息，同时生成一个授权Token，保存在[http://c.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fc.com) cookie 中，然后返回给原地址，如果已经登录（即已经授权过了），则拿到cookie中保存的Token信息然后回跳到原来的访问地址，[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com) 判断有Token信息，则拿着这个Token发送http请求到c.com,判断该Token是否有效，如果有效，则返回给用户信息，然后[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com)拿到信息后，自动登录a.com;

当访问 [http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com) 时，也会去 [http://c.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fc.com) 中判断是否已经授权过了，因为[http://a.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fa.com) 已经授过权了，则会给[http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com) 返回授权Token，然后[http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com) 判断该Token是否有效，如果有效，则会返回给用户信息，[http://b.com](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttp%3A%2F%2Fb.com) 自动登录，这就是单点登录的一个简单的流程。

1. 用户访问系统1的受保护资源，系统1发现用户未登录，跳转至sso认证中心，并将自己的地址作为参数
2. sso认证中心发现用户未登录，将用户引导至登录页面（带系统1地址）
3. 用户输入用户名密码提交登录申请
4. sso认证中心校验用户信息，创建用户与sso认证中心之间的会话，称为全局会话（这时该会话信息保存到cookie中），同时创建授权令牌
5. sso认证中心带着令牌跳转到最初的请求地址（系统1）
6. 系统1拿到令牌，去sso认证中心校验令牌是否有效
7. sso认证中心校验令牌，返回有效，注册系统1
8. 系统1使用该令牌创建与用户的会话，称为局部会话(seesion)，返回受保护资源
9. 用户访问系统2的受保护资源
10. 系统2发现用户未登录，跳转至sso认证中心，并将自己的地址和之前和sso认证中心的会话cookie信息作为参数
11. sso认证中心发现用户已登录，跳转回系统2的地址，并附上令牌
12. 系统2拿到令牌，去sso认证中心校验令牌是否有效
13. sso认证中心校验令牌，返回有效，注册系统2
14. 系统2使用该令牌创建与用户的局部会话，返回受保护资源

用户登录成功之后，会与sso认证中心及访问的子系统建立会话，用户与sso认证中心建立的会话称为全局会话，用户与各个子系统建立的会话称为局部会话，局部会话建立之后，用户访问子系统受保护资源将不再通过sso认证中心，全局会话与局部会话有如下约束关系

1. 局部会话存在，全局会话一定存在
2. 全局会话存在，局部会话不一定存在
3. 全局会话销毁，局部会话必须销毁

https://juejin.cn/post/7044328327762411534

## 9.17 低代码

优点：

- 它的本质是提效，提效的同时给了自由度（以较少的成本达到想要的结果）
- 它的优势是可视和快速
- 它的能力源自于物料（组件）的能力

缺点：

- 上手成本，除了海报大部分情况下还是要摸索很久的
- 前端框架日新月异，过一两年来个改革，低码平台就得适配一遍，维护成本相当大；又或者平台自身升级了，你也不知道会对自己的项目产生什么影响，但是不跟着升级后面就没法迭代；
- 同一个平台里不同组件之间的通信，并且基本上你用了一个平台的低代码，要想切换到其他平台那就得从 0 到 1
- 不好维护和迭代，换个同类型组件都得考虑一下，如果换个人还得重新理解，还不好调试，不好定位问题，也不好确定本次改动对之前功能的影响
- 不好优化
- 二次开发不可逆，很难做到持续可视化（json schema --> code ，但不能反过来）

**模块之间如何进行解耦呢**：

- 通过全局的发布订阅模式来通信
- 通过全局数据来共享，而不是通过直接相互传递数据
- 其实你把每个模块都写成独立的项目，开发起来自然就会强迫自己解耦了
- 解耦最大的好处就是当你要重构或者替换某一个模块时，可以直接替换单个模块而不影响其他地方的逻辑

除了全局变量，我能在组件里面维护自己的状态吗？当然是可以的，我们可以新增一个 state 属性，来维护组件自身的一些状态，并且我们可以通过维护原型链的方式来层层向上获取父元素数据，比如这样：`state.__proto__ = parent.state`

**怎么支持跨平台：**低代码平台搭建好后最终得到的是一个 json，而这个 json 本身就是以一种通用的语言来描述页面结构、表现和行为的，它和平台无关。要想跨平台、跨框架，只需要做一个适配层去解析这些 json，导出成各平台、各框架需要的样子即可。举个例子来说，我们在解析的过程中肯定会需要创建元素，而 vue 和 react 都有各自的 createElement 方法，那到时候只需要把创建元素的方法换成各框架各自的方法就行了。思路听起来很简单，但是每一种适配起来都很繁琐

**实现：**

1. **协议：**协议是低码平台的基石，它的主要目的就是约束和扩展。约定优于配置说的就是这个道理。如果维护到后期发现协议很难拓展了，那基本只能重来了，只不过你多了些经验。协议本质上就是一堆 interface。
2. **物料区：**物料区其实没啥功能，我们会有一个 componentList，里面是各种组件的基本信息，直接循环渲染即可。同时还会顺便生成一个 componentMap，主要是方便后续我们通过组件名来快速获取是组件的元信息。但需要考虑对组件的分类，如何兼容不同组件，如何实现自定义组件。

​		通常情况下，低码平台自身会有个物料管理平台对组件进行统一的管理和操作，简单点做的话我们可以直接把开发好的组件发到 npm 上，把 npm 当做物料平台用。

1. **画布区：**

分类：

- 自由画布：拖到哪里元素就放到哪里，配合容器组件可以协助布局以实现自适应
- 流式布局：组件从左到右从上往下自然排列，比如 H5 就是单纯的从上往下平铺开来
- 自动布局：也是拖哪放哪，但是原来的地方如果已经有组件则会被挤开，被挤开的元素还会有个递归挤开的过程
- 栅格画布：类似前端组件库中的栅格布局，一行 24 列，一行 12 列这样划分填充，看起来比较规范也比较整齐

​		事实上，低码平台都秉持着数据驱动视图的思想（和我们现在用的 vue 和 react 框架如出一辙），也是通过递归解析 componentTree 这个全局组件树来动态生成页面。通过转换器、渲染器或者 render 函数，通常开发完成之后，这个渲染器是不用改的，我们只需要单纯的修改数据，渲染器自然会帮我们解析。

​		这个思想很重要，也是解耦的核心：就是我们所有的操作，不管拖拽也好，修改元素属性也好，还是调整元素位置，都是对 componentTree 这个数据进行修改，单纯的对数据进行操作，比如追加元素，就往 componentTree 的 children 里面 push 一个元素即可；如果要修改一个元素的属性值，只需要找到对应元素的数据修改其 props 值即可。**画布编排的本质就是操作组件节点和属性。**

​		另外为了让每个组件都能直接获取到这个 componentTree，我们可以把这个 componentTree 弄成全局的（全局数据能够让整体流程更加清晰），比如放在 window、vuex、redux 上，这样每个模块就能共享同一份数据，也能随时随地更改同一份数据（平台会暴露公共的修改方法），而这个渲染器只是单纯的根据这个数据来渲染，并不处理其他事情。

​		这里我们还要注意一个问题，就是画布区本身也是个组件，是个组件那它就会受到父元素和全局的影响，最简单的比如样式，可能受到外部样式作用，导致你这个画布区和最终呈现的页面可能有一丢丢的不同，所以要排除这些影响，就是把这个画布区搞成一个**独立的 iframe**，这样环境就比较纯了，完美隔离，只不过增加了通信的成本。现在，物料区只负责渲染组件列表，以及触发拖拽放下的事件，之后就是触发修改全局的 componentTree，再之后就是触发画布区的重新渲染。这样一来，你就会发现画布区和物料区就很好的解耦了。到目前为止画布区只负责单纯的渲染。

1. **属性设置区：**

流程：

- 点选画布区的某个组件
- 触发设置某个全局变量为当前组件
- 右侧属性面板就会根据当前组件的 componentName 从 componentMap 中找到组件对应的 setters（可配置项），这个 setters 其实就是一开始在物料协议里面约定的 props，但是和 props 可能有点小区别，需要自己手动写个函数转一下；或者可以直接在物料协议里面多添加一个 setters 字段来专门描述有哪些属性可以支持配置。两种方式都是可以的
- 然后也是单纯的循环渲染 setters
- 再把当前组件的 state（初始值）赋值给 setters

​		首先如果我们修改了属性设置区的表单项，我们实际上是去修改全局的 componentTree，然后画布区自然就会根据这个新的 componentTree 自动渲染，有点单向数据流的意思（就是修改数据的入口只有一个），也方便排查问题。把数据放到全局上，很多通信的过程就可以省掉了

​		一个常常提到的问题就是如何**实现联动**，比如字段 2 的显隐依赖于字段 1 的值，类似这种功能通常有两种实现方式：

- 一种类似发布订阅，我们可以在字段 2 中监听（on）来自字段 1 的 emit 事件，只是多了你就很难知道各自有哪些依赖关系了
- 另一种方式就是利用全局数据了，比如我们把字段 1 和字段 2 都放在全局数据中，然后在字段 2 中新增一个 visible 的属性设置器，其值是一个模板表达式，形如：`{{ globalData.field1 && ... && globalData.fieldN }}`，因为数据是全局的所以很方便能够直接获取到，在实际渲染的过程中就会动态执行上面那个表达式来确定组件渲不渲染。此外，因为数据是全局的，跨组件或者跨页面共享数据也会变得轻而易举

​		再一个常常提到的问题就是如何处理点击事件？如果做的开放点、简单点，我们可以直接让用户自己写函数，然后运行的时候用 `eval` 或者 `new Function` 执行一下就行。但是这样会有个问题，就是安全性、稳定性和效率不够，所以我们需要进行一些限制，这个通常有两种方法：

​		一种是暴露固定方法，只接收参数，比如我这个点击的结果就是跳转到某个页面，也就是执行 `window.open` 这个方法，那我们就不允许用户直接书写这个代码，而是先内置一个全局封装好的 `jumpToPage(url)` 方法，然后在属性设置的时候只允许输入 url 并进行简单校验

​		但是固定方法是很难满足我们的一些需求的，最终还是得支持让用户可以自己写脚本，于是乎我们就得让这个脚本具有良好的隔离性，也就是沙箱或者对代码进行校验等，这里就简单说一下**沙箱**的方式：

- with + new Function（用 with 改变作用域实现隔离、用 try catch 捕获错误保障稳定性）
- iframe 沙箱：在一个空的 iframe 里面执行这些未知的代码可以最大程度的实现隔离，其余方式都可以通过原型链进行逃逸（其实 iframe 通过 parent 也能逃逸）
- 等一个新的 API：ShadowRealm

1. **代码生成发布上线（json schema）**

网易云低代码平台

Tango 低代码引擎不依赖私有搭建协议和 DSL，而是直接使用源代码驱动，引擎内部将源码转为 AST，用户的所有的搭建操作转为对 AST 的遍历和修改，进而将 AST 重新生成为代码，将代码同步给在线沙箱执行。与传统的 基于 Schema 驱动的低代码方案 相比，不受私有 DSL（领域特定语言，如 sql、.vue等） 和协议的限制，能够完美的实现低代码搭建与源码开发的无缝集成。

https://juejin.cn/post/7276837017231835136

https://mp.weixin.qq.com/s?__biz=Mzg4MjE5OTI4Mw==&mid=2247491681&idx=1&sn=387027420642ca4043f8bfd920d0badf&scene=21#wechat_redirect

https://mp.weixin.qq.com/s/pPBJPAyv5e8H4OFAHIiFWQ

https://juejin.cn/post/7202877900239077432 沙箱隔离

## 9.18 小程序

https://cloud.tencent.com/developer/article/1965378

## 9.19 qiankun

微前端架构具备以下几个核心价值：

- 技术栈无关主框架不限制接入应用的技术栈，微应用具备完全自主权
- 独立开发、独立部署微应用仓库独立，前后端可独立开发，部署完成后主框架自动完成同步更新
- 增量升级在面对各种复杂场景时，我们通常很难对一个已经存在的系统做全量的技术栈升级或重构，而微前端是一种非常好的实施渐进式重构的手段和策略
- 独立运行时每个微应用之间状态隔离，运行时状态不共享

**qiankun特点**

- 基于 single-spa 封装，提供了更加开箱即用的 API。
- 技术栈无关，任意技术栈的应用均可 使用/接入，不论是 React/Vue/Angular/JQuery 还是其他等框架。
- HTML Entry 接入方式，让你接入微应用像使用 iframe 一样简单。
- 样式隔离，确保微应用之间样式互相不干扰。
- JS 沙箱，确保微应用之间 全局变量/事件 不冲突。
- 资源预加载，在浏览器空闲时间预加载未打开的微应用资源，加速微应用打开速度。
- umi 插件，提供了 @umijs/plugin-qiankun 供 umi 应用一键切换成微前端架构系统。

**使用：**

- 微应用需要在自己的入口 js (通常就是你配置的 webpack 的 entry js) 导出 `bootstrap`、`mount`、`unmount` 三个生命周期钩子，以供主应用在适当的时机调用。
- bootstrap 只会在微应用初始化的时候调用一次，下次微应用重新进入时会直接调用 mount 钩子，不会再重复触发 bootstrap。
- 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
- 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例

https://qiankun.umijs.org/zh/guide/getting-started

## 9.18 BFF中间层

BFF是一种Web架构，全名为Backends For Frontends，即为服务于前端的后端。

**问题提出：** 在系统一开始开发的时候只考虑了PC网页端的设计，服务器端API是为了PC网页端而服务的。但是后来随着移动互联网的兴起，移动端开始流行，决定在原有服务端的基础上开发移动端App，复用之前的API，但是原有API是为了PC端设计的，并不符合移动端的需求。

1. PC端的需求与移动端并不一定完全相同，现有接口无法满足所有移动端的新需求。
2. PC端电脑性能强，可以并发请求多个接口或进行部分较复杂的数据处理，但是移动端性能低，如果使用同样的多个接口，由前端组装数据，页面展示可能会出现延迟和卡顿现象。
3. PC端的屏幕较大，展示内容较多且全面。但是移动端屏幕小，展示内容较少。而且部分数据的获取并不容易，需要后端调用许多服务。如果移动端复用PC端接口，会获取和传输部分无用数据，不仅消耗服务端资源，还浪费网络带宽。

**BFF的优势：**

1. 服务端对数据展示服务进行解耦，展示服务由独立的BFF端提供，服务端可以聚焦于业务处理。
2. 多端展示或者多业务展示时，对与数据获取有更好的灵活性，避免数据冗余造成消耗服务端资源。
3. 对于复杂的前端展示，将数据获取和组装的负责逻辑在BFF端执行，降低前端处理的复杂度，提高前端页面响应效率。
4. 部分展示业务，可以抽象出来利用BFF实现，对于服务端实现接口复用。
5. 降低多端业务的耦合性，避免不同端业务开发互相影响。
6. 其他优势，包括数据缓存，接口安全校验等

[#前端面经#]()[#前端#]()[#校招#]()



作者：夏目又三
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网