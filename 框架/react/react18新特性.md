# 注意

`React 18` 已经放弃了对 `ie11` 的支持，将于 `2022年6月15日` 停止支持 `ie`，如需兼容，需要回退到 `React 17` 版本。

React 18 中引入的新特性是使用现代浏览器的特性构建的，在IE中无法充分polyfill，比如micro-tasks

# 新特性

## 一、 Render API

## 二、 setState 自动批处理

## 三、flushSync

## 四、关于卸载组件时的更新状态警告

## 五、关于 React 组件的返回值

## 六、Strict Mode

## 七、 Suspense 不再需要 fallback 来捕获

# 新的 API

## 一、useId

## 二、useSyncExternalStore	

## 三、useInsertionEffect

# Concurrent Mode（并发模式）

## 并发特性：

### 一、startTransition

### 二、useDeferredValue

### 三、普通情况

### 关于fiber，有三层具体含义：

1. 作为`架构`来说，在旧的架构中，`Reconciler（协调器）`采用递归的方式执行，无法中断，节点数据保存在递归的调用栈中，被称为 `Stack Reconciler`，stack 就是调用栈；在新的架构中，`Reconciler（协调器）`是基于fiber实现的，节点数据保存在fiber中，所以被称为 `fiber Reconciler`。
2. 作为静态`数据结构`来说，每个fiber对应一个组件，保存了这个组件的类型对应的dom节点信息，这个时候，fiber节点就是我们所说的`虚拟DOM`。
3. 作为动态`工作单元`来说，fiber节点保存了该节点需要更新的状态，以及需要执行的副作用。

# 结语

以上是本次 `React` 所升级的大致内容，如有错误，敬请指正。

# 参考资料

- [React v18.0](https://link.juejin.cn/?target=https%3A%2F%2Freact.docschina.org%2Fblog%2F2022%2F03%2F29%2Freact-v18.html)
- [How to Upgrade to React 18](https://link.juejin.cn/?target=https%3A%2F%2Freact.docschina.org%2Fblog%2F2022%2F03%2F08%2Freact-18-upgrade-guide.html)
- [React 18 工作组](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Freactwg%2Freact-18%2Fdiscussions)
- [React 18 不再依赖 Concurrent Mode 开启并发更新了](https://link.juejin.cn/?target=https%3A%2F%2Fmp.weixin.qq.com%2Fs%2FtC2VF_uIZf4RfBWdlpaKUA)