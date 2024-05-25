## display

### 19.0 display 有哪些取值？

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

### 19.1 display：none 与 visibility：hidden 的区别

### 19.2 display:inline-block 什么时候会显示间隙？

1. 有空格时候会有间隙 解决：s除空格
2. margin正值的时候 解决：margin使用负值
3. 使用font-size时候 解决：font-size:0、letter-spacing、word-spacing