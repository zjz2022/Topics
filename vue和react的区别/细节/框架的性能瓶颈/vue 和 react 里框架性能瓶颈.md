Vue 3 是一个我们不应该重复的错误 https://medium.com/js-dojo/vue-3-was-a-mistake-that-we-should-not-repeat-81cc65484954

Biggest disadvantages of Vue https://www.reddit.com/r/vuejs/comments/80n9mz/biggest_disadvantages_of_vue/

Vue.js 与 React 相比的缺点 https://jannchie.com/en/posts/vue-vs-react

框架性能瓶颈：

**react：**

高频率的交互往往会导致明显的性能问题，在 antd 的 Form 组件也使用了将数据下放到每一个 Item 的方式来优化性能，store 中用 useRef 存储数据而不是 useState，antd 内部为每个 Form.Item 定义了 forceUpdate 来强制更新 Item UI。又例如拖拽/resize等事件。此时我们只需要通过操作原生 DOM 的方式来实现对应的逻辑即可。从而绕开高频率的 diff 逻辑。

react 常常因为闭包问题，被各种攻击。认为这是 react 的缺陷。

事实上，原生 DOM 本身在高频交互上也存在明显的性能瓶颈。因此许多前端项目不得不采用抛弃 DOM 渲染的方式来完成整个项目【DOM 换成了 canvas，或者 webGPU..】。但是这些项目我们仍然可以结合 react 来完成，例如著名的前端项目 **Figma**，或者国内有的团队使用 react + skia 的方式来完成一些对性能要求很高的项目

**Solid：**

 为了极致的性能体验，完全弃用了虚拟 DOM，也就意味着，他放弃了跨平台的特性。只把主要精力集中在 web 项目上。也就是说，他的全局生态建设，永远也赶不上 react。

**vue：**

丢失响应式，如解构。