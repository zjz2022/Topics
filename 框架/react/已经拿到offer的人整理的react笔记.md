# React面经

## 4.1 React和vue的区别

1）相同点

- 都有组件化思想
- 都支持服务器端渲染
- 都有Virtual DOM（虚拟dom）
- 数据驱动视图
- 都有支持native的方案：Vue的weex、React的React native
- 都有自己的构建工具：Vue的vue-cli、React的Create React App

2）区别

```
写在前面：

前端选型无非是考虑包体积和响应速度两种，目前的前端框架都需要编译这一步骤，分为构建时编译（AOT），宿主环境执行时编译（JIT）【区别：JIT首次加载慢于AOT，因为需要先编译，且体积可能大于AOT，因为运行时会增加编译器代码】，Angular提供了两种方式但是没人用。

借助AOT对模板语法编译时的优化，比如vue3由于模板是固定的，因此在编译时可以分析模板语法中的静态部分和动态部分做出优化，Svelte可以利用AOT直接建立这部分的关系，在运行时当自变量发生变化直接驱动UI变化，但是JSX很灵活导致很难进行静态分析。【react采用prepack进行过改进，但2019年放弃了。也尝试过使用forget自动生成等效于memo等的代码的编译器，但使用模板减少了jsx的灵活性，也有人使用millionJS直接将元素绑定在dom上等】。

既然jsx无法实现AOT，那么就采用了vDom进行优化，并把memo等缓存交给程序员进行work。

前端框架分为元素级（svelte），组件级（vue），应用级（react），对于svelte来说，由于可以确定自变量是否变化，如果组件没有使用store则不会引入这一特性，会使得其对于小型应用比react的体积小，对于大型应用由于元素级直接绑定dom导致体积逐渐增大。vue采用模板语法，建立自变量与组件之间的关系，因此可以受益于AOT。react每次从应用的根节点开始遍历，甚至不知道哪个自变量变了就开始更新，导致不需要细粒度更新和AOT，当然也采用了调度，时间切片等进行优化。

框架性能瓶颈：

**react：**

高频率的交互往往会导致明显的性能问题，在 antd 的 Form 组件也使用了将数据下放到每一个 Item 的方式来优化性能，store 中用 useRef 存储数据而不是 useState，antd 内部为每个 Form.Item 定义了 forceUpdate 来强制更新 Item UI。又例如拖拽/resize等事件。此时我们只需要通过操作原生 DOM 的方式来实现对应的逻辑即可。从而绕开高频率的 diff 逻辑。

react 常常因为闭包问题，被各种攻击。认为这是 react 的缺陷。

事实上，原生 DOM 本身在高频交互上也存在明显的性能瓶颈。因此许多前端项目不得不采用抛弃 DOM 渲染的方式来完成整个项目【DOM 换成了 canvas，或者 webGPU..】。但是这些项目我们仍然可以结合 react 来完成，例如著名的前端项目 **Figma**，或者国内有的团队使用 react + skia 的方式来完成一些对性能要求很高的项目

**Solid：**

 为了极致的性能体验，完全弃用了虚拟 DOM，也就意味着，他放弃了跨平台的特性。只把主要精力集中在 web 项目上。也就是说，他的全局生态建设，永远也赶不上 react。

**vue：**

丢失响应式，如解构。
```

- 数据流向的不同。react从诞生开始就推崇单向数据流，而Vue是双向数据流

```
在双向绑定的建立过程中，有一个理想的结果：我们可以轻易的知道数据与 DOM 节点的对应关系，那么通过数据驱动 UI 的形式来开发代码将会变得非常容易。双向绑定采取的措施是递归遍历监听所有数据，依次建立与对应 UI 的绑定关系。这种解决方案所花费的成本主要体现在对数据的处理上，他面临两个问题：
一是数据的变化需要监听，但是某些数据类型的监听在实现上有难度，比如 forceUpdate，比如大量的 Watcher，还有性能损耗更严重的 Deep Watcher。另一个问题就是数据的层级与变化问题，数据层级越深，我们想要深度监听，就得使用递归的方式。当数据发生变化时，部分数据与 UI 的绑定关系需要重新建立「在 vue 中，就是重复依赖收集的过程」，如果数据量过大，或者数据变化频繁，就会有性能风险。
react 把所有的精力都放在了 UI 层。使用我们现在熟知的 diff 算法，当数据发生变化时，react 会创建一个新的虚拟DOM树，与之前的树做对比，找出需要改变的元素。
从总体思路上来说，vue 的主要压力在于处理数据，react 的主要压力在于处理 UI。react 不建立数据与 UI 的对应关系，那么也就意味着另外一个压力的产生，那就是当数据发生变化时，react 并不知道哪一个 UI 发生了变化，于此同时 react 为了保持自己对于 Js 的弱侵入性，也没有在 setState 上进行任何魔改，例如绑定当前上下文从而得知具体哪个组件的 state 发生了变化。[如果进行了这个魔改，diff 的压力会小一些]。因此，每一次的 state 变化，都是整棵 DOM 树的 diff。
Vue2中借鉴了diff算法，vue3中使用Proxy 能够监听数组的变化，能够监听删除对象字段的变化... 于是 Vue3 的底层实现，在数据侧的代码会简洁很多，并且与此同时，Vue 的后续版本，也可以彻底放弃虚拟 DOM 来进一步提高自己的运行性能。但是，依然有一个问题没有解决，那就是深度监听仍然需要递归。当数据量很大的时候，依赖追踪的压力也会逐渐变大，当你的项目变得越来越大，全局数据变得越来越复杂，层级越来越深，他的性能压力也会逐渐变大。因此这也是目前大多数大厂中后台采用React的原因，而面向用户则采用Vue的原因。
```

- 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据

```
Vue2 响应式的特点就是依赖收集，数据可变，自动派发更新，初始化时通过 Object.defineProperty 递归劫持 data 所有属性添加 getter/setter，触发 getter 的时候进行依赖收集，修改时触发 setter 自动派发更新找到引用组件重新渲染。
Vue3 响应式使用原生 Proxy 重构了响应式，一是 proxy 不存在 Vue2响应式存在的缺陷，二是性能更好，不仅支持更多的数据结构，而且不再一开始递归劫持对象属性，而是代理第一层对象本身。运行时才递归，用到才代理，用 effect 副作用来代替 Vue2 里的 watcher，用一个依赖管理中心 trackMap 来统一管理依赖代替 Vue2 中的 Dep，这样也不需要维护特别多的依赖关系，性能上取得很大进步。
React 则是基于状态，单向数据流，数据不可变（需要创建数据的副本来替换掉原数据，为了保证浅比较的正确性），需要手动 setState 来更新，始终保持state的原值不变,在生命周期 shouldComponentUpdate 中，React会对新旧state进行比较，如果直接修改state去用于其他变量的计算，而实际上state并不需要修改，则会导致怪异的更新以及没必要的更新。第二，可追踪修改痕迹，便于排错。而且当数据改变时会以组件根为目录，默认全部重新渲染整个组件树，只能额外用 pureComponent/shouldComponentUpdate/useMemo/useCallback 等方法来进行控制，更新粒度更大一些。
```

- 组件化通信的不同。react中我们通过使用回调函数来进行通信的，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数
- diff算法不同。react主要使用diff队列保存需要更新哪些DOM，得到patch树，再统一操作批量更新DOM。Vue 使用双向指针，边对比，边更新DOM

```
Vue2 是同层比较新老 vnode，新的不存在老的存在就删除，新的存在老的不存在就创建，子节点采用双指针头对尾两端对比的方式，全量diff，然后移动节点时通过 splice 进行数组操作
Vue3 是采用 Map 数据结构以及动静结合的方式，在编译阶段提前标记静态节点，Diff 过程中直接跳过有静态标记的节点，并且子节点对比会使用一个 source 数组来记录节点位置及最长递增子序列算法优化了对比流程，快速 Diff，需要处理的边际条件会更少
React 是递归同层比较，标识差异点保存到 Diff 队列保存，得到 patch 树，再统一操作批量更新 DOM。Diff 总共就是移动、删除、增加三个操作，如果结构发生改变就直接卸载重新创建，如果没有则将节点在新集合中的位置和老集合中的 lastIndex 进行比较是否需要移动，如果遍历过程中发现新集合没有，但老集合有就删除
```

- vue3 做了自己的一套编译优化处理方式。

3）其他

- React的核心理念是用一个hooks解决所有问题，vue的理念是解决不了就新增api

React一直在淡化hooks（useEffect）和生命周期的联系，甚至淡化其与组件的关系。 如在严格模式下，dev环境会触发多次useEffect的回调，目的是想让开发者将useEffect看做针对某个数据源的同步过程。

【如果react支持keepalive，从生命周期的角度理解，effect回调应该执行，从状态角度理解不应该执行】

react的更新策略是掌握在开发者自己手中的，可以主动开启并发更新，对更新做结果优化缓存优化及渲染优化；vue是自动收集依赖的精准更新，没有并发更新特性

## 4.2 Immutable

**1 Immutable**

​		Immutable.js 源自 Facebook ，一个非常棒的不可变数据结构的库。使用另一套数据结构的 API，将所有的原生数据类型转化成Immutable.js 的内部对象,并且任何操作最终都会返回一个新的`Immutable`值

`Immutable` 实现的原理是 `Persistent Data Structure`（持久化数据结构）:

- 用一种数据结构来保存数据
- 当数据被修改时，会返回一个对象，但是新的对象会尽可能的利用之前的数据结构而不会对内存造成浪费

其出现场景在于弥补 Javascript 没有不可变数据结构的问题，通过 structural sharing来解决的性能问题，内部提供了一套完整的 Persistent Data Structure，还有很多易用的数据类型，如`Collection`、`List`、`Map`、`Set`、`Record`、`Seq`，其中：

- List: 有序索引集，类似 JavaScript 中的 Array
- Map: 无序索引集，类似 JavaScript 中的 Object
- Set: 没有重复值的集合

主要方法：

- fromJS()：将js数据转化成Immutable数据；
- toJS()：将一个Immutable数据转换为JS类型的数据；
- is()：对两个对象进行比较
- get(key)：对数据或对象取值

使用 `Immutable`可以给 `React` 应用带来性能的优化，主要体现在减少渲染的次数

在做`react`性能优化的时候，为了避免重复渲染，我们会在`shouldComponentUpdate()`中做对比，当返回`true`执行`render`方法

`Immutable`通过`is`方法则可以完成对比，而无需像一样通过深度比较的方式比较

**2 Immer**

​		深层次的对象在没有修改的情况仍然能保证严格相等。这也是它另外一个特点：深层嵌套对象的结构共享相比与 Immer.js，Immutable.js 的不足：

- 自己维护一套数据结构、JavaScript 的数据类型和 Immutable.js 需要相互转换，有入侵性
- 他的操作结果需要通过 toJS 方法才能得到原生对象，这样导致在开发中需要时刻关注操作的是原生对象还是 Immutable.js 返回的结果
- 库的体积大约在 63KB、而 Immer.js 仅有12KB
- API 丰富、学习成本较高

immer 缺点：

- 兼容性：对于不支持`proxy`的浏览器使用`defineProperty`实现，在性能上为`proxy`的两倍

## 4.3 无状态组件

有状态组件： 是一个class类，继承componet  （用于需要一些状态去存储和修改数据）

无状态组件： 是一个es6写的箭头函数函数，并不继承 componet（用于一些简单的逻辑，比如，父组件向子组件传属性值）

​     （1） 最大的区别是无状态组件，无法使用state，因为state是继承 componet

​     （2）无状态组件，没有生命周期函数，生命周期函数是基于state的

​		通常，函数（`function`）与类（`class`）最大的区别是：是否能够维护自己的数据（即状态）。函数基本上仅关注动作（`action`），而不关心数据的维护，不用维持一个状态，不用把自己的数据保存在内存中。函数使用的数据是从外部获取（或者不获取数据），函数运行时，会完成一系列的动作，最后将结果返回（也可能不返回，仅仅是完成指定的动作）。相对而言，类有能力维护状态（保存数据），也可以定义自己的一系列动作。

​		一般来说，函数的速度较快，适合用于做表现层，而类能够处理复杂逻辑和状态，适合做逻辑层和数据层。所以，对于 `React` 来说，一般选择函数来无状态组件，得到所谓的无状态函数（`stateless function`），好处是渲染的速度快，所以多使用无状态组件，尽量不要让数据散落在各个组件中。数据集中管理可以更好的保持数据的一致性和可维护性。

​		有状态组件就是使用类来生成。类可以有自己的状态，维护自己的数据，也是完全符合有状态组件的要求。但是类相对来说速度比函数慢，影响渲染的性能，同时数据过于分散会给后期的维护带来比较大的困难（这也是为什么状态过多时要使用 `Redux` 的原因），因此要尽量控制有状态组件的数量。当然，类也可以生成无状态组件，但是既然不需要维护状态的工作，用函数能完成得更好，其实也就没有必要使用类来做无状态组件。

**在无状态组件每一次函数上下文执行的时候，react用什么方式记录了hooks的状态？**

​		React 使用了一个叫做 "Fiber" 的数据结构来跟踪组件的状态和其它信息。每个函数组件都有一个与之相关的 Fiber，它的 hooks 是按照声明顺序存储在一个数组中。在组件的不同渲染阶段，React 会利用这个 Fiber 和 hooks 数组来追踪和更新每个 hook 的状态。

## 4.4 Hooks

Hook 是 React 16.8 的新增特性。它可以让你在不编写 class 的情况下使用 state 以及其他的 React 特性(钩子函数)。为了解决难以重用和共享组件中的与状态相关的逻辑、this的学习成本、逻辑复杂的组件难以开发与维护（当我们的组件需要处理多个互不相关的 local state 时，每个生命周期函数中可能会包含着各种互不相关的逻辑在里面）。

- 只能在函数内部的最外层调用 `Hook` ，不要在循环、条件判断或者子函数中调用；
- 只能在 `React` 的函数组件中调用 `Hook` ，不要在其他 `JavaScript` 函数中调用。

参考：

https://juejin.cn/post/6857139132259532814

### 4.4.1 useState

**function函数组件中的useState，和 class类组件 setState有什么区别？**

​		`useState` 与 `setState` 的最大区别在于函数组件中的 `useState` 不会合并更新的状态，而类组件的 `setState` 会。此外，`useState` 返回的状态更新函数保证在组件的生命周期内保持不变，而 `setState` 的回调函数可能在组件重新渲染时变化。

**为什么两次传入useState的值相同，函数组件不更新?**

​		当传递给 `useState` 的值与当前状态相同时，React 将跳过渲染和子组件的重新渲染。这是一个优化，因为重新渲染会带来额外的性能开销。如果你需要强制渲染，可以使用 `forceUpdate`，或者更改状态值的引用类型（例如，对于对象和数组）。

【setState(obj)如果obj地址不变，那么React就认为数据没有变化。】

**setState 拿不到最新的 state**

​		函数组件每次`state`变化重渲染，都是新的函数，拥有自身唯一不变的`state`值，即`memoizedState`上保存的对应的`state`值。（**capture value**特性）。

​		这也是为什么明明已经`setState`却拿不到最新的`state`的原因，渲染发生在state更新之前，所以state是当次函数执行时的值，可以通过`setState`的回调或`ref`的特性来解决这个问题。

**为什么组件都重渲染了，数据不会重新初始化？**

​		可以先从业务上理解，比如两个select组件，初始值都是未选中，select_A选中选项后，select_B再选中，select_A不会重置为未选，只有刷新页面组件重载时，数据状态才会初始化为未选。

​		知道`state`状态是怎样保存的之后，其实就很好理解了。**重渲染≠重载，组件并没有被卸载，****`state`****值仍然存在在fiber节点中。并且****`useState`****只会在组件首次加载时初始化state的值。**

​		常有小伙伴遇到组件没正常更新的场景就纳闷，父组件重渲染子组件也会重渲染，但为什么子组件的状态值不更新？就是因为rerender只是rerender，不是重载，你不人为更新它的`state`，它怎么会重置/更新呢？

ps：面对有些非受控组件不更新状态的情况，我们可以通过改变组件的key值，使之重载来解决。

**React 中 setState 什么时候是同步的，什么时候是异步的**

1、由 React 控制的事件处理程序，以及生命周期函数调用 setState 不会同步更新 state 。只在合成事件如`onClick`等和钩子函数包括`componentDidMount`、`useEffect`等中是“异步”的。

​		这里的“异步”并不是说内部由异步代码实现，其实本身执行的过程和代码都是同步的，只是合成事件和钩子函数的调用顺序在更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”。

​		假如在一个合成事件中，循环调用了`setState`方法`n`次，如果 React 没有优化，当前组件就要被渲染`n`次，这对性能来说是很大的浪费。所以，React 为了性能原因，对调用多次`setState`方法合并为一个来执行。当执行`setState`的时候，`state`中的数据并不会马上更新。

2、React 控制之外的事件中调用 setState 是同步更新的。比如原生 js 绑定的事件，`setTimeout``setInterval` 或者直接在 `DOM` 上绑定原生事件和`Promise.then`等异步事件中会同步更新。

​		每次渲染，函数都会重新执行。我们知道，每当函数执行完毕，所有的内存都会被释放掉。因此想让函数式组件拥有内部状态，并不是一件理所当然的事情。useState就是帮助我们做这个事情,useState利用闭包，在函数内部创建一个当前函数组件的状态。并提供一个修改该状态的方法。

`useState()`是使用 useReducer 构建的。纯函数不能有状态，所以把状态放在钩子里面。

- `initialState` 参数只会在组件的初始化渲染中起作用，后续渲染时会被忽略；
- 如果初始 `state` 需要通过复杂计算获得，则可以传入一个函数，在函数中计算并返回初始的 `state` ，此函数只在初始渲染时被调用。

​		`useState()` 是异步函数 ，我们 setState() 后不会立刻对值进行改变，而是会将其暂时放入 pending 队列中。react 会合并多个 state ，然后值 render 一次，因此一些情况下useState获取不到最新的值。

解决办法：

- 通过对setState传递一个回调函数，回调函数会保证其拿到最新的值。
- 通过Ref，但是ref.current 值的改变，是无法通过 useEffect()，useCallback()来监控到的，因为useRef创建的ref对象在整个组件生命周期内保持不变，即使ref的.current属性改变时。因此，useEffect或useCallback无法直接监听ref的改变，因为他们依赖值的更改来重新运行。在useEffect或useCallback的依赖项数组中添加ref.current没有意义，因为ref对象本身没有改变。但是，你可以结合状态钩子（useState）来监听useRef的.current属性的变化

**执行useState 后发生了什么**

1. 首先生成调用函数生成一个更新对象，这个更新对象带有任务的优先级、fiber实例等。
2. 再把这个对象放入更新队列中，等待协调。
3. react会以优先级高低先后调用方法，创建Fiber树以及生成副作用列表。
4. 在这个阶段会先判断主线程是否有时间，有的话先生成`workInProgress tree`并遍历之。
5. 之后进入调教阶段，将`workInProgress tree`与`current Fiber`对比，并操作更新真实dom。

**mountState**

​		首先会得到初始化的`state`，将它赋值给`hook`对象的 `memoizedState`和`baseState`属性，然后创建一个`queue`对象，里面保存了负责更新的信息。

```
//useState和useReducer触发函数更新的方法都是dispatchAction,useState
const [ number , setNumber ] = useState(0)
//dispatchAction 就是 setNumber , dispatchAction 第一个参数和第二个参数，已经被bind给改成currentlyRenderingFiber和 queue,我们传入的参数是第三个参数action
```

​		无论是类组件调用`setState`,还是函数组件的`dispatchAction` ，都会产生一个 `update`对象，里面记录了此次更新的信息，然后将此`update`放入待更新的`pending`队列中，`dispatchAction`第二步就是判断当前函数组件的`fiber`对象是否处于渲染阶段，如果处于渲染阶段，那么不需要我们在更新当前函数组件，只需要更新一下当前`update`的`expirationTime`即可。

​		如果当前`fiber`没有处于更新阶段。那么通过调用`lastRenderedReducer`获取最新的`state`,和上一次的`currentState`，进行浅比较，如果相等，那么就退出，这就证实了为什么`useState`，两次值相等的时候，组件不渲染的原因了，这个机制和`Component`模式下的`setState`有一定的区别。

​		如果两次`state`不相等，那么调用`scheduleUpdateOnFiber`调度渲染当前`fiber`，`scheduleUpdateOnFiber`是`react`渲染更新的主要函数。

**updateState**

​		当一个hook里使用三次`setState`产生的`update`会暂且放入`pending queue`，在下一次函数组件执行时候，三次 `update`被合并到 `baseQueue`。

​		接下来会把当前useState或是useReduer对应的hooks上的baseState和baseQueue更新到最新的状态。会循环baseQueue的update，复制一份update,更新expirationTime，对于有足够优先级的update（上述三个setNumber产生的update都具有足够的优先级），我们要获取最新的state状态。，会一次执行useState上的每一个action。得到最新的state。

### 4.4.2 useEffect

**如何初次渲染不更新useEffect？**

```
你可以引入一个额外的 state 变量作为标记来跳过第一次的运行。
const [isFirstRender, setIsFirstRender] = useState(true);
useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false);
    } else {
      // 在组件更新后执行你的副作用
      console.log('This will not run on the first render');
    }
  }, [count]);  // 这里依赖 count 变量
也可以自定义一个hooks
const useUpdateEffect = (fn: Function, inputs: any[]) => {
    const didMountRef = useRef(false);
    useEffect(() => {
      if (didMountRef.current) fn();
      else didMountRef.current = true;
    }, inputs);
  };
```

**dep为数组时会发生什么**

由于react出于性能考虑用了Object.is来做浅比较，因此检测不到深层结构。

useEffect监听数据变化时，只有在数组元素类型为基本数据类型时可以起到作用。

useEffect 会检测两次监测的对象 内存地址是否相同,相同就跳过,不同才会执行useEffect

```js
//解决方法
const MyComponent = ({ arrayProp }) => {
  const serialized = JSON.stringify(arrayProp); //通过js的序列化实现
  useEffect(() => {
  }, [serialized]);
}
这种方法的问题是，对于大数组，序列化可能会很消耗性能。另外，这种方法也不能处理数组中包含循环引用的情况。
对于更复杂的情况，你可能需要使用一些库，如lodash的_.isEqual函数，结合useRef和useEffect来手动实现深度比较。
```

​		useEffect用于处理大多数副作用，useEffect第一个参数接受一个回调函数，默认情况下，useEffect会在第一次渲染和更新之后都会执行，相当于在componentDidMount和componentDidUpdate两个生命周期函数中执行回调。

​		其中的回调函数会在render执行之后在调用(渲染时异步调用，渲染完成后再执行)，确保不会阻止浏览器的渲染，这跟componentDidMount和componentDidUpdate是不一样的，他们会在渲染时同步执行。useEffect的特点：

- 有两个参数 callback 和 dependencies 数组
- 如果 dependencies 不存在，那么 callback 每次 render 都会执行
- 如果 dependencies 存在，只有当它发生了变化， callback 才会执行
- useEffect的第二个参数为一个空数组，初始化调用一次之后不再执行，相当于componentDidMount。

```
//如果某些特定值在两次重渲染之间没有发生变化，你可以跳过对 effect 的调用，这时候只需要传入第二个参数
//回调函数中可以返回一个清除函数，这是effect可选的清除机制，相当于类组件中componentwillUnmount生命周期函数。清理规则：首次渲染不会进行清理，会在下一次执行前，清除上一次的副作用；卸载阶段也会执行清除操作。
```

**mountEffect**

​		mountEffect里的pushEffect 创建effect对象，挂载updateQueue。首先创建一个 `effect` ，判断组件如果第一次渲染，那么创建 `componentUpdateQueue` ，就是`workInProgress`的`updateQueue`。然后将`effect`放入`updateQueue`中。

​		`effect list` 可以理解为是一个存储 `effectTag` 副作用列表容器。它是由 `fiber` 节点和指针 `nextEffect` 构成的单链表结构，这其中还包括第一个节点 `firstEffect` ，和最后一个节点 `lastEffect`。 		`React` 采用深度优先搜索算法，在 `render` 阶段遍历 `fiber` 树时，把每一个有副作用的 `fiber` 筛选出来，最后构建生成一个只带副作用的 `effect list` 链表。 在 `commit` 阶段，`React` 拿到 `effect list` 数据后，通过遍历 `effect list`，并根据每一个 `effect` 节点的 `effectTag` 类型，执行每个`effect`，从而对相应的 `DOM` 树执行更改。

**updateEffect**

`useEffect` 做的事很简单，判断两次`deps` 相等，如果相等说明此次更新不需要执行，则直接调用 `pushEffect`,这里注意 `effect`的标签，`hookEffectTag`,如果不相等，那么更新  `effect` ,并且赋值给`hook.memoizedState`，这里标签是 `HookHasEffect | hookEffectTag`,然后在`commit`阶段，`react`会通过标签来判断，是否执行当前的 `effect` 函数。

**useLayoutEffect**

u		seEffect 是官方推荐拿来代替 componentDidMount / componentDidUpdate / componentWillUnmount 这 3 个生命周期函数的，但其实他们并不是完全等价，useEffect 是在浏览器渲染结束之后才执行的，而这三个生命周期函数是在浏览器渲染之前同步执行的，React 还有一个官方的 hook 是完全等价于这三个生命周期函数的，叫 useLayoutEffect。

​		在大多数情况下，我们都可以使用useEffect处理副作用，但是，如果副作用是跟DOM相关的，就需要使用useLayoutEffect。useLayoutEffect中的副作用会在DOM更新之后同步执行。

​		由于 JS 线程和浏览器渲染线程是互斥的，即使内存中的真实 DOM 已经变化，浏览器也没有立刻渲染到屏幕上，此时会进行收尾工作，同步执行对应的生命周期方法，我们说的componentDidMount，componentDidUpdate 以及 useLayoutEffect(create, deps) 的 create 函数(已经可以拿到最新的 DOM 节点)都是在这个阶段被同步执行。commit阶段的操作执行完，浏览器把发生变化的 DOM 渲染到屏幕上，到此为止 react 仅用一次回流、重绘的代价，就把所有需要更新的 DOM 节点全部更新完成。浏览器渲染完成后，浏览器通知 react 自己处于空闲阶段，react 开始执行自己调度队列中的任务，此时才开始执行 useEffect(create, deps) 的产生的函数。

**在副作用函数中处理异步请求：**

在副作用中编写 `fetch` 调用是一个 [请求数据的流行方式](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fwww.robinwieruch.de%2Freact-hooks-fetch-data%2F)，尤其是在完全客户端的应用中。 然而，这是一种非常手动的方法，它有很大的缺点：

- **副作用不在服务器上运行。** 这意味着初始服务器渲染的 HTML 将仅包含没有数据的加载状态。 客户端计算机必须下载所有 JavaScript 并渲染你的应用，然后才发现它现在需要加载数据。 这不是很有效。
- **直接在副作用中请求可以轻松创建 “网络瀑布”。** 你渲染父组件，它获取一些数据，渲染子组件，然后它们开始获取数据。 如果网络不是很快，这比并行获取所有数据要慢得多。
- **直接在副作用中请求通常意味着你没有预加载或缓存数据。** 例如，如果组件卸载然后再次挂载，则它必须再次获取数据。
- **这不是很符合人体工程学。** 在以一种不会出现像 [竞态条件](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fmaxrozen.com%2Frace-conditions-fetching-data-react-with-useeffect) 这样的错误的方式编写 `fetch` 调用时，涉及到相当多的样板代码。

这个缺点列表并不是 React 特有的。 它适用于使用任何库在挂载上获取数据。 与路由一样，要做好数据获取并非易事，因此我们推荐以下方法：

- **如果你使用** [框架](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Freact.nodejs.cn%2Flearn%2Fstart-a-new-react-project%23production-grade-react-frameworks)**，请使用其内置的数据请求机制。** 现代 React 框架集成了高效的数据请求机制，不会出现上述问题。
- **否则，请考虑使用或构建客户端缓存。** 流行的开源解决方案包括 [React 查询](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Ftanstack.com%2Fquery%2Flatest)、[useSWR](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fswr.vercel.app%2F) 和 [React 路由 6.4+。](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fbeta.reactrouter.com%2Fen%2Fmain%2Fstart%2Foverview) 你也可以构建自己的解决方案，在这种情况下，你可以在后台使用副作用，但添加用于删除重复请求、缓存响应和避免网络瀑布的逻辑（通过预加载数据或提升 路由的数据要求）。

**全局或可变值可以是依赖吗？**

**像** [`location.pathname`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Fdeveloper.mozilla.org%2Fen-US%2Fdocs%2FWeb%2FAPI%2FLocation%2Fpathname) **这样的可变值不能是依赖。** 它是可变的，因此它可以完全在 React 渲染数据流之外随时更改。 更改它不会触发组件的重新渲染。 因此，即使你在依赖中指定它，React 也不会知道在副作用发生变化时重新同步它。 这也违反了 React 的规则，因为在渲染期间读取可变数据（计算依赖时）会破坏 [渲染的纯粹。](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Freact.nodejs.cn%2Flearn%2Fkeeping-components-pure) 而是，你应该使用 [`useSyncExternalStore`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Freact.nodejs.cn%2Flearn%2Fyou-might-not-need-an-effect%23subscribing-to-an-external-store) 读取和订阅外部可变值

**像** [`ref.current`](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Freact.nodejs.cn%2Freference%2Freact%2FuseRef%23reference) **这样的可变值或你从中读取的内容也不能是依赖。**`useRef` 本身返回的引用对象可以是依赖，但它的 `current` 属性是有意可变的。 它让你 [在不触发重新渲染的情况下跟踪某些内容。](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Freact.nodejs.cn%2Flearn%2Freferencing-values-with-refs) 但是因为改变它不会触发重新渲染，它不是一个 React 值，并且 React 不会知道在它改变时重新运行你的副作用。

### 4.4.3 useContext

​		接收一个 context 对象（React.createContext 的返回值）并返回该 context 的当前值。当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。

​		当组件上层最近的 <MyContext.Provider> 更新时，该 Hook 会触发重渲染，并使用最新传递给 MyContext provider 的 context value 值。即使祖先使用 React.memo 或 shouldComponentUpdate，也会在组件本身使用 useContext 时重新渲染。

​		useContext不能实现精准更新，想要减少二次渲染，可以使用Memo，利用第二个参数做比较（位运算），使用第三方库。。

```js
//类组件
const {Provider, Consumer} = React.createContext(defaultValue);
//创建一个 Context 对象。当 React 渲染一个订阅了这个 Context 对象的组件，这个组件会从组件树中离自身最近的那个匹配的 Provider 中读取到当前的 context 值。
//只有当组件所处的树中没有匹配到 Provider 时，其 defaultValue 参数才会生效。这有助于在不使用 Provider 包装组件的情况下对组件进行测试。注意：将 undefined 传递给 Provider 的 value 时，消费组件的 defaultValue 不会生效。
<Provider value={/*共享的数据*/}>
    /*里面可以渲染对应的内容*/
</Provider>
<Consumer>
  {value => /*根据上下文  进行渲染相应内容*/}
</Consumer>
//hooks
// createContext主要功能是创建一个context，提供Provider和Consumer。Provider主要将context内容暴露出来，Consumer可以拿到对应context的Provider暴露的内容使用。
const Context = createContext()
<UserContext.Provider value={'chuanshi'}>
  <ComponentC />
</UserContext.Provider>
//每个 Context 对象都会返回一个 Provider React 组件，它允许消费组件订阅 context 的变化。
//Provider 接收一个 value 属性，传递给消费组件。一个 Provider 可以和多个消费组件有对应关系。多个 //Provider 也可以嵌套使用，里层的会覆盖外层的数据。
//当 Provider 的 value 值发生变化时，它内部的所有消费组件都会重新渲染。Provider 及其内部 consumer 组件都不受制于 shouldComponentUpdate 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
<UserContext.Consumer>
  {(user) => (
    <div>
      User context value {user}
    </div>)}
</UserContext.Consumer>
//这里，React 组件也可以订阅到 context 变更。这能让你在函数式组件中完成订阅 context。
//这需要函数作为子元素（function as a child）这种做法。这个函数接收当前的 context 值，返回一个 React 节点。传递给函数的 value 值等同于往上组件树离这个 context 最近的 Provider 提供的 value 值。如果没有对应的 Provider，value 参数等同于传递给 createContext() 的 defaultValue。
当需要多处进行消费时，通过 useContext(Context(React.createContext 的返回值))
//当前的 context 值由上层组件中距离当前组件最近的 <MyContext.Provider> 的 value prop 决定。
```

**原理：**

​		`useContext`的原理类似于观察者模式。`Provider`是被观察者， `Consumer`和`useContext`是观察者。当`Provider`上的值发生变化， 观察者是可以观察到的，从而同步信息给到组件。

​		在技术层面上，Provider组件在其内部创建了一个特殊的React对象，这个对象存储了Context的当前值。当组件被渲染时，React就会使用这个对象来决定useContext应该返回什么值。当你改变Provider的值时，React就会重新渲染所有使用了这个Context的组件，以保证它们总是获取到最新的值。

​		具体来说，在更新状态时, 由`ContextProvider`节点负责查找所有`ContextConsumer`节点, 并设置消费节点的父路径上所有节点的`fiber.childLanes`, 保证消费节点可以得到更新。深度优先遍历所有的子代 fiber ，然后找到里面具有 dependencies 的属性，这个属性中挂载了一个元素依赖的所有 context，对比 dependencies 中的 context 和当前 Provider 的 context 是否是同一个；如果是同一个，它会创建一个更新，设定高 fiber 的更新优先级，类似于调用 this.forceUpdate 带来的更新

```
	Consumer 指向 context 本身，其生成 fiber 时会识别 REACT_CONTEXT_TYPE 类型然后添加 ContextConsumer tag ，当我们识别到这个 tag ，就会调用 updateContextConsumer 进行处理。updateContextConsumer 中的逻辑是先通过 prepareToReadContext 和 readContext 获取最新的 context 的值，再把最新的值传入子组件进行更新操作：
```

**一些点：**

- 当创建了一个Context对象，在React渲染出了订阅这个对象的组件（这里是组件B），它能获取到组件树中距离最近Provider中value的值。当没有匹配到Provider的时候创建时传递的初始值会生效。如果value的值是undefined初始值不生效。
- Provider 及其内部 consumer 组件都不受制于 `shouldComponentUpdate` 函数，因此当 consumer 组件在其祖先组件退出更新的情况下也能更新。
- 通过新旧值检测来确定变化，使用了与 Object.is 相同的算法。

**配合 useReducer 做状态管理：**

​		将 dispatch 函数作为 context 的 value，共享给页面的子组件，在 useReducer 结合 useCountext，通过 context 把 dispatch 函数提供给组件树中的所有组件使用，而不是通过 props 添加回调函数到方式一层层传递。

```js
import React, { useReducer, useContext, createContext } from 'react';

// 初始状态
const initialState = {
  isLoggedIn: false,
};

// action类型
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';

// reducer函数
function loginReducer(state, action) {
  switch (action.type) {
    case LOGIN:
      return { ...state, isLoggedIn: true };
    case LOGOUT:
      return { ...state, isLoggedIn: false };
    default:
      return state;
  }
}

// 创建一个context
const LoginContext = createContext();

// 创建一个Provider组件
function LoginProvider({ children }) {
  const [state, dispatch] = useReducer(loginReducer, initialState);
  
  return (
    <LoginContext.Provider value={{ state, dispatch }}>
      {children}
    </LoginContext.Provider>
  );
}

// 在其他组件中使用这个Context
function LoginComponent() {
  const { state, dispatch } = useContext(LoginContext);
  
  return (
    <div>
      <p>User is {state.isLoggedIn ? 'logged in' : 'logged out'}.</p >
      <button onClick={() => dispatch({ type: LOGIN })}>Log In</button>
      <button onClick={() => dispatch({ type: LOGOUT })}>Log Out</button>
    </div>
  );
}

// 使用LoginProvider在应用中共享状态
function App() {
  return (
    <LoginProvider>
      <LoginComponent />
    </LoginProvider>
  );
}
```

### 4.4.4 其他

**1 useRef**

`Refs` 是一个获取 `DOM` 节点或 `React` 元素实例的工具。在 `React` 中 `Refs` 提供了一种方式，允许用户访问 `DOM` 节点或 `render` 方法中创建的 `React` 元素。

`mountRef`初始化很简单, 创建一个ref对象， 对象的`current` 属性来保存初始化的值，最后用`memoizedState`保存`ref`，完成整个操作。

函数组件更新useRef做的事情更简单，就是返回了缓存下来的值，也就是无论函数组件怎么执行，执行多少次，hook.memoizedState内存中都指向了一个对象

```
类组件
//当 ref 属性用于 HTML 元素时，构造函数中使用 React.createRef() 创建的 ref 接收底层 DOM 元素作为其 current 属性；
createRef 每次渲染都会返回一个新的引用，而 useRef 每次都会返回相同的引用(persist)。
//当 ref 属性用于自定义 class 组件时，ref 对象接收组件的挂载实例作为其 current 属性；
//不能在函数组件上使用 ref 属性，因为他们没有实例。但可以改成 class 组件，React.forwardRef 进行包装
函数组件
//useRef 返回一个可变的 ref 对象，其 current 属性被初始化为传入的参数（ initialValue ）。返回的 ref 对象在组件的整个生命周期内保持不变。
 const inputRef = useRef(null);
 return ( <input ref={inputRef} type="text" onChange={handleChange} />)
注意：refObj.current
//1 被引用对象的值在重新渲染之间保持不变。
//2 更新被引用对象的值不会触发重新渲染。
```

**useRef和ref的区别：**

`useRef` 用于创建引用对象，本质上就是一个js对象(js对象每次渲染会重新执行)，而 `ref` 用于访问 DOM 节点或将 `render` 方法中的 react 组件分配给引用对象。另外，可以使用 `useRef` hook 或 `createRef` 函数创建 `ref`，这是其他方法无法实现的。

`useRef` 可以用来引用任何类型的对象，React `ref` 只是一个用于引用 DOM 元素的 DOM 属性。

**useRef获取前一次的值**

1. useRef保持引用不变；
2. 函数式组件的声明周期决定，jsx的渲染比useEffect早；
3. 手动修改ref.current并不会触发组件的重新渲染；

拿到前一个值这件事，想到了什么？

​		想到了class react中的生命周期`shouldComponentUpdate(nextProps,nextState)`中比较前后两次属性是否相同来做优化，减少渲染次数，和`componentWillReceiveProps(nextProps)`比较子组件前后两次属性值的变化来执行某些方法。

**React.forwardRef作用 **  如果需要访问自己组件的Ref，需要使用forwardRef

- 转发refs到DOM组件
- 在高阶组件中转发refs

解决函数组件不能直接传递ref的问题。这是因为使用`ref`会脱离**React的控制**。比如：**DOM聚焦** 需要调用`input.focus()`，直接执行`DOM API`是不受`React`控制的。但为了保证应用的健壮，`React`也要尽可能防止他们失控。

首先来看**不失控**的情况：

- 执行`ref.current`的`focus`、`blur`等方法
- 执行`ref.current.scrollIntoView`使`element`滚动到视野内

那**失控**的情况：

- 执行`ref.current.remove`移除`DOM`
- 执行`ref.current.appendChild`插入子节点

限制失控：基于dom封装的组件(低阶组件)是可以直接把ref指向dom，「高阶组件」无法直接将ref指向DOM，这一限制就将「ref失控」的范围控制在单个组件内，不会出现跨越组件的「ref失控」

当 `ref` 对象内容发生变化时，`useRef` 并不会通知你。变更 `.current` 属性不会引发组件重新渲染。如果想要在 `React` 绑定或解绑 `DOM` 节点的 `ref` 时运行某些代码，则需要使用回调 `ref` 来实现.

```js
const inputEl = useRef(null);
  const onButtonClick = () => {
    // `current` 指向已挂载到 DOM 上的文本输入元素
    inputEl.current.focus();
  };
```

**useImperativeHandle** 的第一个参数是定义 current 对象的 ref，第二个参数是一个函数，返回值是一个对象，即这个 ref 的 current 对象

​		在介绍 useImperativeHandle 之前一定要清楚 React 关于 ref 转发（也叫透传）的知识点，是使用 React.forwardRef 方法实现的，该方法返回一个组件，参数为函数（props callback，并不是函数组件），函数的第一个参数为父组件传递的 props，第二给参数为父组件传递的 ref，其目的就是希望可以在封装组件时，外层组件可以通过 ref 直接控制内层组件或元素的行为useImperativeHandle 可以让你在使用 ref 时自定义暴露给父组件的实例值。

​		通常与forwardRef一起使用，暴露之后父组件就可以通过 ` selectFileModalRef.current?.handleCancel();`来调用子组件的暴露方法。

**2 useReducer**

​		useReducer 是一个用于状态管理的 Hook Api。是useState 的替代方案。它接收一个形如 (state, action) => newState 的 reducer，并返回当前的 state 以及与其配套的 dispatch 方法。useReducer 这个 Hooks 在使用上几乎跟 Redux一模一样，唯一缺点的就是无法使用 redux 提供的中间件。

​		在某些场景下，useReducer 会比 useState 更适用，例如 state 逻辑较复杂且包含多个子值，或者下一个 state 依赖于之前的 state 等。并且，使用 useReducer 还能给那些会触发深更新的组件做性能优化，因为你可以向子组件传递 dispatch 而不是回调函数 。

```js
const [state, dispatch] = useReducer(reducer, initialState, init);
//它接受 Reducer 函数和状态的初始值作为参数.第3参数它是一个回调函数且一定要返回一个对象数据,当然你也可以直接返回一个值也可以。如果useReducer它有第3个参数，则第2个参数就没有意义，它以第3个参数优先，第3个参数，惰性初始化，提升性能(调用的时候初始化数据)
//返回一个数组。数组的第一个成员是状态的当前值，第二个成员是发送 action  的 dispatch 函数。
//计数器实例：
const initialState = 0;
const reducer = (state, action) => { //为了避免重复渲染，会定义在组件外进行创建
  switch (action) {
    case 'increment':
      return state + 1
    default:
      return state}}
function UseReducerHook (){
    const [count, dispatch] = useReducer(reducer, initialState);
    return (<div>
            <div>Count - {count}</div>
            <button onClick={() => dispatch('increment')}>增加</button>
      		</div>)}
```

由于 `Hooks` 可以提供共享状态和 `Reducer` 函数，所以它在这些方面可以取代 `Redux` 。但是它没法提供中间件（ `middleware` ）这样高级功能。

**3 useCallback** 为 useMemo 的语法糖

**useCallback后的函数 组件会重新分配地址吗?**

​		其实 **useCallback 需要配合经过优化的并使用引用相等性去避免非必要渲染的子组件**时，它才能发挥它的作用。`useCallback`的真正目的是在于缓存每次渲染时内联函数的实例，这样方便配合上子组件的`shouldComponentUpdate`或者`React.memo`起到减少不必要的渲染的作用，父子俩层一定需要配对使用，缺了一个都可能导致性能不升反“降”，毕竟无意义的浅比较也是要消耗那么一点的性能消耗的。**不管是否使用****`useCallback`****，都无法避免重新创建内部函数。**

​		使用持久化的 function 的 Hook，理论上，可以使用 usePersistFn 完全代替 useCallback。在某些场景中，我们需要使用 useCallback 来记住一个函数，但是在第二个参数 deps 变化时，会重新生成函数导致函数地址变化。使用 ref 的能力保证函数地址永远不会变化，子组建不会因为函数所需要的变量而重新渲染

```
function usePersistFn(fn) {
  if (typeof fn !== 'function') {
    console.error('param is not a function')
  }

  const fnRef = useRef(fn)
  fnRef.current = useMemo(() => fn, [fn])

  const persistFn = useRef()
  if (!persistFn.current) {
    persistFn.current = function (...args) {
      return fnRef.current.apply(this, args)
    }
  }

  return persistFn.current
}
```

**UseCallBack 基础**

​		把内联回调函数及依赖项数组作为参数传入 useCallback，它将返回该回调函数的 memoized 版本，该回调函数仅在某个依赖项改变时才会更新，避免非必要渲染。

```js
let lastCallback;
let lastCallbackDependencies; 
function useCallback(callback,dependencies){ 
    if (lastCallbackDependencies) { 
        let changed = !dependencies.every((item,index)=>{ 
            return item === lastCallbackDependencies[index]; 
        });
    } else { 
        // 第一次(即lastCallbackDependencies为undefined)
        // 或者非第一次但没有传入依赖项(即dependencies为[]) 
        lastCallback = callback;
        lastCallbackDependencies = dependencies;
    } 
    return lastCallback;
}
```

`useEventCallback`是在React中通常用于确保事件处理器的行为的一种Hook。它的主要目的是解决事件处理函数中的闭包问题。

当你在组件中使用函数时，如果这个函数引用了组件的state或props，那么它就会“捕获”那个特定的state或props。这就是所谓的"闭包"。因此，如果你在一个事件处理器中使用这样的函数，并且你希望它总是引用最新的state或props，那么你就需要用到`useEventCallback`。

`useEventCallback`的基本使用形式如下：

```
import { useEventCallback } from 'react-event-callback-hook';

function MyComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useEventCallback(() => {
    console.log(count);
    setCount(count + 1);
  }, [count]);

  return <button onClick={handleClick}>Click me</button>;
}
```

在上述代码中，`handleClick`函数总是引用最新的`count`状态，即使点击事件发生在状态改变之前。因此，它总是打印出最新的状态值。

```js
function useEventCallback(fn, dependencies) {
    const ref = useRef(() => {
        throw new Error('Cannot call an event handler while rendering.');
    });

    // 根据依赖去更新 ref ，保证最终调用的函数是最新的
    useEffect(() => {
        ref.current = fn;
    }, [fn, ...dependencies]);

    // useCallback 返回的结果不会改变
    return useCallback(() => {
        const fn = ref.current;
        return fn();
    }, [ref]);
}
```

**4 useMemo**

​		接受两个参数，分别是：“创建”函数 和 依赖项数 ，如果不传依赖数组，传入的函数每次都会重新执行计算；如果传空的依赖数组，则返回值被初始化后，不会再变化。在组件首次加载和重渲染期间执行。**同步方法，不能异步调用。**

- 相当于vue里的计算属性
- useMemo  缓存的结果是回调函数中return回来的值，主要用于缓存计算结果的值，应用场景如需要计算的状态。
- useCallback  缓存的结果是函数，优化针对于子组件渲染，主要用于缓存函数，应用场景如需要缓存的函数，因为函数式组件每次任何一个state发生变化，会触发整个组件更新，一些函数是没有必要更新的，此时就应该缓存起来，提高性能，减少对资源的浪费；另外还需要注意的是，useCallback应该和React.memo配套使用，缺了一个都可能导致性能不升反而下降。

原理：

mountMemo：初始化`useMemo`，就是创建一个`hook`，然后执行`useMemo`的第一个参数,得到需要缓存的值，然后将值和`deps`记录下来，赋值给当前`hook`的`memoizedState`

updateMemo：在组件更新过程中，我们执行`useMemo`函数，做的事情实际很简单，就是判断两次 `deps`是否相等，如果不想等，证明依赖项发生改变，那么执行 `useMemo`的第一个函数，得到新的值，然后重新赋值给`hook.memoizedState`,如果相等 证明没有依赖项改变，那么直接获取缓存的值。

在update阶段中，`areHookInputsEqual` 函数接受两个依赖项数组 `nextDeps` 和 `prevDeps`。它首先检查两个数组的长度是否相等，如果不相等，将在开发模式下发出警告。然后，它遍历数组并使用 `is` 函数（类似于 `Object.is`）逐个比较元素。如果发现任何不相等的元素，函数将返回 `false`。否则，返回 `true`。

不过这里有一点，值得注意，`nextCreate()`执行，如果里面引用了`usestate`等信息，变量会被引用，无法被垃圾回收机制回收，就是闭包原理，那么访问的属性有可能不是最新的值，所以需要把引用的值，添加到依赖项 `dep` 数组中。每一次`dep`改变，重新执行，就不会出现问题了。

**React.memo**

​		React.memo 函数是一个高阶组件，通常我们用它来包裹一个组件（函数的入参）它会检查入参组件的props的变更，相同的props会渲染相同的结果（跳过本次渲染操作并复用上一次的渲染结果）如果其包裹的是函数组件，并且该函数组件内部使用到了某些hook（类似useState、useContext等），当state或者context发生变化时，该组件仍会重新渲染。

​		默认情况下，memo函数只会对复杂对象做浅比较，如果想要手动控制比对过程，可以将自定义的比较函数通过第二个参数传入来实现。

### 4.4.5 高阶组件

高阶组件: 其实就是高阶函数, 我们第一一个函数, 里面返回一个有状态组件, 就是高阶组件。高阶组件就像我们吃火锅的锅底, 可以在里面加羊肉、牛肉、蔬菜等各种食物。锅底相当于业务逻辑，食物相当于UI展示，这样可以使我们的业务逻辑层和UI层分类，代买更清晰， 更适合多人开发和维护。

在使用高阶组件的同时，一般遵循一些约定，如下：

- props 保持一致
- 你不能在函数式（无状态）组件上使用 ref 属性，因为它没有实例
- 不要以任何方式改变原始组件 WrappedComponent
- 透传不相关 props 属性给被包裹的组件 WrappedComponent
- 不要再 render() 方法中使用高阶组件
- 使用 compose 组合高阶组件
- 包装显示名字以便于调试

这里需要注意的是，高阶组件可以传递所有的`props`，但是不能传递`ref`

如果向一个高阶组件添加`ref`引用，那么`ref` 指向的是最外层容器组件实例的，而不是被包裹的组件，如果需要传递`refs`的话，则使用`React.forwardRef`

比如：withRouter

### 4.4.6 原理

**多个react-hooks用什么来记录每一个hooks的顺序的 ？ 换个问法！为什么不能条件语句中，声明hooks? hooks声明为什么在组件的最顶部？**

React 使用一个内部的顺序列表（即 Fiber 中的 hooks 数组）来追踪 hook 的声明顺序。这就是为什么 hook 必须按照相同的顺序调用，也就是说，不能在循环、条件或嵌套函数中调用 hook。如果不按照相同的顺序，React 就无法正确地匹配每个 hook 的状态。

**react 是怎么捕获到hooks的执行上下文，是在函数组件内部的？**

React 在执行函数组件时，会设置一个指向当前渲染 Fiber 的全局变量。这个变量将被用来在 hook 函数（如 `useState`、`useEffect`）被调用时获取当前执行上下文，以便正确地关联和更新 hook 的状态。

**哪些hooks会在首次渲染后执行？**

React 提供了许多 Hooks 供我们在函数组件中使用，其中许多在组件首次渲染后都会执行。以下是一些常见的 Hooks：

1. useEffect：这是一个在组件渲染后执行副作用的 Hook。这可能是执行 API 调用、订阅事件、更改 DOM 等。`useEffect` 在首次渲染和每次依赖项更改后都会执行。
2. useLayoutEffect：这个 Hook 类似于 `useEffect`，但它在浏览器执行绘制之前同步触发。它的主要用途是读取布局，并同步触发重新渲染。在浏览器执行绘制之前，`useLayoutEffect` 内部的更新计划将同步刷新。
3. useMemo：这个 Hook 返回一个记忆的值。你可以将一个“创建”函数和一个依赖项数组作为参数传递给 `useMemo`。它将在首次渲染和每次依赖项更改时重新计算记忆的值。
4. useCallback：这个 Hook 返回一个记忆的回调函数。它接受一个内联函数和一个依赖项数组。`useCallback` 将返回一个记忆的版本的回调函数，该函数仅在依赖项更改时才会改变。这在传递回调给经过优化的子组件时非常有用，避免不必要的渲染。

需要注意的是，`useState` 和 `useReducer` 这两个 Hook 在组件首次渲染后不会执行任何操作，而是在渲染过程中提供状态值和更新函数。他们在随后的渲染中可能会触发组件的更新，但并不在首次渲染后“执行”任何操作。

同时，`useRef` 和 `useContext` 在组件渲染时提供值，但不会在组件渲染后执行任何操作。

函数组件初始化：

**1 renderWithHooks 执行函数**

```js
renderWithHooks(
    null,                // current Fiber
    workInProgress,      // workInProgress Fiber
    Component,           // 函数组件本身
    props,               // props
    context,             // 上下文
    renderExpirationTime,// 渲染 ExpirationTime
);
```

​		当function组件初始化时，是没有current树的，之后完成一次组件更新后，会把当前`workInProgress`树赋值给`current`树。

- current树：当完成一次渲染之后，会产生一个current树,current会在commit阶段替换成真实的Dom树。
- workInProgress fiber树: 即将调和渲染的 fiber 树。再一次新的组件更新过程中，会从current复制一份作为workInProgress,更新完毕后，将当前的workInProgress树赋值给current树。

​		`workInProgress.memoizedState`: 在`class`组件中，`memoizedState`存放`state`信息，在`function`组件中，`memoizedState`在一次调和渲染过程中，以**链表**的形式存放`hooks`信息。

​		`workInProgress.expirationTime`: `react`用不同的`expirationTime`,来确定更新的优先级。

**`renderWithHooks`****函数主要作用:**

​		首先先置空即将调和渲染的`workInProgress`树的`memoizedState`和`updateQueue`，在接下来的函数组件执行过程中，要把新的`hooks`信息挂载到这两个属性上，然后在组件`commit`阶段，将`workInProgress`树替换成`current`树，替换真实的`DOM`元素节点。并在`current`树保存`hooks`信息。

​		然后根据当前函数组件是否是第一次渲染，赋予`ReactCurrentDispatcher.current`不同的`hooks`。对于第一次渲染组件，那么用的是`HooksDispatcherOnMount` hooks对象。 对于渲染后，需要更新的函数组件，则是`HooksDispatcherOnUpdate`对象，那么两个不同就是通过`current`树上是否`memoizedState`（hook信息）来判断的。如果`current`不存在，证明是第一次渲染函数组件。

​		接下来，调用`Component(props, secondArg);`执行我们的函数组件。然后，我们写的`hooks`被依次执行，把`hooks`信息依次保存到`workInProgress`树上。

​		接下来，将`ContextOnlyDispatcher`赋值给` ReactCurrentDispatcher.current`，由于`js`是单线程的，也就是说我们没有在函数组件中调用的`hooks`，都是`ContextOnlyDispatcher`对象上`hooks`。这个组件用于判断hooks执行是否在函数组件内，如果不在则抛出异常并捕获。

​		最后，重新置空一些变量比如`currentHook`，`currentlyRenderingFiber`,`workInProgressHook`等。

**2 HooksDispatcherOnMount**

```js
function mountWorkInProgressHook() {
  const hook: Hook = {
    memoizedState: null, 
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null,
  };
```

​		在组件初始化的时候,每一次hooks执行，如useState(),useRef(),都会调用mountWorkInProgressHook。

​		首先每次执行一个`hooks`函数，都产生一个`hook`对象，里面保存了当前`hook`信息,然后将每个`hooks`以链表形式串联起来，并赋值给`workInProgress`的`memoizedState`存放`hooks`链表。`useContext`是唯一一个不需要添加到 hook 链表的 hook 函数

- memoizedState信息：// useState中 保存 state信息 ｜ useEffect 中 保存着 effect 对象 ｜ useMemo 中 保存的是缓存的值和deps ｜ useRef中保存的是ref 对象
- baseQueue : usestate和useReducer中 保存最新的更新队列。
- baseState ： usestate和useReducer中,一次更新中 ，产生的最新state值。
- queue ： 保存待更新队列 pendingQueue ，更新函数 dispatch 等信息。
- next: 指向下一个 hooks对象。

**为什么不能使用条件语句？**

​		因为一旦在条件语句中声明hooks，在下一次函数组件更新，hooks链表结构，将会被破坏，current树的memoizedState缓存hooks信息，和当前workInProgress不一致，如果涉及到读取state等操作，就会发生异常。

**有两个****`memoizedState`**

- `workInProgress / current` 树上的 `memoizedState` 保存的是当前函数组件每个`hooks`形成的链表。
- 每个`hooks`上的`memoizedState` 保存了当前`hooks`信息，不同种类的`hooks`的`memoizedState`内容不同。

**3 updateWorkInProgressHook**

​		对于一次函数组件更新，当再次执行`hooks`函数的时候，比如 `useState(0)` ，首先要从`current`的`hooks`中找到与当前`workInProgressHook`，对应的`currentHooks`，然后复制一份`currentHooks`给`workInProgressHook`,接下来`hooks`函数执行的时候,把最新的状态更新到`workInProgressHook`，保证`hooks`状态不丢失。

- 首先如果是第一次执行hooks函数，那么从current树上取出memoizedState ，也就是旧的hooks。
- 然后声明变量nextWorkInProgressHook，这里应该值得注意，正常情况下，一次renderWithHooks执行，workInProgress上的memoizedState会被置空，hooks函数顺序执行，nextWorkInProgressHook应该一直为null，当前函数组件执行后，当前函数组件的还是处于渲染优先级，说明函数组件又有了新的更新任务，那么循坏执行函数组件，因此nextWorkInProgressHook不为null。
- 最后复制current的hooks，把它赋值给workInProgressHook,用于更新新的一轮hooks状态。

https://juejin.cn/post/6944863057000529933#heading-1



## 4.5 状态管理

### 4.5.1 Redux

```
import { createStore } from 'redux' // 引入一个第三方的方法
const initialState = {counter: 0}
const reducer = (state = initialState, action) => {
   switch (action.type) {
    case "INCREMENT":
   return {...state, counter: state.counter + 1};
}
const store = createStore(reducer)// 创建数据的公共存储区域（管理员）
store.subscribe(() => {
  console.log(store.getState());
})//获取store里面的数据
```

1 action

- type： 标识属性，值是字符串。多个type用action分开
- payload：数据属性，可选。表示本次动作携带的数据
- 特点：只描述做什么JS 对象，必须带有 type 属性，用于区分动作的类型根据功能的不同，可以携带额外的数据，配合该数据来完成相应功能

2 reducer

- 作用初始化状态修改状态
- 修改状态根据传入的旧状态和action，返回新状态，不需要直接修改state公式：(previousState, action) => newState

```
redux 的设计思想就是不产生副作用，数据更改的状态可回溯，所以 redux 中处处都是纯函数
```

3 store：仓库，Redux 的核心，整合 action 和 reducer

特点：

- 一个应用只有一个 store
- 维护应用的状态，获取状态：`store.getState()`
- 创建 store 时接收 reducer 作为参数：`const store = createStore(reducer)`
- 发起状态更新时，需要分发 action：`store.dispatch(action)` — 订阅(监听)状态变化： `const unSubscribe = store.subscribe(() => {})`

​		— 取消订阅状态变化： `unSubscribe()`

**redux的工作流特征。**

Reset. 允许状态的重置。

Revert. 允许回退最近的一次改变。

Sweep. 那些失效的, 错误的actions，可以被删除。

Commit. 把当前状态提交，作为新的初始状态。

**redux-thunk**

用途：处理react的异步操作, 比如正常的一个后台系统, 弹窗关闭, 需要刷新列表等基本操作. 又或者用户进入系统, 先登录, 登陆成功之后, 拿到登陆信息再去做相关请求.

原理：由于store的方法dispatch, 他的参数是一个对象, 类似这种 {type: 'add', payload}, 现在用了这个redux-thunk之后, dispatch的参数可以是一个函数, 在这个函数里面可以dispatch多个action, 所以这个函数又叫creator函数, 来看看他的源码, 它的核心代码其实只有两行，就是判断每个经过它的`action`：如果是`function`类型，就调用这个`function`（并传入 dispatch 和 getState 及 extraArgument 为参数）

为什么需要？其实不需要中间件也可以完成异步操作, 即只直接在业务层代码的相关地方直接发书写, 在请求成功之后再发另一个action, 可是用了中间件之后 我们可以把一些回调放在公共函数里面, 便于调用。

### 4.5.2 Mobx

MobX的核心概念有三个：State(状态)、Actions(动作)、Derivations(派生)



State: MobX通过`observable`标记一个可以被观察的状态并跟踪它们，通过赋值即可实现状态的修改

```js
constructor() {makeObservable(this,{属性}) |  makeAutoObservable(this)}
```

Action：可以理解为任何可以改变State的代码，将所有修改observale的值的代码标记为action

Derivations：

- Computed：计算属性，可以用纯函数的形式从当前可观测的`State`中派生（通过get | set）
- Reactions：当State改变时需要运行的副作用

​		reaction(() => value, (value, previousValue, reaction) => { sideEffect }, options?).		reaction 类似于 autorun，但可以让你更加精细地控制要跟踪的可观察对象。 它接受两个函数作为参数：第一个，data 函数，其是被跟踪的函数并且其返回值将会作为第二个函数，effect 函数，的输入。 重要的是要注意，副作用只会对 data 函数中被访问过的数据做出反应，这些数据可能少于 effect 函数中实际使用的数据。

**模块化开发**

```
class RootStore {
  constructor() {
    this.counterStore = counter
    this.taskStore = task
  }
}
const rootStore = new RootStore()
// context机制的数据查找链  Provider如果找不到 就找createContext方法执行时传入的参数
const context = React.createContext(rootStore)
const useStore = () => React.useContext(context)
// useStore() =>  rootStore  { counterStore, taskStore }
export { useStore }
//使用：const store = useStore()
```

### 4.5.3 zuStand

![img](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/v2-30dc83a66c62f72dba92809e18ca5b54_720w.jpg)

源码分为 React 和 Vanilla

1. Vanilla 层是发布订阅模式的实现，提供了setState、subscribe 和 getState 方法，并且前两者提供了 selector 和 equalityFn 参数，以供在只有原生 JS 模式下的正常使用，但 React 的使用过程中基本只会用该模块的发布订阅功能。
2. React 层是 Zustand 的核心，实现了 reselect 缓存和注册事件的 listener 的功能，并且通过 forceUpdate 对组件进行重渲染。

https://zhuanlan.zhihu.com/p/353135461

**优点：**

​		状态管理最必要的一点就是状态共享。这也是 context 出来以后，大部分文章说不需要 redux 的根本原因。因为context 可以实现最最基础的状态共享。但这种方法（包括 redux 在内），都需要在最外层包一个 Provider。 Context 中的值都在 Provider 的作用域下有效。而 zustand 做到的第一点创新就是：**默认不需要 Provider**。直接声明一个 hooks 式的 useStore 后就可以在不同组件中进行调用。

​		由于没有 Provider 的存在，所以声明的 useStore 默认都是单实例，如果需要多实例的话，zustand 也提供了对应的 Provider 的书写方式，这种方式在组件库中比较常用。 ProEditor 也是用的这种方式做到了多实例。

​		状态管理除了状态共享外，另外第二个极其必要的能力就是状态变更。在复杂的场景下，我们往往需要自行组织相应的状态变更方法，不然不好维护。这也是考验一个状态管理库好不好用的一个必要指标。hooks 的 setState 是原子级的变更状态，hold 不住复杂逻辑；而 useReducer 的 hooks 借鉴了 redux 的思想，提供了 dispatch 变更的方式，但和 redux 的 reducer 一样，这种方式没法处理异步，且没法互相调用，一旦遇上就容易捉襟见肘。而在 zustand 中，函数可以直接写，完全不用区分同步或者异步，一下子把区分同步异步的心智负担降到了 0。

​		另外一个让人非常舒心的点在于，**zustand 会默认将所有的函数保持同一引用**。所以用 zustand 写的方法，默认都不会造成额外的重复渲染。

​		而状态变更函数的最后一个很重要，但往往又会被忽略的一点，就是**方法需要调用当前快照下的值或方法**。在常规的开发心智中，我们往往会在异步方法中直接调用当前快照的值来发起请求，或使用同步方法进行状态变更，这会有极好的状态内聚性。

​		最后一点要夸 zustand 的是，它可以直接集成 useReducer 的模式。

## 4.6 Router

### 4.6.1 Router

`Router`组件主要做的是通过`BrowserRouter`传过来的当前值，通过`props`传进来的`path`与`context`传进来的`pathname`进行匹配，然后决定是否执行渲染组件，对应的属性如下：

- path 属性：用于设置匹配到的路径
- component 属性：设置匹配到路径后，渲染的组件
- render 属性：设置匹配到路径后，渲染的内容
- exact 属性：开启精准匹配，只有精准匹配到完全一致的路径，才会渲染对应的组件

`NavLink`是在`Link`基础之上增加了一些样式属性，例如组件被选中时，发生样式变化，则可以设置`NavLink`的一下属性：

- activeStyle：活跃时（匹配时）的样式
- activeClassName：活跃时添加的class

`useHistory`可以让组件内部直接访问`history`，无须通过`props`获取

**withRouter**

​		高阶组件中的`withRouter`, 作用是将一个组件包裹进Route里面, 然后react-router的三个对象history, location, match就会被放进这个组件的props属性中。

​		`withRouter`的作用就是, 如果我们某个东西不是一个`Router`, 但是我们要依靠它去跳转一个页面, 比如点击页面的logo, 返回首页, 这时候就可以使用`withRouter`来做.

### 4.6.2 模式

1 Hash模式

`hash` 值改变，触发全局 `window` 对象上的 `hashchange` 事件。所以 `hash` 模式路由就是利用 `hashchange` 事件监听 `URL` 的变化，从而进行 `DOM` 操作来模拟页面跳转。react-router`也是基于这个特性实现路由的跳转。

通过window.addEventListener('hashChange',callback)监听hash值的变化，并传递给其嵌套的组件，然后通过context将location数据往后代组件传递。

### 4.6.3 对比Vue

**1 路由模式**

- Vue-Router支持 history、hash、abstract
- React-Router支持 history、hash、memory

​		Vue Router 中的 **abstract** 模式，是一种不依赖浏览器 history 的路由模式。在 abstract 模式下，Vue Router 会在内存中管理路由，而不会修改浏览器的 URL。

​		使用 abstract 模式的主要场景是在非浏览器环境下使用 Vue Router，比如在 Node.js 服务器端渲染中。在这种情况下，由于没有浏览器的 URL 和 history，不能使用默认的 history 模式或 hash 模式。

​		要使用 abstract 模式，需要在创建 Vue Router 实例时指定 mode 选项为 'abstract'，在 abstract 模式下，可以使用 router.push、router.replace、router.go 等方法进行路由导航，但是不会修改浏览器的 URL。在路由导航完成后，可以使用 router.currentRoute 属性获取当前路由信息。

React的**Memory**模式<MemoryRouter>在内部使用数组存储其位置。与 <BrowserHistory> 和 <HashHistory> 不同，它不与外部源（如浏览器中的历史堆栈）绑定。这使得它非常适合需要完全控制历史堆栈的场景，例如测试。

**2 路由跳转**

- Vue-Router使用<router-link />实现链接式导航
- Vue-Router使用this.$router或useRouter实现编程式导航

```js
// Vue-Router3
this.$router.push("/home")
this.$router.replace("/home")

// Vue-Router4
const router = useRouter()
router.push("/home")
router.replace("/home")
```

- React-Router使用<Link />、<NavLink />实现链接式导航
- React-Router使用history或navigate实现编程式导航

```js
// React-Router4/5 类组件
this.props.history.push("/home")
this.props.history.replace("/home")

// React-Router6 函数组件
const navigate = useNavigate()
navigate("/home")
```

**3 路由渲染**

​		在Vue-Router中，使用 <router-view /> 组件就能把匹配到组件渲染出来，而React-Router需要使用定义路由的<Route />组件或<Outlet />。

**4 路由参数**

Vue-Router 使用router传递参数

1. Vue-Router支持传递query和params两种参数，使用时需要注意以下两点。
2. query传参会在浏览器路径看到，并且刷新页面参数不会丢失。
3. params传参会在浏览器路径看不到，并且刷新页面参数会丢失。并且可以用在普通路由或动态参数路由上。但是需要注意，当应用到动态参数路由上时我们就不能通过params传参了，只能通过params动态传参。

React-Router使用history或navigate传参

1. React-Router支持传递search、params和state三种参数，使用时需要注意以下三点。
2. search传参会在浏览器路径看到，并且刷新页面参数不会丢失。但是参数需要自己获取并处理，一般我们使用URLSearchParams处理。
3. params传参只能应用在动态路由上，普通路由传参不能使用。
4. state传参不会在浏览器路径看到，在history模式下刷新页面参数不会丢失，但是在hash模式下刷新页面参数会丢失。

**5 监听路由变化**

​		Vue-Router和React-Router都支持动态路由，都能通过params获取到动态路由参数。		动态路由在Vue和React中都做了优化，也就是动态参数的变化并不会让组件重新创建和销毁。也就不会触发组件创建、绑定和销毁相关的钩子函数。所以经常会遇到我们写在mounted或者unmounted中的代码不会被重新触发的问题。

​		在Vue中我们可以通过beforeUpdate、updated、beforeRouteUpdate、watch、watchEffect五种方式来监听动态路由参数的变化。		动态路由参数的变化会触发beforeUpdate、updated生命周期函数以及beforeRouteUpdate路由组件内钩子函数。所以上面的例子，通过动态参数获取后台数据的逻辑可以在这些钩子中任选一个加上就可以。推荐使用updated。

​		在`React`中我们可以通过老版本生命周期函数`componentWillReceiveProps、componentWillUpdate、componentDidUpdate`或新版本生命周期函数`getDerivedStateFromProps、getSnapshotBeforeUpdate、componentDidUpdate`以及`watchEffect`四种方式来监听动态路由参数的变化。

​		动态路由参数的变化会触发老版本生命周期函数`componentWillReceiveProps、componentWillUpdate、componentDidUpdate`或新版本生命周期函数`getDerivedStateFromProps、getSnapshotBeforeUpdate、componentDidUpdate`生命周期函数所以上面的例子，通过动态参数获取后台数据的逻辑可以在这些钩子中任选一个加上就可以。推荐使用`componentDidUpdate`。

​		如果是函数组件还可以使用`useEffect`监听路由的方式来监听参数的变化。

**6 路由获取**

Vue任何组件都能获取在Vue中，只要使用了路由，不管是不是路由组件都可以获取到路由（也就是能方便的使用router和route）。

React非路由组件默认获取不到但是在React中，非路由组件是不会自动在props中注入路由相关参数的(也就是在props中没有history、location、match)，这就需要用到withRouter高阶组件了。使用了withRouter后才能在非路由使用history、location、match。当然如果是函数组件我们还可以使用路由相关hooks获取的。

https://juejin.cn/post/7104242876007055396#heading-17

## 4.7 虚拟DOM

**它本质上是实际 DOM 的轻量级内存表示**

### 4.7.1 Render

​		在`render`中，我们会编写`jsx`，`jsx`通过`babel`编译后就会转化成我们熟悉的`js`格式，即React.createElement()。在`react`中，这个元素就是虚拟`DOM`树的节点，接收三个参数：

- type：标签
- attributes：标签属性，若无则为null
- children：标签的子节点

​		这些虚拟`DOM`树最终会渲染成真实`DOM`，`React` 将新调用的 `render`函数返回的树与旧版本的树进行比较，然后进行 `diff` 比较，更新 `DOM`树。

`		render`的执行时机主要分成了两部分：

- 类组件调用 setState 修改状态
- 函数组件通过useState hook修改状态（当数组的值不发生改变了，就不会触发render）
- 类、函数组件重新渲染

**如何提高Render渲染效率**

组件渲染导致子组件渲染（子组件并没有发生任何改变），这时候就可以从避免无谓的渲染，具体实现的方式有如下：

- shouldComponentUpdate通过对比state和props确定是否渲染
- PureComponent通过对 `props` 和 `state`的浅比较结果来实现
- React.memo只能用于函数组件

### 4.7.2 Fiber

**产生背景**

​		在**react16**之前，react通过 jsx 实现的**虚拟dom树**是**树结构（json schema）****的，通过调用 render()以深度优先原则，****递归遍历****这棵树，找出变化了的节点，针对变化的部分操作原生dom。因为是递归遍历，缺点就是这个过程同步不可中断，并且由于****js是单线程**的，大量的逻辑处理会占用主线程过久，浏览器没有时间进行**重绘重排**，就会有渲染卡顿的问题。

​		React16出现之后优化了框架，推出了时间片与任务调度的机制，**js逻辑处理只占用规定的时间**，当时间结束后，不管逻辑有没有处理完，都要把主线程的控制权交还给浏览器渲染进程，进行重绘和重排。而异步可中断的更新需要一定的数据结构在内存中来保存工作单元的信息，这个数据结构就是**Fiber**。

​		fiber树以**链表**结构保存了元素节点的信息【stateNode，child，sibling（兄弟节点），return（父节点）】，每个fiber节点保存了足够的信息，树对比过程可以被中断【每执行完一个 fiber，react 会检查剩余时间，如果没有时间则中断】，当前的fiber树为`current fiber`，在renderer阶段生成的fiber树称为`workInProgress fiber`，两棵树之间**对应的节点**由`alternate`指针相连，react会diff对比这两颗树，最终再进行节点的复用、增加、删除和移动。

​		Fiber 的执行过程分为两个阶段，每次渲染有两个阶段: Reconciliation(协调render阶段)和Commit(提交阶段）。协调的阶段:可以认为是Diff阶段，这个阶段可以被终止，这个阶段会找出所有节点变更，例如节点新增、删除、属性变更等等，这些变重React称之为副作用。提交阶段:将上一阶段计算出来的需要处理的副作用(effects)一次性执行了。这个阶段必须同步执行，不能被打断。

**特点**

- 为每个增加了优先级，优先级高的任务可以中断低优先级的任务。然后**重新**执行优先级低的任务。
- 增加了异步任务，调用requestIdleCallback api，浏览器空闲的时候执行。
- dom diff树变成了链表，一个dom对应两个fiber（一个链表），对应两个队列，这都是为找到被中断的任务，重新执行。

从编码角度来看，`Fiber`是 React内部所定义的一种数据结构(链表，指向为return、child、sibling )，它是 `Fiber`树结构的节点单位，也就是 React 16新架构下的虚拟DOM。

**解决的问题：**

- react16 之前 stack架构，递归遍历组件树成本很高，会造成主线程被持续占⽤，结果就是主线程上的布局、动画等周期性任务就⽆法⽴即得到处理，造成视觉上的卡顿，影响⽤户体验。
- Fiber架构把任务分解，避免主线程的持续占用造成卡顿问题。
- 增量渲染，把渲染任务拆分成多块。
- 更新时候能够暂停，终止，复用渲染任务。
- 给不同类型的更新赋予优先级。

优势：

- 使用 Fiber 节点, 来代替虚拟 DOM 原来的结构。
- 通过 ReactDOM.render() 和 setState 把待更新的任务会先放入队列中, 然后通过 requestIdleCallback 请求浏览器调度。
- 现在浏览器有空闲或者超时了就会调用 performWork 来执行任务：
- 渲染阶段, 协调阶段完成后生成了 WorkInProgress Tree，在有修改的 Fiber 节点中都有一个标签，在 Renderer 阶段循环 WorkInProgress Tree 进行修改节点然后渲染到页面上。

**渲染过程**

1. 首先jsx经过babel的ast词法解析之后编程React.createElement，React.createElement函数执行之后就是jsx对象，也被称为virtual-dom。
2. 不管是在首次渲染还是更新状态的时候，这些渲染的任务都会经过Scheduler的调度，Scheduler会根据任务的优先级来决定将哪些任务优先进入render阶段，比如用户触发的更新优先级非常高，如果当前正在进行一个比较耗时的任务，则这个任务就会被用户触发的更新打断，在Scheduler中初始化任务的时候会计算一个过期时间，不同类型的任务过期时间不同，优先级越高的任务，过期时间越短，优先级越低的任务，过期时间越长。在最新的Lane模型中，则可以更加细粒度的根据二进制1的位置，来决定任务的优先级，通过二进制的融合和相交，判断任务的优先级是否足够在此次render的渲染。Scheduler会分配一个时间片给需要渲染的任务，如果是一个非常耗时的任务，如果在一个时间片之内没有执行完成，则会从当前渲染到的Fiber节点暂停计算，让出执行权给浏览器，在之后浏览器空闲的时候从之前暂停的那个Fiber节点继续后面的计算，这个计算的过程就是计算Fiber的差异，并标记副作用。详细可阅读往期课件和视频讲解，往期文章在底部。
3. 在render阶段：render阶段的主角是Reconciler，在mount阶段和update阶段，它会比较jsx和当前Fiber节点的差异（diff算法指的就是这个比较的过程），将带有副作用的Fiber节点标记出来，这些副作用有Placement（插入）、Update（更新）、Deletetion（删除）等，而这些带有副作用Fiber节点会加入一条EffectList中，在commit阶段就会遍历这条EffectList，处理相应的副作用，并且应用到真实节点上。而Scheduler和Reconciler都是在内存中工作的，所以他们不影响最后的呈现。mount时在render阶段会根据jsx对象构建新的workInProgressFiber树，然后将相应的fiber节点标记为Placement，表示这个fiber节点需要被插入到dom树中，然后会这些带有副作用的fiber节点加入一条叫做Effect List的链表中。在commit阶段会遍历render阶段形成的Effect List，执行链表上相应fiber节点的副作用，比如Placement插入，或者执行Passive（useEffect的副作用）。将这些副作用应用到真实节点上update时：在render阶段会根据最新状态的jsx对象对比current Fiber，再构建新的workInProgressFiber树，这个对比的过程就是diff算法，diff算法又分成单节点的对比和多节点的对比，对比的过程中同样会经历收集副作用的过程，也就是将对比出来的差异标记出来，加入Effect List中，这些对比出来的副作用例如：Placement（插入）、Update(更新)、Deletion（删除）等。在commit阶段同样会遍历Effect List，将这些fiber节点上的副作用应用到真实节点上
4. 在commit阶段：会遍历EffectList，处理相应的生命周期，将这些副作用应用到真实节点，这个过程会对应不同的渲染器，在浏览器的环境中就是react-dom，在canvas或者svg中就是reac-art等。

https://juejin.cn/post/7229552637229498405

### 4.7.3 Diff

**对比vue**

相同点

- 都是两组虚拟dom的对比(react16.8之后是fiber与虚拟dom的对比)
- 只对同级节点进行对比，简化了算法复杂度
- 都用key做为唯一标识，进行查找，只有key和标签类型相同时才会复用老节点
- 遍历前都会根据老的节点构建一个map，方便根据key快速查找

不同点

- react在diff遍历的时候，只对需要修改的节点进行了记录，形成effect list，最后才会根据effect list 进行真实dom的修改，修改时先删除，然后更新与移动，最后插入
- vue 在遍历的时候就用真实dom`insertBefore`方法，修改了真实dom，最后做的删除操作
- react 采用单指针从左向右进行遍历
- vue采用双指针，从两头向中间进行遍历
- react的虚拟diff比较简单，vue中做了一些优化处理，相对复杂，但效率更高

`react`中`diff`算法主要遵循三个层级的策略：

- tree层级

同级元素进行Diff。如果一个DOM节点在前后两次更新中跨越了层级，那么React不会尝试复用他

- conponent 层级

如果是同一个类的组件，则会继续往下`diff`运算，如果不是一个类的组件，那么直接删除这个组件下的所有子节点，创建新的

- element 层级

对于比较同一层级的节点们，每个节点在对应的层级用唯一的`key`作为标识

提供了 3 种节点操作，分别为 `INSERT_MARKUP`(插入)、`MOVE_EXISTING` (移动)和 `REMOVE_NODE` (删除)

**millionJs**

​		优化编译器实现了虚拟节点扁平化和静态树提升，以提高交互式内容的加载时间和渲染速度。它针对DSL编译的输出：hyperscript，一组在运行时构建虚拟节点树的函数调用。之所以使用Hyperscript，是因为它很容易成为DSL编译的目标，但在运行时会以不必要的内存分配为代价。虚拟节点扁平化方法通过在编译步骤中扁平化超脚本中的每个函数调用来解决这个问题，从而消除了在运行时分配内存的需要。在虚拟节点扁平化中，编译器标志被分配来减少运行时计算。随着虚拟节点的扁平化，静态树提升方法通过将不依赖于状态的扁平化超脚本移动到全局JavaScript范围，进一步减少了不必要的内存分配。

Svelte 采用了一种“编译时”方法。在编译阶段，Svelte 会分析组件中的代码，并生成针对性的原生 JavaScript 代码，这些代码负责在运行时直接操作 DOM。换句话说，Svelte 在组件构建阶段就知道如何更新 DOM，而不需要在运行时执行虚拟 DOM 的 diff 操作。这种静态的编译方式让 Svelte 具有更高的性能，因为它避免了在运行时进行虚拟 DOM 操作所带来的开销。Svelte 的这种设计思想允许它生成更为精准和高效的代码，让开发者可以专注于编写简洁、易读的组件代码，同时保持出色的性能。

## 4.8 错误边界

​		错误边界是一种 React 组件，这种组件可以捕获发生在其子组件树任何位置的 JavaScript 错误，并打印这些错误，同时展示降级 UI，而并不会渲染那些发生崩溃的子组件树。错误边界在渲染期间、生命周期方法和整个组件树的构造函数中捕获错误。

​		如果一个 class 组件中定义了 `static getDerivedStateFromError()` 或者 `componentDidCatch()`这两个生命周期方法中的任意一个（或两个）时，那么它就变成一个错误边界。当抛出错误后，使用 `static getDerivedStateFromError()` 渲染备用 UI，使用 `componentDidCatch()` 打印错误信息

## 4.9 事件代理

事件代理：

```
	React 并不会把所有的处理函数直接绑定在真实的节点上。而是把所有的事件绑定到结构的最外层，使用一个统一的事件监听器，这个事件监听器上维持了一个映射来保存所有组件内部的事件监听和处理函数。
	当组件挂载或卸载时，只是在这个统一的事件监听器上插入或删除一些对象。
	当事件发生时，首先被这个统一的事件监听器处理，然后在映射里找到真正的事件处理函数并调用。
	这样做的优点是解决了兼容性问题，并且简化了事件处理和回收机制（不需要手动的解绑事件，React 已经在内部处理了）。但是有些事件 React 并没有实现，比如 window 的 resize 事件。
```

在**********版本中：

1. 所有事件都是委托在id = root的DOM元素中（网上很多说是在document中，17版本不是了）；
2. 在应用中所有节点的事件监听其实都是在id = root的DOM元素中触发；
3. React自身实现了一套事件冒泡捕获机制；
4. React实现了合成事件SyntheticEvent；
5. React在17版本不再使用事件池了（网上很多说使用了对象池来管理合成事件对象的创建销毁，那是16版本及之前）；
6. 事件一旦在id = root的DOM元素中委托，其实是一直在触发的，只是没有绑定对应的回调函数；

​		React**合成事件**机制: React并不是将click事件直接绑定在dom上面,而是采用事件冒泡的形式冒泡到document上面,然后React将事件封装给正式的函数处理运行和处理。

1. 合成事件的监听器是统一注册在document上的,并且仅有冒泡阶段。所以原生事件的监听器响应总是比合成事件的监听器早
2. 阻止原生事件的冒泡后,会阻止合成事件的监听器执行

​		如果DOM上绑定了过多的事件处理函数,整个页面响应以及内存占用可能都会受到影响。React为了避免这类DOM事件滥用,同时屏蔽底层不同浏览器之间的事件系统的差异,实现了一个中间层 - SyntheticEvent

1. 当用户在为onClick添加函数时,React并没有将Click绑定到DOM上面
2. 而是在document处监听所有支持的事件,当事件发生并冒泡至document处时,React将事件内容封装交给中间层 SyntheticEvent (负责所有事件合成)
3. 所以当事件触发的时候, 对使用统一的分发函数 dispatchEvent 将指定函数执行

混合使用时需注意：首先DOM事件监听器被执行,然后事件继续冒泡至document,合成事件监听器被执行。

合成事件**执行时间**：只是合成事件和钩子函数的调用顺序在（setState）更新之前，导致在合成事件和钩子函数中没法立马拿到更新后的值，形式了所谓的“异步”。

**如何在React中使用原生事件**虽然React封装了几乎所有的原生事件,但像:

- Modal开启以后点击其他空白区域需要关闭Modal
- 引入了一些以原生事件实现的第三方库,并且互相之间需要有交互

由于原生事件需要绑定在真实DOM上，所以一般是在componentDidMount阶段/ref的函数执行阶段进行绑定操作，在componentWillUnmount阶段进行解绑操作以避免内存泄漏。

```
 componentDidMount() {
     const $this = ReactDOM.findDOMNode(this)
     $this.addEventListener('click', this.onDOMClick, false)
 }
```

https://blog.csdn.net/weixin_48786946/article/details/106877466

https://juejin.cn/post/7068649069610024974

## 4.10 Class组件

**1 this指针丢失**

​		React组件化开发的绑定事件，在return 时的jsx语法中他进行了赋值操作，导致了this的丢失（隐式丢失）。

​		jsx的原理本质上是React.createElement（）而React.createElement（）有三个参数

- 第一个参数html标签的名字
- 第二个参数是传入的标签属性 传入的属性是以键值对的格式传入
- 第三个属性是节点要显示的内容

所以在第二个参数传入标签属性的时候 ，在render时相当于进行了赋值操作， 所以就这这时this就丢失了

解决方法:

1）把要绑定的事件声明为箭头函数，因为箭头函数没有真正的this执行，他取决与环境变量中的this，而环境变量中的this正好是类中的this

2）在constructor里使用bind()来改变事件对象的this指向

**2 与hooks的区别**

hooks优点：

1. 比 HOC 更优雅的逻辑复用方式。HOC 可能会带来嵌套地狱，而 Hooks 可以让你在无需修改组件结构的情况下复用状态逻辑
2. 更加函数式。
3. Hooks 可以更方便的让相关代码写在一起（可阅读性，可维护性更高）。Class Component 则会让相关代码分布在不同的声明周期中，不方便后续的代码维护以及阅读
4. 没有 this 上下文的问题
5. 更方便的依赖执行（useEffect, useMemo）。class component 需要在shouldComponentUpdate, componentDidUpdate... 这些生命周期中各种判断

hooks缺点：

1. 没有统一的错误处理。而 Class Component 中有 componentDidCatch 和 getDerivedStateFromError
2. 只能在最顶层使用 Hook，并且必须确保 Hook 在每一次渲染中都按照同样的顺序被调用
3. 存在过期闭包问题。
4. 副作用函数带来的心智负担。

function 和 class 最大区别只在于UI不一致，两者可以相互转换, 快照合理还是最新值合理，事实上在 class 里也可以拿到快照值，在 function 里也可以拿到最新值，class 里通过触发异步之前保存快照，function 里通过 ref 容器存取最新值。

```
其实就是个经典的函数闭包问题
在异步函数执行前可以对闭包访问的自由变量进行快照捕获：实现快照功能
在异步函数执行中可以通过 ref 读取最新的值
```

**3 生命周期**

**1 constructor**constructor()在React组件挂载之前被调用，在为React.Component子类实现构造函数时，应在其他语句之前调用 super()。【super的作用：将父类的this对象继承给子类】

​		通常，React构造函数仅用于以下两种情况：

- 来初始化函数内部 state
- 为事件处理函数绑定实例

```
如果不初始化 `state` 或不进行方法绑定，则不需要写 `constructor()` , 只需要设置 `this.state` 即可。
不能在 `constructor()`构造函数内部调用 `this.setState()`, 因为此时第一次 `render()`还未执行，也就意味DOM节点还未挂载。
```

**对应的hooks**：我们可以通过调用 `useState` 来初始化 state。如果计算的代价比较昂贵，也可以传一个函数给 `useState`

**2 static getDerivedStateFromProps(nextProps, state)**

​		getDerivedStateFromProps() 在调用 render方法之前调用，在初始化和后续更新都会被调用，返回值：返回一个对象来更新 `state`, 如果返回 `null` 则不更新任何内容。

​		参数： 第一个参数为即将更新的 `props`, 第二个参数为上一个状态的 `state` , 可以比较`props` 和 `state`来加一些限制条件，防止无用的state更新。

注意：`getDerivedStateFromProps` 是一个静态函数，不能使用this, 也就是只能作一些无副作用的操作

**对应的hooks：****可以在****渲染过程中更新 state**，以达到实现 `getDerivedStateFromProps` 的目的。

```
function ScrollView({row}) {
  let [isScrollingDown, setIsScrollingDown] = useState(false);
  let [prevRow, setPrevRow] = useState(null);
  if (row !== prevRow) {
    // Row 自上次渲染以来发生过改变。更新 isScrollingDown。
    setIsScrollingDown(prevRow !== null && row > prevRow);
    setPrevRow(row);
  }
  return `Scrolling down: ${isScrollingDown}`;
}
//React 会立即退出第一次渲染并用更新后的 state 重新运行组件以避免耗费太多性能。
```

**3 render()**

​		`render()` 方法是class组件中唯一必须实现的方法，用于渲染dom, `render()`方法必须返回reactDOM

注意： 不要在 `render` 里面 `setState`, 否则会触发死循环导致内存崩溃

**4 componentDidMount()**

​		`shouldComponentUpdate()` 在组件更新之前调用，可以控制组件是否进行更新， 返回true时组件更新， 返回false则不更新。

​		包含两个参数，第一个是即将更新的 props 值，第二个是即将跟新后的 state 值，可以根据更新前后的 props 或 state 来比较加一些限制条件，决定是否更新，进行性能优化。

​		不要 `shouldComponentUpdate` 中调用 setState()，否则会导致无限循环调用更新、渲染，直至浏览器内存崩溃

**对应的hooks：** React 会等待浏览器完成画面渲染之后才会延迟调用 useEffect，因此会使得额外操作很方便

**shouldComponentUpdate(nextProps, nextState)**[被废弃]

- nextProps: 表示下一个props。
- nextState: 表示下一个state的值。

React中props,state值的变化，会导致组件重新渲染。使用shouldComponentUpdate就是为了减少render不必要的渲染。 返回布尔值，然后做 Virtual DOM 比较，并得出是否需要做真实 DOM 更新

**对应的hooks：**React.memo 等效于 PureComponent，它只浅比较 props。这里也可以使用 useMemo 优化每一个节点。

**5 getSnapshotBeforeUpdate(prevProps, prevState)**

​		getSnapshotBeforeUpdate() 在最近一次的渲染输出被提交之前调用。也就是说，在 render 之后，即将对组件进行挂载时调用。

```
它可以使组件在 DOM 真正更新之前捕获一些信息（例如滚动位置），此生命周期返回的任何值都会作为参数传递给 componentDidUpdate()。如不需要传递任何值，那么请返回 null
```

**6 componentDidUpdate(prevProps, prevState, snapshot)**

​		`	componentDidUpdate()` 会在更新后会被立即调用。首次渲染不会执行

​		包含三个参数，第一个是上一次props值。 第二个是上一次state值。如果组件实现了 `getSnapshotBeforeUpdate()` 生命周期（不常用），第三个是“snapshot” 参数传递

​		可以进行前后props的比较进行条件语句的限制，来进行 `setState()` , 否则会导致死循环

**7 componentWillUnmount()**

​		`	componentWillUnmount()` 在组件即将被卸载或销毁时进行调用。

​		此生命周期是取消网络请求、移除监听事件、清理 DOM 元素、清理定时器等操作的好时机

**对应的hooks：**相当于 `useEffect` 里面返回的 `cleanup` 函数

**PureComponent 和 Component**

`PureComponent` 通过 `prop` 和 `state` 的浅比较来实现 `shouldComponentUpdate`，当 prop 或 state 的值或者引用地址发生改变时，组件就会发生更新。

而 `Component` 只要 state 发生改变， 不论值是否与之前的相等，都会触发更新。

**父子组件生命周期执行顺序总结：**

​		当子组件自身状态改变时，不会对父组件产生副作用的情况下，父组件不会进行更新，即不会触发父组件的生命周期。

​		当父组件中状态发生变化（包括子组件的挂载以及卸载）时，会触发自身对应的生命周期以及子组件的更新。

- render  以及 render 之前的生命周期，则 父组件先执行。
- render 以及 render之后的声明周期，则子组件先执行，并且是与父组件交替执行。

​		当子组件进行卸载时，只会执行自身的 componentWillUnmount 生命周期，不会再触发别的生命周期。

## 4.12 组件通信

- **父组件向子组件通信，可以通过 props 方式传递数据；也可以通过 ref 方式传递数据；**

​		父组件中通过给子组件设置属性，将数据传递给子组件，子组件通过 props 来接收，当父组件更改自己状态的时候，子组件接收到的属性就会发生改变。

```
//子组件
class Child extends Component{
  render(){
    return <h1>接收到数据为:{this.props.num}</h1>
  }
}
//父组件
class Parent extends Component{
  num=3;
  render(){
    return <Child num={this.num}></Child>
  }
}
ReactDOM.render(
  <Parent/>,
  document.getElementById('root')
);
```

React 提供的这个ref属性，表示为对组件真正实例的引用，其实就是 ReactDOM.render() 返回的组件实例，ref 可以挂载到组件上也可以挂载到dom元素上。

​		· 挂到组件(class声明的组件)上的 ref 表示对组件实例的引用。不能在函数式组件上使用 ref 属性，因为它们没有实例。		· 挂载到dom元素上时表示具体的dom元素节点。使用方法：

​		· 父组件使用 ref 属性对子组件做标记，获取到子组件的实例或者dom元素，可以调用子组件的方法，传递数据。		· 在 React 最新的版本中，要使用 ref ，需要通过 React.createRef() 方法生成一个ref。

```
//子组件
childClickHandle=(city)=>{
    this.setState({
      address:city
    })
  }
//父组件
this.childComp.current.childClickHandle("beijing");
<Child ref={this.childComp}></Child>
```

- **子组件向父组件通信，通过回调函数方式传递数据；**

```
//子组件
class Child extends Component{
   state={
     name:"admin",
     age:18
  }
  childClickHandle=()=>{
    this.props.showInfo({address:"beijing"})
  }
  render(){
    return (
	    <div>
	    	//方式一：直接调用父组件的方法
		    <button onClick={this.props.showInfo.bind(this,this.state)}>按钮</button>
		    //方式二：先调用自身的方法，再调用父组件的方法
		    <button onClick={this.childClickHandle}>按钮</button>
	    </div>
	)
  }
}

//父组件
class Parent extends Component{
  clickHandle(data){
    //data为子组件中传递过来的数据
    //{address: "beijing"}
    //{name: "admin", age: 18, sex: "woman"}
	console.log(data);
  }

  render(){
    return <Child showInfo={this.clickHandle.bind(this)}></Child>
  }
}
```

- **父组件向后代所有组件传递数据，如果组件层级过多，通过 props 的方式传递数据很繁琐，可以通过 Context.Provider 的方式；**

1. 使用 createContext() 创建一个context 对象（内容为需要传递的数据），参数为默认值；
2. 在父组件外层使用 <.Provider> 将当前 context 的值传递给内部所有的组件树。当使用了 <.Provider> 后，不再读取上面的默认值，需要设置 value 属性来进行数据传递。
3. 当组件需要读取数据时，指定 contextType 读取当前的 context 对象（即刚开始创建的 context）；
4. 通过 this.context，获取到当前 context 内的数据；

上面的方法中，我们实现了跨组件的数据传递，这种方式的缺点是只能有一个共享的数据源，也就是在 Grandson 组件中，指定 contextType 的值只能是一个。那么如果我们有多个数据源都需要进行跨组件传递，我们可以使用 <.Consumer> 来实现对多个数据源进行共享。

- **一个数据源实现跨组件通信，通过指定 contextType 的方式来实现；**
- **多个数据源实现跨组件通信，使用 Context.Consumer 方式实现；**

1. 使用 Context.Consumer ，实现多个数据源跨组件通信。具体使用方法如下：
2. 使用 import 导入要读取的数据文件。使用<.Consumer> ，它里面的语法是函数组件的语法，函数接收的 参数 为当前 createContext() 里的默认值。<.Consumer> 可以嵌套使用，也可以平级使用。

## 4.13 vue 实现

1. 双向绑定
2. keep-alive
3. Mixin

**1 双向绑定**

```
// 简单版
1、给input标签绑定一个onchange改变事件
2、通过获取事件目标中value值，拿到最新的input标签中的内容
3、通过this.setState()，把最新的值给到state中的状态
import React, { Component } from 'react'
export default class App extends Component {
    //接收input中的value值
    state = { inputValue: '' }
//输入框内容改变事件
inputChange(event){
    // console.log(event.target.value);
    this.setState({
        inputValue: event.target.value
    })}    
render() {
    //解构出inputValue，方便书写
    let { inputValue } = this.state
    return (
        <div>
             <input value={inputValue} onChange={this.inputChange.bind(this)}>           
             </input>
             { inputValue }
        </div> )}}
//首先需要定义一个自定义 Hook ，方便后续使用。这里定义的 setState 就是为了后续触发 React 的重渲染。
function useSignal(val) {
  const ref = useRef(val);
  const [, setState] = useState({});
//首先是基本类型，由于 Object.defineProperty 监听的是对象里的属性，所以对于基本类型我们需要包装一个对象来返回，就像这样
  if (typeof val !== 'object')
  return {
    get value() {
      return ref.current;
    },
    set value(val) {
      if (val === ref.current) return;
      ref.current = val;
      setState({});
    }
  };
//然后是对象的处理，我们只需要遍历对象属性，给每个属性都加上 get 和 set 方法
  if (Object.prototype.toString.call(val) === '[object Object]') {
  const init = cloneDeep(val);
  Object.keys(init).forEach((key) => {
    Object.defineProperty(init, key, {
      get() {
        return ref.current[key];
      },
      set(val) {
        if (val === ref.current[key]) return;
        ref.current[key] = val;
        setState({});
      }
    });
  });
  return init;
}
//遍历数组然后每一项都用 Object.defineProperty 来进行拦截是可行的，但如果数组过长是不是有点浪费呢。所以还是给数组挂载一个 set 方法，在 set 里统一进行处理。
 const arrayMethods = ['push', 'pop', 'shift', 'unshift', 'splice', 'sort', 'reverse'];
if (Array.isArray(val)) {
  const init = cloneDeep(val);
  arrayMethods.forEach((method) => {
    const _fn = Array.prototype[method];
    init[method] = function (...args) {
      _fn.call(this, ...args);
      setState({});
    };
  });
  init['set'] = (index, val) => {
    if (init[index] === val) return;
    init[index] = val;
    setState({});
  };
  return init;
}

const Demo = () => {
  const count2 = useSignal([1, 2, 3]);
  return (
    <>
      <div>count2: {count2.join(',')}</div>
      <Button onClick={() => count2.push(parseInt(Math.random() * 10))}>add count2</Button>
      <Button onClick={() => count2.pop()}>del count2</Button>
      <Button onClick={() => count2.set(2, parseInt(Math.random() * 100))}>set Arr[2]</Button>
    </>
  );
};
```

**2 keep-alive**

​		在 `Vue` 中，我们可以非常便捷地通过 `<keep-alive>` 标签实现状态的保存，该标签会缓存不活动的组件实例，而不是销毁它们，而在 `React` 中并没有这个功能，曾经有人在官方提过功能 [issues](https://gw-c.nowcoder.com/api/sparta/jump/link?link=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fgithub.com%2Ffacebook%2Freact%2Fissues%2F12039) ，但官方认为这个功能容易造成内存泄露，表示暂时不考虑支持。

​		**利用新一代路由库 margaret**

​		**手动保存状态**，是比较常见的解决方式，可以配合 `React` 组件的 `componentWillUnmount` 生命周期通过 `redux` 之类的状态管理层对数据进行保存，通过 `componentDidMount` 周期进行数据恢复。

​		**通过 Router 扩展**，在阅读了 `<Route>` 的源码后发现，如果使用 `component` 或者 `render` 属性，都无法避免路由在不匹配时被卸载掉的命运，但将 `children` 属性当作方法来使用，我们就有手动控制渲染的行为的可能，

```
// 节选自 Route 组件中的 render 函数
  if (typeof children === "function") {
    children = children(props); // children 是函数时，将对 children 进行调用得到真实的渲染结果
    if (children === undefined) {
      ...
      children = null;
    }
  }
  return (
    <RouterContext.Provider value={props}>
      {children && !isEmptyChildren(children) 
        ? children // children 存在时，将使用 children 进行渲染
        : props.match
          ? component
            ? React.createElement(component, props)
            : render
              ? render(props)
              : null // 使用 render 属性无法阻止组件的卸载
          : null // 使用 component 属性无法阻止组件的卸载
      }
    </RouterContext.Provider>
  );
<Route exact path="/list">
    {props => (
        <div style={props.match ? null : { display: 'none' }}>
            <List {...props} />
        </div>
    )}
</Route>
```

​		**模拟 keep-alive**，由于`React`会卸载掉处于固有组件层级内的组件，所以我们需要将`<KeepAlive>`中的组件，也就是其`children`属性抽取出来，渲染到一个不会被卸载的组件`<Keeper>`内，再使用`DOM`操作将`<Keeper>`内的真实内容移入对应`<KeepAlive>`，就可以实现此功能。

```
import React, { Component, createContext } from 'react'
const { Provider, Consumer } = createContext()
/*
这是一个高阶组件（Higher-Order Component, HOC） `withScope`，它接受一个 React 组件 `WrappedComponent`，返回一个新的函数组件。这个新的函数组件会接收一些 `props`，然后使用 `Consumer` 来接收上下文 `keep`，并将 `keep` 和其他 `props` 一起传递给 `WrappedComponent`。
*/
const withScope = WrappedComponent => props => (
  <Consumer>{keep => <WrappedComponent {...props} keep={keep} />}</Consumer>
)
/*
`AliveScope` 是一个 React 类组件，它使用 `Provider` 提供了一个上下文方法 `keep`，该方法接受一个 `id` 和 `children`，并在状态中保存它们。然后，在 render 方法中，它会先渲染传入的 `children`，然后渲染保存在状态中的每个 `children`，每个 `children` 被包在一个 `div` 中，`div` 的引用保存在 `this.nodes[id]` 中。
*/
export class AliveScope extends Component {
  nodes = {}
  state = {}
  keep = (id, children) =>
    new Promise(resolve =>
      this.setState(
      {[id]: { id, children }},
        () => resolve(this.nodes[id])
      ))
  render() {
    return (
      <Provider value={this.keep}>
        {this.props.children}
        {Object.values(this.state).map(({ id, children }) => (
          <div key={id} ref={node => {
              this.nodes[id] = node
            }}
          >
            {children}
          </div>
        ))}
      </Provider>
    )
  }
}
/*
`KeepAlive` 是一个使用了 `withScope` 装饰器的类组件，它在初始化时调用 `keep` 方法，并在收到 `keep` 方法返回的实际内容后，将其插入到一个空的 `div` 中。这个 `div` 的引用保存在 `this.placeholder` 中。
*/
@withScope
class KeepAlive extends Component {
  constructor(props) {
    super(props)
    this.init(props)
  }
  init = async ({ id, children, keep }) => {
    const realContent = await keep(id, children)
    this.placeholder.appendChild(realContent)
  }
  render() {
    return (
      <div
        ref={node => {
          this.placeholder = node
        }}
      />
    )}}
export default KeepAlive
// https://codesandbox.io/s/zuijian-react-keepalive-shixian-ovh90?file=/src/KeepAlive.js:0-1259
```

**3 Mixin**

React的Hook和Vue的Mixin虽然在功能上有些相似，但它们在设计理念和使用方式上有显著的区别。

1. 目的：React Hooks和Vue Mixins都被用来实现逻辑重用和代码组织。
2. 设计理念：React Hooks：React Hooks是React在16.8版本中引入的新特性，旨在解决类组件中的一些问题，例如难以理解的生命周期、复杂的状态管理以及难以重用的状态逻辑。Hooks提供了一种方式，使你可以在不编写class的情况下使用state和其他React特性。Vue Mixins：Vue Mixins则提供了一种非常灵活的方式来分发Vue组件中的可复用功能。一个mixin对象可以包含任何组件选项。当组件使用mixin时，所有mixin对象的选项将被“混入”该组件自己的选项。
3. 实现方式：React Hooks：Hooks是特殊的函数，允许你“hook into” React的特性，如状态管理（useState），生命周期（useEffect），上下文（useContext）等。你可以创建自定义的Hook，实现自己的逻辑重用。Vue Mixins：Mixin是一个JavaScript对象，其中包含一组选项（如methods，computed，created等），当这些选项被混入到Vue组件中时，会与组件的选项进行合并。如果有冲突的命名，组件的选项会优先级更高。
4. 问题：React Hooks：虽然Hooks提高了代码的可读性和复用性，但需要注意遵守一些规则，如Hooks必须在顶层调用，不要在循环，条件判断或嵌套函数中调用。同时，你需要记住每个Hook的调用顺序是固定的。Vue Mixins：Mixin在实际使用中可能会引发一些问题，如命名冲突，源代码可读性和可维护性等。因此，Vue在3.0中引入了Composition API，来替代Mixin，更好地实现代码复用和逻辑管理。

总结来说，React Hooks和Vue Mixins都是在尝试解决组件逻辑重用的问题，但它们的方法和使用方式都各有特点。

## 4.14 受控组件

受控组件：

1. 受控组件通过`props`获取其当前值，并通过回调函数(比如`onChange`)通知变化
2. 表单状态发生变化时，都会通知`React`，将状态交给`React`进行处理，比如可以使用`useState`存储
3. 受控组件中，组件渲染出的状态与它的`value`或`checked`属性相对应
4. 受控组件会更新`state`的流程

非受控组件将数据存储在`DOM`中，而不是组件内，这比较类似于传统的`HTML`表单元素。

1. 非受控组件的值不受组件自身的`state`和`props`控制
2. 非受控组件使用`ref`从`DOM`中获取元素数据

受控组件的两个要点：

- 组件的`value`属性与`React`中的状态绑定
- 组件内声明了`onChange`事件处理`value`的变化

非受控组件更像是传统的`HTML`表单元素，数据存储在`DOM`中，而不是组件内部，获取数据的方式是通过`ref`引用

一些建议：

- 尽可能使用受控组件
- 受控组件是将状态交由`React`处理，可以是任何元素，不局限于表单元素
- 对于有大量表单元素的页面，使用受控组件会使程序变得繁琐难控，此时使用非受控组件更为明智
- 在受控组件中，数据流是单向的(`state`是变化来源)，因此在改变`state`时都应该使用`setState`，而不要强制赋值
- `Refs`不能用于函数式组件，因为函数式组件没有实例
- 在函数式组件内部，是可以使用`Refs`的

## 4.15 优先级

​		在 react 中通过 class 组件或者 state hook 来改变组件的状态来触发页面的更新。每当我们调用一次 setState，react 会产生一个 update。并且 react 会根据该 update 产生一个渲染任务(也有可能复用之前的任务)，这里简称任务。在这个任务中会进行 fiber 的 diff 并将最终结果 patch 到真实 dom 上。而创建的任务也并非立即执行, 它会被放入调度器队列，经过调度器调度执行。因此在实际的开发过程中，从事件产生到 dom 改变，往往会经过:

- 用户事件(例如点击，拖拽)产生，执行回调
- 回调中调用 setState 改变状态，产生 update
- react 创建渲染任务
- 调度器调度执行

在整个过程中都涉及到各种优先级:

- 用户事件产生: 根据不同的事件类型执行回调，并指定不同的事件优先级
- 状态改变，产生 update: 根据产生该 update 的事件优先级，计算 update 优先级
- react 创建渲染任务: 根据本次 update 以及目前尚未处理完成的工作计算 渲染优先级，并根据渲染优先级计算调度优先级
- 调度器调度执行: 根据挂载到 fiber 上的 update 优先级以及渲染优先级来控制需要跳过的 fiber 以及 update

**事件优先级：**

- 离散事件（DiscreteEvent）：click、keydown、focusin等，这些事件的触发不是连续的，优先级为0。
- 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1。
- 连续事件（ContinuousEvent）：canplay、error、audio标签的timeupdate和canplay，优先级最高，为2。

在更新流程中提到的的事件优先级，update 优先级以及渲染优先级本质都是 **Lane** 优先级。

```
Lane类型被定义为二进制变量, 利用了位掩码的特性, 在频繁的时候占用内存少, 计算速度快.
Lane和Lanes就是单数和复数的关系, 代表单个任务的定义为Lane, 代表多个任务的定义为Lanes
Lane是对于expirationTime的重构, 以前使用expirationTime表示的字段, 都改为了lane
```

**更新优先级：**

每当有状态改变，react 会产生一个 update。多个 update 还会形成环状链表。产生的每个 update 具有一个优先级，称为 **update 优先级**当 update 产生后。此外这个 update 优先级还有以下作用:

1. react 会将该 update 优先级递归添加到父 fiber 的 childLanes 中。因此如果每个 fiber 产生了 update，则其父 fiber 的 childLanes 优先级一定大于等于该 update 优先级
2. react 会将该 update 的优先级添加到对应 fiber 的优先级中，也就是 fiber.lanes
3. react 会将该 update 优先级添加到 root 节点的 pendingLanes 中，表示该优先级对应的 update 有尚未完成的工作

update 优先级的计算方法有以下几种:

1. 如果该 update 在**合成事件回调**中产生，则该 update 优先级等于合成事件的**事件优先级**
2. 如果该 update 在 setTimeout，setInterval, useEffect 等**非合成事件回调**产生，则 update 优先级等于 `DefaultLane`
3. 如果该 update 在 `React.startTransition` 回调中产生，那么该 update 优先级会从 `TransitionLanes` 选取一个产生。

**调度优先级：**

​		当 update 产生后，会根据 update 优先级以及当前未完成的工作进行计算，得出本次任务的**渲染优先级**。并根据渲染优先级计算出调度优先级。这里需要注意的是，由于调度器实际上是可以脱离 react 存在的模块，因此调度优先级和update/渲染优先级/事件优先级不同**并不是 lane 优先级**。

​		同步模式是循环处理 fiber 节点，并发模式多了个shouldYield的判断，**每 5ms 打断一次**，也就是**时间分片**。并且之后会重新调度渲染。通过这种打断和恢复的方式实现了并发。然后 **Scheduler** 可以根据优先级来对任务排序，这样就可以实现高优先级的更新先执行。

​		每次 setState 引起的渲染都是由 Scheduler 调度执行的，它维护了一个任务队列，上个任务执行完执行下个，被打断的任务会添加到Scheduler的任务队列里面。

**渲染优先级：**

在 react 渲染任务中，react 会从 root 节点开始对整棵 fiber 树进行遍历。但是在一次更新中，往往只有很少的组件发生了状态改变。又或者说，这个节点的状态改变了，但是其优先级不够。这两种情况下都可以跳过一些节点的状态更新或 diff 计算。因此 react 并不会遍历整颗树，而是根据根据 props 以及状态的改变进行优化，跳过一部分的 fiber。在 react 中有以下逻辑:

1. fiber 状态改变，优先级足够。则计算最新状态，并 diff 子节点。
2. fiber 状态未改变或优先级不够，则直接拷贝子节点(如果 props 未发生改变)。

因此 react 会比较 fiber 上挂载的 update 优先级与渲染优先级是否有**重合的部分**。如果有，则说明**挂载到 fiber 的 update 至少有一个是满足优先级**。此时会进行最新状态的计算。计算的过程种还会比较某个 update 的优先级是否在渲染优先级中。如果不在，则说明该 update 优先级不够，会直接跳过。如果没有重回的部分则命中逻辑 2，不会计算最新状态，也不会 diff 子节点。

## 4.16 React18

- 为了更好的管理root节点，React 18 引入了一个新的 root API，新的 root API 还支持 new concurrent renderer（并发模式的渲染），它允许你进入concurrent mode（并发模式）。
- 批处理是指为了获得更好的性能，在数据层，将多个状态更新批量处理，合并成一次更新（在视图层，将多个渲染合并成一次渲染）。在React 18 之前，我们只在 React 事件处理函数 中进行批处理更新。默认情况下，在promise、setTimeout、原生事件处理函数中、或任何其它事件内的更新都不会进行批处理：
- 当你使用严格模式时，React 会对每个组件进行两次渲染，以便你观察一些意想不到的结果。在 React 17 中，取消了其中一次渲染的控制台日志，以便让日志更容易阅读。为了解决社区对这个问题的困惑，在 React 18 中，官方取消了这个限制。如果你安装了React DevTools，第二次渲染的日志信息将显示为灰色，以柔和的方式显式在控制台。

Concurrent Mode引入了一些措施来实现这一目标：

1. 时间切片（Time Slicing）：React将更新任务分成多个小的时间片（time slice），每个时间片执行的时间很短，一般为1毫秒。在每个时间片执行完后，React会检查是否还有剩余的时间片，如果有，则会优先执行其他高优先级任务，从而实现更平滑的用户界面。
2. 任务优先级（Priorities）：Concurrent Mode引入了不同优先级的任务。例如，用户输入相关的任务被认为是高优先级，而屏幕重新绘制等任务则是低优先级。React会根据任务的优先级来调度执行顺序，确保高优先级任务优先执行。
3. 批量更新（Batching）：在传统的同步渲染模式中，React会在每次状态更新后立即进行组件的重新渲染，而在Concurrent Mode中，React会将多个状态更新合并成一个批量更新，在一个时间片内一次性进行渲染，减少渲染的次数，提高渲染性能。
4. Suspense组件：Suspense组件是Concurrent Mode中引入的新组件，用于优雅地处理异步数据获取和代码分割等情况。Suspense可以指定一个fallback（备用）组件，当异步操作尚未完成时，可以渲染fallback组件，提供更好的用户体验。

**`Suspense`****组件**：虽然它不是全新的 Suspense，如在 React 16 中发布的代码拆分 `React.lazy` ，但 React 18 引入的新功能扩展到 Suspense 数据获取。`Suspense`组件是Concurrent Mode中的新组件，用于优雅地处理异步数据获取和代码分割等情况。它可以指定一个`fallback`（备用）组件，在异步操作尚未完成时，渲染`fallback`组件，提供更好的用户体验。`Suspense`可以配合`React.lazy()`实现组件的代码分割，以及`React.Suspense`实现异步数据获取。

`Suspense` 的底层实现依赖于 `错误边界(Error Boundaries)` 组件，从描述中我们知道， `错误边界` 是一种组件，生成一个 `错误边界` 组件也很容易，任何实现了 `static getDerivedStateFromError()` 静态方法的 **class 组件** 就是一个 `错误边界` 组件。可以将 `Suspense` 当做一种特殊 `错误边界` 组件，当 `Suspense` 捕获到子组件抛出的时 `Promise` 时会暂时挂起 `Promise` 渲染 `fallback` UI ，当其 `Resolved` 之后重新渲染。

https://juejin.cn/post/6895322363357822984

**`React.lazy()`****方法**：`React.lazy()`是一个动态导入（Dynamic Import）的方法，用于实现组件的代码分割。它允许将组件的导入延迟到组件实际被渲染的时候，从而减少初始加载时间，提高应用的性能。

​		React 18 现在有一个Cache函数，可以记住包装函数调用的结果。如果在同一呈现通道中使用相同的参数调用同一函数，它将使用记忆值，而无需再次执行该函数。对比 useMemo，可以实现纯函数的缓存，异步方法的缓存。

```js
// CacheNode构造函数
function createCacheNode<T>(): CacheNode<T> {
  return {
    s: UNTERMINATED, //cacheNode的缓存状态，有 未中止/中止/发生错误 3种状态
    v: undefined, //cacheNode缓存的值
    o: null, //缓存的引用类型值
    p: null//缓存的原始类型值
  };
}
```

​		`cache`的实现方式是 —— 基于传参，构造一条`cacheNode`链，传参的稳定对应了链表的稳定，并最终对应了返回值的稳定。

​		如果后续执行`cacheFn`传入相同的参数，则会复用缓存的`cacheNode`节点。如果所有传参都相同，那么会复用完整的`cacheNode`链，此时最后一个`cacheNode`节点为**「中止」**状态，则不需要重新执行`cacheFn`方法计算返回值，而是直接返回缓存的值（`cacheNode.v`）。

[#react#]()[#前端#]()[#前端面试#]()[#春招#]()



作者：夏目又三
链接：https://www.nowcoder.com/?type=818_1
来源：牛客网