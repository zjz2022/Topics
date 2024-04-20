## vuex 

### 11.0 如何使用vuex

### 11.1 vuex包括几个模块

Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。每一个 Vuex 应用的核心就是 store（仓库）。“store” 基本上就是一个容器，它包含着你的应用中大部分的状态 ( state )。

（1）Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

（2）改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。这样使得我们可以方便地跟踪每一个状态的变化。

* State：定义了应用状态的数据结构，可以在这里设置默认的初始状态。
* Getter：允许组件从 Store 中获取数据，mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性。
* Mutation：是唯一更改 store 中状态的方法，且必须是同步函数。
* Action：用于提交 mutation，而不是直接变更状态，可以包含任意异步操作。
* Module：允许将单一的 Store 拆分为多个 store 且同时保存在单一的状态树中

### 11.2 vuex存储的用户信息在页面刷新后会丢失吗

### 11.3 刷新浏览器后，Vuex的数据是否存在？如何解决？

原因：因为 store 里的数据是保存在运行内存中的，当页面刷新时，页面会重新加载vue实例，store里面的数据就会被重新赋值初始化。

localStorage 或者就是sessionStorage

下载持久化存储插件。比如使用：vuex-along 的实质也是将 vuex 中的数据存放到 localStorage 或者 sessionStroage 中，只不过这个存取过程组件会帮我们完成，我们只需要用vuex的读取数据方式操作就可以了

### 11.4 vuex 五个基础配置 问了mutations的作用

### 11.5 vuex中的辅助函数怎么使用？

vuex的辅助函数有4个

* mapState 函数返回的是一个对象。通常，我们需要使用一个工具函数将多个对象合并为一个，以使我们可以将最终对象传给 computed 属性。
* mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性，因此你可以这样来使用他
* mapMutations 辅助函数将组件中的 methods 映射为 store.commit，其原理就是将this.montify 映射为this.\$store.commit(‘montify’)
* mapActions在组件中使用 this.\$store.dispatch('prodect') 分发 action，或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用

### 11.6 pinia 与  Vuex 的区别

### 11.7 vuex和eventBus的区别，使用场景