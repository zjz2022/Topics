# 浏览器中加载JavaScript的方式


常规加载js的方式是这样的：

```
<script src="script.js"></script>
```



无论什么时候HTML解析器发现这条语句的时候，一个请求将会被发起来请求这个脚本，然后脚本被执行。
一旦这个过程执行完成，解析器才会继续解析，HTML剩下的部分将会被继续解析。因此可以想象的是这会对网页的加载有巨大的影响。

常规的做法是把js文件不放在 `head` 中，而是放在body的闭合区间前。这样做的好处是脚本会在页面已经解析以及加载完之后，再加载及执行。这会有一个巨大的提升。

如果浏览器支持 `async` 和 `defer` ，那么使用这这两者将会是最好的方法。

## Async 和 Defer

使用方法：

```
<script async src="script.js"></script>
```



```
<script defer src="script.js"></script>
```



> 如果我们两者都指定了，那么在现代浏览器中，async会被优先处理。而在那些只支持 defer 而不支持 aysnc 的老式浏览器中将会选择 defer 作为备用。

这两个属性仅仅在head中的script标签中使用才会生效，如果放在body中将会失效。

接下来对比一下不同使用的效果：

**No defer or async, in the head**
[![image](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/100603657-61ffa700-3340-11eb-8428-1f9e56ce4f88.png)](https://user-images.githubusercontent.com/4001228/100603657-61ffa700-3340-11eb-8428-1f9e56ce4f88.png)

**No defer or async, in the body**
[![image](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/100603793-907d8200-3340-11eb-9fc7-91f98b6ac11d.png)](https://user-images.githubusercontent.com/4001228/100603793-907d8200-3340-11eb-9fc7-91f98b6ac11d.png)

**With async, in the head**
[![image](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/100603821-9d01da80-3340-11eb-8b51-01a4410da09e.png)](https://user-images.githubusercontent.com/4001228/100603821-9d01da80-3340-11eb-8b51-01a4410da09e.png)

**With defer, in the head**
[![image](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/100603870-b0ad4100-3340-11eb-8288-c540ce123345.png)](https://user-images.githubusercontent.com/4001228/100603870-b0ad4100-3340-11eb-8288-c540ce123345.png)
这种方式很像在body闭合标签之前放置script脚本，但是综合来说是更好的，因为脚本在HTML解析的同时已经下载好了。
因此这是最好的加载方式。

async 与 defer 的对比：

- async 会阻碍解析，而 defer 不会
- 本身并不会阻碍渲染，取决于其它因素，比如脚本的一些事件
- DOM的交互性：defer的加载是在DOM可交互之后，也就是发生在HTML加载并解析之后，DOM也已经被建立。css和图片此时依旧在被加载和解析，一旦这些完成之后，浏览器会发生 domComplete 事件，然后 `onLoad`。
- 调用顺序：async 不管是在任何顺序中，只要加载完可用状态就会被执行；而 defer 则会按照定义的顺序来执行

## onload Event 和 ready

页面加载完成有两种事件：

- 一是ready，表示文档结构（DOM结构）已经加载完成（不包含图片等非文字媒体文件），
- 二是onload，指示页面包含图片等文件在内的所有元素都加载完成。(可以说：ready 在onload 前加载！！！)

> 一般样式控制的，比如图片大小控制放在onload 里面加载;而：jS事件触发的方法，可以在ready 里面加载

onload 与 ready的区别
| | $(document).ready() | | window.onload |

## 最佳实践

提高页面加载速度的最佳实践是把 script脚本 放在 header 中，同时用defer属性。

```
<script defer src="script.js"></script>
```



这样也可以很快地触发 domInteractive 事件。

## 参考资料

- [Efficiently load JavaScript with defer and async](https://flaviocopes.com/javascript-async-defer/)