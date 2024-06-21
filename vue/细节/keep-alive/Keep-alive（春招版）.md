### Keep-alive

​	keep-alive作为一种vue的内置组件，主要作用是缓存组件状态。当需要组件的切换时，不用重新渲染组件，避免多次渲染，就可以使用keep-alive包裹组件。

```vue
<!-- 基本 --> 
<keep-alive> 
    <component :is="view"></component> 
</keep-alive> 
<!-- 多个条件判断的子组件 -->
<keep-alive> 
    <comp-a v-if="a > 1"></comp-a> 
    <comp-b v-else></comp-b> 
</keep-alive>
<!-- 和 `<transition>` 一起使用 -->
<transition> 
    <keep-alive> 
        <component :is="view"></component> 
    </keep-alive> 
</transition>
```

​		`keep-alive`是一个组件，这个组件中有三个属性，分别是`include`、`exclude`、`max`，在`created`中创建缓存列表和缓存组件的key列表，销毁的时候会做一个循环销毁清空所有的缓存和key。当`mounted`时会监控`include`和`include`属性，进行组件的缓存处理。按需缓存，keep-alive组件如果设置了 include ，就只有和 include 匹配的组件会被缓存。



​		该组件如果缓存过，就直接拿到组件实例，如果没有就存进当前的`vnode`中，和key做一个对应关系。

在 keep-alive 的源码定义中，它作为一个组件有自己的 render() 阶段会缓存 vnode 和组件名称 key 等操作。

首先会判断是否存在缓存，如果存在，则直接从缓存中获取组件的实例，并进行缓存优化处理（这里面有一个算法叫`LRU`，如果有key就不停的取，如果超限了就采用`LRU`进行删除最近最久未使用的，从前面删除，`LRU`就是将当前使用的往数组的后面移，在最前面的就是最久未使用的）。

​	如果发生变化会动态的添加和删除缓存，渲染的时候会去拿`默认插槽`，只缓存第一个组件，根据组件的名字判断是否在缓存中，如果在就缓存，不在就return掉，不在就直接return掉。缓存的时候，如果组件没有key，就自己通过组件的标签，key和cid拼接一个key。

```js
var KeepAlive = {
  ...
  props: {
    include: patternTypes,  // 名称匹配的组件会被缓存，对外暴露 include 属性 api
    exclude: patternTypes,  // 名称匹配的组件不会被缓存，对外暴露 exclude 属性 api
    max: [String, Number]  // 可以缓存的组件最大个数，对外暴露 max 属性 api
  },
```

注意：

```
iframe 标签承载了一个单独的嵌入的窗口，它有自己的 document 和 window (浏览器会检查 iframe 是否具有相同的源)
```

​		iframe中keep-alive机制失效原因：iframe页里的内容并不属于节点的信息，所以使用keep-alive依然会重新渲染iframe内的内容。而且iframe每一次渲染就相当于打开一个新的网页窗口，即使把节点保存下来，在渲染时iframe页还是刷新的。

解决策略：

1. 切换不含iframe的界面时使用vue路由，在切换含iframe页的界面时利用v-show来控制显示隐藏，使iframe的节点不被删除，以此来防止界面节点被重新更新，从而达到保存iframe节点数据的效果
2. 使用不带iframe的组件正常使用keep-alive，带iframe的组件开始时隐藏，切换到带iframe的组件时，隐藏其他不带iframe的组件，显示带iframe的组件，通过v-if将iframe的显示做成懒加载形式的，只有在用户进入相应的页面时才触发渲染，在渲染完毕后再通过v-show去控制界面在切换时的显示与隐藏。

https://juejin.cn/post/7133038641370595365

https://juejin.cn/post/7037321886019092510#heading-6