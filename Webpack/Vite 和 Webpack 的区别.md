- 优点：快速的冷启动: 采用 No Bundle 和 esbuild 预构建，速度远快于 Webpack 高效的热更新：基于 ESM 实现，同时利用 HTTP 头来加速整个页面的重新加载，增加缓存策略真正的按需加载: 基于浏览器 ESM 的支持，实现真正的按需加载
- 缺点生态：目前 Vite 的生态不如 Webapck，不过我觉得生态也只是时间上的问题。生产环境由于 esbuild 对 css 和代码分割不友好使用 Rollup 进行打包

作者：大厂前端面试真题
链接：[https://www.nowcoder.com/discuss/576490235048050688](https://www.nowcoder.com/discuss/576490235048050688)
来源：牛客网
