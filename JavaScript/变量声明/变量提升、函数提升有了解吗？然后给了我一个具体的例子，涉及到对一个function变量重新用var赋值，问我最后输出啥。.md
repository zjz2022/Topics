### 变量提升、函数提升有了解吗？然后给了我一个具体的例子，涉及到对一个`function`变量重新用`var`赋值，问我最后输出啥。

**变量提升和函数提升**

在 JavaScript 中，变量和函数声明会在代码执行前被“提升”到它们所在作用域的顶部。

1. **变量提升**: 使用 `var` 声明的变量会被提升，但只是声明会被提升，初始化（赋值）不会。这意味着变量会被声明为 `undefined`。
2. **函数提升**: 函数声明（不是函数表达式）会被整体提升，包括函数名和函数体。

**具体例子**

考虑以下代码：

```javascript
console.log(foo);  // 输出：[Function: foo]
foo();  // 输出："Hello from foo"

var foo = "bar";

console.log(foo);  // 输出："bar"

function foo() {
  console.log("Hello from foo");
}
```

在这个例子中，函数 `foo` 和变量 `foo` 都会被提升，但函数提升的优先级更高。所以，第一个 `console.log(foo);` 输出的是函数 `foo`，而不是 `undefined`。

当执行到 `var foo = "bar";` 时，变量 `foo` 会被重新赋值为 `"bar"`，覆盖了原来的函数。

最后一个 `console.log(foo);` 输出的是字符串 `"bar"`，因为此时的 `foo` 已经被重新赋值。