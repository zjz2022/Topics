# 前端面经（CSS部分）

## (一) CSS语法

### 1.1 单位

​		px全称`pixel`像素，是相对于屏幕分辨率而言的，它是一个绝对单位，但同时具有一定的相对性。因为在同一个设备上每个像素代表的物理长度是固定不变的，这点表现的是绝对性。但是在不同的设备之间每个设备像素所代表的物理长度是可以变化的，这点表现的是相对性。

​		em是一个相对长度单位，具体的大小需要相对于父元素计算，比如父元素的字体大小为80px，那么子元素1em就表示大小和父元素一样为80px，0.5em就表示字体大小是父元素的一半为40px。em 作为尺度单位时是以 font-size 属性为参考依据的。

​		rem 是 root em 的简称，表示设置以网页根元素 ( html ) 的字符高度为单位。因此可以只对 html 元素设置字体大小，其他元素用 rem 单位设置百分比大小，例如 h 1{font-size:1.25 rem}。一般的浏览器默认的 1 rem 是 16 px。

​		*vw* 和 *vh* 是 *CSS3* 新单位，即 *view width* 可视窗口宽度 和 *view height* 可视窗口高度。1*vw* 就等于可视窗口宽度的百分之一，1*vh* 就等于可视窗口高度的百分之一。

### 1.2 块级元素

```
块级：form h li p table th
```

- 每个块级元素都是独自占一行；
- 高度，行高，外边距（margin）以及内边距（padding）都可以控制；
- 元素的宽度如果不设置的话，默认为父元素的宽度（父元素宽度100%；
- 多个块状元素标签写在一起，默认排列方式为从上至下；

```
行内：a br i label small textarea select strong
```

- 不会独占一行，相邻的行内元素会排列在同一行里，直到一行排不下才会自动换行，其宽度随元素的内容而变化；
- 高宽无效，对外边距（margin）和内边距（padding）仅设置左右方向有效  上下无效；
- 设置行高有效，等同于给父级元素设置行高；
- 元素的宽度就是它包含的文字或图片的宽度，不可改变；
- 行内元素中不能放块级元素，a 链接里面不能再放链接；

```
行内块：button input textarea select img
```

- 高度、行高、外边距以及内边距都可以控制；
- 默认宽度就是它本身内容的宽度，不独占一行，但是之间会有空白缝隙，设置它上一级的 font-size 为 0，才会消除间隙；

### 1.3 隐藏

分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景

- 结构： display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击， visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击 ，opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击。
- 继承： display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。 visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。
- 性能： display: none : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大 visibility: hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容 opacity: 0 ： 修改元素会造成重绘，性能消耗较少。通过display: none隐藏一个DOM节点-触发重排和重绘通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化（详见 3.2）

​	屏幕并不是唯一的输出机制，比如说屏幕上看不见的元素（隐藏的元素），其中一些依然能够被读屏软件阅读出来（因为读屏软件依赖于可访问性树来阐述）。为了消除它们之间的歧义，我们将隐藏类型归为三大类：

完全隐藏：元素从渲染树中消失，不占据空间。视觉上的隐藏：屏幕中不可见，占据空间。语义上的隐藏：读屏软件不可读，但正常占据空。

**完全隐藏**

(1) display 属性

```css
 display: none;
```

(2) hidden 属性 HTML5 新增属性，相当于 display: none

```html
<div hidden></div>
```

**视觉上的隐藏**

(1) 设置 posoition 为 absolute 或 fixed，通过设置 top、left 等值，将其移出可视区域。

```css
position:absolute;
left: -99999px;
```

(2) 设置 position 为 relative，通过设置 top、left 等值，将其移出可视区域。

```css
position: relative;
left: -99999px;
height: 0
```

(3) 设置 margin 值，将其移出可视区域范围（可视区域占位）。

```js
margin-left: -99999px;
height: 0;
```

**语义上隐藏**

*aria-hidden 属性*

读屏软件不可读，占据空间，可见。

```js
<div aria-hidden="true"></div>
```

### 1.4 清除浮动

​		清除浮动是清除浮动带来的负面影响。因为子元素浮动了，脱离标准流，不再占用之前的位置，导致无法撑开没有设置高度的父元素浮动的父元素高度为0,进而导致后续结构直接跑上来，导致高度塌陷。

- ​		clear 清除浮动（添加空div法）在浮动元素下方添加空div，并给该元素写css样式：{clear:both;height:0;overflow:hidden;}		缺点：添加无意义标签，语义化差；
- ​		给浮动元素父级设置高度
- ​		父级同时浮动（需要给父级同级元素添加浮动）
- ​		父级设置成inline-block		缺点：需要设置宽度，margin: 0 auto居中方式失效；
- ​		给父级添加overflow:hidden		缺点：内容增多的时候容易造成不会自动换行导致内容被隐藏掉，无法显示要溢出的元素；
- ​		万能清除法 ::after 伪元素清浮动（现在主流方法，推荐使用）		缺点：：ie6-7不支持伪元素：after，使用zoom:1触发hasLayout.

### 1.5 动画

ss中实现动画有两种方式：`transition`过渡动画、 `animation`自定义动画。

**1. transition：**

- transition-property：指定使用过渡效果的css属性 w| h| color |font-size | all
- transition-duration：设置过渡动画持续时间
- transition-timing-function：设置动画的时间函数。linear | ease（缓解）| cubic-bezier(*n*,*n*,*n*,*n*)
- transition-delay：设置动画的延迟时间

注意：

​	不支持z-index | display

**2. animation:**

通过@keyframes自定义关键帧动画并为动画命名，可以在其中对每一帧进行设置。

```css
@keyframes animateName{
    from|0%   { width:50px; height:50px; }	
    50%  { width:100px; height:100px; }	
    to|100% { width:50px; height:50px; }
}
// 从左往右滑动，或者用transition实现，或者使用jQuery的window.requestAnimationFrame实现
@keyframes slideInFromLeft {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0);
  }
}
.slideInElement {
  animation: 2s ease-out 0s 1 slideInFromLeft;
}
```

使用自定义动画的元素，需要通过animation相关属性进行配置

- animation-name: 某个元素想要使用对应名称的动画
- animation-duration：默认为0
- animation-timing-function：可配置动画随时间的运动速率和轨迹
- animation-delay
- animation-iteration-count：用于定义动画迭代次数，默认为1|infinite
- animation-direction：设置动画执行方向 normal|reverse|alternate|inherit
- animation-fill-mode：动画的填充模式 none|forwards|backwards
- animation-play-state：设置动画的执行状态，通常通过JavaScript动态控制。running|paused

多动画：

1. 首先使用`animation-name`来锁定使用的各个动画
2. 之后使用其它的`animation`族属性，分别约束对应动画，且设置顺序与`animation-name`使用动画的顺序保持一致。

**为什么transform比top快**

​		因为top和left的改变会触发浏览器的 reflow和 repaint 。整个动画过程都在不断触发浏览器的重新渲染，这个过程是很影响性能的。而`transform` 动画由GPU控制该过程发生在合成线程，与渲染主线程无关，支持硬件加速。

​		CSS transform属性并不会触发当前元素或附近元素的relayout。浏览器将当前元素视为一个整体，它会缩放、旋转、移动这一整个元素。浏览器只需要在动画开始之时生成位图，然后将位图发送给GPU。之后浏览器不需要做额外的relayout和repaint，甚至不需要发送位图给GPU。浏览器只需要充分发挥GPU的长处：绘制同一张位图到不同的位置、旋转角度和缩放比例。

```
现代浏览器通常由两个重要的线程组成（主线程 和 合成线程）。这两个线程一起工作完成绘制页面的任务：
主线程需要做的任务如下：
- 运行Javascript
- 计算HTML元素的CSS样式
- layout (relayout)
- 将页面元素绘制成一张或多张位图
- 将位图发送给合成线程

合成线程主要任务是：

- 利用GPU将位图绘制到屏幕上
- 让主线程将可见的或即将可见的位图发给自己
- 计算哪部分页面是可见的
- 计算哪部分页面是即将可见的（当你的滚动页面的时候）
- 在你滚动时移动部分页面

在很长的一段时间内，主线程都在忙于运行Javascript和绘制元素。
```

**其他优化的策略还有：**- opacity替代visibility- 多个DOM统一操作（虽然V8会有缓存优化）- 先将DOM离线，即display：none；修改后显示- 不要把DOM放在已给循环中作为循环变量- 不要使用table

合成层与渲染层https://blog.csdn.net/weixin_44100002/article/details/121606441

### 1.6 权重

第一优先级：无条件优先的属性只需要在属性后面使用！important。它会覆盖页面内任何位置定义的元素样式。ie6不支持该属性。

第二优先级：在html中给元素标签加style，即内联样式。该方法会造成css难以管理，所以不推荐使用。

第三优先级：由一个或多个id选择器来定义。例如，#id{margin:0;}会覆盖.classname{margin:3pxl}

第四优先级：由一个或多个类选择器、属性选择器、伪类选择器定义。如.classname{margin:3px}会覆盖div{margin:6px;}

第五优先级：由一个或多个类型选择器定义。如div{marigin:6px;}覆盖*{margin:10px；}

第六优先级：通配选择器，如*{marigin:6px;}

权重优先级：行内样式（1000）>ID选择器（100）>类选择器（10）>标签选择器（1）>通用选择器（0）

对于一个已经定位的盒子（即其 `position` 属性值不是 `static`，这里要注意的是 CSS 把元素看作盒子），`z-index` 属性指定：

1. 盒子在当前堆叠上下文中的堆叠层级。
2. 盒子是否创建一个本地堆叠上下文。

### 1.7 居中

​	1）父、子元素宽高未知时

- table-cell（使用表格样式）

```css
<style>
.table-wrap{
        display: table-cell;
        height: 200px;
        width: 100px;
        padding: 20px;
        vertical-align: middle;
        text-align: center;
        border: 1px solid red;
        }
</style>
<div  class="table-wrap">
    我是一大推文字，我想要垂直居中，这是省略这是省略这是省略这是省略
</div>
```

- flex 布局（父级 justify-content: center 和 align-items: center 即可）
- absolute + transform（定位的上、左为 50%，translate 上、左负 50%）
- absolute + margin: 0 auto（定位的上下左右为 0）
- Grid 网格布局
- 直接使用 table（改变结构实现，和第一条类似）

​	2）子元素固定宽高已知时（假设子元素宽高为 200px）

- absolute + calc（定位上、左负50%时减去子元素宽、高）
- absolute + 负margin（定位的上、左为 50%，margin 的上、左负子元素的一半）

​	3）父元素高度已知（假设为 400px），子元素宽高未知

- text-align + vertical-align

​		text-align: center; 是给父元素设置的，使得父元素设置之后，它里面的行内级元素居中

### 1.8 定位与脱标

1）脱标：

- 元素设置position，并且position的值为fixed或absolute；【这里有两种**在流**定位值，他们分别是`static`和`relative`】
- 元素添加浮动float，并且float的值不为none；

​	特点：

- 元素不再严格区分块级(block)、行内级(inline)，行内块级(inline-block)，若元素未设置宽度高度，那么元素的宽高将完全由内容决定；
- 不再给父元素汇报自身宽高，若父元素没有设置宽高，将不能撑起父元素；
- 即使原来是行内级元素也可以随意设置宽度高度；

2）子绝父相

​		子绝父绝，子绝父固定都是可以的，absolute 的 left、right、top、bottom 这几个定位的属性参照对象是最邻近的定位祖先元素，所以只要我们要相对与哪个祖先来定位只要将祖先设置为定位元素就行，至于是哪种就得看你的实际需求了，当希望子元素相对于父元素进行定位，又不希望父元素脱标的时候，我们才会会用到子绝父相。

3） 定位属性

1. `position: static;`默认值。没有定位，元素出现在正常的流中（忽略 `top, bottom, left, right` 或者 `z-index` 声明）。元素框正常生成。块级元素生成一个矩形框，作为文档流的一部分，行内元素则会创建一个或多个行框，置于其父元素中。
2. `position: inherit;`即继承父元素的`position`值。
3. `position: relative;`
4. `position: absolute;`绝对定位的元素的位置相对于**最近的已定位祖先元素**，如果元素没有已定位的祖先元素，那么它的位置相对于**最初的包含块**。
5. `position: fixed;``fixed`元素脱离正常的文档流，所以它与`absolute`元素很相似，同样会被周围元素忽略，支持`top,bottom,left,right`属性，固定在屏幕的某个位置。不支持`IE6、IE7、IE8`。可以通过给该元素设置`position: absolute`并获取滚动条距离顶部高度加上某个固定高度来实现。
6. `position: sticky;`当元素距离页面视口（Viewport，也就是fixed定位的参照）顶部距离大于 0px 时，元素以 relative 定位表现，而当元素距离页面视口小于 0px 时，元素表现为 fixed 定位，也就会固定在顶部。

须指定 top、right、bottom、left 四个阈值其中之一，才可使粘性定位生效。否则其行为与相对定位相同。并且 top 和 bottom 同时设置时，top 生效的优先级高，left 和 right 同时设置时，left 的优先级高。设定为sticky 元素的任意父节点的 overflow 属性必须是 visible，否则 sticky 不会生效。如果 sticky 元素的任意父节点定位设置为 hidden，则父容器无法进行滚动，所以sticky 元素也不会有滚动然后固定的情况。如果 position:sticky 元素的任意父节点定位设置为 relative | absolute | fixed，则元素相对父元素进行定位，而不会相对 viewport 定位。

### 1.9 选择器

- **伪类**：以冒号(:)开头，用于选择处于特定状态的元素。

```
动态伪类：:visited(链接已访问时)、:focus、:hover等
状态伪类：:disabled、:empty、:required(表单项是否必填) 等
结构伪类：:first-child、:nth-of-type等
p:nth-child(odd){} //奇数行
p:nth-child(even){} //偶数行
其他伪类：:target(元素 id 匹配到哈希值时)、:lang(匹配到指定语言时)、:not()等
//顺序：link、visited、focus、hover、active 前三个无所谓，后两个保持一致
```

- 伪元素：以双冒号(::)开头，用于在文档中插入虚构的元素。
- 相邻选择器：

​	+选择器。如果需要选择紧接在另一个元素后的元素，而且二者有相同的父元素，可以使用相邻兄弟选择器。

​	~ 选择器。作用是查找某一个指定元素的后面的所有兄弟结点。

### 1.10 CSS3

**CSS3** 新增东西众多，这里列举出一些关键的新增内容：

- 选择器：通用兄弟选择器、伪类选择器、伪元素选择器、否定选择器、状态伪类选择器
- 盒子模型属性：*border-radius、box-shadow、border-image*
- 背景：*background-size、background-origin、background-clip*
- 文本效果：*text-shadow、word-wrap*
- 颜色：新增 *RGBA，HSLA* 模式
- 渐变：线性渐变、径向渐变
- 字体：*@font-face*
- 2D/3D转换：*transform、transform-origin*
- 过渡与动画：*transition、@keyframes、animation*
- 多列布局
- 媒体查询

1）transition：transition-property | transition-duration | transition-timing-function | transition-delay |

2）transform：translate() | rotate() | scale() | skew() |

### 1.11 BFC

块格式化上下文（Block Formatting Context，BFC） 是Web页面的可视化CSS渲染的一部分，是块盒子的布局过程发生的区域，也是浮动元素与其他元素交互的区域。它是页面中的一块渲染区域，并且有一套属于自己的渲染规则，它决定了元素如何对齐内容进行布局，以及与其他元素的关系和相互作用。 当涉及到可视化布局的时候，BFC提供了一个环境，HTML元素在这个环境中按照一定规则进行布局。

​		BFC是一个独立的布局环境，BFC内部的元素布局与外部互不影响。

​		BFC的布局规则：		1 内部的Box会在垂直方向一个接着一个地放置。		2 Box垂直方向上的距离由margin决定。属于同一个BFC的两个相邻的Box的margin会发生重叠。		3 每个盒子的左外边框紧挨着包含块的左边框，即使浮动元素也是如此。		4 BFC的区域不会与float box重叠。		5 BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然。		6 计算BFC的高度时，浮动子元素也参与计算。

​		如何触发BFS:

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-7d7017c7cd579f71ea67a6eb6dbf247e_720w.webp)

​		BFC可以解决哪些问题？

1 解决浮动元素令父元素高度坍塌的问题

2 非浮动元素被浮动元素覆盖

3 两栏自适应布局

参考文献：

- ​		[一次弄懂css的BFC - 知乎 (zhihu.com)](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fzhuanlan.zhihu.com%2Fp%2F127187654)

**文档流：**

文档流是由 CSS 定位语句定义的页面元素的排列，以及 HTML 元素的顺序。 也就是说，每个元素如何占用空间以及其他元素如何相应地定位自己。

简单点说，就是 *document flow* 指示了页面上的元素如何去**排列**。接着，讲到了 *document flow* 的三种影响元素位置的方法：

> - 显示类型：HTML 元素最初按其显示类型定位。 这种显示类型决定了其他元素是否能够位于它们旁边，以及填充、边距和其他 CSS 属性如何影响它。 两种最重要的显示类型是：block 和 inline
> - Float：浮动框是一种CSS属性，它允许你应用在一个块级元素上，可以把这个块级元素推到父类块的左边界或者右边界。浮动元素离开了正常的文档流。一个周知的问题是当多个子元素都为浮动时，造成父类块高度的丢失。关于`clearfix`，本质上也是利用BFC
> - 定位：这里有几个可以应该在元素上的定位值。应该在所有元素上的初始值是`static`，一个在“在流”类型，我们将在之后谈到。



### 1.12 canvas

1.canvas是html5的一个新标签，属于h5的新特性2.canvas标签是一个图形的容器，简单点说就是一块画布，你可以在上画矩形，圆形，三角形，折线等等,也可以用来画logo3.它是通过javascript来画的，即脚本绘制图形

canvas可以用来干啥呢？1.制作web网页游戏（但是如果代码写的不咋的游戏可能会非常卡）2.数据可视化（这么说你可能不明白，但我告诉你echarts就是基于canvas）3.广告banner的动态效果非常适合用canvas制作4.canvas还可以用来内嵌一些网页

### 1.13 src和href

href标识超文本引用，用在link和a等元素上，href是引用和页面关联，是在当前元素和引用资源之间建立联系

src表示引用资源，表示替换当前元素，用在img，script，iframe上，src是页面内容不可缺少的一部分。

src是source的缩写，是指向外部资源的位置，指向的内部会迁入到文档中当前标签所在的位置；在请求src资源时会将其指向的资源下载并应用到当前文档中，例如js脚本，img图片和frame等元素。

```
<script src="js.js"></script>当浏览器解析到这一句的时候会暂停其他资源的下载和处理，直至将该资源加载，编译，执行完毕，图片和框架等元素也是如此，类似于该元素所指向的资源嵌套如当前标签内，这也是为什么要把js饭再底部而不是头部。

<link href="common.css" rel="stylesheet"/>当浏览器解析到这一句的时候会识别该文档为css文件，会下载并且不会停止对当前文档的处理，这也是为什么建议使用link方式来加载css而不是使用@import。
```

link和@import，两者都是外部引用CSS的方式，但是存在一定的区别：

- link是XHTML标签，除了加载CSS外，还可以定义RSS等其他事务；@import属于CSS范畴，只能加载CSS。
- link引用CSS时，在页面载入时同时加载；@import需要页面网页完全载入以后加载。
- link是XHTML标签，无兼容问题；@import是在CSS2.1提出的，低版本的浏览器不支持。
- ink支持使用Javascript控制DOM去改变样式；而@import不支持

## (二)布局

移动端布局主要分为单独制作移动端页面和响应式页面。单独制作分为流式布局（百分比）、flex布局、媒体查询布局和混合布局。响应式分为媒体查询和bootstarp。

前端布局包括：静态布局、弹性布局（flexbox）、自适应布局（bootstrap）、流式布局（fluid）、响应式布局、浮动布局、定位布局。

### 2.1 Flex

​		flex 是 Flexible Box 的缩写，意为"弹性布局"。**块级和行内都可以指定**。指定容器display: flex即可。		父容器有以下属性：flex-direction，flex-wrap，flex-flow，justify-content，align-items，align-content。

- ​		**flex-direction**属性决定主轴的方向（row、column、row-resverse ）；
- ​		**flex-wrap**属性定义，默认不换行，装不下会缩小子元素宽度；使用wrap换行；
- ​		**flex-flow**属性是flex-direction属性和flex-wrap属性的简写形式  ，默认值为row nowrap；
- ​		**justify-content**属性定义了项目在主轴上的对齐方式。(center\flex-start\space-around\space-between)
- ​		**align-items**属性定义单行在交叉轴上如何对齐。
- ​		**align-content**属性定义了多行的对齐方式。如果项目只有一根轴线，该属性不起作用。

​		项目（子元素）也有一些属性：order，flex-grow，flex-shrink，flex-basis，flex，align-self。

- ​        flex定义子项目剩余空间，适合三栏布局。 flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。（1 [1 1 auto]就是代表均匀分配元素，`flex:0`等同于`flex: 0 1 0%`相当于不可扩大，可缩小,表现形式为最小内容宽度。`flex:none`等同于设置`flex: 0 0 auto`相当于不可扩大，不可缩小,内容本身的宽度是多少就是多少）
- ​        order属性定义项目的排列顺序。数值越小，排列越靠前，默认为0。
- ​		flex-grow属性定义项目的放大比例，默认为0（不瓜分剩余空间），可以小于1但和要等于1。若min-content超出空间则作为最终宽度（可以通过设为0解决）。

```
剩余空间：x
假设有三个flex item元素，flex-grow 的值分别为a, b, c
每个元素可以分配的剩余空间为： a/(a+b+c) * x，b/(a+b+c) * x，c/(a+b+c) * x
```

- ​		flex-shrink属性定义了项目的缩小比例，默认为1，即如果空间不足，该项目将缩小。

```
三个flex item元素的width: w1, w2, w3
三个flex item元素的flex-shrink：a, b, c
计算总压缩权重：
sum = a * w1 + b * w2 + c * w3
计算每个元素压缩率：
S1 = a * w1 / sum，S2 =b * w2 / sum，S3 =c * w3 / sum
计算每个元素宽度：width - 压缩率 * 溢出空间
```

- ​		flex-basis属性定义了在分配多余空间之前，项目占据的主轴空间（main size）。 max-width/min-width > flex-basis > width > box
- ​		align-self 属性允许单个项目有与其他项目不一样的对齐方式，可覆盖 align-items 属性。默认值为 *auto*，表示继承父元素的align-items属性，如果没有父元素，则等同于stretch。

### 2.2 响应｜移动

**移动端布局：**

viewport 即视窗、视口，用于显示网页部分的区域，在 PC 端视口即是浏览器窗口区域，在移动端，为了让页面展示更多的内容，视窗的宽度默认不为设备的宽度，在移动端视窗有三个概念：布局视窗、视觉视窗、理想视窗

- 布局视窗：在浏览器窗口css的布局区域，布局视口的宽度限制css布局的宽。为了能在移动设备上正常显示那些为pc端浏览器设计的网站，移动设备上的浏览器都会把自己默认的 viewport 设为 980px 或其他值，通过 box-sizing 改变，一般都比移动端浏览器可视区域大很多，所以就会出现浏览器出现横向滚动条的情况
- 视觉视窗：终端设备显示网页的区域
- 理想视窗：针对当前设备最理想的展示页面的视窗，不会出现横向滚动条，页面刚好全部展现在视窗内，理想视窗也就是终端屏幕的宽度。

<meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, minimum-sacle=1, maximum-scale=1" >//只对移动端浏览器有效

width定义视口的宽度，单位为像素正整数或设备宽度；device-widthheight定义视口的高度，单位为像素正整数或device-height；initial-scale定义网页初始缩放值整数或小数，小数为缩小，反之放大；maximum-scale定义缩放最大值整数或小数；minimum-scale定义缩放最小值整数或小数；user-scalable定义用户是否可以缩放yes/no

**布局方法：** vw/vh 和百分比布局，响应式和 REM 布局。

响应式布局：

​		需要为父级做一个布局容器，在不同的屏幕下通过媒体查询来改变布局容器的大小，在改变里面子元素的排列方式和大小。

```css
@media screen and (max-width: 320px) {
    body {background-color: red;}
```

不管是移动优先还是PC优先，都是依据当随着屏幕宽度增大或减小的时候，后面的样式会覆盖前面的样式。因此，移动端优先首先使用的是`min-width`，PC端优先使用的`max-width`

```
-webkit-min-device-pixel-ratio: 1.5 //是指当时显示屏最小的色倍为1.5倍的
它是设备上物理像素和设备独立像素( device-independent pixels (dips) )的比例
```

子元素的`height`或`width`中使用百分比，是相对于子元素的直接父元素，`width`相对于父元素的`width`，`height`相对于父元素的`height`；

子元素的`top`和`bottom`如果设置百分比，则相对于直接非`static`定位(默认定位)的父元素的高度；

子元素的`padding`如果设置百分比，不论是垂直方向或者是水平方向，都相对于直接父亲元素的`width`，而与父元素的`height`无关。跟`padding`一样，`margin`也是如此；

`border-radius`不一样，如果设置`border-radius`为百分比，则是相对于自身的宽度，除了`border-radius`外，还有比如`translate`、`background-size`等都是相对于自身的；

从上述对于百分比单位的介绍我们很容易看出如果全部使用百分比单位来实现响应式的布局，有明显的以下两个缺点：

- 计算困难，如果我们要定义一个元素的宽度和高度，按照设计稿，必须换算成百分比单位。
- 可以看出，各个属性中如果使用百分比，相对父元素的属性并不是唯一的。比如`width`和`height`相对于父元素的`width`和`height`，而`margin`、`padding`不管垂直还是水平方向都相对比父元素的宽度、`border-radius`则是相对于元素自身等等，造成我们使用百分比单位容易使布局问题变得复杂。

**REM布局**

`REM`是`CSS3`新增的单位，并且移动端的支持度很高，Android2.x+,ios5+都支持。`rem`单位都是相对于根元素html的`font-size`来决定大小的,根元素的`font-size`相当于提供了一个基准，当页面的size发生变化时，只需要改变`font-size`的值，那么以`rem`为固定单位的元素的大小也会发生响应的变化。 因此，如果通过`rem`来实现响应式的布局，只需要根据视图容器的大小，动态的改变`font-size`即可（而`em`是相对于父元素的）。

`css3`中引入了一个新的单位`vw/vh`，与视图窗口有关，`vw`表示相对于视图窗口的宽度，`vh`表示相对于视图窗口高度，除了`vw`和`vh`外，还有`vmin`和`vmax`两个相关的单位。(相对于视窗的宽度，1vw 等于视口宽度的1%，即视窗宽度是100vw)

注意：

1物理像素线（也就是普通屏幕下1px,高清屏幕下0.5px的情况）采用`transform`属性`scale`实现

`lib-flexible`并不独立出现，而是搭配`px2rem-loader`一起做适配方案，目的是**自动将css中的px转换成rem**。

**图片响应式**

```
img {
    display: inline-block;
    max-width: 100%;
    height: auto;//证图片进行等比缩放而不至于失真
}
<img srcset="photo_w350.jpg 1x, photo_w640.jpg 2x" src="photo_w350.jpg" alt="">
如果屏幕的dpi = 1的话则加载1倍图，而dpi = 2则加载2倍图，手机和mac基本上dpi都达到了2以上，这样子对于普通屏幕来说不会浪费流量，而对于视网膜屏来说又有高清的体验。
```

参考：

https://juejin.cn/post/6844903814332432397

### 2.3 grid

首先引入grid.css。定义：display：grid

容器属性：

**grid-template-*** (columns\rows)  定义n×m的网格。可以利用repeat(auto-fill,x)自己分配，x可以定义为fr等分。

**grid-\*-gap**（缩写为gap）定义间距

**grid-template-areas:** 定义每个项目的名字，不同区域名字可以相同，用.表示匿名

**grid-auto-flow:** row column dense; 定自动布局算法按照通过逐行/列填充来排列元素

**justify-items：**start|end|center|stretch 水平方向（align垂直） 两者合并为place-items

**justify-content：**start|end|center|stretch|space-around 水平方向（align垂直）

**grid-auto-*：**用来设置多出来的项目的宽和高

项目属性：

**grid-column|row-start|end:**指定item的具体位置，具体在那根网格线之间。简写grid-column：1 **/** 3;

**justify-self / align-self** 只作用于单个项目设置垂直和水平

### 2.4 flexible

现在我们把设计稿分成10等份，设计稿 A = W/10，我们把设备可视区域也就是我们的各种移动端设备的这个画布也分成10份，并赋值给根元素的fontSize，我们都知道rem是根据根元素字体大小计算的，所以我们的1rem也就是设备可视区域/10，现在设计稿上有一块区域宽B，那它是不是等比放到设备可视区域的宽度为 B/A rem。再啰嗦一下，B在设计稿上占B/A份，那在设备可视区域上也要占B/A份对不对，所以宽是B/A rem。

```js
// 首先是一个立即执行函数，执行时传入的参数是window和document
function flexible (window, document) {
  var docEl = document.documentElement // 返回文档的root元素
  var dpr = window.devicePixelRatio || 1 
  // 获取设备的dpr，即当前设置下物理像素与虚拟像素的比值
  // 调整body标签的fontSize，fontSize = (12 * dpr) + 'px'
  // 设置默认字体大小，默认的字体大小继承自body
  // 当页面展示或重新设置大小的时候，触发重新
  // 检测0.5px的支持，支持则root元素的class中有hairlines
}
```

## (三)渲染

### 3.1 阻塞渲染



​		HTML解析器在解析过程中如果遇到外部CSS与外部JS文件，就会同时发起请求对文件进行下载，这个过程DOM构建的过程会停止，需要等CSS文件下载完成并构建完CSSOM，JS文件下载完成并执行结束，才会开始构建DOM。如果遇到 script 标签，渲染线程会暂停渲染过程，将控制权交给 JS 引擎。等 JS 引擎运行完毕，浏览器又会把控制权还给渲染线程，继续 DOM 的解析。我们知道**CSS会阻塞JS的执行，所以JS必须要等到CSSOM构建完成之后再执行**

- js执行会阻塞DOM树的解析和渲染
- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行

​		当要执行一个html页面时，他需要预先加载从上往下读取html里面的内容：首先，它会创建一个存放标签名的栈，然后会创建一个dom树，当html的根节点<html>也被加载到栈中时,才会形成完整的dom树，页面展示以及前端的操作都是基于这个dom树的；

而加载形成dom树的过程中：css是非阻塞的，它被下载完成后，不会直接直接执行，而是浏览器回头加载完成之后在进行解析，这也就能够解释，为什么有时候我们网速差的时候，先看到的只是我们写入的文字，而没有我们写好的样式；但，js是阻塞的，那也就意味着，js被加载，就会直接编译执行(有事件处理机制的不会立马执行)，**宏任务不会阻塞渲染，大量的微任务会阻塞渲染；**

因此，js要想被执行：要么页面已经加载完成，即页面代码在前，能够在js加载执行时，在前面的代码中找到对应的对象；要么在js中，给他添加一个事件处理机制，让js只是先加载，然后等页面加载完成之后，在执行；譬如：window.onload,document.ready都是可以做到的；

因此，为了避免让用户看到长时间的白屏时间，我们应该尽可能的**提高css加载速度**，比如可以使用以下几种方法:

- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

https://juejin.cn/post/7083744760048910366

https://juejin.cn/post/6844903553795014663

### 3.2 重排重绘

​	重排(reflow)和重绘(repaint)

​		当DOM的变化影响了元素的几何信息(元素的的位置和尺寸大小)，浏览器需要重新计算元素的几何属性，将其安放在界面中的正确位置，这个过程叫做重排。重排也叫回流，简单的说就是重新生成布局，重新排列元素。

​		当一个元素的外观发生改变，但没有改变布局,重新把元素外观绘制出来的过程，叫做重绘。

​		任何改变用来构建渲染树的信息都会导致一次重排或重绘：

- 添加、删除、更新DOM节点
- 通过display: none隐藏一个DOM节点-触发重排和重绘
- 通过visibility: hidden隐藏一个DOM节点-只触发重绘，因为没有几何变化
- 移动或者给页面中的DOM节点添加动画
- 添加一个样式表，调整样式属性
- 用户行为，例如调整窗口大小，改变字号，或者滚动。

​		减少重排方法：

1）我们应该尽量以局部布局的形式组织html结构，尽可能小的影响重排的范围。尽可能在低层级的DOM节点上，而不是像上述全局范围的示例代码一样，如果你要改变p的样式，class就不要加在div上，通过父元素去影响子元素不好。不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局。那么在不得已使用table的场合，可以设置table-layout:auto;或者是table-layout:fixed这样可以让table一行一行的渲染，这种做法也是为了限制reflow的影响范围。

2）不要频繁的操作样式，对于一个静态页面来说，明智且可维护的做法是更改类名而不是修改样式，对于动态改变的样式来说，相较每次微小修改都直接触及元素，更好的办法是统一在 cssText 变量中编辑。

3）DOM 的多个读操作（或多个写操作），应该放在一起。不要两个读操作之间，加入一个写操作。当我们修改了元素的几何属性，导致浏览器触发重排或重绘时。它会把该操作放进渲染队列，等到队列中的操作到了一定的数量或者到了一定的时间间隔时，浏览器就会批量执行这些操作。

4）将 DOM 离线。离线”意味着不在当前的 DOM 树中做修改。可以使用 display:none，相当于将其从页面上“拿掉”，我们之后的操作将不会触发重排和重绘，添加足够多的变更后，通过 display属性显示（另一次重排重绘）。通过这种方式即使大量变更也只触发两次重排。另外，visibility : hidden 的元素只对重绘有影响，不影响重排。

5）使用 absolute 或 fixed 脱离文档流。使用绝对定位会使的该元素单独成为渲染树中 body 的一个子元素，重排开销比较小，不会对其它节点造成太多影响。当你在这些节点上放置这个元素时，一些其它在这个区域内的节点可能需要重绘，但是不需要重排。

参考：

- 重排(reflow)和重绘(repaint)  https://juejin.cn/post/6844904083212468238

### 3.3 加载优化

**1 资源加载优先级**

浏览器是基于自身的启发式算法，会对资源的重要性进行判断，来划分优先级，通常从低到高分为Lowest、Low、High、Highest等。比如在head标签中，CSS文件通常具有最高的优先级Hightest，其次是script标签所请求的脚本文件，当script带有defer或async的异步属性时，其优先级就会降低到Low。

（1）预加载预加载应该是我们常听说的，可以使用<link ref="preload">来告诉浏览器当前指定的资源应该具有更高的优先级，需要尽快开始加载资源：

```html
<link ref="preload" as="script" href="important.js">
```

这里我们给link标签指定了一个as属性，它会告诉浏览器所要加载的资源的类型，当前需要加载的资源必须是这个指定类型的资源，不然不会进行预加载。需要注意的是，`<link ref="preload">`是浏览器的强制性指令，preload后浏览器就必定去预加载相应的资源。使用时需要仔细测试，确保不会因为使用它而意外导致资源加载2次。

（2）预连接我们知道，在较慢的网络环境下建立网络连接是非常耗时的，如果想建立安全连接将更加好事（例如HTTPS连接）。其原因主要是整个过程涉及到了DNS解析、重定向、三次握手过程等。如果能提前完后才能上述操作，那么就能带来更好的用户体验，与此同时，由于建立连接的大部分时间是消耗在等待的时间上，这样也能有效的优化宽度的使用情况。这时我们就可以使用预连接：

```html
<link ref="preconnect" href="https://juejin.cn/">
```

这里通过`<link ref="preconnect">`指令，告诉浏览器当前页面将与站点之间建立连接，希望尽快启动该过程。虽然这么做成本很低，但是会消耗抱回的CPU的时间，特别是在简历HTTPS安全连接时，如果建立好连接的10s之内没有使用该连接，浏览器就会关闭该连接，那么之前所有准备的资源就都浪费了。

除此之外，还有一种和预连接相关的类型`<link ref="dns-prefetch">`，也就是DNS预解析，它仅用来处理DNS查询。该属性在浏览器的支持度很高，并且可以明显缩短DNS的查询时间，所以被普遍使用。

流媒体资源的预连接就是一个很好的例子，对于不同来源的流媒体，我们希望在连接阶段节省一些时间但不一定立即开始获取内容。根据页面处理流内容的方式，可能需要等到脚本加载完毕并做好准备后才处理流。一旦准备加载资源，预连接可帮助我们缩短单次往返的等待时间。

（3）预提取前面所说的预解析和预连接都是试图更快的获取关键的资源，而接下来要说的预提取则是利用机会让某些非关键资源提前获取。预提取就是根据用户已发生的行为来判断接下来的预期行为，告诉浏览器稍后可能需要的资源，也就是当页面加载完成之后，且在宽带可用的情况下，这些资源将以lowest的优先级进行提取。从上面的描述中可知，预提取最适合的场景就是为用户的下一步可能的操作做好必要的准备，比如在搜索框搜索内容时，可以预提取结果列表中首个内容的详情页，或者在使用搜索查询是，预提取搜索结果的下一页的内容。

**前端加载优化：**

1. **减少包体积：**打包构建的时候，使用--report命令：打包结束后，会在dist目录里面生成一个report html文件，里面会显示你打包体积分布情况，可以根据项目情况，侧重优化。在webpack里加上下面插件，每次serve的时候，会生成一个json文件，里面会显示你没用到的文件   config.plugin('uselessFile')然后删除没有用到的文件。关闭sourcemap  【通俗的来说， Source Map 就是一个信息文件，里面存储了代码打包转换后的位置信息，实质是一个 json 描述文件，维护了打包前后的代码映射关系。】
2. 精简第三方库： 如果你使用了第三方库，只导入你实际需要的功能，避免导入整个库。 让没有按需引入的库按需引入并且引入一个库的最小资源  ||  删除包之间互相引用版本不平衡的包。
3. 避免使用不必要的重复代码： 在代码中尽量避免重复的逻辑和代码块，可以考虑封装为函数或组件，以减少代码量和维护成本。
4. 代码拆分： 将代码拆分成多个模块或块（chunk），按需加载，以减少初始加载时间，特别是在较大的应用中。
5. 压缩资源： 使用压缩算法（如Gzip）压缩传输的CSS、JavaScript和HTML文件，减少文件大小，从而降低带宽消耗和加载时间。
6. 使用WebP格式图片： 如果浏览器支持，使用WebP格式图片，它通常比JPEG和PNG格式更小，加载更快。
7. 使用字体图标或SVG代替图片： 字体图标和SVG图像通常比位图图像更小，同时可以在不失真的情况下进行缩放。
8. **虚拟列表:**避免大数据量导致 DOM 操作量大。
9. 优化图片： 使用适当的图片格式（如WebP），调整图片质量和大小，使用响应式图片来适应不同屏幕尺寸，以减少图片加载时间。
10. 图片懒加载： 对于长页面或带有大量图片的页面，可以使用图片懒加载技术，只在图片进入视口时加载。
11. **视频延迟加载：**正常情况下加载视频，使用的是<video>标签，那么对于一些需要由用户自己播放的视频，最好指定<video>标签的preload属性为none，这样浏览器就不会预加载任何视频数据。为了占用空间，可以使用poster属性为<video>占位。
12. 优化路由： 比如路由组件异步加载。对于单页应用，优化路由可以减少不必要的加载和渲染。
13. 使用内联样式： 对于页面上仅需要一次性使用的样式，可以考虑使用内联样式而不是外部CSS文件，减少额外的HTTP请求。
14. 服务端渲染（SSR）和预渲染： 对于某些应用场景，使用服务器端渲染或预渲染可以提前生成部分或全部页面内容，改善初始加载性能。
15. 使用CDN： 使用内容分发网络（CDN）来分发静态资源，这可以减少网络延迟，加快资源加载速度。
16. 减少HTTP请求： 合并和压缩CSS、JavaScript文件，使用CSS Sprites或图标字体来减少图片请求，以及避免不必要的资源加载，从而减少页面加载时间。
17. 使用浏览器缓存： 设置适当的缓存头，以便浏览器可以在下次访问时从缓存中加载资源，减少重复的网络请求。
18. 延迟加载： 将页面上不必要的内容延迟加载，如将图片、广告或其他不紧急的资源推迟加载，从而加快初始页面加载。
19. 使用异步加载： 使用异步加载（例如async和defer属性）加载JavaScript，确保脚本不会阻塞页面的解析和渲染过程。
20. 使用网络预取和预加载： 使用和来在空闲时间预取和预加载将来可能需要的资源。【使用 prefetch 策略，在 html 文件中添加需要 prefetch 的资源，等到浏览器空闲的时候去提前加载资源，让 dev server 提前对请求文件做 transform。这样等切换到某个页面，真正需要获取相关资源时，可以快速 get。】
21. 最小化DOM操作： 减少对DOM的频繁操作，因为DOM操作通常会触发重排和重绘，影响页面性能。可以使用批量更新或虚拟DOM来优化。避免在循环中重复查询DOM元素，可以将查询结果缓存起来以提高性能。尽量保持浅层次的DOM结构，减少DOM元素的嵌套，从而提高渲染性能。
22. 减少重排和重绘： 避免频繁的样式更改，可以通过合并更改、使用CSS动画代替JavaScript动画等方式减少浏览器的布局和绘制操作。
23. 使用CSS Grid和Flexbox布局： 使用现代的布局技术，如CSS Grid和Flexbox，可以更轻松地创建复杂布局，减少额外的DOM元素。
24. 尽量减少使用JavaScript： 尽量使用HTML和CSS来实现一些效果，避免过多的JavaScript操作，从而减少性能开销。
25. 性能监测和分析： 使用工具如Google PageSpeed Insights、Lighthouse、WebPageTest等来监测和分析页面性能，并根据建议进行优化。
26. 防抖与节流： 对于一些频繁的操作使用防抖或节流。
27. 缓存： vue中频繁切换的组件使用KeepAlive进行缓存。react中比如memo，useMemo、useCallback等
28. **取消重复请求：**同一个接口多次请求时取消上一次没有完成的请求。
29. **loading加载：**对于一些确实比较慢的接口使用loading或骨架屏.最直接的实现方案就是直接绘制出一张骨架屏的图片，在资源加载完毕之后，页面内容直接替换这张图片即可。由于base64格式的图片可以直接插入到HTML中，并且可以节约一次HTTP请求，所以，可以把骨架屏的静态图片直接转化为base64格式并插入到HTML文件中。只要监听onLoad事件，当完成之后，将图片替换掉即可。如果需要给多个页面添加骨架图，那么就需要绘制多个骨架图，这样就比较麻烦。不过，现在已经有以下比较成熟的解决方案，目前使用比较广泛的是 page-skeleton-webpack-plugin插件，该插件是一个webpack插件，可以根据具体的页面生成对应的骨架屏，使用起来非常方便。除此之外，Ant Design也提供了骨架屏的方案：Skeleton骨架屏
30. **卸载与取消：**组件卸载时取消事件的监听、取消组件中的定时器、销毁一些三方库的实例。
31. **捕获错误：**使用错误边界，suspend，Ts等捕获错误。

### 3.4 浏览器

**浏览器渲染**

​		当浏览器的网络线程收到 HTML 文档后，会产生一个渲染任务，并将其传递给渲染主线程的消息队列。在事件循环机制的作用下，渲染主线程取出消息队列中的渲染任务，开启渲染流程。整个渲染流程分为多个阶段，分别是: HTML 解析、样式计算、布局、分层、绘制、分块、光栅化、像素化每个阶段都有明确的输入输出，上一个阶段的输出会成为下一个阶段的输入。这样，整个渲染流程就形成了一套组织严密的生产流水线。

- 渲染的第一步是解析HTML。

​		解析过程中遇到 CSS 解析 CSS，遇到 JS 执行 JS。为了提高解析效率，浏览器在开始解析前，会启动一个预解析的线程，率先下载HTML 中的外部CSS文件和外部的JS文件。如果主线程解析到  link 位置，此时外部的 CSS 文件还没有下载解析好，**主线程不会等待**，继续解析后续的HTML。这是因为下载和解析 CSS的工作是在预解析线程中进行的，因此CSS 不会阻塞 HTML 解析。

​		如果主线程解析到 script 位置，会停止解析 HTML，转而等待 JS文件下载好、并将全局代码解析执行完成。这是因为 JS 代码的执行过程可能会修改当前的 DOM 树，所以 DOM 树的生成必须暂停。这就是JS会阻塞HTML 解析的根本原因。第一步完成后，会得到 DOM 树和 CSSOM 树，浏览器的默认样式、内部样式、外部样式、行内样式均会包含在CSSOM 树中。

- 渲染的下一步是样式计算

​		主线程会遍历得到的 DOM 树，依次为树中的每个节点计算出它最终的样式，称之为 Computed Style.在这一过程中，很多预设值会变成绝对值，比如 red 会变成 rgb(255,0,0);相对单位会变成绝对单位，比如em会变成px。

- 接下来是布局，布局完成后会得到布局树。

​		布局阶段会依次遍历 DOM 树的每一个节点，计算每个节点的几何信息。例如节点的宽高、相对包含块的位置。大部分时候，DOM树和布局树并非一一对应，比如display:none 的节点没有几何信息，因此不会生成到布局树，又比如使用了伪元素选择器，虽然DON树中不存在这些伪元素节点，但它们拥有几何信息，所以会生成到布局树中。还有匿名行盒、匿名块盒等等都会导致DOM树和布局树无法一一对应。

- 下一步是分层

​		主线程会使用一套复杂的策略对整个布局树中进行分层。分层的好处在于，将来某一个层改变后，仅会对该层进行后续处理，从而提升效率。滚动条、堆叠上下文（z-index、transform、opacity ）等样式都会或多或少的影响分层结果，也可以通过 will-change属性更大程度的影响分层结果。

- 再下一步是绘制

​		主线程会为每个层单独产生绘制指令集，用于描述这一层的内容该如何画出来。完成绘制后，主线程将每个图层的绘制信息提交给合成线程，剩余工作将由合成线程完成。合成线程首先对每个图层进行分块，将其划分为更多的小区域。

- 分块完成后，进入光栅化阶段。

​		合成线程会将块信息交给 GPU 进程，以极高的速度完成光栅化。GPU进程会开启多个线程来完成光栅化，并且优先处理靠近视口区域的块。光栅化的结果，就是一块一块的位图。

- 最后一个阶段就是画了

​		合成线程拿到每个层、每个块的位图后，生成一个个指引(quad)，信息指引会标识出每个位图应该画到屏幕的哪个位置，以及会考虑到旋转、缩放等变形变形发生在合成线程，与渲染主线程无关，这就是 transform 效率高的本质原因。合成线程会把 quad 提交给 GPU 进程，由 GPU 进程产生系统调用，提交给 GPU 硬件，完成最终的屏幕成像。

**浏览器进程**

​		浏览器，是一种多进程的架构设计，在浏览器中打开一个网页相当于新起了一个进程，当然，浏览器也有它自己的优化机制，比方说有五个空白页，这五个空白页会合并成同一个进程。主要包含一下四种进程：

1. 浏览器进程控制chrome的地址栏，书签栏，返回和前进按钮，同时还有浏览器的不可见部分，例如网络请求和文件访问主要负责界面显示、用户交互、子进程管理等。浏览器进程内部会启动多个线程处理不同的任务。
2. 网络进程负责加载网络资源。网络进程内部会启动多个线程来处理不同的网络任务。
3. 渲染进程负责界面渲染，脚本执行，事件处理等。渲染进程启动后，会开启一个渲染主线程，主线程负责执行 HTML、CSS、JS 代码。默认情况下，浏览器会为每个标签页开启一个新的渲染进程，以保证不同的标签页之间不相互影响。
4. 第三方插件进程每种插件一个进程，插件运行时才会创建
5. GPU进程仅此一个 ，用于3D绘制等

**多进程的优势**

1. 避免单个页面崩溃造成整个浏览器的卡顿（由于每一个 Tab页 都是独立的进程）
2. 避免第三方插件崩溃影响整个浏览器（由于第三方插件是独立的进程）
3. 多进程充分利用多核优势（现在的 CPU 性能都很高

**多线程的浏览器内核**

1. GUI渲染线程 负责渲染浏览器界面（解析 HTML ，CSS，构建 DOM树 CSSOM树 和 Render树 ，布局和绘制等）。 GUI 更新会被保存在一个队列中等到 JS 引擎空闲时立即被执行，当界面需要重绘或由于某种操作引发的重排时，该线程就会执行。 GUI 渲染线程与 JS 引擎线程是互斥的，这也是造成 JS堵塞 的原因所在。 由于 JavaScript 是可操纵 DOM 的，如果在修改这些元素属性同时渲染界面（即 JS 引擎线程和 GUI 渲染线程同时运行），那么渲染线程前后获得的元素数据就可能不一致了。 因此为了防止渲染出现不可预期的结果，浏览器设置 GUI 渲染线程与 JavaScript 引擎为互斥的关系，当 JavaScript 引擎执行时 GUI 线程会被挂起，GUI 更新会被保存在一个队列中等到引擎线程空闲时立即被执行。 如果想了解有关于 CSS 和 JS 的堵塞问题，可以查阅 面试中常问到的CSS堵塞和JS堵塞
2. JS引擎线程 也称为 JS 内核，负责处理 JavaScript 脚本程序。 JS引擎一直等待着任务队列中任务的到来，然后加以处理，一个Tab页中无论什么时候都只有一个JS线程在运行JS程序（我们早在之前说过了，JS是一门单线程的语言。至于原因可以查阅 单线程的JS 再次注意，GUI 渲染线程与 JS 引擎线程是互斥的 ，所以，如果JS执行的时间过长，这样就会造成页面的渲染不连贯，导致页面渲染加载阻塞。
3. 事件触发线程 首先这属于浏览器而不是JS引擎，主要用来控制事件循环（可以理解，JS引擎自己都忙不过来，需要浏览器另开线程协助） 当JS引擎执行代码块如setTimeOut时（也可来自浏览器内核的其他线程,如鼠标点击、AJAX异步请求等），会将对应任务添加到事件线程中。 当对应的事件符合触发条件被触发时，该线程会把是事件添加到待处理队列（宏任务）的队尾，等待JS引擎的处理。 同样地，由于 JS 是单线程的，所以需要等到 JS 引擎空闲了之后，才会对待处理队列进行处理。
4. 定时触发器线程 传说中的 setInterval 与 setTimeout 所在线程。 因为JavaScript引擎是单线程的, 如果处于阻塞线程状态就会影响记计时的准确。 因此通过单独线程来计时并触发定时，计时完毕后，添加到事件队列（宏任务）中，等待JS引擎空闲后执行。 不禁感叹，懂得 JS 的单线程 原来那么有用。 需要值得注意的是，W3C 在 HTML 标准中规定，规定要求 setTimeout 中低于4ms的时间间隔算为4ms。
5. 异步http请求线程 XMLHttpRequest 在连接后是通过浏览器新开的一个线程请求。 当检测到状态更新时，如果没有设置回调函数，异步线程就产生状态变更事件，将这个回调再放入事件队列（微任务）中，等待 JS 引擎执行。

## (四)  scoped | Module

1） scoped属性

​		使用css的scoped属性，表明它的css样式只作用于当前的页面，如果每一个页面的style都加上了scoped，那就相当于实现了样式的私有模块化。

2） css in js

​		css in js 就像react的jsx语法一样，用js来写css。在react中呢，你可以顶一个一个对象，里面有很多你需要的样式。然后利用react的style，传对应的style对象进去。

```js
const styles = {
	bar: {
		backgroundColor: 'black'
	}
}
const example = () => {
	<div style = {style.bar} />
}
```

3）CSS Modules

​		CSS Modules 并不是 CSS 官方的标准，也不是浏览器的特性，而是通过构建工具（比如 webpack）的帮助，将 class的名字或者选择器的名字生成一个独一无二的命名，从而实现作用域的隔离（类似命名空间化）。

1、解决了命名冲突和全局样式污染问题（因为CSS Modules只关注于组件本身，只要保证组件本身命名不冲突，就不会有这样的问题）2、解决css选择器嵌套过深问题（因为CSS Modules只关注于组件本身，组件本身基本都可以使用扁平的类名来写）3、样式模块化（一个css文件就是一个独立的模块）

css-loader默认class命名的哈希算法是[hash:base64]，默认的class名可辨识度不高，我们可以开启自定义类名。webpack.config.js里面可以定制哈希字符串的格式，css-loader提供了一个localIdentName参数，同时我们还可以利用这四个参数path、name、local和hash，四个参数的含义依次是：当前css、less或sass的文件路径，引入的模块名，局部作用域的类名，独一无二的hash值。

1、作用域CSS Modules分局部作用域和全局作用域。两者的区分是通过:local() 与:global()来设定的。因为CSS Module默认的是局部作用域，所以 :local()默认省略。CSS Modules 使用:global(.className)的语法，声明一个全局规则。凡是这样声明的class，都不会被编译成哈希字符串，使用全局样式时直接赋值给class就行了，不需要进行类绑定。

2、CSS Module可以将两个选择器的样式组合在一起。也就是说，一个选择器可以继承另一个选择器的样式，通过composes来实现。

3、使用 @value 来定义变量

## (五) UI

### 4.1 Echarts

​		整个ECharts库都是以canvas为基础的！canvas是一个可以在页面上固定的画图区域建立坐标系，然后通过JavaScript脚本在坐标系中绘制圆、盒、文字等。ECharts 5使用Svg渲染代替canvas解决虚化问题。

​		ECharts中的组件包括xAxis（直角坐标系 X 轴）、yAxis（直角坐标系 Y 轴）、grid（直角坐标系底板）、angleAxis（极坐标系角度轴）、radiusAxis（极坐标系半径轴）、polar（极坐标系底板）、geo（地理坐标系）、dataZoom（数据区缩放组件，默认情况下控制 x 轴，即对 x 轴进行数据窗口缩放和数据窗口平移操作。）、visualMap（视觉映射组件）、tooltip（提示框组件）、toolbox（工具栏组件）、series（系列）。

Echarts 框架原理：   数据可视化框架原理：

​		ECharts 是一个轻量级的 javascript 图形库， 纯 js 实现， mvc 框架， 数据驱动。

​		Svg 和 Canvas 是两个可以选择的类库之一，其中 svg 交互性更好，性能较弱，不适用于移动端，在绘制数万个点时会崩溃。而 canvas 的渲染速度和性能更好，echarts 在 canvas 上构建一层 MVC层，使得它可以像 svg 一样交互。

​		ECharts 的特点：重要性和优先级依次递减，设计效果直观、生动，能够交互，可个性化定制。

​		ECharts 总体结构是基于 MVC 架构的，各部分的主要作用是：				Storage(M)：模型层，实现图形数据的CURD（增删改查）管理；				Painter(V)：  视图层，实现canvas 元素的生命周期管理，即：视图渲染、更新控制、绘图；				Handler(C)：控制层，事件交互处理，实现完整的dom事件模拟封装。

**SVG和Canvas：**

Canvas通过 js 来绘制 2D图形。canvas 图像单位是像素。canvas 图像绘制完毕之后，浏览器将不再关注它，如果位置发生变换，就需要重新绘制。

svg 使用 XML 描述的2D图像。svg 是基于 xml 的，所以 svg 中绘制图形还是使用的元素，js 给元素任意添加事件。svg 绘制的图像是一个对象，如果对象的属性发生改变，浏览器将重新绘制图形。

​		svg即可缩放矢量图形，什么是矢量图形呢，也就是放大或者缩小不会失真的图形。 svg绘图时，每个图形都是以DOM节点的形式插入到页面中的，我们可以通过js来直接操作这些图形

- canvas绘画出来的图形一般成为位图，也就是放大缩小的情况下会出现失真的情况，svg绘制的图形是矢量图，不存在失真的情况
- canvas绘制的图形不会出现在DOM结构中，svg绘制的会存在于DOM结构
- canvas类似于动画，每次图形的改变都是先清除原来的图形，然后把新的图形画上去，svg则是可以直接通过js来进行某些操作
- canvas依赖于分辨率，svg不依赖分辨率
- canvas最适合图像密集型的游戏，其中的许多对象会被频繁重绘，svg不适合游戏应用

### 4.2 Sass Less

**Sass**

Sass 是一个 CSS 预处理器。Sass 扩展了 CSS3，增加了规则、变量$、混入、选择器、继承、内置函数等等特性。

1）支持嵌套

2）类似 CSS，Sass 支持 @import 指令。CSS @import 指令在每次调用时，都会创建一个额外的 HTTP 请求。但，Sass @import 指令将文件包含在 CSS 中，不需要额外的 HTTP 请求。

3） @mixin 指令允许我们定义一个可以在整个样式表中重复使用的样式。@include 指令可以将混入（mixin）引入到文档中。

4）支持继承@extend

**Less**

Less （Leaner Style Sheets 的缩写） 是一门向后兼容的 CSS 扩展语言。

1） 支持嵌套、混合和变量@

2） 支持@规则（@ 规则会被放在前面，同一规则集中的其它元素的相对顺序保持不变。这叫做冒泡（bubbling）

区别：

Sass是在服务端上面处理的，之前是Ruby,现在是Dart-Sass或者是Node-Sass，但是Less在编译时，需要引入less.js来处理Less代码输出CSS到浏览器上，也可以在开发服务器上将Less语法编译成css文件，输出CSS文件到生产包目录，也有在线编译地址。

### 4.5 ElementUI

**1.原理**

​		ElementUI基于vue+scss实现。

​		我们在调用Vue.use(ElementUI)注册时，本质上就是调用这个install函数。如果插件没有被注册过，那么注册成功之后会给插件添加一个installed的属性值为true，从而避免重复注册插件。通过对组件使用forEach方法，将所有的组件进行注册。

​		内部的组件以渲染函数的方式编写，el-container使用模板编写。

​		通过 row 和 col 组件，并通过 col 组件的 span 属性我们就可以自由地组合布局。

​		用于布局的容器组件，方便快速搭建页面的基本结构 <el-container>：外层容器。当子元素中包含 <el-header> 或 <el-footer> 时，全部子元素会垂直上下排列，否则会水平左右排列。以上组件采用了 flex 布局。

参考：

https://blog.csdn.net/flow_camphor/article/details/121596900

**2.table在大数据场景下**

elementUI 是vue2技术栈的常用ui组件，但是如果要在elementUI中渲染大量数据，会带来卡顿问题，原因是el-table组件会渲染所有数据成dom节点，过多的dom节点带来的性能开销导致卡顿。

为了解决这个问题，我们可以让表格只渲染当前可以看到的数据，其它数据等滚动到界面的时候再渲染。elementUI升级成Plus后对这个进行了优化。

**常见组件:**

1  Container 布局容器用于布局的容器组件，方便快速搭建页面的基本结构：

- <el‐container>：外层容器。当子元素中包含 <el‐header> 或 <el‐footer> 时，全部子元素会垂直上下排列，否则会水平左右排列
- <el‐header>：顶栏容器
- <el‐aside>：侧边栏容器
- <el‐main>：主要区域容器
- <el‐footer>：底栏容器

2 Dropdown 下拉菜单

- <el-dropdown split-butto>:下拉按钮
- <el-dropdown-menu>下拉菜单
- <el-dropdown-item>下拉项 divided分隔

3 <el-menu>:导航菜单

4	表单

- <el-table :data="tableData" stripe>:表格\数据绑定对象\样式
- <el-table-column prop="date" label="日期">:表格行\数据绑定对象属性\表头align="center":居中
- slot-scope：作用域插槽，可以获取表格数据
- scope：代表表格数据，可以通过scope.row来获取表格当前行数据，scope不是固定写法

5 `<el-pagination>`分页

- `@current-change="handleCurrentChange"`内置的事件，当前页码改变时会触发，可以获取到改变之后的页码

### 4.6 Antd

### 4.7 H5

- <title>：页面主体内容。
- <header>：页眉通常包括网站标志、主导航、全站链接以及搜索框。
- <nav>：标记导航，仅对文档中重要的链接群使用。
- <footer>：页脚，只有当父级是body时，才是整个页面的页脚。
- <figure>：规定独立的流内容（图像、图表、照片、代码等等）（默认有40px左右margin）。
- <small>：呈现小号字体效果，指定细则，输入免责声明、注解、署名、版权。
- <meta>:  元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。

### 4.8 cssInJs

**优势**

1. 局部作用域样式。使用 Pure CSS 时，容易让样式运用过于宽泛。
2. 同位（Colocation）：如果使用 Pure CSS,可能会把所有`.css`文件放在`src/styles`目录，而 React 组件放在`src/components`目录。随着应用规模增长，很难知道每个组件使用了哪些样式。由于没有简单的方式判断样式是否在使用，CSS 中常会残留未使用的死代码。
3. 可以在样式中使用 JavaScript 变量。

**劣势**

CSS-in-JS 增加了运行时开销。当组件渲染时，CSS-in-JS 库必须将样式“序列化”为可以插入文档的 Pure CSS。显然这需要额外的 CPU 消耗。

CSS-in-JS 增加了包体积。这很明显——每个访问你网站的用户现在都需要下载 CSS-in-JS 库的 JavaScript。Emotion 是7.9 kB[6]压缩后，styled-components 是12.7 kB[7]。所以这两个库都不大，但加起来还是有影响。

CSS-in-JS 弄乱了 React 开发者工具。对于每个使用`css` prop 的元素，Emotion 会渲染`<EmotionCssPropInternal>`和`<Insertion>`组件。如果在许多元素上使用`css` prop,Emotion 的内部组件会让 React 开发者工具很乱。

在并发渲染中，React 可以在渲染之间让出线程给浏览器。如果你在一个组件中插入新的 CSS,然后 React 让出线程，浏览器必须检查这些 CSS 是否适用于现有的树。所以它重新计算样式规则。然后 React 渲染下一个组件，然后那个组件发现新 CSS,过程再次发生。**这在 React 渲染时的每帧中都引发 DOM 节点对于 CSS 规则的重新计算，非常昂贵**

## (六) Demo

### 6.1 滑动穿透

方法一：position:fixed

​			在弹窗打开时，将body元素进行固定，在关闭时恢复。由于定位会改变元素在页面上的位置，所以需要再`fixed`前记录元素的位置。取消`fixed`之后将元素又滚动到原来的位置。

​	方法二：overflow:hidden

​			禁用页面滚动条，缺点不一定知道页面的滚动区。IOS用这个效果不错。

​	方法三：

​		内容区可以滚动到顶或到底的话继续滑动还是会出现滑动穿透的，我们可以通过overscroll-behavior：contain；默认的滚动边界行为不变（“触底”效果或者刷新），但是临近的滚动区域不会被滚动链影响到，比如对话框后方的页面不会滚动。

参考：

https://juejin.cn/post/7161348914094800933#heading-2

https://juejin.cn/post/7056371892374110222

### 6.2 固定导航栏

```css
qi*{margin: 0;padding: 0;}
.nav{
    height: 100px;
    width: 100%;
    background: black;
    position: fixed;
    top: 0;
}
.content{
    height: 1400px;
    background: orange;
    margin-top: 100px;
}
```

### 6.3 两栏布局

//两栏布局（左侧宽度固定，右侧自适应）

```
a<div class="left">
    <h1>Left Side</h1>
    <p>我是左侧栏</p>
</div>
<div class="right">
    <h1>Right Side</h1>
    <p>我是右侧栏</p>
</div>
```

方法一：float+margin-left（要给高度）

```js
*{
    /*清除默认格式*/
    margin:0;
    padding:0；
}
.left{
    width:200px;
    background-color:red;
    float:left;
}
.right{
    background-color:green;
    margin-left:200px;//等于左边栏的宽度
}
```

方法二：absolute+margin-left

方法三：float+BFC，给右侧元素设置overflow:hidden

方法四：flex布局

```css
*{
    /*清除默认格式*/
    margin:0;
    padding:0;
}
.box{
    display:flex;
}
.box1{

}
.box2{
    flex:1;
}
```

参考：

- CSS-两栏布局六种实现方式  https://juejin.cn/post/6844904003248062472

​		**三栏布局：**

1.浮动

```css
    <style>
      .left {
        float: left;
        width: 100px; height: 200px;background-color: red;
      }
    
      .right {
        float: right;
        width: 100px;height: 200px;background-color: yellow;
      }
    
      .main {
        background-color: green; height: 200px;
        margin-left: 120px; margin-right: 120px;
      }
    
      .container {
        border: 1px solid black;
      }
      <div class="container">
      <div class="left"></div>
      <div class="right"></div>
      <div class="main"></div>
      </div>
  我们知道对于float元素，其会脱离文档流，其他盒子也会无视这个元素。（但其他盒子内的文本依然会为这个元素让出位置，环绕在周围。）所以此时只需在container容器内添加一个正常的div，其会无视left和right，撑满整个container，只需再加上margin为left right流出空间即可：劣势：中间部分最后加载，内容较多时影响体验
```

2.BFC:  不会和浮动元素重叠。所以将上述main元素设定为BFC元素即可：

3.圣杯布局：（淘宝用的）左、中、右三栏都通过`float`进行浮动，然后通过负值margin进行调整。

```css
.main {
            float: left;width: 100%;height: 200px;background-color: blue;
        }
<body>
	<div class="container">
		<div class="main"></div>
		<div class="left"></div>
		<div class="right"></div>
	</div>
</body>
  //此时看到的效果是：左、右两栏被挤到第二行。这是因为main的宽度为100%。接下来我们通过调整左、右两栏的margin来将左、中、右放在一行中：
//第二步，将left的margin-left设置为-100%，此时左栏会移动到第一行的首部。然后再将right的margin-left设置为其宽度的负值：-100px，则右栏也会移动到和左、中栏一行中：
//第三步，由于文字会被压住，给container一个padding，该padding应该正好等于左、右栏的宽度：然后给左、右两栏加上相对布局，然后再通过设置left和right值向外移动：
   .left {
            float: left;
            width: 100px;
            height: 200px;
            margin-left: -100%;
            position: relative;
            left: -100px;
            background-color: red;
        }

        .right {
            float: left;
            width: 100px;
            height: 200px;
            margin-left: -100px;
            position: relative;
            right: -100px;
            background-color: yellow;
        }
        .container {
            padding-left: 100px;
            padding-right: 100px;
        }
```

4.flex布局

```css
main要首先加载就必须写在第一位，但因为left需要显示在最左侧，所以需要设置left的order为-1
flex属性的完整写法是：flex: flex-grow flex-shrink flex-basis 。这也是flex实现三栏布局的核心，main设置flex-grow为1，说明多余空间全部给main，而空间不够时，仅缩小left right部分，同时因为指定了left right部分的flex-basis，所以指定了两者的宽度，保证其显示效果

<style type="text/css">
            .container {
                display: flex;
                flex-direction: row;
            }
            .middle {
                height: 200px;
                background-color: red;
                flex-grow: 1;
            }

            .left {
                height: 200px;
                order: -1;
                margin-right: 20px;
                background-color: yellow;
                flex: 0 1 200px;
            }

            .right {
                height: 200px;
                margin-left: 20px;
                background-color: green;
                flex: 0 1 200px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="middle">fsjsdlfjsldjfklsjdkflj</div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>
```

5.绝对定位

```css
<style type="text/css">
            .container {
            }
            .middle {
                position: absolute;
                left: 200px;
                right: 200px;
                height: 300px;
                background-color: yellow;
            }

            .left {
                position: absolute;
                left: 0px;
                width: 200px;
                height: 300px;
                background-color: red;
            }

            .right {
                position: absolute;
                right: 0px;
                width: 200px;
                background-color: green;
                height: 300px;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="middle">fsdfjksdjflkasjskjdkflj</div>
            <div class="left"></div>
            <div class="right"></div>
        </div>
    </body>
```

6.gird布局

```css
grid-template-columns：100px auto 100px
```

参考：

https://www.jianshu.com/p/8b308d63fe23

### 6.4 0.5px的线

1 采用transform: scale()的方式，该方法用来定义元素的2D 缩放转换：

```css
    height: 1px;
    transform: scaleY(0.5);
    transform-origin: 50% 100%; //bottom | bottom center | center bottom 
}
```

2 使用boxshadow

```css
.hr.boxshadow {
    height: 1px;
    background: none;
    box-shadow: 0 0.5px 0 #000;
}
```

### 6.5 截断文本

```css
// 单行文本
div {
  width: 100px; //单行最多展示字数
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
//多行文本溢出截断
p {
  width: 400px;
  text-overflow: ellipsis; //用省略号“…”隐藏超出
  display: -webkit-box; //将对象作为弹性伸缩盒子模型显示。
  overflow: hidden;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-align: justify;
}
//缺点：因为该属性是 webkit 的私有属性，所以只有 webkit 内核的浏览器才支持这个属性，像 Firefox，IE 等浏览器就无法支持该特性了。
<div class='demo'><div class="text">这是一段很长的文本</div></div>	
.demo {
    background: #099;
    max-height: 40px;
    line-height: 20px;
    overflow: hidden;}
.demo::before{
    float: left;
    content:'';
    width: 20px;
    height: 40px;}
.demo .text {
    float: right;
    width: 100%;
    margin-left: -20px;
    word-break: break-all;}
.demo::after{
    float:right;
    content:'...';
    width: 20px;
    height: 20px;
    position: relative;
    background: white;
    left:100%;
    transform: translate(-100%,-100%);}
//当文本内容高度小于或等于容器高度时，::after 会出现在 文本的下方最右边；当文本内容高度大于容器高度（即发生截断）时，::before 和文本内容出现高度高度差，形成了左下方的凹陷，::after 会出现这个 左下角。当位于左下角时，我们只需要将 ::after 向右偏移 容器宽度-自身宽度 的距离，再像上移动 自身高度 的位置，即可抵达文本容器的右下角。如果文本没有溢出，应用了偏移操作的 ::after 也会跑出文本容器，不会影响样式效果。
//缺点：只对定高有效，因为 ::before 无法设置 max-height，
//可以使用 ViewUI Pro
```

### 6.6 禁止复制

```css
p{
 user-select: none;
}
// 禁止右键菜单
document.oncontextmenu = function(){ return false; };
// 禁止文字选择
document.onselectstart = function(){ return false; };
// 禁止复制
document.oncopy = function(){ return false; };
// 禁止剪切
document.oncut = function(){ return false; };
body {
  -moz-user-select:none; /* Firefox私有属性 */
  -webkit-user-select:none; /* WebKit内核私有属性 */
  -ms-user-select:none; /* IE私有属性(IE10及以后) */
  -khtml-user-select:none; /* KHTML内核私有属性 */
  -o-user-select:none; /* Opera私有属性 */
  user-select:none; /* CSS3属性 */
}
使用canvas进行mask，百度文库
```

### 6.7 图片优化

1）图片压缩

​	1. 使用canvas。原理：

- 先将图片的file文件转成baseURL
- 创建一个image标签去接收文件获取图片的宽高和比例。
- 创建canvas画布设置画布的大小。
- 将图片绘制到canvas上面。
- 对canvas进行压缩处理，获得新的baseURL
- 将baseURL转化回文件。

​	2.webpack 插件 `image-webpack-loader` 压缩

2）图片懒加载

​		对于图片比较多的页面，仅展示可视窗口内的图片，其他的等滚动到可视窗口再加载；

​		图片轮播组件也可以使用懒加载

​		懒加载方案：图片地址存放 img 标签的某个属性上，例如`data-src`，当图片再可视窗口范围内时，将 `src` 属性替换成图片地址`data-src`的值。

3）精灵图

4）使用CDN，直接放在服务器上，降低访问延时

### 6.8 三角形

**1 border**

设置div宽高为0，其中一个border-top 50px ，剩余三个为transparent。

**2 linear-gradient**

```css
div {
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, deeppink, deeppink 50%, transparent 50%, transparent 100%);
}
```

**3 transform**

```css
.triangle {
    width: 141px;
    height: 100px;
    position: relative;
    overflow: hidden;
    
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: deeppink;
        transform-origin: left bottom;
        transform: rotate(45deg);
    }
}
```

**直角梯形**

```css
.ti {
height:100px;
width:100px;
border:0px solid transparent;
border-top:60px solid #000;
border-left:50px solid transparent;
        }
```

### 6.9 1px 像素

如何解决移动端 Retina 屏 1px 像素问题

```
1. 伪元素 + transform scaleY(.5)
2. svg 它的 1px 对应的物理像素就是 1px
3. viewport + rem  通过设置缩放，让 CSS 像素等于真正的物理像素。
4. box-shadow
```

### 6.10 z-index

Z-index的运用是需要条件的,与其相关的属性就是position属性和 flex。

当三个div的position都为relative/absolute/fixed时,发现Z-index生效，非 `static` 。

CSS **`z-index`** 属性设置定位元素及其后代元素或 flex 项目的 Z 轴顺序。z-index 较大的重叠元素会覆盖较小的元素。

1. 当Z-index的值设置为auto时,不建立新的堆叠上下文,当前堆叠上下文中生成的div的堆叠级别与其父项的框相同。
2. 当Z-index的值设置为一个整数时,该整数是当前堆叠上下文中生成的div的堆栈级别。该框还建立了其堆栈级别的本地堆叠上下文。这意味着后代的z-index不与此元素之外的元素的z-index进行比较。

ps: 通俗讲就是,当一个div的Z-index为整数时,**它的子元素和外界元素进行比较时**,采用父元素的Z-index进行比较, 和兄弟元素比较采用自身的Z-index。当一个div的Z-index为auto时,如果它和它的兄弟进行比较,采用它父元素的Z-index。

### CSS其他

[「2022」CSS最新高频面试题指南 - 掘金 (juejin.cn)](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fjuejin.cn%2Fpost%2F7150840051453149197%23heading-2)

[#前端#]()[#前端面经#]()[#春招#]()[#秋招#]()



作者：夏目又三
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网