- 升级 webpack 版本，3 升 4，实测是提升了几十秒的打包速度
- 使用 Tree Shaking 和 Scope Hoisting 来减少代码体积和模块构建时间，其中 Tree Shaking 可以去除未使用的代码，而 Scope Hoisting 可以将模块内的代码尽量合并到一个函数（单一作用域）中，以减少函数声明和闭包的数量。
- 使用 splitChunksPlugin 插件来将公共代码抽离成单独的 chunk，以减少代码重复和提高缓存命中率。
- 合理配置 resolve.alias 和 resolve.extensions 选项来减少 Webpack 查找文件的时间。
- 针对生产环境，可以开启代码压缩以及多进程并行处理等优化方式，以减少构建时间和服务器负载。
- 使用 DLLPlugin 和 DllReferencePlugin 来预先编译一些稳定不变的代码，以减少每次构建的时间。
- 使用 HappyPack 来启用多线程并发处理，以加速代码构建和增强开发体验。
- 对于图片、字体等资源文件，可以通过 url-loader 和 file-loader 等 loader 设置较小的 limit 值，将文件转换成 base64 编码的字符串内嵌在 js 文件中，以减少 http 请求次数。

作者：大厂前端面试真题
链接：[https://www.nowcoder.com/discuss/576490235048050688](https://www.nowcoder.com/discuss/576490235048050688)
来源：牛客网
