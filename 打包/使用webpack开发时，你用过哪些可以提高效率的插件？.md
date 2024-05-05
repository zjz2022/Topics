## 使用webpack开发时，你用过哪些可以提高效率的插件？

(这道题还蛮注重实际，用户的体验还是要从小抓起的)

- `webpack-dashboard`：可以更友好的展示相关打包信息。
- `webpack-merge`：提取公共配置，减少重复配置代码
- `speed-measure-webpack-plugin`：简称 SMP，分析出 Webpack 打包过程中 Loader 和 Plugin 的耗时，有助于找到构建过程中的性能瓶颈。
- `size-plugin`：监控资源体积变化，尽早发现问题
- `HotModuleReplacementPlugin`：模块热替换



作者：童欧巴
链接：https://juejin.cn/post/6844904094281236487
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。