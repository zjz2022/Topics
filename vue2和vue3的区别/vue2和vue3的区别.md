## vue2和vue3的区别 

### 13.1 vue2 和 vue3 有什么区别？

**双向绑定**

vue2 的双向数据绑定是利⽤ES5 的⼀个 API ，Object.defineProperty()对数据进⾏劫持 结合 发布订阅模式的⽅式来实现的。

vue3 中使⽤了 ES6 的 ProxyAPI 对数据代理，通过 reactive() 函数给每⼀个对象都包⼀层 Proxy，通过 Proxy 监听属性的变化，从⽽ 实现对数据的监控。

这⾥是相⽐于vue2版本，使⽤proxy的优势如下

1. defineProperty只能监听某个属性，不能对全对象监听 可以省去for in、闭包等内容来提升效率（直接绑定整个对象即可）

2. 监听数组，不⽤再去单独的对数组做特异性操作,通过Proxy可以直接拦截所有对象类型数据的操作，完美⽀持对数组的监听。

**获取props**

vue2在script代码块可以直接获取props，vue3通过setup指令传递

**API不同**

Vue2使⽤的是选项类型API（Options API），Vue3使⽤的是合成型API（Composition API）

**建立数据data**

vue2是把数据放入data中，vue3就需要使用一个新的setup()方法，此方法在组件初始化构造得时候触发。

**生命周期不同**

| vue2          | vue3                                           |
| ------------- | ---------------------------------------------- |
| beforeCreate  | setup() 开始创建组件之前，创建的是data和method |
| created       | setup()                                        |
| beforeMount   | onBeforeMount 组件挂载到节点上之前执行的函数   |
| mounted       | onMounted 组件挂载完成后执行的函数             |
| beforeUpdate  | onBeforeUpdate 组件更新之前执行的函数          |
| updated       | onUpdated 组件更新完成之后执行的函数           |
| beforeDestroy | onBeforeUnmount 组件挂载到节点上之前执行的函数 |
| destroyed     | onUnmounted 组件卸载之前执行的函数             |
| activated     | onActivated 组件卸载完成后执行的函数           |
| deactivated   | onDeactivated                                  |

**关于v-if和v-for的优先级:**

vue2 在一个元素上同时使用 v-if 和 v-for  v-for会优先执行

vue3 v-if 总会优先于  v-for生效

**vue2和vue3的diff算法**

**vue2**

vue2 diff算法就是进行虚拟节点对比，并返回一个patch对象，用来存储两个节点 不同的地方，最后用patch记录的消息去局部更新Dom。

vue2 diff算法会比较每一个vnode,而对于一些不参与更新的元素，进行比较是有 点消耗性能的。

**vue3**

vue3 diff算法在初始化的时候会给每个虚拟节点添加一个patchFlags，patchFlags 就是优化的标识。

只会比较patchFlags发生变化的vnode,进行更新视图，对于没有变化的元素做静 态标记，在渲染的时候直接复用。

### 13.2 vue中v-if和v-for优先级在vue2和vue3中的区别

实践中不管是vue2或者vue3都不应该把v-if和v-for放在一起使用。

* 在 vue x 中，在一个元素上同时使用 v-if 和 v-for 时， v-for 会优先作用。
* 在 vue x 中， v-if 总是优先于 v-for 生效。
* vue2中v-for的优先级是高于v-if的，放在一起，会先执行循环在判断条件，并且如果值渲染列表中一小部分元素，也得再每次重渲染的时候遍历整个列表，比较浪费资源。
* vue3中v-if的优先级是高于v-for的，所以v-if执行时，它调用相应的变量如果不存在，就会导致异常

### 13.3 为什么Vue3编译出来的代码会小一点

### 13.4 vue2、3对数组的监听

### 13.5 组合式API和命令式API,只有灵活度和对大型项目友好度，复用性的区别吗

vue2和vue3的区别

讲一下vue2和vue3的区别？