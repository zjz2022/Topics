# html

## 1 构建网页的基础元素

1. 基本结构：HTML文档的基本结构由<!DOCTYPE> , 

   ```mark
   <html> , <head> 以及 <body> 
   ```

   等标签构成。

2. 常用标签：介绍一些常用的HTML标签及其作用，比如

   ```markdown
   标题 (<h1>到<h6>), 段落 (<p>), 超链接 (<a>), 图片(<img>), 列表(<ul>, <ol>, <li>), 表格(<table>), 表单(<form>, <input>, <textarea>, <button>等).
   ```

3. 语义标签：HTML5带来的新的语义标签，如

   ```markdown
   <header>, <nav>, <main>, <article>, <section>, <aside>, <figure> 和 <footer>
   ```

   等，它们对提高网页的可访问性、可读性和搜索引擎优化(SEO)有着重要作用。

4. 特殊属性标签：比如 data-* 属性，可以用来存储页面或应用程序的私有自定义数据，以及 aria-* 属性，它们帮助提高网页对残障人士的可访问性。

5. 元素分类：HTML元素可以根据它们的性质分类，如“块级元素”（如

   ```markdown
   <div>, <p>, <header>, <footer>
   ```

   等）和“内联元素”（如

   ```markdo
   <span>, <a>, <img>, <button>
   ```

   等）等等。

6. 标签的嵌套和使用规则：一些标签，如 

   ```mark
   <img> 和 <input>
   ```

   ，是自闭合的；一些标签必须成对出现，如 

   ```mark
   <p> 和 <a>
   ```

   ；此外，有的标签不能嵌套在某些特定标签内部，了解并遵守这些规则是很重要的。

## 2 h5新特性

> 把什么讲出来就行了？

由[万维网联盟](https://zh.wikipedia.org/wiki/万维网联盟)（W3C）于2014年10月完成标准制定

HTML5 是 Web 标准的新一代，并带来了许多新的特性和改进。以下是其中的一些主要特性：

1. 语义元素： HTML5 介绍了众多新的语义元素，如 <header>, <footer>, <article>, <section>, <nav> 等，这些标签更好地描述了其包含的内容。

2. 图形和多媒体元素： HTML5 提供了如 <canvas> 和 <svg> 用于在网页上绘制图形，而 <video> 和 <audio> 标签则让嵌入多媒体变得简单。

3. 表单控件： HTML5 增加了新的表单控件，如日历、日期、时间、邮箱、搜索等。

4. 本地存储： 与传统的 cookie 相比，HTML5 提供了更加强大的本地存储能力。

5. 离线应用： HTML5 提供了离线应用缓存，即使在没有网络连接时，用户也可以浏览网站。

6. Web worker 和 Websocket： Web Worker 提供了在后台线程中运行脚本的能力，而 WebSocket 则提供了全双工通信渠道，它们使得网页能实现更加复杂的功能。

7. 地理位置： HTML5 允许网站在用户的同意下获取其地理位置信息。

8. 拖放 API： HTML5 原生就支持拖放操作，开发者只需要添加一些事件监听器就可以实现。

9. 更好的兼容性： HTML5 设计时就考虑到了向后兼容性，这意味着旧版浏览器可以忽略它们不理解的新特性，但网页仍能正常工作。

总的来说，HTML5 提供了丰富的新功能、更有效的语义标签和更强大的 JavaScript APIs，进一步提升了网页的设计和功能。

## 3 window.onload()

### 3.1 

### 3.2 document.load()和window.onload()

document.load() 和 window.onload() 是JavaScript中两个不同的事件：

1. document.load() 目前已经被废弃，不被一些现代的Web浏览器支持。这个方法曾经被用于在 document 对象加载 XML 或者 XSLT 的时候触发。

2. window.onload() 是一个事件，它在整个网页完全加载完成后触发。这包括所有的框架，图片，样式表，脚本等等。在实践中，window.onload() 常常被用于在页面加载完成后执行一些初始化的函数或者代码。

所以，你在大多数情况下都应该使用 window.onload()，而不是 document.load()。

## 4 html语义化

> 把什么讲出来就行了？

| title          | 页面主体内容                                                 |
| :------------- | :----------------------------------------------------------- |
| hn             | h1\~h6，分级标题，\<h1> 与 \<title> 协调有利于搜索引擎优化   |
| ul li          | 无序列表                                                     |
| ol li          | 有序列表                                                     |
| header         | 页眉通常包括网站标志、主导航、全站链接以及搜索框             |
| nav            | 标记导航，仅对文档中重要的链接群使用                         |
| main           | 页面主要内容，一个页面只能使用一次。如果是web应用，则包围其主要功能 |
| article        | 定义外部的内容，其中的内容独立于文档的其余部分               |
| section        | 定义文档中的节（section、区段）。比如章节、页眉、页脚或文档中的其他部分 |
| aside          | 定义其所处内容之外的内容。如侧栏、文章的一组链接、广告、友情链接、相关产品列表等 |
| footer         | 页脚，只有当父级是body时，才是整个页面的页脚                 |
| small          | 呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权   |
| strong         | 和 em 标签一样，用于强调文本，但它强调的程度更强一些         |
| em             | 将其中的文本表示为强调的内容，表现为斜体                     |
| mark           | 使用黄色突出显示部分文本                                     |
| figure         | 规定独立的流内容（图像、图表、照片、代码等等）（默认有40px左右margin） |
| figcaption     | 定义 figure 元素的标题，应该被置于 figure 元素的第一个或最后一个子元素的位置 |
| cite           | 表示所包含的文本对某个参考文献的引用，比如书籍或者杂志的标题 |
| progress       | 定义运行中的进度（进程）                                     |
| address        | 作者、相关人士或组织的联系信息（电子邮件地址、指向联系信息页的链接） |
| blockquoto     | 定义块引用，块引用拥有它们自己的空间                         |
| del、ins、code | 移除的内容、添加的内容、标记代码                             |

**语义化优点**

* 易于用户阅读，样式丢失的时候能让页面呈现清晰的结构
* 有利于SEO，搜索引擎根据标签来确定上下文和各个关键字的权重
* 方便屏幕阅读器解析，如盲人阅读器根据语义渲染网页
* 有利于开发和维护，语义化更具可读性，代码更好维护，与CSS3关系更和谐

## 5 引入样式时，link和@import的区别？

* 链接样式时，link只能在HTML页面中引入外部样式
* 导入样式表时，@import 既可以在HTML页面中导入外部样式，也可以在css样式文件中导入外部css样式

## 6 介绍一下你对浏览器内核的理解

主要分成两部分：渲染引擎(Layout Engine或Rendering Engine)和js引擎

* 渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。
* js引擎：解析和执行JavaScript来实现网页的动态效果

## 7 常见的浏览器内核有哪些

> 把什么讲出来就行了？

* Trident( MSHTML )：IE MaxThon TT The World 360 搜狗浏览器
* Geckos：Netscape6及以上版本 FireFox Mozilla Suite/SeaMonkey
* Presto：Opera7及以上(Opera内核原为：Presto，现为：Blink)
* Webkit：Safari Chrome

## 8 label标签的作用? 是怎么用的?

* label标签用来定义表单控件间的关系
* 当用户选择该标签时，浏览器会自动将焦点转到和标签相关的表单控件上
* label 中有两个属性是非常有用的, FOR和ACCESSKEY
* FOR属性功能：表示label标签要绑定的HTML元素，你点击这个标签的时候，所绑定的元素将获取焦点

## 9 title与h1的区别、b与strong的区别、i与em的区别?

* title属性没有明确意义，只表示标题；h1表示层次明确的标题，对页面信息的抓取也有很大的影响
* strong标明重点内容，语气加强含义；b是无意义的视觉表示
* em表示强调文本；i是斜体，是无意义的视觉表示
* 视觉样式标签：b i u s
* 语义样式标签：strong em ins del code

## 10 元素的alt和title有什么不同？

* 在alt和title同时设置的时候，alt作为图片的替代文字出现，title是图片的解释文字

## 11 浏览器页面有哪三层构成，分别，作用?

* 浏览器页面构成：结构层、表示层、行为层
* 分别是：HTML、CSS、JavaScript
* 作用：HTML实现页面结构，CSS完成页面的表现与风格，JavaScript实现一些客户端的功能与业务。

## 12 网页制作会用到的图片格式有哪些？

* Webp：WebP格式，谷歌（google）开发的一种旨在加快图片加载速度的图片格式。并能节省大量的服务器带宽资源和数据空间。Facebook Ebay等知名网站已经开始测试并使用WebP格式。
* Apng：是PNG的位图动画扩展，可以实现png格式的动态图片效果，有望代替GIF成为下一代动态图标准

## 13 viewport 所有属性？

* width :设置layout viewport的宽度，为一个正整数，或字符串'device-width'
* initial-scale:设置页面的初始缩放值，为一个数字，可以带小数
* minimum-scale:允许用户的最小缩放值，为一个数字，可以带小数
* maximum-scale:允许用户的最大缩放值，为一个数字，可以带小数
* height:设置layout viewport的高度，这个属性对我们并不重要，很少使用
* user-scalable:是否允许用户进行缩放，值为‘no’或者‘yes’

安卓中还支持：target-densitydpi，表示目标设备的密度等级，作用是决定css中的1px 代表多少物理像素

## 14 meta标签的name属性值？

name 属性主要用于描述网页，与之对应的属性值为content，content中的内容主要是便于搜索引擎机器人查找信息和分类信息用的

> A 、Keywords(关键字)说明：keywords用来告诉搜索引擎你网页的关键字。

> B 、description(网站内容描述) 说明：description用来告诉搜索引擎你的网站主要内容。

> C 、robots(机器人向导)说明：robots用来告诉搜索机器人哪些页面需要索引，哪些页面不需要索引。

## 15 a标签中 如何禁用href 跳转页面 或 定位链接?

e.preventDefault();

href="javascript\:void(0);

## 16 video标签的几个属性方法

* src：视频的URL 
* poster：视频封面，没有播放时显示的图片 
* preload：预加载 
* autoplay：自动播放 
* loop：循环播放 
* controls：浏览器自带的控制条 
* width：视频宽度 
* height：视频高度

## 17 块级元素、行内元素、行内块元素

**块级元素：**

特点：可设置宽高边距，占满整行，会自动换行

示例：div、 p、 h1 、h6、ol、ul、dl、table、address、blockquote、form

**行内元素：**

特点：无法设置宽高边距，不会占满整行，不会自动换行

示例：a、strong、b、em、i、del、s、ins、u、span

**行内块元素：**

特点：可设置宽高，占满整行，但不会自动换行

示例：img、input

## 18 web标准和w3c标准

web标准：分为结构、表现和行为

W3C标准：提出了更规范的要求

1、结构方面：标签字母要小写，标签要闭合，标签要正确嵌套

2、css和js方面：尽量使用外链写法，少用行内样式，属性名要见名知意

## 19 前端需要注意哪些SEO 

1、合理的title、description、keywords：搜素时对这三项的权重逐个减少，title强调重点，重要关键词不要超过两次，而且要靠前，不同页面title要有所不同，description高度概括页面内容，长度合适，不过分堆砌关键词，不同页面description有所不同，keywords列出重要关键词即可

2、语义化的html代码，符合W3C标准

3、提高网站速度

4、重要HTML代码放前面

5、重要内容不要用js输出：爬虫不会执行js获取内容

6、少用 iframe：搜索引擎不会抓取 iframe 中的内容

7、非装饰性图片必须加 alt

## 20 canvas和svg的区别

| canvas                                                       | svg                                              |
| :----------------------------------------------------------- | :----------------------------------------------- |
| 通过js绘制2D图形，按像素进行渲染，当位置发生改变会重新进行绘制 | 使用XML绘制的2D图形，可以为元素添加js处理器      |
| 依赖分辨率                                                   | 不依赖分辨率                                     |
| 不支持事件处理器                                             | 支持事件处理器                                   |
| 弱的文本渲染能力                                             | 最适合带有哦大型渲染区域的应用程序（如谷歌地图） |
| 能以.png或.jpg格式保存结果图像                               | 复杂度高会减慢渲染速度                           |
| 最适合图像密集型游戏，其中的许多对象会被频繁重绘             | 不适合游戏应用                                   |

canvas的width和height，和css设置canvas的width和height有什么区别

## 21 html缓存

HTML5 提供了两种主要的技术来创建离线 Web 应用：浏览器缓存和 Web Storage。

1. **浏览器缓存**： 在一般情况下，浏览器通过 HTTP 头部里的 "Last-Modified" 或者 "ETag" 字段来决定是否需要发送一次新的请求，或者获取缓存中的资源。但使用这种方式，用户必须先联网才能访问此网页。

2. **Web Storage**：Web Storage 提供了更完整、更具备发展前景的离线储存方案。Web Storage 分为两种类型：sessionStorage 和 localStorage。sessionStorage 为每一个 session（即窗口或标签页）创建独立的存储区域，数据在窗口或标签页关闭后会被清除，而 localStorage 则在关闭浏览器后仍然保持。

3. **Application Cache (已淘汰)**：历史上，HTML5 提供了一款名为 Application Cache 的功能，可以通过在页面头部定义一个 manifest 文件来确定哪些文件应当被存储（或者缓存），以便在离线时使用。然而，由于各种问题，这项功能已在 HTML 标准中被废弃，并被 Service Workers 接替。

4. **Service Workers**：Service Workers 是一个在用户浏览器后台运行的脚本，可拦截和处理网络请求。这回答了离线或低质量网络的问题，提供了推送通知和后台同步的能力。Service Worker 缓存提供了比传统 HTTP 缓存机制更丰富的策略和更精确的控制，使开发者可以根据需要管理资源。

在使用任何缓存技术时，应注重数据的安全性和用户隐私，避免存储敏感信息，并适时更新或清除过期数据。

## 22 哪些标签可以自动关闭

HTML 中有一些标签是空元素（void elements），也被称为自关闭标签。这些标签不包含任何内容，也不需要闭合标签。常见的自动关闭的HTML标签有：

1. `<img>`：插入图片。
2. `<br>`：强制换行。
3. `<hr>`：插入一条水平线。
4. `<input>`：表单输入元素。
5. `<link>`：链接外部样式表。
6. `<meta>`：提供关于 HTML 文档元数据。
7. `<area>`：定义图像映射内部的区域。
8. `<base>`：为页面上的所有链接规定默认地址或默认目标。
9. `<col>`：定义表格列的属性值。
10. `<command>`：定义命令按钮，比如单选按钮、复选框或按钮。
11. `<embed>`：嵌入外部应用或互动程序（如Flash应用）。
12. `<keygen>`：规定用于表单的密钥对生成器字段。
13. `<param>`：定义插入对象元素的参数。
14. `<source>`：定义媒介元素（比如 `<video>` 和 `<audio>`）的媒介资源。
15. `<track>`：定义用在媒体播放器中的文本轨道。
16. `<wbr>`：规定在文本中的何处适合添加换行符。

可以这样使用自闭和标签：

```html
<img src="image.jpg" alt="An image">
<br>
<input type="text" name="username">
<link rel="stylesheet" href="styles.css">
<meta charset="UTF-8">
```

上述标签在 HTML5 中都是有效的。请注意，在一些比较严格的文档类型（如 XHTML）中，即使是自闭合标签也需要明确关闭，比如 `<br />`。但在 HTML5 中，不需要这样做。

## 23  preload

在 HTML 页面为字体增加 preload，提升字体加载速度

## 24 webworker和websocket

web socket：在一个单独的持久连接上提供全双工、双向的通信。使用自定义的协议（ws\://、wss\://），同源策略对web socket不适用。
web worker：运行在后台的JavaScript，不影响页面的性能。
创建worker：var worker = new Worker(url);
向worker发送数据：worker.postMessage(data);
接收worker返回的数据：worker.onmessage
终止一个worker的执行：worker.terminate();