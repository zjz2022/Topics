# react性能优化

 **useState** 

useState传入普通数据在组件每次更新时都会执行

如传入函数，则只在组件渲染执行一次

如果数据结构较复杂，可使用函数

 **useMemo** 

函数组件，默认，每次 state 变化都会重新执行

useMemo 可以缓存某个数据，不用每次都重新生成

可用于计算量比较大且数据变化不频繁的数据场景

“你可以把 useMemo 作为性能优化的手段，但不要把它当成语义上的保证。”

useMemo 的控制权在 React ，不一定保证每个都会缓存，但都是为了全局的性能最佳。

 **useCallback** 

useCallback 就是 useMemo 的语法糖，和 useMemo 一样。用于缓存函数

 **React.memo** 

当 state 变化时，React 会默认渲染所有**子组件**，无论其 props 是否变化

但如果想要控制子组件根据 props 变化来渲染，可以使用 `React.memo`

 **路由懒加载** 

lazy(()=>import('')

分包减少包体积