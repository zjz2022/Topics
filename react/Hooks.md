## Hooks

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

