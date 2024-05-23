### **Scss、Tailwindcss 区别**

**「SCSS（Sassy CSS）:」**

- 语法接近 CSS： SCSS 使用类似于标准 CSS 的语法，使用大括号和分号，这使得它更易学习和迁移现有的 CSS 代码。
- 编程性和灵活性： 与 Sass 类似，SCSS 具有编程性的特性，如变量、嵌套、混合（mixins）和条件语句，允许你编写更加灵活和可维护的样式代码。
- 手动编写样式： 使用 SCSS 需要手动编写 CSS 规则，即你需要明确地编写每个元素的样式规则和选择器。
- 独立性： SCSS 是一种独立的 CSS 预处理器，可以与任何前端框架或库一起使用。

**「Tailwind CSS:」**

- Utility-First CSS： Tailwind CSS 是一种"实用优先"的 CSS 框架，提供了一组预定义的 CSS 类，用于构建页面组件和样式。你通过组合和应用这些类来创建样式，而不需要手动编写自定义的 CSS 规则。
- 快速开发： Tailwind CSS 能够快速加速前端开发，因为你不必从头开始编写样式，而是通过应用现有的类来创建样式。
- 可定制性： 尽管 Tailwind CSS 提供了一套默认的 CSS 类，但它也非常可定制。你可以根据项目需求自定义颜色、间距、字体、阴影等方面的样式。
- 集成性： Tailwind CSS 通常与现代前端框架（如 Vue.js、React 等）良好集成，并有许多相关的插件和工具来帮助更好地集成到这些框架中。

## 为什么说预处理工具落后？

我把理由分成三大类：

### 预处理工具的问题

- 对 CSS 函数兼容性不好，尤其是 `rgba()`、`hsl()` 这些常用的颜色函数
- 数值类型转换，有不符合预期的行为，比如 [Stylus 实现 `content:5`](https://link.segmentfault.com/?enc=CJJJ2wIyJ8zZo5QU75hsXw%3D%3D.GMGSZJZIBcRomfNEUZ9y8H74p6oZKdXuiUlzERL%2B%2BrXbzFKMY1cyuox69GY0385au0YmQbrcQIm5vorfrrOaI7WvW%2BVRjGcd8XJrS7sGkP4%3D)

### CSS 的改进

- CSS 拥有越来越多的函数，可以直接进行计算，比如前面提到的颜色；还有 `calc()` 来完成基础数学计算
- CSS 变量非常好用，可以大大改进编程体验，配合各种 JS 框架，我们可以更容易的把数学逻辑和显示效果绑定在一起
- CSS Houdini 可以实现很多新功能，即使不深入使用（JS 部分），也有好用的自定义属性
- CSS 也开始从预处理工具吸收营养，比如近期的嵌套功能已经开始被整合，未来我们可以直接使用

### 预处理工具无法跟进的问题

- 很多缩写、复合属性无法处理，比如 background-image、box-shadow 等，都支持多属性共同生效，预处理工具擅长的循环、条件、函数无法提供帮助。
- 预处理，顾名思义，发生在生产之前。实际上，网页在实际浏览时，会有很多因素影响到渲染结果，比如分辨率、dark mode 等。预处理工具对这些需求也没有改进。

## 替代方案

我目前的替代方案基于 TailwindCSS，所以自然包含 PostCSS、AutoPrefixer 等工具。然后用 `postcss-import` 实现自动导入和模块化；使用 `tailwindcss/nesting` 实现嵌套。

_PostCss 是一个用 JavaScript 工具和插件转换 CSS 代码的工具_

为什么选用 TailwindCSS？首先，实际开发中，不管使用什么前端框架，我们都需要大量原子化的胶水样式，比如调整间距、改变字号、给容器添加一些边框、圆角、阴影等。这些样式如果都手写，工作量并不小；学习不同的样式名也是负担；以及最重要的，CSS 优先级问题。使用 TailwindCSS 就都能很好解决。

TailwindCSS 不仅包含一大堆原子化样式，自身也是个完整且优秀的 CSS 编译器。它包含 reset，提供一组全局通用的 CSS 变量；它可以从各种文件里把我们用到的样式提取出来，构建后生成的 CSS 里只有我们要用到样式，不会有多余的；它会分析我们对样式的使用，合理的调整样式顺序，保证样式能正确生效。使用 TailwindCSS 可以节省很多时间。

它还自带若干插件，比如解决嵌套的 `tailwindcss/nesting`，支持内容类元素的的 `@tailwindcss/typography` 等。使用这些插件也可以帮我们节省很多时间。

最后，TailwindCSS 的生态不断成长，我们的选择范围越来越宽：HeadlessUI、DaisyUI、付费的 Tailwind UI 等。方便我们从产品生命周期的任意阶段开始集成。
