## `treeShaking`有了解吗？

`tree-shaking` 是一个在前端工程中常用的术语，主要用于**描述去除 JavaScript 文件中未使用的代码的过程**。这个概念在现代前端构建工具（如 Webpack、Rollup 等）中非常重要，因为它有助于减小最终打包文件的大小，从而提高应用的加载速度和性能。

**如何工作？**

1. **静态分析**: 构建工具会静态分析代码，找出哪些模块和函数没有被使用或引用。
2. **去除代码**: 在最终的打包文件中，未被使用的代码会被去除。

**适用场景**

- **ESM**: `tree-shaking` 通常更适用于 ESM（ECMAScript Modules）格式的代码，因为 ESM 的静态结构使得构建工具更容易分析哪些代码是多余的。

**注意事项**

1. **副作用**: 如果代码有副作用（side-effects），那么 `tree-shaking` 可能会导致问题。例如，如果一个模块在被导入时执行了某些全局操作，即使没有直接使用这个模块，它也不能被安全地移除。
2. **配置**: 在某些情况下，你可能需要在构建工具的配置文件中明确指定哪些代码是“纯净的”（没有副作用），以便进行 `tree-shaking`。

**示例**

假设你有如下的代码：

```javascript
// math.js
export const add = (a, b) => a + b
export const multiply = (a, b) => a * b

// app.js
import { add } from './math'

console.log(add(1, 2))
```

在这个例子中，`multiply` 函数没有在 `app.js` 中被使用，因此通过 `tree-shaking`，这个函数会被从最终的打包文件中移除。
