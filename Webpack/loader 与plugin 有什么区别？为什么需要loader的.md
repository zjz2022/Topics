## 什么是 loader?

`webpack` 本身只能处理`.js` 和`.json` 文件，[loader](https://webpack.docschina.org/loaders/) 可以让`webpack` 去处理其他种类的文件，并将这些资源和文件转换为模组，让应用程式可以使用、并添加到依赖图中。以程式的角度来看， loader 本身就是一个 JavaScript 的函式，不同的 loader 即是能处理不同种文件的函式

举例来说，如果我们想处理`.css`文件，可以使用[style-loader](https://webpack.docschina.org/loaders/style-loader) 和  [css-loader](https://webpack .docschina.org/loaders/css-loader) 来处理，透过这两个 loader，让原本只懂 JavaScript 与 JSON 的 webpack 也可以处理 css，让`.css`文件能被打包到最终档案中。

**使用 loader**

有两种使用 loader 的方式，一是**配置方式([Configuration](https://webpack.js.org/concepts/loaders/#configuration))**，第二种是**内联方式( [Inline](https://webpack.js.org/concepts/loaders/#inline))**。

官方推荐的使用方法是第一种**配置方式**，使用方法是在  `webpack.config.js` 文件中指定 loader。我们可以在[`module.rules`](https://webpack.docschina.org/configuration/module/#modulerules) 中指定什么档案类型要使用一个或多个 loader，loader 的执行方式会是从右到左依序执行，前一个执行的 loader 会把执行的结果传递给下一个 loader，一直到最后一个 loader 会返回 webpack 所需要的档案。

下方代码例子，执行顺序会是 `sass-loader`⇒ `css-loader` ⇒ `style-loader`

```jsx
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          { loader: "sass-loader" },
        ],
      },
    ],
  },
};
```

**常见的 loader**

如下 (更多的 loader 可参考 webpack [官方网站](https://webpack.docschina.org/loaders/#files))：

- [`babel-loader`](https://webpack.docschina.org/loaders/babel-loader) 使用  [Babel](https://babeljs.io/) 将 ES2015+ 代码转换为 ES5
- [`esbuild-loader`](https://github.com/privatenumber/esbuild-loader) 使用  [esbuild](https://esbuild.github.io/) 将 ES2015+ 代码转转译到 ES6+
- [`style-loader`](https://webpack.docschina.org/loaders/style-loader) 将模组导出的内容作为样式添加到到 DOM 中
- [`css-loader`](https://webpack.docschina.org/loaders/css-loader) 加载 CSS 文件并解析 import 的 CSS 文件，最终返回 CSS 的代码

## 什么是 plugin?

**loader** 的作用是资源模组的转化，让 webpack 能处理不同资源；而**plugin** 则是用来扩展 webpack 的功能，例如让 webpack 能对打包的结果进一步优化、做资源管理等。 webpack 生命周期中的各个环节会提供钩子 (hook)，供开发者使用。开发者可以在这些生命周期节点透过 Plugin 来做额外操作，进而拓展 webpack 的功能。

从程式的角度来看，loader 是函式，而 plugin 则是带有`apply` 方法的物件，在`apply` 方法中注册 webpack 生命周期提供的钩子，当运行到该生命周期时，就会回调开发者写在`apply` 中的功能。

**使用 plugin**

我们在使用 `plugin` 时，会先透过 `require` 语法来引入需要的 `plugin`，并透过 new 实例化，将它添加在 `plugins` 的数组当中。如下方代码范例

```jsx
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./path/to/my/entry/file.js",
  output: {
    filename: "my-first-webpack.bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin({ template: "./src/index.html" })],
};
```

在上面的例子中，`HtmlWebpackPlugin` 协助在打包的过程中生成一个 HTML 档案，并自动将所有的打包档案注入在这个 HTML 文件当中(详细的使用方法可以参考此[文件](https://webpack .js.org/plugins/html-webpack-plugin/))。这是原本 webpack 没有提供的功能，透过这个 plugin 我们能进一步获得这功能。

------

### 参考资料

- https://webpack.docschina.org/concepts/