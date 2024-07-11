vue作者亲自下场：https://medium.com/js-dojo/vue-3-was-a-mistake-that-we-should-not-repeat-81cc65484954

https://github.com/AnsonZnl/v-blog/blob/master/docs/articles/Vue/Vue3%E5%AF%B9%E6%AF%94Vue2%E6%9C%89%E5%93%AA%E4%BA%9B%E5%8F%98%E5%8C%96.md

vue2 和 vue3的区别

**1）组件化开发思想**

组合式API，简单来说就是将同一逻辑关注点的代码配置在一起。Vue2的以下局限性：

- 代码的可读性问题：如果组件越来越大，代码难于理解和维护。
- 组件逻辑复用问题：相同的逻辑代码，很难在多个组件里面进行复用。

**2） 支持多根结点，放入虚拟fragment中，对TypeScript的支持**

**3）响应式原理**

​		Vue2 响应式原理基础是 Object.defineProperty；Vue3 响应式原理基础是 Proxy。

​		Object.defineProperty 基本用法：直接在一个对象上定义新的属性或修改现有的属性，并返回对象。他无法监听对象或数组新增、删除的元素。比如：给对象添加属性但是界面不刷新；监测 .length 修改。

​		若想实现数据与视图同步更新，可采取下面三种解决方案：

- 如果为对象添加少量的新属性，可以直接采用`Vue.set()`
- 如果需要为新对象添加大量的新属性，则通过`Object.assign()`创建新对象
- 修改数组后触发界面更新，可采取`this.$forceUpdate()`进行强制刷新 (不建议)

​		Proxy Proxy 是 ES6 新特性，通过第2个参数 handler 拦截目标对象的行为。相较于 Object.defineProperty 提供语言全范围的响应能力，消除了局限性。

**4）虚拟DOM和diff算法的优化**

**5）打包优化**

**6）setup生命周期函数里加on。beforeDestroy 生命周期选项被重命名为 onBeforeUnmount。**

**7） Composition API：setup（）、ref&reactive**

**8）移除了一些组件，如filter和v-on等**

**9）轻量化，如创建使用createApp()而不是new Vue()，比new Vue()轻量**

Vue3其他改进：

​	**1 watch属性**

​	1） 用reactive监视对象时，不能监视到oldvalue

​	2） 默认开启了deep，且关不掉

​	3） 当传入reactive的某一属性时，需要传递函数才可以实现监视，因为watch只能监视数组、ref和reactive

​	**2 hook** 本质是一个函数，相当于mixin

​	**3 provide和inject**实现祖孙之间通信

​	**4 watchEffect** 也是一个帧听器，是一个副作用函数。 它会监听引用数据类型的所有属性，不需要具体到某个属性，一旦运行就会立即监听，组件卸载的时候会停止监听。

​	**5 toRef shallowReactive toRaw和markRaw**

​	**6 v-for** 除了可以遍历数组之外，还可以遍历对象、迭代器等

​    **7 更好的错误处理**

**Vue3 编译优化**

编译优化：编译器将模版编译为渲染函数的过程中，尽可能地提取关键信息，并以此指导生成最优代码的过程。

原因：传统diff算法的问题： 无法利用编译时提取到的任何关键信息，导致渲染器在运行时不会去做相关的优化。

目的：尽可能地区分动态内容和静态内容，并针对不同的内容采用不同的优化策略。vue3的编译器会将编译得到的关键信息“附着”在它生成的虚拟DOM上，传递给渲染器，执行“快捷路径”。

方法：

1. Block 与 PatchFlag：传统Diff算法无法避免新旧虚拟DOM树间无用的比较操作，是因为运行时得不到足够的关键信息，从而无法区分动态内容和静态内容。 现在在虚拟节点多了一个额外的属性，即 patchFlag（补丁标志），存在该属性，就认为是动态节点。在虚拟节点的创建阶段，把它的动态子节点提取出来，并存储到该虚拟节点的 dynamicChildren 数组中。

```
Block定义: 带有 dynamicChildren 属性的虚拟节点称为“块” ，即（Block）
一个Block本质上也是一个虚拟DOM, 比普通的虚拟节点多处一个用来存储动态节点的 dynamicChildren属性。（能够收集所有的动态子代节点）
渲染器的更新操作会以Block为维度。当渲染器在更新一个Block时，会忽略虚拟节点的children数组，直接找到dynamicChildren数组，并只更新该数组中的动态节点。跳过了静态内容，只更新动态内容。同时，由于存在对应的补丁标志，也能够做到靶向更新。
Block节点有哪些： 模版根节点、 带有v-for、v-if/v-else-if/v-else等指令的节点
```

1. 静态提升：减少更新时创建虚拟DOM带来的性能开销和内存占用。把纯静态的节点提升到渲染函数之外，响应式数据变化后，不会重新创建静态的虚拟节点，包含动态绑定的节点本身不会被提升，但是该节点上的静态属性是可以被提升的。
2. 预字符串化：基于静态提升，进一步采用预字符串化优化。采用预字符串化将这些静态节点序列化为字符串， 并生成一个Static类型的VNode，超过 20 个静态会进行静态提升。大块的静态内容可以通过 innerHTML设置， 在性能上有一定优势。
3. v-once 可以对虚拟DOM进行缓存