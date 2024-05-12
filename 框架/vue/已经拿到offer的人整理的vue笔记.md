# Vue

## (一) 区别

**1.1 JS**

​	1 解耦视图和数据

​	2 双向数据绑定

​	3 可复用的组件

​	4 前端路由技术（单页面）

​	5 状态管理

​	6 虚拟DOM

**1.2 vue2 和 vue3**

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

## (二) MVVM数据流

​		MVVM 和 MVC都是一种设计思想，都是为了保证高内聚低耦合和可重用性的优点。MVVM 与 MVC 最大的区别就是：它实现了View和Model的自动同步，当Model属性改变时，不用手动操作Dom元素去改变View的显示。而改变属性后，该属性对应View的显示会自动改变，因此开发者只需要专注对数据的维护操作即可，而不需要一直操作 dom。

**1 阐述一下你所理解的MVVM响应式原理**

​		vue是采用数据劫持配合发布者-订阅者的模式的方式，通过Object.defineProperty()来劫持各个属性的getter和setter，在数据变动时，发布消息给依赖收集器（dep中的subs），去通知（notify）观察者，做出对应的回调函数，更新视图。MVVM作为绑定的入口，整合Observer,Compile和Watcher三者，通过Observer来监听model数据变化，通过Compile来解析编译模板指令，最终利用Watcher搭起Observer，Compile之间的通信桥路，达到数据变化Observer）=>视图更新；视图交互变化=>数据model变更的双向绑定效果。

**2 双向数据流**

​		在双向数据流中，Model（可以理解为状态的集合） 中可以修改自己或其他Model的状态， 用户的操作（如在输入框中输入内容）也可以修改状态。（双向数据流也可以叫双向数据绑定）

双向数据流 - 优点

1. 数据模型变化与更新，会自动同步到页面上，用户在页面的数据操作，也会自动同步到数据模型
2. 无需进行和单向数据绑定的那些相关操作；
3. 在表单交互较多的场景下，会简化大量业务无关的代码。

双向数据流 - 缺点

1. 无法追踪局部状态的变化；
2. “暗箱操作”，增加了出错时 debug 的难度；
3. 由于组件数据变化来源入口变得可能不止一个，数据流转方向易紊乱。
4. 改变一个状态有可能会触发一连串的状态的变化，最后很难预测最终的状态是什么样的。使得代码变得很难调试

**3 单项数据流**

对于 Vue 来说，组件之间的数据传递具有单向数据流这样的特性。

1. 父组件总是通过 props 向子组件传递数据；
2. 所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定；
3. 父级 prop 的更新会向下流动到子组件中，但是反过来则不行；
4. 这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解；
5. 每次父级组件发生更新时，子组件中所有的 prop 都将会刷新为最新的值；
6. 这意味着不应该在一个子组件内部改变 prop。如果这样做，Vue 会在浏览器的控制台中发出警告。

单向数据流 - 优点

1. 所有状态的改变可记录、可跟踪，源头易追溯；
2. 所有的数据，具有唯一出口和入口，使得数据操作更直观更容易理解，可维护性强；
3. 当数据变化时，页面会自动变化
4. 当你需要修改状态，完全重新开始走一个修改的流程。这限制了状态修改的方式，让状态变得可预测，容易调试。

单向数据流 - 缺点

1. 页面渲染完成后，有新数据不能自动更新，需要手动整合新数据和模板重新渲染
2. 代码量上升，数据流转过程变长，代码重复性变大
3. 由于对应用状态独立管理的严格要求(单一的全局 store，如：Vuex)，在处理局部状态较多的场景时(如用户输入交互较多的“富表单型”应用)，会显得啰嗦及繁琐。

**4 依赖收集**

​		我们知道，当一个可观测对象的属性被读写时，会触发它的getter/setter方法。如果我们可以在可观测对象的getter/setter里面，去执行监听器里面的onComputedUpdate()方法，是不是就能够实现让对象主动发出通知的功能呢？由于监听器内的onComputedUpdate()方法需要接收回调函数的值作为参数，而可观测对象内并没有这个回调函数，所以我们需要借助一个第三方来帮助我们把监听器和可观测对象连接起来。这个第三方就做一件事情——收集监听器内的回调函数的值以及onComputedUpdate()方法。

​		Vue为数据中的每一个key维护一个订阅者列表。对于生成的数据，通过`Object.defineProperty`对其中的每一个key进行处理，主要是为每一个key设置`get`, `set`方法，以此来为对应的key收集订阅者，并在值改变时通知对应的订阅者。

在对key进行取值时，如果`Dep.target`有值，除正常的取值操作外会进行一些额外的操作来添加订阅者。大多数时间里，`Dep.target`的值都为`null`，只有订阅者在进行订阅操作时，`Dep.target`才有值，为正在进行订阅的订阅者。此时进行取值操作，会将订阅者加入到对应的订阅者列表中。

订阅者在进行订阅操作时，主要包含以下3个步骤：

- 将自己放在`Dep.target`上
- 对自己依赖的key进行取值
- 将自己从`Dep.target`移除

Vue 的响应式系统中的一个重要部分是依赖收集。这个过程确保只有当某个状态改变时，依赖于这个状态的计算值或组件才会重新计算或渲染。

以下是一个简化的依赖收集系统的实现：

```js
class Dep {
  //这个例子中，我们创建了一个Dep类，它代表了一个依赖项。每个依赖项都有一个subscribers集合，用于存储所有依赖于这个依赖项的更新函数。
  constructor() {
    this.subscribers = new Set();
  }

  depend() {
    if (activeUpdate) {
      this.subscribers.add(activeUpdate);
    }
  }

  notify() {
    this.subscribers.forEach(sub => sub());
  }
}
//autorun函数接收一个更新函数，并将其包装在一个新的函数中，这个新的函数会在每次运行更新函数时将自己设置为activeUpdate。这样，当我们访问响应式对象的某个属性时，我们就可以将 activeUpdate 添加到这个属性对应的依赖项的 subscribers集合中。
let activeUpdate;
function autorun(update) {
  function wrappedUpdate() {
    activeUpdate = wrappedUpdate;
    update();
    activeUpdate = null;
  }

  wrappedUpdate();
}
//最后，当我们修改响应式对象的某个属性的值时，我们会通知这个属性对应的依赖项，让其调用所有的更新函数，这就实现了状态改变时的响应更新。
function reactive(obj) {
  const deps = new Map();
  return new Proxy(obj, {
    get(obj, key) {
      let dep = deps.get(key);
      if (!dep) {
        dep = new Dep();
        deps.set(key, dep);
      }

      dep.depend();
      return obj[key];
    },
    set(obj, key, newVal) {
      obj[key] = newVal;
      const dep = deps.get(key);
      if (dep) {
        dep.notify();
      }
      return true;
    }
  });
}

const state = reactive({ count: 0 });

autorun(() => {
  console.log(state.count);
});

state.count++; // 控制台输出：1
```

https://www.jianshu.com/p/e6e1fa824849

## (三) 一些方法

### 3.1 Keep-alive

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

### 3.2 NextTick

​		定义：在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

​		nextTick的目的就是产生一个回调函数加入task或者microtask中，当前栈执行完以后（可能中间还有别的排在前面的函数）调用该回调函数，起到了异步触发（即下一个tick时触发）的目的。

​		将传入的回调函数包装成异步任务，异步任务又分微任务和宏任务，为了尽快执行所以优先选择微任务；Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

**DOM树更新是同步的**

每一轮事件循环的最后会进行一次页面渲染，并且从上面我们知道渲染过程也是个宏任务，这里可能会有个误区，那就是DOM tree的修改是同步的，只有渲染过程是异步的，也就是说我们在修改完DOM后能够立即获取到更新的DOM。

**为什么Vue却需要借用$nextTick来处理**

因为Vue处于性能考虑，Vue会将用户同步修改的多次数据缓存起来，等同步代码执行完，说明这一次的数据修改就结束了，然后才会去更新对应DOM，一方面可以省去不必要的DOM操作，比如同时修改一个数据多次，只需要关心最后一次就好了，另一方面可以将DOM操作聚集，提升render性能。

**为什么优先使用微任务？**

因为微任务一定比宏任务优先执行，如果nextTick是微任务，它会在当前同步任务执行完立即执行所有的微任务，也就是修改DOM的操作也会在当前tick内执行，等本轮tick任务全部执行完成，才是开始执行UI rendering。如果nextTick是宏任务，它会被推进宏任务队列，并且在本轮tick执行完之后的某一轮执行，注意，它并不一定是下一轮，因为你不确定宏任务队列中它之前还有所少个宏任务在等待着。所以为了能够尽快更新DOM，Vue中优先采用的是微任务，并且在Vue3中，它没有了兼容判断，直接使用的是promise.then微任务，不再考虑宏任务了。

​		Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中，原因是在created()钩子函数执行的时候DOM 其实并未进行任何渲染，而此时进行DOM操作无异于徒劳，所以此处一定要将DOM操作的js代码放进Vue.nextTick()的回调函数中。与之对应的就是mounted钩子函数，因为该钩子函数执行时所有的DOM挂载已完成。

​		当项目中你想在改变DOM元素的数据后基于新的dom做点什么，对新DOM一系列的js操作都需要放进Vue.nextTick()的回调函数中；通俗的理解是：更改数据后当你想立即使用js操作新的视图的时候需要使用它。

​		Vue是异步执行dom更新的，一旦观察到数据变化，Vue就会开启一个队列，然后把在同一个事件循环 (event loop) 当中观察到数据变化的 watcher 推送进这个队列。如果这个watcher被触发多次，只会被推送到队列一次。这种缓冲行为可以有效的去掉重复数据造成的不必要的计算和DOm操作。而在下一个事件循环时，Vue会清空队列，并进行必要的DOM更新。		当设置 vm.someData = 'new value'，DOM 并不会马上更新，而是在异步队列被清除，也就是下一个事件循环开始时执行更新时才会进行必要的DOM更新。如果此时你想要根据更新的 DOM 状态去做某些事情，就会出现问题。。为了在数据变化之后等待 Vue 完成更新 DOM ，可以在数据变化之后立即使用 Vue.nextTick(callback) 。这样回调函数在 DOM 更新完成后就会调用。

参考：

- vue.nextTick()方法的使用详解（简单明了）https://blog.csdn.net/zhouzuoluo/article/details/84752280
- https://juejin.cn/post/7089980191329484830#heading-10

### 3.3 插槽slot

1.插槽是使用在子组件中的。

2.插槽是为了将父组件中的子组件模板数据正常显示

```
//home.vue
<test>
     Hello Word
</test>
//test.vue
<a href="#">
	 <slot></slot>
</a>
//当组件渲染的时候，<slot></slot>会被替换为Hello Word
```

3 插槽内可以包含普通文本，也可以包含任何模板代码，包括HTML

```
//home.vue
<test>
	//插槽可以获取到home组件里的内容
	Hello {{enhavo}}
</test>

data(){
	return{
		enhavo:'word'
	}
}
//home.vue
//这里是获取不到name的，因为这个值是传给<test>的
<test name='you'>
    Hello {{name}}
</test>
```

4 插槽跟模板其他地方一样都可以访问相同的实例属性(也就是相同的"作用域")，而不能访问<test>的作用域。原因是父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。

**具名插槽**

​		有时候我们一个组件里需要**多个插槽**，对于这样的情况，`<slot>`元素有一个特殊的特性：`name` ，这个特性可以用来**定义额外的插槽**

​		如果一个`<slot>`不带`name`属性的话，那么它的`name`默认为`default`。在向具名插槽提供内容的时候，我们可以在`<template>`元素上使用`v-slot`指令，并以参数的形式提供其名称

具名插槽的缩写(2.6.0新增)

​		跟 `v-on` 和 `v-bind` 一样，`v-slot` 也有缩写，即把参数之前的所有内容 `(v-slot:)` 替换为字符 `#`。例如 `v-slot:header` 可以被重写为 `#header`：

**作用域插槽**

我们可以在父组件中使用slot-scope 特性从子组件获取数据， 前提是需要在子组件中使用:data=data  先传递data 的数据。

**动态插槽**

动态指令参数也可以用在v-slot上，来定义动态的插槽名：

```
<base-layout>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</base-layout>
```

### 3.4 lazyload

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

## (四) 基础

### 5.1 Vue2

**1 指令**

​		v-text：设置标签文本值(textContent)

​		v-html：设置标签的innerHtml

​		v-on(@)：为元素绑定事件

​		v-show：针对表达式的真假，控制元素的显示与隐藏（有就执行`transition`没有就display:none）

​		v-if：针对表达式的真假，控制元素的显示与隐藏（操作dom）

​		v-bind(:)：设置元素属性(src,title,class)

​		v-for：v-for 具有比 v-if 更高的优先级，这意味着 v-if 将分别重复运行于每个 v-for 循环中

​		v-model：获取和设置表单元素(input|textarea|button|datalist)的值

```js
<input v-bind:value="something" v-on:input="something=$event.target.value">
```

想要组件 v-model生效 它必须: 1. 接收一个value属性。 2. 在value值改变时 触发input事件。

自定义组件使用：

1. 在你的组件的 props 中定义一个属性，通常叫做 value。
2. 当需要更新 v-model 绑定的值时，你的组件需要触发一个 update:modelValue 事件，并将新的值作为参数。在 Vue 3 之前，事件名是 input。
3. 在使用你的组件时，使用 v-model 指令绑定一个值。

```
  <input
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
  />
<my-input v-model="message"></my-input>
```

**2 el：挂载点**

​		el的作用是设置vue实例挂载管理的元素；vue会管理el命中的元素以及其后代元素；可以使用其他选择但是建议使用id选择器；可以使用其他双标签，但不能使用html和body。

**3 计算属性**

​		计算属性实际上是一个懒执行的副作用函数。computed = 闭包 + effect() + lazy。 当我们不希望effect立即执行时，通过增加lazy属性延迟执行。

1. 一开始每个 `computed` 新建自己的 `watcher`时，会设置 watcher.dirty = true，以便于 `computed` 被使用时，会计算得到值
2. 当依赖的数据变化了，通知 `computed` 时，会赋值 watcher.dirty = true，此时重新读取 `computed` 时，会执行 `get` 函数重新计算。
3. `computed` 计算完成之后，会设置 watcher.dirty = false，以便于其他地方再次读取时，使用缓存，免于计算。

​		通过为effect添加scheduler调度器函数，在getter中所依赖的响应式数据发生变化时将scheduler中的dirty重置为true。computed 会让 【data依赖】 收集到 【依赖computed的watcher】，从而 data 变化时，会同时通知 computed 和 依赖computed的地方。

```
const computedList = computed(()=>{ return xxx })
// 计算属性不应有副作用，如异步/修改dom
// 应该只读，不应赋值
```

**4 watch**

本质就是观测一个响应式数据，并传递一个回调函数，当修改数据时执行。

vue3中可以通过设置flush定义回调函数执行时机，当flush为post时将其添加到微任务队列中。

```
watch(监听谁，(newValue, oldValue) => {xxx})
watch([监听谁s]，([newValue], [oldValue]) => {xxx})

deep | immediately
```

`watchEffect` 是 vue3 的一个新特性，与 Vue2 中的 `watch` 不同，`watchEffect` 不需要指定要监听的数据，而是会自动追踪函数中使用的响应式数据，并在这些数据发生变化时重新执行回调函数。这种自动追踪的特性可以简化代码，并提高应用的性能。

触发时机：watchEffect：立即执行一次回调函数，并在回调函数中自动收集依赖。每当依赖发生变化时，回调函数都会被重新执行。

​		watch：需要显式指定要监视的响应式数据或计算属性，并在其发生变化时执行回调函数。

依赖追踪：watchEffect：会自动追踪在回调函数中使用的响应式数据或计算属性，并建立依赖关系。当依赖变化时，回调函数将重新执行。

​		watch：需要手动指定要监视的响应式数据或计算属性，只有在指定的数据变化时才会执行回调函数。

回调函数参数：watchEffect：回调函数中没有参数，但可以使用响应式数据和计算属性。

​		watch：回调函数接收两个参数：新值和旧值。可以通过这两个参数来执行特定的操作，例如比较新旧值之间的差异。

**5 this【Vue2 this 能够直接获取到 data 和 methods】  **

以method举例，只要关注initMethod即可，其实整个`initMethods`方法核心就是将`this`绑定到了实例身上，因为`methods`里面都是函数，所以只需要遍历将所有的函数在调用的时候将`this`指向实例就可以实现通过`this`直接调用的效果。

通过`this`直接访问到`methods`里面的函数的原因是：因为`methods`里的方法通过 `bind` 指定了`this`为 `new Vue`的实例(`vm`)。【`bind`函数中主要是做了兼容性的处理，如果不支持原生的`bind`函数，则根据参数个数的不同分别使用`call/apply`来进行`this`的绑定，而`call/apply`最大的区别就是传入参数的不同，一个分别传入参数，另一个接受一个数组。】

通过 `this` 直接访问到 `data` 里面的数据的原因是：data里的属性最终会存储到`new Vue`的实例（`vm`）上的 `_data`对象中，访问 `this.xxx`，是访问`Object.defineProperty`代理后的 `this._data.xxx`。

### 5.2 Vue3

**0 proxy 和 define.property**

- `Proxy`可以直接监听对象而非属性；
- `Proxy`可以直接监听数组的变化；
- `Proxy`有多达13种拦截方法,不限于`apply、ownKeys、deleteProperty、has`等等是`Object.defineProperty`不具备的；
- `Proxy`返回的是一个新对象,我们可以只操作新的对象达到目的,而`Object.defineProperty`只能遍历对象属性直接修改；

`Object.defineProperty (obj, prop, descriptor)` 的问题主要有三个：

- 无法监听数组的变化 `Vue` 把会修改原来[数组](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fso.csdn.net%2Fso%2Fsearch%3Fq%3D%E6%95%B0%E7%BB%84%26spm%3D1001.2101.3001.7020)的方法定义为变异方法。 变异方法例如 `push、pop、shift、unshift、splice、sort、reverse`等，是无法触发 `set` 的。 非变异方法，例如 `filter，concat，slice` 等，它们都不会修改原始数组，而会返回一个新的数组。 `Vue` 的做法是把这些变异方法重写来实现监听数组变化。
- 必须遍历对象的每个属性 使用 `Object.defineProperty` 多数情况下要配合 `Object.keys` 和遍历，于是就多了一层嵌套。 并且由于遍历的原因，假如对象上的某个属性并不需要“劫持”，但此时依然会对其添加“劫持”。
- 必须深层遍历嵌套的对象 当一个对象为深层嵌套的时候，必须进行逐层遍历，直到把每个对象的每个属性都调用 `Object.defineProperty()` 为止。

**1 组件**

组件的本质就是一组dom的封装，用一个函数定义组件，返回值对象（render）就是要渲染的内容。通过判断vnode.type是否为函数判断是否为组件（patch会判断的类型有string、text、Fragment和object）。然后以递归的方式去挂载组件。

​		组件初始化：

- ​		const state  = reactive(data())将数据变为响应式。
- ​		const subTree = render.call(state, state) 将this只想设置为响应式的state，同时将state作为第一个参数传递。
- ​		patch(null, subTree, contianer, anchor) 更新虚拟dom。

​		使用effect()对reactive数据进行实时更新，但是由于effect是同步的，每次数据变化时都会导致渲染器更新，因此需要实现一个调度器，当副作用函数需要被执行时放入一个微任务队列中并对任务进行去重。

```js
const queue = new Set()
let isFlushing = flase //是否正在刷新任务队列
const p = Promise.resolve()
function queueJob(job){
	quque.add(job)
	if(!isFlushing){
		ifFlushing = true
		p.then(()=>{
			try{
				queue.forEach(job=>job())
			}finally{
				isFlushing = false
				queue.clear = 0
			}
		})
	}
}
effect(()={subTree;path()},{scheduler:ququeJob})
```

**2 setup**

​		**scrtpt setup** 是 vue3 的语法糖，简化了组合式 API 的写法，并且运行性能更好。使用 **script setup** 语法糖的特点：

- 属性和方法无需返回，可以直接使用。
- 引入组件的时候，会自动注册，无需通过 components 手动注册。
- 使用 defineProps 接收父组件传递的值。
- useAttrs 获取属性，useSlots 获取插槽，defineEmits 获取自定义事件。
- 默认不会对外暴露任何属性，如果有需要可使用 defineExpose 。

setup函数(取代了onCreated)只会在挂载时被执行一次，它可以返回一个函数作为组件的渲染函数；也可以返回一个对象，将数据暴露给模板使用（可以通过this访问）。它接受两个参数，一个是props数据对象，一个是setupContext与组件接口相关的数据。

​	setupContext包含{emit、slots、attrs、expose}

emit用来发射组件的自定义事件。

slot插槽，与React中的render props相似。将vnode.children作为slots对象添加到setupContext中，在render中通过this.$slot访问。然后对renderContext代理对象的get拦截函数做处理，当读取到slot时返回slot对象。

```
<script setup> 省略原来setup(){return xxx}
```

​	Vue2中，可以通过this来获取当前组件实例；Vue3中setup执行时机是在beforeCreate钩子前自动执行，不指向this，指向undefined，通过getCurrentInstance()获得；

**3 Ref和Reactive**

```
		ref`本质也是`reactive`，`ref(obj)`等价于`reactive({value: obj})
```

1.reactive

​		reactive的参数**必须是一个对象**，不能是单一的值，包括json数据和数组都可以，否则不具有响应式。如果给reactive传递了其他对象（如时间对象），默认情况下修改对象界面不会自动更新，如果想更新，可以通过给对象重新赋值来解决

​		在使用vue3中，使用`reactive`创建的对象或者数组进行赋值时，可以正常赋值，但是**不会触发响应式变化**。每次直接把一个对象或者数组赋值给`reactive`创建的对象或数组时，导致reactive创建的响应式对象被新赋值的直接代理，再vue3中操作的都是proxy代理对象，所以失去了响应式。在vue3中不管是对象还是数组都不能直接将整个数据进行赋值，这样会造成reactive定义的响应式失效。通俗说： 就像对象的地址被替换，就不是原来的那个对象了。

​		解决方法：不是直接赋值，包裹一层；使用ref赋值，包裹了一层对象，*ref重新赋值时，通过.value赋值*

2.ref当我们只想让某个变量实现响应式的时候，采用reactive就会比较麻烦，因此vue3提供了ref方法进行简单值的监听，但并不是说ref只能传入简单值，他的底层是reactive，所以reactive有的，他都有。

- 在`vue`中使用`ref`的值，不用通过`.value`获取（解包）；在`js`中使用`ref`的值，必须通过`.value`获取；

proxy 的使用本身就是对于 对象的拦截， 通过`new Proxy` 的返回值，触发get和set方法，es6的`Reflect`（反射），动态对被代理对象的相应属性进行特定的操作。`proxy`是基于对象的拦截，如果本身是个原始值时，就拦截不到，失去了，所以ref本身实现响应式会使用`.value`。

- ref 从一般对象上解构属性或将属性传递给函数时，不会丢失响应性：当 ref 作为 `浅层响应式对象` 的属性被访问时则不会解包：

​		可以看到，使用ref对一个对象的某个简单数据类型属性进行响应式改造后，通过修改响应式数据不会影响到原始数据。这里有个注意点：修改的这个属性必须是简单数据类型，一个具体的值，不能是引用，如果该属性也是一个对象，则会影响，因为对象--->引用

`ref`和`reactive`都属于递归监听，也就是数据的每一层都是响应式的，如果数据量比较大，非常消耗性能，非递归监听只会监听数据的第一层（shallowRef，shallowReactive）。

**4 toRef**

​		ref类似深拷贝，toref类似浅拷贝。如果使用toRef修改响应式数据会影响到原始数据，数据发生改变，但是界面不会自动更新。

​		toRefs遍历对象中的所有属性，将其变为响应式数据，这是因为`toRef`只能传一个`key`，`toRefs`所达到的效果与`toRef`一样

1. 为何需要ref？
2. 返回值类型，会丢失响应式setup、computed、合成函数，都有可能返回值类型Vue如果不定义ref，用户将自定义ref，反而混乱
3. 为何需要.value？
4. ref是一个对象（不丢失响应式），value存储值通过.value属性的get和set实现响应式用于模板、reactive时，不需要.value，其他情况都需要
5. 为何需要toRef toRefs
6. 初衷：不丢失响应式的情况下，把对象数据进行分解和扩散前提：针对的事响应式对象，不是普通对象注意：不创造响应式，而是延续响应式

**5 toRaw**

有些时候我们不希望数据进行响应式实时更新，可以通过`toRaw`获取`ref`或`reactive`引用的原始数据，通过修改原始数据，不会造成界面的更新，只有通过修改`ref`和`reactive`包装后的数据时才会发生界面响应式变化。

markRaw：与toRaw不同，markRaw包装后的数据永远不会被追踪！

## (五) 生命周期

### 5.1 Vue2



1） beforeCreate -> created

​		初始化vue实例，进行数据观测，此时 data，methods 等内部没有初始化，无法获取响应数据。

2） created

​		完成数据观测，属性与方法的运算，watch、event事件回调的配置。		可调用methods中的方法，**访问和修改data数据**触发响应式渲染dom，可通过computed和watch完成数据计算。此时vm.$el 并没有被创建。

​		常用于自动 ajax 请求、事件监听、定时器开启等。

3）created -> beforeMount

​		判断是否存在el选项，若不存在则停止编译，直到调用vm.$mount(el)才会继续编译		优先级：render > template > outerHTML		vm.el获取到的是挂载DOM的

4）beforeMount

​		在此阶段可获取到vm.el，此阶段vm.el虽已完成DOM初始化，但并未挂载在el选项上。

​		可以获取初始数据，实现函数自执行。

5）beforeMount -> mounted

​		此阶段vm.el完成挂载，vm.$el生成的DOM替换了el选项所对应的DOM

6）mounted

​		vm.el已完成DOM的挂载与渲染，此刻打印vm.$el，发现之前的挂载点及内容已被替换成新的DOM

7）beforeUpdate

​		更新的数据必须是被渲染在模板上的（el、template、render之一）		此时view层还未更新，若在beforeUpdate中再次修改数据，不会再次触发更新方法

​		内存中的数据已经改变，页面上的还没更新。

8）updated

​		完成view层的更新		若在updated中再次修改数据，会再次触发更新方法（beforeUpdate、updated）

9）beforeDestroy

​		实例被销毁前调用，此时实例属性与方法仍可访问

10）destroyed

​		完全销毁一个实例。可清理它与其它实例的连接，解绑它的全部指令及事件监听器		并不能清除DOM，仅仅销毁实例

```
//执行顺序
父组件----beforeCreate
父组件----created
父组件----beforeMount
子组件----beforeCreate
子组件----created
子组件----beforeMount
子组件----mounted
父组件----mounted
父组件----beforeUpdate(beforeDestory)
子组件----beforeUpdate(beforeDestory)
子组件----updated(destoryed)
父组件----updated(destoryed)
```

### 5.2 Vue3





## (六) 通信

- 父子组件之间的通信
- 兄弟组件之间的通信
- 祖孙与后代组件之间的通信
- 非关系组件间之间的通信

**vue中8种常规的通信方案**

1 通过 props 传递

- 适用场景：父组件传递数据给子组件
- 子组件设置props属性，定义接收父组件传递过来的参数
- 父组件在使用子组件标签中通过字面量来传递值

```js
//第一种
defineProps(["page"]);
//第二种 //设置传来值的类型
defineProps({
  page:Number
});
//第三种设置传来值的类型和默认值
defineProps({
  page:{
    type:Number,
    default:2
  }
});
//第四种设置传来值的多种类型
defineProps:{
  page:[String,Number]
}
```

**为何不可以修改伏组件传递的Prop？**

因为Vue是单向数据流，为了保证数据的单向流动，便于对数据的追踪，出现了错误可以更加迅速的定位到错误发生的位置。所有的 prop 都使得其父子 prop 之间形成了一个单向下行绑定：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外变更父级组件的状态，从而导致你的应用的数据流向难以理解。

**Vue是如何监控属性修改并给出警告的？**

​		在组件 initProps 方法的时候，会对props进行defineReactive操作，传入的第四个参数是自定义的set函数，该函数会在触发props的set方法时执行，当props修改了，就会运行这里传入的第四个参数，然后进行判断，如果不是root根组件，并且不是更新子组件，那么说明更新的是props，所以会警告

**2 $emit 触发自定义事件**

- 适用场景：子组件传递数据给父组件
- 子组件通过emit触发自定义事件，emit触发自定义事件，emit触发自定义事件，emit第二个参数为传递的数值
- 父组件绑定监听器获取到子组件传递过来的参数

```html
//Child.vue
this.$emit('add', good)  
//Father.vue
<Children @add="cartAdd($event)" />  
```

3 ref

- 父组件在使用子组件的时候设置ref
- 父组件通过设置子组件ref来获取数据

```html
<Children ref="foo" />  
this.$refs.foo  // 获取子组件实例，通过子组件实例我们就能拿到对应的数据  
```

4 EventBus

- 使用场景：兄弟组件传值
- 创建一个中央事件总线EventBus
- 兄弟组件通过emit触发自定义事件，emit触发自定义事件，emit触发自定义事件，emit第二个参数为传递的数值
- 另一个兄弟组件通过$on监听自定义事件

```js
// 创建一个中央时间总线类  
class Bus {  
  constructor() {  
    this.callbacks = {};   // 存放事件的名字  
  }  
  $on(name, fn) {  
    this.callbacks[name] = this.callbacks[name] || [];  
    this.callbacks[name].push(fn);  
  }  
  $emit(name, args) {  
    if (this.callbacks[name]) {  
      this.callbacks[name].forEach((cb) => cb(args));  
    }  
  }  
}  
// main.js  
Vue.prototype.$bus = new Bus() // 将$bus挂载到vue实例的原型上  
// 另一种方式  
Vue.prototype.$bus = new Vue() // Vue已经实现了Bus的功能 
//child1
this.$bus.$emit('foo')  
//child2
this.$bus.$on('foo', this.handle)  
```

5  parent或parent 或parent或 root

通过共同祖辈`$parent`或者`$root`搭建通信桥连

兄弟组件

```
this.$parent.on('add',this.add)
```

另一个兄弟组件

```
this.$parent.emit('add')
```

6 attrs与attrs 与attrs与 listeners

- 适用场景：祖先传递数据给子孙
- 设置批量向下传属性`$attrs`和 `$listeners`
- 包含了父级作用域中不作为 `prop` 被识别 (且获取) 的特性绑定 ( class 和 style 除外)。
- 可以通过 `v-bind="$attrs"` 传⼊内部组件

7 vuex

- 适用场景: 复杂关系的组件数据传递
- Vuex作用相当于一个用来存储共享变量的容器
- state用来存放共享变量的地方
- getter，可以增加一个getter派生状态，(相当于store中的计算属性），用来获得共享变量的值
- mutations用来存放修改state的方法。
- actions也是用来存放修改state的方法，不过action是在mutations的基础上进行。常用来做一些异步操作

8 消息订阅与发布 (pubsub.js ｜ mit.js)

9 provide 和  inject

在选项式写法中，provide向组件树中注入数据。当被注入的数据发生变化时，后代组件们不会自动更新，即没有响应式。解决办法是，在使用 provide时，用 computed 进行包裹。组合式不需要。

provide：是一个对象，或者是一个返回对象的函数。里面呢就包含要给子孙后代的东西，也就是属性和属性值。

inject：一个字符串数组，或者是一个对象。属性值可以是一个对象，包含from和default默认值。

```html
<script setup>
import { provide } from "vue";
provide("abc", "123");
</script>
<script setup>
import { inject } from "vue";
const abc = inject("abc");
console.log(abc);
</script>
```

## (七) 路由

前端路由的核心，就在于 —— **改变视图的同时不会向后端发出请求**。

### 8.1 模式

**hash** —— 即地址栏 URL 中的#符号（此 hash 不是密码学里的散列运算）。比如这个 URL：`http://www.abc.com/#/hello`，hash 的值为 `#/hello`。它的特点在于：hash 虽然出现在 URL 中，但不会被包括在 HTTP 请求中，对后端完全没有影响，因此改变 hash 不会重新加载页面。【小程序无法使用hash模式】

​		使用window.location.hash属性及窗口的onhashchange事件，可以实现监听浏览器地址hash值变化，执行相应的js切换网页。下面具体介绍几个使用过程中必须理解的要点：

1. hash指的是地址中#号以及后面的字符，也称为散列值。hash也称作锚点，本身是用来做页面跳转定位的。如`http://localhost/index.html#abc`，这里的#abc就是hash；
2. 散列值是不会随请求发送到服务器端的，所以改变hash，不会重新加载页面；
3. 监听 window 的 hashchange 事件，当散列值改变时，可以通过 location.hash 来获取和设置hash值；
4. location.hash值的变化会直接反应到浏览器地址栏；

**触发hashchange事件的几种情况：**

- 浏览器地址栏散列值的变化（包括浏览器的前进、后退）会触发window.location.hash值的变化，从而触发onhashchange事件；
- 当浏览器地址栏中URL包含哈希如 `http://www.baidu.com/#home`，这时按下输入，浏览器发送`http://www.baidu.com/`请求至服务器，请求完毕之后设置散列值为#home，进而触发onhashchange事件；
- 当只改变浏览器地址栏URL的哈希部分，这时按下回车，浏览器不会发送任何请求至服务器，这时发生的只是设置散列值新修改的哈希值，并触发onhashchange事件；
- html中`<a>`标签的属性 href 可以设置为页面的元素ID如 #top，当点击该链接时页面跳转至该id元素所在区域，同时浏览器自动设置 window.location.hash 属性，地址栏中的哈希值也会发生改变，并触发onhashchange事件；

**history** —— 利用了 HTML5 History Interface 中新增的 `pushState()` 和 `replaceState()` 方法。（需要特定浏览器支持）这两个方法应用于浏览器的历史记录栈，在当前已有的 `back`、`forward`、`go` 的基础之上，它们提供了对历史记录进行修改的功能。只是当它们执行修改时，虽然改变了当前的 URL，但浏览器不会立即向后端发送请求。

​		window.history 属性指向 History 对象，它表示当前窗口的浏览历史。当发生改变时，只会改变页面的路径，不会刷新页面。 History 对象保存了当前窗口访问过的所有页面网址。通过 history.length 可以得出当前窗口一共访问过几个网址。 由于安全原因，浏览器不允许脚本读取这些地址，但是允许在地址之间导航。 浏览器工具栏的“前进”和“后退”按钮，其实就是对 History 对象进行操作。

​		在访问二级页面的时候，做刷新操作，会出现404错误，但因为没有 # 号，所以当用户刷新页面之类的操作时，浏览器还是会给服务器发送请求。为了避免出现这种情况，所以这个实现需要服务器的支持，需要把所有路由都重定向到根页面。

​		SPA 虽然在浏览器里游刃有余，但真要通过 URL 向后端发起 HTTP 请求时，两者的差异就来了。尤其在用户手动输入 URL 后回车，或者刷新（重启）浏览器的时候。

- hash 模式下，仅 hash 符号之前的内容会被包含在请求中，如 http://www.abc.com，因此对于后端来说，即使没有做到对路由的全覆盖，也不会返回 404 错误。
- history 模式下，前端的 URL 必须和实际向后端发起请求的 URL 一致，如 http://www.abc.com/book/id。如果后端缺少对 /book/id 的路由处理，将返回 404 错误。

### 8.2 加载跳转

**1 路由跳转方式**

- 声明式  通过使用内置组件<router-link :to="/home">来跳转
- 编程式  通过调用router实例的push方法router.push({ path: '/home' })或replace方法router.replace({ path: '/home' })

**2 路由传参**

meta：路由元信息，写在routes配置文件中。获取方式`this.$route.meta.title`获取。

query：浏览器地址：`http://localhost:8036/home?userId=123` 获取方式：`this.$route.query.userId`

params：注意用params传参，只能用命名的路由（用name访问），如果用path，params不起作用。浏览器地址：`http://localhost:8036/home/123`获取方式：`this.$route.params.userId`(express同理)

区别：

query 传参配置的是 path，而 params 传参配置的是name，在 params中配置 path 无效

query 在路由配置不需要设置参数，而 params 必须设置

query 传递的参数会显示在地址栏中

params传参刷新会无效，但是 query 会保存传递过来的值，刷新不变 ;

**3 动态加载路由**

使用Router的实例方法addRoutes来实现动态加载路由，一般用来实现菜单权限。使用时要注意，静态路由文件中不能有404路由，而要通过addRoutes一起动态添加进去。

**4 route和router的区别**

route是“路由信息对象”，包括path，params，hash，query，fullPath，matched，name等路由信息参数。 而router是“路由实例对象”，包括了路由的跳转方法，钩子函数等。

**5 刷新不会回退**

Vue Router 使用 HTML5 History Interface 默认的 `history.pushState` 方法来改变浏览器的 URL 而不会触发页面刷新。这是单页面应用(SPA)的工作原理，它们通过 JavaScript 来改变浏览器的历史状态和修改页面内容，而不是通过服务器来获取新的页面。

当你在 Vue Router 中从一个路由跳转到另一个路由时，URL 会改变，但页面不会刷新。这是因为 Vue Router 捕获了 URL 的变化，然后通过 JavaScript 动态地改变页面内容。

然而，当你手动刷新页面时，浏览器会向服务器发送一个新的请求，请求当前的 URL。服务器返回对应的页面，所以你看到的是你刷新后的 URL 对应的页面，而不是你之前所在的页面。

**6 切换router滚动顶部**

在router中配置scrollBehavior（）{return {top:0}}

### 8.3 导航守卫

- 导航被触发。
- 在失活的组件里调用离开守卫`beforeRouteLeave(to,from,next)`。
- 调用全局的`beforeEach( (to,from,next) =>{} )`守卫。
- 在重用的组件里调用 `beforeRouteUpdate(to,from,next)` 守卫。
- 在路由配置里调用`beforeEnter(to,from,next)`路由独享的守卫。
- 解析异步路由组件。
- 在被激活的组件里调用`beforeRouteEnter(to,from,next)`。
- 在所有组件内守卫和异步路由组件被解析之后调用全局的`beforeResolve( (to,from,next) =>{} )`解析守卫。
- 导航被确认。
- 调用全局的`afterEach( (to,from) =>{} )`钩子。
- 触发 DOM 更新。
- 用创建好的实例调用beforeRouteEnter守卫中传给 next 的回调函数

**注意：**

路由导航守卫都是在Vue实例生命周期钩子函数之前执行的。

参数：to：即将要进入的目标 路由对象。from：当前导航正要离开的路由对象。next：函数，必须调用，不然路由跳转不过去。

afterEach钩子中没有next参数。

beforeRouteEnter导航守卫中可以用this吗？不可以，因为守卫在导航确认前被调用,因此即将登场的新组件还没被创建。可以通过传一个回调给next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数。

### 8.4 跳转方式

```js
//编程式-用JS代码来进行跳转
this.$router.push({ name:‘hello’, query:{ name:‘word’, age:‘11’ } }
//.可用组件router-link来替代a标签
//router-view作为挂载点, 切换不同的路由页面
```

### 8.5 刷新

Vue Router 使用 HTML5 History Interface 默认的 `history.pushState` 方法来改变浏览器的 URL 而不会触发页面刷新。这是单页面应用(SPA)的工作原理，它们通过 JavaScript 来改变浏览器的历史状态和修改页面内容，而不是通过服务器来获取新的页面。

```
pushState(state,'标题'，'相对的URL')//地址栏会显示相对的URL，但并不会真正加载。当回退到该页面时，会触发popState，查看其state内容，如果为null则表示是最初页面。同时每一个假的URL背后应对应服务器上的一个真URL，否则进行刷新时会报404.
```

在某种意义上，调用 `pushState()` 与 设置 `window.location = "#foo"` 类似，二者都会在当前页面创建并激活新的历史记录。（也可以利用windows.history.go()|back()，如果URL发生改变则改变URL的散列值，将location.hash设置为一个新的值并增加到历史记录中，早期的IE不支持。）

当你在 Vue Router 中从一个路由跳转到另一个路由时，URL 会改变，但页面不会刷新。这是因为 Vue Router 捕获了 URL 的变化，然后通过 JavaScript 动态地改变页面内容。

然而，当你手动刷新页面时，浏览器会向服务器发送一个新的请求，请求当前的 URL。服务器返回对应的页面，所以你看到的是你刷新后的 URL 对应的页面，而不是你之前所在的页面。

参考：https://juejin.cn/post/6844903558576341000

### 8.6 源码

**1 vue.use(vueRouter)**

​		Vue提供了插件注册机制是，每个插件都需要实现一个静态的 `install`方法，当执行 `Vue.use` 注册插件的时候，就会执行 `install` 方法，该方法执行的时候第一个参数强制是 `Vue`对象。

​		为了保证 `VueRouter` 只执行一次，当执行 `install` 逻辑的时候添加一个标识 `installed`。用一个全局变量保存 Vue，方便插件对 Vue 的使用。

​		VueRouter 安装的核心是通过 `mixin`，向 Vue app 的所有组件混入 `beforeCreate` 和 `destroyed`钩子函数。**（通过混入的钩子要在原组件钩子前执行）**

并且还在 Vue 添加实例对象

- _routerRoot: 指向 vue 实例
- _router：指向 vueRouter 实例

在 Vue 的 prototype 上初始化了一些 getter

- $router, 当前Router的实例
- $route, 当前Router的信息

​		Vue.util.defineReactive, 这是Vue里面观察者劫持数据的方法，劫持 _route，当 _route 触发 setter 方法的时候，则会通知到依赖的组件。

​		后面通过 `Vue.component` 方法定义了全局的 `<router-link>` 和 `<router-view>` 两个组件。`<router-link>`类似于a标签，`<router-view>` 是路由出口(div标签)，在 `<router-view>` 切换路由渲染不同Vue组件。 最后定义了路由守卫的合并策略，采用了Vue的合并策略。

**2 init VueRouter**

​		 install 的时候会执行执行 VueRouter 的 init 方法（ `this._router.init(this)` ）。init 执行的时候会对 hashchange | popstate 事件进行监听，如果是hash模型则需要slice掉#。

​		然后通过 `history.transitionTo` 做路由过渡。`matcher` 路由匹配器是后面路由切换，路由和组件匹配的核心函数。

​		`transitionTo` 可以接收三个参数 `location`、`onComplete`、`onAbort`，分别是目标路径、路经切换成功的回调、路径切换失败的回调。

​		首先在 router 中找到传入的 location ，调用 match方法得到匹配的 route对象，然后更新当前的 route，接着就执行路经切换成功的回调函数。

​		回调中会调用 replaceHash 或者 pushHash 方法。它们会更新 location 的 hash 值。如果兼容 historyAPI，会使用 history.replaceState 或者 history.pushState。如果不兼容 historyAPI 会使用 window.location.replace 或者window.location.hash。

​		**url 更改后怎么进行组件的渲染**

​		install 的时候将 _router 设置为响应式的。只要 _router 进行了改变，那么就会触发 RouterView 的渲染。（我们在 transitionTo 的回调中更新了 _route）

**3 VueRouter  constructor**

- 定义了一些属性和方法。【options  | beforeHooks  | resolveHooks  | afterHooks 】
- 创建 matcher 匹配函数，这个函数函数很重要，可以查找 route
- 设置默认值和做不支持 H5 history 的降级处理
- 通过switch根据不同的 mode 实例化不同的 History 对象

​		在实例化 vueRouter 的时候，vueRouter 仿照 history 定义了一些api：`push`、`replace`、`back`、`go`、`forward`，还定义了路由匹配器、添加router动态更新方法等。

matcher 匹配函数

​		路由匹配器macther是由create-matcher生成一个对象，其将传入VueRouter类的路由记录进行内部转换，对外提供根据location匹配路由方法——match、注册路由方法——addRoutes。

- match方法：根据内部的路由映射匹配location对应的路由对象route
- addRoutes方法：将路由记录添加到matcher实例的路由映射中

**4 动态路由**



https://juejin.cn/post/6942520773156438023#heading-9

https://juejin.cn/post/6844904064367460366

## (八) 状态管理

### 5.1 VueX

**双向绑定和 vuex 是否冲突**

在严格模式中使用Vuex，当用户输入时，v-model会试图直接修改属性值，但这个修改不是在mutation中修改的，所以会抛出一个错误。当需要在组件中使用vuex中的state时，有2种解决方案：1、在input中绑定value(vuex中的state)，然后监听input的change或者input事件，在事件回调中调用mutation修改state的值2、使用带有setter的双向绑定计算属性。见以下例子（来自官方文档）：

```
<input v-model="message">
computed: { message: { get () { return 
this.$store.state.obj.message }, set (value) { 
this.$store.commit('updateMessage', value) } } }
```

**1.state** 统一定义管理公共数据

​		在任意组件中，通过`this.$store.state.属性名` 来获取公共数据。

​		在模块中,则可以直接省略this而直接写成：`{{$store.state.属性名}}`

```js
const store = new Vuex.Store({
  state: {
    count: 0
  }
})
```

**2.mutations:** 使用它来修改数据

​		通过this.$store.commit('mutation事件名',mapper参数)可以修改state里面的数据。

1. 要修改vuex中的数据,就要使用mutations去修改
2. 在methods里面$store.state.xxx = xxx这种方式虽然可以直接修改数据,但是vue不推荐,并且在严格模式下通过这种方式修改数据,会直接报错
3. Vuex中store数据改变的唯一方法就是mutation

**为什么mutation不能做异步**

​		通俗的理解是它里面装着一些改变数据方法的集合，这是Veux设计很重要的一点，就是把处理数据逻辑方法全部放在mutations里面，使得数据和视图分离。

​		Vuex中所有的状态更新的唯一途径都是mutation，异步操作通过 Action 来提交 mutation实现，这样使得我们可以方便地跟踪每一个状态的变化，从而让我们能够实现一些工具帮助我们更好地了解我们的应用。		每个mutation执行完成后都会对应到一个新的状态变更，这样devtools就可以打个快照存下来，然后就可以实现 time-travel 了。		如果mutation支持异步操作，就没有办法知道状态是何时更新的，无法很好的进行状态的追踪，给调试带来困难。

**3.getters:** 类似于vue中的计算属性

​		在组件中用`this.$store.getters.xxx`来获取getters派生后的的值

​		注意: getter定义的时候,第一个参数是state,不能传第二个参数,派生的值通过return返回

**4.actions:** 类似于methods,用于发起**异步请求**,比如axios

​		我们可以使用Action来修改state，这一点是类似于 mutation的，不同在于：

- action 提交的是 mutation，而不是直接变更状态。
- action 可以包含**任意异步**(例如ajax请求)操作。

​		在组件中通过`this.$store.dispatch('actions的名字', 参数)`来调用action

**5.modules: 模块拆分**

​		拆分模板，把复杂的场景按模块来拆开。

```js
export default new Vuex.Store({
  // state: 用来保存所有的公共数据
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
  	模块名1： {
    		// namespaced为true，则在使用mutations时，就必须要加上模块名
      	namespaced: true, 
  		  state: {},
  			getters: {},
  			mutations: {},
  			actions: {},
  			modules: {}
  	}，
    模块名2： {
        // namespaced不写，默认为false，则在使用mutations时，不需要加模块名
  		  state: {},
  			getters: {},
  			mutations: {},
  			actions: {},
         modules: {}
  	}  
  }
})
```

**6.mapState**

```js
// 1. 导入辅助函数mapState，它是在vuex中定义的一个工具函数。
//  es6 按需导入 import { mapState } from 'vuex' 
import { mapState } from 'vuex'

computed: {
   // 说明1： ...对象 是把对象展开，合并到computed
   // 说明2： mapState是一个函数 
   //  ['数据项1'， '数据项2']
   ...mapState(['xxx'])，
   ...mapState({'新名字': 'xxx'})
}
```



参考：

https://juejin.cn/post/7013325675129995272

### 5.2 Pinia

- pinia它没有mutation,他只有state，getters，action【同步、异步】使用他来修改state数据
- pinia他默认也是存入内存中
- pinia语法上比vuex更容易理解和使用，灵活。
- pinia没有modules配置，每一个独立的仓库都是definStore生成出来的
- pinia state是一个对象返回一个对象和组件的data是一样的语法

## (九) 虚拟Dom

1 提出

​		声明式代码的更新性能消耗=找出差异性的性能消耗+直接修改的性能消耗。因此如果能找出最小化的差异性就可以让声明式代码无限接近命令式代码。但是虚拟DOM的性能理论上不可能比原生JS操作DOM更高。

2 渲染器

```
render(vnode,container) // 将container作为挂载点，递归渲染子节点
```

3 虚拟dom过程

```
1 判断vnode类型，如果不同则先卸载再挂载。
2 patch(n1,n2,container) //不仅可以用来打补丁，也可以进行挂载
3 解决事件冒泡， 屏蔽所有绑定时间晚于事件触发时间的事件处理函数的执行
4 
```

**简单diff：**

diff 算法的目的是根据 key 复用 dom 节点，通过移动节点而不是创建新节点来减少 dom 操作。

对于每个新的 vnode，在旧的 vnode 中根据 key 查找一下，如果没查找到，那就新增 dom 节点，如果查找到了，那就可以复用。

复用的话要不要移动要判断下下标，如果下标在 lastIndex 之后，就不需要移动，因为本来就在后面，反之就需要移动。

最后，把旧的 vnode 中在新 vnode 中没有的节点从 dom 树中删除。

**双端diff：**

双端 diff 是头尾指针向中间移动的同时，对比头头、尾尾、头尾、尾头是否可以复用，如果可以的话就移动对应的 dom 节点。

如果头尾没找到可复用节点就遍历旧的 vnode 数组来查找，然后移动对应下标的节点到头部。

最后还剩下旧的 vnode 就批量删除，剩下新的 vnode 就批量新增。

**快速diff：**

预处理部分，首先会对它进行全等比较：`if (TEXT1 === TEXT2) return`，如果全等旧没有必要进入核心的diff步骤了。除了全等比较，还会对他们进行前缀于后缀的比较。一眼就能看到这两段文本的头部和尾部分别有一段相同的内容。进行增删

然后需要构造一个数组 source，它的长度等于新的一组子节点在经过预处理之后剩余未处理节点的数量，并且source中每个元素的初始值都是-1。

判断是否需要移动定义一个变量 moved 代表当前节点是否需要移动，pos 代表遍历就得子节点得过程中遇到得最大索引值。**如果在遍历过程中遇到得索引值呈现递增趋势，则说明不需要移动；否则需要移动。**

卸载多余节点：添加一个数量表示 patched，表示已经更新过的节点数量。已经更新过的节点数量应该小于等于新的一组子节点中需要更新的节点数量，如果它超过了新的一组子节点中需要更新的节点数量，则说明有多余的节点，应该将它卸载。

如何移动元素*利用最长递增子序列用来得出不需要移动的节点片段* 然后进行重新编号之前，最长递增子序列对应的是 新节点在旧节点列表中的为止。而编号之后，最长递增子序列对应的是 具体的节点

https://juejin.cn/post/7142726009249333261#heading-8

## (十) 双向绑定

​		vue是采用数据劫持结合发布者-订阅者模式的方式，通过Object.defineProperty()来劫持各个属性的setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调来渲染视图。

​		首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，然后在监听器Observer和订阅者Watcher之间进行统一管理的。接着，我们还需要有一个指令解析器Compile，对每个节点元素进行扫描和解析，将相关指令（如v-model，v-on）对应初始化成一个订阅者Watcher，并替换模板数据或者绑定相应的函数，此时当订阅者Watcher接收到相应属性的变化，就会执行对应的更新函数，从而更新视图。

​		因此接下去我们执行以下3个步骤，实现数据的双向绑定：

​		（1）实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。		（2）实现一个订阅者Watcher，每一个Watcher都绑定一个更新函数，watcher可以收到属性的变化通知并执行相应的函数，从而更新视图。		（3）实现一个解析器Compile，可以扫描和解析每个节点的相关指令（v-model，v-on等指令），如果节点存在v-model，v-on等指令，则解析器Compile初始化这类节点的模板数据，使之可以显示在视图上，然后初始化相应的订阅者（Watcher）。

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-f356f2023758b0a503e4200596f941de_720w.webp)

### 5.1 Vue2

1. 基于Object.defineProperty，不具备监听数组的能力，需要重新定义数组的原型来达到响应式。
2. Object.defineProperty 无法检测到对象属性的添加和删除 。需要使用this.$set(this.data,”key”,value’)
3. 由于Vue会在初始化实例时对属性执行getter/setter转化，所有属性必须在data对象上存在才能让Vue将它转换为响应式。
4. 深度监听需要一次性递归，对性能影响比较大。
5. 数组是通过覆盖原型对象上的7个⽅法进行实现。如果通过下标去修改数据，Vue 同样是无法感知的。也要使用特殊的 API 处理。
6. 无法处理像 Map、 Set 这样的集合类型。
7. 带有响应式状态的逻辑不方便复用。数组变异		Object.defineProperty方法可以监听数组中某个索引值的变化，但是无法监听push等方法，同时由于数组长度不固定无法监听后期添加的元素。vue2从 Array.prototype 中继承了数组方法，再通过遍历对数组方法进行重写，在新方法中实际调用原型方法并添加额外功能。

### 5.2 Vue3

1. 基于Proxy和Reflect，可以原生监听数组，可以监听对象属性的添加和删除。
2. 不需要一次性遍历data的属性，可以显著提高性能。
3. 因为Proxy是ES6新增的属性，有些浏览器还不支持,只能兼容到IE11 。

```js
function reactive(obj) {
  return new Proxy(obj, {
    get(target, key) {
      track(target, key)
      return target[key]
    },
    set(target, key, value) {
      target[key] = value
      trigger(target, key)
    }
  })
}

function ref(value) {
  const refObject = {
    get value() {
      track(refObject, 'value')
      return value
    },
    set value(newValue) {
      value = newValue
      trigger(refObject, 'value')
    }
  }
  return refObject
}
```

- 当将一个响应性对象的属性解构为一个局部变量时，响应性就会“断开连接”。因为对局部变量的访问不会触发 get / set 代理捕获。
- 在 `track()` 内部，我们会检查当前是否有正在运行的副作用。如果有，就会查找到存储了所有追踪了该属性的订阅者的 Set，然后将当前这个副作用作为新订阅者添加到该 Set 中。 副作用订阅将被存储在一个全局的 WeakMap<target, Map<key, Set<effect>>> 数据结构中。如果在第一次追踪时没有找到对相应属性订阅的副作用集合，它将会在这里新建。这就是 getSubscribersForProperty() 函数所做的事。
- 在 `trigger()` 之中，我们会再次查找到该属性的所有订阅副作用并全部执行。 这些副作用就是用来执行 diff 算法，从而更新页面的。

```js
//简单实现
0. 副作用函数。
	0.1 cleanup 当同一个副作用函数被多个响应式对象依赖时，需要每次在副作用函数执行前将其从与之关联的集合中删除。
	0.2 副作用函数发生嵌套时，内层副作用函数会覆盖activeEffect的值，因此需要引入effectStack保证嵌套的准确性。
1. 首先创建一个存储副作用函数的桶bucket，定义为Set类型。
	1.1 通过全局变量activeEffect存储被注册的副作用函数，这样即便副作用函数是匿名函数也可以被收集；
	1.2 利用set作为桶会导致副作用函数与被操作目标之间不能建立明确的关系。因此利用weakmap的键作为原始对象，值由set收集副作用函数。
	【注】：Weakmap对key是弱引用，其键只能是Object，不影响垃圾回收器的工作。一旦key被回收，对应的键和值就访问不到了。如果使用map，即便用户对目标对象没有任何引用，这个目标对象也不会被回收，会导致内存溢出。
2. 使用Proxy代理data，并配置get(),set()拦截函数，当get执行时将副作用函数添加到bucket中(trick)，当set执行时，通过forEach取出副作用函数并执行(trigger)。
	2.1 避免递归。在trigger动作发生时增加守卫条件，当trigger触发的effect()与当前执行的相同，则不执行；
```

## (十一) 编译渲染

**1 框架设计思想**

​		设计思想分为运行时、编译时、运行+编译时。其中运行时由于没有编译的过程会导致没办法分析用户提供的内容。而编译时的性能会更好，但是有损灵活性，如Svelte。

​		vue采取的是运行时编译的方法，内部是命令式编程而外部是声明式编程。Vue设计之初是要求性能损耗最小化，因此引入了虚拟DOM。虚拟DOM的性能：声明式更新性能损耗=找出差异的性能消耗+直接修改的性能消耗。

​		框架的大小也是衡量框架的标准之一。因此vue3设计了许多idea缩小代码体积，如：

- ​		vue的警告会配合___DEV__常量的检测，以缩小开发环境和生产环境的体积。
- ​		使用Tree-Shaking，消除永远不会被执行的代码。想要实现Tree-Shaking必须满足模块是ESM。且由于副作用函数的存在会导致很难静态的分析那些是dead code，因此出现了/***PURE\***/
- ​		为了配合vue2的API方式编程，可以通过VUE_OPTION_API_关闭，减少资源体积。

​	**2 渲染器**

​		mount钩子会在渲染器挂载完成时触发。

​		render()（也叫h()）返回一个虚拟DOM对象（vnode），包含tag、props、childern、patchFlag等属性。

​		renderer()接收vnode和container参数。其中，container是一个真实的dom(挂载点)，会将vnode挂载到上面。

```
当我们修改响应式数据时，副作用函数会重新执行完成渲染。
```

​	**3 编译器（DSL）**

​	编译器将模板内容编译成渲染函数并添加到组件对象（render()）上。为了方便寻找更新变化的量，通过编译器进行分析，并通过patchFlag配置动态属性（通过编译器找到哪些节点是变化的）。

- 词法+语法+语义分析

```
//在工程化中，webpack或vite会帮我们把用户侧的源代码拉取过来，我们使用node的readFileSync来代替这一行为。
const code =  fs.readFileSync('./vue.txt','utf-8')
//通过有限状态机，解析器能够自动的在不同的状态间进行迁移的过程，而有限则意味着状态的种类是可枚举完的。
//根据html标签的书写规则来定义状态迁移，当遇到<时，将状态标记为标签开始；伴随着while循环的执行，首次遇到非空字符时，从标签开始状态切换为标签名称状态；当遇到>时，再从标签名称状态切换为标签初始状态。至此形成一个闭环，我们在这一个闭环内记录下的状态集合则称之为一个token。
```

- 生成token流
- 生成模板AST

```
//将虚拟根作为默认的栈顶，这样在扫描实际的tokens时，就能默认作为其子节点了
//依次从tokens中取出，并判断其type类型，如果是tag则作为子节点向原栈顶追加，如果是tagEnd则从栈顶弹出
```

- 将AST转化为Js AST

```
//通过深度优先遍历进行transform(tAst,ctx)【访问者模式】
//在进行节点操作之前，我们还需要动态的给ctx挂载一些状态信息，用以标记当前transform的运行状态，比如当前运行的是哪一颗节点树、当前的节点树的父节点是谁、当前节点的兄弟节点是谁以及当前节点树是父节点的第几个子节点
```

- 将Js AST转化为render函数

```
//创建context，context上包括了若干字符串拼接相关的方法；
//对AST的codegenNode对象进行深度递归，并利用context提供的方法拼接相关字符串；
//返回结果对象，包括code属性，code属性值就是生成的render函数代码字符串。
//AST一个树形结构，每一个节点对应一个html元素
interface AstNode{
  // 元素类型,是html原生还是vue自定义
  type:string; 
  // 元素名称，是div还是h1 
  tag:string;
  // 子节点，h1是div的子节点
  children:AstNode[];
  // 开标签属性内容
  props:{
    type:string;
    name?:string;
    exp?:{
      ...
    }
    ...
  }[];
}
```

**5 卸载**

卸载发生在更新阶段（初次挂载完成后，后续渲染会触发更新）。

卸载过程：根据vnode对象获取与之关联的dom元素，使用原生的dom方法将该元素移除。不能直接使用innerHTML=''，因为容器内部可能由多个组件渲染，这么做不能正确调用钩子；它不会移除dom元素上的事件处理函数。

参考：

https://juejin.cn/post/6995232345749979172

https://juejin.cn/post/6990018362391265287

## (十二) SSR、CSR、SSG、SEO

**SEO：**

SEO就是指按照搜索引擎的算法，提升文章在搜索引擎中的自然排名。

SSR利于SEO，因为不同爬虫工作原理类似，只会爬取源码，不会执行网站的任何脚本（Google除外，据说Googlebot可以运行javaScript）。使用了React或者其它MVVM框架之后，页面大多数DOM元素都是在客户端根据js动态生成，可供爬虫抓取分析的内容大大减少。另外，浏览器爬虫不会等待我们的数据完成之后再去抓取我们的页面数据。服务端渲染返回给客户端的是已经获取了异步数据并执行JavaScript脚本的最终HTML，网络爬中就可以抓取到完整页面的信息。

**SPA：**

​		单页 Web 应用（single page web application，SPA），就是只有一张 Web 页面的应用，是加载单个 HTML 页面并在用户与应用程序交互时动态更新该页面的 Web 应用程序		简单说： Web 不再是一张张页面，而是一个整体的应用，一个由路由系统、数据系统、页面（组件）系统…组成的应用程序，其中路由系统是非必须的。		大部分的 Vue 项目，本质是 SPA 应用，Angular.js、Angular、Vue、React…还有最早的”Pjax”均如此。SPA 时代，主要是在Web端使用了history或hash（主要是为了低版本浏览器的兼容）API，在首次请求经服务端路由输出整个应用程序后，接下来的路由都由前端掌控了，前端通过路由作为中心枢纽控制一系列页面（组件）的渲染加载和数据交互。而上面所述的各类框架则是将以：路由、数据、视图为基本结构进行的规范化的封装。		最早的 SPA 应用，由 Gmail、Google Docs、Twitter 等大厂产品实践布道，广泛用于对SEO要求不高的场景中。		优点：客户端渲染、数据传输量小、减少服务器端压力、交互/响应速度快、前后端完全分离；		缺点：首屏加载慢、对SEO不友好，不利于百度，360等搜索引擎收录快照；

**MPA:**

MPA(multipage application): 多页面应用，即一个web项目就有多个页面（即多个HTML文件）。指有多个独立页面的应用（多个html页面），每个页面必须重复加载js、css等相关资源。多页应用跳转，需要整页资源刷新。

| 组成              | 一个外壳页面和多个页面片段组成                               | 多个完整页面构成                                          |
| ----------------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| 资源共用(css,js)  | 共用，只需在外壳部分加载                                     | 不共用，每个页面都需要加载                                |
| 刷新方式          | 页面局部刷新或更改                                           | 整页刷新                                                  |
| url 模式          | a.com/#/pageone    a.com/#/pagetwo                           | a.com/pageone.html a.com/pagetwo.html                     |
| 用户体验          | 页面片段间的切换快，用户体验良好 由于要一次加载所有的资源(html/js)，故首屏加载慢 | 页面切换加载缓慢，流畅度不够，用户体验比较差 首屏加载很快 |
| 转场动画          | 容易实现                                                     | 无法实现                                                  |
| 数据传递          | 容易实现                                                     | 依赖 url传参、或者cookie 、localStorage等                 |
| 搜索引擎优化(SEO) | 需要单独方案、实现较为困难、不利于SEO检索。                  | 实现方法简易                                              |
| 试用范围          | 高要求的体验度、追求界面流畅的应用                           | 适用于追求高度支持搜索引擎的应用                          |
| 开发成本          | 较高，常需借助专业的框架                                     | 较低，但页面重复代码多                                    |
| 维护成本          | 相对容易                                                     | 相对复杂                                                  |

```
1.在vue.config.js中的 multi-page 模式下构建应用。每个“page”应该有一个对应的 JavaScript 入口文件。其值应该是一个对象，对象的 key 是入口的名字，value 是：entry(main.js), template(index.html), filename(在 dist/ index. html 的输出), title 和 chunks 的对象。
2.统一配置多页，遍历每一个pages
3.修改title，html模版中的title使用模版语法
4.合并第三方库，如果不设置分包,所有node_modules资源都被打包进chunk-vendors
在配置了多页应用时，就不能配置publicPath为./了！（相对路径）否则无法访问到其它页面。
```

https://juejin.cn/post/7054439846927925256

https://juejin.cn/post/7113757268520206350

**SSR：**

​		服务端渲染（Server Side Render）是指一种传统的渲染方式，就是在浏览器请求页面URL的时候，服务端将我们需要的HTML文本组装好，并返回给浏览器，这个HTML文本被浏览器解析之后，不需要经过 JavaScript 脚本的执行，即可直接构建出希望的 DOM 树并展示到页面中。

​		优点：对于SEO友好、首屏加载速度快；

​		缺点：页面重复加载次数高、开发效率低、数据传输量大、服务器压力大；

为什么可以做性能优化：

1、对服务器提出更高的要求，生成虚拟DOM如果相对较长的运行和计算耗时；

2、由于cgi拉取和vdom直出后才吐出HTML页面，FMP虽然提前了，但是FP相对延迟了；

3、相比CSR，SSR渲染后，由于仍然需要进行依赖、vue初始化，页面可交互时间并没有较大改善。

缓存优化：

1、页面级别缓存：vuessr官网给我们提供了一种方法，如果页面并非千人千面，总是为所有用户渲染相同的内容，我们可以利用名为 micro-caching 的缓存策略，来大幅度提高应用程序处理高流量的能力。这通常在 Nginx 层完成，也可以在 Node.js 中实现。

2、组件级别缓存：通过对组件设置serverCacheKey的方式，如果组件serverCacheKey相同，将复用之前渲染的组件产物，不需要重新渲染。

3、减少组件嵌套层次，优化HTML结构：由于组件最初需要在node后端进行VDOM计算和渲染，优化组件层次结构，减少过深曾经的DOM嵌套，可以减少VDOM计算耗时。

4、减少首页渲染数据量：根据业务调整用户首屏可见的所需渲染的数据，其他数据懒加载或异步加载。

5、流式传输：vuessr官网给我们介绍了一种方法，render对象会暴露renderToStream方法，把原有的直出结果以流的形式输出，让我们可以更快的响应数据到客户端，能减少首屏渲染时间，更早开始加载页面资源。（流式传输需要在asyncData执行结束后开始，否则没有数据，这意味着流失传输受限于cgi拉取耗时）

6、分块传输：lucien大佬在tweb大会上给我们带来了新的思路，由模板的语法树， 分析代码的上下文，分析数据和模板间的依赖，用异步数据分割模板，分块逐步输出。（相比流式传输，前置位的cgi数据一旦ready，就会渲染输出，而不需要等待所有的gi拉取到后才开始渲染输出，但是该方案改造成本较大）

7、改造直出算法，不用vue-loader而用自研的aga-loader，将vdom渲染转换为字符串模板，具有更高的渲染性能。

**CSR:**

​		CSR全称是 Client Side Rendering ，代表的是客户端渲染。顾名思义，就是在渲染工作在客户端（浏览器）进行，而不是在服务器端进行。举个例子，我们平时用vue，react等框架开发的项目，都是先下载html文档（不是最终的完全的html），然后下载js来执行渲染出页面结果。

CSR的优势：

前后端分离，前端专注于 UI，服务端专注于逻辑。可以实现局部刷新，无需每次都请求完整页面，用户体验好。给服务器减负，部署简单。交互性好，方便实现各种效果。

CSR的局限：

不利于SEO，爬虫难以爬取内容。首屏渲染慢，渲染前需要加载一堆 js 和 css 文件。客户端负担重。

**SSG:**

​		静态站点生成 (Static-Site Generation，缩写为 SSG)，也被称为预渲染，是另一种流行的构建快速网站的技术。如果用服务端渲染一个页面所需的数据对每个用户来说都是相同的，那么我们可以只渲染一次，提前在构建过程中完成，而不是每次请求进来都重新渲染页面。预渲染的页面生成后作为静态 HTML 文件被服务器托管。SSG ，代表的是静态站点生成。在构建的时候直接把结果页面输出html到磁盘，每次访问直接把html返回给客户端，相当于一个静态资源。

​		SSG 保留了和 SSR 应用相同的性能表现：它带来了优秀的首屏加载性能。同时，它比 SSR 应用的花销更小，也更容易部署，因为它输出的是静态 HTML 和资源文件。这里的关键词是静态：SSG 仅可以用于消费静态数据的页面，即数据在构建期间就是已知的，并且在多次部署期间不会改变。每当数据变化时，都需要重新部署。

​		如果你调研 SSR 只是为了优化为数不多的营销页面的 SEO (例如 /、/about 和 /contact 等)，那么你可能需要 SSG 而不是 SSR。

## (十三) 异步更新

Vue 的异步更新策略通常在下列情况下被触发：

1. 当响应式数据发生变化时。这可能是由于直接更改数据，或者是通过计算属性、观察者或方法导致的数据更改。
2. 当组件的 `props` 发生变化时。当父组件向子组件传递的 `props` 发生变化时，子组件将被更新。
3. 在使用 `$forceUpdate` 方法时。这个方法会立即触发组件的重新渲染，而无论其数据是否发生了变化。

​		一旦这些更改发生，Vue 会把这些更改放入一个队列中，并在下一个事件循环的“微任务”阶段执行这些更改。这种策略允许 Vue 在一个事件循环中批量处理多个更改，而不是立即执行每一个更改。这样可以避免不必要的计算和 DOM 更新，提高性能。

​		当对一个变量进行多次修改时，变量会被通知n次，但是页面只会刷新一次。这是因为 Vue 在一个事件循环中对观察者进行缓冲。当一些观察者在同一个事件循环中多次被触发时，只有在事件循环结束时它们只会被触发一次。

​		需要注意的是，由于 Vue 的这种异步更新策略，你可能无法立即访问更新后的 DOM。如果你需要在数据更改后访问更新后的 DOM，可以使用 Vue 的 `$nextTick` 方法。这个方法返回一个 Promise，你可以在这个 Promise 的 `.then` 回调中访问更新后的 DOM。

```js
this.message = 'Hello, Vue!';
this.$nextTick().then(() => {
  // 这个回调将在 DOM 更新后执行
  console.log(this.$el.textContent);  // 输出 'Hello, Vue!'
});
```

[#vue#]()[#前端#]()[#前端面试#]()[#春招#]()



作者：夏目又三
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网