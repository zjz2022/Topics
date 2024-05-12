## React18

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
