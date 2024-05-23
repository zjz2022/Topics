# vue SSR实践

![image](D:/%E6%96%87%E4%BB%B6/typora%E5%9B%BE%E7%89%87/image.png)

#### createBundleRenderer 的作用

createBundleRenderer 是用于创建一个 bundle renderer 的方法。所谓的 "bundle" 是指通过像 Webpack 这样的工具编译过的 Vue 应用代码。这个方法允许你在服务器上渲染 Vue 应用，同时能够处理客户端和服务器端代码的同构问题。

#### 对比createRenderer与createBundleRenderer

createRenderer 是 Vue SSR 的基本渲染器，提供了最基础的服务器端渲染能力。它的特点包括：

1. 基础渲染：它可以将 Vue 组件直接渲染为 HTML 字符串，但不包含额外的优化和功能。

2. 无需构建步骤：使用 createRenderer 时，你不需要对 Vue 应用进行特别的构建处理。你只需将普通的 Vue 组件传递给渲染器即可。

3. 简单但有限：虽然使用起来比较简单，但它的功能较为有限，不支持一些高级特性，如自动资源注入、客户端激活等。
   createBundleRenderer 是一个更高级的渲染器，用于处理通过特定构建工具（如 Webpack）打包的 Vue 应用。它的特点包括：

1. 针对打包后的应用：createBundleRenderer 需要一个打包后的服务器端应用 bundle，这通常是通过 Webpack 和 vue-server-renderer/server-plugin 插件创建的。

2. 高级功能：支持源码映射（Source Map）、自动资源注入（基于客户端构建的 clientManifest）、以及更高效的缓存处理等。

3. 更优的性能：相较于 createRenderer，它提供了更好的性能和更高的灵活性，特别是在处理大型应用时。

4. 复杂性更高：由于需要处理打包后的应用和更多的配置，createBundleRenderer 的使用和配置比 createRenderer 更为复杂。

#### createBundleRenderer对本地开发调试的友好性

1. 源码映射（Source Map）支持：createBundleRenderer 支持源码映射，这意味着即使在服务器端渲染（SSR）环境中，你也能获得准确的错误信息和堆栈追踪。这对于调试服务器端代码非常有用，尤其是当你的代码经过编译（如使用 Babel 或 TypeScript）时。

2. 热重载（Hot Reloading）：在使用像 Webpack 这样的模块打包工具时，结合 createBundleRenderer 可以实现服务器端代码的热重载。这意味着在你修改代码后，服务器端的应用可以自动重新加载更改，无需重启整个服务器，极大地提高了开发效率。

3. 更好的错误处理：由于 createBundleRenderer 可以更好地管理和优化整个 Vue 应用的渲染，因此它能提供更详尽的错误信息，这对于调试来说是一个显著的优势。

4. 与客户端渲染的一致性：由于 createBundleRenderer 用于处理打包后的应用代码，这确保了在服务器端和客户端看到的行为和错误是一致的，有助于在本地环境中复现和解决生产环境中可能出现的问题。

#### 如何使用

使用 createBundleRenderer 通常涉及以下几个步骤：

1. 准备 Vue 应用的 bundle：通常使用像 Webpack 这样的模块打包工具，通过特定的配置来打包 Vue 应用。
   项目中是如何准备的

```js
const webpack = require('webpack');
const {merge} = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');
const config = require('./config');
const isProd = process.env.NODE_ENV === 'production';

const VueSSRServerPlugin = isProd ? require('vue-server-renderer/server-plugin') : require('./server-plugin');
//这里使用 merge 方法将基础配置（baseWebpackConfig）与服务器端特定的配置合并。
module.exports = merge(baseWebpackConfig, {
    entry: {
        server: './client/src/entry-server.js'//定义 webpack 编译的入口文件是 entry-server.js，这是服务器端应用的起点。
    },
    output: {
        filename: '[name]_[contenthash:8].js',//输出文件名，包含内容哈希，有助于缓存控制
        publicPath: !isProd ? config.dev.assetsPublicPath : config.prod.assetsPublicPath,//资源的公开路径，根据开发或生产环境不同而变化
        library: {
            type: 'commonjs2'//输出格式设置为 commonjs2，适用于 Node.js 环境
        }
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                    'postcss-loader',
                    'less-loader'
                ]
            }
        ]
    },
    target: 'node',//设置构建目标为 Node.js 环境
    externals: nodeExternals({
        allowlist: [/\.css$/, /\?vue&type=style/]
    }),//使用 nodeExternals 防止 Node.js 模块被打包进输出文件。allowlist 用于指定例外，允许某些类型的文件（如 CSS）被包含
    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': !isProd ? config.dev.NODE_ENV : config.prod.NODE_ENV,
            'process.env.VUE_ENV': '"server"'
        }),//定义全局常量。这里用于设置环境变量
        new VueSSRServerPlugin()//Vue SSR 服务器插件，生成 Vue SSR 服务器 bundle
    ]
});
```

```js
import {createApp} from './main';

const isDev = process.env.NODE_ENV !== 'production';

export default context => {
    return new Promise((resolve, reject) => {
        const startTime = Date.now();
        const {app, router, store} = createApp();//通过 createApp 创建新的 Vue 实例、Vue Router 实例和 Vuex Store 实例
        const {url, pathname} = context;
        const {fullPath, path} = router.resolve(url).route;//处理服务器端的路由。从 context 中获取 URL 并解析出相应的路由信息
        // 增加meta
        // 参考：https://vue-meta.nuxtjs.org/guide/ssr.html#add-vue-meta-to-the-context
        const meta = app.$meta();
        context.meta = meta;//这部分集成了 vue-meta，用于处理 Vue 应用中的元数据（如标题、描述等）。这在 SSR 中非常有用，因为它允许在服务器端渲染页面时动态修改这些元信息
        if (pathname !== path) {
            return reject({
                fullPath,
                url,
                path,
                pathname,
                code: 302
            });
        }//如果请求的路径与解析的路径不匹配，则拒绝（reject）Promise，并可能进行重定向
        router.push(url);//设置路由状态，正确渲染组件
        router.onReady(() => {
            const matchedComponents = router.getMatchedComponents();
            if (!matchedComponents.length) {
                return reject({
                    fullPath,
                    url,
                    path,
                    pathname,
                    code: 404
                });
            }//如果没有匹配到路由对应的组件，则拒绝 Promise 并返回 404 错误
            Promise.all(matchedComponents.map(({asyncData}) => {
                if (asyncData) {
                    return asyncData({
                        store,
                        route: router.currentRoute
                    });
                }//用于处理所有匹配的路由组件中的 asyncData 函数。asyncData 是一种常用于 Vue SSR 的模式，用于在服务器端异步获取数据并填充到 Vuex store
            })).then(() => {
                const endTime = Date.now();
                if (isDev) {
                    console.log(
                        '[client]',
                        '[entryServer]',
                        `data pre-fetch time: ${endTime - startTime}ms`
                    );
                }
                context.state = store.state;
                resolve(app);//在所有异步数据预取完成后，将 Vuex store 的状态附加到 context 对象上，这样状态可以被序列化并发送到客户端。然后解决（resolve）Promise，返回 Vue 实例
            }).catch(err => {
                if (isDev) {
                    console.log(
                        '[client]',
                        '[entryServer]',
                        `data pre-fetch error: ${err}`
                    );
                }
                reject();
            });
        }, () => {
            if (isDev) {
                console.log(
                    '[client]',
                    '[entryServer]',
                    'router onReady error'
                );
            }
            reject();
        });
    });
}
```

1. 创建 Renderer 实例：使用 createBundleRenderer 方法，并传入打包后的 bundle 文件，创建一个 renderer 实例。

2. 渲染应用：使用这个 renderer 实例来渲染 Vue 应用，通常是在服务器收到 HTTP 请求时进行。

#### serverBundle

第一个参数 serverBundle 是必须的，它可以是以下几种形式之一：

1. 一个绝对路径的字符串：这个路径指向一个打包好的 JavaScript 文件。这个文件应该是通过像 Webpack 这样的构建工具生成的，用于服务器端渲染的 Vue 应用程序。

2. 一个 JavaScript 对象：这通常是通过 require 直接加载的 Webpack bundle。

3. 一个 Promise 对象：这个 Promise 应该解析为上述的 JavaScript 对象。这对于异步加载 bundle 很有用。

#### 可选的配置对象

第二个参数是一个可选的配置对象，它提供了多种配置选项来自定义 renderer 的行为。这些选项包括但不限于：

1. runInNewContext：默认为 true。对于每次渲染，它会创建一个新的 V8 上下文环境。这对于隔离每个请求的全局对象是必要的。设置为 false 可以提高性能，但需要确保应用代码不依赖于全局状态。

2. template：一个 HTML 模板字符串。Vue 会将渲染结果注入到模板中的特定位置。

3. clientManifest：客户端构建 manifest。当提供此项时，renderer 会自动推断和注入应该在 HTML 中预加载的资源（如 JavaScript 和 CSS 文件）。

4. inject：布尔值，默认为 true。当设置为 true 时，模板中的内容将自动注入。如果设置为 false，你需要手动进行注入。

5. shouldPrefetch 和 shouldPreload：这是两个函数，用于控制哪些文件应该被预加载和预获取。

6. basedir：设置服务器 bundle 的基础目录。当使用 nodeExternals 时，可以使用此配置项来正确地解析 node 模块。

7. cache：提供一个自定义缓存实现，用于缓存由 Vue 组件渲染的页面片段，我们的项目中没有使用这个配置项，下面给出一个使用lru完成cache配置的实践

```js
const LRU = require('lru-cache');

const cache = new LRU({
  max: 10000, // 缓存项目的最大数量
  maxAge: 1000 * 60 * 15 // 每个项目的最大缓存时间（毫秒）
});

const { createBundleRenderer } = require('vue-server-renderer');
const serverBundle = require('./path/to/vue-ssr-server-bundle.json');

const renderer = createBundleRenderer(serverBundle, {
  // ...其他选项
  cache
});


//vue文件
<template>
  <!-- your template -->
</template>

<script>
export default {
  name: 'MyComponent',
  props: ['someProp'],
  serverCacheKey: (props) => props.someProp,
  // ...组件的其他选项
}
</script>
//只要someProp不发生变化就缓存组件
```