https://github.com/puxiao/react-hook-tutorial/blob/master/04%20useEffect%E5%9F%BA%E7%A1%80%E7%94%A8%E6%B3%95.md

https://github.com/xiaohesong/TIL/blob/master/front-end/react/overreact/%E4%B8%80%E4%BB%BD%E5%AE%8C%E6%95%B4%E7%9A%84useEffect%E6%8C%87%E5%8D%97.md

https://github.com/jsonz1993/react-source-learn/issues/8

## useEffect包含哪些周期

在React中，useEffect是一种在函数组件中处理副作用的方式，它包含了在类组件中由componentDidMount，componentDidUpdate和componentWillUnmount生命周期方法处理的各种副作用。下面是拆分：

- componentDidMount：当组件第一次渲染到DOM时，这个方法会被调用。对应使用useEffect的时候，你可以将跟组件加载有关的副作用逻辑放入useEffect中。

- componentDidUpdate：当组件的props或state发生变化时，这个方法会被调用。在useEffect中，如果你希望在一些特定变量改变时重新运行副作用，你可以通过useEffect的第二个参数来实现，即传递一个数组，数组中包含你需要监听的变量。

- componentWillUnmount：当一个组件被销毁前，这个方法会被调用。在useEffect中，你可以通过在副作用函数中返回一个函数来实现，这个返回的函数会在组件卸载前被调用，用于进行一些清理操作，比如清除定时器、取消网络请求、移除事件监听等。

### 如何在useEffect中做事件抽离

在useEffect回调函数里定义的函数（副作用）不能未经定义或者传递就直接在依赖数组里使用，否则会造成useEffect的闭包问题。所以需要进行事件抽离，即在组件函数主体中定义你需要的函数，并在useEffect的依赖数组中列出。

例如：

```jsx
const fetchData = async () => {
  const response = await fetch('api/data');
  const data = await response.json();
  setMyData(data);
};

useEffect(() => {
  fetchData();
}, [fetchData]); // 依赖数组中列出fetchData
```

此处的fetchData在useEffect外部定义，并在useEffect的依赖数组中列出。

### useEffect原理是什么

useEffect是React Hooks中的一种，它允许你在function component中处理各种副作用。原理上说，每当组件渲染时，React都会记住和执行你在useEffect中定义的所有副作用。当组件卸载，或者在再次渲染时，React会清理上一次渲染的副作用，然后执行下一次渲染的副作用。

useEffect接受两个参数，第一个是包含副作用逻辑的函数，第二个是一个可选的依赖项数组。如果提供了依赖项数组，那么只有当依赖项改变时，useEffect才会执行。这让我们能够细粒度地控制副作用的执行时机，从而进行性能优化。