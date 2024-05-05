- 数据变化的实现原理不同。react使用的是不可变数据，而Vue使用的是可变的数据

Vue2 响应式的特点就是依赖收集，数据可变，自动派发更新，初始化时通过 Object.defineProperty 递归劫持 data 所有属性添加 getter/setter，触发 getter 的时候进行依赖收集，修改时触发 setter 自动派发更新找到引用组件重新渲染。
Vue3 响应式使用原生 Proxy 重构了响应式，一是 proxy 不存在 Vue2响应式存在的缺陷，二是性能更好，不仅支持更多的数据结构，而且不再一开始递归劫持对象属性，而是代理第一层对象本身。运行时才递归，用到才代理，用 effect 副作用来代替 Vue2 里的 watcher，用一个依赖管理中心 trackMap 来统一管理依赖代替 Vue2 中的 Dep，这样也不需要维护特别多的依赖关系，性能上取得很大进步。
React 则是基于状态，单向数据流，数据不可变（需要创建数据的副本来替换掉原数据，为了保证浅比较的正确性），需要手动 setState 来更新，始终保持state的原值不变,在生命周期 shouldComponentUpdate 中，React会对新旧state进行比较，如果直接修改state去用于其他变量的计算，而实际上state并不需要修改，则会导致怪异的更新以及没必要的更新。第二，可追踪修改痕迹，便于排错。而且当数据改变时会以组件根为目录，默认全部重新渲染整个组件树，只能额外用 pureComponent/shouldComponentUpdate/useMemo/useCallback 等方法来进行控制，更新粒度更大一些。