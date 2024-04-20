## webpack

### 1.1 前端为什么要使用webpack和vite进行打包和构建

1. 体积更小（Tree-Shaking、压缩、合并），加载更快
2. 编译高级语言和语法（TS，ES6+，模块化，scss）
3. 兼容性和错误检查（Polyfill、postcss、eslint)
4. 统一、高效的开发环境
5. 统一的构建流程和产出标准
6. 集成公司构建规范（提测、上线等）

### 1.2 如何提高webpack的构建速度

1. 优化babel-loader 开启缓存
2. 使用module中的Noparse，不去解析属性值代表的库的依赖（需要在webpack.config.js的module节点添加noParse配置，使用|分割）
3. 可以使用webpack内置插件lgnorePlugin插件（作用：忽略第三方包指定目录，让这些指定目录不要被打包进去）
4. 使用happyPack多进程打包（需要下载）
5. 使用parallelUgligyPlugin多进程压缩js（默认使用uglifyJs来压缩代码，单进程）

### 1.3 webpack的基本功能有哪些？

| 名称     | 内容                                                         |
| :------- | :----------------------------------------------------------- |
| 代码转换 | typescript编译成JavaScript、scss编辑成css                    |
| 文件优化 | 压缩JavaScript、css、html、压缩合并图片                      |
| 代码分割 | 提取多个页面的公共代码、提取首屏不需要执行部分的代码让其异步加载 |
| 模块合并 | 采用模块化的项目有很多模块和文件，需要构建功能把模块分类合并成一个文件 |
| 自动刷新 | 监听本地源代码的变化，自动构建，刷新浏览器                   |
| 代码校验 | 在代码被提交到仓库前需要检测代码是否符合规范，以及单元测试是否通过 |
| 自动发布 | 更新完代码后，自动构建出线上发布代码并传输给发布系统         |

### 1.4 用过哪些插件，写过哪些插件

### 1.5 webpack的loader和plugin？

### 1.6 你是怎么配置webpack的？

### 1.7 plugin会修改哪些行为?

### 1.8 webpack的原理

### 1.9 构建过程了解吗？

### 1.10 webpack的优化

### 1.11 webpack 有哪些 loader

### 1.12 webpack 主要作用

### 1.13 webpack HMR TreeShaking 原理

### 1.14 webpack帮我们做了什么事