## vue功能 的React实现

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