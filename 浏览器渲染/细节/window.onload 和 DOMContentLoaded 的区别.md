title: window.onload 和 DOMContentLoaded 的区别
 tags: 事件区别
 notebook: javascript 事件

------

## window.onload 和 DOMContentLoaded 的区别

在js中DOMContentLoaded方法是在HTML文档被完全的加载和解析之后才会触发的事件，他并不需要等到（样式表/图像/子框架）加载完成之后再进行。在看load事件（onload事件），用于检测一个加载完全的页面。

## DOM完整的解析过程：

> 1. 解析HTML结构。
> 2. 加载外部脚本和样式表文件。
> 3. 解析并执行脚本代码。//js之类的
> 4. DOM树构建完成。//DOMContentLoaded
> 5. 加载图片等外部文件。
> 6. 页面加载完毕。//load
>     在第4步的时候`DOMContentLoaded`事件会被触发。
>     在第6步的时候`load`事件会被触发。

### 触发

1、当 `onload`事件触发时，页面上所有的DOM，样式表，脚本，图片，flash都已经加载完成了。
 2、当 `DOMContentLoaded` 事件触发时，仅当DOM加载完成，不包括样式表，图片，flash。

示例:
 `window.onload`

```xml
<style>
    #bg {
       width: 100px;
       height: 100px;
       border: 2px solid;
    }
    </style>
    <script>
       document.getElementById("bg").style.background="yellow"
    </script>
</head>
<body>
    <div id="bg"></div>
</body>
```

运行效果:

![img](https:////upload-images.jianshu.io/upload_images/11461186-632ca2c7f4546964.png?imageMogr2/auto-orient/strip|imageView2/2/w/261/format/webp)


 添加`window.onload`事件

```jsx
window.onload = function() {
    document.getElementById("bg").style.background="yellow"
}
```

运行效果:

![img](https:////upload-images.jianshu.io/upload_images/11461186-d6e70e13f26b904a.png?imageMogr2/auto-orient/strip|imageView2/2/w/297/format/webp)

代码完成将div背景颜色设置为yellow，将设置背景颜色的代码放置在window.onload的事件处理函数中，当文档加载完成后，才会执行事件处理函数，保证文档已经加载完成。

`DOMContentLoaded`事件
 示例:

```xml
<body>
    <p>测试</p>
    <script>
    console.log('观察脚本加载的顺序')
        window.addEventListener("load", function() {
            console.log('load事件回调')
    }, false);
    document.addEventListener("DOMContentLoaded", function() {
         console.log('DOMContentLoaded回调') // 不兼容老的浏览器，兼容写法见[jQuery中ready与load事件] ，原理看下文
    }, false);
    </script>
</body>
```

运行效果:

```xml
<script>
  document.addEventListener("DOMContentLoaded", function(event) {
    console.log('DOMContentLoaded回调')
  });

for(var i=0; i<1000000000; i++)
{}  //循环 1000000000 次，为了使这个同步脚本将延迟DOM的解析。
    //所以DOMContentLoaded事件等待了一段时间（解析完所有js）才会被执行。
</script>
```

### 二、为什么要区分？

开发中我们经常需要给一些元素的事件绑定处理函数。但问题是，如果那个元素还没有加载到页面上，但是绑定事件已经执行完了，是没有效果的。这两个事件大致就是用来避免这样一种情况，将绑定的函数放在这两个事件的回调中，保证能在页面的某些元素加载完毕之后再绑定事件的函数。
 当然DOMContentLoaded机制更加合理，因为我们可以容忍图片，flash延迟加载，却不可以容忍看见内容后页面不可交互。
