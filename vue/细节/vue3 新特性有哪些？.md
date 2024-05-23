## vue3 新特性有哪些？

1、性能提升

* 响应式性能提升，由原来的 Object.defineProperty 改为基于ES6的 Proxy ，使其速度更快，消除警告。
* 重写了 Vdom ，突破了 Vdom 的性能瓶颈。
* 进行模板编译优化。
* 更加高效的组件初始化

2、更好的支持 typeScript

* 有更好的类型推断，使得 Vue3 把 typeScript 支持得非常好

3、新增Composition API

* Composition API 是 vue3 新增的功能，比 mixin 更强大。它可以把各个功能模块独立开来，提高代码逻辑的可复用性，同时代码压缩性更强

4、新增组件

* Fragment 不再限制 template 只有一个根几点。
* Teleport 传送门，允许我们将控制的内容传送到任意的 DOM 中。
* Supense 等待异步组件时渲染一些额外的内容，让应用有更好的用户体验。

5、Tree-shaking：支持摇树优化

* 摇树优化后会将不需要的模块修剪掉，真正需要的模块打到包内。优化后的项目体积只有原来的一半，加载速度更快

6、Custom Renderer API： 自定义渲染器

* 实现 DOM 的方式进行 WebGL 编程