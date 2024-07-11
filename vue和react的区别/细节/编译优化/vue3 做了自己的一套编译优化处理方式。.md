https://www.cnblogs.com/everlose/p/12538474.html

vue3 做了自己的一套编译优化处理方式。

## 渲染的比对

jsx 和手写的 render function 是是完全动态的，过度的灵活性导致运行时可以用于优化的信息不足，所以 react 就只能显示调用 setState 来强行更新组件。由于无从减掉一些不必要的渲染对比，所以 react 对此的解决方法就是引入了时间分片 react fibber，把 patch 并且更新视图的过程切分成多个任务，分批更新。

这点是 vue3 曾经考虑过做时间分片，由于 Evan you 觉得只要更有效率的 diff，16.67 ms 的更新时间已经足够，不需要分片。因为 vue 会标明某些 dom 是静态的，并且 Vue 3.0 提出的动静结合的 DOM diff 思想，开始做到了标记哪个 DOM 绑定了变量需要 patch，省去也不必要的 patch 更新的优化操作。

之所以能够做到 Vue 3.0 预编译优化，是因为 Vue core 可以静态分析 template，在解析模版时，整个 parse 的过程是利用正则表达式顺序解析模板，当解析到开始标签、闭合标签、文本的时候都会分别执行对应的回调函数，来达到构造 AST 树的目的。

这点是 React 达不成的，它只能重新渲染更新，React 拿到的或者说掌管的，所负责的就是一堆递归 React.createElement 的执行调用，它无法从模版层面进行静态分析。因此 React JSX 过度的灵活性导致运行时可以用于优化的信息不足。

当然 React 并不是没有意识到这个问题，他们在积极的同 prepack 合作。力求弥补构建优化的先天不足。

Prepack 同样是 FaceBook 团队的作品。它让你编写普通的 JavaScript 代码，它在构建阶段就试图了解代码将做什么，然后生成等价的代码，减少了运行时的计算量，就相当于 JavaScript 的部分求值器。