- Entry（入口）：Webpack 在打包时需要从哪个文件开始构建依赖关系图，就是入口。可以设置多个入口文件，以生成多个输出文件。
- Output（输出）：打包后的文件放在哪里，以及如何命名这些文件。可以指定输出目录、文件名、公共路径等。
- Loader（模块加载器）：Webpack 只能处理 JavaScript 文件，而其他类型的文件如 CSS、图片等需要通过 Loader 转换才能被 Webpack 处理。Loader 用于对模块内容进行转换处理。
- Plugin（插件）：Plugin 可以用于执行各种任务，例如打包优化、错误处理和环境变量注入等。Webpack 本身只提供了一些基本的 Plugin，但社区中有很多第三方 Plugin 可供使用。
- Mode（模式）：Webpack 提供了三种模式：development、production 和 none。不同的模式会启用不同的 Webpack 内置 Plugin 和 Loader，以便于开发和生产环境的优化。
- Chunk（代码块）：Webpack 在打包时会把所有相关联的模块组成一个 Chunk。可以通过 Code Splitting 技术将代码拆分成多个 Chunk，以实现按需加载。
- Module（模块）：Webpack 把每个文件都看作一个模块，它可以是 JavaScript、CSS、图片等。这些模块通过依赖关系进行组合，构成整个应用程序。

作者：大厂前端面试真题
链接：[https://www.nowcoder.com/discuss/576490235048050688](https://www.nowcoder.com/discuss/576490235048050688)
来源：牛客网
