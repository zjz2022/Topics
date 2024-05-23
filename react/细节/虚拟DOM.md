## 虚拟DOM

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