## npm

### 1 npm发包，需要关注哪些点和指标

### --save-dev

在 npm 中，`--save-dev` 是一个选项，用于将一个包添加到 `package.json` 文件的 `devDependencies` 对象中。

当你使用 `--save-dev` 选项（简写为 `-D`）安装一个包时，比如：`npm install webpack --save-dev`，npm 将会把 `webpack` 包添加到 `devDependencies` 中，同时指定你当前安装的版本号。

```json
"devDependencies": {
  "webpack": "^5.0.0"
}
```

`devDependencies` 是一个存储了 project for development 需要的依赖包列表的对象。通常，这里的依赖包们你在项目的生产环境中是不需要的，但是在开发环境中，如构建、测试和发布等过程中是非常需要的。

相对的， `npm install package-name --save` 命令（简写为 `-S`）会将包添加到 `dependencies` 对象中，这些依赖项是你的项目在运行时需要的。

例如，一个 web 项目可能使用 webpack 作为开发依赖（`devDependencies`），使用 `express` 作为生产依赖（`dependencies`）。那么在你 clone 项目后，你只需要运行 `npm install` 就可以为项目安装所需的所有依赖项了。

### 3 -g

在 npm 中，`-g` 或者 `--global` 参数表示全局安装。通常使用此参数安装的包将被安装到系统预定义的全局目录中。

当你使用 `npm install -g` 的方式安装包时，例如：`npm install -g vue-cli`，这将会将 `vue-cli` 安装到全局目录，全局安装的包可以在命令行中直接运行。

一般来说，可以全局安装的包往往是一些工具或者框架的 CLI，这样你就可以在命令行中任何地方都可以访问到它们。比如说，我们经常需要在命令行中使用 Vue CLI 或者 create-react-app 快速创建项目，所以它们通常是以全局方式安装的。

注意的是，全局安装的包是所有项目共享的，不会为每个项目单独安装。所以，它们通常不包含在项目的 `dependencies` 或 `devDependencies` 中。