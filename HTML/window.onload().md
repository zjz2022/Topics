### window.onload()

在 HTML5 中，`onload` 是一个重要的事件。当一个页面完全加载完成，包括所有的框架、图片、样式表、脚本等等，`onload`事件将会被触发。

`onload` 通常用在 `window` 对象上，但它也可以用在图片或其他 HTML 元素上。如果你想在页面完全加载后执行 JavaScript，那么 `onload` 就是你的好选择。

下面是一个简单示例，使用 `onload` 事件在页面加载后弹出一个对话框：

```html
<body onload="alert('Welcome to my website!')">
  <!-- your website content -->
</body>
```

也可以在 JavaScript 代码中添加 `onload` 事件：

```js
window.onload = function() {
  alert('Welcome to my website!');
};
```

在一些实际应用中，`onload` 通常用于在页面加载后，执行一些初始化操作，或者获取用户浏览器相关信息。

请注意，当页面较大或网络延迟较大时，`onload`可能会有明显的等待时间。在这种情况下，开发人员可能需要探索其他的方式，如`DOMContentLoaded`事件，实现更快的、用户友好的页面加载策略。