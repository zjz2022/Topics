### BFC介绍

**文档有几种流**

1. 定位流
   - 绝对定位方案，盒从常规流中被移除，不影响常规流的布局；
   - 它的定位相对于它的包含块，相关CSS属性：top、bottom、left、right；
   - 如果元素的属性position为absolute或fixed，它是绝对定位元素；
   - 对于position: absolute，元素定位将相对于上级元素中最近的一个relative、fixed、
   - absolute，如果没有则相对于body；
2. 浮动流
   - 左浮动元素尽量靠左、靠上，右浮动同理
   - 这导致常规流环绕在它的周边，除非设置 clear 属性
   - 浮动元素不会影响块级元素的布局
   - 但浮动元素会影响行内元素的布局，让其围绕在自己周围，撑大父级元素，从而间接影响块级元素布局
   - 最高点不会超过当前行的最高点、它前面的浮动元素的最高点
   - 不超过它的包含块，除非元素本身已经比包含块更宽
   - 行内元素出现在左浮动元素的右边和右浮动元素的左边，左浮动元素的左边和右浮动元素的
   - 右边是不会摆放浮动元素的
3. 普通流
   - 在常规流中，盒一个接着一个排列;
   - 在块级格式化上下文里面， 它们竖着排列；
   - 在行内格式化上下文里面， 它们横着排列;
   - 当position为static或relative，并且float为none时会触发常规流；
   - 对于静态定位(static positioning)，position: static，盒的位置是常规流布局里的位置；
   - 对于相对定位(relative positioning)，position: relative，盒偏移位置由top、bottom、
   - left、right属性定义。即使有偏移，仍然保留原有的位置，其它常规流不能占用这个位置。

**定义**

BFC的基本概念–BFC就是“块级格式化上下文”的意思，也有译作“块级格式化范围”。

通俗的讲，就是一个特殊的块，内部有自己的布局方式，不受外边元素的影响。

**布局规则**

1. 内部的 Box 会在垂直方向，一个接一个地放置
2. 垂直方向上的距离由margin决定。（完整的说法是：属于同一个BFC的两个相邻Box的margin会发生重叠（塌陷），与方向无关。）
3. 每个元素的左外边距与包含块的左边界相接触（从左向右），即使浮动元素也是如此。（这说明BFC中子元素不会超出他的包含块，而position为absolute的元素可以超出他的包含块边界）
4. BFC的区域不会与float的元素区域重叠
5. 计算BFC的高度时，浮动子元素也参与计算
6. BFC就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面元素，反之亦然

**哪些元素会创建 BFC**

1. 根元素
1. float 属性不为 none
1. position 为 absolute 或 fixed
1. display 为 inline-block， table-cell， table-caption， flex， inline-flex
1. overflow 不为 visible

**场景**

1. **清除元素内部浮动**

   只要把父元素设为BFC就可以清理子元素的浮动了，最常见的用法就是在父元素上设置overflow: hidden样式，对于IE6加上zoom:1就可以了。

   计算BFC的高度时，自然也会检测浮动或者定位的盒子高度。

2. **解决外边距合并问题(嵌套崩塌)**

   外边距合并的问题。

   盒子垂直方向的距离由margin决定。属于同一个BFC的两个相邻盒子的margin会发生重叠

   属于同一个BFC的两个相邻盒子的margin会发生重叠，那么我们创建不属于同一个BFC，就不会发生margin重叠了。

3. **制作右侧自适应的盒子问题**

   普通流体元素BFC后，为了和浮动元素不产生任何交集，顺着浮动边缘形成自己的封闭上下文

### 6.2 BFC实现方法

块级格式化上下文（Block Formatting Context，BFC）是 Web 页面的可视化 CSS 渲染的一部分，它的位置和大小由盒模型属性决定，如 `width`、`height`、`margin`、`padding`、`border`等。

当元素满足以下条件之一，就会为这个元素创建一个新的 BFC：

1. `root`或包含根元素的元素
2. `float`属性不为`none`
3. `position`为`absolute`或`fixed`
4. `display`为`inline-block`、`table-cell`、`table-caption`、`flex`、`inline-flex`
5. `overflow`不为`visible`

BFC 的特性有很多，比如：

1. 内部的 Box 会在垂直方向上一个接一个地放置。
2. Box 垂直方向的距离由 `margin` 决定。属于同一个 BFC 的两个相邻 Box 的 `margin` 会发生重叠。
3. 每个元素的 `margin box` 的左边，与包含块（BFC）边框的左边相接触（对于从左往右的格式化，否则相反）。即使存在浮动也是如此。
4. BFC 的区域不会与 `float` 的元素区域重叠。
5. 计算 BFC 的高度时，浮动子元素也参与计算。
6. BFC 就是页面上的一个独立容器，外面的元素不会影响它里面的元素，里面的元素也不会影响外面的元素。
7. 当元素与其他元素相邻时，它们各自的 `margin` 会发生重叠。

因此 BFC 可以用于实现一些布局技巧，比如清除浮动、防止垂直`margin`重叠等。