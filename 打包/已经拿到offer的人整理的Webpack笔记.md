## (一) Webpack

最早的时候，我们会通过文件划分的形式实现模块化，约定每个文件是一个独立的模块，然后再将这些js文件引入到页面。但这种模块弊端十分的明显，模块都是在全局中工作，大量模块成员污染了环境，模块与模块之间并没有依赖关系、维护困难、没有私有空间等问题。

​		`webpack` 是一个用于现代`JavaScript`应用程序的静态模块打包工具。这里的静态模块指的是开发阶段，可以被 `webpack` 直接引用的资源（可以直接被获取打包进`bundle.js`的资源）当 webpack处理应用程序时，它会在内部构建一个依赖图，此依赖图对应映射到项目所需的每个模块（不再局限js文件），并生成一个或多个 bundle。

通过`webpack`优化前端的手段有：

- JS代码压缩
- CSS代码压缩，去除无用的空格，可以通过另一个插件css-minimizer-plugin
- Html文件代码压缩
- 文件大小压缩
- 图片压缩
- Tree Shaking 在计算机中表示消除死代码，依赖于ES Module的静态语法分析（不执行任何的代码，可以明确知道模块的依赖关系）在webpack实现Trss shaking有两种不同的方案：usedExports：通过标记某些函数是否被使用，之后通过Terser来进行优化的sideEffects：跳过整个模块/文件，直接查看该文件是否有副作用
- 代码分离
- 内联 chunk

### 6.1 构建流程

**多文件入口**是使用对象语法来通过支持多个entry，多文件入口的对象语法相对于单文件入口，具有较高的灵活性，例如多页应用、页面模块分离优化。

```js
module.exports = {
    entry: {
        home: 'path/to/my/entry/home.js',
        search: 'path/to/my/entry/search.js',
        list: 'path/to/my/entry/list.js'
    }
};
```

上面的语法将entry分成了 3 个独立的入口文件，这样会打包出来三个对应的 bundle。一个 webpack 的配置，可以包含多个entry**，**但是只能有一个output。对于不同的entry可以通过output.filename占位符语法来区分。

**多页面**就是指的多个 HTML 页面，这时候可以直接借助 html-webpack-plugin 插件来实现，我们只需要多次实例化一个 html-webpack-plugin 的实例即可。

​		如果我们的项目是一个由多个路由或页面组成的，但是代码中只有一个单独的 JavaScript 文件（一个单独的入口 chunk），这样会导致不管访问任何页面都会加载整站资源，让用户付出额外的流量。此外，如果这个用户经常只是访问其中的某个页面，但是当我们更改了其它页面的代码，Webpack 将会重新编译，那么整个 bundle 的文件名哈希值就会发生变化，最终导致用户重新下载整个网站的代码，造成不必要的浪费。		这时候合理的做法是将整个项目利用多页面打包方案进行划分，将代码按照页面进行拆分，这样用户访问某个页面的时候，实际下载的只是当前页面的代码，而不是整个网站的代码，浏览器也更好的缓存了这部分代码，当其他页面代码发生变化的时候，当前代码的哈希值不会失效，自然用户不会重复下载相同的代码了。

https://zhuanlan.zhihu.com/p/117656993

- 运行流程：(利用广播机制)1  初始化流程：从配置文件（webpack.config.js）和 Shell 语句中读取与合并参数，并初始化需要使用的插件和配置插件等执行环境所需要的参数。Loader与Plugin区别：loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中plugin 赋予了 webpack 各种灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事两者在运行时机上的区别：loader 运行在打包文件之前plugins 在整个编译周期都起作用在Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的 API改变输出结果对于loader，实质是一个转换器，将A文件进行编译形成B文件，操作的是文件，比如将A.scss或A.less转变为B.css，单纯的文件转换过程2  编译构建流程：从 Entry 发出，针对每个 Module 串行调用对应的 Loader 去翻译文件内容，再找到该 Module 依赖的 Module，递归地进行编译处理。	3. 输出流程：对编译后的 Module 组合成 Chunk，把 Chunk 转换成文件，输出到文件系统。

### 6.2 对比vite

**Vite** 是一个新兴的前端构建工具，由 Vue.js 的作者尤雨溪创建。它的特点是快速的启动时间和构建速度。这意味着你可以更快地进行开发和调试，并且构建时间更短，这对于大型项目来说非常重要。

​		Webpack 则是一个已经被广泛使用的前端构建工具，它可以打包 JavaScript 文件，CSS 文件和其他资源文件。Webpack 可以通过各种插件和加载器来扩展其功能。

​		区别：

​		1 构建速度：Vite 是一个基于 ES modules 的构建工具，它利用浏览器原生的 ES module 支持来实现更快的构建速度。在开发模式下，Vite 会直接从源代码中导入模块，而不是像 Webpack 那样需要先构建整个应用程序再运行。这就使得Vite 的启动时间和热更新速度比 Webpack 要快得多。轻量快速的热重载（HMR）， 真正的按需编译，不用等待整个应用编译完成.

​		其构建速度主要由于内部采用的是ESbuild，它是go编写的，支持 ES6 和 CommonJS 模块；支持对 ES6 模块进行 tree shaking。

​		2 打包大小：Webpack 会将所有的代码打包到一起，而 Vite 只会在需要时按需导入。这意味着 Vite 可以更好地利用浏览器的缓存来减少加载时间和带宽消耗，从而优化网页性能。

​		3 插件生态系统：Webpack 有一个非常庞大的插件生态系统，可以很容易地扩展其功能。虽然 Vite 也支持插件，但是它的插件数量远不及 Webpack。

​		4 支持的文件类型：Webpack 可以处理各种类型的文件，包括 JavaScript、CSS、图片、字体等。而 Vite 目前仅支持 JavaScript 和 CSS。

​		5 无需打包可快速的冷启动

### 6.3 sourceMap

`source-map`作用就在于能够帮你定位到错误的代码在那个文件哪一行，如果项目中配置了一些将 `es6`写代码转换成 `es5`代码的插件`source-map`也能够将已转换的代码映射到原始的文件使浏览器可以重构原始源并在调试器中显示重建的原始源

### 6.4 热更新

关于`webpack`热模块更新的总结如下：Hot Module Replacement（HMR）这个特性允许开发者在不重新加载整个页面的情况下，替换、添加或删除模块。

1. 启动阶段：当 webpack-dev-server 启动后，会创建两个服务器，提供静态资源的服务（express）和Socket服务。客户端（浏览器）和服务端（webpack-dev-server）通过 Socket 进行通信。express server 负责直接提供静态资源的服务（打包后的资源直接被浏览器请求和解析）
2. 编译阶段：当文件发生变化时，Webpack 会重新编译改变的模块，然后通过 Socket 向客户端发送更新的哈希值和改变的模块路径。
3. 客户端处理阶段：客户端接收到更新信息后，会通过 JSONP 请求新的模块文件。然后客户端对新的模块进行更新或替换。会生成两个文件.json（manifest文件）和.js文件（update chunk）浏览器拿到两个新的文件后，通过HMR runtime机制，加载这两个文件，并且针对修改的模块进行更新

以下是这个过程中涉及的一些关键点：

- Webpack 编译：Webpack 通过文件系统监听到某个文件发生了改变，它会找出这个文件以及和它有直接关系的文件进行编译，然后生成一个或多个更新的模块。
- 模块热替换：HMR 插件会将这些更新的模块以 JSONP 的形式发送给客户端。客户端再把这些更新的模块替换到旧的模块上，或者在需要的地方加上新的模块。
- Socket 通信：HMR 使用 WebSocket 实现客户端和服务端之间的通信。服务端发生改变后，会通过 Socket 向客户端发送更新。

需要注意的是，HMR 并不适用于所有的模块，比如一些会改变模块结构的改动（例如添加新的路由）可能仍需要刷新页面。并且，使用 HMR 时，需要在代码中处理模块被替换后的情况，例如使用 `module.hot.accept`。

### 6.5 代理proxy

`webpack proxy`，即`webpack`提供的代理服务，基本行为就是接收客户端发送的请求后转发给其他服务器

```js
module.exports = {
    devServer: {
    	contentBase,
    	port,
    	proxy:{target:表示的是代理到的目标地址,}
    }
 }
```

`proxy`工作原理实质上是利用`http-proxy-middleware` 这个`http`代理中间件，实现请求转发给其他服务器,**只适用在开发阶段**

**服务器与服务器之间请求数据并不会存在跨域行为，跨域行为是浏览器安全策略限制**

### 6.6 package

dependencies：生产环境下，项目运行所需依赖。

devDependencies：开发环境下，项目所需依赖。

bin：内部命令对应的可执行文件的路径。

main：项目默认执行文件，比如 require(‘webpack’)；就会默认加载 lib 目录下的 webpack.js 文件，如果没有设置，则默认加载项目跟目录下的 index.js 文件。

module：是以 ES Module(也就是 ES6)模块化方式进行加载，因为早期没有 ES6 模块化方案时，都是遵循 CommonJS 规范，而 CommonJS 规范的包是以 main 的方式表示入口文件的，为了区分就新增了 module 方式，但是 ES6 模块化方案效率更高，所以会优先查看是否有 module 字段，没有才使用 main 字段。

eslintConfig：EsLint 检查文件配置，自动读取验证。

resolutions：字段统一所有依赖和依赖的依赖当依赖版本可以灵活调整时，比如依赖的版本号是 `^` 开头的，两者都使用最新版本是可以互相兼容的，而现在更多的第三方依赖都会定死他所依赖的库的版本号以稳定功能，确保不会产生第三方依赖做出了 BREAKING CHANGE 而导致大面积的报错停用。

### 6.7 性能优化

**1 基础优化**

- 缩小文件范围，	优化loader配置

​		test、include、exclude三个配置项来缩⼩loader的处理范围，推荐include

```
include: path.resolve(__dirname, "./src"),
```

- resolve.modules用于配置webpack去哪些目录下寻找第三方模块，默认是 ['node_modules']。

​		寻找第三方，默认是在当前项目目录下的node_modules里面去找，如果没有找到，就会去上一级目录../node_modules找，再没有会去../../node_modules中找，以此类推，和Node.js的模块寻找机制很类似。

​		resolve.alias配置通过别名来将原导⼊路径映射成⼀个新的导⼊路径。拿react为例，我们引⼊的react库，⼀般存在两套代码：cjs（采⽤commonJS规范的模块化代码）umd （已经打包好的完整代码，没有采⽤模块化，可以直接执⾏）

- 使用mini-css-extract-plugin进行css抽离
- 压缩css，optimize-css-assets-webpack-plugin，cssnano
- 压缩html，html-webpack-plugin，// 移除HTML中的注释，压缩内联css
- 模块区分打包，webpack-merge
- tree shaking

```
Dead Code⼀般具有以下⼏个特征：代码不会被执⾏，不可到达|代码执⾏的结果不会被⽤到|代码只会影响死变量（只写不读）|Js tree shaking只⽀持ES module的引⼊⽅式
```

- 代码分割，所有的 chunks 代码公共的部分分离出来成为⼀个单独的⽂件

```
单⻚⾯应⽤spa：
打包完后，所有⻚⾯只⽣成了⼀个bundle.js。

代码体积变⼤，不利于下载
没有合理利⽤浏览器资源

多⻚⾯应⽤mpa:
如果多个⻚⾯引⼊了⼀些公共模块，那么可以把这些公共的模块抽离出来，单独打包。公共代码只需要下载⼀次就缓存起来了，避免了重复下载。
假如我们引⼊⼀个第三⽅的⼯具库，体积为1mb，⽽我们的业务逻辑代码也有1mb，那么打包出来的体积⼤⼩会在2mb，这就会导致问题：

文件体积⼤，加载时间⻓。
业务逻辑会变化，而第三⽅⼯具库不会，所以业务逻辑⼀变更，第三⽅⼯具库也要跟着变。
```

- 使用happypack

运⾏在Node.js之上的Webpack是单线程模型的，也就是说Webpack需要⼀个⼀个地处理任务，不能同时处理多个任务。Happy Pack就能让Webpack做到这⼀点，它将任务分解给多个⼦进程去并发执⾏，⼦进程处理完后再将结果发送给主进程。从⽽发挥多核CPU电脑的威⼒。

- 将互相依赖的资源版本统一

**2 文件优化**

### 6.8 treeShaking

​	ES6 module 特点：

- 只能作为模块顶层的语句出现
- import 的模块名只能是字符串常量
- import binding 是 immutable的

​		ES6模块依赖关系是确定的，和运行时的状态无关，可以进行可靠的静态分析，这就是tree-shaking的基础。

​		所谓静态分析就是不执行代码，从字面量上对代码进行分析，ES6之前的模块化，比如我们可以动态require一个模块，只有执行后才知道引用的什么模块，这个就不能通过静态分析去做优化。

​		这是 ES6 modules 在设计时的一个重要考量，也是为什么没有直接采用 CommonJS，正是基于这个基础上，才使得 tree-shaking 成为可能，这也是为什么 rollup 和 webpack 2 都要用 ES6 module syntax 才能 tree-shaking。

**webpack**

​		打包过程中，先对代码进行标记，主要是对 import & export 语句标记为 3 类：

- 所有 import 标记为 `/* harmony import */`
- 所有被使用过的 export 标记为`/* harmony export ([type]) */`，其中 `[type]` 和 webpack 内部有关，可能是 binding, immutable 等等
- 没被使用过的 export 标记为`/* unused harmony export [FuncName] */`，其中 `[FuncName]` 为 export 的方法名称

​		然后使用uglify、terser等压缩工具，根据标记以及静态分析程序流，去压缩删除无用代码。简单来说，就是压缩工具读取 webpack 打包结果，在压缩之前移除 bundle 中未使用的代码。

**rollup**

rollup本身内置就是支持tree-shaking的

1. rollup()阶段，解析源码，生成 AST tree，对 AST tree 上的每个节点进行遍历，判断出是否import(标记避免重复打包)，是的话标记，然后生成 chunks，最后导出。
2. generate()/write()阶段，根据 rollup()阶段做的标记，进行代码收集，最后生成真正用到的代码。

### 6.9 babel

ES6代码输入 ==》 babylon进行解析(Parse(解析)) ==》 得到AST ==》 plugin用babel-traverse对AST树进行遍历转译(Transform(转换)) ==》 得到新的AST树 ==》 用babel-generator通过AST树生成ES5代码(Generate(代码生成))

**plugins**插件应用于babel的转译过程，尤其是第二个阶段transforming，如果这个阶段不使用任何插件，那么babel会原样输出代码。我们主要关注transforming阶段使用的插件，因为transform插件会自动使用对应的词法插件，所以parsing阶段的插件不需要配置。

**presets**如果要自行配置转译过程中使用的各类插件，那太痛苦了，所以babel官方帮我们做了一些预设的插件集，称之为preset，这样我们只需要使用对应的preset就可以了。以JS标准为例，babel提供了如下的一些preset：ES2016等

**polyfill**polyfill是一个针对ES2015+环境的shim，实现上来说babel-polyfill包只是简单的把core-js和regenerator runtime包装了下，这两个包才是真正的实现代码所在（后文会详细介绍core-js）。使用babel-polyfill会把ES2015+环境整体引入到你的代码环境中，让你的代码可以直接使用新标准所引入的新原生对象，新API等，一般来说单独的应用和页面都可以这样使用。

**polyfill和runtime的区别**直接使用babel-polyfill对于应用或页面等环境在你控制之中的情况来说，并没有什么问题。但是对于在library中使用polyfill，就变得不可行了。因为library是供外部使用的，但外部的环境并不在library的可控范围，而polyfill是会污染原来的全局环境的（因为新的原生对象、API这些都直接由polyfill引入到全局环境）。这样就很容易会发生冲突，所以这个时候，babel-runtime就可以派上用场了。

**transform-runtime插件的功能**把代码中的使用到的ES6引入的新原生对象和静态方法用babel-runtime/core-js导出的对象和方法替代当使用generators或async函数时，用babel-runtime/regenerator导出的函数取代（类似polyfill分成regenerator和core-js两个部分）把Babel生成的辅助函数改为用babel-runtime/helpers导出的函数来替代（babel默认会在每个文件顶部放置所需要的辅助函数，如果文件多的话，这些辅助函数就在每个文件中都重复了，通过引用babel-runtime/helpers就可以统一起来，减少代码体积）

https://zhuanlan.zhihu.com/p/85915575

https://www.jianshu.com/p/e9b94b2d52e2

### 6.10 生命周期

Webpack 生命周期是指 Webpack 在执行过程中所遵循的一系列钩子函数，每个钩子函数代表着一个特定的阶段，开发者可以通过注册回调函数的方式，在这些钩子函数中完成自定义的操作。Webpack 生命周期主要分为以下 11 个阶段：

1. `beforeRun`在 Webpack 开始读取配置之前，该钩子将被调用。
2. `run`在 Webpack 开始编译时，该钩子将被调用。
3. `watchRun`在使用 `webpack-dev-server` 进行开发时，该钩子将被调用。
4. `beforeCompile`在 Webpack 开始编译之前，该钩子将被调用。
5. `compile`在 Webpack 开始编译时，该钩子将被调用。
6. `thisCompilation`在创建新的 Compilation 对象时，该钩子将被调用。
7. `compilation`在编译时，每当 Webpack 生成一个新的 Compilation 对象时，该钩子将被调用。
8. `emit`在生成资源之前，该钩子将被调用。
9. `afterEmit`在生成资源之后，该钩子将被调用。
10. `done`在 Webpack 编译完成时，该钩子将被调用。
11. `assetEmitted` 生命周期钩子是在所有资源（如 JavaScript、CSS、图片等）都已经生成到输出目录中后，即 webpack 打包完毕后触发的。

### 6.11 webpack5

1. 长期缓存优化

​		以前v4是根据代码的结构生成chunkhash，现在v5根据完全内容生成chunkhash，比如改了内容的注释或者变量则不会引起chunkhash的变化，让浏览器继续使用缓存。

```
	1:moduleId改为根据上下文模块路径计算，chunkId根据chunk内容计算
	2: 为module，chunk 分配确定的（3或5位）数字ID，这是包大小和长期缓存之间的一种权衡
```

1. 代码压缩（生产环境）

​		Webpack5 在生产环境下默认使用自带的 TerserPlugin 插件（无需安装）来做代码压缩，这个插件也被认为是在代码压缩方面性能是较好的。无需再借助 UglifyjsPlugin、ParallelUglifyPlugin 这些插件了。

1. 持久化缓存

​		Webpack5 自带缓存能力，会缓存生成的 webpack module 和 chunk，对于二次构建有了很大的性能提升。通过 cache 属性配置，分为内存和文件两种缓存方式，默认在生产环境是禁用的，需自行开启。

​		1：第一次构建是一次全量构建，它会利用磁盘模块缓存(以空间换时间)，使得后续的构建从中获利。		 2：后续构建具体流程是：读取磁盘缓存 -> 校验模块 -> 解封模块内容。

v5 默认情况，缓存配置是memory，修改设置为filesystem, 将缓存写入硬盘

1. 模板联邦

​		跨项目间的chunk可以相互共享

​		2: 微前端：多个项目共存于一个页面，有点类似iframe，共享的对象是项目级的，页面级的子应用间的chunk以及对象可通过全局事件共享，但是公共包在项目安置以及打包编译很难放

​		3：v5 的模块共享，这个方案是直接将一个应用的 bundle，应用于另一个应用，动态分发 runtime 子模块给其他应用。

https://www.jianshu.com/p/eacdd98d25b0

https://cloud.tencent.com/developer/article/1847715