## vite

### 2.1 vite工作原理

vite是一种现代化的前端开发工具，其工作原理主要分为以下几个步骤

1. 基于ESM构建：Vite作为一款基于ESM的前端构建工具，通过ES模块提供的动态导入功能来实现快速的开发和构建。
2. 零配置开发：Vite允许开发者在不需要任何配置的情况下启动一个服务器进行开发，通过对文件的即时编译和缓存，来提高开发效率。
3. 基于浏览器原生的ESM加载：Vite将所有文件视为ES模块，并且在开发时会直接从源代码加载模块，而不是打包后的文件，从而可以避免打包的过程带来的性能损失。
4. 按需编译和缓存：Vite会按需编译和缓存依赖项，只有当需要更新时才会进行重新编译，缓存让开发者可以忽略无关的代码变化。
5. 插件化架构：Vite的插件化架构可以方便地扩展其功能，例如使用插件来处理CSS、处理图片、压缩源代码等等。

### &#x20;2.2 vite核心原理

* Vite其核心原理是利用浏览器现在已经支持ES6的import，碰见import就会发送一个HTTP请求去加载文件。
* Vite整个过程中没有对文件进行打包编译，做到了真正的按需加载，所以其运行速度比原始的webpack开发编译速度快出许多！

**特点：**

1. 快速的冷启动：基于Esbuild的依赖进行预编译优化 （Esbuild 打包速度太快了，比类似的工具快10\~100倍 ）
2. 增加缓存策略：源码模块使用协商缓存，依赖模块使用强缓；因此一旦被缓存它们将不需要再次请求
3. &#x20;HMR（热更新）：当修改代码时，HMR 能够在不刷新页面的情况下，把页面中发生变化的模块，替换成新的模块，同时不影响其他模块的正常运作
4. &#x20;基于 Rollup 打包：生产环境下由于esbuild对css和代码分割并使用Rollup进行打包
5. 高效的热更新：基于ESM实现，同时利用HTTP头来加速整个页面的重新加载&#x20;

### 2.3 Vite 冷启动为什么快 

vite 运行 Dev 命令后只做了两件事情

1. 启动本地服务器并注册了一些中间件
2. 使用 ESbuild 预构建模块

### 2.4 vite生产环境缺点

1. Vite 在是直接把转化后的 es module 的JavaScript，扔给浏览器，让浏览器根据依赖关系，自己去加载依赖

2. 那有人就会说了，那放到 生产环境 时，是不是可以不打包，直接在开个 Vite 服务就行，反正浏览器会自己去根据依赖关系去自己加载依赖。答案是不行的，为啥呢：

   1、你代码是放在服务器的，过多的浏览器加载依赖肯定会引起更多的网络请求

   2、为了在生产环境中获得最佳的加载性能，最好还是将代码进行 tree-shaking、懒加载和 chunk 分割、CSS处理，这些优化操作，目前 esbuild 还不怎么完善

##  vite 兼容性如何

##  vite 为什么依赖 esm