# 理论篇

## 1. box-sizing 属性值有什么作用？

**用来控制元素的盒子模型的解析模式**，默认为content-box

- `context-box`：W3C 的标准盒子模型，设置元素的 height/width 属性指的是 content 部分的高/宽
- `border-box`：IE 传统盒子模型。设置元素的 height/width 属性指的是 border + padding + content部分的高/宽

## 2. absolute 绝对定位，是相对于谁的定位？

CSS position属性用于指定一个元素在文档中的定位方式。

absolute 的元素会被移出正常文档流，并不为元素预留空间，通过指定元素相对于最近的**非 static 定位祖先元素**进行定位，确定元素位置。绝对定位的元素可以设置外边距，且不会与其他边距合并。

## 3. 行内元素和块级元素有什么区别？

行内元素：**一个行内元素只占据它对应标签的边框所包含的空间。**

块级元素：**块级元素占据其父元素（容器）的整个空间，因此创建了一个“块”。**

区别：

- **是否另起一行**：认情况下，行内元素不会以新的一行开始，而块级元素会新起一行。
- **是否可设置宽高**：块级元素可以设置 width, height属性，注意：块级元素即使设置了宽度，仍然是独占一行的。 而行内元素设置 width, height 无效。
- **是否可设置内外边距**：块级元素都可，行内元素的水平方向的 padding-left/right, margin-left/right 都产生边距效果，但是竖直方向的 padding-top/bottom, margin-top/bottom 都不会产生边距效果。（也就是水平方向有效，竖直方向无效）
- **是否包含对方**：块级元素可以包含行内元素和块级元素。行内元素不能包含块级元素

## 4. 常见的行内元素和块级元素有哪些？

1、常见的行内元素

```
<span>、<a>、<lable>、<strong>、<b>、<small>、<abbr>、<button>、<input>、<textarea>、<select>、<img>
```

2、常见的块级元素

```js
<div>、<p>、<li>、<h1> ~ <h6>、<form>、<header>、<hr>、<ol>、<ul>、<article>、<aside>、<dd>、<dl>
```

## 5. 如何检测浏览器所支持的最小字体大小？

可以使用 JS 设置 DOM 的字体为某一个值，然后再取出来，如果值设置成功，就说明支持。

## 6. CSS中的 "flex:1;" 是什么意思？

flex 是 flex-grow, flex-shrink 和 flex-basis的简写。

除了auto (1 1 auto) 和 none (0 0 auto)这两个快捷值外，还有以下设置方式：

- 当 flex 取值为一个非负数字，则该数字为 flex-grow 值，flex-shrink 取 1，flex-basis 取 0%，如下是等同的：

  ```css
  css复制代码.item {flex: 1;}
  .item {
      flex-grow: 1;
      flex-shrink: 1;
      flex-basis: 0%;
  }
  ```

- 当 flex 取值为 0 时，对应的三个值分别为 0 1 0%

  ```css
  css复制代码.item {flex: 0;}
  .item {
      flex-grow: 0;
      flex-shrink: 1;
      flex-basis: 0%;
  }
  ```

更多写法可前往 [MDN-flex](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Flexible_Box_Layout%2FBasic_Concepts_of_Flexbox) 查看

## 7. 什么是 CSS 媒体查询？

媒体查询(Media Queries)早在在css2时代就存在,经过css3的洗礼后变得更加强大bootstrap的响应式特性就是从此而来的.

简单的来讲媒体查询是一种用于修饰css何时起作用的语法.

> 媒体查询的引入，其作用就是允许添加表达式用以确定媒体的环境情况，以此来应用不同的样式表。换句话说，其允许我们在不改变内容的情况下，改变页面的布局以精确适应不同的设备

## 8. 页面导入样式时，使用link和@import有什么区别？

- link属于HTML标签，而@import是css提供的；
- 页面被加载时，link会同时被加载，而@import引用的css会等到页面被加载完再加载；
- link是XHTML标签，无兼容问题，而@import只在IE5以上才能识别；
- link方式的样式的权重高于@import的权重。

## 9. 为什么 CSS 不支持父选择器？

这个问题的答案和“为何CSS相邻兄弟选择器只支持后面的元素，而不支持前面的兄弟元素？”是一样的。

浏览器解析HTML文档，是从前往后，由外及里的。所以，我们时常会看到页面先出现头部然后主体内容再出现的加载情况。

但是，如果CSS支持了父选择器，那就必须要页面所有子元素加载完毕才能渲染HTML文档，因为所谓“父选择器”，就是后代元素影响祖先元素，如果后代元素还没加载处理，如何影响祖先元素的样式？于是，网页渲染呈现速度就会大大减慢，浏览器会出现长时间的白板。总的来说就是CSS和HTML本身的渲染机制决定的。

## 10. margin 和 padding 分别适合什么场景使用？

何时使用margin：

- 需要在border外侧添加空白
- 空白处不需要背景色
- 上下相连的两个盒子之间的空白，需要相互抵消时。

何时使用padding：

- 需要在border内侧添加空白
- 空白处需要背景颜色
- 上下相连的两个盒子的空白，希望为两者之和。

## 11. display 有哪些取值？

常见的如下：

| 值           | 描述                                                         |
| ------------ | ------------------------------------------------------------ |
| none         | 元素不会显示                                                 |
| block        | 此元素将显示为块级元素，此元素前后会带有换行符。             |
| inline       | 默认。此元素会被显示为内联元素，元素前后没有换行符。         |
| inline-block | 行内块元素。可以设置宽高，同行显示。                         |
| inline-table | 此元素会作为内联表格来显示（类似 table），表格前后没有换行符。 |
| table        | 此元素会作为块级表格来显示（类似 table），表格前后带有换行符。 |
| inherit      | 规定应该从父元素继承 display 属性的值。                      |
| grid         | 网格布局（Grid）是最强大的CSS 布局方案。 它将网页划分成一个个网格，可以任意组合不同的网格，做出各种各样的布局。 |
| flex         | 弹性布局，用来为盒状模型提供最大的灵活性。                   |

其他的可以自行查阅：[MDN-display](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2Fdisplay)

## 12. 两个同级的相邻元素之间，有看不见的空白间隔，是什么原因引起的？有什么解决办法？

行框的排列会受到中间空白（回车空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

解决方法：

- 相邻元素代码代码全部写在一排
- 浮动元素，float:left;
- 在父级元素中用font-size:0;

## 13. CSS 中，有哪些方式可以隐藏页面元素？有什么区别？

**display:none**：元素不可见，不占据空间，无法响应点击事件

**visibility:hidden**：元素不可见，占据页面空间，无法响应点击事件

**opacity:0**：改变元素透明度，元素不可见，占据页面空间，可以响应点击事件

**设置height、width属性为0**：将元素的 margin，border，padding，height和width 等影响元素盒模型的属性设置成0，如果元素内有子元素或内容，还应该设置其 overflow:hidden 来隐藏其子元素。特点：元素不可见，不占据页面空间，无法响应点击事件

**position:absolute**： 将元素移出可视区域，元素不可见，不影响页面布局

**clip-path**：通过裁剪的形式，元素不可见，占据页面空间，无法响应点击事件

```css
.hide { clip-path: polygon(0px 0px,0px 0px,0px 0px,0px 0px); }
```

最常用的还是`display:none`和`visibility:hidden`，其他的方式只能认为是奇招，它们的真正用途并不是用于隐藏元素，所以并不推荐使用它们

| #                      | display: none | visibility: hidden | opacity: 0 |
| ---------------------- | ------------- | ------------------ | ---------- |
| 页面中                 | 不存在        | 存在               | 存在       |
| 重排                   | 会            | 不会               | 不会       |
| 重绘                   | 会            | 会                 | 不一定     |
| 自身绑定事件           | 不触发        | 不触发             | 可触发     |
| transition             | 不支持        | 支持               | 支持       |
| 子元素可复原           | 不能          | 能                 | 不能       |
| 被遮挡的元素可触发事件 | 能            | 能                 | 不能       |

## 14. 前端项目为什么要初始化CSS样式？

因为浏览器的兼容问题，不同浏览器对标签的默认值是不同的，如果没有对浏览器的CSS初始化，会造成相同页面在不同浏览器的显示存在差异。

## 15. display:none 与 visibility:hidden 有什么区别？

**表现上**

- display:none 是彻底消失，不在文档流中占位，浏览器也不会解析该元素；
- visibility:hidden 是视觉上消失了，可以理解为透明度为0的效果，在文档流中占位，浏览器会解析该元素；

**性能上**

- 使用 visibility:hidden 比 display:none 性能上要好，display:none 切换显示时，页面产生回流（当页面中的一部分元素需要改变规模尺寸、布局、显示隐藏等，页面重新构建，此时就是回流。所有页面第一次加载时需要产生一次回流），而visibility切换是否显示时则不会引起回流。

## 16. CSS3新增了哪些特性？

**选择器**：通用兄弟选择器、伪类选择器、伪元素选择器、否定选择器、状态伪类选择器

**新样式**：边框、box-shadow、背景、文字、颜色

- 边框：
  - border-radius：创建圆角边框
  - box-shadow：为元素添加阴影
  - border-image：使用图片来绘制边框
- 背景： 新增了几个关于背景的属性，分别是`background-clip`、`background-origin`、`background-size`和`background-break`
- 文字：word-wrap、text-overflow、text-shadow、text-decoration

**过渡**：transition

**转换**：transform

**动画**：animation

**其他**：渐变、`flex`弹性布局、`Grid`栅格布局、媒体查询、混合模式等等...

## 17. 什么是硬件加速？

- 硬件加速就是将浏览器的渲染过程交给GPU处理，而不是使用自带的比较慢的渲染器。这样就可以使得 `animation` 与 `transition` 更加顺畅。
- 我们可以在浏览器中用css开启硬件加速，使GPU (Graphics Processing Unit) 发挥功能，从而提升性能。
- 现在大多数电脑的显卡都支持硬件加速。鉴于此，我们可以发挥GPU的力量，从而使我们的网站或应用表现的更为流畅。

## 18. ::before 和 :after 中双冒号和单冒号有什么区别？解释一下它们的作用？

- 单冒号（:）用于CSS3伪类，一般匹配的是元素的一些特殊状态，如hover、link等，
- 双冒号（::）用于CSS3伪元素（伪元素由双冒号和伪元素名称组成），而伪元素一般匹配的是特殊位置，比如after、before等。
- 在新的CSS3中引入的伪元素不允许再支持旧的单冒号是写法
- 想让插入的内容出现在其它内容前，使用::before，反之使用::after，在代码顺序上，::after生成的内容也比::before生成的内容靠后

## 19. CSS 匹配规则顺序是怎么样的？

相信大多数初学者都会认为CSS匹配是左向右的，其实恰恰相反。

CSS匹配发生在Render Tree构建时（Chrome Dev Tools将其归属于Layout过程）。此时浏览器构建出了DOM，而且拿到了CSS样式，此时要做的就是把样式跟DOM上的节点对应上，浏览器为了提高性能需要做的就是快速匹配。

首先要明确一点，浏览器此时是给一个"可见"节点找对应的规则，这和jQuery选择器不同，后者是使用一个规则去找对应的节点，这样从左到右或许更快。但是对于前者，由于CSS的庞大，一个CSS文件中或许有上千条规则，而且对于当前节点来说，大多数规则是匹配不上的，稍微想一下就知道，如果从右开始匹配（也是从更精确的位置开始），能更快排除不合适的大部分节点，而如果从左开始，只有深入了才会发现匹配失败，如果大部分规则层级都比较深，就比较浪费资源了。

除了上面这点，我们前面还提到DOM构建是"循序渐进的"，而且DOM不阻塞Render Tree构建（只有CSSOM阻塞），这样也是为了能让页面更早有元素呈现。

考虑如下情况，如果我们此时构建的只是部分DOM，而CSSOM构建完成，浏览器就会构建Render Tree。

**这个时候对每一个节点，如果找到一条规则从右向左匹配，我们只需要逐层观察该节点父节点是否匹配，而此时其父节点肯定已经在DOM上。**

但是反过来，我们可能会匹配到一个DOM上尚未存在的节点，此时的匹配过程就浪费了资源。

## 20. CSS 优化、提高性能的方法有哪些？

- 避免过度约束
- 避免后代选择符
- 避免链式选择符
- 使用紧凑的语法
- 避免不必要的命名空间
- 避免不必要的重复
- 最好使用表示语义的名字。一个好的类名应该是描述他是什么而不是像什么
- 避免 !important，可以选择其他选择器
- 尽可能的精简规则，你可以合并不同类里的重复规则

## 21. style 标签写在 body 前面或者后面有什么区别？

页面加载自上而下 当然是先加载样式。

写在body标签后由于浏览器以逐行方式对HTML文档进行解析，当解析到写在尾部的样式表（外联或写在style标签）会导致浏览器停止之前的渲染，等待加载且解析样式表完成之后重新渲染，在windows的IE下可能会出现FOUC现象（即样式失效导致的页面闪烁问题）

## 22. 元素竖向的百分比设定是相对于容器的高度吗？

当按百分比设定一个元素的宽度时，它是相对于父容器的宽度计算的，但是，对于一些表示竖向距离的属性，例如 padding-top , padding-bottom , margin-top , margin-bottom 等，当按百分比设定它们时，依据的也是父容器的宽度，而不是高度。

## 23. transition 和 animation 的区别？

- `transition` 是过度属性，强调过度，它的实现需要触发一个事件（比如鼠标移动上去，焦点，点击等）才执行动画。它类似于flash的补间动画，设置一个开始关键帧，一个结束关键帧。
- `animation` 是动画属性，它的实现不需要触发事件，设定好时间之后可以自己执行，且可以循环一个动画。它也类似于flash的补间动画，但是它可以设置多个关键帧（用@keyframe定义）完成动画。

## 24. 说说你对盒子模型的理解？

当对一个文档进行布局（layout）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）

一个盒子由四个部分组成：`content`、`padding`、`border`、`margin`

**标准盒子模型**：标准盒子模型，是浏览器默认的盒子模型

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/85630dd9d3d3454eab7e03bfb164af80tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp) 从上图可以看到：

- 盒子总宽度 = content;
- 盒子总高度 = content

也就是，`width/height` 只是内容高度，不包含 `padding` 和 `border `值

**IE 怪异盒子模型** ![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/46bed9e5b30b441789874e78487910d9tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp) 从上图可以看到：

- 盒子总宽度 = content + padding + border;
- 盒子总高度 = content + padding + border;

## 25. Atom CSS 是什么？有哪些优缺点？

Atom CSS：原子CSS，意思是一个类只干一件事。

不同于大家常用的BEM这类规则，原子css就是拆分，所有 CSS 类都有一个唯一的 CSS 规则

**优点**

- 减少了css体积，提高了css复用
- 减少起名的复杂度

**缺点**

- 增加了记忆成本。将css拆分为原子之后，你势必要记住一些class才能书写，哪怕 tailwindcss 提供了完善的工具链，你写background，也要记住开头是bg。
- 增加了html结构的复杂性。当整个dom都是这样class名，势必会带来调试的麻烦，有的时候很难定位具体css问题
- 你仍需要起class名。对于大部分属性而言，你可以只用到center,auto，100%，这些值，但是有时候你仍需要设定不一样的参数值，例如left，top，这时候你还需要起一个class名

## 26. 脱离文档流有哪些方法？

1. `float`：使用 float 脱离文档流时，其他盒子会无视这个元素，但其他盒子内的文本依然会为这个元素让出位置，环绕在该元素的周围。
2. `absolute`：absolute 称为绝对定位，是相对于该元素的父类（及以上，如果直系父类元素不满足条件则继续向上查询）元素进行定位的，并且这个父类元素的position必须是非static定位的（static是默认定位方式）。
3. `fixed`: 固定定位，完全脱离文档流，相对于浏览器窗口进行定位。（相对于浏览器窗口就是相对于html）

## 27. CSSOM树和DOM树是同时解析的吗？

浏览器会下载 HTML 解析页面生成 DOM 树，遇到 CSS 标签就开始解析 CSS，这个过程不会阻塞，但是如果遇到了 JS 脚本，此时假如 CSSOM 还没有构建完，需要等待 CSSOM 构建完，再去执行 JS 脚本，然后再执行 DOM 解析，此时会阻塞。

## 28. CSS Sprites 是什么，如何使用？

CSS Sprites是一种网页图片应用处理方式，就是把网页中一些背景图片整合到一张图片文件中，再利用CSS的“background-image”，“background- repeat”，“background-position”的组合进行背景定位。

**优点**：

- 减少网页的http请求，提高性能，这也是CSS Sprites最大的优点，也是其被广泛传播和应用的主要原因；
- 减少图片的字节：多张图片合并成1张图片的字节小于多张图片的字节总和；
- 减少了命名困扰：只需对一张集合的图片命名，不需要对每一个小元素进行命名提高制作效率；

**缺点**：

- 图片合成比较麻烦；
- 背景设置时，需要得到每一个背景单元的精确位置；
- 维护合成图片时，最好只是往下加图片，而不要更改已有图片。

## 29. 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。

## 30. canvas 在标签上设置宽高，与在 style 中设置宽高有什么区别？

- canvas标签的width和height是画布实际宽度和高度，绘制的图形都是在这个上面。
- 而style的width和height是canvas在浏览器中被渲染的高度和宽度。
- 如果canvas的width和height没指定或值不正确，就被设置成默认值。

## 31. 相邻的两个 inline-block 节点为什么会出现间隔，该如何解决？

真正意义上的inline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距，很简单的个例子：

```html
html
复制代码<input /> <input type="submit" />
```

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/bade7f349d884809a03797be19e609a2tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp)

我们使用CSS更改非inline-block水平元素为inline-block水平，也会有该问题

这种表现是符合规范的应该有的表现。

元素被当成行内元素排版的时候，元素之间的空白符（空格、回车换行等）都会被浏览器处理，根据white-space的处理方式（默认是normal，合并多余空白），原来HTML代码中的回车换行被转成一个空白符，在字体不为0的情况下，空白符占据一定宽度，所以inline-block的元素之间就出现了空隙。这些元素之间的间距会随着字体的大小而变化，当行内元素font-size:16px时，间距为8px。

不过，这类间距有时会对我们布局，或是兼容性处理产生影响，以下展示几种方法去掉

- 移除空格：元素间留白间距出现的原因就是标签段之间的空格，因此，去掉HTML中的空格，自然间距就木有了

- 使用margin负值

  ```css
  .space a { 
      display: inline-block; 
      margin-right: -3px; 
  }
  ```

- 使用font-size:0

  ```css
  .space { font-size: 0; } 
  .space a { font-size: 12px; }
  ```

- 使用letter-spacing

  ```css
  .space { letter-spacing: -3px; } 
  .space a { letter-spacing: 0; }
  ```

- 使用word-spacing

  ```css
  .space { word-spacing: -6px; } 
  .space a { word-spacing: 0; }
  ```

## 32. Sass、Less 是什么？为什么要使用他们？

他们都是 CSS 预处理器，是 CSS 上的一种抽象层。他们是一种特殊的语法/语言编译成 CSS。 例如 Less 是一种动态样式语言，将 CSS 赋予了动态语言的特性，如变量，继承，运算， 函数，LESS 既可以在客户端上运行 (支持 IE 6+, Webkit, Firefox)，也可以在服务端运行 (借助 Node.js)。

**它们的优点？**

- 结构清晰，便于扩展。 可以方便地屏蔽浏览器私有语法差异。封装对浏览器语法差异的重复处理， 减少无意义的机械劳动。
- 可以轻松实现多重继承。 完全兼容 CSS 代码，可以方便地应用到老项目中。LESS 只是在 CSS 语法上做了扩展，所以老的 CSS 代码也可以与 LESS 代码一同编译。

## 33. CSS3 新增伪类有哪些？

- p:first-of-type 选择属于其父元素的首个元素
- p:last-of-type 选择属于其父元素的最后元素
- p:only-of-type 选择属于其父元素唯一的元素
- p:only-child 选择属于其父元素的唯一子元素
- p:nth-child(2) 选择属于其父元素的第二个子元素
- :enabled :disabled 表单控件的禁用状态。
- :checked 单选框或复选框被选中
- ...

## 34. CSS 动画和 JS 实现动画分别有哪些优缺点？

**1. CSS动画**

**优点**

- 浏览器可以对动画进行优化
- 代码相对简单,性能调优方向固定
- 对于帧速表现不好的低版本浏览器，`CSS3`可以做到自然降级，而`JS`则需要撰写额外代码

**缺点**

- 运行过程控制较弱,无法附加事件绑定回调函数
- 代码冗长，想用`CSS`实现稍微复杂一点动画,最后`CSS`代码都会变得非常笨重

**2. JS 动画**

**优点**

- 控制能力很强, 可以在动画播放过程中对动画进行控制：开始、暂停、回放、终止、取消都是可以做到的。
- 动画效果比`css3`动画丰富,有些动画效果，比如曲线运动,冲击闪烁,视差滚动效果，只有`js`动画才能完成
- `CSS3`有兼容性问题，而`JS`大多时候没有兼容性问题

**缺点**

- 代码的复杂度高于`CSS`动画
- `JavaScript`在浏览器的主线程中运行，而主线程中还有其它需要运行的`JavaScript`脚本、样式计算、布局、绘制任务等,对其干扰导致线程可能出现阻塞，从而造成丢帧的情况

## 35. 为什么会出现浮动？什么时候需要清除浮动？清除浮动的方式有哪些？

**什么是浮动**：浮动（float）最初是为了让文字环绕图片排布，就想报纸上面的图文混排模式。但 Web 开发人员很快意识到，任何东西都可以浮动，而不仅仅是图像，所以浮动的使用范围扩大了。浮动曾被用来实现整个网站页面的布局，它使信息列得以横向排列（默认的设定则是按照这些列在源代码中出现的顺序纵向排列）。目前出现了更新更好的页面布局技术，所以使用浮动来进行页面布局应被看作传统的布局方法。

**什么时候需要清除浮动**：

- 父元素的高度无法被撑开，影响与父元素同级的元素
- 与浮动元素同级的非浮动元素（内联元素）会跟随其后
- 若非第一个元素浮动，则该元素之前的元素也需要浮动，否则会影响页面显示的结构。

**清除浮动的方式**：

- 父级div定义height
- 最后一个浮动元素后加空div标签 并添加样式clear:both。
- 包含浮动元素的父标签添加样式overflow为hidden或auto。
- 父级div定义zoom

## 36. IconFont 的原理是什么？

IconFont 的使用原理来自于 css 的 `@font-face` 属性。

这个属性用来定义一个新的字体，基本用法如下：

```css
@font-face { 
    font-family: <YourFontName>; 
    src: <url> [<format>],[<source> [<format>]], *; 
    [font-weight: <weight>]; 
    [font-style: <style>]; 
}
```

- font-family：为载入的字体取名字。
- src：[url]加载字体，可以是相对路径，可以是绝对路径，也可以是网络地址。[format]定义的字体的格式，用来帮助浏览器识别。主要取值为：【truetype(.ttf)、opentype（.otf）、truetype-aat、embedded-opentype(.eot)、svg(.svg)、woff(.woff)】。
- font-weight：定义加粗样式。
- font-style：定义字体样式。

## 37. 分析比较 opacity:0、visibility:hidden、display:none 优势和使用场景

可以从以下三点进行分析

**1. 结构**

- `display: none`: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击
- `visibility: hidden`:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
- `opacity: 0`: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

**2. 继承**

- `display: none`和`opacity: 0`：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
- `visibility: hidden`：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显示。

**3. 性能**

- `display: none`: 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
- `visibility: hidden`: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
- `opacity: 0`:修改元素会造成重绘，性能消耗较少

## 38. CSS 中有哪些定位方式？（position有哪些属性值？）

`static`: 这个是元素的默认定位方式，元素出现在正常的文档流中，会占用页面空间。

`relative`: 相对定位方式，相对于其原来的位置进行定位。会占用该元素在文档中初始的页面空间，即在使用top，bottom，left，right进行移动位置之后依旧不会改变其所占用空间的位置。可以使用z-index进行在z轴方向上的移动。

`absolute`: 绝对定位方式，脱离文档流，不会占用页面空间。以最近的不是static定位的父级元素作为参考进行定位，如果其所有的父级元素都是static定位，那么此元素最终则是以当前窗口作为参考进行定位。

`fixed`: 绝对定位方式，直接以浏览器窗口作为参考进行定位。其它特性同absolute定位。 当父元素使用了transform的时候，会以父元素定位。

`sticky`: 粘性定位，可以简单理解为relative和fixed布局的混合。当粘性约束矩形在可视范围内为relative，反之，则为fixed粘性定位元素如果和它的父元素一样高，则垂直滚动的时候，粘性定位效果是不会出现的，它的定位效果完全受限于父级元素们。

## 39. flexbox(弹性盒布局模型)是什么，使用什么场景？

`Flexible Box` 简称 `flex`，意为”弹性布局”，可以简便、完整、响应式地实现各种页面布局

采用Flex布局的元素，称为`flex`容器`container`

它的所有子元素自动成为容器成员，称为`flex`项目`item`

![image.png](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/9990e2d017034cea8396703ccc4d4b57tplv-k3u1fbpfcp-zoom-in-crop-mark1512000.webp) 容器中默认存在两条轴，主轴和交叉轴，呈90度关系。项目默认沿主轴排列，通过`flex-direction`来决定主轴的方向。每根轴都有起点和终点，这对于元素的对齐非常重要

关于`flex`常用的属性，我们可以划分为容器属性和容器成员属性

容器属性有：`flex-direction`、`flex-wrap`、`flex-flow`、`justify-content`、`align-items`、`align-content`

容器成员属性有： `order`、`flex-grow`、`flex-shrink`、`flex-basis`、`flex`、`align-self`

更多属性写法可前往 [MDN-flex](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FCSS%2FCSS_Flexible_Box_Layout%2FBasic_Concepts_of_Flexbox) 查看

## 40. z-index 属性什么时候会失效？

通常 z-index 的使用是在有两个重叠的标签，在一定的情况下控制其中一个在另一个的上方或者下方出现。z-index值越大就越是在上层。z-index元素的position属性需要是relative，absolute或是fixed。

z-index属性在下列情况下会失效：

- 父元素position为relative时，子元素的z-index失效。解决：父元素position改为absolute或static；
- 元素没有设置position属性为非static属性。解决：设置该元素的position属性为relative，absolute或是fixed中的一种；
- 元素在设置z-index的同时还设置了float浮动。解决：float去除，改为display：inline-block；

## 41. 怎么触发BFC，BFC有什么应用场景？

点击前往：[前端布局之浅谈BFC](https://juejin.cn/post/7149398890008018974/)

## 42. CSS 加载会造成阻塞吗？

先说下结论：

- css加载不会阻塞DOM树的解析
- css加载会阻塞DOM树的渲染
- css加载会阻塞后面js语句的执行

为了避免让用户看到长时间的白屏时间，我们应该尽可能的提高css加载速度，比如可以使用以下几种方法:

- 使用CDN(因为CDN会根据你的网络状况，替你挑选最近的一个具有缓存内容的节点为你提供资源，因此可以减少加载时间)
- 对css进行压缩(可以用很多打包工具，比如webpack,gulp等，也可以通过开启gzip压缩)
- 合理的使用缓存(设置cache-control,expires,以及E-tag都是不错的，不过要注意一个问题，就是文件更新后，你要避免缓存而带来的影响。其中一个解决防范是在文件名字后面加一个版本号)
- 减少http请求数，将多个css文件合并，或者是干脆直接写成内联样式(内联样式的一个缺点就是不能缓存)

## 43. 简单说说浏览器渲染的流程

浏览器渲染的流程如下：

- HTML解析文件，生成DOM Tree，解析CSS文件生成CSSOM Tree
- 将Dom Tree和CSSOM Tree结合，生成Render Tree(渲染树)
- 根据Render Tree渲染绘制，将像素渲染到屏幕上。

从流程我们可以看出来:

- DOM解析和CSS解析是两个并行的进程，所以这也解释了为什么CSS加载不会阻塞DOM的解析。
- 然而，由于Render Tree是依赖于DOM Tree和CSSOM Tree的，所以他必须等待到CSSOM Tree构建完成，也就是CSS资源加载完成(或者CSS资源加载失败)后，才能开始渲染。因此，CSS加载是会阻塞Dom的渲染的。
- 由于js可能会操作之前的Dom节点和css样式，因此浏览器会维持html中css和js的顺序。因此，样式表会在后面的js执行前先加载执行完毕。所以css会阻塞后面js的执行。

## 44. js 和 css 是如何影响DOM树构建的？

点击前往：[js 和 css 是如何影响DOM树构建的？](https://juejin.cn/post/7149863863557554212)

## 45. 怎么理解回流跟重绘？什么场景下会触发？

点击前往：[前端页面之“回流重绘”](https://juejin.cn/post/7150084386212610056)

## 46. 什么是响应式设计？响应式设计的基本原理是什么？如何进行实现？

**是什么：** 响应式网站设计（Responsive Web design）是一种网络页面设计布局，页面的设计与开发应当根据用户行为以及设备环境(系统平台、屏幕尺寸、屏幕定向等)进行相应的响应和调整

描述响应式界面最著名的一句话就是“Content is like water”，大白话便是“如果将屏幕看作容器，那么内容就像水一样”

响应式网站常见特点：

- 同时适配PC + 平板 + 手机等
- 标签导航在接近手持终端设备时改变为经典的抽屉式导航
- 网站的布局会根据视口来调整模块的大小和位置

**基本原理：** 响应式设计的基本原理是通过媒体查询检测不同的设备屏幕尺寸做处理 响应式设计实现通常会从以下几方面思考：

- 弹性盒子（包括图片、表格、视频）和媒体查询等技术
- 使用百分比布局创建流式布局的弹性UI，同时使用媒体查询限制元素的尺寸和内容变更范围
- 使用相对单位使得内容自适应调节
- 选择断点，针对不同断点实现不同布局和内容展示

**总结：**

响应式布局优点：

- 面对不同分辨率设备灵活性强
- 能够快捷解决多设备显示适应问题

缺点：

- 仅适用布局、信息、框架并不复杂的部门类型网站
- 兼容各种设备工作量大，效率低下
- 代码累赘，会出现隐藏无用的元素，加载时间加长
- 其实这是一种折中性质的设计解决方案，多方面因素影响而达不到最佳效果
- 一定程度上改变了网站原有的布局结构，会出现用户混淆的情况

## 47. 说说对 CSS 预编语言的理解，主流的有哪些？

**理解：** 预处理语言扩充了`css`语言，增加了诸如变量、混合（mixin）、函数等功能，让 `css` 更易维护、方便。本质上，预处理是`css`的超集，包含一套自定义的语法及一个解析器，根据这些语法定义自己的样式规则，这些规则最终会通过解析器，编译生成对应的 `css` 文件

**有哪些：** `css`预编译语言在前端里面有三大优秀的预编处理器，分别是：sass、less、stylus

## 48. CSS 中1像素问题是什么？有哪些解决方案？

**1px边框问题由来**： 苹果 iPhone4 首次提出了 Retina Display（视网膜屏幕）的概念，在 iPhone4 使用的视网膜屏幕中，把 2x2 个像素当 1 个物理像素使用，即使用 2x2 个像素显示原来 1 个物理像素显示的内容，从而让 UI 显示更精致清晰，这 2x2 个像素叫做逻辑像素。

像这种像素比（像素比（即dpr）＝ 物理像素 / 逻辑像素）为 2 的视网膜屏幕也被称为二倍屏，目前市面上还有像素比更高的三倍屏、四倍屏。

而 CSS 中 1px 指的是物理像素，因此，设置为 1px 的边框在 dpr = 2 的视网膜屏幕中实际占用了 2 个逻辑像素的宽度，这就导致了界面边框变粗的视觉体验。

**解决方案**：使用 transform 解决

通过设置元素的 box-sizing 为 border-box，然后构建伪元素，再使用 CSS3 的 transform 缩放，这是目前市面上最受推崇的解决方法。这种方法可以满足所有的场景，而且修改灵活，唯一的缺陷是，对于已使用伪元素的元素要多嵌套一个无用元素。具体的实现如下：

```css
.one-pixel-border {
  position: relative;
  box-sizing: border-box;
}

.one-pixel-border::before {
  display: block;
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 200%;
  height: 200%;
  border: 1px solid red;
  transform: translate(-50%, -50%) scale(0.5, 0.5);
}
```

这样就可以得到 0.5px 的边框。

还可以结合媒体查询（@media）解决不同 dpr 值屏幕的边框问题，如下：

```css
@media screen and (-webkit-min-device-pixel-ratio: 2), (min-resolution: 2dppx) {
  ...
}

@media screen and (-webkit-min-device-pixel-ratio: 3), (min-resolution: 3dppx) {
  ...
}
```

当然还有不少其他的解决方案：border-image、background-image、viewport + rem + js、box-shadow等，但都有各自的缺点，不进行推荐，此处也不做详细介绍。

## 49. overflow:scroll 时不能平滑滚动的问题怎么处理？

以下代码可解决这种卡顿的问题：

```css
css
复制代码-webkit-overflow-scrolling: touch;
```

是因为这行代码启用了硬件加速特性，所以滑动很流畅。

## 50. CSS 单位中 px、em 和 rem 的区别？

1. px 像素（Pixel）。绝对单位。像素 px 是相对于显示器屏幕分辨率而言的，是一 个虚拟长度单位，是计算机系统的数字化图像长度单位
2. em 是相对长度单位，相对于当前对象内文本的字体尺寸。如当前对行内文本的字 体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。它会继承父级元素的字体大 小，因此并不是一个固定的值
3. rem 是 CSS3 新增的一个相对单位（root em，根 em），使用 rem 为元素设定字 体大小时，仍然是相对大小，但相对的只是 HTML 根元素

区别： IE 无法调整那些使用 px 作为单位的字体大小，而 em 和 rem 可以缩放，rem 相对的只是 HTML 根元素。这个单位可谓集相对大小和绝对大小的优点于一身，通过它既可以做到只修改根元素就成比例地调整所有字体大小，又可以避免字体大小逐 层复合的连锁反应。目前，除了 IE8 及更早版本外，所有浏览器均已支持 rem。

## 51. 如何使用 CSS 提高页面性能？

点击前往：[如何使用 CSS 提高页面性能？](https://juejin.cn/post/7150448371059130404)

## 52. letter-spacing 与 word-spacing 的区别？

`letter-spacing`作用于所有字符，但`word-spacing`仅作用于空格字符。换句话说，word-spacing的作用就是增加空格的间隙宽度。

## 53. 无依赖绝对定位是什么？

没有设置left/top/right/bottom属性值的绝对定位称为“无依赖绝对定位”。无依赖绝对定位其定位的位置和没有设置position:absolute时候的位置相关。

## 54. 层叠准则？

（1）谁大谁上：当具有明显的层叠水平标识的时候，如生效的z-index属性值，在同一个层叠上下文领域，层叠水平值大的那一个覆盖小的那一个。

（2）后来居上：当元素的层叠水平一致、层叠顺序相同的时候，在DOM流中处于后面的元素会覆盖前面的元素。

## 55. font-weight 的特殊性？

如果使用数值作为`font-weight`属性值，必须是100～900的整百数。因为这里的数值仅仅是外表长得像数值，实际上是一个具有特定含义的关键字，并且这里的数值关键字和字母关键字之间是有对应关系的。

## 56. text-indent 的特殊性？

（1）text-indent 仅对第一行内联盒子内容有效。

（2）非替换元素以外的 display 计算值为 inline 的内联元素设置 text-indent值无效，如果计算值 inline-block/inline-table 则会生效。

（3）`<input>`标签按钮 text-indent 值无效。

（4）`<button>`标签按钮 text-indent 值有效。

（5）text-indent 的百分比值是相对于当前元素的“包含块”计算的，而不是当前元素。

## 57. 使用 rem 布局的优缺点？

**优点：** 在屏幕分辨率千差万别的时代，只要将rem与屏幕分辨率关联起来就可以实现页面的整体缩放，使得在设备上的展现都统一起来了。 而且现在浏览器基本都已经支持rem了，兼容性也非常的好。

**缺点：**

（1）在奇葩的dpr设备上表现效果不太好，比如一些华为的高端机型用rem布局会出现错乱。

（2）使用iframe引用也会出现问题。

（3）rem在多屏幕尺寸适配上与当前两大平台的设计哲学不一致。即大屏的出现到底是为了看得又大又清楚，还是为了看的更多的问 题。

## 58. 什么是首选最小宽度？

“首选最小宽度”，指的是元素最适合的最小宽度。 东亚文字（如中文）最小宽度为每个汉字的宽度。 西方文字最小宽度由特定的连续的英文字符单元决定。并不是所有的英文字符都会组成连续单元，一般会终止于空格（普通空格）、短横线、问号以及其他非英文字符等。

如果想让英文字符和中文一样，每一个字符都用最小宽度单元，可以试试使用CSS中的word-break:break-all。

## 59. 为什么 height:100%会无效？

对于普通文档流中的元素，百分比高度值要想起作用，其父级必须有一个可以生效的高度值。

原因是如果包含块的高度没有显式指定（即高度由内容决定），并且该元素不是绝对定位，则计算值为auto，因为解释成了auto，所以无法参与计算。

使用绝对定位的元素会有计算值，即使祖先元素的height计算为auto也是如此。

## 60. min-width/max-width 和 min-height/max-height 属性间的覆盖规则？

（1）max-width 会覆盖 width，即使 width 是行类样式或者设置了 !important。

（2）min-width 会覆盖 max-width，此规则发生在 min-width 和 max-width 冲突的时候。

## 61. 说说什么是内联盒模型？

（1）内容区域（content area）。内容区域指一种围绕文字看不见的盒子，其大小仅受字符本身特性控制，本质上是一个字符盒子 （character box）；但是有些元素，如图片这样的替换元素，其内容显然不是文字，不存在字符盒子之类的，因此，对于这些 元素，内容区域可以看成元素自身。

（2）内联盒子（inline box）。“内联盒子”不会让内容成块显示，而是排成一行，这里的“内联盒子”实际指的就是元素的“外在盒 子”，用来决定元素是内联还是块级。该盒子又可以细分为“内联盒子”和“匿名内联盒子”两类。

（3）行框盒子（line box），每一行就是一个“行框盒子”（实线框标注），每个“行框盒子”又是由一个一个“内联盒子”组成的。

（4）包含块（containing box），由一行一行的“行框盒子”组成。

## 62. content 与替换元素的关系？

content属性生成的对象称为“匿名替换元素”。

（1）我们使用content生成的文本是无法选中、无法复制的，好像设置了user select:none声明一般，但是普通元素的文本却可以被轻松选中。同时，content生成的文本无法被屏幕阅读设备读取，也无法被搜索引擎抓取，因此，千万不要自以为是地把重要的文本信息使用content属性生成，因为这对可访问性和SEO都很不友好。

（2）content生成的内容不能左右:empty伪类。

（3）content动态生成值无法获取。

## 63. 

## 64. overflow 的特殊性？

（1）一个设置了overflow:hidden声明的元素，假设同时存在border属性和padding属性，则当子元素内容超出容器宽度 高度限制的时候，剪裁的边界是border box的内边缘，而非padding box的内边缘。

（2）HTML中有两个标签是默认可以产生滚动条的，一个是根元素，另一个是文本域。

（3）滚动条会占用容器的可用宽度或高度。

（4）元素设置了overflow:hidden声明，里面内容高度溢出的时候，滚动依然存在，仅仅滚动条不存在！

# 代码篇

## 1. 下面代码中，p标签的背景色是什么？

```html
<style type="text/css">
     #parent p { background-color: red;  }
      div .a.b.c.d.e.f.g.h.i.j.k p{ background-color: green;  
</style>
......
<div id="parent">
     <div class="a b c d e f g h i j k">
         <p>xxxx</p>
     </div>
</div>
```

大家需要注意，权重是按优先级进行比较的，而不是相加规则。

答案：`red`。

## 2. 假设下面样式都作用于同一个节点元素span，判断下面哪个样式会生效？

```css
body#god div.dad span.son {
    width: 200px;
}
body#god span#test {
    width: 250px;
}
```

本题考察css的样式优先级权重，大家需要记住：

当两个权值进行比较的时候，是从高到低逐级将等级位上的权重值（如 权值 1,0,0,0 对应--> 第一等级权重值，第二等级权重值，第三等级权重值，第四等级权重值）来进行比较的，而不是简单的 1000个数 + 100个数 + 10个数 + 1个数 的总和来进行比较的，换句话说，低等级的选择器，个数再多也不会越等级超过高等级的选择器的优先级的。 所以本题的分析思路是：

- 先比较高权重位，即第一个样式的高权重为 `#god` = 100
- 第二个样式的高权重为 `#god` + `#text` = 200
- 100 < 200
- 所以最终计算结果是取 `width: 250px;`
- 若两个样式的高权重数量一样的话，则需要比较下一个高权重！

答案：`width: 250px;`

## 3. 第二个子元素的高度是多少？

```html
<div class="container">
    <div style="height: 100px"></div>
    <div style="min-height: 10px"></div>
</div>
<style>
    .container{
        display: flex;
    }
    .container > div {
        width: 100px;
    }
</style>
```

Flex 布局会默认：

- 把所有子项变成水平排列。
- 默认不自动换行。
- 让子项与其内容等宽，并把所有子项的高度变为最高子项的高度。

答案：`100px`

# 手写篇

## 1. 如何从 html 元素继承 box-sizing

```css
html { 
    box-sizing: border-box; 
} 
*, *:before, *:after { 
    box-sizing: inherit; 
}
```

## 2. 如何使用css来实现禁止移动端页面的足有滑动手势？

最简单的方法：

```css
html { 
    touch-action: none; 
    touch-action: pan-y; 
}
```

还可以直接指定对应元素的宽度和overflow：

```css
html { 
    width: 100vw; 
    overflow-x: hidden; 
}
```

## 3. 如何使用 CSS 画一个三角形

```css
.box {
   width: 0;
   height: 0;
   border-style:solid;
   border-width: 0 50px 50px;
   border-color: transparent transparent #d9534f;
}
```

## 4. 如何实现两栏布局，右侧自适应？三栏布局中间自适应？

**两栏布局**

浮动实现

```html
  <style>
    .box{
       overflow: hidden; 
    }
    .left {
       float: left;
       width: 200px;
       background-color: gray;
       height: 400px;
    }
    .right {
       margin-left: 210px;
       background-color: lightgray;
       height: 200px;
    }
</style>
<div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
</div>
```

flex实现

```html
  <style>
    .box{
       display: flex;
    }
    .left {
       width: 100px;
       background-color: skyblue;
       height: 400px;
    }
    .right {
       flex: 1;
       background-color: pink;
       height: 200px;
    }
  </style>
  <div class="box">
    <div class="left">左边</div>
    <div class="right">右边</div>
  </div>
```

**三栏布局**

```html
  <style>
    .wrap {
        display: flex;
        justify-content: space-between;
    }
    .left,
    .right,
    .middle {
        height: 500px;
    }
    .left {
        width: 200px;
        background: coral;
    }
    .right {
        width: 120px;
        background: lightblue;
    }
    .middle {
        background: #555;
        width: 100%;
        margin: 0 20px;
    }
  </style>
  <div class="wrap">
    <div class="left">左侧</div>
    <div class="middle">中间</div>
    <div class="right">右侧</div>
  </div>
```

## 5. 单行文本如何实现两端对齐

**方法一：添加一行**

根据justify对最后一行无效，我们可以新增一行，使该行文本不是最后一行，实现如下：

```html
<style>
//scss
  .item {
      height: 32px;
      line-height: 32px;
      margin-bottom: 8px;
      .label {
          display: inline-block;
          height: 100%;
          width: 100px;
          text-align: justify;
          vertical-align: top;
          &::after {
              display: inline-block;
              width: 100%;
              content: '';
              height: 0;
          }
      }
      .value {
          padding-right: 10px;
      }
  }
</style>
  <div class="item">
    <span class="label" >哈哈哈</span>：
    <span class="value">哈哈哈</span>
  </div>
```

**方法二： text-align-last**

text-align-last，该属性定义的是一段文本中最后一行在被强制换行之前的对齐规则。

```scss
s   //scss
  .item {
      margin-bottom: 8px;
      .label {
          display: inline-block;
          height: 100%;
          min-width: 100px;
          text-align: justify;
          text-align-last: justify;
      }
      .value {
          padding-right: 10px;
      }
  }
```

## 6. 使用 CSS 实现一个无限循环动画

```xml
<style type="text/css">
   .anima {
      width: 800px;
      height: 600px;
      animation-name: likes; 
      animation-direction: alternate; 
      animation-timing-function: linear;
      animation-delay: 0s;
      animation-iteration-count: infinite;
      animation-duration: 1s; 
    }

  @keyframes likes {
    0%{
        transform: scale(1);
    }
    25%{
        transform: scale(0.9);
    }
    50%{
        transform: scale(0.85);
    }
    75%{
        transform: scale(0.9);
    }
    100%{
        transform: scale(1);
    }
  }
  </style>
  <image class="anima" mode="widthFix" @click="nav" src="./1.jpg"></image>
```

## 7. 如何实现单行、多行文本溢出隐藏？

```
单行文本溢出隐藏
<style>
   div {
      width: 100px;
      height: 100px;
      /* 溢出隐藏 */
      overflow: hidden;           
      /* 溢出用省略号显示 */
      text-overflow: ellipsis;   
      /* 规定段落中的文本不进行换行   */
      white-space: nowrap;  
   }
  </style>
  <div>
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
  </div>
多行文本溢出隐藏
<style>
   div {
      width: 100px;
      overflow: hidden;
      text-overflow: ellipsis;
      /* 作为弹性伸缩盒子模型显示 */
      display: -webkit-box;
      /* 显示的行数 */
      -webkit-line-clamp: 3;
      /* 设置伸缩盒子的子元素排列方式：从上到下垂直排列 */
      -webkit-box-orient: vertical;
   }
  </style>
  <div>
    哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈
  </div>
```

## 8. CSS 垂直居中有哪些实现方式？

我们在布局一个页面时，通常都会用到水平居中和垂直居中，处理水平居中很好处理，不外乎就是设定`margin:0 auto;`或是`text-align:center;`,就可以轻松解决掉水平居中的问题，但一直以来最麻烦对齐问题就是「垂直居中」，以下将介绍几种单纯利用CSS垂直居中的方式，只需要理解背后的原理就可以轻松应用。

下面为公共代码：

```html
<style>
.box {
  width: 300px;
  height: 300px;
  background: #ddd;
}
.small {
  background: red;
}
</style>

<body>
    <div class="box">
        <div class="small">small</div>
    </div>
</body>
```

**1. absolute + margin实现**

方法一：

```css
  .box {
    position: relative;
  }
  .small {
    position: absolute;
    top: 50%;
    left: 50%;
    margin: -50px 0 0 -50px;
    width: 100px;
    height: 100px;
  }
```

方法二：

```css
  .box {
    position: relative;
  }
  .small {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto;
    width: 100px;
    height: 100px;
  }
```

**2. absolute + calc 实现**

```css
  .box {
    position: relative;
  }
  .small {
    position: absolute;
    top: calc(50% - 50px);
    left: calc(50% - 50px);
    width: 100px;
    height: 100px;
  }
```

**3. absolute + transform 实现**

```css
  .box {
    position: relative;
  }
  .small {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    width: 100px;
    height: 100px;
  }
```

**4. 转行内元素**

```css
  .box {
    line-height: 300px;
    text-align: center;
    font-size: 0px;
  }
  .small {
    padding: 6px 10px;
    font-size: 16px;
    display: inline-block;
    vertical-align: middle;
    line-height: 16px;
  }
```

**5. 使用flex**

方法一：

```css
  .box {
    display: flex;
    justify-content: center;
    align-items: center;
  }
```

方法二：

```css
  .box {
    display: flex;
    justify-content: center;
  }
  .small {
    align-self: center;
  }
```

