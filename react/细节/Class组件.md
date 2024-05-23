## Class组件

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