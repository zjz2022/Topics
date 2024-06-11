https://github.com/george-es/Blog/issues/32

## link 和 @import 的区别

1. 引入的内容不同

link 除了引用样式文件，还可以引用图片等资源文件，而 @import 只引用样式文件

2. 加载顺序不同

link 引用 CSS 时，在页面载入时同时加载；@import 需要页面网页完全载入以后加载

3. 兼容性不同

link 是 XHTML 标签，无兼容问题；@import 是在 CSS1 提出的，低版本的浏览器不支持

4. 对 JS 的支持不同

link 支持使用 Javascript 控制 DOM 去改变样式；而 @import 不支持