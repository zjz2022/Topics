### lazyload

核心逻辑是： 图片在视图范围内，就显示，否则只显示加载图标。而图片在不在视图范围内，是动态变化的，比如滚动的时候，图片就可能从视图外到视图内。

```
import VueLazyload from 'vue-lazyload'

Vue.use(VueLazyload,{
  preLoad: 1.3,
  loading: 'dist/loading.gif',
})

// 使用的时候，直接在想懒加载的img上，加个指令就好了
// <img v-lazy="img.src">
```

**原理：**

​		通过getBoundingClientRect可以知道,元素相对于视图窗口的**左上角**的距离。

```js
Element.getBoundingClientRect() //方法返回一个 DOMRect 对象，其提供了元素的大小及其相对于视口的位置。
```

​		**元素在不在视图内，其实本质上就是判断：****`top > windowHeight`**。`top`越大，元素离地址栏就会越来越远，当距离**大于**`windowHeight`，就不在视图范围内。

```js
const windowHeight = window.innerHeight
// 元素离地址栏的近似距离
const {top} = ele.getBoundingClientRect()
const isInView = top<windowHeight
```

1. vue-lazyload是通过指令的方式实现的，定义的指令是v-lazy指令
2. 指令被bind时会创建一个listener，并将其添加到listener queue里面， 并且搜索target dom节点，为其注册dom事件(如scroll事件)
3. 上面的dom事件回调中，会遍历 listener queue里的listener，判断此listener绑定的dom是否处于页面中perload的位置，如果处于则加载异步加载当前图片的资源
4. 同时listener会在当前图片加载的过程的loading，loaded，error三种状态触发当前dom渲染的函数，分别渲染三种状态下dom的内容